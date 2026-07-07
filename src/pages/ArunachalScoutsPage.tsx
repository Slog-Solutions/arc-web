// src/pages/ArunachalScoutsPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { arunachalScoutsData } from '../data/arunachal-scouts';
import type { UnitData } from '../types';

export default function ArunachalScoutsPage() {
  return (
    <UnitPageLayout
      data={arunachalScoutsData as unknown as UnitData}
      heroImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
      badge="Mountain Infantry Regiment · Est. 2010"
      historyImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
    />
  );
}
