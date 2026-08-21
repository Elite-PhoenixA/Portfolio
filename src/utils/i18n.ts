import { Language } from '../types';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  region: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'vi',
    label: 'Tiếng Việt',
    nativeLabel: 'Tiếng Việt',
    flag: '🇻🇳',
    region: 'Việt Nam',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
    region: 'International',
  },
  {
    code: 'zh',
    label: 'Trung Quốc (Giản thể)',
    nativeLabel: '简体中文',
    flag: '🇨🇳',
    region: '中国大陆',
  },
  {
    code: 'tw',
    label: 'Đài Loan (Phồn thể)',
    nativeLabel: '繁體中文',
    flag: '🇹🇼',
    region: '台灣',
  },
];

export function getLocalized<T>(
  data: { vi: T; en: T; zh?: T; tw?: T } | undefined,
  lang: Language,
  fallback: T
): T {
  if (!data) return fallback;
  if (lang === 'zh' && data.zh !== undefined) return data.zh;
  if (lang === 'tw' && data.tw !== undefined) return data.tw;
  if (lang === 'vi' && data.vi !== undefined) return data.vi;
  if (lang === 'en' && data.en !== undefined) return data.en;
  return data[lang as keyof typeof data] ?? data.en ?? data.vi ?? fallback;
}

