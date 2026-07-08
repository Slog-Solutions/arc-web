import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { arunachalScoutsData } from '../../data/arunachal-scouts';

export default function ArunachalScoutsUnitGalleryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/arunachal-scouts" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/arunachal-scouts/${unit.id}` },
    { label: 'Photo Gallery' },
  ];

  return (
    <SubPageLayout
      title="Photo Gallery"
      breadcrumbs={breadcrumbs}
      backPath={`/arunachal-scouts/${unit.id}`}
    >
      <GallerySection gallery={arunachalScoutsData.gallery || []} />
    </SubPageLayout>
  );
}