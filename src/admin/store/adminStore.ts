// src/admin/store/adminStore.ts
// localStorage-based CRUD for all unit and sub-unit data

import { arcData } from '../../data/arc';
import { assamRiflesData } from '../../data/assam-rifles';
import { arunachalScoutsData } from '../../data/arunachal-scouts';
import { rashtriyaRiflesData } from '../../data/rashtriya-rifles';
import { territorialArmyData } from '../../data/territorial-army';

const STORE_PREFIX = 'arc_museum_data_';
const SUBUNIT_PREFIX = 'arc_museum_subunit_';

export type UnitKey = 'arc' | 'assam-rifles' | 'arunachal-scouts' | 'rashtriya-rifles' | 'territorial-army';

export interface SubUnitInfo {
  id: string;
  name: string;
  shortName: string;
  established: string;
  location: string;
  history?: string[];
}

export const UNIT_LABELS: Record<UnitKey, string> = {
  'arc': 'Assam Regimental Centre',
  'assam-rifles': 'Assam Units',
  'arunachal-scouts': 'Arunachal Scouts',
  'rashtriya-rifles': 'Rashtriya Rifles',
  'territorial-army': 'Territorial Army',
};

export const UNIT_SHORT: Record<UnitKey, string> = {
  'arc': 'ARC',
  'assam-rifles': 'AR',
  'arunachal-scouts': 'AS',
  'rashtriya-rifles': 'RR',
  'territorial-army': 'TA',
};

export const UNIT_ICONS: Record<UnitKey, string> = {
  'arc': '🏛️',
  'assam-rifles': '🦅',
  'arunachal-scouts': '🏔️',
  'rashtriya-rifles': '⚔️',
  'territorial-army': '🛡️',
};

export const UNIT_COLORS: Record<UnitKey, string> = {
  'arc': '#d4a017',
  'assam-rifles': '#8c5500',
  'arunachal-scouts': '#3d5c1e',
  'rashtriya-rifles': '#4a2d00',
  'territorial-army': '#2d4515',
};

// Default sub-units per parent (imported from page files originally, replicated here for decoupling)
export const DEFAULT_SUBUNITS: Record<UnitKey, SubUnitInfo[]> = {
  'arc': [], // ARC has no sub-units
  'assam-rifles': [
    { id: '1-ar', name: '1st Unit, Assam Units', shortName: '1 AR', established: '1835', location: 'Lushai Hills' },
    { id: '2-ar', name: '2nd Unit, Assam Units', shortName: '2 AR', established: '1883', location: 'Shillong' },
    { id: '3-ar', name: '3rd Unit, Assam Units', shortName: '3 AR', established: '1891', location: 'Kohima' },
    { id: '4-ar', name: '4th Unit, Assam Units', shortName: '4 AR', established: '1913', location: 'Imphal' },
    { id: '5-ar', name: '5th Unit, Assam Units', shortName: '5 AR', established: '1920', location: 'Lokra' },
    { id: '6-ar', name: '6th Unit, Assam Units', shortName: '6 AR', established: '1924', location: 'Agartala' },
    { id: '7-ar', name: '7th Unit, Assam Units', shortName: '7 AR', established: '1930', location: 'Silchar' },
    { id: '8-ar', name: '8th Unit, Assam Units', shortName: '8 AR', established: '1938', location: 'Aizawl' },
    { id: '9-ar', name: '9th Unit, Assam Units', shortName: '9 AR', established: '1941', location: 'Itanagar' },
    { id: '10-ar', name: '10th Unit, Assam Units', shortName: '10 AR', established: '1943', location: 'Mokokchung' },
    { id: '12-ar', name: '12th Unit, Assam Units', shortName: '12 AR', established: '1948', location: 'Tura' },
    { id: '14-ar', name: '14th Unit, Assam Units', shortName: '14 AR', established: '1955', location: 'Dimapur' },
    { id: '15-ar', name: '15th Unit, Assam Units', shortName: '15 AR', established: '1960', location: 'Lunglei' },
    { id: '16-ar', name: '16th Unit, Assam Units', shortName: '16 AR', established: '1963', location: 'Ghaspani' },
    { id: '17-ar', name: '17th Unit, Assam Units', shortName: '17 AR', established: '1965', location: 'Shillong' },
  ],
  'arunachal-scouts': [
    { id: '1-as', name: '1st Battalion, Arunachal Scouts', shortName: '1 AS', established: '2010', location: 'Arunachal Pradesh' },
    { id: '2-as', name: '2nd Battalion, Arunachal Scouts', shortName: '2 AS', established: '2012', location: 'Arunachal Pradesh' },
  ],
  'rashtriya-rifles': [
    { id: '3-rr', name: '3rd Battalion, Rashtriya Rifles', shortName: '3 RR', established: '1990', location: 'Jammu & Kashmir' },
    { id: '35-rr', name: '35th Battalion, Rashtriya Rifles', shortName: '35 RR', established: '1994', location: 'Jammu & Kashmir' },
    { id: '42-rr', name: '42nd Battalion, Rashtriya Rifles', shortName: '42 RR', established: '2000', location: 'Jammu & Kashmir' },
    { id: '59-rr', name: '59th Battalion, Rashtriya Rifles', shortName: '59 RR', established: '2004', location: 'Jammu & Kashmir' },
  ],
  'territorial-army': [
    { id: '119-ta', name: '119 Infantry Battalion (TA)', shortName: '119 TA', established: '1948', location: 'Assam' },
    { id: '134-ta', name: '134 Infantry Battalion (TA) Eco', shortName: '134 TA (Eco)', established: '2007', location: 'Assam' },
    { id: '135-ta', name: '135 Infantry Battalion (TA) Eco', shortName: '135 TA (Eco)', established: '2008', location: 'Assam' },
    { id: '165-ta', name: '165 Infantry Battalion (TA) H&H', shortName: '165 TA (H&H)', established: '2010', location: 'Assam' },
    { id: '166-ta', name: '166 Infantry Battalion (TA) H&H', shortName: '166 TA (H&H)', established: '2011', location: 'Assam' },
  ],
};

