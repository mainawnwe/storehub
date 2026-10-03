export const ROLES = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  CASHIER: 'CASHIER',
  STOCK_KEEPER: 'STOCK_KEEPER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
