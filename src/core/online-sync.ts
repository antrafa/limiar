import type { Partida } from './partida';
import type { ThemeId } from '../types/card';

export interface SalaRemotaPayload {
  versao: 1;
  temaId: ThemeId;
  partida: Partida;
  atualizadoEm: number;
}

const API_BASE = 'https://api.restful-api.dev/objects';

/** Codifica um payload de sala para link direto via hash (ex: #mesa=...). Funciona offline e sem API. */
export function codificarMesaUrl(payload: SalaRemotaPayload): string {
  try {
    const json = JSON.stringify(payload);
    return btoa(encodeURIComponent(json));
  } catch {
    return '';
  }
}

/** Decodifica um payload de sala vindo da URL hash. */
export function decodificarMesaUrl(hashString: string): SalaRemotaPayload | null {
  try {
    const raw = decodeURIComponent(atob(hashString));
    const parsed = JSON.parse(raw) as SalaRemotaPayload;
    if (parsed && parsed.versao === 1 && parsed.partida && Array.isArray(parsed.partida.pessoas)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/** Cria uma nova sala online e retorna o ID remoto gerado pela API. */
export async function criarSalaRemota(temaId: ThemeId, partida: Partida): Promise<string> {
  const payload: SalaRemotaPayload = {
    versao: 1,
    temaId,
    partida,
    atualizadoEm: Date.now(),
  };

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Limiar-${temaId}`,
      data: payload,
    }),
  });

  if (!res.ok) {
    throw new Error('Não foi possível conectar ao servidor para criar a sala.');
  }

  const json = (await res.json()) as { id: string };
  return json.id;
}

/** Atualiza o estado da partida na sala online. */
export async function salvarNaSalaRemota(salaId: string, temaId: ThemeId, partida: Partida): Promise<void> {
  const payload: SalaRemotaPayload = {
    versao: 1,
    temaId,
    partida,
    atualizadoEm: Date.now(),
  };

  await fetch(`${API_BASE}/${encodeURIComponent(salaId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Limiar-${temaId}`,
      data: payload,
    }),
  });
}

/** Busca o estado atualizado da sala online. */
export async function carregarDaSalaRemota(salaId: string): Promise<SalaRemotaPayload | null> {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(salaId)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: SalaRemotaPayload };
    return json.data ?? null;
  } catch {
    return null;
  }
}
