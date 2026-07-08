import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';

export default function ArunachalScoutsUnitVideosPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/arunachal-scouts" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/arunachal-scouts/${unit.id}` },
    { label: 'Video Archives' },
  ];

  return (
    <SubPageLayout
      title="Video Archives"
      breadcrumbs={breadcrumbs}
      backPath={`/arunachal-scouts/${unit.id}`}
    >
      <VideosSection videos={[]} />
    </SubPageLayout>
  );
}