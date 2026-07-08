// src/pages/arc/ARCHistoryPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { arcData } from '../../data/arc';

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
        overview={arcData.history.overview}
        paragraphs={arcData.history.paragraphs}
        timeline={arcData.history.timeline}
        quotes={arcData.history.quotes}
        highlights={arcData.history.highlights}
        heroImage="/assami/Assam Regimental Centre/arc-raising-day.jpg"
      />
    </SubPageLayout>
  );
}
