import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';

export default function RashtriyaRiflesUnitVideosPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/rashtriya-rifles" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/rashtriya-rifles/${unit.id}` },
    { label: 'Video Archives' },
  ];

  return (
    <SubPageLayout
      title="Video Archives"
      breadcrumbs={breadcrumbs}
      backPath={`/rashtriya-rifles/${unit.id}`}
    >
      <VideosSection videos={[]} />
    </SubPageLayout>
  );
}