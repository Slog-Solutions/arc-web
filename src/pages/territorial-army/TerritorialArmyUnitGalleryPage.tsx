import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { territorialArmyData } from '../../data/territorial-army';

export default function TerritorialArmyUnitGalleryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'Photo Gallery' },
  ];

  return (
    <SubPageLayout
      title="Photo Gallery"
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <GallerySection gallery={territorialArmyData.gallery || []} />
    </SubPageLayout>
  );
}