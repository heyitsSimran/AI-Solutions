import crypto from "crypto";

const ITERATIONS = 100000;
const KEY_LEN = 64;
const DIGEST = "sha512";

// Admin credentials configuration
// Username: Simran
// Password: TSSVCLOL67.
const ADMIN_SALT = "3624611dd817ddca82dabe44b5bfdc2a";
const ADMIN_HASH = "4993915ec3186e95d01ecebfe671b5ab18e4464c16e1783bf1cb078118db64d45b08873074352301f92072d5c9fa9090fcaf7ff53ab9162f021c9d001402130f";

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function verifyAdminPassword(password: string): boolean {
  const calculatedHash = hashPassword(password, ADMIN_SALT);
  return calculatedHash === ADMIN_HASH;
}

// Generate session token (e.g. for cookie-based authentication)
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