export const UI_TRANSLATIONS = {
  nav: {
    about: { vi: 'Về tôi', en: 'About', zh: '关于我', tw: '關於我' },
    skills: { vi: 'Kỹ năng', en: 'Skills', zh: '专业技能', tw: '專業技能' },
    team: { vi: 'Đội ngũ', en: 'Inner Circle', zh: '核心团队', tw: '核心團隊' },
    projects: { vi: 'Dự án', en: 'Projects', zh: '精选项目', tw: '精選專案' },
    experience: { vi: 'Kinh nghiệm', en: 'Experience', zh: '工作经历', tw: '工作經歷' },
    contact: { vi: 'Liên hệ', en: 'Contact', zh: '联系合作', tw: '聯絡合作' },
    resume: { vi: 'Hồ sơ CV', en: 'Resume', zh: '个人简历', tw: '個人簡歷' },
    cyberRain: { vi: 'Hiệu ứng ma trận', en: 'Cyber Rain', zh: '数字雨特效', tw: '數位雨特效' },
  },
  hero: {
    filiusSolis: {
      vi: 'FILIUS SOLIS · THÁI DƯƠNG CHI TỬ',
      en: 'FILIUS SOLIS · SON OF THE SUN',
      zh: 'FILIUS SOLIS · 太阳之子',
      tw: 'FILIUS SOLIS · 太陽之子',
    },
    motto: {
      vi: '« Ex Tenebris Ad Lucem · Từ bóng tối vươn tới ánh sáng »',
      en: '« Ex Tenebris Ad Lucem · Out of darkness, into light »',
      zh: '« Ex Tenebris Ad Lucem · 破晓自暗夜，光明照十方 »',
      tw: '« Ex Tenebris Ad Lucem · 破曉自暗夜，光明照十方 »',
    },
    exploreWork: {
      vi: 'Khám phá tác phẩm',
      en: 'Explore Selected Works',
      zh: '探索代表作品',
      tw: '探索代表作品',
    },
    getInTouch: {
      vi: 'Liên hệ trực tiếp',
      en: 'Get In Touch',
      zh: '即刻取得联系',
      tw: '即刻取得聯繫',
    },
    availableStatus: {
      vi: 'Sẵn sàng tiếp nhận dự án & cơ hội mới',
      en: 'Available for Select Projects & Roles',
      zh: '目前开放接收精选项目与合作机会',
      tw: '目前開放接收精選專案與合作機會',
    },
  },
  about: {
    chapter: { vi: '— CHƯƠNG I —', en: '— CHAPTER I —', zh: '— 第一章 —', tw: '— 第一章 —' },
    badge: { vi: 'Nguồn Gốc & Triết Lý', en: 'Origin & Philosophy', zh: '起源与工程哲学', tw: '起源與工程哲學' },
    heading: { vi: 'Kỹ nghệ & Tinh thần sáng tạo', en: 'Engineering & Creative Craft', zh: '工程技艺与先锋创造力', tw: '工程技藝與先鋒創造力' },
    title: { vi: 'Kỹ nghệ & Tinh thần sáng tạo', en: 'Engineering & Creative Craft', zh: '工程技艺与先锋创造力', tw: '工程技藝與先鋒創造力' },
    subheading: {
      vi: 'Kết hợp tư duy kỹ thuật chuẩn xác cùng trải nghiệm thị giác điện ảnh để tạo nên sản phẩm đột phá.',
      en: 'Bridging technical rigour and cinematic aesthetics to deliver transformative digital products.',
      zh: '融合严谨的工程思维与电影级交互美学，打造突破性的数字产品。',
      tw: '融合嚴謹的工程思維與電影級互動美學，打造突破性的數位產品。',
    },
    subtitle: {
      vi: 'Kết hợp tư duy kỹ thuật chuẩn xác cùng trải nghiệm thị giác điện ảnh để tạo nên sản phẩm đột phá.',
      en: 'Bridging technical rigour and cinematic aesthetics to deliver transformative digital products.',
      zh: '融合严谨的工程思维与电影级交互美学，打造突破性的数字产品。',
      tw: '融合嚴謹的工程思維與電影級互動美學，打造突破性的數位產品。',
    },
    journeyTitle: {
      vi: 'Hành trình kiến tạo',
      en: 'The Creative Philosophy',
      zh: '构筑与重构的哲学',
      tw: '構築與重構的哲學',
    },
    creativePhilosophyTitle: {
      vi: 'Hành trình kiến tạo',
      en: 'The Creative Philosophy',
      zh: '构筑与重构的哲学',
      tw: '構築與重構的哲學',
    },
    currentFocus: {
      vi: 'Trọng tâm hiện tại',
      en: 'Current Focus',
      zh: '当前专注领域',
      tw: '當前專注領域',
    },
    architectureNote: {
      vi: 'Tôi đặc biệt chú trọng đến tính nhất quán trong kiến trúc, tính dễ mở rộng của mã nguồn (clean code, clean architecture) và tốc độ tải trang tối ưu. Đối với tôi, một sản phẩm hoàn hảo phải mượt mà từ lõi backend cho đến từng khung hình hiển thị trên mắt người dùng.',
      en: 'I focus relentlessly on architectural cohesion, maintainable codebases, and sub-millisecond render optimizations. Great software must feel effortless under the hood while delighting users across every single interaction frame.',
      zh: '我始终专注于架构的一致性、代码的可扩展性与极致的渲染性能。优秀的软件必须在底层稳健高效，同时在每一个交互帧上为用户带来行云流水的纯粹体验。',
      tw: '我始終專注於架構的一致性、程式碼的可擴充性與極致的渲染效能。優秀的軟體必須在底層穩健高效，同時在每一個互動幀上為使用者帶來行雲流水的純粹體驗。',
    },
    quickSpecs: {
      vi: 'Chỉ số & Nền tảng kỹ thuật',
      en: 'Technical Specifications',
      zh: '技术规格与性能指标',
      tw: '技術規格與效能指標',
    },
    terminalTitle: {
      vi: 'terminal@khuongduy: ~',
      en: 'terminal@khuongduy: ~',
      zh: 'terminal@khuongduy: ~',
      tw: 'terminal@khuongduy: ~',
    },
  },
  skills: {
    chapter: { vi: '— CHƯƠNG II —', en: '— CHAPTER II —', zh: '— 第二章 —', tw: '— 第二章 —' },
    badge: { vi: 'Năng Lực Chuyên Môn', en: 'Technical Proficiency', zh: '专业技术栈', tw: '專業技術棧' },
    heading: { vi: 'Công nghệ & Vũ khí phát triển', en: 'Technologies & Core Stack', zh: '核心技术矩阵与工具链', tw: '核心技術矩陣與工具鏈' },
    subheading: {
      vi: 'Hệ sinh thái công cụ hiện đại được tôi làm chủ và ứng dụng trong các sản phẩm thực tế.',
      en: 'Modern, battle-tested toolchains and frameworks refined across mission-critical products.',
      zh: '在严苛生产环境中历经检验的现代全栈工具链与高并发架构体系。',
      tw: '在嚴苛生產環境中歷經檢驗的現代全端工具鏈與高併發架構體系。',
    },
    title: { vi: 'Công nghệ & Vũ khí phát triển', en: 'Technologies & Core Stack', zh: '核心技术矩阵与工具链', tw: '核心技術矩陣與工具鏈' },
    subtitle: {
      vi: 'Hệ sinh thái công cụ hiện đại được tôi làm chủ và ứng dụng trong các sản phẩm thực tế.',
      en: 'Modern, battle-tested toolchains and frameworks refined across mission-critical products.',
      zh: '在严苛生产环境中历经检验的现代全栈工具链与高并发架构体系。',
      tw: '在嚴苛生產環境中歷經檢驗的現代全端工具鏈與高併發架構體系。',
    },
    all: { vi: 'Tất cả', en: 'All Tech', zh: '全部技术', tw: '全部技術' },
    frontend: { vi: 'Frontend & 3D', en: 'Frontend & 3D', zh: '前端与3D视觉', tw: '前端與3D視覺' },
    backend: { vi: 'Backend & DB', en: 'Backend & DB', zh: '后端与数据库', tw: '後端與資料庫' },
    cloud: { vi: 'Cloud & DevOps', en: 'Cloud & DevOps', zh: '云原生与DevOps', tw: '雲原生與DevOps' },
    creative: { vi: 'UI/UX & Tools', en: 'UI/UX & Tools', zh: '设计与效能工具', tw: '設計與效能工具' },
    categories: {
      all: { vi: 'Tất cả', en: 'All Tech', zh: '全部技术', tw: '全部技術' },
      frontend: { vi: 'Frontend & 3D', en: 'Frontend & 3D', zh: '前端与3D视觉', tw: '前端與3D視覺' },
      backend: { vi: 'Backend & DB', en: 'Backend & DB', zh: '后端与数据库', tw: '後端與資料庫' },
      cloud: { vi: 'Cloud & DevOps', en: 'Cloud & DevOps', zh: '云原生与DevOps', tw: '雲原生與DevOps' },
      creative: { vi: 'UI/UX & Tools', en: 'UI/UX & Tools', zh: '设计与效能工具', tw: '設計與效能工具' },
    },
    searchPlaceholder: { vi: 'Tìm công nghệ...', en: 'Search tech stack...', zh: '搜索技术栈...', tw: '搜尋技術棧...' },
    proficiency: { vi: 'Mức độ thông thạo', en: 'Proficiency', zh: '熟练度', tw: '熟練度' },
    noMatch: { vi: 'Không tìm thấy công nghệ phù hợp', en: 'No matching technologies found', zh: '未找到匹配的技术', tw: '未找到相符的技術' },
  },
  team: {
    chapter: { vi: '— CHƯƠNG III: THE SQUAD —', en: '— CHAPTER III: THE SQUAD —', zh: '— 第三章：核心团队 —', tw: '— 第三章：核心團隊 —' },
    manifestoBadge: { vi: 'BẢN TUYÊN NGÔN', en: 'THE MANIFESTO', zh: '核心宣言', tw: '核心宣言' },
    thePaths: { vi: 'Ba nhánh đạo lý', en: 'The Three Paths', zh: '三方之道', tw: '三方之道' },
    inspectProfile: { vi: 'Xem chi tiết sứ mệnh', en: 'Inspect Core Profile', zh: '查看履历与职责', tw: '查看履歷與職責' },
    close: { vi: 'Đóng', en: 'Close', zh: '关闭', tw: '關閉' },
    filterAll: { vi: 'Tất cả thành viên', en: 'All Members', zh: '全体成员', tw: '全體成員' },
    filterLead: { vi: 'Core Lead', en: 'Core Lead', zh: '核心领队', tw: '核心領隊' },
    filterSpecialist: { vi: 'Specialist', en: 'Specialists', zh: '领域专家', tw: '領域專家' },
    cyberRainModes: {
      hybrid: { vi: '⚡ HYBRID STORM (VÀNG + ĐỎ TẬN THẾ)', en: '⚡ HYBRID STORM (GOLD + RED APOCALYPSE)', zh: '⚡ 混合双层数码风暴 (金芒 + 末日赤雨)', tw: '⚡ 混合雙層數碼風暴 (金芒 + 末日赤雨)' },
      redhat: { vi: '🔴 RED HAT SECURITY (MƯA ĐỎ + SẤM CHỚP + TIA LỬA)', en: '🔴 RED HAT APOCALYPSE (RED RAIN + LIGHTNING + EMBERS)', zh: '🔴 红帽末日赤雨 (赤色字符 + 炽红闪电 + 火星飞扬)', tw: '🔴 紅帽末日赤雨 (赤色字符 + 熾紅閃電 + 火星飛揚)' },
      phoenix: { vi: '🟡 PHOENIX MATRIX (MƯA VÀNG KHOA HỌC & ĐẠO KINH)', en: '🟡 PHOENIX GOLD MATRIX (IMPERIAL GOLD + ANCIENT CODEX)', zh: '🟡 凤凰金芒数码雨 (金典古籍 + 易道符文)', tw: '🟡 鳳凰金芒數碼雨 (金典古籍 + 易道符文)' },
    },
    rainStatus: {
      active: { vi: 'CYBER RAIN ENGINE · ĐA TẦNG ĐANG CHẠY', en: 'CYBER RAIN ENGINE · MULTI-LAYER ACTIVE', zh: '多层数码雨引擎 · 全天候运行中', tw: '多層數碼雨引擎 · 全天候運行中' },
    },
  },
  projects: {
    chapter: { vi: '— CHƯƠNG IV —', en: '— CHAPTER IV —', zh: '— 第四章 —', tw: '— 第四章 —' },
    badge: { vi: 'Dự Án Tiêu Biểu', en: 'Featured Projects', zh: '精选代表作', tw: '精選代表作' },
    heading: { vi: 'Tác phẩm & Kiến trúc tiêu biểu', en: 'Selected Works & Architectures', zh: '标志性作品与系统架构', tw: '標誌性作品與系統架構' },
    title: { vi: 'Tác phẩm & Kiến trúc tiêu biểu', en: 'Selected Works & Architectures', zh: '标志性作品与系统架构', tw: '標誌性作品與系統架構' },
    subheading: {
      vi: 'Những sản phẩm thực tế được thiết kế chú trọng đến tính sẵn sàng cao, hiệu năng và trải nghiệm người dùng.',
      en: 'Production-ready systems combining resilient architectures, fluid UI, and measurable engineering impact.',
      zh: '兼具高可用性、极致性能与电影级交互质感的生产级系统。',
      tw: '兼具高可用性、極致效能與電影級互動質感的生產級系統。',
    },
    subtitle: {
      vi: 'Những sản phẩm thực tế được thiết kế chú trọng đến tính sẵn sàng cao, hiệu năng và trải nghiệm người dùng.',
      en: 'Production-ready systems combining resilient architectures, fluid UI, and measurable engineering impact.',
      zh: '兼具高可用性、极致性能与电影级交互质感的生产级系统。',
      tw: '兼具高可用性、極致效能與電影級互動質感的生產級系統。',
    },
    categories: {
      all: { vi: 'Tất Cả Dự Án', en: 'All Projects', zh: '全部项目', tw: '全部專案' },
      fullstack: { vi: 'Full-Stack Web', en: 'Full-Stack', zh: '全栈开发', tw: '全端開發' },
      ai: { vi: 'Trí Tuệ Nhân Tạo & GenAI', en: 'AI & GenAI', zh: 'AI & 大模型', tw: 'AI & 大模型' },
      creative: { vi: 'Sáng Tạo & Audio', en: 'Creative & Audio', zh: '创意与音频', tw: '創意與音訊' },
    },
    filterAll: { vi: 'Tất cả dự án', en: 'All Works', zh: '全部作品', tw: '全部作品' },
    inspectArchitecture: { vi: 'Xem kiến trúc chi tiết', en: 'Inspect Architecture', zh: '查看系统架构详情', tw: '查看系統架構詳情' },
    inspectArch: { vi: 'Xem kiến trúc chi tiết', en: 'Inspect Architecture', zh: '查看系统架构详情', tw: '查看系統架構詳情' },
    deepDive: { vi: 'Chi tiết dự án', en: 'Deep Dive', zh: '深入探索', tw: '深入探索' },
    keyMetrics: { vi: 'Chỉ số đo lường:', en: 'Key Metrics:', zh: '关键指标：', tw: '關鍵指標：' },
    viewDetails: { vi: 'Xem chi tiết', en: 'View Details', zh: '查看详情', tw: '查看詳情' },
    liveDemo: { vi: 'Trải nghiệm trực tiếp', en: 'Live Demo', zh: '在线演示', tw: '線上展示' },
    viewCode: { vi: 'Mã nguồn GitHub', en: 'Source Code', zh: 'GitHub 源码', tw: 'GitHub 原始碼' },
  },
  experience: {
    chapter: { vi: '— CHƯƠNG V —', en: '— CHAPTER V —', zh: '— 第五章 —', tw: '— 第五章 —' },
    badge: { vi: 'Quá Trình Làm Việc', en: 'Career Timeline', zh: '职业履历', tw: '職業履歷' },
    heading: { vi: 'Kinh nghiệm & Dấu mốc', en: 'Experience & Milestones', zh: '工程历程与里程碑', tw: '工程歷程與里程碑' },
    title: { vi: 'Kinh nghiệm & Dấu mốc', en: 'Experience & Milestones', zh: '工程历程与里程碑', tw: '工程歷程與里程碑' },
    subheading: {
      vi: 'Hành trình phát triển kỹ năng từ kỹ sư frontend đến kiến trúc sư giải pháp full-stack.',
      en: 'Track record of high-impact engineering leadership, team enablement, and scalable delivery.',
      zh: '从前端工程师迈向全栈与分布式系统架构师的坚实足迹。',
      tw: '從前端工程師邁向全端與分散式系統架構師的堅實足跡。',
    },
    subtitle: {
      vi: 'Hành trình phát triển kỹ năng từ kỹ sư frontend đến kiến trúc sư giải pháp full-stack.',
      en: 'Track record of high-impact engineering leadership, team enablement, and scalable delivery.',
      zh: '从前端工程师迈向全栈与分布式系统架构师的坚实足迹。',
      tw: '從前端工程師邁向全端與分散式系統架構師的堅實足跡。',
    },
    present: { vi: 'Hiện tại', en: 'Present', zh: '至今', tw: '至今' },
  },
  contact: {
    chapter: { vi: '— CHƯƠNG VI —', en: '— CHAPTER VI —', zh: '— 第六章 —', tw: '— 第六章 —' },
    badge: { vi: 'Kết Nối & Hợp Tác', en: 'Communion & Contact', zh: '建立联络', tw: '建立聯絡' },
    heading: { vi: 'Khởi động dự án cùng nhau', en: "Let's Build Something Great", zh: '携手打造卓越数字产品', tw: '攜手打造卓越數位產品' },
    title: { vi: 'Khởi động dự án cùng nhau', en: "Let's Build Something Great", zh: '携手打造卓越数字产品', tw: '攜手打造卓越數位產品' },
    subheading: {
      vi: 'Bạn đang có ý tưởng đột phá, dự án cần hiện thực hoá hoặc muốn trao đổi cơ hội hợp tác? Hãy gửi lời nhắn.',
      en: 'Have an ambitious project, architecture challenge, or open role? Reach out directly.',
      zh: '无论您有颠覆性的创意、复杂的架构挑战，抑或合作机遇，随时欢迎来信探讨。',
      tw: '無論您有顛覆性的創意、複雜的架構挑戰，抑或合作機遇，隨時歡迎來信探討。',
    },
    subtitle: {
      vi: 'Bạn đang có ý tưởng đột phá, dự án cần hiện thực hoá hoặc muốn trao đổi cơ hội hợp tác? Hãy gửi lời nhắn.',
      en: 'Have an ambitious project, architecture challenge, or open role? Reach out directly.',
      zh: '无论您有颠覆性的创意、复杂的架构挑战，抑或合作机遇，随时欢迎来信探讨。',
      tw: '無論您有顛覆性的創意、複雜的架構挑戰，抑或合作機遇，隨時歡迎來信探討。',
    },
    directEmail: { vi: 'Hộp thư trực tiếp', en: 'Direct Email', zh: '直接邮箱', tw: '直接郵箱' },
    copied: { vi: 'Đã sao chép email!', en: 'Email Copied!', zh: '邮箱已复制！', tw: '郵箱已複製！' },
    copyEmail: { vi: 'Sao chép địa chỉ Email', en: 'Copy Email Address', zh: '复制邮箱地址', tw: '複製郵箱地址' },
    location: { vi: 'Vị trí hiện tại', en: 'Location', zh: '当前坐标', tw: '當前座標' },
    locationLabel: { vi: 'Vị trí hiện tại', en: 'Location', zh: '当前坐标', tw: '當前座標' },
    availability: { vi: 'Trạng thái', en: 'Availability', zh: '合作状态', tw: '合作狀態' },
    availabilityLabel: { vi: 'Trạng thái', en: 'Availability', zh: '合作状态', tw: '合作狀態' },
    openToWork: { vi: 'Sẵn sàng tiếp nhận', en: 'Open to work', zh: '可接洽新项目', tw: '可接洽新專案' },
    hanoiTime: { vi: 'Giờ Hà Nội (GMT+7)', en: 'Hanoi Local Time', zh: '河内时间 (GMT+7)', tw: '河內時間 (GMT+7)' },
    altChannels: { vi: 'Kênh liên lạc khác', en: 'Alternative Channels', zh: '其他社交渠道', tw: '其他社交渠道' },
    responseTime: { vi: 'Phản hồi trong 24h', en: 'Reply < 24h', zh: '24小时内极速回复', tw: '24小時內極速回覆' },
    responseSLA: { vi: 'Phản hồi trong 24h', en: '24h Response SLA', zh: '24小时极速回复', tw: '24小時極速回覆' },
    sendMessage: { vi: 'Gửi Tin Nhắn Nhanh', en: 'Send a Message', zh: '发送快捷留言', tw: '發送快捷留言' },
    sendNote: { vi: 'Gửi Tin Nhắn Nhanh', en: 'Send a Message', zh: '发送快捷留言', tw: '發送快捷留言' },
    topic: { vi: 'Chủ đề trao đổi', en: 'Inquiry Topic', zh: '咨询主题', tw: '諮詢主題' },
    topics: {
      fullstack: { vi: 'Phát triển Web / App', en: 'Full-Stack App', zh: '全栈应用开发', tw: '全端應用開發' },
      ai: { vi: 'Tích hợp AI / LLMs', en: 'AI & GenAI Integration', zh: 'AI与大模型集成', tw: 'AI與大模型集成' },
      consulting: { vi: 'Tư vấn Kiến trúc', en: 'Architecture Advisory', zh: '系统架构咨询', tw: '系統架構諮詢' },
    },
    nameLabel: { vi: 'Họ và tên *', en: 'Your Name *', zh: '您的称呼 *', tw: '您的稱呼 *' },
    namePlaceholder: { vi: 'Ví dụ: Alex Smith', en: 'e.g. Alex Smith', zh: '例如：王先生 / Alex', tw: '例如：陳先生 / Alex' },
    emailLabel: { vi: 'Địa chỉ Email *', en: 'Email Address *', zh: '电子邮箱 *', tw: '電子郵箱 *' },
    emailPlaceholder: { vi: 'alex@company.com', en: 'alex@company.com', zh: 'alex@company.com', tw: 'alex@company.com' },
    subjectLabel: { vi: 'Chủ đề trao đổi', en: 'Subject', zh: '咨询主题', tw: '諮詢主題' },
    subjectPlaceholder: { vi: 'Ví dụ: Cơ hội hợp tác dự án mới', en: 'e.g. Project Collaboration Inquiry', zh: '例如：新产品架构设计合作', tw: '例如：新產品架構設計合作' },
    messageLabel: { vi: 'Nội dung tin nhắn *', en: 'Message Details *', zh: '详细留言内容 *', tw: '詳細留言內容 *' },
    messagePlaceholder: {
      vi: 'Mô tả ngắn gọn về nhu cầu, quy mô dự án hoặc mục tiêu bạn muốn cùng thực hiện...',
      en: 'Briefly describe your project scope, timeline, tech requirements or collaboration goals...',
      zh: '请简要描述您的项目需求、时间周期或期待达成的合作目标...',
      tw: '請簡要描述您的專案需求、時間週期或期待達成的合作目標...',
    },
    submitButton: { vi: 'Gửi Yêu Cầu Hợp Tác', en: 'Send Message', zh: '立即发送', tw: '立即發送' },
    sendingButton: { vi: 'Đang gửi...', en: 'Sending...', zh: '正在发送...', tw: '正在發送...' },
    successTitle: { vi: 'Tin nhắn đã được gửi thành công!', en: 'Message Received with Thanks!', zh: '留言已成功送达！', tw: '留言已成功送達！' },
    successDesc: {
      vi: 'Cảm ơn bạn đã liên hệ. Tôi sẽ xem xét thông tin và phản hồi lại bạn trong vòng 24 giờ làm việc.',
      en: 'Thank you for reaching out. I will review your message and reply within 24 business hours.',
      zh: '感谢您的来信！我将尽快审阅并于 24 小时内给您答复。',
      tw: '感謝您的來信！我將盡快審閱並於 24 小時內給您答覆。',
    },
    sendAnother: { vi: 'Gửi thêm tin nhắn khác', en: 'Send another note', zh: '发送其他留言', tw: '發送其他留言' },
  },
  footer: {
    tagline: {
      vi: 'FILIUS SOLIS · KỸ NGHỆ ĐỘT PHÁ & TRIẾT LÝ TỐI GIẢN',
      en: 'FILIUS SOLIS · ALL PATHS RETURN TO THE SUN',
      zh: 'FILIUS SOLIS · 烈火淬炼，重构万物',
      tw: 'FILIUS SOLIS · 烈火淬煉，重構萬物',
    },
    backToTop: { vi: 'Về Đầu Trang', en: 'Back to Top', zh: '返回顶部', tw: '返回頂部' },
  },
  modal: {
    keyFeatures: { vi: 'Tính Năng & Kiến Trúc Nổi Bật', en: 'Key Features & Architecture', zh: '核心特性与架构亮点', tw: '核心特性與架構亮點' },
    techStack: { vi: 'Công Nghệ Sử Dụng', en: 'Technology Stack', zh: '所用技术栈', tw: '所用技術棧' },
    measurableResults: { vi: 'Chỉ Số Kết Quả', en: 'Measurable Results', zh: '实测成效指标', tw: '實測成效指標' },
    printResume: { vi: 'In / Xuất PDF', en: 'Print / Save PDF', zh: '打印 / 导出PDF', tw: '列印 / 匯出PDF' },
    downloadResume: { vi: 'Tải CV (PDF)', en: 'Download CV', zh: '下载简历', tw: '下載簡歷' },
    summarySection: { vi: 'Tóm tắt sự nghiệp', en: 'Career Summary', zh: '职业概述', tw: '職業概述' },
    workExperience: { vi: 'Kinh nghiệm làm việc', en: 'Work Experience', zh: '工作履历', tw: '工作履歷' },
    skillsSummary: { vi: 'Kỹ năng chuyên môn', en: 'Core Skills', zh: '专业技能', tw: '專業技能' },
    educationSummary: { vi: 'Học vấn & Bằng cấp', en: 'Education & Certifications', zh: '教育背景与荣誉', tw: '教育背景與榮譽' },
  },
};
