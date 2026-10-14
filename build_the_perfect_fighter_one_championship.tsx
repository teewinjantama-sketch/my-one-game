import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Swords,
  Shield,
  Zap,
  Brain,
  Flame,
  Target,
  Trophy,
  RotateCcw,
  Share2,
  Eye,
  EyeOff,
  Users,
  Check,
  Sparkles,
  ChevronRight,
  Award,
  AlertTriangle,
  TrendingUp,
  Search,
  X,
  Volume2,
  VolumeX,
  Info,
  Crown,
  Dumbbell,
  Activity,
  Camera,
  Upload,
  Link,
  Trash2,
  Image as ImageIcon,
  Wind
} from 'lucide-react';

// ==========================================
// 1. หมวดหมู่ทักษะทั้ง 8 ด้าน (SKILL CATEGORIES)
// ==========================================
const SKILL_CATEGORIES = [
  {
    id: 'punch',
    shortTh: 'หมัด',
    nameEn: 'Punching Skill',
    color: '#EF4444',
    icon: Flame
  },
  {
    id: 'kick',
    shortTh: 'เตะ/แข้ง',
    nameEn: 'Kicking Game',
    color: '#FFD700',
    icon: Zap
  },
  {
    id: 'clinch',
    shortTh: 'ศอก/เข่า',
    nameEn: 'Elbows & Knees',
    color: '#F97316',
    icon: Swords
  },
  {
    id: 'power',
    shortTh: 'ความหนักอาวุธ',
    nameEn: 'KO Power',
    color: '#EC4899',
    icon: Dumbbell
  },
  {
    id: 'chin',
    shortTh: 'ความอึด',
    nameEn: 'Chin & Durability',
    color: '#10B981',
    icon: Shield
  },
  {
    id: 'cardio',
    shortTh: 'ระบบหายใจ',
    nameEn: 'Cardio & Stamina',
    color: '#14B8A6',
    icon: Wind
  },
  {
    id: 'speed',
    shortTh: 'ความเร็ว',
    nameEn: 'Speed & Footwork',
    color: '#38BDF8',
    icon: Activity
  },
  {
    id: 'iq',
    shortTh: 'ไอคิวมวย',
    nameEn: 'Fight IQ & Defense',
    color: '#A855F7',
    icon: Brain
  }
];

function renderSkillIcon(skillId, className = 'w-4 h-4', color = 'currentColor') {
  const cat = SKILL_CATEGORIES.find((s) => s.id === skillId);
  const IconComponent = cat?.icon || Trophy;
  return React.createElement(IconComponent, {
    className,
    style: { color }
  });
}

