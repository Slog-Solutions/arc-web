// src/pages/AssamRiflesPage.tsx
import UnitPageLayout from '../layouts/UnitPageLayout';
import { assamRiflesData } from '../data/assam-rifles';
import type { UnitData } from '../types';

export default function AssamRiflesPage() {
  return (
    <UnitPageLayout
      data={assamRiflesData as unknown as UnitData}
      heroImage="/assami/17 Assam Rifles/ar-patrol-green.jpg"
      heroImages={[
        "/assami/17 Assam Rifles/ar-patrol-green.jpg",
        "/assami/17 Assam Rifles/ar-border-patrol.jpg",
        "/assami/17 Assam Rifles/ar-heritage-sentinel.jpg",
        "/assami/17 Assam Rifles/ar-joint-training.jpg",
        "/assami/17 Assam Rifles/ar-community-friends.jpg"
      ]}
      badge="India's Oldest Paramilitary Force — Est. 1835"
      historyImage="/assami/17 Assam Rifles/ar-parade-shillong.jpg"
    />
  );
}
