// src/pages/AssamRiflesPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { assamRiflesData } from '../data/assam-rifles';
import type { UnitData } from '../types';

export default function AssamRiflesPage() {
  return (
    <UnitPageLayout
      data={assamRiflesData as unknown as UnitData}
      heroImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
      badge="Oldest Paramilitary Force of India"
      historyImage="https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=1200&q=80"
    />
  );
}
