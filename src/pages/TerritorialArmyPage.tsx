// src/pages/TerritorialArmyPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { territorialArmyData } from '../data/territorial-army';
import type { UnitData } from '../types';

export default function TerritorialArmyPage() {
  return (
    <UnitPageLayout
      data={territorialArmyData as unknown as UnitData}
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
      badge="Citizen-Soldier Reserve Force of India · Est. 1949"
      historyImage="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80"
    />
  );
}
