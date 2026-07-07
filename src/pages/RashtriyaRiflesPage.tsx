// src/pages/RashtriyaRiflesPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { rashtriyaRiflesData } from '../data/rashtriya-rifles';
import type { UnitData } from '../types';

export default function RashtriyaRiflesPage() {
  return (
    <UnitPageLayout
      data={rashtriyaRiflesData as unknown as UnitData}
      heroImage="/assami/Rashtriya Rifles/rr-ops-kashmir.jpg"
      heroImages={[
        "/assami/Rashtriya Rifles/rr-ops-kashmir.jpg",
        "/assami/Rashtriya Rifles/rr-terrain-valley.jpg",
        "/assami/Rashtriya Rifles/rr-mountain-warriors.jpg",
        "/assami/Rashtriya Rifles/rr-urban-warfare.jpg",
        "/assami/Rashtriya Rifles/rr-sadbhavna-hearts.jpg"
      ]}
      badge="India's Premier Counter-Insurgency Force · Est. 1990"
      historyImage="/assami/Rashtriya Rifles/rr-terrain-valley.jpg"
    />
  );
}

