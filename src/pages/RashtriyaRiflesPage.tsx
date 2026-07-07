// src/pages/RashtriyaRiflesPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { rashtriyaRiflesData } from '../data/rashtriya-rifles';
import type { UnitData } from '../types';

export default function RashtriyaRiflesPage() {
  return (
    <UnitPageLayout
      data={rashtriyaRiflesData as unknown as UnitData}
      heroImage="/assami/Rashtriya Rifles/rr-ops-kashmir.jpg"
      badge="India's Premier Counter-Insurgency Force · Est. 1990"
      historyImage="/assami/Rashtriya Rifles/rr-terrain-valley.jpg"
    />
  );
}

