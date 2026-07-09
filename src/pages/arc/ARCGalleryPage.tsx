// src/pages/arc/ARCGalleryPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { getUnitData } from '../../admin/store/adminStore';

export default function ARCGalleryPage() {
  const breadcrumbs = [
    { label: 'Assam Regimental Centre', path: '/arc' },
    { label: 'Photography Archives' },
  ];

  return (
    <SubPageLayout
      title="Photography Archives"
      subtitle="Exhibition Room IV"
      metaTitle="Gallery | Assam Regimental Centre"
      metaDesc="Step into the photo gallery showcasing raising day celebrations, training activities, passing out parades, and museum exhibits at ARC Shillong."
      breadcrumbs={breadcrumbs}
      backPath="/arc"
    >
      <GallerySection gallery={getUnitData('arc').gallery} />
    </SubPageLayout>
  );
}
