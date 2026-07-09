// src/pages/arc/ARCVideosPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { getUnitData } from '../../admin/store/adminStore';

export default function ARCVideosPage() {
  const breadcrumbs = [
    { label: 'Assam Regimental Centre', path: '/arc' },
    { label: 'Regimental Cinema' },
  ];

  return (
    <SubPageLayout
      title="Regimental Cinema"
      subtitle="Exhibition Room V"
      metaTitle="Videos | Assam Regimental Centre"
      metaDesc="Watch regimental documentaries, history films, and training insights on the Assam Regimental Centre."
      breadcrumbs={breadcrumbs}
      backPath="/arc"
    >
      <VideosSection videos={getUnitData('arc').videos} />
    </SubPageLayout>
  );
}
