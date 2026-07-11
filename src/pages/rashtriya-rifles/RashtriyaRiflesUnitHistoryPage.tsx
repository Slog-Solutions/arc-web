import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function RashtriyaRiflesUnitHistoryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/rashtriya-rifles" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/rashtriya-rifles/${unit.id}` },
    { label: 'History' },
  ];

  const tailoredOverview = `The ${unit.name} (${unit.shortName}) inherits and builds upon a proud legacy. ${(getMergedSubUnitData('rashtriya-rifles', unitId || '')).history.overview}`;

  return (
    <SubPageLayout
      title={`History of ${unit.shortName}`}
      breadcrumbs={breadcrumbs}
      backPath={`/rashtriya-rifles/${unit.id}`}
    >
      <HistorySection
        overview={tailoredOverview}
        paragraphs={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).history.paragraphs}
        timeline={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).history.timeline}
        quotes={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).history.quotes}
        highlights={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).history.highlights}
        heroImage="/assami/Rashtriya Rifles/rr-ops-kashmir.jpg"
        isSubPage={true}
      />
    </SubPageLayout>
  );
}