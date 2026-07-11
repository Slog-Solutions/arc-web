import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function TerritorialArmyUnitHistoryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'History' },
  ];

  const tailoredOverview = `The ${unit.name} (${unit.shortName}) inherits and builds upon a proud legacy. ${(getMergedSubUnitData('territorial-army', unitId || '')).history.overview}`;

  return (
    <SubPageLayout
      title={`History of ${unit.shortName}`}
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <HistorySection
        overview={tailoredOverview}
        paragraphs={(getMergedSubUnitData('territorial-army', unitId || '')).history.paragraphs}
        timeline={(getMergedSubUnitData('territorial-army', unitId || '')).history.timeline}
        quotes={(getMergedSubUnitData('territorial-army', unitId || '')).history.quotes}
        highlights={(getMergedSubUnitData('territorial-army', unitId || '')).history.highlights}
        heroImage="/assami/Territorial Army/ta-parade-assam.jpg"
        isSubPage={true}
      />
    </SubPageLayout>
  );
}