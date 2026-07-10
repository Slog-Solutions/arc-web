import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function TerritorialArmyUnitVideosPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'Video Archives' },
  ];

  return (
    <SubPageLayout
      title="Video Archives"
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <VideosSection videos={(getMergedSubUnitData('territorial-army', unitId || '')).videos || []} />
    </SubPageLayout>
  );
}