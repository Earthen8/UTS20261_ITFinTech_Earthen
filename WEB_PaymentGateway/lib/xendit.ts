import { Xendit } from 'xendit-node';

const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY;

if (!XENDIT_SECRET_KEY) {
  throw new Error('Please define the XENDIT_SECRET_KEY environment variable inside .env.local');
}

export const xenditClient = new Xendit({
  secretKey: XENDIT_SECRET_KEY,
});
