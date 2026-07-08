// src/pages/AssamRiflesPage.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import SectionHeader from '../components/sections/SectionHeader';

export const ASSAM_RIFLES_UNITS = [
  {
    id: '1-ar', name: '1st Unit, Assam Units', shortName: '1 AR', established: '1835', location: 'Lushai Hills', history: [
      "Raised in 1835 as the Cachar Levy, 1 Assam Units represents the oldest continuously serving unit of India's oldest paramilitary force. The battalion was originally established to protect tea estates, maintain law and order in Assam, and secure communication routes through the difficult hill terrain. Over time, it evolved from a frontier police organization into a disciplined military force responsible for safeguarding India's eastern frontier.",
      "The unit participated in numerous frontier expeditions during the nineteenth century and later supported British military operations during both the First and Second World Wars. During the Burma Campaign of World War II, personnel of Assam Units provided reconnaissance, jungle warfare support, and logistical assistance.",
      "Following India's independence in 1947, 1 Assam Units became an integral component of the country's border security architecture. The battalion has participated extensively in counter-insurgency operations across Nagaland, Manipur, Mizoram, and Arunachal Pradesh while simultaneously conducting civic action programmes, humanitarian assistance, and disaster relief. Today, it continues to guard sections of the Indo–Myanmar border and remains a symbol of nearly two centuries of dedicated service."
    ]
  },
  {
    id: '2-ar', name: '2nd Unit, Assam Units', shortName: '2 AR', established: '1883', location: 'Shillong', history: [
      "Raised in 1883 at Shillong, 2 Assam Units was established to strengthen frontier administration in the North-East Frontier. The battalion was tasked with protecting remote settlements, maintaining internal security, and assisting civil authorities in regions with limited administrative presence.",
      "Throughout the colonial period, the battalion took part in several frontier expeditions and contributed manpower during both World Wars. After independence, the battalion shifted its focus toward safeguarding India's eastern borders and supporting peace and stability in insurgency-affected areas.",
      "Over the decades, 2 Assam Units has earned a reputation for professionalism in jungle warfare, border domination, civic outreach programmes, and humanitarian assistance. The battalion continues to uphold the traditions of courage, discipline, and service established by the Assam Units."
    ]
  },
  {
    id: '3-ar', name: '3rd Unit, Assam Units', shortName: '3 AR', established: '1891', location: 'Kohima', history: [
      "Raised in 1891, 3 Assam Units was formed during a period of expanding frontier responsibilities in the Naga Hills. The battalion was responsible for maintaining peace, protecting communication routes, and assisting civil administration in remote areas.",
      "During the twentieth century, the battalion contributed personnel to both World Wars and later participated in independent India's efforts to secure the North-East. Its operational experience includes counter-insurgency duties, border surveillance, and assistance during natural disasters.",
      "Today, 3 Assam Units remains actively engaged in protecting India's eastern frontier while strengthening civil–military relations through medical camps, educational initiatives, and community development projects."
    ]
  },
  {
    id: '4-ar', name: '4th Unit, Assam Units', shortName: '4 AR', established: '1913', location: 'Imphal', history: [
      "Raised in 1913, 4 Assam Units was established as part of the continued expansion of the Assam Frontier Force. The battalion's early responsibilities included border patrols, protection of isolated settlements, and maintaining peace in remote hill districts.",
      "The battalion later contributed to wartime operations during the Second World War and subsequently became involved in India's post-independence border management and internal security responsibilities.",
      "In recent decades, 4 Assam Units has participated in counter-insurgency operations, humanitarian assistance, and infrastructure development while maintaining a constant presence along strategic border areas."
    ]
  },
  {
    id: '5-ar', name: '5th Unit, Assam Units', shortName: '5 AR', established: '1920', location: 'Lokra', history: [
      "Raised in 1920, 5 Assam Units was created following the reorganization of frontier security after the First World War. The battalion initially focused on protecting remote border regions and ensuring stability across the North-East.",
      "After independence, its operational responsibilities expanded to include counter-insurgency operations, border surveillance, disaster response, and civic action initiatives. The battalion has consistently worked alongside local communities, contributing to education, healthcare, and infrastructure projects while maintaining security in difficult terrain."
    ]
  },
  {
    id: '6-ar', name: '6th Unit, Assam Units', shortName: '6 AR', established: '1924', location: 'Agartala', history: [
      "Raised in 1924, 6 Assam Units strengthened India's frontier security framework during a period of increasing strategic importance in the North-East.",
      "The battalion has accumulated extensive operational experience in jungle warfare, border management, and counter-insurgency operations. Alongside its military responsibilities, it has regularly organized medical camps, vocational training, and humanitarian relief efforts to improve the quality of life in remote communities."
    ]
  },
  {
    id: '7-ar', name: '7th Unit, Assam Units', shortName: '7 AR', established: '1930', location: 'Silchar', history: [
      "Raised in 1930, 7 Assam Units became part of the growing frontier force tasked with securing the North-Eastern region.",
      "The battalion has participated in border security operations, internal security duties, and extensive civic action programmes. Through continuous deployment in challenging terrain, it has developed expertise in mountain operations, jungle warfare, and cooperation with local populations."
    ]
  },
  {
    id: '8-ar', name: '8th Unit, Assam Units', shortName: '8 AR', established: '1938', location: 'Aizawl', history: [
      "Raised in 1938, 8 Assam Units was established shortly before the outbreak of the Second World War.",
      "During the Burma Campaign, the battalion supported Allied operations through reconnaissance, communication, and logistical assistance. Following independence, it became actively involved in securing India's eastern borders while conducting humanitarian assistance and development programmes throughout the North-East."
    ]
  },
  {
    id: '9-ar', name: '9th Unit, Assam Units', shortName: '9 AR', established: '1941', location: 'Itanagar', history: [
      "Raised in 1941 during wartime expansion, 9 Assam Units contributed to operations associated with the Burma theatre during the Second World War.",
      "Following India's independence, the battalion assumed responsibilities for border management, counter-insurgency operations, and assistance to civil authorities. It has consistently participated in disaster relief, medical outreach, and infrastructure development projects in remote regions."
    ]
  },
  {
    id: '10-ar', name: '10th Unit, Assam Units', shortName: '10 AR', established: '1943', location: 'Mokokchung', history: [
      "Raised in 1943, 10 Assam Units was established to strengthen military resources during the latter stages of the Second World War.",
      "In the decades that followed, the battalion became an important component of India's security framework in the North-East, participating in counter-insurgency operations, border surveillance, humanitarian missions, and community development initiatives."
    ]
  },
  {
    id: '12-ar', name: '12th Unit, Assam Units', shortName: '12 AR', established: '1948', location: 'Tura', history: [
      "Raised in 1948, shortly after Indian independence, 12 Assam Units was formed to strengthen national border security during a period of significant geopolitical change.",
      "The battalion has served extensively in counter-insurgency operations while also contributing to civic action programmes, infrastructure development, education initiatives, and disaster response across the North-East."
    ]
  },
  {
    id: '14-ar', name: '14th Unit, Assam Units', shortName: '14 AR', established: '1955', location: 'Dimapur', history: [
      "Raised in 1955, 14 Assam Units was established to meet the growing security requirements of independent India.",
      "The battalion has undertaken border security duties, anti-insurgency operations, humanitarian assistance, and peace-support missions while maintaining close cooperation with local communities through numerous welfare programmes."
    ]
  },
  {
    id: '15-ar', name: '15th Unit, Assam Units', shortName: '15 AR', established: '1960', location: 'Lunglei', history: [
      "Raised in 1960, 15 Assam Units was created during a period of modernization and expansion of India's frontier forces.",
      "The battalion has played an important role in safeguarding India's eastern frontier through border management, intelligence-based operations, civic action programmes, and assistance during natural disasters."
    ]
  },
  {
    id: '16-ar', name: '16th Unit, Assam Units', shortName: '16 AR', established: '1963', location: 'Ghaspani', history: [
      "Raised in 1963 following the 1962 Sino-Indian War, 16 Assam Units strengthened India's defensive posture along the eastern frontier.",
      "The battalion has extensive experience in high-altitude operations, jungle warfare, border surveillance, and counter-insurgency. It continues to support local communities through education, healthcare, and infrastructure development initiatives."
    ]
  },
  {
    id: '17-ar', name: '17th Unit, Assam Units', shortName: '17 AR', established: '1965', location: 'Shillong', history: [
      "Raised in 1965, 17 Assam Units was established as part of the continued expansion of the Assam Units to address evolving national security requirements.",
      "Since its raising, the battalion has actively participated in border management, counter-insurgency operations, humanitarian assistance, and civic action programmes throughout the North-East. The unit has earned recognition for maintaining peace, fostering trust among local communities, and contributing to regional stability while upholding the proud traditions of the Assam Units."
    ]
  },
];

