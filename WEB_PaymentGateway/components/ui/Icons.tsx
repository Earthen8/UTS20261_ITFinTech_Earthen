import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
            {...props}
        >
            {children}
        </svg>
    );
}

export const MenuIcon = (p: IconProps) => (
    <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
);
export const SearchIcon = (p: IconProps) => (
    <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
);
export const CartIcon = (p: IconProps) => (
    <Icon {...p}>
        <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
        <circle cx="9.5" cy="20" r="1" /><circle cx="17" cy="20" r="1" />
    </Icon>
);
export const ChevronLeftIcon = (p: IconProps) => (
    <Icon {...p}><path d="m15 18-6-6 6-6" /></Icon>
);
export const PlusIcon = (p: IconProps) => (
    <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
);
export const MinusIcon = (p: IconProps) => (
    <Icon {...p}><path d="M5 12h14" /></Icon>
);
export const ArrowRightIcon = (p: IconProps) => (
    <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);
export const LockIcon = (p: IconProps) => (
    <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Icon>
);