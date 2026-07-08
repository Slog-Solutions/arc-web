// src/pages/assam-rifles/AssamRiflesUnitHistoryPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';
import { assamRiflesData } from '../../data/assam-rifles';

export default function AssamRiflesUnitHistoryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  const breadcrumbs = [
    { label: 'Assam Units', path: '/assam-rifles' },
    { label: unit.shortName, path: `/assam-rifles/${unit.id}` },
    { label: 'History' },
  ];

  // Dynamically tailor the overview for this unit
  const tailoredOverview = `As a vital unit within the Assam Units, the ${unit.name} (${unit.shortName}) inherits and builds upon the illustrious heritage of India's oldest paramilitary force. ${assamRiflesData.history.overview}`;

  return (
    <SubPageLayout
      title={`${unit.shortName} History & Heritage`}
      subtitle="Exhibition Room I"
      metaTitle={`${unit.shortName} History | Assam Units`}
      metaDesc={`Read the historic timeline, campaigns, and WWII achievements of the ${unit.name}.`}
      breadcrumbs={breadcrumbs}
      backPath={`/assam-rifles/${unit.id}`}
    >
      <HistorySection
        overview={tailoredOverview}
        paragraphs={unit.history || assamRiflesData.history.paragraphs}
        timeline={assamRiflesData.history.timeline}
        quotes={assamRiflesData.history.quotes}
        highlights={assamRiflesData.history.highlights}
        heroImage="/assami/17 Assam Rifles/ar-parade-shillong.jpg"
      />
    </SubPageLayout>
  );
}
