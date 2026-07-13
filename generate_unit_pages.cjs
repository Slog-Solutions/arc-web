const fs = require('fs');
const path = require('path');

const units = [
  {
    dir: 'arunachal-scouts',
    prefix: 'ArunachalScouts',
    parentPage: 'ArunachalScoutsPage',
    unitsVar: 'ARUNACHAL_SCOUTS_UNITS',
    dataImport: "import { arunachalScoutsData } from '../../data/arunachal-scouts';",
    dataVar: 'arunachalScoutsData',
    heroImage: '/assami/Arunachal Scouts/scouts-border-patrol.jpg',
    heroImages: [
      "/assami/Arunachal Scouts/scouts-border-patrol.jpg",
      "/assami/Arunachal Scouts/scouts-high-altitude.jpg",
      "/assami/Arunachal Scouts/scouts-raising-ceremony.jpg",
      "/assami/Arunachal Scouts/scouts-sons-of-soil.jpg"
    ]
  },
  {
    dir: 'rashtriya-rifles',
    prefix: 'RashtriyaRifles',
    parentPage: 'RashtriyaRiflesPage',
    unitsVar: 'RASHTRIYA_RIFLES_UNITS',
    dataImport: "import { rashtriyaRiflesData } from '../../data/rashtriya-rifles';",
    dataVar: 'rashtriyaRiflesData',
    heroImage: '/assami/Rashtriya Rifles/rr-ops-kashmir.jpg',
    heroImages: [
      "/assami/Rashtriya Rifles/rr-ops-kashmir.jpg",
      "/assami/Rashtriya Rifles/rr-terrain-valley.jpg",
      "/assami/Rashtriya Rifles/rr-mountain-warriors.jpg",
      "/assami/Rashtriya Rifles/rr-urban-warfare.jpg"
    ]
  },
  {
    dir: 'territorial-army',
    prefix: 'TerritorialArmy',
    parentPage: 'TerritorialArmyPage',
    unitsVar: 'TERRITORIAL_ARMY_UNITS',
    dataImport: "import { territorialArmyData } from '../../data/territorial-army';",
    dataVar: 'territorialArmyData',
    heroImage: '/assami/Territorial Army/ta-parade-assam.jpg',
    heroImages: [
      "/assami/Territorial Army/ta-parade-assam.jpg",
      "/assami/Territorial Army/ta-annual-camp.jpg",
      "/assami/Territorial Army/ta-field-ops.jpg",
      "/assami/Territorial Army/ta-medical-camp.jpg"
    ]
  }
];

units.forEach(u => {
  const dirPath = path.join(__dirname, 'src', 'pages', u.dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const files = {
    [`${u.prefix}UnitPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/sections/HeroSection';
import RoomSelector from '../../components/sections/RoomSelector';
import { ${u.unitsVar} } from '../${u.parentPage}';

export default function ${u.prefix}UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/${u.dir}" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{unit.shortName} | Digital Museum</title>
      </Helmet>

      <HeroSection
        title={unit.name}
        subtitle={\`Established: \${unit.established} · Location: \${unit.location}\`}
        motto="Valour and Honor"
        established={unit.established}
        backgroundImage="${u.heroImage}"
        backgroundImages={${JSON.stringify(u.heroImages)}}
        badge={\`\${unit.shortName} Exhibition — Est. \${unit.established}\`}
      />

      <RoomSelector basePath={\`/${u.dir}/\${unit.id}\`} unitName={unit.name} />
    </motion.div>
  );
}`,
    [`${u.prefix}UnitHistoryPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import HistorySection from '../../components/sections/HistorySection';
import { ${u.unitsVar} } from '../${u.parentPage}';
${u.dataImport}

export default function ${u.prefix}UnitHistoryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/${u.dir}" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: \`/${u.dir}/\${unit.id}\` },
    { label: 'History' },
  ];

  const tailoredOverview = \`The \${unit.name} (\${unit.shortName}) inherits and builds upon a proud legacy. \${${u.dataVar}.history.overview}\`;

  return (
    <SubPageLayout
      title={\`History of \${unit.shortName}\`}
      breadcrumbs={breadcrumbs}
      backPath={\`/${u.dir}/\${unit.id}\`}
    >
      <HistorySection
        overview={tailoredOverview}
        paragraphs={${u.dataVar}.history.paragraphs}
        timeline={${u.dataVar}.history.timeline}
        quotes={${u.dataVar}.history.quotes}
        highlights={${u.dataVar}.history.highlights}
        heroImage="${u.heroImage}"
      />
    </SubPageLayout>
  );
}`,
    [`${u.prefix}UnitAwardsPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { ${u.unitsVar} } from '../${u.parentPage}';
${u.dataImport}

export default function ${u.prefix}UnitAwardsPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/${u.dir}" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: \`/${u.dir}/\${unit.id}\` },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title="Honours & Awards"
      breadcrumbs={breadcrumbs}
      backPath={\`/${u.dir}/\${unit.id}\`}
    >
      <AchievementsSection achievements={${u.dataVar}.achievements || []} />
    </SubPageLayout>
  );
}`,
    [`${u.prefix}UnitGaonBurasPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { ${u.unitsVar} } from '../${u.parentPage}';
${u.dataImport}

export default function ${u.prefix}UnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/${u.dir}" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: \`/${u.dir}/\${unit.id}\` },
    { label: 'Gaon Buras' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras (Commanders)"
      breadcrumbs={breadcrumbs}
      backPath={\`/${u.dir}/\${unit.id}\`}
    >
      <CommandingOfficersSection officers={${u.dataVar}.commandingOfficers || []} gaonBuras={${u.dataVar}.gaonBuras || []} />
    </SubPageLayout>
  );
}`,
    [`${u.prefix}UnitGalleryPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { ${u.unitsVar} } from '../${u.parentPage}';
${u.dataImport}

export default function ${u.prefix}UnitGalleryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/${u.dir}" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: \`/${u.dir}/\${unit.id}\` },
    { label: 'Photo Gallery' },
  ];

  return (
    <SubPageLayout
      title="Photo Gallery"
      breadcrumbs={breadcrumbs}
      backPath={\`/${u.dir}/\${unit.id}\`}
    >
      <GallerySection gallery={${u.dataVar}.gallery || []} />
    </SubPageLayout>
  );
}`,
    [`${u.prefix}UnitVideosPage.tsx`]: `import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { ${u.unitsVar} } from '../${u.parentPage}';

export default function ${u.prefix}UnitVideosPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ${u.unitsVar}.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/${u.dir}" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: \`/${u.dir}/\${unit.id}\` },
    { label: 'Video Archives' },
  ];

  return (
    <SubPageLayout
      title="Video Archives"
      breadcrumbs={breadcrumbs}
      backPath={\`/${u.dir}/\${unit.id}\`}
    >
      <VideosSection videos={[]} />
    </SubPageLayout>
  );
}`
  };

  for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dirPath, filename), content);
  }
});

console.log('Unit pages generated.');