// ==========================================
// 2. ฐานข้อมูลนักสู้ ONE CHAMPIONSHIP ทั้ง 35 คน + ค่าพลังที่ปรับสมดุลตามจริง
// ==========================================
const FIGHTERS_ROSTER = [
  {
    id: 1,
    nameTh: 'ตะวันฉาย พีเค.แสนชัย',
    nameEn: 'Tawanchai PK.Saenchai',
    nickname: 'ซ้ายดารา (Left Meteor)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Featherweight Muay Thai',
    champion: true,
    signature: 'แข้งซ้ายความเร็วแสง & จังหวะฝีมือระดับปรมาจารย์',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2021/05/Tawanchai-Hero-1200x1165-2.jpg',
    wikiEn: 'Tawanchai_P.K.Saenchaimuaythaigym',
    wikiTh: 'ตะวันฉาย_พี.เค.แสนชัยมวยไทยยิม',
    look: {
      skin: '#E0AC8B',
      hair: 'slickSide',
      hairColor: '#18181B',
      glove: '4oz_gold',
      stance: 'sniper',
      shorts: '#B91C1C'
    },
    stats: {
      kick: 99,
      power: 96,
      iq: 95,
      cardio: 92,
      speed: 91,
      punch: 90,
      clinch: 89,
      chin: 89
    }
  },
  {
    id: 2,
    nameTh: 'รถถัง จิตรเมืองนนท์',
    nameEn: 'Rodtang Jitmuangnon',
    nickname: 'ดิ ไอรอนแมน (The Iron Man)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Flyweight Muay Thai',
    champion: true,
    signature: 'คางเหล็กเดินบดบี้ & หมัดหนักสั่งตายไม่กลัวใคร',
    themeColor: '#E60000',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2018/08/Rodtang-hero-1200x1165-1.jpg',
    wikiEn: 'Rodtang_Jitmuangnon',
    wikiTh: 'รถถัง_จิตรเมืองนนท์',
    look: {
      skin: '#C6865A',
      hair: 'curlyDrop',
      hairColor: '#141414',
      glove: '4oz_red',
      stance: 'ironman',
      shorts: '#DC2626'
    },
    stats: {
      chin: 99,
      punch: 96,
      power: 96,
      cardio: 96,
      clinch: 92,
      kick: 91,
      iq: 90,
      speed: 89
    }
  },
  {
    id: 3,
    nameTh: 'ซุปเปอร์เล็ก ซุปเปอร์เล็กมวยไทย',
    nameEn: 'Superlek Superlek Muay Thai',
    nickname: 'เดอะ คิกกิง แมชชีน (The Kicking Machine)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight / Flyweight',
    champion: true,
    signature: 'แข้งขวาทำลายล้าง & ศอกดักจังหวะสุดคมกริบ',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2019/01/Superlek-hero-1500x920-1-600x368.png',
    wikiEn: 'Superlek_Kiatmuu9',
    wikiTh: 'ซุปเปอร์เล็ก_เกียรติหมู่_9',
    look: {
      skin: '#C88A5E',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_gold',
      stance: 'highGuard',
      shorts: '#1E40AF'
    },
    stats: {
      kick: 99,
      iq: 98,
      clinch: 97,
      cardio: 97,
      chin: 94,
      power: 93,
      speed: 92,
      punch: 88
    }
  },
  {
    id: 4,
    nameTh: 'โจนาธาน แฮ็กเกอร์ตี้',
    nameEn: 'Jonathan Haggerty',
    nickname: 'เดอะ เจเนอรัล (The General)',
    country: 'สหราชอาณาจักร',
    flag: '🇬🇧',
    division: 'Bantamweight Kickboxing / Muay Thai',
    champion: true,
    signature: 'ฟุตเวิร์คพริ้วไหว ศอกสับลง & คอมโบหลากหลาย',
    themeColor: '#3B82F6',
    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPcq0m81nWlO4fq4bZzfwhJ5WjMn1OzX4kJ1WCb78yFOwxM9eqcESmwcWAZr9l2fuqA_BcH4OvmrBDhnXiBigbv6B2xNaqUVUY5EYE9w&s=10',
    wikiEn: 'Jonathan_Haggerty',
    wikiTh: 'โจนาธาน_แฮ็กเกอร์ตี',
    look: {
      skin: '#F1C6A7',
      hair: 'highFade',
      hairColor: '#4A3525',
      facialHair: 'stubble',
      glove: 'kb_blue',
      stance: 'elbowGeneral',
      shorts: '#1D4ED8'
    },
    stats: {
      cardio: 96,
      speed: 95,
      clinch: 94,
      punch: 93,
      power: 92,
      iq: 92,
      kick: 91,
      chin: 84
    }
  },
  {
    id: 5,
    nameTh: 'ชิงกิซ อัลลาซอฟ',
    nameEn: 'Chingiz Allazov',
    nickname: 'ชิงก้า (Chinga)',
    country: 'อาเซอร์ไบจาน / เบลารุส',
    flag: '🇦🇿',
    division: 'Featherweight Kickboxing',
    champion: true,
    signature: 'ฟุตเวิร์คสลับการ์ด ออกอาวุธหนักหน่วงแม่นยำทุกองศา',
    themeColor: '#F59E0B',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2021/04/Chingiz_Allazov-hero-1200x1165-2-600x583.jpg',
    wikiEn: 'Chingiz_Allazov',
    look: {
      skin: '#EAC0A2',
      hair: 'buzzcut',
      hairColor: '#27201C',
      facialHair: 'fullBeard',
      glove: 'kb_gold',
      stance: 'blitz',
      shorts: '#111827'
    },
    stats: {
      speed: 98,
      power: 97,
      kick: 96,
      punch: 96,
      iq: 96,
      cardio: 95,
      chin: 92,
      clinch: 79
    }
  },
  {
    id: 6,
    nameTh: 'ซุปเปอร์บอน',
    nameEn: 'Superbon',
    nickname: 'จอมเตะก้านคอ (Featherweight Kickboxing King)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Featherweight Kickboxing / Muay Thai',
    champion: true,
    signature: 'ลูกเตะก้านคอปลิดวิญญาณ & การวางแผนแก้ทางมวย',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/04/Superbon-Hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Superbon_Singha_Mawynn',
    wikiTh: 'ซุปเปอร์บอน_บัญชาเมฆ',
    look: {
      skin: '#D6996E',
      hair: 'slickSide',
      hairColor: '#18181B',
      glove: 'kb_gold',
      stance: 'sniper',
      shorts: '#CA8A04'
    },
    stats: {
      kick: 99,
      iq: 97,
      power: 93,
      cardio: 92,
      speed: 92,
      clinch: 90,
      punch: 86,
      chin: 84
    }
  },
  {
    id: 7,
    nameTh: 'โรมัน เคร็กเคลีย',
    nameEn: 'Roman Kryklia',
    nickname: 'ยักษ์ใหญ่ไร้เทียมทาน (Towering Titan)',
    country: 'ยูเครน',
    flag: '🇺🇦',
    division: 'Heavyweight / Light Heavyweight',
    champion: true,
    signature: 'แชมป์โลก 2 รุ่น 2 กติกา หมัดหนักและเข่าลอยทรงพลัง',
    themeColor: '#60A5FA',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2019/10/Roman_Kryklia-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Roman_Kryklia',
    look: {
      skin: '#F2C9AC',
      hair: 'slickSide',
      hairColor: '#3B2B1E',
      facialHair: 'stubble',
      glove: '4oz_gold',
      stance: 'highGuard',
      shorts: '#2563EB'
    },
    stats: {
      power: 99,
      punch: 98,
      clinch: 96,
      chin: 95,
      cardio: 93,
      kick: 92,
      iq: 92,
      speed: 86
    }
  },
  {
    id: 8,
    nameTh: 'นาบิล อานาน',
    nameEn: 'Nabil Anane',
    nickname: 'ขุนเข่าเสาโทรเลข (6’4” Phenom)',
    country: 'ไทย / แอลจีเรีย',
    flag: '🇹🇭',
    division: 'Bantamweight Muay Thai',
    champion: true,
    signature: 'ช่วงชกยาวเสียดฟ้า เข่าและศอกดักแทงจากระยะไกล',
    themeColor: '#10B981',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/03/Nabil_Anane-hero-1200x1165-1-600x583.png',
    wikiEn: 'Nabil_Anane',
    look: {
      skin: '#DEB089',
      hair: 'curlyDrop',
      hairColor: '#1C1917',
      glove: '4oz_white',
      stance: 'elbowGeneral',
      shorts: '#059669'
    },
    stats: {
      clinch: 97,
      kick: 93,
      cardio: 93,
      power: 92,
      iq: 92,
      punch: 91,
      chin: 89,
      speed: 86
    }
  },
  {
    id: 9,
    nameTh: 'โจ ณัฐวุฒิ',
    nameEn: 'Jo Nattawut',
    nickname: 'สโมกกิน โจ (Smokin’ Jo)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Featherweight Muay Thai / Kickboxing',
    champion: false,
    signature: 'คอมโบหมัด-ศอก-เตะขาที่เนียนตาและดุดันทุกวินาที',
    themeColor: '#F97316',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/06/Jo_Nattawut-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Jo_Nattawut',
    look: {
      skin: '#C48255',
      hair: 'buzzcut',
      hairColor: '#18181B',
      facialHair: 'goatee',
      glove: '4oz_red',
      stance: 'highGuard',
      shorts: '#EA580C'
    },
    stats: {
      punch: 93,
      power: 93,
      kick: 92,
      iq: 91,
      clinch: 90,
      cardio: 89,
      speed: 88,
      chin: 86
    }
  },
  {
    id: 10,
    nameTh: 'น้องโอ๋ ฮาม่ามวยไทย',
    nameEn: 'Nong-O Hama',
    nickname: 'ราชันฆ่าไม่ตาย (Living Legend)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight / Flyweight Muay Thai',
    champion: false,
    signature: 'ตำนานยอดมวยไทย แข้งขวาเตะสะท้านทรวงและพื้นฐานแน่นปึ้ก',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2018/03/Nong-O_Gaiyanghadao-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Nong-O_Gaiyanghadao',
    wikiTh: 'น้องโอ๋_ฮาม่ามวยไทย',
    look: {
      skin: '#C8885A',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_gold',
      stance: 'sniper',
      shorts: '#991B1B'
    },
    stats: {
      kick: 98,
      iq: 97,
      power: 95,
      punch: 93,
      clinch: 92,
      cardio: 89,
      speed: 86,
      chin: 84
    }
  },
  {
    id: 11,
    nameTh: 'เสกสรร อ.ขวัญเมือง',
    nameEn: 'Seksan Or. Kwanmuang',
    nickname: 'คนไม่ยอมคน (The Man Who Yields To No One)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Catchweight / Lightweight Muay Thai',
    champion: false,
    signature: 'เดินหน้าฆ่ามัน ศอกหมุนและหัวใจนักสู้เกินร้อย',
    themeColor: '#E60000',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/04/Seksan_Or_Kwanmuang-Hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Seksan_Or._Kwanmuang',
    wikiTh: 'เสกสรร_อ.ขวัญเมือง',
    look: {
      skin: '#BF7E50',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_red',
      stance: 'ironman',
      shorts: '#DC2626'
    },
    stats: {
      chin: 98,
      cardio: 98,
      clinch: 96,
      power: 93,
      punch: 92,
      kick: 90,
      speed: 84,
      iq: 83
    }
  },
  {
    id: 12,
    nameTh: 'ทาเครุ เซกาวะ',
    nameEn: 'Takeru Segawa',
    nickname: 'เดอะ เนเชอรัล บอร์น ครัชเชอร์ (Natural Born Crusher)',
    country: 'ญี่ปุ่น',
    flag: '🇯🇵',
    division: 'Flyweight Kickboxing',
    champion: false,
    signature: 'พายุหมัดชุดความเร็วสูง แลกเดือดไม่มียั้ง',
    themeColor: '#EF4444',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/11/Takeru-hero-1200x1165-champion-600x583.jpg',
    wikiEn: 'Takeru_Segawa',
    look: {
      skin: '#F3CCB0',
      hair: 'blondeSpiky',
      hairColor: '#FACC15',
      glove: 'kb_red',
      stance: 'blitz',
      shorts: '#EF4444'
    },
    stats: {
      punch: 97,
      power: 96,
      cardio: 96,
      chin: 95,
      speed: 94,
      kick: 93,
      iq: 89,
      clinch: 78
    }
  },
  {
    id: 13,
    nameTh: 'อิเลียส เอ็นนาฮาชิ',
    nameEn: 'Ilias Ennahachi',
    nickname: 'ทวีตตี้ (Tweety)',
    country: 'เนเธอร์แลนด์ / โมร็อกโก',
    flag: '🇲🇦',
    division: 'Bantamweight / Flyweight Kickboxing',
    champion: false,
    signature: 'ฟุตเวิร์คขั้นเทพ เข้าออกเร็วราวล่องหน',
    themeColor: '#06B6D4',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2019/07/Ilias_Ennahachi-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Ilias_Ennahachi',
    look: {
      skin: '#E6BA99',
      hair: 'highFade',
      hairColor: '#1C1917',
      facialHair: 'fullBeard',
      glove: 'kb_blue',
      stance: 'blitz',
      shorts: '#0891B2'
    },
    stats: {
      speed: 98,
      iq: 96,
      cardio: 95,
      kick: 92,
      punch: 91,
      power: 88,
      chin: 88,
      clinch: 76
    }
  },
  {
    id: 14,
    nameTh: 'เพชรทนง เพชรเฟอร์กัส',
    nameEn: 'Petchtanong Petchfergus',
    nickname: 'โปรเฟสเซอร์คิกบ็อกซิ่ง (The Professor)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight Kickboxing',
    champion: false,
    signature: 'เหลี่ยมมวยและไอคิวระดับด็อกเตอร์ แข้งซ้ายดักจังหวะเนียนกริบ',
    themeColor: '#A855F7',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2020/08/Petchtanong-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Petchtanong_Petchfergus',
    look: {
      skin: '#CE8E62',
      hair: 'slickSide',
      hairColor: '#18181B',
      glove: 'kb_gold',
      stance: 'sniper',
      shorts: '#7E22CE'
    },
    stats: {
      iq: 97,
      kick: 95,
      cardio: 91,
      clinch: 91,
      speed: 89,
      power: 88,
      punch: 86,
      chin: 85
    }
  },
  {
    id: 15,
    nameTh: 'พระจันทร์ฉาย พีเค.แสนชัย',
    nameEn: 'Prajanchai PK.Saenchai',
    nickname: 'ฉลามดำ (Two-Sport Strawweight King)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Strawweight Muay Thai & Kickboxing',
    champion: true,
    signature: 'แชมป์โลก 2 กติกา ความไวสายฟ้าแลบและสมองมวยอัจฉริยะ',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2021/07/Prajanchai-1200x1165-1.png',
    wikiEn: 'Prajanchai_P.K.Saenchaimuaythaigym',
    wikiTh: 'พระจันทร์ฉาย_พี.เค.แสนชัยมวยไทยยิม',
    look: {
      skin: '#C68558',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_gold',
      stance: 'sniper',
      shorts: '#EAB308'
    },
    stats: {
      speed: 98,
      iq: 98,
      cardio: 95,
      punch: 94,
      clinch: 94,
      kick: 92,
      power: 91,
      chin: 91
    }
  },
  {
    id: 16,
    nameTh: 'มารัต กริกอเรียน',
    nameEn: 'Marat Grigorian',
    nickname: 'รถถังอาร์เมเนีย (Armenian Powerhouse)',
    country: 'อาร์เมเนีย',
    flag: '🇦🇲',
    division: 'Featherweight Kickboxing',
    champion: false,
    signature: 'เดินบดติดตัวด้วยหมัดฮุก-อัปเปอร์คัตหนักหน่วงและคางหินผา',
    themeColor: '#DC2626',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2020/11/Marat_Grigorian-hero-1200x1165-2-600x583.jpg',
    wikiEn: 'Marat_Grigorian',
    look: {
      skin: '#E8BC9B',
      hair: 'buzzcut',
      hairColor: '#1F1B18',
      facialHair: 'stubble',
      glove: 'kb_red',
      stance: 'ironman',
      shorts: '#B91C1C'
    },
    stats: {
      punch: 97,
      power: 97,
      chin: 97,
      cardio: 95,
      kick: 90,
      iq: 88,
      speed: 86,
      clinch: 78
    }
  },
  {
    id: 17,
    nameTh: 'นิโค คาร์ริลโล',
    nameEn: 'Nico Carrillo',
    nickname: 'เดอะ คิง ออฟ เดอะ นอร์ท (King of the North)',
    country: 'สกอตแลนด์',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    division: 'Bantamweight / Featherweight Muay Thai',
    champion: false,
    signature: 'พละกำลังมหาศาล หมัดและศอกทุบคู่ต่อสู้ร่วงกราว',
    themeColor: '#38BDF8',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/04/Nico_Carrillo-Hero-1200x1165-1-600x583.png',
    wikiEn: 'Nico_Carrillo',
    look: {
      skin: '#F3CAB0',
      hair: 'highFade',
      hairColor: '#3A281B',
      facialHair: 'stubble',
      glove: '4oz_white',
      stance: 'elbowGeneral',
      shorts: '#0284C7'
    },
    stats: {
      power: 98,
      punch: 97,
      clinch: 96,
      kick: 93,
      cardio: 90,
      iq: 88,
      chin: 87,
      speed: 86
    }
  },
  {
    id: 18,
    nameTh: 'ก้องธรณี ส.สมหมาย',
    nameEn: 'Kongthoranee Sor.Sommai',
    nickname: 'พยัคฆ์ซ้ายไร้พ่าย (Sharp Southpaw)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Flyweight Muay Thai',
    champion: false,
    signature: 'มวยซ้ายจังหวะฝีมือครบเครื่อง ดักบวกหมัดและแข้งซ้ายแม่นยำ',
    themeColor: '#F59E0B',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/04/Kongthoranee_Sor_Sommai-Hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Kongthoranee_Sor.Sommai',
    look: {
      skin: '#CE8D61',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_red',
      stance: 'sniper',
      shorts: '#D97706'
    },
    stats: {
      iq: 94,
      kick: 94,
      punch: 93,
      power: 92,
      cardio: 92,
      speed: 91,
      chin: 90,
      clinch: 89
    }
  },
  {
    id: 19,
    nameTh: 'เมืองไทย พีเค.แสนชัย',
    nameEn: 'Muangthai PK.Saenchai',
    nickname: 'ขุนศอกผีดิบ (Elbow Zombie)',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight Muay Thai',
    champion: false,
    signature: 'เดินฝ่าดงอาวุธเข้าไปฟันศอกในระยะประชิดแบบไม่กลัวเจ็บ',
    themeColor: '#10B981',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/04/Muangthai_PK_Saenchai-Hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Muangthai_P.K.Saenchaimuaythaigym',
    wikiTh: 'เมืองไทย_พี.เค.แสนชัยมวยไทยยิม',
    look: {
      skin: '#C48356',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_white',
      stance: 'elbowGeneral',
      shorts: '#059669'
    },
    stats: {
      clinch: 98,
      cardio: 96,
      chin: 95,
      power: 91,
      kick: 89,
      iq: 87,
      punch: 86,
      speed: 84
    }
  },
  {
    id: 20,
    nameTh: 'อเล็กซิส นิโคลัส',
    nameEn: 'Alexis Nicolas',
    nickname: 'บาร์โบซา (Barboza)',
    country: 'ฝรั่งเศส',
    flag: '🇫🇷',
    division: 'Lightweight Kickboxing',
    champion: false,
    signature: 'คิกบ็อกซิ่งสไตล์ฝรั่งเศส เตะเจาะยางหนักสลับหมัดชุดคมกริบ',
    themeColor: '#6366F1',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/01/Alexis_Nicolas-Hero-1200x1165-2-600x583.jpg',
    wikiEn: 'Alexis_Nicolas',
    look: {
      skin: '#A56943',
      hair: 'curlyDrop',
      hairColor: '#141414',
      facialHair: 'goatee',
      glove: 'kb_blue',
      stance: 'blitz',
      shorts: '#4F46E5'
    },
    stats: {
      kick: 95,
      cardio: 94,
      punch: 93,
      power: 93,
      chin: 92,
      iq: 92,
      speed: 92,
      clinch: 80
    }
  },
  {
    id: 21,
    nameTh: 'รีเกียน เออร์เซล',
    nameEn: 'Regian Eersel',
    nickname: 'ดิ อิมมอร์ทัล (The Immortal)',
    country: 'ซูรินาม',
    flag: '🇸🇷',
    division: 'Lightweight Muay Thai & Kickboxing',
    champion: true,
    signature: 'ราชัน 2 กติกา เข่าลอยทะลวงไส้และพละกำลังไม่มีวันหมด',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2018/03/Regian_Eersel-Hero-1200x1165-3-600x583.jpg',
    wikiEn: 'Regian_Eersel',
    look: {
      skin: '#6B4226',
      hair: 'highFade',
      hairColor: '#141414',
      facialHair: 'goatee',
      glove: '4oz_gold',
      stance: 'elbowGeneral',
      shorts: '#EAB308'
    },
    stats: {
      cardio: 99,
      chin: 98,
      clinch: 97,
      iq: 96,
      punch: 95,
      power: 95,
      kick: 93,
      speed: 91
    }
  },
  {
    id: 22,
    nameTh: 'ยอดไอคิว อ.พิมลศรี',
    nameEn: 'Yod-IQ Or.Pimonsri',
    nickname: 'ซ้ายสมองกล',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight Muay Thai',
    champion: false,
    signature: 'มวยซ้ายไอคิวสูง แข้งซ้ายจัดจ้านและจังหวะฝีมือครบเครื่อง',
    themeColor: '#3B82F6',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/03/Yod-IQ-Hero-1200x1165-1.png',
    look: {
      skin: '#C88A5E',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_white',
      stance: 'sniper',
      shorts: '#2563EB'
    },
    stats: {
      iq: 94,
      kick: 94,
      cardio: 92,
      clinch: 91,
      chin: 91,
      speed: 90,
      power: 90,
      punch: 88
    }
  },
  {
    id: 23,
    nameTh: 'แรมโบ้เล็ก ฉ.อจลบุญ',
    nameEn: 'Rambolek Chor.Ajalaboon',
    nickname: 'ซ้ายลูกระเบิด',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Bantamweight Muay Thai',
    champion: false,
    signature: 'หมัดคมศอกไว อาวุธหนักหน่วงพร้อมปิดเกมน็อกเอาต์',
    themeColor: '#EF4444',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/03/Rambolek-Hero-1200x1165-1-600x583.png',
    look: {
      skin: '#D6996E',
      hair: 'slickSide',
      hairColor: '#18181B',
      glove: '4oz_red',
      stance: 'blitz',
      shorts: '#DC2626'
    },
    stats: {
      power: 95,
      punch: 94,
      speed: 91,
      kick: 91,
      clinch: 90,
      cardio: 90,
      iq: 89,
      chin: 88
    }
  },
  {
    id: 24,
    nameTh: 'อัสซาดูลาห์ อิมานกาซาลิเอฟ',
    nameEn: 'Asadula Imangazaliev',
    nickname: 'ดาเกสถานสไนเปอร์ (Dagestan Striker)',
    country: 'รัสเซีย',
    flag: '🇷🇺',
    division: 'Flyweight Muay Thai',
    champion: false,
    signature: 'สเต็ปเท้ารวดเร็ว หมัดตรงและลูกเตะหมุนแม่นยำ',
    themeColor: '#06B6D4',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/07/Asadula_Imangazaliev-Hero-1200x1165-1-600x583.png',
    look: {
      skin: '#F1C6A7',
      hair: 'buzzcut',
      hairColor: '#27201C',
      facialHair: 'fullBeard',
      glove: '4oz_white',
      stance: 'blitz',
      shorts: '#0891B2'
    },
    stats: {
      speed: 96,
      kick: 95,
      power: 94,
      cardio: 93,
      iq: 93,
      punch: 93,
      chin: 91,
      clinch: 88
    }
  },
  {
    id: 25,
    nameTh: 'โจเซฟ ลาซิรี',
    nameEn: 'Joseph Lasiri',
    nickname: 'เดอะ เฮอร์ริเคน (The Hurricane)',
    country: 'อิตาลี / โมร็อกโก',
    flag: '🇮🇹',
    division: 'Strawweight Muay Thai',
    champion: false,
    signature: 'อดีตแชมป์โลกสายลุย ออกอาวุธชุดไม่หยุดและหัวใจเกินร้อย',
    themeColor: '#10B981',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2018/01/Joseph_Lasiri-Hero-1200x1165-4-600x583.jpg',
    wikiEn: 'Joseph_Lasiri',
    look: {
      skin: '#E6BA99',
      hair: 'highFade',
      hairColor: '#1C1917',
      facialHair: 'stubble',
      glove: '4oz_white',
      stance: 'blitz',
      shorts: '#059669'
    },
    stats: {
      cardio: 96,
      speed: 92,
      chin: 91,
      iq: 90,
      clinch: 89,
      punch: 88,
      kick: 88,
      power: 86
    }
  },
  {
    id: 26,
    nameTh: 'อาลีฟ ส.เดชะพันธ์',
    nameEn: 'Aliff Sor.Dechapan',
    nickname: 'ก้านยาวพยัคฆ์หนุ่ม',
    country: 'มาเลเซีย / ไทย',
    flag: '🇲🇾',
    division: 'Strawweight Muay Thai',
    champion: false,
    signature: 'ช่วงชกยาวได้เปรียบ แข้งสูงและหมัดตรงดักจังหวะเฉียบคม',
    themeColor: '#F59E0B',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/04/Aliff-hero-1200x1165-1-600x583.png',
    look: {
      skin: '#DFAA82',
      hair: 'curlyDrop',
      hairColor: '#18181B',
      glove: '4oz_red',
      stance: 'sniper',
      shorts: '#D97706'
    },
    stats: {
      kick: 93,
      clinch: 92,
      punch: 92,
      cardio: 92,
      power: 91,
      speed: 91,
      iq: 91,
      chin: 89
    }
  },
  {
    id: 27,
    nameTh: 'นาดากะ',
    nameEn: 'Nadaka Yoshinari',
    nickname: 'อัจฉริยะมวยไทยแดนปลาดิบ (Japanese Muay Thai Prodigy)',
    country: 'ญี่ปุ่น',
    flag: '🇯🇵',
    division: 'Atomweight / Strawweight Muay Thai',
    champion: true,
    signature: 'ความเร็วแสง ไอคิวมวยระดับอัจฉริยะ และอาวุธมวยไทยครบเครื่องไร้ที่ติ',
    themeColor: '#FFD700',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2025/01/Nadaka-hero-champ-1200x1165-1-600x583.png',
    wikiEn: 'Nadaka_Yoshinari',
    look: {
      skin: '#F5D0B5',
      hair: 'slickSide',
      hairColor: '#18181B',
      glove: '4oz_gold',
      stance: 'sniper',
      shorts: '#EF4444'
    },
    stats: {
      speed: 99,
      iq: 98,
      cardio: 97,
      kick: 96,
      clinch: 94,
      punch: 91,
      power: 90,
      chin: 88
    }
  },
  {
    id: 28,
    nameTh: 'อับดาลลาห์ ออนดาช',
    nameEn: 'Abdallah Ondash',
    nickname: 'พยัคฆ์หนุ่มเลบานอน',
    country: 'เลบานอน',
    flag: '🇱🇧',
    division: 'Strawweight Muay Thai',
    champion: false,
    signature: 'หมัดชุดตัดลำตัวสลับใบหน้า รวดเร็วและดุดัน',
    themeColor: '#EF4444',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/08/Abdallah_Ondash-Hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#E6BA99',
      hair: 'highFade',
      hairColor: '#1C1917',
      facialHair: 'stubble',
      glove: '4oz_red',
      stance: 'blitz',
      shorts: '#DC2626'
    },
    stats: {
      punch: 94,
      power: 94,
      speed: 93,
      cardio: 92,
      chin: 91,
      iq: 90,
      kick: 89,
      clinch: 86
    }
  },
  {
    id: 29,
    nameTh: 'อับเดลาลี เซฮิดี',
    nameEn: 'Abdelali Zahidi',
    nickname: 'สิงห์ทะเลทรายโมร็อกโก',
    country: 'โมร็อกโก',
    flag: '🇲🇦',
    division: 'Bantamweight Kickboxing / Muay Thai',
    champion: false,
    signature: 'คิกบ็อกซิ่งสเต็ปไว ออกหมัดและเตะเจาะยางรุนแรง',
    themeColor: '#10B981',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2024/11/Abdelali_Zahidi-Hero-1200x1195-1-600x582.png',
    look: {
      skin: '#DEA981',
      hair: 'highFade',
      hairColor: '#18181B',
      facialHair: 'goatee',
      glove: 'kb_red',
      stance: 'blitz',
      shorts: '#059669'
    },
    stats: {
      kick: 92,
      speed: 92,
      punch: 91,
      power: 91,
      cardio: 90,
      iq: 89,
      chin: 88,
      clinch: 82
    }
  },
  {
    id: 30,
    nameTh: 'อับดุลลา ดายาคาเอฟ',
    nameEn: 'Abdulla Dayakaev',
    nickname: 'สแมชบอย (Smash Boy)',
    country: 'รัสเซีย',
    flag: '🇷🇺',
    division: 'Bantamweight Muay Thai',
    champion: false,
    signature: 'หมัดหนักคมกริบ สเต็ปเท้าเข้าออกไวพร้อมปิดบัญชีทุกวินาที',
    themeColor: '#3B82F6',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/11/Abdollah_Dayakaev-hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#F1C6A7',
      hair: 'buzzcut',
      hairColor: '#27201C',
      facialHair: 'fullBeard',
      glove: '4oz_white',
      stance: 'ironman',
      shorts: '#1D4ED8'
    },
    stats: {
      punch: 96,
      power: 96,
      speed: 93,
      cardio: 92,
      chin: 92,
      iq: 91,
      kick: 90,
      clinch: 86
    }
  },
  {
    id: 31,
    nameTh: 'อดัม ส.เดชะพันธ์',
    nameEn: 'Adam Sor.Dechapan',
    nickname: 'คลื่นลูกใหม่พันธุ์ดุ',
    country: 'มาเลเซีย / ไทย',
    flag: '🇲🇾',
    division: 'Atomweight / Strawweight Muay Thai',
    champion: false,
    signature: 'ความสดและสปีดอาวุธจัดจ้าน เดินลุยออกอาวุธครบเครื่อง',
    themeColor: '#F59E0B',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2025/05/Adam-hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#DFAA82',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_white',
      stance: 'blitz',
      shorts: '#EAB308'
    },
    stats: {
      cardio: 93,
      speed: 92,
      kick: 91,
      punch: 90,
      chin: 90,
      power: 89,
      clinch: 89,
      iq: 88
    }
  },
  {
    id: 32,
    nameTh: 'อัสลามจอน ออร์ติคอฟ',
    nameEn: 'Aslamjon Ortikov',
    nickname: 'พยัคฆ์ไร้พ่ายอุซเบกิสถาน',
    country: 'อุซเบกิสถาน',
    flag: '🇺🇿',
    division: 'Flyweight Muay Thai',
    champion: false,
    signature: 'ความเร็วสูง หมัดชุดผสมลูกเตะก้านคอและเข่าลอยหลากหลาย',
    themeColor: '#06B6D4',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/07/Aslamjon_Ortikov-hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#EAC0A2',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_white',
      stance: 'blitz',
      shorts: '#0891B2'
    },
    stats: {
      speed: 95,
      cardio: 95,
      kick: 94,
      punch: 93,
      chin: 93,
      power: 92,
      iq: 92,
      clinch: 90
    }
  },
  {
    id: 33,
    nameTh: 'บัมปารา คูยาเต',
    nameEn: 'Bampara Kouyate',
    nickname: 'จอมเตะก้านยาว (Long-Range Sniper)',
    country: 'ฝรั่งเศส / มาลี',
    flag: '🇫🇷',
    division: 'Featherweight Muay Thai',
    champion: false,
    signature: 'หน่วยก้านสูงยาว แข้งและเข่าดักทำลายจังหวะจากระยะไกล',
    themeColor: '#6366F1',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/10/Bampara_Kouyate-hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#5C3820',
      hair: 'buzzcut',
      hairColor: '#141414',
      facialHair: 'goatee',
      glove: '4oz_red',
      stance: 'elbowGeneral',
      shorts: '#4F46E5'
    },
    stats: {
      kick: 95,
      clinch: 94,
      power: 94,
      punch: 92,
      iq: 92,
      cardio: 91,
      speed: 91,
      chin: 90
    }
  },
  {
    id: 34,
    nameTh: 'แบล็คแพนเธอร์',
    nameEn: 'Black Panther',
    nickname: 'เสือดำคำราม',
    country: 'ไทย',
    flag: '🇹🇭',
    division: 'Flyweight Muay Thai',
    champion: false,
    signature: 'อาวุธมวยไทยหนักหน่วงครบเครื่อง ศอกคมและแข้งขวาแม่นยำ',
    themeColor: '#A855F7',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2023/03/Black-Panther-Hero-1200x1165-1-600x583.jpg',
    look: {
      skin: '#B8764A',
      hair: 'shortCrop',
      hairColor: '#18181B',
      glove: '4oz_red',
      stance: 'highGuard',
      shorts: '#7E22CE'
    },
    stats: {
      kick: 93,
      clinch: 92,
      power: 92,
      punch: 91,
      cardio: 91,
      iq: 90,
      chin: 90,
      speed: 90
    }
  },
  {
    id: 35,
    nameTh: 'โจนาธาน ดิ เบลลา',
    nameEn: 'Jonathan Di Bella',
    nickname: 'โคตรมวยคิกบ็อกซิ่ง (Canadian-Italian Maestro)',
    country: 'อิตาลี / แคนาดา',
    flag: '🇮🇹',
    division: 'Strawweight Kickboxing',
    champion: true,
    signature: 'สเต็ปเท้าระดับปรมาจารย์ หมัดชุดความเร็วแสงและสายตาหลบหลีกขั้นเทพ',
    themeColor: '#38BDF8',
    photoUrl: 'https://cdn.onefc.com/wp-content/uploads/sites/5/2022/10/Jonathan_Di_Bella-hero-1200x1165-1-600x583.jpg',
    wikiEn: 'Jonathan_Di_Bella',
    look: {
      skin: '#F1C6A7',
      hair: 'slickSide',
      hairColor: '#27201C',
      glove: 'kb_gold',
      stance: 'blitz',
      shorts: '#0284C7'
    },
    stats: {
      speed: 97,
      cardio: 97,
      iq: 96,
      punch: 94,
      kick: 93,
      chin: 91,
      power: 88,
      clinch: 78
    }
  }
];

