import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { arunachalScoutsData } from '../../data/arunachal-scouts';

export default function ArunachalScoutsUnitHistoryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/arunachal-scouts" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/arunachal-scouts/${unit.id}` },
    { label: 'History' },
  ];

  const tailoredOverview = `The ${unit.name} (${unit.shortName}) inherits and builds upon a proud legacy. ${arunachalScoutsData.history.overview}`;

  return (
    <SubPageLayout
      title={`History of ${unit.shortName}`}
      breadcrumbs={breadcrumbs}
      backPath={`/arunachal-scouts/${unit.id}`}
    >
      <HistorySection
        overview={tailoredOverview}
        paragraphs={arunachalScoutsData.history.paragraphs}
        timeline={arunachalScoutsData.history.timeline}
        quotes={arunachalScoutsData.history.quotes}
        highlights={arunachalScoutsData.history.highlights}
        heroImage="/assami/Arunachal Scouts/scouts-border-patrol.jpg"
      />
    </SubPageLayout>
  );
}