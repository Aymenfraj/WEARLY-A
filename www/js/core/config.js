// Configuration centrale. L'adresse du serveur se regle dans l'app (Menu > Mon compte & serveur).
import * as store from './storage.js';
export const CONFIG = { API_BASE: '', TIMEOUT: 12000, RETRIES: 3, VERSION: '3.0.0' };
export async function loadConfig() { const v = await store.get('api_base'); if (v) CONFIG.API_BASE = v; }
export async function setApiBase(u) { CONFIG.API_BASE = String(u || '').trim().replace(/\/+$/, ''); await store.set('api_base', CONFIG.API_BASE); }