const TOTAL_ROUNDS = SKILL_CATEGORIES.length; // 8 รอบ
const MAX_TOTAL_SCORE = TOTAL_ROUNDS * 100; // 800 คะแนน

const CUSTOM_IMAGES_STORAGE_KEY = 'one_fighter_custom_images_v1';
const WIKI_IMAGES_STORAGE_KEY = 'one_fighter_wiki_images_v1';

// บีบอัดรูปที่อัปโหลดไม่ให้เกินขนาด localStorage
function compressImageFile(file, maxWidth = 440, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(1, maxWidth / img.width);
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// 3. ระบบเสียงสังเคราะห์ (Web Audio API Synth)
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playTick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playImpact(statVal = 90) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Higher pitch chime if 95+
      const baseFreq = statVal >= 95 ? 660 : statVal >= 90 ? 440 : 320;
      osc.type = statVal >= 95 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playBell() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.14, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.8);
      });
    } catch (e) {
      // Ignore audio errors
    }
  }
}

const soundFX = new SoundEngine();

// ==========================================
// 4. ฟังก์ชันช่วยเหลือสำหรับการคำนวณคะแนนและระดับ
// ==========================================
function getStatTier(value) {
  if (value >= 96) {
    return {
      label: 'GOD TIER',
      badgeBg: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black',
      textColor: 'text-[#FFD700]',
      borderColor: 'border-[#FFD700]',
      barColor: 'bg-gradient-to-r from-amber-500 to-yellow-300',
      glow: 'shadow-[0_0_20px_rgba(255,215,0,0.35)]'
    };
  }
  if (value >= 93) {
    return {
      label: 'ELITE',
      badgeBg: 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/80',
      barColor: 'bg-gradient-to-r from-red-600 to-orange-500',
      glow: 'shadow-[0_0_15px_rgba(230,0,0,0.3)]'
    };
  }
  if (value >= 90) {
    return {
      label: 'PRO',
      badgeBg: 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/50',
      barColor: 'bg-gradient-to-r from-orange-500 to-amber-500',
      glow: ''
    };
  }
  return {
    label: 'SOLID',
    badgeBg: 'bg-zinc-700 text-zinc-300 font-semibold',
    textColor: 'text-zinc-300',
    borderColor: 'border-zinc-700',
    barColor: 'bg-gradient-to-r from-zinc-500 to-zinc-400',
    glow: ''
  };
}

