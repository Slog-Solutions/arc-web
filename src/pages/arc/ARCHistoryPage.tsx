// src/pages/arc/ARCHistoryPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { getUnitData } from '../../admin/store/adminStore';

export default function ARCHistoryPage() {
  const breadcrumbs = [
    { label: 'Assam Regimental Centre', path: '/arc' },
    { label: 'History' },
  ];

  return (
    <SubPageLayout
      title="History & Heritage"
      subtitle="Exhibition Room I"
      metaTitle="History | Assam Regimental Centre"
      metaDesc="Step back in time to explore the raising day, the World War II campaigns, and the historic journey of the Assam Regimental Centre."
      breadcrumbs={breadcrumbs}
      backPath="/arc"
    >
      <HistorySection
        overview={getUnitData('arc').history.overview}
        paragraphs={getUnitData('arc').history.paragraphs}
        timeline={getUnitData('arc').history.timeline}
        quotes={getUnitData('arc').history.quotes}
        highlights={getUnitData('arc').history.highlights}
        heroImage="/assami/Assam Regimental Centre/arc-raising-day.jpg"
        isSubPage={true}
      />
    </SubPageLayout>
  );
}
