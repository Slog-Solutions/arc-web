// src/pages/RashtriyaRiflesPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { rashtriyaRiflesData } from '../data/rashtriya-rifles';
import type { UnitData } from '../types';

export default function RashtriyaRiflesPage() {
  return (
    <UnitPageLayout
      data={rashtriyaRiflesData as unknown as UnitData}
      heroImage="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1920&q=80"
      badge="India's Premier Counter-Insurgency Force"
      historyImage="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&q=80"
    />
  );
}
