// src/pages/ArunachalScoutsPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { arunachalScoutsData } from '../data/arunachal-scouts';
import type { UnitData } from '../types';

export default function ArunachalScoutsPage() {
  return (
    <UnitPageLayout
      data={arunachalScoutsData as unknown as UnitData}
      heroImage="/assami/Arunachal Scouts/scouts-border-patrol.jpg"
      heroImages={[
        "/assami/Arunachal Scouts/scouts-border-patrol.jpg",
        "/assami/Arunachal Scouts/scouts-high-altitude.jpg",
        "/assami/Arunachal Scouts/scouts-raising-ceremony.jpg",
        "/assami/Arunachal Scouts/scouts-sons-of-soil.jpg"
      ]}
      badge="Mountain Infantry Regiment · Est. 9 November 2010"
      historyImage="/assami/Arunachal Scouts/scouts-high-altitude.jpg"
    />
  );
}