function getOneRankingResult(totalScore) {
  if (totalScore >= 762) {
    return {
      rankBadge: '👑 WORLD CHAMPION',
      rankTh: 'แชมป์โลก ONE (WORLD CHAMPION)',
      shortRank: 'CHAMP',
      grade: 'S+',
      isChampion: true,
      color: 'from-[#FFD700] via-yellow-200 to-amber-500',
      badgeStyle: 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-black'
    };
  }
  if (totalScore >= 752) {
    return {
      rankBadge: '🔥 RANK #1 CONTENDER',
      rankTh: 'ผู้ท้าชิงอันดับ #1 (Rank #1)',
      shortRank: '#1',
      grade: 'S',
      isChampion: false,
      color: 'from-red-500 via-orange-400 to-amber-400',
      badgeStyle: 'bg-[#E60000] text-white'
    };
  }
  if (totalScore >= 742) {
    return {
      rankBadge: '⚡ RANK #2 CONTENDER',
      rankTh: 'ผู้ท้าชิงอันดับ #2 (Rank #2)',
      shortRank: '#2',
      grade: 'A+',
      isChampion: false,
      color: 'from-orange-400 to-amber-500',
      badgeStyle: 'bg-orange-600 text-white'
    };
  }
  if (totalScore >= 732) {
    return {
      rankBadge: '🥊 RANK #3 CONTENDER',
      rankTh: 'ผู้ท้าชิงอันดับ #3 (Rank #3)',
      shortRank: '#3',
      grade: 'A',
      isChampion: false,
      color: 'from-amber-400 to-yellow-500',
      badgeStyle: 'bg-amber-600 text-black'
    };
  }
  if (totalScore >= 722) {
    return {
      rankBadge: '🥊 RANK #4 CONTENDER',
      rankTh: 'ผู้ท้าชิงอันดับ #4 (Rank #4)',
      shortRank: '#4',
      grade: 'B+',
      isChampion: false,
      color: 'from-cyan-400 to-blue-500',
      badgeStyle: 'bg-cyan-600 text-white'
    };
  }
  if (totalScore >= 710) {
    return {
      rankBadge: '🥊 RANK #5 CONTENDER',
      rankTh: 'ผู้ท้าชิงอันดับ #5 (Rank #5)',
      shortRank: '#5',
      grade: 'B',
      isChampion: false,
      color: 'from-blue-400 to-indigo-500',
      badgeStyle: 'bg-blue-600 text-white'
    };
  }
  return {
    rankBadge: '❌ UNRANKED',
    rankTh: 'ไม่ติดอันดับแรงกิ้ง (Unranked)',
    shortRank: 'UNRANKED',
    grade: 'C',
    isChampion: false,
    color: 'from-zinc-400 to-zinc-500',
    badgeStyle: 'bg-zinc-800 text-zinc-300'
  };
}

// คำนวณการจัดวางที่ดีที่สุดสำหรับ 8 ช่องทักษะด้วย Bitmask DP (รวดเร็วและแม่นยำ 100%)
function calculateOptimalAssignment(fightersList) {
  const n = SKILL_CATEGORIES.length;
  if (!fightersList || fightersList.length !== n) return null;
  const skillIds = SKILL_CATEGORIES.map((s) => s.id);

  const totalMasks = 1 << n;
  const dp = new Array(totalMasks).fill(-1);
  const parent = new Array(totalMasks).fill(null);
  dp[0] = 0;

  for (let mask = 0; mask < totalMasks; mask++) {
    if (dp[mask] === -1) continue;

    // นับจำนวนบิตที่ถูกเลือกไปแล้ว = ลำดับของช่องทักษะปัจจุบัน
    let skillIdx = 0;
    let temp = mask;
    while (temp > 0) {
      skillIdx += temp & 1;
      temp >>= 1;
    }
    if (skillIdx >= n) continue;

    const currentSkillId = skillIds[skillIdx];
    for (let fIdx = 0; fIdx < n; fIdx++) {
      if (!(mask & (1 << fIdx))) {
        const nextMask = mask | (1 << fIdx);
        const val = fightersList[fIdx].stats[currentSkillId] || 0;
        if (dp[mask] + val > dp[nextMask]) {
          dp[nextMask] = dp[mask] + val;
          parent[nextMask] = { prevMask: mask, fighterIdx: fIdx, skillIdx };
        }
      }
    }
  }

  const fullMask = totalMasks - 1;
  const maxTotal = dp[fullMask];
  const bestMapping = {};

  let currMask = fullMask;
  while (currMask > 0 && parent[currMask]) {
    const { prevMask, fighterIdx, skillIdx } = parent[currMask];
    const sId = skillIds[skillIdx];
    const fObj = fightersList[fighterIdx];
    bestMapping[sId] = {
      fighter: fObj,
      statValue: fObj.stats[sId]
    };
    currMask = prevMask;
  }

  return {
    maxTotal,
    maxAverage: maxTotal / n,
    mapping: bestMapping
  };
}

// วิเคราะห์สไตล์การชกของสุดยอดนักสู้ที่สร้างเสร็จ (รองรับ 8 ทักษะ)
function analyzeFighterStyle(assignments) {
  const stats = {};
  SKILL_CATEGORIES.forEach((cat) => {
    stats[cat.id] = assignments[cat.id]?.statValue || 0;
  });

  const offenseAvg = (stats.punch + stats.kick + stats.clinch + stats.power) / 4;
  const techAvg = (stats.speed + stats.iq) / 2;
  const engineAvg = (stats.chin + stats.cardio) / 2;
  const brawlAvg = (stats.punch + stats.clinch + stats.chin + stats.power) / 4;
  const sniperAvg = (stats.kick + stats.iq + stats.speed) / 3;

  if (offenseAvg >= 95 && techAvg >= 95 && engineAvg >= 94) {
    return {
      archetypeTh: 'เครื่องจักรสังหารสมบูรณ์แบบไร้จุดบอด',
      archetypeEn: 'THE ULTIMATE APEX HYBRID',
      badge: 'GOD OF MUAY THAI & KICKBOXING',
      analysis:
        'นักสู้ในฝันที่รวมทั้งความหนักหน่วง ความเร็วแสง คางเหล็ก ปอดเหล็ก และสมองมวยระดับอัจฉริยะไว้ในร่างเดียว!'
    };
  }

  if (stats.power >= 96 && (stats.punch >= 94 || stats.kick >= 95)) {
    return {
      archetypeTh: 'จอมน็อกเอาต์อาวุธหนักสั่งตาย',
      archetypeEn: 'ONE-SHOT KNOCKOUT ARTIST',
      badge: '$50,000 BONUS HUNTER',
      analysis:
        'ทุกหมัดและทุกแข้งเต็มไปด้วยพลังทำลายล้างระดับปิดเกมได้ในเสี้ยววินาที คู่ต่อสู้พลาดเพียงครั้งเดียวคือหลับกลางอากาศ!'
    };
  }

  if (stats.cardio >= 96 && stats.chin >= 95) {
    return {
      archetypeTh: 'ปอดเหล็กคางหินผา เดินบดขยี้ 5 ยกไม่มีหมด',
      archetypeEn: 'RELENTLESS CARDIO & IRON CHIN MACHINE',
      badge: 'UNSTOPPABLE ENGINE',
      analysis:
        'ระบบหายใจและความอึดระดับมนุษย์เหล็ก ยิ่งชกยิ่งแรง เดินบดบี้ติดตัวจนคู่ต่อสู้หมดแรงไปเอง!'
    };
  }

  if (sniperAvg >= brawlAvg && stats.kick >= 95 && stats.iq >= 94) {
    return {
      archetypeTh: 'ยอดมวยไอคิวสูง แข้งทองคำสั่งตาย',
      archetypeEn: 'GRANDMASTER SNIPER TECHNICIAN',
      badge: 'TECHNICAL MASTERMIND',
      analysis:
        'โดดเด่นด้วยการคุมระยะและอ่านจังหวะสองอย่างเฉียบขาด มีลูกเตะและสเต็ปเท้าที่รวดเร็วแม่นยำ!'
    };
  }

  if (brawlAvg >= sniperAvg && stats.chin >= 95 && (stats.punch >= 94 || stats.clinch >= 94)) {
    return {
      archetypeTh: 'จอมบู๊ล้างผลาญ คางเหล็กหมัดศอกสั่งตาย',
      archetypeEn: 'UNBREAKABLE IRON BRAWLER',
      badge: '50,000$ BONUS MACHINE',
      analysis:
        'นักสู้สายเดินบดขยี้ที่ไม่รู้จักคำว่าถอยหลัง! อาศัยความอึดระดับคางเหล็กเดินฝ่าดงอาวุธเข้าไปทุบในระยะประชิด'
    };
  }

  if (stats.speed >= 95 && stats.punch >= 93) {
    return {
      archetypeTh: 'พายุหมุนความเร็วแสง คอมโบพิฆาต',
      archetypeEn: 'HYPER-SPEED BLITZKRIEG STRIKER',
      badge: 'SPEED DEMON',
      analysis:
        'ฟุตเวิร์คและการเข้าทำรวดเร็วปานสายฟ้าแลบ ออกอาวุธชุดหมัดและเตะสลับการ์ดจนคู่ต่อสู้ตั้งตัวไม่ทัน'
    };
  }

  return {
    archetypeTh: 'ยอดนักสู้ครบเครื่องทรงพลัง',
    archetypeEn: 'ALL-ROUND CHAMPIONSHIP STRIKER',
    badge: 'WELL-ROUNDED CONTENDER',
    analysis:
      'มีความสมดุลทั้งเกมรุกและเกมรับ พร้อมรับมือได้ทุกสไตล์บนสังเวียน ONE Championship'
  };
}

