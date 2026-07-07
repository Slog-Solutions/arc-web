// src/pages/TerritorialArmyPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { territorialArmyData } from '../data/territorial-army';
import type { UnitData } from '../types';

export default function TerritorialArmyPage() {
  return (
    <UnitPageLayout
      data={territorialArmyData as unknown as UnitData}
      heroImage="/assami/Territorial Army/ta-parade-assam.jpg"
      badge="Citizen-Soldier Reserve Force of India · Est. 9 October 1949"
      historyImage="/assami/Territorial Army/ta-annual-camp.jpg"
    />
  );
}

