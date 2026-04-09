'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.expertise': 'Expertise',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.journey': 'Journey',
    'nav.connect': 'Connect',

    // About
    'about.tagline': 'Herdanius Larobu.',
    'about.name': 'Capluk',
    'role.creative_director': 'Creative Director',
    'role.motion_designer': 'Motion Designer',
    'role.vfx_artist': 'VFX Artist',
    'role.film_director': 'Film Director',

    // Expertise
    'expertise.multimedia.title': 'Multimedia Production',
    'expertise.multimedia.vstory': 'Visual Storytelling',
    'expertise.multimedia.cdirect': 'Creative Direction',
    'expertise.multimedia.vedit': 'Video Editing & Post Production',
    'expertise.multimedia.cvideo': 'Cinematic Video Production',
    'expertise.multimedia.dcontent': 'Digital Content Development',
    'expertise.multimedia.pipeline': 'Post production pipeline',
    'expertise.multimedia.media': 'Media Asset management',

    'expertise.tools.title': 'Toolkits & Software',
    'expertise.tools.ae': 'Adobe After Effects',
    'expertise.tools.pr': 'Adobe Premiere Pro',
    'expertise.tools.dv': 'DaVinci Resolve',
    'expertise.tools.bl': 'Blender 3D',
    'expertise.tools.fc': 'Final Cut Pro',
    'expertise.tools.camera': 'Digital Camera Production',

    'expertise.ai.title': 'Emerging Tech & AI',
    'expertise.ai.visual': 'AI-Assisted Visual Concepting',
    'expertise.ai.gen': 'Generative Video & Image Synthesis',
    'expertise.ai.comfy': 'ComfyUI & Stable Diffusion Pipelines',
    'expertise.ai.virtual': 'Real-time Virtual Production',
    'expertise.ai.auto': 'AI-Driven Workflow Automation',

    'expertise.vfx.title': 'Motion Graphics & Visual Effects',
    'expertise.vfx.design': 'Motion graphics design',
    'expertise.vfx.anim': '2D/3D animation',
    'expertise.vfx.comp': 'Compositing of live-action and CG elements',
    'expertise.vfx.roto': 'Rotoscoping & camera tracking',
    'expertise.vfx.particle': 'Particle systems',

    // Journey
    'journey.tagline': 'The Timeline.',
    'journey.title': 'Journey',
    'journey.milestones.edu-smk.role': 'Broadcasting Student',
    'journey.milestones.edu-smk.company': 'Vocational School',
    'journey.milestones.edu-smk.companyType': 'Education',
    'journey.milestones.edu-smk.card0.title': 'First Takes',
    'journey.milestones.edu-smk.card1.title': 'The Starting Point',
    'journey.milestones.edu-smk.card1.description': 'Studied multimedia, camera operation, and video editing. Discovered a deep passion for visual storytelling and digital arts.',
    'journey.milestones.edu-smk.card1.ach1': 'Best Video Project',
    'journey.milestones.edu-smk.card1.ach2': 'Broadcasting Club Leader',
    'journey.milestones.edu-smk.card1.ach3': 'Early exposure to video editing',

    'journey.milestones.starvision.role': 'Visual FX Artist',
    'journey.milestones.starvision.company': 'Starvision Plus',
    'journey.milestones.starvision.companyType': 'Film Company',
    'journey.milestones.starvision.card0.title': 'Featured Films',
    'journey.milestones.starvision.card1.title': 'Building the Foundation',
    'journey.milestones.starvision.card1.description': 'Worked on VFX compositing and motion tracking for feature films. Developed skills in Nuke, After Effects, and on-set VFX supervision for Indonesian cinema productions.',
    'journey.milestones.starvision.card1.ach1': 'VFX shots for 3+ feature films',
    'journey.milestones.starvision.card1.ach2': 'On-set VFX supervision',
    'journey.milestones.starvision.card1.ach3': 'Compositing & motion tracking',

    'journey.milestones.freelance.role': 'Film Director',
    'journey.milestones.freelance.company': 'Freelance',
    'journey.milestones.freelance.companyType': 'Independent',
    'journey.milestones.freelance.card0.title': "Director's Reel",
    'journey.milestones.freelance.card1.title': 'Forging a Vision',
    'journey.milestones.freelance.card1.description': 'Transitioned from VFX to full creative direction. Led independent film projects, commercial productions, and music videos. Built a signature visual style blending practical and digital techniques.',
    'journey.milestones.freelance.ach1': 'Directed 10+ commercial projects',
    'journey.milestones.freelance.ach2': 'Music video direction',
    'journey.milestones.freelance.ach3': 'Creative storytelling leadership',

    'journey.milestones.mataque.role': 'Creative Director',
    'journey.milestones.mataque.company': 'Mataque Studio',
    'journey.milestones.mataque.companyType': 'Creative Agency',
    'journey.milestones.mataque.card0.title': 'Studio Highlights',
    'journey.milestones.mataque.card1.title': 'Leading the Vision',
    'journey.milestones.mataque.card1.description': 'Leading creative strategy for a full-service production studio. Overseeing brand campaigns, motion design projects, and building a team of visual storytellers across digital platforms.',
    'journey.milestones.mataque.ach1': 'Studio creative leadership',
    'journey.milestones.mataque.ach2': 'Brand campaign strategy',
    'journey.milestones.mataque.ach3': 'Team building & mentorship',
    'journey.milestones.films_count': '{{count}} Feature Films',

    'journey.role1': 'Creative Director',
    'journey.loc1': 'Visual Narrative',
    'journey.role2': 'Senior Motion Designer',
    'journey.loc2': 'Studio Production',
    'journey.role3': 'Motion Graphic Lead',
    'journey.loc3': 'Agency Studio',
    'journey.role4': 'Freelance Filmmaker',
    'journey.loc4': 'Fiverr & Local Client',
    'journey.desc4': 'Worked with various international and local clients to create visual content.',
    'journey.role5': 'Bachelor of Motion Design',
    'journey.loc5': 'University of Arts',

    // Portfolio
    'portfolio.title': 'Selected Works',
    'portfolio.view_project': 'View Project',
    'portfolio.concept': 'Concept',
    'portfolio.item.intro.title': 'Intro Animation',
    'portfolio.item.intro.category': 'Motion Design',
    'portfolio.item.intro.desc': 'Cinematic intro sequences blending 3D elements with dynamic typography for branded content.',
    'portfolio.item.title.title': 'Title Design Animation',
    'portfolio.item.title.category': 'Title Sequence',
    'portfolio.item.title.desc': 'Film and series title sequences with layered compositing and custom typeface animation.',
    'portfolio.item.vfx.title': 'Visual FX',
    'portfolio.item.vfx.category': 'VFX Compositing',
    'portfolio.item.vfx.desc': 'Photorealistic compositing, green screen keying, and particle simulations for feature productions.',
    'portfolio.item.ads.title': 'Social Media Ads',
    'portfolio.item.ads.category': 'Advertising',
    'portfolio.item.ads.desc': 'Scroll-stopping ad creatives optimized for Instagram Reels, TikTok, and YouTube Shorts.',

    // Connect
    'connect.title_top': "Let's Create",
    'connect.title_bottom': 'Something Beyond',
    'connect.tagline': 'Elevate your visual storytelling with cinematic motion design.',
    'connect.email_me': 'Email Me',
    'connect.quick_links': 'Quick Links',
    'connect.social': 'Social',
    'connect.location': 'Jakarta, Indonesia',
    'connect.open_collab': 'Open for Collab',
    'connect.download_cv': 'Download Full CV',
    'connect.wa_message': "Hi Capluk! I'm ready for collab. I'd like to collaborate with you.",
    // Page Content (Navbar Expanded)
    'portfolio.intro.desc': 'A curated portfolio of cinematic storytelling, visual effects, and motion graphics workflow, spanning feature films, television series, and digital platforms. Integrates traditional filmmaking craft with generative image/video processes and streamlined post-production pipelines. Emphasizes leadership in directing, visual effects supervision, and scalable creative production.',
    'expertise.intro.title': 'Exploring new tech for visual.',
    'expertise.intro.desc': 'Focused on integrating AI into end-to-end production workflows to improve efficiency, while maintaining manual creative control to ensure best video quality. Experienced in AI-assisted visual concept development and building AI-supported creative pipelines. Continuously exploring emerging technologies and their applications to expand possibilities in visual production.',
    'about.intro.title': 'Analog Roots. Digital Future.',
    'about.intro.desc': 'Filmmaker, motion designer, and visual storyteller with over two decades navigating the evolution of screen media. From 8-bit gaming and film reels to today\'s AI-driven workflow and immersive production pipelines. Translating traditional cinematic storytelling into modern digital formats, combining craft, technology, and creative strategy to produce visuals that resonate with contemporary audiences.',
    'journey.intro.mobile_title': 'Project Timeline',
  },
  id: {
    // Navbar
    'nav.expertise': 'Keahlian',
    'nav.about': 'Tentang',
    'nav.portfolio': 'Karya',
    'nav.journey': 'Perjalanan',
    'nav.connect': 'Kontak',

    // About
    'about.tagline': 'Herdanius Larobu.',
    'about.name': 'Capluk',
    'role.creative_director': 'Creative Director',
    'role.motion_designer': 'Motion Designer',
    'role.vfx_artist': 'VFX Artist',
    'role.film_director': 'Sutradara Film',

    // Expertise
    'expertise.multimedia.title': 'Produksi Multimedia',
    'expertise.multimedia.vstory': 'Penceritaan Visual',
    'expertise.multimedia.cdirect': 'Arahan Kreatif',
    'expertise.multimedia.vedit': 'Editing Video & Pasca Produksi',
    'expertise.multimedia.cvideo': 'Produksi Video Sinematik',
    'expertise.multimedia.dcontent': 'Pengembangan Konten Digital',
    'expertise.multimedia.pipeline': 'Pipeline Pasca Produksi',
    'expertise.multimedia.media': 'Manajemen Aset Media',

    'expertise.tools.title': 'Toolkit & Perangkat Lunak',
    'expertise.tools.ae': 'Adobe After Effects',
    'expertise.tools.pr': 'Adobe Premiere Pro',
    'expertise.tools.dv': 'DaVinci Resolve',
    'expertise.tools.bl': 'Blender 3D',
    'expertise.tools.fc': 'Final Cut Pro',
    'expertise.tools.camera': 'Produksi Kamera Digital',

    'expertise.ai.title': 'Teknologi Modern & AI',
    'expertise.ai.visual': 'Konsep Visual Berbasis AI',
    'expertise.ai.gen': 'Sintesis Video & Gambar Generatif',
    'expertise.ai.comfy': 'Pipeline ComfyUI & Stable Diffusion',
    'expertise.ai.virtual': 'Produksi Virtual Real-time',
    'expertise.ai.auto': 'Otomasi Alur Kerja Berbasis AI',

    'expertise.vfx.title': 'Motion Graphics & Efek Visual',
    'expertise.vfx.design': 'Desain Motion Graphics',
    'expertise.vfx.anim': 'Animasi 2D/3D',
    'expertise.vfx.comp': 'Kompositing Elemen Live-action & CG',
    'expertise.vfx.roto': 'Rotoskopi & Pelacakan Kamera',
    'expertise.vfx.particle': 'Sistem Partikel',

    // Journey
    'journey.tagline': 'Garis Waktu.',
    'journey.title': 'Perjalanan',
    'journey.milestones.edu-smk.role': 'Siswa Penyiaran',
    'journey.milestones.edu-smk.company': 'Sekolah Menengah Kejuruan',
    'journey.milestones.edu-smk.companyType': 'Pendidikan',
    'journey.milestones.edu-smk.card0.title': 'Ambilan Pertama',
    'journey.milestones.edu-smk.card1.title': 'Titik Awal',
    'journey.milestones.edu-smk.card1.description': 'Mempelajari multimedia, pengoperasian kamera, dan pengeditan video. Menemukan minat besar dalam penceritaan visual dan seni digital.',
    'journey.milestones.edu-smk.card1.ach1': 'Proyek Video Terbaik',
    'journey.milestones.edu-smk.card1.ach2': 'Ketua Klub Penyiaran',
    'journey.milestones.edu-smk.card1.ach3': 'Pengenalan awal pengeditan video',

    'journey.milestones.starvision.role': 'Visual FX Artist',
    'journey.milestones.starvision.company': 'Starvision Plus',
    'journey.milestones.starvision.companyType': 'Perusahaan Film',
    'journey.milestones.starvision.card0.title': 'Film Fitur',
    'journey.milestones.starvision.card1.title': 'Membangun Pondasi',
    'journey.milestones.starvision.card1.description': 'Mengerjakan kompositing VFX dan pelacakan gerak untuk film layar lebar. Mengembangkan keterampilan di Nuke, After Effects, dan supervisi VFX di lokasi untuk produksi bioskop Indonesia.',
    'journey.milestones.starvision.card1.ach1': 'Shot VFX untuk 3+ film layar lebar',
    'journey.milestones.starvision.card1.ach2': 'Supervisi VFX di lokasi',
    'journey.milestones.starvision.card1.ach3': 'Kompositing & pelacakan gerak',

    'journey.milestones.freelance.role': 'Sutradara Film',
    'journey.milestones.freelance.company': 'Freelance',
    'journey.milestones.freelance.companyType': 'Independen',
    'journey.milestones.freelance.card0.title': "Reel Sutradara",
    'journey.milestones.freelance.card1.title': 'Membentuk Visi',
    'journey.milestones.freelance.card1.description': 'Beralih dari VFX ke penyutradaraan kreatif penuh. Memimpin proyek film independen, produksi komersial, dan video musik. Membangun gaya visual unik yang memadukan teknik praktis dan digital.',
    'journey.milestones.freelance.ach1': 'Menyutradarai 10+ proyek komersial',
    'journey.milestones.freelance.ach2': 'Penyutradaraan video musik',
    'journey.milestones.freelance.ach3': 'Kepemimpinan penceritaan kreatif',

    'journey.milestones.mataque.role': 'Creative Director',
    'journey.milestones.mataque.company': 'Mataque Studio',
    'journey.milestones.mataque.companyType': 'Agensi Kreatif',
    'journey.milestones.mataque.card0.title': 'Sorotan Studio',
    'journey.milestones.mataque.card1.title': 'Memimpin Visi',
    'journey.milestones.mataque.card1.description': 'Memimpin strategi kreatif untuk studio produksi layanan lengkap. Mengawasi kampanye merek, proyek desain gerak, dan membangun tim pencerita visual di berbagai platform digital.',
    'journey.milestones.mataque.ach1': 'Kepemimpinan kreatif studio',
    'journey.milestones.mataque.ach2': 'Strategi kampanye merek',
    'journey.milestones.mataque.ach3': 'Pembangunan tim & bimbingan',
    'journey.milestones.films_count': '{{count}} Film Layar Lebar',

    'journey.role1': 'Direktur Kreatif',
    'journey.loc1': 'Naratif Visual',
    'journey.role2': 'Desainer Motion Senior',
    'journey.loc2': 'Produksi Studio',
    'journey.role3': 'Lead Motion Graphic',
    'journey.loc3': 'Studio Agensi',
    'journey.role4': 'Filmmaker Freelance',
    'journey.loc4': 'Fiverr & Klien Lokal',
    'journey.desc4': 'Bekerja dengan berbagai klien internasional dan lokal untuk membuat konten visual.',
    'journey.role5': 'Sarjana Desain Motion',
    'journey.loc5': 'Universitas Seni',

    // Portfolio
    'portfolio.title': 'Karya Terpilih',
    'portfolio.view_project': 'Lihat Proyek',
    'portfolio.concept': 'Konsep',
    'portfolio.item.intro.title': 'Animasi Intro',
    'portfolio.item.intro.category': 'Desain Motion',
    'portfolio.item.intro.desc': 'Urutan intro sinematik yang memadukan elemen 3D dengan tipografi dinamis untuk konten merek.',
    'portfolio.item.title.title': 'Animasi Desain Judul',
    'portfolio.item.title.category': 'Urutan Judul',
    'portfolio.item.title.desc': 'Urutan judul film dan seri dengan kompositing berlapis dan animasi jenis huruf kustom.',
    'portfolio.item.vfx.title': 'Visual FX',
    'portfolio.item.vfx.category': 'Kompositing VFX',
    'portfolio.item.vfx.desc': 'Kompositing fotorealistik, keying layar hijau, dan simulasi partikel untuk produksi fitur.',
    'portfolio.item.ads.title': 'Iklan Media Sosial',
    'portfolio.item.ads.category': 'Periklanan',
    'portfolio.item.ads.desc': 'Kreatif iklan yang menarik perhatian, dioptimalkan untuk Instagram Reels, TikTok, dan YouTube Shorts.',

    // Connect
    'connect.title_top': 'Mari Berkreasi',
    'connect.title_bottom': 'Sesuatu yang Luar Biasa',
    'connect.tagline': 'Tingkatkan penceritaan visual Anda dengan desain motion sinematik.',
    'connect.email_me': 'Email',
    'connect.quick_links': 'Tautan Cepat',
    'connect.social': 'Sosial',
    'connect.location': 'Jakarta, Indonesia',
    'connect.open_collab': 'Mari Berkolaborasi',
    'connect.download_cv': 'Download CV',
    'connect.wa_message': 'Halo Capluk! Saya siap berkolaborasi. Saya ingin bekerja sama dengan Anda.',
    // Page Content (Navbar Expanded)
    'portfolio.intro.desc': 'Portofolio terkurasi dari penceritaan sinematik, efek visual, dan alur kerja grafis gerak, yang mencakup film layar lebar, seri televisi, dan platform digital. Mengintegrasikan kerajinan pembuatan film tradisional dengan proses gambar/video generatif dan pipeline pasca-produksi yang efisien. Menekankan kepemimpinan dalam penyutradaraan, supervisi efek visual, dan produksi kreatif yang terukur.',
    'expertise.intro.title': 'Menjelajahi teknologi baru untuk visual.',
    'expertise.intro.desc': 'Berfokus pada pengintegrasian AI ke dalam alur kerja produksi end-to-end untuk meningkatkan efisiensi, sambil tetap mempertahankan kontrol kreatif manual untuk memastikan kualitas video terbaik. Berpengalaman dalam pengembangan konsep visual berbantuan AI dan membangun pipeline kreatif yang didukung AI. Terus mengeksplorasi teknologi baru dan aplikasinya untuk memperluas kemungkinan dalam produksi visual.',
    'about.intro.title': 'Analog Roots. Digital Future',
    'about.intro.desc': 'Filmmaker, motion designer, dan pencerita visual dengan lebih dari dua dekade menavigasi evolusi media layar. Dari game 8-bit dan gulungan film hingga alur kerja berbasis AI saat ini dan pipeline produksi yang imersif. Menerjemahkan penceritaan sinematik tradisional ke dalam format digital modern, menggabungkan kerajinan, teknologi, dan strategi kreatif untuk menghasilkan visual yang beresonansi dengan penonton kontemporer.',
    'journey.intro.mobile_title': 'Garis Waktu Proyek',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, variables?: Record<string, string | number>) => {
    const langBranch = translations[language];
    let text = (langBranch as any)[key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, String(v));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
