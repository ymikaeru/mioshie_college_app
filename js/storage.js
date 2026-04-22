// ============================================================
// Supabase Storage — Mioshie College
// Replaces direct fetch() calls with Supabase Storage downloads
// Uses the shared supabaseAuth session from login.js
// ============================================================
import SUPABASE_CONFIG, { supabase } from './supabase-config.js';
const BUCKET = 'teachings';

async function getSession() {
  // Usa apenas o singleton compartilhado de supabase-config.js
  // (window.supabaseAuth era um padrão legado que criava um segundo cliente)
  const { data } = await supabase.auth.getSession();
  return data?.session;
}

/**
 * Download a file from Supabase Storage.
 * Falls back to fetch() if the user is not authenticated (for public content).
 *
 * @param {string} path - Storage path, e.g. 'mioshiec1/zyobun.html.json'
 * @returns {Promise<object>} Parsed JSON
 */
export async function storageFetch(path) {
  const session = await getSession();

  if (!session) {
    const baseUrl = window.DATA_OUTPUT_DIR || 'site_data';
    const res = await fetch(`${baseUrl}/${path}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Authentication required or file not found');
    }
    return res.json();
  }

  // Fetch diretamente com cache: 'no-store' para garantir conteúdo sempre atualizado.
  // O supabase.storage.download() pode servir resposta cacheada pelo browser.
  const storageUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/authenticated/${BUCKET}/${path}`;
  const res = await fetch(storageUrl, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_CONFIG.anonKey
    }
  });

  if (!res.ok) {
    throw new Error(`Storage download failed: ${res.status}`);
  }

  return res.json();
}

/**
 * List files in a storage folder.
 *
 * @param {string} prefix - e.g. 'mioshiec1/'
 * @returns {Promise<string[]>} Array of filenames
 */
export async function storageList(prefix) {
  const session = await getSession();

  if (!session) {
    return [];
  }

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(prefix);

  if (error) {
    console.warn('Storage list failed:', error.message);
    return [];
  }

  return data ? data.map(f => f.name) : [];
}
