// src/admin/store/authStore.ts
// Authentication store using localStorage

const AUTH_KEY = 'arc_admin_auth';
const CREDS_KEY = 'arc_admin_creds';

interface AuthSession {
  username: string;
  token: string;
  loginTime: number;
}

interface Credentials {
  username: string;
  passwordHash: string;
}

// Simple hash function (not cryptographically secure, but fine for local-only admin)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

function generateToken(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function getStoredCredentials(): Credentials {
  const stored = localStorage.getItem(CREDS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }
  // Default credentials: admin / assam1941
  const defaults: Credentials = {
    username: 'admin',
    passwordHash: simpleHash('assam1941'),
  };
  localStorage.setItem(CREDS_KEY, JSON.stringify(defaults));
  return defaults;
}

export function login(username: string, password: string): boolean {
  const creds = getStoredCredentials();
  if (username === creds.username && simpleHash(password) === creds.passwordHash) {
    const session: AuthSession = {
      username,
      token: generateToken(),
      loginTime: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  try {
    const session: AuthSession = JSON.parse(stored);
    // Session expires after 24 hours
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Date.now() - session.loginTime > ONE_DAY) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function getUsername(): string {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return '';
  try {
    return JSON.parse(stored).username;
  } catch {
    return '';
  }
}

export function changePassword(currentPassword: string, newPassword: string): boolean {
  const creds = getStoredCredentials();
  if (simpleHash(currentPassword) !== creds.passwordHash) {
    return false;
  }
  creds.passwordHash = simpleHash(newPassword);
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
  return true;
}