export default function AssamRiflesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Assam Units | Home</title>
        <meta name="description" content="Explore the units and history of India's oldest paramilitary force — the Assam Units." />
      </Helmet>

      <HeroSection
        title="Assam Units"
        subtitle="Laitumkhrah, Shillong · Meghalaya"
        motto="The Sentinel of the North-East"
        mottoMeaning="Friends of the Hill People"
        established="1835"
        backgroundImage="/assami/17 Assam Rifles/ar-patrol-green.jpg"
        backgroundImages={[
          "/assami/17 Assam Rifles/ar-patrol-green.jpg",
          "/assami/17 Assam Rifles/ar-border-patrol.jpg",
          "/assami/17 Assam Rifles/ar-heritage-sentinel.jpg",
          "/assami/17 Assam Rifles/ar-joint-training.jpg",
          "/assami/17 Assam Rifles/ar-community-friends.jpg"
        ]}
        badge="India's Oldest Paramilitary Force — Est. 1835"
      />

      {/* Unit Showcase */}
      <section className="relative pt-28 pb-40 museum-room-wall spotlight-glow border-t border-[#2d2212]/30">
        <div className="museum-container pb-32">
          <SectionHeader
            tag="Regimental Directory"
            title="Assam Units Units"
            subtitle={
              <>
                Select an active unit to inspect its
                <br />
                individual history, achievements, and archives.
              </>
            }
          />

          <div className="flex justify-center mt-16 mb-32">
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(5, 220px)",
              }}
            >
              {ASSAM_RIFLES_UNITS.map((unit, i) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 5) * 0.08, duration: 0.5 }}
                  className="w-[220px]"
                >
                  <Link to={`/assam-rifles/${unit.id}`} className="group block h-full">
                    <div className="museum-wood-frame brass-corners rounded-xl overflow-hidden p-5 h-full flex flex-col items-center justify-between text-center hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.2)] transition-all duration-300 transform hover:-translate-y-1.5">

                      {/* Badge Icon */}
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500/[0.08] border border-yellow-500/15 mb-4 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-all duration-300">
                        <span className="text-xl filter drop-shadow-md">🦅</span>
                      </div>

                      {/* Unit Short Name */}
                      <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#ffd97d] to-[#d4a017] text-lg font-bold tracking-wide mb-1">
                        {unit.shortName}
                      </div>

                      {/* Full Name */}
                      <div className="font-inter text-stone-300 text-xs font-semibold uppercase leading-tight mb-2 h-8 flex items-center justify-center">
                        {unit.name.replace(', Assam Units', '')}
                      </div>

                      {/* Established */}
                      <div className="font-inter text-stone-500 text-[10px] tracking-wider uppercase mb-4">
                        Est. {unit.established}
                      </div>

                      {/* Button */}
                      <div className="flex items-center justify-center text-[9px] font-inter tracking-widest text-[#d4a017]/70 uppercase group-hover:text-yellow-400 transition-colors duration-200 mt-auto border-t border-[#8a6820]/20 pt-3 pb-3 w-full">
                        Enter Exhibit
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