// ==========================================
// 5. คอมโพเนนต์ SVG RADAR CHART (8 แกน)
// ==========================================
function FighterRadarChart({ assignments, optimalMapping, showOptimal }) {
  const size = 320;
  const center = size / 2;
  const radius = 102;
  const numAxes = SKILL_CATEGORIES.length;

  // คำนวณพิกัดของแต่ละแกน (สเกล 75 ถึง 100 เพื่อให้เห็นความต่างชัดเจน)
  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const normalized = Math.max(0.15, Math.min(1, (value - 75) / 25));
    const r = radius * normalized;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const getAxisLabelPoint = (index, extraRadius = 34) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius + extraRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const playerPoints = SKILL_CATEGORIES.map((cat, idx) => {
    const val = assignments[cat.id]?.statValue || 80;
    return getPoint(idx, val);
  });

  const playerPolygon = playerPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const optimalPolygon = useMemo(() => {
    if (!optimalMapping) return '';
    return SKILL_CATEGORIES.map((cat, idx) => {
      const val = optimalMapping[cat.id]?.statValue || 80;
      const pt = getPoint(idx, val);
      return `${pt.x},${pt.y}`;
    }).join(' ');
  }, [optimalMapping]);

  const gridLevels = [80, 85, 90, 95, 100];

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[320px] h-auto overflow-visible drop-shadow-[0_0_25px_rgba(255,215,0,0.15)]"
      >
        <defs>
          <radialGradient id="playerRadarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E60000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* เส้นโครงข่าย 6 เหลี่ยม */}
        {gridLevels.map((lvl) => {
          const pts = SKILL_CATEGORIES.map((_, idx) => {
            const p = getPoint(idx, lvl);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke={lvl === 100 ? '#FFD700' : '#3F3F46'}
              strokeWidth={lvl === 100 ? '1.5' : '1'}
              strokeDasharray={lvl === 95 ? '3 3' : 'none'}
              opacity={lvl === 100 ? 0.5 : 0.4}
            />
          );
        })}

        {/* แกนทั้ง 6 */}
        {SKILL_CATEGORIES.map((cat, idx) => {
          const endPt = getPoint(idx, 100);
          return (
            <line
              key={cat.id}
              x1={center}
              y1={center}
              x2={endPt.x}
              y2={endPt.y}
              stroke="#52525B"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* โพลีกอนของ Optimal Draft (ถ้าเปิดเปรียบเทียบ) */}
        {showOptimal && optimalPolygon && (
          <polygon
            points={optimalPolygon}
            fill="rgba(16, 185, 129, 0.12)"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        )}

        {/* โพลีกอนค่าพลังของผู้เล่น */}
        <polygon
          points={playerPolygon}
          fill="url(#playerRadarGrad)"
          stroke="#FFD700"
          strokeWidth="2.5"
          className="transition-all duration-500"
        />

        {/* จุดยอดแต่ละแกน */}
        {playerPoints.map((pt, idx) => {
          const cat = SKILL_CATEGORIES[idx];
          const val = assignments[cat.id]?.statValue || 0;
          return (
            <g key={cat.id}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill={val >= 96 ? '#FFD700' : '#E60000'}
                stroke="#111111"
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* ป้ายชื่อทักษะและคะแนนรอบนอก */}
        {SKILL_CATEGORIES.map((cat, idx) => {
          const labelPt = getAxisLabelPoint(idx, 30);
          const val = assignments[cat.id]?.statValue || 0;
          return (
            <g key={cat.id}>
              <text
                x={labelPt.x}
                y={labelPt.y - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-zinc-300 text-[11px] font-bold"
              >
                {cat.shortTh}
              </text>
              <text
                x={labelPt.x}
                y={labelPt.y + 9}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[12px] font-black ${
                  val >= 96 ? 'fill-[#FFD700]' : val >= 93 ? 'fill-red-400' : 'fill-white'
                }`}
              >
                {val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ==========================================
// 6. คอมโพเนนต์ BESPOKE FIGHTER VECTOR ART & MULTI-LAYER PORTRAIT
// ==========================================
function BespokeFighterSvg({ fighter }) {
  const look = fighter.look || {
    skin: '#D6996E',
    hair: 'shortCrop',
    hairColor: '#18181B',
    glove: '4oz_red',
    stance: 'highGuard',
    shorts: '#DC2626'
  };

  const glovePalette = {
    '4oz_gold': { main: '#F59E0B', highlight: '#FDE047', strap: '#111111', is4oz: true },
    '4oz_red': { main: '#DC2626', highlight: '#F87171', strap: '#111111', is4oz: true },
    '4oz_white': { main: '#E4E4E7', highlight: '#FFFFFF', strap: '#18181B', is4oz: true },
    kb_gold: { main: '#EAB308', highlight: '#FEF08A', strap: '#18181B', is4oz: false },
    kb_red: { main: '#EF4444', highlight: '#FCA5A5', strap: '#18181B', is4oz: false },
    kb_blue: { main: '#2563EB', highlight: '#60A5FA', strap: '#18181B', is4oz: false }
  }[look.glove || '4oz_red'];

  return (
    <svg
      viewBox="0 0 240 260"
      className="w-full h-full object-cover select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`spot-${fighter.id}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={fighter.themeColor} stopOpacity="0.48" />
          <stop offset="60%" stopColor={fighter.themeColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor="#09090B" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`skin-${fighter.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={look.skin} />
          <stop offset="100%" stopColor="#8C583A" />
        </linearGradient>
        <linearGradient id={`goldBelt-${fighter.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="75%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Arena Backdrop */}
      <rect width="240" height="260" fill={`url(#spot-${fighter.id})`} />

      {/* Cage / Ring Geometric Lines */}
      <g opacity="0.22" stroke={fighter.themeColor} strokeWidth="1.2" fill="none">
        <polygon points="120,14 216,65 216,195 120,246 24,195 24,65" />
        <line x1="24" y1="130" x2="216" y2="130" strokeDasharray="4 4" />
      </g>

      {/* Muscular Torso & Traps Silhouette */}
      <g>
        {/* Neck & Traps */}
        <path
          d="M88,125 L70,152 L170,152 L152,125 Z"
          fill={`url(#skin-${fighter.id})`}
        />
        <rect x="101" y="110" width="38" height="32" rx="10" fill={`url(#skin-${fighter.id})`} />

        {/* Broad Shoulders & Chest */}
        <path
          d="M42,260 C40,188 62,150 92,146 L148,146 C178,150 200,188 198,260 Z"
          fill={`url(#skin-${fighter.id})`}
        />

        {/* Pectoral & Muscle Shading */}
        <path
          d="M78,185 Q120,202 162,185"
          stroke="#5C341D"
          strokeWidth="3"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M120,154 L120,235"
          stroke="#5C341D"
          strokeWidth="2.5"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M95,212 Q120,220 145,212"
          stroke="#5C341D"
          strokeWidth="2.2"
          fill="none"
          opacity="0.35"
        />
      </g>

      {/* ONE World Champion Gold Belt Draped Over Left Shoulder */}
      {fighter.champion && (
        <g transform="rotate(-14 82 175)">
          <rect
            x="54"
            y="134"
            width="46"
            height="115"
            rx="10"
            fill="#18181B"
            stroke="#FFD700"
            strokeWidth="2.5"
          />
          <ellipse
            cx="77"
            cy="178"
            rx="20"
            ry="26"
            fill={`url(#goldBelt-${fighter.id})`}
            stroke="#FEF08A"
            strokeWidth="1.5"
          />
          <text
            x="77"
            y="181"
            textAnchor="middle"
            fill="#111111"
            fontSize="9"
            fontWeight="900"
          >
            ONE
          </text>
        </g>
      )}

      {/* Fighter Head & Face */}
      <g>
        {/* Ears */}
        <ellipse cx="83" cy="88" rx="6" ry="12" fill={look.skin} />
        <ellipse cx="157" cy="88" rx="6" ry="12" fill={look.skin} />

        {/* Head Shape */}
        <path
          d="M86,62 C86,40 154,40 154,62 L152,102 C152,122 135,134 120,134 C105,134 88,122 88,102 Z"
          fill={`url(#skin-${fighter.id})`}
        />

        {/* Facial Hair (Beard / Stubble / Goatee) */}
        {look.facialHair === 'fullBeard' && (
          <path
            d="M88,96 C88,124 105,136 120,136 C135,136 152,124 152,96 L146,96 C142,115 132,122 120,122 C108,122 98,115 94,96 Z"
            fill={look.hairColor}
            opacity="0.9"
          />
        )}
        {look.facialHair === 'stubble' && (
          <path
            d="M90,100 C92,122 106,133 120,133 C134,133 148,122 150,100 C142,116 132,124 120,124 C108,124 98,116 90,100 Z"
            fill={look.hairColor}
            opacity="0.35"
          />
        )}
        {look.facialHair === 'goatee' && (
          <ellipse cx="120" cy="126" rx="11" ry="7" fill={look.hairColor} opacity="0.85" />
        )}

        {/* Fierce Eyebrows & Eyes */}
        <path d="M96,76 L114,81" stroke="#18181B" strokeWidth="3.8" strokeLinecap="round" />
        <path d="M144,76 L126,81" stroke="#18181B" strokeWidth="3.8" strokeLinecap="round" />
        <ellipse cx="105" cy="85" rx="4.5" ry="2.8" fill="#18181B" />
        <ellipse cx="135" cy="85" rx="4.5" ry="2.8" fill="#18181B" />
        <circle cx="106" cy="84" r="1.2" fill="#FFFFFF" />
        <circle cx="136" cy="84" r="1.2" fill="#FFFFFF" />

        {/* Nose & Determined Mouth / Mouthguard */}
        <path
          d="M120,82 L117,100 L124,102"
          stroke="#6E3F23"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {look.stance === 'ironman' ? (
          /* Fierce War Cry Smile with Mouthguard */
          <rect
            x="108"
            y="110"
            width="24"
            height="7"
            rx="3.5"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="1.5"
          />
        ) : (
          <path
            d="M109,113 Q120,110 131,113"
            stroke="#432312"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Distinctive Hairstyles */}
        {look.hair === 'slickSide' && (
          <path
            d="M84,68 C82,40 108,30 135,34 C155,36 160,52 155,68 C142,50 105,48 84,68 Z"
            fill={look.hairColor}
          />
        )}
        {look.hair === 'curlyDrop' && (
          <g fill={look.hairColor}>
            <path d="M83,68 C80,38 160,38 157,68 C145,54 95,54 83,68 Z" />
            <circle cx="92" cy="54" r="9" />
            <circle cx="108" cy="48" r="10" />
            <circle cx="126" cy="48" r="10" />
            <circle cx="144" cy="53" r="9" />
          </g>
        )}
        {look.hair === 'shortCrop' && (
          <path
            d="M85,64 C85,38 155,38 155,64 C140,53 100,53 85,64 Z"
            fill={look.hairColor}
          />
        )}
        {look.hair === 'highFade' && (
          <path
            d="M92,56 C94,34 146,34 148,56 Z"
            fill={look.hairColor}
          />
        )}
        {look.hair === 'buzzcut' && (
          <path
            d="M87,62 C87,42 153,42 153,62 C138,54 102,54 87,62 Z"
            fill={look.hairColor}
            opacity="0.8"
          />
        )}
        {look.hair === 'blondeSpiky' && (
          <path
            d="M84,65 L90,42 L103,50 L115,34 L126,48 L140,36 L150,52 L156,65 C140,52 100,52 84,65 Z"
            fill={look.hairColor}
          />
        )}
      </g>

      {/* Fighting Guard & Gloves (4oz ONE Muay Thai or Kickboxing Gloves) */}
      <g>
        {/* Left Guard Fist */}
        <g transform="translate(36, 132) rotate(-10)">
          {/* Wrist Wrap */}
          <rect x="10" y="44" width="32" height="24" rx="4" fill="#F4F4F5" />
          {/* Glove Body */}
          <rect
            x="2"
            y="6"
            width="48"
            height="44"
            rx={glovePalette.is4oz ? '10' : '20'}
            fill={glovePalette.main}
            stroke="#111111"
            strokeWidth="2.5"
          />
          <rect
            x="8"
            y="12"
            width="28"
            height="10"
            rx="4"
            fill={glovePalette.highlight}
            opacity="0.5"
          />
          {/* ONE Logo Strip on Glove */}
          <rect x="8" y="38" width="36" height="10" rx="2" fill={glovePalette.strap} />
          <text x="26" y="46" textAnchor="middle" fill="#FFD700" fontSize="6.5" fontWeight="900">
            ONE
          </text>
          {/* Open fingers if 4oz Muay Thai */}
          {glovePalette.is4oz && (
            <path d="M8,6 L42,6" stroke={look.skin} strokeWidth="5" strokeLinecap="round" />
          )}
        </g>

        {/* Right Guard Fist (Higher by Cheek/Chin) */}
        <g transform="translate(152, 114) rotate(12)">
          <rect x="8" y="44" width="32" height="24" rx="4" fill="#F4F4F5" />
          <rect
            x="0"
            y="6"
            width="48"
            height="44"
            rx={glovePalette.is4oz ? '10' : '20'}
            fill={glovePalette.main}
            stroke="#111111"
            strokeWidth="2.5"
          />
          <rect
            x="8"
            y="12"
            width="28"
            height="10"
            rx="4"
            fill={glovePalette.highlight}
            opacity="0.5"
          />
          <rect x="6" y="38" width="36" height="10" rx="2" fill={glovePalette.strap} />
          <text x="24" y="46" textAnchor="middle" fill="#FFD700" fontSize="6.5" fontWeight="900">
            ONE
          </text>
          {glovePalette.is4oz && (
            <path d="M6,6 L40,6" stroke={look.skin} strokeWidth="5" strokeLinecap="round" />
          )}
        </g>
      </g>

      {/* Bottom Vignette */}
      <rect
        x="0"
        y="205"
        width="240"
        height="55"
        fill="url(#bottomFade)"
        opacity="0.6"
      />
    </svg>
  );
}

function FighterPortrait({
  fighter,
  size = 'lg',
  spinning = false,
  imageUrl,
  onEditPhoto,
  onDropFile
}) {
  const [imgError, setImgError] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [imageUrl, fighter.id]);

  // หาทักษะสูงสุดของนักสู้คนนี้เพื่อแสดงไอคอนประจำตัว
  const bestSkillId = useMemo(() => {
    let maxK = 'kick';
    let maxV = 0;
    Object.entries(fighter.stats).forEach(([k, v]) => {
      if (v > maxV) {
        maxV = v;
      maxK = k;
    }
  });
  return maxK;
  }, [fighter]);

  const sizeClasses =
    size === 'xl'
      ? 'w-48 h-52 sm:w-56 sm:h-60 rounded-3xl'
      : size === 'lg'
      ? 'w-32 h-36 sm:w-36 sm:h-40 rounded-2xl'
      : size === 'md'
      ? 'w-14 h-14 rounded-xl'
      : 'w-10 h-10 rounded-xl';

  const handleDragOver = (e) => {
    if (!onDropFile) return;
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    if (!onDropFile) return;
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onDropFile(fighter.id, file);
    }
  };

  const showRealPhoto = Boolean(imageUrl && !imgError);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group/portrait relative flex items-center justify-center select-none overflow-hidden border-2 transition-all duration-300 shrink-0 ${sizeClasses} ${
        spinning ? 'scale-95 blur-[1px]' : 'scale-100'
      } ${isDraggingOver ? 'ring-4 ring-[#FFD700] scale-105' : ''}`}
      style={{
        borderColor: fighter.champion ? '#FFD700' : '#3F3F46',
        background: `radial-gradient(circle at 50% 25%, ${fighter.themeColor}44, #141417 78%)`
      }}
    >
      {/* Layer 1 & 2: Real Photo (Custom, Official ONE Photo, or Wikipedia) OR Layer 3: Bespoke Fighter Vector Art */}
      {showRealPhoto ? (
        <img
          src={imageUrl}
          alt={fighter.nameEn}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/portrait:scale-105"
        />
      ) : (
        <BespokeFighterSvg fighter={fighter} />
      )}

      {/* Subtle Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* เข็มขัดแชมป์โลก */}
      {fighter.champion && (size === 'lg' || size === 'xl') && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-[#FFD700] to-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
          <Crown className="w-2.5 h-2.5 fill-black" />
          CHAMP
        </div>
      )}

      {/* ป้ายธงชาติด้านล่าง */}
      {(size === 'lg' || size === 'xl') && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 border border-white/10 text-[11px] text-[#FFD700] backdrop-blur-sm">
          <span>{fighter.flag}</span>
          {renderSkillIcon(bestSkillId, 'w-3 h-3', '#FFD700')}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6.5 คอมโพเนนต์ MODAL เปลี่ยนรูปนักมวย (อัปโหลดไฟล์ หรือ วาง URL)
// ==========================================
function PhotoEditorModal({
  fighter,
  isOpen,
  onClose,
  currentImageUrl,
  hasCustomImage,
  onSaveCustomImage,
  onRemoveCustomImage
}) {
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fighter) {
      setUrlInput('');
    }
  }, [fighter]);

  if (!isOpen || !fighter) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await compressImageFile(file);
      onSaveCustomImage(fighter.id, dataUrl);
      onClose();
    } catch (err) {
      // ignore error
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onSaveCustomImage(fighter.id, urlInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[#16161A] border border-zinc-800 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-[#FFD700]" />
            <div>
              <h3 className="text-sm font-black text-white">
                ตั้งค่ารูปนักมวย • {fighter.nameTh}
              </h3>
              <p className="text-[11px] text-zinc-400">{fighter.nameEn}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview */}
        <div className="flex justify-center py-1">
          <FighterPortrait
            fighter={fighter}
            size="lg"
            imageUrl={currentImageUrl}
          />
        </div>

        {/* Upload from device */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FFD700] hover:bg-amber-300 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'กำลังประมวลผลรูป...' : 'อัปโหลดรูปจากเครื่อง'}</span>
          </button>
        </div>

        {/* Paste Image URL */}
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Link className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="หรือวางลิงก์รูปภาพ (https://...)"
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            บันทึก
          </button>
        </form>

        {hasCustomImage && (
          <button
            type="button"
            onClick={() => {
              onRemoveCustomImage(fighter.id);
              onClose();
            }}
            className="w-full py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>รีเซ็ตกลับเป็นรูปเริ่มต้น</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. คอมโพเนนต์ MODAL ฐานข้อมูลนักสู้ทั้ง 20 คน
// ==========================================
function FighterRosterModal({
  isOpen,
  onClose,
  draftedIds,
  getFighterImage,
  onEditPhoto
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('overall');

  if (!isOpen) return null;

  const filteredFighters = FIGHTERS_ROSTER.filter((f) => {
    const q = searchQuery.toLowerCase();
    return (
      f.nameTh.toLowerCase().includes(q) ||
      f.nameEn.toLowerCase().includes(q) ||
      f.nickname.toLowerCase().includes(q) ||
      f.division.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (sortBy === 'overall') {
      const sumA = Object.values(a.stats).reduce((s, v) => s + v, 0);
      const sumB = Object.values(b.stats).reduce((s, v) => s + v, 0);
      return sumB - sumA;
    }
    return (b.stats[sortBy] || 0) - (a.stats[sortBy] || 0);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#141417] border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-zinc-800 bg-[#18181c]">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-base sm:text-lg font-black text-white">
              ROSTER ({FIGHTERS_ROSTER.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Sort Controls */}
        <div className="p-3.5 border-b border-zinc-800/80 bg-[#111113] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหานักมวย..."
              className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setSortBy('overall')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                sortBy === 'overall'
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              รวม {MAX_TOTAL_SCORE}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSortBy(cat.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  sortBy === cat.id
                    ? 'bg-[#E60000] text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.shortTh}
              </button>
            ))}
          </div>
        </div>

        {/* Fighters Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredFighters.map((fighter) => {
            const isDrafted = draftedIds.includes(fighter.id);
            const total800 = Object.values(fighter.stats).reduce((a, b) => a + b, 0);

            return (
              <div
                key={fighter.id}
                className={`rounded-xl p-3 border transition-all ${
                  isDrafted
                    ? 'bg-zinc-900/50 border-[#FFD700]/40'
                    : 'bg-zinc-900/90 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <FighterPortrait
                      fighter={fighter}
                      size="md"
                      imageUrl={getFighterImage(fighter.id)}
                    />
                    <div className="min-w-0">
                      <h3 className="font-black text-white text-sm truncate">
                        {fighter.flag} {fighter.nameTh}
                      </h3>
                      <p className="text-xs text-[#FFD700] font-semibold truncate">
                        {fighter.nickname}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-white">
                      {total800}
                      <span className="text-[10px] text-zinc-500">/{MAX_TOTAL_SCORE}</span>
                    </div>
                  </div>
                </div>

                {/* 8 Stat Pills */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pt-2 border-t border-zinc-800/80">
                  {SKILL_CATEGORIES.map((cat) => {
                    const val = fighter.stats[cat.id];
                    const isHighlighted = sortBy === cat.id;
                    return (
                      <div
                        key={cat.id}
                        className={`rounded-lg px-1 py-1 text-center border ${
                          isHighlighted
                            ? 'bg-red-950/50 border-red-500/60'
                            : val >= 96
                            ? 'bg-amber-500/10 border-[#FFD700]/40'
                            : 'bg-black/40 border-zinc-800/80'
                        }`}
                      >
                        <div className="text-[9px] text-zinc-400 truncate">{cat.shortTh}</div>
                        <div
                          className={`text-xs font-black ${
                            val >= 96
                              ? 'text-[#FFD700]'
                              : val >= 93
                              ? 'text-red-400'
                              : 'text-zinc-200'
                          }`}
                        >
                          {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. คอมโพเนนต์หลัก (MAIN APP COMPONENT)
// ==========================================
export default function App() {
  // โหมดการเล่น: 'blind' (ซ่อนค่าพลังวัดกึ๋นแฟนมวย) หรือ 'scout' (แสดงค่าพลังบนการ์ด)
  const [gameMode, setGameMode] = useState('blind');
  const [soundMuted, setSoundMuted] = useState(false);
  const [rosterModalOpen, setRosterModalOpen] = useState(false);

  // ระบบจัดการรูปภาพนักสู้ (Custom Upload + Wikipedia Auto-Fetch + Bespoke Vector Art)
  const [customImages, setCustomImages] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_IMAGES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [wikiImages, setWikiImages] = useState(() => {
    try {
      const saved = localStorage.getItem(WIKI_IMAGES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [useVectorArtOnly, setUseVectorArtOnly] = useState(false);
  const [editingPhotoFighter, setEditingPhotoFighter] = useState(null);

  // ลำดับนักสู้ที่สุ่มได้ในเกมนี้ (6 คนจาก 20 คน)
  const [deck, setDeck] = useState([]);
  const [currentRound, setCurrentRound] = useState(0); // 0 ถึง 5
  const [isSpinning, setIsSpinning] = useState(false);
  const [rouletteFighter, setRouletteFighter] = useState(FIGHTERS_ROSTER[0]);

  // ข้อมูลช่องทักษะที่เลือกแล้ว: { punch: { fighter, statValue }, ... }
  const [assignments, setAssignments] = useState({});
  const [lastAssignedSlot, setLastAssignedSlot] = useState(null);
  const [floatingEffect, setFloatingEffect] = useState(null);

  // สถานะจบเกมและหน้าสรุปผล
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [showOptimalComparison, setShowOptimalComparison] = useState(false);
  const [customFighterName, setCustomFighterName] = useState('THE APEX WARRIOR');
  const [toastMessage, setToastMessage] = useState(null);

  const spinIntervalRef = useRef(null);

  // ดึงรูปนักมวยจริงจาก Wikipedia REST API อัตโนมัติ (ทั้ง EN และ TH)
  useEffect(() => {
    let isMounted = true;

    async function fetchFighterWikiPhotos() {
      const updated = { ...wikiImages };
      let changed = false;

      await Promise.all(
        FIGHTERS_ROSTER.map(async (fighter) => {
          if (updated[fighter.id]) return;

          const slugsToTry = [];
          if (fighter.wikiEn) {
            slugsToTry.push(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                fighter.wikiEn
              )}`
            );
          }
          if (fighter.wikiTh) {
            slugsToTry.push(
              `https://th.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                fighter.wikiTh
              )}`
            );
          }

          for (const endpoint of slugsToTry) {
            try {
              const res = await fetch(endpoint);
              if (!res.ok) continue;
              const data = await res.json();
              const imgUrl = data?.thumbnail?.source || data?.originalimage?.source;
              if (imgUrl) {
                updated[fighter.id] = imgUrl;
                changed = true;
                break;
              }
            } catch {
              // Ignore network errors and fallback to bespoke vector portrait
            }
          }
        })
      );

      if (isMounted && changed) {
        setWikiImages(updated);
        try {
          localStorage.setItem(WIKI_IMAGES_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage error
        }
      }
    }

    fetchFighterWikiPhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  // ฟังก์ชันบันทึก/ลบรูปที่ผู้ใช้กำหนดเอง
  const handleSaveCustomImage = useCallback((fighterId, imageUrl) => {
    setCustomImages((prev) => {
      const next = { ...prev, [fighterId]: imageUrl };
      try {
        localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
    setToastMessage('อัปเดตรูปนักมวยเรียบร้อยแล้ว!');
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  const handleRemoveCustomImage = useCallback((fighterId) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[fighterId];
      try {
        localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  }, []);

  const handleDropImageFile = useCallback(
    async (fighterId, file) => {
      try {
        const dataUrl = await compressImageFile(file);
        handleSaveCustomImage(fighterId, dataUrl);
      } catch {
        // Ignore error
      }
    },
    [handleSaveCustomImage]
  );

  // คืนค่า URL รูปของนักมวยแต่ละคน (Custom > Official Photo URL > Wikipedia > Vector Art)
  const getFighterImage = useCallback(
    (fighterId) => {
      if (customImages[fighterId]) return customImages[fighterId];
      if (useVectorArtOnly) return null;
      const rosterFighter = FIGHTERS_ROSTER.find((f) => f.id === fighterId);
      if (rosterFighter?.photoUrl) return rosterFighter.photoUrl;
      return wikiImages[fighterId] || null;
    },
    [customImages, wikiImages, useVectorArtOnly]
  );

  // สลับปิด-เปิดเสียง
  const toggleSound = () => {
    soundFX.muted = !soundMuted;
    setSoundMuted(!soundMuted);
  };

  // ฟังก์ชันจำลองสล็อตสุ่มการ์ดนักสู้
  const triggerRouletteAnimation = useCallback((targetFighter) => {
    setIsSpinning(true);
    let ticks = 0;
    const totalTicks = 10;

    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

    spinIntervalRef.current = setInterval(() => {
      ticks += 1;
      const randomIdx = Math.floor(Math.random() * FIGHTERS_ROSTER.length);
      setRouletteFighter(FIGHTERS_ROSTER[randomIdx]);
      soundFX.playTick();

      if (ticks >= totalTicks) {
        clearInterval(spinIntervalRef.current);
        setRouletteFighter(targetFighter);
        setIsSpinning(false);
      }
    }, 55);
  }, []);

  // เริ่มเกมใหม่และสุ่มนักสู้ 8 คนที่ไม่ซ้ำกัน
  const startNewGame = useCallback(() => {
    const shuffled = [...FIGHTERS_ROSTER].sort(() => Math.random() - 0.5);
    const selectedFighters = shuffled.slice(0, TOTAL_ROUNDS);
    setDeck(selectedFighters);
    setCurrentRound(0);
    setAssignments({});
    setLastAssignedSlot(null);
    setIsGameComplete(false);
    setShowOptimalComparison(false);
    triggerRouletteAnimation(selectedFighters[0]);
  }, [triggerRouletteAnimation]);

  useEffect(() => {
    startNewGame();
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, [startNewGame]);

  // นักสู้คนปัจจุบัน
  const currentFighter = deck[currentRound] || FIGHTERS_ROSTER[0];
  const displayedFighter = isSpinning ? rouletteFighter : currentFighter;

  // ฟังก์ชันเมื่อผู้เล่นคลิกเลือกช่องทักษะที่ว่างอยู่
  const handleSelectSlot = (skillId) => {
    if (isSpinning || isGameComplete || assignments[skillId] || !currentFighter) return;

    const statValue = currentFighter.stats[skillId];
    soundFX.playImpact(statValue);

    const updatedAssignments = {
      ...assignments,
      [skillId]: {
        fighter: currentFighter,
        statValue,
        roundPicked: currentRound + 1
      }
    };

    setAssignments(updatedAssignments);
    setLastAssignedSlot(skillId);

    // แสดง Floating Score Pop-up
    const skillObj = SKILL_CATEGORIES.find((s) => s.id === skillId);
    setFloatingEffect({
      skillId,
      skillName: skillObj?.shortTh || '',
      statValue,
      fighterName: currentFighter.nameTh
    });

    setTimeout(() => {
      setFloatingEffect(null);
    }, 1100);

    // ตรวจสอบว่าครบ 8 รอบหรือยัง
    if (currentRound < TOTAL_ROUNDS - 1) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      triggerRouletteAnimation(deck[nextRound]);
    } else {
      setTimeout(() => {
        soundFX.playBell();
        setIsGameComplete(true);
      }, 650);
    }
  };

  // คำนวณผลลัพธ์เมื่อดราฟต์ครบหรือระหว่างดราฟต์
  const assignedCount = Object.keys(assignments).length;
  const totalPoints = useMemo(() => {
    return Object.values(assignments).reduce((sum, item) => sum + item.statValue, 0);
  }, [assignments]);

  const averageRating = useMemo(() => {
    if (assignedCount === 0) return 0;
    return totalPoints / assignedCount;
  }, [totalPoints, assignedCount]);

  // คำนวณ Optimal Assignment จากนักสู้ 8 คนที่สุ่มได้ในตานี้
  const optimalResult = useMemo(() => {
    if (deck.length !== TOTAL_ROUNDS) return null;
    return calculateOptimalAssignment(deck);
  }, [deck]);

  // วิเคราะห์จุดแข็งที่สุด (Best Pick) และจุดที่พลาดโอกาส (Missed Opportunity / Weakest Pick)
  const postFightInsights = useMemo(() => {
    if (!isGameComplete) return null;

    const entries = SKILL_CATEGORIES.map((cat) => {
      const pick = assignments[cat.id];
      const fighter = pick.fighter;
      // หาว่านักสู้คนนี้มีค่าพลังสูงสุดในด้านใด
      let bestStatKey = cat.id;
      let bestStatVal = 0;
      Object.entries(fighter.stats).forEach(([k, v]) => {
        if (v > bestStatVal) {
          bestStatVal = v;
          bestStatKey = k;
        }
      });
      const bestCatObj = SKILL_CATEGORIES.find((c) => c.id === bestStatKey);

      return {
        category: cat,
        fighter,
        statValue: pick.statValue,
        fighterBestStatKey: bestStatKey,
        fighterBestStatName: bestCatObj?.shortTh || '',
        fighterBestStatVal: bestStatVal,
        diffFromFighterBest: bestStatVal - pick.statValue
      };
    });

    const sortedByScore = [...entries].sort((a, b) => b.statValue - a.statValue);
    const bestPick = sortedByScore[0];
    const weakestPick = sortedByScore[sortedByScore.length - 1];

    // หาคนที่วางผิดตำแหน่งมากที่สุด
    const biggestMiss = [...entries].sort(
      (a, b) => b.diffFromFighterBest - a.diffFromFighterBest
    )[0];

    return {
      bestPick,
      weakestPick,
      biggestMiss,
      styleAnalysis: analyzeFighterStyle(assignments),
      rankingInfo: getOneRankingResult(totalPoints)
    };
  }, [isGameComplete, assignments, totalPoints]);

  // คัดลอกผลลัพธ์เพื่อแชร์ลง Clipboard
  const handleShareResult = () => {
    if (!postFightInsights) return;
    const { rankingInfo, styleAnalysis } = postFightInsights;
    const lines = SKILL_CATEGORIES.map((cat) => {
      const pick = assignments[cat.id];
      const star = pick.statValue >= 96 ? '🔥' : pick.statValue >= 93 ? '⚡' : '🥊';
      return `${star} ${cat.shortTh}: ${pick.fighter.nameTh} (${pick.statValue})`;
    }).join('\n');

    const shareText = [
      `🏆 ONE PERFECT FIGHTER DRAFT 🏆`,
      `อันดับที่ได้: ${rankingInfo.rankTh}`,
      `คะแนนรวม: ${totalPoints} / ${MAX_TOTAL_SCORE} (สูงสุดชุดนี้: ${optimalResult?.maxTotal || totalPoints}/${MAX_TOTAL_SCORE})`,
      `สไตล์: ${styleAnalysis.archetypeTh}`,
      `────────────────────`,
      lines
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => {
        setToastMessage('คัดลอกผลลัพธ์เรียบร้อยแล้ว!');
        setTimeout(() => setToastMessage(null), 2500);
      });
    }
  };

  const draftedFighterIds = useMemo(() => {
    return deck.slice(0, currentRound + 1).map((f) => f.id);
  }, [deck, currentRound]);

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-100 font-sans selection:bg-[#FFD700] selection:text-black relative overflow-x-hidden">
      {/* พื้นหลัง Spotlight สไตล์สังเวียน ONE Championship */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-[#FFD700]/12 via-[#E60000]/8 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Toast แจ้งเตือน */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD700] text-black font-black text-xs shadow-xl">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==========================================
          TOP NAVIGATION BAR (MINIMAL)
      ========================================== */}
      <header className="relative z-20 border-b border-zinc-800/90 bg-[#111111]/90 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Brand Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center">
              <span className="text-[11px] font-black text-black">ONE</span>
            </div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white uppercase">
              PERFECT <span className="text-[#FFD700]">FIGHTER</span>
            </h1>
          </div>

          {/* Score & Controls */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-black">
              <span className="text-zinc-400">SCORE</span>
              <span className="text-[#FFD700] text-sm">{totalPoints}</span>
              <span className="text-zinc-500">/ {MAX_TOTAL_SCORE}</span>
            </div>

            <button
              onClick={() => setGameMode(gameMode === 'blind' ? 'scout' : 'blind')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                gameMode === 'scout'
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="เปิด/ปิด โหมดดูค่าพลัง"
            >
              {gameMode === 'scout' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{gameMode === 'scout' ? 'Scout' : 'Blind'}</span>
            </button>

            <button
              onClick={() => setRosterModalOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[#FFD700] border border-zinc-800 cursor-pointer"
              title="รายชื่อนักมวย"
            >
              <Users className="w-4 h-4" />
            </button>

            <button
              onClick={startNewGame}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950/60 text-zinc-300 hover:text-red-300 border border-zinc-800 cursor-pointer"
              title="สุ่มใหม่"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN CONTENT AREA
      ========================================== */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-4 sm:py-6">
        {!isGameComplete ? (
          /* ==========================================
             STAGE 1: CLEAN DRAFT GAMEPLAY
          ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* คอลัมน์ซ้าย (5 cols): การ์ดนักสู้ */}
            <div className="lg:col-span-5 flex">
              <div
                className={`w-full rounded-3xl p-[2px] transition-all duration-300 ${
                  isSpinning
                    ? 'bg-zinc-800 scale-[0.99]'
                    : 'bg-gradient-to-b from-[#FFD700] via-[#E60000] to-zinc-900'
                }`}
              >
                <div className="h-full rounded-[22px] bg-[#141417] p-5 flex flex-col justify-between relative overflow-hidden">
                  {/* Top Row: Round Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30">
                      ROUND {currentRound + 1} / {TOTAL_ROUNDS}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: TOTAL_ROUNDS }).map((_, step) => (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full transition-all ${
                            step < assignedCount
                              ? 'w-3.5 bg-[#FFD700]'
                              : step === currentRound
                              ? 'w-4 bg-[#E60000]'
                              : 'w-2 bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Avatar & Name */}
                  <div className="flex flex-col items-center text-center my-5">
                    <FighterPortrait
                      fighter={displayedFighter}
                      size="xl"
                      spinning={isSpinning}
                      imageUrl={getFighterImage(displayedFighter.id)}
                    />

                    <div className="mt-4">
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {displayedFighter.flag} {displayedFighter.nameTh}
                      </h2>
                      <p className="text-xs font-bold text-[#FFD700] mt-1">
                        "{displayedFighter.nickname}"
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {displayedFighter.division}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats Preview (Scout Mode Only) */}
                  {gameMode === 'scout' && !isSpinning ? (
                    <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-zinc-800/80">
                      {SKILL_CATEGORIES.map((cat) => {
                        const val = displayedFighter.stats[cat.id];
                        const isSlotTaken = Boolean(assignments[cat.id]);
                        return (
                          <div
                            key={cat.id}
                            className={`py-1 px-1.5 rounded-xl border text-center ${
                              isSlotTaken
                                ? 'bg-zinc-900/30 border-zinc-800/40 opacity-30'
                                : val >= 96
                                ? 'bg-amber-500/15 border-[#FFD700]/50'
                                : 'bg-zinc-900 border-zinc-800'
                            }`}
                          >
                            <div className="text-[9px] text-zinc-400 font-bold truncate">
                              {cat.shortTh}
                            </div>
                            <div className="text-xs font-black text-white">{val}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pt-2" />
                  )}
                </div>
              </div>
            </div>

            {/* คอลัมน์ขวา (7 cols): ช่องทักษะทั้ง 8 ช่อง */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 h-full">
                {SKILL_CATEGORIES.map((cat) => {
                  const assigned = assignments[cat.id];
                  const isRecentlyPicked = lastAssignedSlot === cat.id;
                  const previewStat =
                    gameMode === 'scout' && !isSpinning && currentFighter
                      ? currentFighter.stats[cat.id]
                      : null;

                  if (assigned) {
                    const tier = getStatTier(assigned.statValue);
                    return (
                      <div
                        key={cat.id}
                        className={`relative rounded-2xl p-3.5 bg-[#17171B] border-2 transition-all flex flex-col justify-between ${
                          tier.borderColor
                        } ${isRecentlyPicked ? 'ring-2 ring-[#FFD700]' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center shrink-0">
                              {renderSkillIcon(cat.id, 'w-4 h-4', cat.color)}
                            </div>
                            <h4 className="font-black text-white text-sm sm:text-base">
                              {cat.shortTh}
                            </h4>
                          </div>

                          <div className={`text-2xl sm:text-3xl font-black leading-none ${tier.textColor}`}>
                            {assigned.statValue}
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <FighterPortrait
                              fighter={assigned.fighter}
                              size="sm"
                              imageUrl={getFighterImage(assigned.fighter.id)}
                            />
                            <span className="text-xs font-bold text-white truncate">
                              {assigned.fighter.nameTh}
                            </span>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase ${tier.badgeBg}`}>
                            {tier.label}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={cat.id}
                      disabled={isSpinning}
                      onClick={() => handleSelectSlot(cat.id)}
                      className="group text-left rounded-2xl p-3.5 bg-[#151519] hover:bg-[#1C1C22] border-2 border-dashed border-zinc-800 hover:border-[#FFD700] transition-all flex items-center justify-between gap-3 min-h-[86px] disabled:opacity-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 group-hover:bg-[#FFD700]/15 border border-zinc-800 flex items-center justify-center shrink-0">
                          {renderSkillIcon(cat.id, 'w-4 h-4', cat.color)}
                        </div>
                        <h4 className="font-black text-white group-hover:text-[#FFD700] text-sm sm:text-base">
                          {cat.shortTh}
                        </h4>
                      </div>

                      {previewStat !== null ? (
                        <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-zinc-800 text-[#FFD700] border border-zinc-700">
                          +{previewStat}
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-300 group-hover:bg-[#FFD700] group-hover:text-black text-xs font-black transition-colors flex items-center gap-1">
                          <span>เลือก</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             STAGE 2: 800-POINT & RANKING RESULT SCREEN
          ========================================== */
          postFightInsights && (
            <div className="space-y-5 animate-fadeIn">
              {/* HERO SUMMARY: 800 SCORE & ONE RANKING */}
              <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#FFD700] via-[#E60000] to-[#FFD700]">
                <div className="rounded-[22px] bg-[#141418] p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
                    {/* Left: Score / 800 + Ranking Status */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                      <div className="px-5 py-4 rounded-2xl bg-black border-2 border-[#FFD700] flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold tracking-widest text-zinc-400">
                          TOTAL SCORE
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span
                            className={`text-4xl sm:text-5xl font-black bg-gradient-to-b ${postFightInsights.rankingInfo.color} bg-clip-text text-transparent leading-none`}
                          >
                            {totalPoints}
                          </span>
                          <span className="text-sm font-black text-zinc-500">/{MAX_TOTAL_SCORE}</span>
                        </div>
                      </div>

                      <div>
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1.5 ${postFightInsights.rankingInfo.badgeStyle}`}
                        >
                          {postFightInsights.rankingInfo.isChampion && (
                            <Trophy className="w-3.5 h-3.5" />
                          )}
                          <span>{postFightInsights.rankingInfo.rankTh}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {postFightInsights.styleAnalysis.archetypeTh}
                        </h2>
                        {optimalResult && (
                          <p className="text-xs font-bold text-zinc-400 mt-1">
                            คะแนนสูงสุดที่จัดได้ในรอบนี้:{' '}
                            <span className="text-emerald-400 font-black">
                              {optimalResult.maxTotal} / {MAX_TOTAL_SCORE}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 justify-center">
                      {optimalResult && (
                        <button
                          onClick={() =>
                            setShowOptimalComparison(!showOptimalComparison)
                          }
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                            showOptimalComparison
                              ? 'bg-emerald-500 text-black border-emerald-400'
                              : 'bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border-emerald-500/40'
                          }`}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>เฉลยจัดทัพสูงสุด</span>
                        </button>
                      )}

                      <button
                        onClick={startNewGame}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E60000] hover:bg-red-600 text-white font-black text-xs sm:text-sm cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>เล่นใหม่</span>
                      </button>

                      <button
                        onClick={handleShareResult}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FFD700] hover:bg-amber-300 text-black font-black text-xs sm:text-sm cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>แชร์</span>
                      </button>
                    </div>
                  </div>

                  {/* แถบเทียบเกณฑ์แรงกิ้ง (Ranking Scale Bar) */}
                  <div className="mt-5 pt-4 border-t border-zinc-800/80 grid grid-cols-3 sm:grid-cols-7 gap-1.5 text-center">
                    {[
                      { label: 'แชมป์โลก 🏆', min: 762 },
                      { label: 'อันดับ #1', min: 752 },
                      { label: 'อันดับ #2', min: 742 },
                      { label: 'อันดับ #3', min: 732 },
                      { label: 'อันดับ #4', min: 722 },
                      { label: 'อันดับ #5', min: 710 },
                      { label: 'ไม่ติดอันดับ', min: 0 }
                    ].map((tier, idx, arr) => {
                      const prevMin = idx === 0 ? 9999 : arr[idx - 1].min;
                      const isActive =
                        totalPoints >= tier.min && totalPoints < prevMin;
                      return (
                        <div
                          key={tier.label}
                          className={`py-1.5 px-2 rounded-xl border text-[11px] transition-all ${
                            isActive
                              ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700] font-black scale-[1.03]'
                              : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500 font-semibold'
                          }`}
                        >
                          <div>{tier.label}</div>
                          <div className="text-[10px] opacity-80">
                            {tier.min > 0 ? `${tier.min}+` : '< 710'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RADAR CHART + 8 SLOTS BREAKDOWN */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* ซ้าย: SVG Radar Chart */}
                <div className="lg:col-span-5 rounded-3xl bg-[#151519] border border-zinc-800 p-5 flex flex-col items-center justify-center">
                  <FighterRadarChart
                    assignments={assignments}
                    optimalMapping={optimalResult?.mapping}
                    showOptimal={showOptimalComparison}
                  />

                  <div className="mt-2 flex items-center justify-center gap-5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#FFD700] inline-block" />
                      <span className="text-zinc-300 font-bold">
                        คุณ ({totalPoints}/{MAX_TOTAL_SCORE})
                      </span>
                    </div>
                    {showOptimalComparison && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-emerald-400 bg-emerald-500/20 inline-block" />
                        <span className="text-emerald-400 font-bold">
                          สูงสุด ({optimalResult?.maxTotal}/{MAX_TOTAL_SCORE})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ขวา: 8 ทักษะแบบกระชับ */}
                <div className="lg:col-span-7 rounded-3xl bg-[#151519] border border-zinc-800 p-5 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SKILL_CATEGORIES.map((cat) => {
                      const pick = assignments[cat.id];
                      const tier = getStatTier(pick.statValue);
                      const optimalPick = optimalResult?.mapping?.[cat.id];

                      return (
                        <div
                          key={cat.id}
                          className="p-3 rounded-2xl bg-black/50 border border-zinc-800/90 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FighterPortrait
                                fighter={pick.fighter}
                                size="sm"
                                imageUrl={getFighterImage(pick.fighter.id)}
                              />
                              <div className="truncate">
                                <div className="flex items-center gap-1 font-black text-white text-xs">
                                  {renderSkillIcon(cat.id, 'w-3.5 h-3.5 shrink-0', cat.color)}
                                  <span>{cat.shortTh}</span>
                                </div>
                                <div className="text-[11px] text-zinc-400 truncate">
                                  {pick.fighter.flag} {pick.fighter.nameTh}
                                </div>
                              </div>
                            </div>

                            <span
                              className={`text-sm px-2 py-0.5 rounded-lg ${tier.badgeBg}`}
                            >
                              {pick.statValue}
                            </span>
                          </div>

                          {showOptimalComparison &&
                            optimalPick &&
                            optimalPick.fighter.id !== pick.fighter.id && (
                              <div className="mt-1.5 text-[10px] font-bold text-emerald-400 truncate">
                                ★ สูงสุด: {optimalPick.fighter.nameTh} (
                                {optimalPick.statValue})
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Best Pick & Missed Peak */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-[#FFD700]/40 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black text-[#FFD700] uppercase">
                          จุดแข็งที่สุด
                        </div>
                        <div className="text-xs font-black text-white mt-0.5">
                          {postFightInsights.bestPick.fighter.nameTh} (
                          {postFightInsights.bestPick.category.shortTh})
                        </div>
                      </div>
                      <span className="text-xl font-black text-[#FFD700]">
                        {postFightInsights.bestPick.statValue}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black text-red-400 uppercase">
                          {postFightInsights.biggestMiss.diffFromFighterBest > 0
                            ? 'จุดที่น่าเสียดาย'
                            : 'ช่องคะแนนต่ำสุด'}
                        </div>
                        <div className="text-xs font-black text-white mt-0.5">
                          {postFightInsights.biggestMiss.diffFromFighterBest > 0
                            ? `${postFightInsights.biggestMiss.fighter.nameTh} (เด่น${postFightInsights.biggestMiss.fighterBestStatName} ${postFightInsights.biggestMiss.fighterBestStatVal})`
                            : `${postFightInsights.weakestPick.fighter.nameTh} (${postFightInsights.weakestPick.category.shortTh})`}
                        </div>
                      </div>
                      <span className="text-xl font-black text-red-400">
                        {postFightInsights.biggestMiss.diffFromFighterBest > 0
                          ? `-${postFightInsights.biggestMiss.diffFromFighterBest}`
                          : postFightInsights.weakestPick.statValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Modal แสดงฐานข้อมูลนักสู้ทั้ง 20 คน */}
      <FighterRosterModal
        isOpen={rosterModalOpen}
        onClose={() => setRosterModalOpen(false)}
        draftedIds={draftedFighterIds}
        getFighterImage={getFighterImage}
      />
    </div>
  );
}