const DEFAULT_DATA: Record<UnitKey, unknown> = {
  'arc': arcData,
  'assam-rifles': assamRiflesData,
  'arunachal-scouts': arunachalScoutsData,
  'rashtriya-rifles': rashtriyaRiflesData,
  'territorial-army': territorialArmyData,
};

// ── Parent unit data ─────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUnitData(key: UnitKey): any {
  const stored = localStorage.getItem(STORE_PREFIX + key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  return structuredClone(DEFAULT_DATA[key]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveUnitData(key: UnitKey, data: any): void {
  localStorage.setItem(STORE_PREFIX + key, JSON.stringify(data));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateUnitSection(key: UnitKey, section: string, sectionData: any): void {
  const data = getUnitData(key);
  data[section] = sectionData;
  saveUnitData(key, data);
}

export function resetUnitData(key: UnitKey): void {
  localStorage.removeItem(STORE_PREFIX + key);
}

// ── Sub-unit data ─────────────────────────────────────

// Sub-units store their OWN overrides. If a sub-unit has no custom data,
// it falls back to the parent unit data (current frontend behavior).
// The sub-unit data shape mirrors UnitData but all fields are optional overrides.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSubUnitData(parentKey: UnitKey, subUnitId: string): any {
  const storeKey = `${SUBUNIT_PREFIX}${parentKey}_${subUnitId}`;
  const stored = localStorage.getItem(storeKey);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through
    }
  }
  // Return empty object — means "use parent data for everything"
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveSubUnitData(parentKey: UnitKey, subUnitId: string, data: any): void {
  const storeKey = `${SUBUNIT_PREFIX}${parentKey}_${subUnitId}`;
  localStorage.setItem(storeKey, JSON.stringify(data));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSubUnitSection(parentKey: UnitKey, subUnitId: string, section: string, sectionData: any): void {
  const data = getSubUnitData(parentKey, subUnitId);
  data[section] = sectionData;
  saveSubUnitData(parentKey, subUnitId, data);
}

export function resetSubUnitData(parentKey: UnitKey, subUnitId: string): void {
  const storeKey = `${SUBUNIT_PREFIX}${parentKey}_${subUnitId}`;
  localStorage.removeItem(storeKey);
}

// Get merged data: sub-unit overrides on top of parent data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMergedSubUnitData(parentKey: UnitKey, subUnitId: string): any {
  const parent = getUnitData(parentKey);
  const sub = getSubUnitData(parentKey, subUnitId);
  // Shallow merge — each top-level key (history, gallery, etc.) is fully replaced if overridden
  return { ...parent, ...sub };
}

// ── Bulk operations ───────────────────────────────────

export function resetAllData(): void {
  const keys: UnitKey[] = ['arc', 'assam-rifles', 'arunachal-scouts', 'rashtriya-rifles', 'territorial-army'];
  keys.forEach(k => {
    localStorage.removeItem(STORE_PREFIX + k);
    // Also clear all sub-unit data
    const subs = DEFAULT_SUBUNITS[k];
    subs.forEach(s => {
      localStorage.removeItem(`${SUBUNIT_PREFIX}${k}_${s.id}`);
    });
  });
}

export function exportAllData(): string {
  const keys: UnitKey[] = ['arc', 'assam-rifles', 'arunachal-scouts', 'rashtriya-rifles', 'territorial-army'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allData: Record<string, any> = {};
  keys.forEach(k => {
    allData[k] = { _parentData: getUnitData(k), _subUnits: {} as Record<string, unknown> };
    const subs = DEFAULT_SUBUNITS[k];
    subs.forEach(s => {
      const subData = getSubUnitData(k, s.id);
      if (Object.keys(subData).length > 0) {
        allData[k]._subUnits[s.id] = subData;
      }
    });
  });
  return JSON.stringify(allData, null, 2);
}

export function importAllData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    const keys: UnitKey[] = ['arc', 'assam-rifles', 'arunachal-scouts', 'rashtriya-rifles', 'territorial-army'];
    keys.forEach(k => {
      if (parsed[k]) {
        if (parsed[k]._parentData) {
          saveUnitData(k, parsed[k]._parentData);
        } else {
          // Legacy format: entire object is the unit data
          saveUnitData(k, parsed[k]);
        }
        if (parsed[k]._subUnits) {
          Object.entries(parsed[k]._subUnits).forEach(([subId, subData]) => {
            saveSubUnitData(k, subId, subData);
          });
        }
      }
    });
    return true;
  } catch {
    return false;
  }
}

// Helper: convert File to base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Get stats for dashboard
export function getUnitStats(key: UnitKey): {
  gallery: number;
  videos: number;
  officers: number;
  achievements: number;
  gaonBuras: number;
  timelineEntries: number;
  subUnits: number;
} {
  const data = getUnitData(key);
  return {
    gallery: data.gallery?.length || 0,
    videos: data.videos?.length || 0,
    officers: data.commandingOfficers?.length || 0,
    achievements: data.achievements?.length || 0,
    gaonBuras: data.gaonBuras?.length || 0,
    timelineEntries: data.history?.timeline?.length || 0,
    subUnits: DEFAULT_SUBUNITS[key].length,
  };
}

export const ALL_UNIT_KEYS: UnitKey[] = ['arc', 'assam-rifles', 'arunachal-scouts', 'rashtriya-rifles', 'territorial-army'];
