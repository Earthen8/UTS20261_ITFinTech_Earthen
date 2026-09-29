import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { getProductById, type Product } from '../lib/products';

const STORAGE_KEY = 'payment-gateway:cart:v1';
const MAX_QUANTITY = 99;

interface StoredItem {
    productId: string;
    quantity: number;
}

export interface CartLine {
    product: Product;
    quantity: number;
    lineTotal: number;
}

// ---- tiny external store, shared by every page and persisted in localStorage ----
const EMPTY: StoredItem[] = [];
let state: StoredItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isStoredItem(value: unknown): value is StoredItem {
    const item = value as StoredItem;
    return (
        !!item &&
        typeof item.productId === 'string' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        !!getProductById(item.productId)
    );
}

function ensureLoaded() {
    if (loaded || typeof window === 'undefined') return;
    loaded = true;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) state = parsed.filter(isStoredItem);
    } catch {
        state = EMPTY;
    }
}

function commit(next: StoredItem[]) {
    state = next.length ? next : EMPTY;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* storage unavailable: keep in-memory state */
    }
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getSnapshot() {
    ensureLoaded();
    return state;
}

function getServerSnapshot() {
    return EMPTY;
}

export function useCart() {
    const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // `ready` flips after hydration so pages can avoid flashing an empty-cart state.
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    const lines: CartLine[] = useMemo(
        () =>
            stored.flatMap((item) => {
                const product = getProductById(item.productId);
                return product
                    ? [{ product, quantity: item.quantity, lineTotal: product.price * item.quantity }]
                    : [];
            }),
        [stored],
    );

    const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.lineTotal, 0), [lines]);
    const totalQuantity = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

    const setQuantity = useCallback((productId: string, quantity: number) => {
        ensureLoaded();
        const next = Math.min(quantity, MAX_QUANTITY);
        if (next <= 0) {
            commit(state.filter((i) => i.productId !== productId));
            return;
        }
        const exists = state.some((i) => i.productId === productId);
        commit(
            exists
                ? state.map((i) => (i.productId === productId ? { ...i, quantity: next } : i))
                : [...state, { productId, quantity: next }],
        );
    }, []);

    const addItem = useCallback(
        (productId: string) => {
            ensureLoaded();
            const current = state.find((i) => i.productId === productId)?.quantity ?? 0;
            setQuantity(productId, current + 1);
        },
        [setQuantity],
    );

    const clear = useCallback(() => {
        ensureLoaded();
        commit([]);
    }, []);

    return { ready, lines, subtotal, totalQuantity, addItem, setQuantity, clear };
}