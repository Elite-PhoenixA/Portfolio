import { Project, SkillItem, ExperienceItem, EducationItem, TeamMember, TeamInfo } from '../types';

export const PERSONAL_INFO = {
  name: 'Nguyễn Khương Duy',
  nickname: 'Elite',
  vietnameseName: 'Nguyễn Khương Duy',
  titles: {
    vi: 'Creative Full-Stack Developer & Software Architect',
    en: 'Creative Full-Stack Developer & Software Architect',
    zh: '全栈开发工程师与系统架构师 · 先锋创意开发者',
    tw: '全端開發工程師與系統架構師 · 先鋒創意開發者',
  },
  shortBio: {
    vi: 'Tôi kiến tạo các ứng dụng web hiệu năng cao, hệ thống backend phân tán và những trải nghiệm tương tác số mang đậm dấu ấn điện ảnh.',
    en: 'I build high-performance web applications, resilient backend architectures, and immersive cinematic digital experiences.',
    zh: '专注于构筑极致性能的 Web 应用、高可用分布式后端系统，以及富有电影质感的沉浸式数字交互体验。',
    tw: '專注於構築極致效能的 Web 應用、高可用分散式後端系統，以及富有電影質感的沉浸式數位互動體驗。',
  },
  detailedBio: {
    vi: 'Với hơn 5 năm nghiên cứu và làm việc trong lĩnh vực phát triển phần mềm và công nghệ web tương tác, tôi tập trung vào việc kết hợp giữa kỹ nghệ lập trình chuẩn xác và trải nghiệm giao diện đẳng cấp. Tôi tin rằng mọi dòng code không chỉ giải quyết bài toán nghiệp vụ mà còn tạo nên giá trị cảm xúc cho người dùng.',
    en: 'With over 5 years crafting resilient software and interactive web platforms, I blend precision engineering with elevated aesthetic design. I believe software should not only solve complex business problems but also deliver memorable, friction-free experiences.',
    zh: '深耕软件工程与先锋交互技术逾 5 年，我致力于将精密扎实的底层代码工程与电影级美学设计深度融汇。每一行严谨的代码不仅是解决复杂业务场景的利器，更是在方寸屏幕间向用户传递优雅与纯粹的情感介质。',
    tw: '深耕軟體工程與先鋒互動技術逾 5 年，我致力於將精密扎實的底層程式碼工程與電影級美學設計深度融匯。每一行嚴謹的程式碼不僅是解決複雜業務場景的利器，更是在方寸螢幕間向使用者傳遞優雅與純粹的情感介質。',
  },
  location: 'Hà Nội, Việt Nam / Remote Worldwide',
  email: 'ryusama26@gmail.com',
  github: 'https://github.com/Elite-PhoenixA',
  linkedin: 'https://linkedin.com/in/nguyenkhuongduy',
  x: 'https://x.com/khuongduy_dev',
  discord: 'khuongduy#2026',
  availability: {
    status: 'Available for Select Projects & Roles',
    statusVi: 'Sẵn sàng tiếp nhận dự án & cơ hội mới',
    statusZh: '开放接收精选项目与技术合作',
    statusTw: '開放接收精選專案與技術合作',
    type: 'Full-time / Contract / Lead Architect',
  },
  stats: [
    { labelVi: 'Năm kinh nghiệm', labelEn: 'Years Experience', labelZh: '从业年限', labelTw: '從業年限', value: '5+' },
    { labelVi: 'Dự án hoàn thành', labelEn: 'Projects Shipped', labelZh: '交付项目', labelTw: '交付專案', value: '42+' },
    { labelVi: 'Điểm Lighthouse trung bình', labelEn: 'Avg. Lighthouse Score', labelZh: '平均性能评分', labelTw: '平均效能評分', value: '99' },
    { labelVi: 'Đóng góp Open Source', labelEn: 'OSS Contributions', labelZh: '开源贡献', labelTw: '開源貢獻', value: '180+' },
  ],
  avatarUrl: './images/avatar.png',
  // High quality cinematic cover options
  coverUrl: './images/banner.png',
  // Background images for different themes
  themeBackgrounds: {
    cyber: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=80',
    aurora: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=80',
    obsidian: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2400&q=80',
    emerald: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=80',
    amber: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=2400&q=80',
  }
};

export const SKILLS_DATA: SkillItem[] = [
  // Frontend
  {
    name: 'React 19 & Next.js',
    level: 95,
    category: 'frontend',
    icon: 'Atom',
    highlight: true,
    description: {
      vi: 'Server Components, SSR, Streaming Architecture, App Router',
      en: 'Server Components, SSR, Streaming Architecture, App Router',
      zh: '服务端组件（RSC）、流式渲染与高性能 App Router 架构',
      tw: '伺服端組件（RSC）、串流渲染與高效能 App Router 架構',
    },
  },
  {
    name: 'TypeScript & Modern JS',
    level: 95,
    category: 'frontend',
    icon: 'Code2',
    highlight: true,
    description: {
      vi: 'Type safety cấp độ cao, Generic patterns, AST manipulation',
      en: 'Advanced type safety, generic patterns, AST manipulation',
      zh: '高阶类型安全体系、泛型设计模式与 AST 抽象语法树操作',
      tw: '高階型別安全體系、泛型設計模式與 AST 抽象語法樹操作',
    },
  },
  {
    name: 'Tailwind CSS & CSS Architecture',
    level: 92,
    category: 'frontend',
    icon: 'Palette',
    description: {
      vi: 'Design systems, tokens, fluid responsive layouts, micro-animations',
      en: 'Design systems, design tokens, fluid layouts, micro-interactions',
      zh: '企业级设计系统规范、设计令牌、流式响应式与微交互动效',
      tw: '企業級設計系統規範、設計權杖、流式響應式與微互動動效',
    },
  },
  {
    name: 'Framer Motion & WebGL / 3D',
    level: 88,
    category: 'frontend',
    icon: 'Sparkles',
    highlight: true,
    description: {
      vi: 'Chuyển động mượt mà 60fps, physics-based UI, Three.js shaders',
      en: '60fps fluid motion, physics-based gestures, Three.js shaders',
      zh: '60FPS 丝滑物理动效、手势驱动交互与 Three.js / GLSL 着色器',
      tw: '60FPS 絲滑物理動效、手勢驅動互動與 Three.js / GLSL 著色器',
    },
  },

  // Backend
  {
    name: 'Node.js & Express / NestJS',
    level: 92,
    category: 'backend',
    icon: 'Server',
    highlight: true,
    description: {
      vi: 'Microservices, RESTful & GraphQL APIs, WebSocket clustering',
      en: 'Microservices, RESTful & GraphQL APIs, WebSocket clustering',
      zh: '微服务架构、高性能 RESTful / GraphQL API 与 WebSocket 集群',
      tw: '微服務架構、高效能 RESTful / GraphQL API 與 WebSocket 叢集',
    },
  },
  {
    name: 'Python & FastApi / AI Pipelines',
    level: 86,
    category: 'backend',
    icon: 'Terminal',
    description: {
      vi: 'Tích hợp mô hình AI, RAG pipelines, asynchronous workers',
      en: 'AI model integrations, RAG pipelines, asynchronous workers',
      zh: '多模态 AI 模型接入、RAG 检索增强生成与异步任务调度',
      tw: '多模態 AI 模型介接、RAG 檢索增強生成與非同步任務調度',
    },
  },
  {
    name: 'PostgreSQL & Cloud SQL / Drizzle',
    level: 90,
    category: 'backend',
    icon: 'Database',
    description: {
      vi: 'Tối ưu truy vấn, indexing, schema migrations, Drizzle ORM',
      en: 'Query optimization, indexing, schema migrations, Drizzle ORM',
      zh: '复杂查询索引调优、高可用架构与 Drizzle / Prisma ORM',
      tw: '複雜查詢索引調優、高可用架構與 Drizzle / Prisma ORM',
    },
  },
  {
    name: 'Redis & Message Queues',
    level: 85,
    category: 'backend',
    icon: 'Cpu',
    description: {
      vi: 'Caching layers, pub/sub channels, BullMQ task runners',
      en: 'Distributed caching, pub/sub channels, BullMQ task runners',
      zh: '分布式多级缓存、发布订阅队列与 BullMQ 高并发任务',
      tw: '分散式多級快取、發布訂閱佇列與 BullMQ 高併發任務',
    },
  },

  // Cloud & DevOps
  {
    name: 'Docker & Kubernetes',
    level: 84,
    category: 'cloud',
    icon: 'Box',
    description: {
      vi: 'Container hóa đa môi trường, orchestration, self-healing setups',
      en: 'Multi-stage container builds, orchestration, automated scaling',
      zh: '多阶段容器镜像优化、K8s 编排与自愈弹性扩缩容',
      tw: '多階段容器映像檔最佳化、K8s 編排與自癒彈性擴縮容',
    },
  },
  {
    name: 'GCP, AWS & Cloud Run',
    level: 88,
    category: 'cloud',
    icon: 'Cloud',
    description: {
      vi: 'Serverless deployments, VPC networks, edge CDN caching',
      en: 'Serverless deployments, VPC networking, edge CDN caching',
      zh: 'Serverless 无服务器部署、VPC 专有网络与边缘 CDN 加速',
      tw: 'Serverless 無伺服器部署、VPC 專有網路與邊緣 CDN 加速',
    },
  },
  {
    name: 'CI/CD & GitHub Actions',
    level: 90,
    category: 'cloud',
    icon: 'GitBranch',
    description: {
      vi: 'Quy trình kiểm thử tự động, zero-downtime deployment pipelines',
      en: 'Automated test workflows, zero-downtime deployment pipelines',
      zh: '全自动自动化测试流水线与零停机蓝绿发布工作流',
      tw: '全自動自動化測試管線與零停機藍綠發布工作流',
    },
  },

  // Creative & Tools
  {
    name: 'UI/UX & Figma Prototyping',
    level: 88,
    category: 'creative',
    icon: 'Layout',
    description: {
      vi: 'Wireframing, interactive prototypes, visual hierarchy, typography',
      en: 'Wireframing, interactive prototypes, visual hierarchy, typography',
      zh: '交互原型构建、高保真视觉层级规范与精细字体排印',
      tw: '互動原型建構、高保真視覺層級規範與精細字體排印',
    },
  },
  {
    name: 'Performance Profiling & SEO',
    level: 92,
    category: 'creative',
    icon: 'Gauge',
    description: {
      vi: 'Core Web Vitals, memory leak profiling, SEO structured data',
      en: 'Core Web Vitals, memory leak profiling, SEO structured data',
      zh: 'Core Web Vitals 极致调优、内存泄漏分析与结构化 SEO',
      tw: 'Core Web Vitals 極致調優、記憶體洩漏分析與結構化 SEO',
    },
  },
  {
    name: 'Git & Monorepo Tooling (Turborepo)',
    level: 94,
    category: 'creative',
    icon: 'GitPullRequest',
    description: {
      vi: 'Quản lý codebase quy mô lớn, package sharing, semantic versioning',
      en: 'Large-scale repo management, workspace package sharing, semantic releases',
      zh: '超大规模 Monorepo 代码库管理、工作区共享与语义化版本发布',
      tw: '超大規模 Monorepo 程式碼庫管理、工作區共享與語意化版本發布',
    },
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'lumina-nexus',
    title: {
      vi: 'Lumina Nexus — Nền Tảng Phân Tích Dữ Liệu Thời Gian Thực',
      en: 'Lumina Nexus — Real-time Analytics & Neural Dashboard',
      zh: 'Lumina Nexus — 实时遥测数据分析与全景监控大盘',
      tw: 'Lumina Nexus — 即時遙測數據分析與全景監控大盤',
    },
    tagline: {
      vi: 'Hệ thống dashboard giám sát hạ tầng & phân tích luồng dữ liệu microservices thời gian thực với độ trễ dưới 20ms.',
      en: 'Ultra-fast telemetry dashboard monitoring microservice telemetry with sub-20ms latency.',
      zh: '高吞吐微服务遥测监控平台，端到端延迟低至 18ms 以下。',
      tw: '高吞吐微服務遙測監控平台，端到端延遲低至 18ms 以下。',
    },
    description: {
      vi: 'Lumina Nexus là hệ thống dashboard thế hệ mới dành cho các đội ngũ DevOps và Data Engineering. Xây dựng trên nền tảng React 19, WebSockets phân tán và D3.js visualizer, hệ thống cung cấp góc nhìn toàn cảnh về hiệu năng máy chủ, luồng API và dự báo sự cố thông qua mô hình Machine Learning.',
      en: 'Lumina Nexus is a next-generation observability platform for DevOps and data engineering teams. Built with React 19, distributed WebSockets, and D3 visualizers, it delivers comprehensive telemetry, stream inspection, and automated anomaly detection powered by machine learning.',
      zh: 'Lumina Nexus 专为下一代 DevOps 与数据工程团队打造。基于 React 19、分布式 WebSockets 与 D3.js 矢量可视化图表，提供全局服务器负载洞察、API 流量追踪与基于机器学习的故障自动预警。',
      tw: 'Lumina Nexus 專為下一代 DevOps 與數據工程團隊打造。基於 React 19、分散式 WebSockets 與 D3.js 向量視覺化圖表，提供全域伺服器負載洞察、API 流量追蹤與基於機器學習的故障自動預警。',
    },
    category: 'fullstack',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
    ],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Redis', 'D3.js', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://example.com/lumina-nexus',
    githubUrl: 'https://github.com/ryusama26/lumina-nexus',
    featured: true,
    metrics: [
      { label: { vi: 'Độ trễ xử lý', en: 'Telemetry Latency', zh: '遥测处理延迟', tw: '遙測處理延遲' }, value: '< 18ms' },
      { label: { vi: 'Số sự kiện / giây', en: 'Events / Sec', zh: '吞吐事件 / 秒', tw: '吞吐事件 / 秒' }, value: '250,000+' },
      { label: { vi: 'Tỷ lệ tải CPU', en: 'Client CPU Footprint', zh: '客户端CPU占用', tw: '客戶端CPU佔用' }, value: '-42%' },
    ],
    features: {
      vi: [
        'Biểu đồ vector thời gian thực xử lý 60 khung hình/giây không giật lag',
        'Cơ chế cảnh báo thông minh qua Webhooks, Slack và Telegram',
        'Hỗ trợ chế độ Dark Mode chuẩn điện ảnh với tùy biến theme linh hoạt',
        'Hạ tầng mở rộng quy mô tự động với Docker & Kubernetes clusters'
      ],
      en: [
        '60 FPS hardware-accelerated time-series data visualizer',
        'Smart anomaly detection with automated Slack & Webhook alerts',
        'Cinematic dark mode with custom palette configuration',
        'Zero-downtime auto-scaling infrastructure running on Kubernetes'
      ],
      zh: [
        '60 FPS 硬件加速时序数据矢量可视化图表，丝滑流畅零卡顿',
        '智能异常检测机制，通过 Slack、Telegram 和 Webhook 实时报警',
        '支持电影级暗黑模式与多套主题调色板无缝切换',
        'Kubernetes 自动伸缩集群，保障高可用零停机部署'
      ],
      tw: [
        '60 FPS 硬體加速時序數據向量視覺化圖表，絲滑流暢零卡頓',
        '智慧異常檢測機制，透過 Slack、Telegram 和 Webhook 即時報警',
        '支援電影級暗黑模式與多套主題調色盤無縫切換',
        'Kubernetes 自動伸縮叢集，保障高可用零停機部署'
      ]
    }
  },
  {
    id: 'aether-studio',
    title: {
      vi: 'Aether Studio — Nền Tảng Sáng Tạo Nội Dung AI Tương Tác',
      en: 'Aether Studio — Multimodal Generative AI Canvas',
      zh: 'Aether Studio — 多模态生成式 AI 交互工作台',
      tw: 'Aether Studio — 多模態生成式 AI 互動工作台',
    },
    tagline: {
      vi: 'Không gian làm việc vô tận kết hợp mô hình AI tạo sinh, chỉnh sửa hình ảnh và prompt chain trực quan.',
      en: 'Infinite spatial canvas uniting generative AI pipelines, real-time image nodes, and visual prompt chaining.',
      zh: '无限空间画布，融汇多模态生成式 AI、图像处理节点与可视化提示词工作流。',
      tw: '無限空間畫布，融匯多模態生成式 AI、圖像處理節點與視覺化提示詞工作流程。',
    },
    description: {
      vi: 'Aether Studio biến quá trình làm việc với trí tuệ nhân tạo thành một trải nghiệm xúc giác và trực quan. Người dùng có thể kéo thả các khối dữ liệu, kết nối các mô hình ngôn ngữ lớn (LLM) và sinh hình ảnh, âm thanh theo quy trình làm việc dạng node graph mượt mà.',
      en: 'Aether Studio transforms interactions with AI models into an intuitive spatial canvas. Creators connect text prompts, vision nodes, and multimodal processors via node graphs with instant feedback and collaborative multiplayer canvas.',
      zh: 'Aether Studio 将人机交互与 AI 创作转化为触手可及的可视化体验。创作者可以通过节点图自由拖拽连接大语言模型（LLM）、图像生成与音频管线，实现多人实时协同。',
      tw: 'Aether Studio 將人機互動與 AI 創作轉化為觸手可及的視覺化體驗。創作者可以透過節點圖自由拖曳連接大語言模型（LLM）、圖像生成與音訊管線，實現多人即時協同。',
    },
    category: 'ai',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80'
    ],
    techStack: ['React', 'TypeScript', 'Gemini API', 'WebGL', 'Tailwind CSS', 'FastAPI', 'Python'],
    liveUrl: 'https://example.com/aether-studio',
    githubUrl: 'https://github.com/ryusama26/aether-studio',
    featured: true,
    metrics: [
      { label: { vi: 'Thời gian phản hồi', en: 'Avg Stream Latency', zh: '流式响应时延', tw: '串流回應時延' }, value: '320ms' },
      { label: { vi: 'Người dùng tích cực', en: 'Active Creators', zh: '活跃创作者', tw: '活躍創作者' }, value: '18,500+' },
      { label: { vi: 'Node xử lý', en: 'Render Nodes', zh: '可渲染节点数', tw: '可渲染節點數' }, value: 'Infinite' },
    ],
    features: {
      vi: [
        'Canvas vô tận hỗ trợ thao tác zoom/pan với GPU acceleration',
        'Streaming output trực tiếp từ các mô hình Gemini Pro & Imagen',
        'Quản lý lịch sử phiên bản và chia sẻ không gian làm việc qua link mã hóa',
        'Tối ưu hóa bộ nhớ đệm giúp giảm chi phí token lên đến 35%'
      ],
      en: [
        'Infinite spatial canvas with GPU-accelerated smooth pan and zoom',
        'Live streaming token generation from multimodal Gemini models',
        'Encrypted session sharing and non-destructive version history',
        'Smart prompt semantic caching reducing token expenditures by 35%'
      ],
      zh: [
        'GPU 硬件加速无限缩放与平移空间画布',
        '原生对接 Gemini Pro 与 Imagen 模型实时流式生成',
        '端到端加密会话共享与非破坏性历史版本追溯',
        '语义级智能缓存机制，大幅降低 Token 消耗达 35%'
      ],
      tw: [
        'GPU 硬體加速無限縮放與平移空間畫布',
        '原生對接 Gemini Pro 與 Imagen 模型即時串流生成',
        '端到端加密工作階段共享與非破壞性歷史版本追溯',
        '語意級智慧快取機制，大幅降低 Token 消耗達 35%'
      ]
    }
  },
  {
    id: 'chronos-engine',
    title: {
      vi: 'Chronos Flow — Hệ Thống Quản Lý Dự Án & Hiệu Suất Cao Cấp',
      en: 'Chronos Flow — High-Velocity Engineering Workspace',
      zh: 'Chronos Flow — 高效工程协作与敏捷敏捷管理平台',
      tw: 'Chronos Flow — 高效工程協作與敏捷管理平台',
    },
    tagline: {
      vi: 'Công cụ lập kế hoạch và quản lý sprint phong cách tối giản với phím tắt điều khiển bàn phím toàn diện.',
      en: 'Keyboard-first, distraction-free project orchestrator built for high-output engineering teams.',
      zh: '键盘优先、极简专注的工程研发与敏捷冲刺管理系统。',
      tw: '鍵盤優先、極簡專注的工程研發與敏捷衝刺管理系統。',
    },
    description: {
      vi: 'Chronos Flow được thiết kế riêng cho các kỹ sư và nhà thiết kế mong muốn tối ưu hóa nhịp độ làm việc. Không còn những giao diện cồng kềnh, Chronos cung cấp trải nghiệm điều khiển phím tắt kiểu Command-K, đồng bộ offline-first và phân tích tiến độ trực quan.',
      en: 'Chronos Flow is engineered for product teams that value deep focus and lightning velocity. Featuring command-palette-first navigation, optimistic updates with instant offline sync, and automated burndown trajectory analysis.',
      zh: 'Chronos Flow 为追求极速交付与深度心流的工程师打造。摒弃臃肿复杂的传统面板，采用全键盘 Command-K 快捷指令体系、离线优先乐观更新与智能燃尽图分析。',
      tw: 'Chronos Flow 為追求極速交付與深度心流的工程師打造。摒棄臃腫傳統面板，採用全鍵盤 Command-K 快捷指令體系、離線優先樂觀更新與智慧燃盡圖分析。',
    },
    category: 'fullstack',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
    ],
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'WebSockets'],
    liveUrl: 'https://example.com/chronos-flow',
    githubUrl: 'https://github.com/ryusama26/chronos-flow',
    featured: true,
    metrics: [
      { label: { vi: 'Tốc độ mở bảng', en: 'Board Render', zh: '看板秒开耗时', tw: '看板秒開耗時' }, value: '12ms' },
      { label: { vi: 'Tương tác phím tắt', en: 'Keyboard Actions', zh: '全键盘操作覆盖', tw: '全鍵盤操作覆蓋' }, value: '100%' },
      { label: { vi: 'Hỗ trợ Offline', en: 'Offline-First', zh: '离线就绪存储', tw: '離線就緒儲存' }, value: 'IndexedDB' },
    ],
    features: {
      vi: [
        'Điều khiển toàn diện ứng dụng với thanh lệnh Command Palette (Ctrl+K)',
        'Cơ chế optimistic UI giúp thao tác không có độ trễ',
        'Tích hợp liền mạch với GitHub PRs, Jira issues và GitLab commits',
        'Báo cáo hiệu suất sprint tự động tổng hợp định kỳ'
      ],
      en: [
        'Full keyboard command palette workflow for zero-friction task management',
        'Instant optimistic UI updates with resilient offline synchronization',
        'Native two-way integration with GitHub PRs and Git commits',
        'Automated engineering sprint trajectory and velocity forecasting'
      ],
      zh: [
        '全键盘 Command Palette（Ctrl+K）全局极速调度',
        '乐观 UI 更新机制，零网络等待感操作反馈',
        '无缝打通 GitHub PR、GitLab Commit 与任务自动关联',
        '工程燃尽图与团队交付速率智能预测报告'
      ],
      tw: [
        '全鍵盤 Command Palette（Ctrl+K）全域極速調度',
        '樂觀 UI 更新機制，零網路等待感操作反饋',
        '無縫打通 GitHub PR、GitLab Commit 與任務自動關聯',
        '工程燃盡圖與團隊交付速率智慧預測報告'
      ]
    }
  },
  {
    id: 'zenith-audio',
    title: {
      vi: 'Zenith Spatial — Trình Tạo Âm Thanh Môi Trường & Focus Studio',
      en: 'Zenith Spatial — Generative Ambient Synthesizer',
      zh: 'Zenith Spatial — 空间声场生成式白噪音与专注合成器',
      tw: 'Zenith Spatial — 空間聲場生成式白噪音與專注合成器',
    },
    tagline: {
      vi: 'Bộ tổng hợp âm thanh binaural và tiếng ồn vi mô nâng cao trạng thái tập trung sâu (Deep Work).',
      en: 'Web Audio API generative soundscape engine synthesizing adaptive binaural waves for deep focus.',
      zh: '基于 Web Audio API 的自适应双耳节律脑波与生成式自然声场合成器。',
      tw: '基於 Web Audio API 的自適應雙耳節律腦波與生成式自然聲場合成器。',
    },
    description: {
      vi: 'Ứng dụng âm thanh không gian chạy trực tiếp trên trình duyệt sử dụng Web Audio API và WebGL shaders. Tự động điều biến tần số sóng não (Alpha/Theta) kết hợp cùng âm thanh thiên nhiên tạo nên không gian tĩnh tại tuyệt đối.',
      en: 'A browser-native spatial audio synthesizer built with Web Audio API and WebGL shader visualizers. Synthesizes procedural binaural frequencies (Alpha/Theta) blended with organic soundscapes to induce sustained deep focus.',
      zh: '纯浏览器原生运行的空间声场合成引擎，结合 Web Audio API 与 WebGL 粒子着色器。自动调制 Alpha/Theta 脑波节律并混合自然白噪音，引导深度心流状态。',
      tw: '純瀏覽器原生運行的空間聲場合成引擎，結合 Web Audio API 與 WebGL 粒子著色器。自動調製 Alpha/Theta 腦波節律並混合自然白噪音，引導深度心流狀態。',
    },
    category: 'creative',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'Web Audio API', 'TypeScript', 'Three.js / Shaders', 'Tailwind CSS'],
    liveUrl: 'https://example.com/zenith-audio',
    githubUrl: 'https://github.com/ryusama26/zenith-spatial',
    featured: false,
    metrics: [
      { label: { vi: 'Chất lượng âm thanh', en: 'Audio Depth', zh: '音频精度', tw: '音訊精度' }, value: '32-bit float' },
      { label: { vi: 'Tần số hỗ trợ', en: 'Frequency Range', zh: '响应频宽', tw: '響應頻寬' }, value: '20Hz - 20kHz' },
    ],
    features: {
      vi: [
        'Bộ lọc âm thanh phân tích theo thời gian thực với Web Audio Nodes',
        'Visualizer hiệu ứng sóng hạt 3D phản hồi theo dải bass và treble',
        'Chế độ hẹn giờ Pomodoro tích hợp chuông âm thanh Tibetan tự nhiên',
        'Hoạt động 100% offline không tiêu tốn băng thông'
      ],
      en: [
        'Procedural sound generation using low-latency Web Audio nodes',
        'Audio-reactive 3D particle visualizer running at silky 60fps',
        'Integrated gentle Pomodoro intervals with organic Tibetan bowl chimes',
        'Zero network dependencies and purely client-side synthesis'
      ],
      zh: [
        '低延迟 Web Audio 节点驱动的程序化声音合成',
        '60 FPS 响应式 3D 粒子波形音频可视化',
        '内置藏式颂钵音效与番茄工作法心流定时器',
        '零网络依赖，100% 本地浏览器端即时合成'
      ],
      tw: [
        '低延遲 Web Audio 節點驅動的程式化聲音合成',
        '60 FPS 響應式 3D 粒子波形音訊視覺化',
        '內建藏式頌缽音效與番茄工作法心流計時器',
        '零網路依賴，100% 本地瀏覽器端即時合成'
      ]
    }
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'lead-dev-2024',
    period: '2023 — Hiện tại',
    role: {
      vi: 'Senior Full-Stack & Creative Architect',
      en: 'Senior Full-Stack & Creative Architect',
      zh: '资深全栈工程师与系统架构师',
      tw: '資深全端工程師與系統架構師',
    },
    company: 'Nexus Interactive & Enterprise Labs',
    location: 'Hà Nội / Remote',
    description: {
      vi: [
        'Chịu trách nhiệm thiết kế kiến trúc hệ thống frontend micro-frontends và backend microservices phục vụ hơn 200,000 người dùng hàng tháng.',
        'Xây dựng design system đa nền tảng, tăng tốc độ phát triển tính năng mới lên 40% và duy trì điểm số Web Vitals ở mức 98+.',
        'Dẫn dắt đội ngũ 8 kỹ sư phần mềm, thiết lập chuẩn mực code review, CI/CD pipelines và văn hóa kiểm thử tự động.'
      ],
      en: [
        'Architected modern micro-frontend infrastructure and scalable backend services handling 200k+ monthly active users.',
        'Engineered an enterprise design system token library, accelerating product feature velocity by 40% with 98+ Web Vitals.',
        'Mentored an agile engineering team of 8 developers, establishing CI/CD automation and rigorous test standards.'
      ],
      zh: [
        '主导设计微前端与高可用后端微服务基础设施，支撑月活 20 万+ 全球企业用户。',
        '统一全平台 Design System 与设计令牌库，使业务功能研发迭代效率提升 40%，Web Vitals 评分稳居 98+。',
        '带领 8 人研发团队，践行严谨 Code Review、全自动化 CI/CD 与高质量自动化测试规范。'
      ],
      tw: [
        '主導設計微前端與高可用後端微服務基礎設施，支撐月活 20 萬+ 全球企業用戶。',
        '統一全平台 Design System 與設計權杖庫，使業務功能研發迭代效率提升 40%，Web Vitals 評分穩居 98+。',
        '帶領 8 人研發團隊，踐行嚴謹 Code Review、全自動化 CI/CD 與高品質自動化測試規範。'
      ]
    },
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'GCP'],
    current: true
  },
  {
    id: 'fullstack-2021',
    period: '2021 — 2023',
    role: {
      vi: 'Full-Stack Developer & UI Engineer',
      en: 'Full-Stack Developer & UI Engineer',
      zh: '全栈开发工程师与交互界面专家',
      tw: '全端開發工程師與互動介面專家',
    },
    company: 'Vanguard Software Solutions',
    location: 'Hà Nội, Việt Nam',
    description: {
      vi: [
        'Phát triển các ứng dụng web tài chính (FinTech) và thương mại điện tử với tiêu chuẩn bảo mật ngân hàng.',
        'Tối ưu hóa các truy vấn cơ sở dữ liệu phức tạp, giảm thời gian phản hồi API trung bình từ 450ms xuống còn 65ms.',
        'Tích hợp các cổng thanh toán quốc tế và hệ thống xử lý hàng đợi sự kiện với Redis/RabbitMQ.'
      ],
      en: [
        'Developed security-critical FinTech web applications and distributed e-commerce checkout platforms.',
        'Optimized legacy database indexes and queries, slashing average API latency from 450ms down to 65ms.',
        'Integrated multi-currency payment providers and event-driven background queues via Redis and RabbitMQ.'
      ],
      zh: [
        '研发高安全等级金融科技（FinTech）平台与高并发电商结算系统。',
        '深度重构与优化数据库索引与复杂查询，将核心 API 平均响应耗时由 450ms 压缩至 65ms。',
        '对接多币种国际支付网关与基于 Redis / RabbitMQ 的事件驱动消息队列。'
      ],
      tw: [
        '研發高安全等級金融科技（FinTech）平台與高併發電商結算系統。',
        '深度重構與最佳化資料庫索引與複雜查詢，將核心 API 平均回應耗時由 450ms 壓縮至 65ms。',
        '對接多幣種國際支付閘道與基於 Redis / RabbitMQ 的事件驅動訊息佇列。'
      ]
    },
    techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'AWS']
  },
  {
    id: 'frontend-2019',
    period: '2019 — 2021',
    role: {
      vi: 'Frontend & Interactive Web Developer',
      en: 'Frontend & Interactive Web Developer',
      zh: '前端开发工程师与交互视觉专家',
      tw: '前端開發工程師與互動視覺專家',
    },
    company: 'Creative Pixel Digital Studio',
    location: 'Hà Nội, Việt Nam',
    description: {
      vi: [
        'Thiết kế và phát triển hơn 20 trang web thương hiệu và landing page đoạt giải thưởng trải nghiệm người dùng.',
        'Áp dụng các kỹ thuật chuyển động CSS3, Canvas và SVG tương tác tạo nên trải nghiệm người dùng độc đáo.'
      ],
      en: [
        'Crafted and shipped 20+ award-winning brand websites and immersive interactive marketing landing pages.',
        'Leveraged GPU CSS animations, SVG manipulation, and Canvas visualizers for bespoke client experiences.'
      ],
      zh: [
        '主导设计并交付 20+ 屡获殊荣的高端品牌官网与沉浸式数字营销体验页面。',
        '精通 GPU 硬件加速动效、SVG 动态滤镜与 HTML5 Canvas 交互视觉开发。'
      ],
      tw: [
        '主導設計並交付 20+ 屢獲殊榮的高端品牌官網與沉浸式數位行銷體驗頁面。',
        '精通 GPU 硬體加速動效、SVG 動態濾鏡與 HTML5 Canvas 互動視覺開發。'
      ]
    },
    techStack: ['JavaScript ES6+', 'React', 'CSS3 / SASS', 'HTML5 Canvas', 'REST APIs', 'Webpack']
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: {
      vi: 'Cử nhân Công nghệ Thông tin & Khoa học Máy tính',
      en: 'Bachelor of Computer Science & Software Engineering',
      zh: '计算机科学与软件工程学士',
      tw: '資訊工程與軟體工程學士',
    },
    institution: 'Đại học Quốc gia Hà Nội / VNU University of Engineering and Technology',
    period: '2015 — 2019',
    honor: {
      vi: 'Tốt nghiệp loại Giỏi — GPA: 3.65/4.0',
      en: 'Graduated with Honors — GPA: 3.65/4.0',
      zh: '优秀毕业生荣誉学位 — GPA: 3.65/4.0',
      tw: '優秀畢業生榮譽學位 — GPA: 3.65/4.0',
    }
  }
];

export const TEAM_INFO: TeamInfo = {
  name: 'PHOENIX A',
  codename: 'EPA SQUAD',
  subtitle: {
    vi: 'SON OF RA · 太陽之子 · EPA SQUAD',
    en: 'SON OF RA · 太陽之子 · EPA SQUAD',
    zh: 'SON OF RA · 太阳之子 · EPA SQUAD',
    tw: 'SON OF RA · 太陽之子 · EPA SQUAD',
  },
  tagline: {
    vi: 'Nơi ngọn lửa cổ xưa giao hòa cùng ngôn ngữ của máy móc và thuật toán',
    en: 'From the golden barge of dawn, where ancient fire meets the language of machines',
    zh: '烈日乘舟破晓而至，当远古的不灭之火与机器代码共振交融',
    tw: '烈日乘舟破曉而至，當遠古的不滅之火與機器程式碼共振交融',
  },
  description: {
    vi: 'Liên minh kỹ sư phần mềm cao cấp, chuyên sâu về kiến trúc hệ thống phân tán, đồ họa thời gian thực 3D WebGL, trí tuệ nhân tạo thế hệ mới và trải nghiệm giao diện người dùng đỉnh cao.',
    en: 'An elite squad of software architects, real-time 3D WebGL graphics specialists, AI engineers, and design system creators delivering world-class digital systems.',
    zh: '由高阶软件架构师、实时 3D WebGL 图形专家、生成式 AI 算法工程师与交互设计专家组成的先锋技术联盟。',
    tw: '由高階軟體架構師、即時 3D WebGL 圖形專家、生成式 AI 演算法工程師與互動設計專家組成的先鋒技術聯盟。',
  },
  philosophyQuote: {
    quote: {
      vi: 'Người xưa khắc lời cầu nguyện vào đá; chúng tôi dệt chúng vào ánh sáng. Cả hai đều là hiến tế cho cùng một vầng thái dương — Ra, vị thần trỗi dậy mỗi bình minh để nhắc nhở rằng mọi tàn lụi chỉ là tro tàn để từ đó ta hồi sinh.',
      en: 'The ancients carved prayers into stone; we weave them into light. Yet both are offerings to the same sun — Ra, who rises each dawn to remind us that every ending is but the ash from which we rise again.',
      zh: '古人将祷词凿入巨石，我们则将其织入光芒。二者皆是对同一轮不灭烈阳的献祭——拉神在每一道破晓升起，昭示万物的终结皆是涅槃重生的灰烬。',
      tw: '古人將禱詞鑿入巨石，我們則將其織入光芒。二者皆是對同一輪不滅烈陽的獻祭——拉神在每一道破曉升起，昭示萬物的終結皆是涅槃重生的灰燼。',
    },
    cite: 'PHOENIX A · 太陽之子',
  },
  avatar: '/images/PhoenixA-logo.png',
  banner: '/images/PhoenixA-banner.png',
  founded: '2022',
  location: 'Heliopolis / Hà Nội, VN · Remote Worldwide',
  stats: {
    membersCount: 3,
    completedProjects: 28,
    uptimePercentage: '99.98%',
  },
  links: {
    github: 'https://github.com/Elite-PhoenixA',
    discord: 'https://discord.gg',
  }
};

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'elite',
    name: 'Elite',
    alias: 'Elite',
    glyph: '道',
    pathName: {
      vi: 'THE WAY · ĐẠO KIẾN TRÚC',
      en: 'THE WAY · SYSTEM ARCHITECTURE',
      zh: 'THE WAY · 架构之道',
      tw: 'THE WAY · 架構之道',
    },
    role: {
      vi: 'Lead Software Architect & Creative Full-Stack',
      en: 'Lead Software Architect & Creative Full-Stack',
      zh: '首席软件架构师与先锋全栈领队',
      tw: '首席軟體架構師與先鋒全端領隊',
    },
    specialty: {
      vi: 'Kiến trúc hệ thống, High-Performance Web & Trải nghiệm tương tác',
      en: 'System Architecture, High-Performance Web & Interactive UI',
      zh: '高并发系统架构、极致性能 Web 与沉浸式电影级交互',
      tw: '高併發系統架構、極致效能 Web 與沉浸式電影級互動',
    },
    bio: {
      vi: 'Định hướng kiến trúc tổng thể, dẫn dắt nghiên cứu các công nghệ tiên phong và đảm bảo chuẩn mực code chất lượng cao cho toàn bộ sản phẩm.',
      en: 'Directing overarching technical roadmap, driving pioneering tech adoption, and enforcing premier code quality standards across all projects.',
      zh: '统领全栈技术蓝图规划，引领前沿工程技术攻坚，恪守代码艺术与严苛工程质量标准。',
      tw: '統領全端技術藍圖規劃，引領前沿工程技術攻堅，恪守程式碼藝術與嚴苛工程品質標準。',
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coreSkills: ['React 19', 'Node.js / Go', 'System Design', 'Web Performance'],
    status: {
      vi: 'Core Lead & Architect',
      en: 'Core Lead & Architect',
      zh: '核心领队与总架构师',
      tw: '核心領隊與總架構師',
    },
    socials: {
      github: 'https://github.com/Elite-PhoenixA',
      linkedin: 'https://linkedin.com',
      email: 'ryusama26@gmail.com',
    },
    highlight: true,
  },
  {
    id: 'kaze',
    name: 'Kaze',
    alias: 'Kaze',
    glyph: '☉',
    pathName: {
      vi: 'THE SUN · THÁI DƯƠNG QUANG HỌC',
      en: 'THE SUN · 3D & GRAPHICS',
      zh: 'THE SUN · 烈阳光学与渲染',
      tw: 'THE SUN · 烈陽光學與渲染',
    },
    role: {
      vi: 'Senior Frontend & Creative 3D Engineer',
      en: 'Senior Frontend & Creative 3D Engineer',
      zh: '资深前端工程师与创意 3D 视觉专家',
      tw: '資深前端工程師與創意 3D 視覺專家',
    },
    specialty: {
      vi: 'WebGL, Three.js, Shader GLSL & Micro-interactions',
      en: 'WebGL, Three.js, GLSL Shaders & Micro-interactions',
      zh: 'WebGL、Three.js、GLSL 复杂着色器与微交互物理引擎',
      tw: 'WebGL、Three.js、GLSL 複雜著色器與微互動物理引擎',
    },
    bio: {
      vi: 'Chuyên gia điêu khắc không gian số với đồ hoạ 3D thời gian thực, vật lý hạt và chuyển động mượt mà ở mức 60-120 FPS.',
      en: 'Crafting spatial web experiences with real-time 3D graphics, particle physics simulations, and silky 60-120 FPS animations.',
      zh: '在方寸屏幕间塑造三维数字空间，擅长实时 3D 渲染、粒子物理演算与 120 FPS 丝滑微动效。',
      tw: '在方寸螢幕間塑造三維數位空間，擅長即時 3D 渲染、粒子物理演算與 120 FPS 絲滑微動效。',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coreSkills: ['Three.js / WebGL', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: {
      vi: '3D & Graphics Specialist',
      en: '3D & Graphics Specialist',
      zh: '3D 图形与视觉专家',
      tw: '3D 圖形與視覺專家',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    highlight: false,
  },
  {
    id: 'aero',
    name: 'Aero',
    alias: 'Aero',
    glyph: '⌬',
    pathName: {
      vi: 'THE CIPHER · MẬT MÃ HẠ TẦNG',
      en: 'THE CIPHER · DISTRIBUTED SYSTEMS',
      zh: 'THE CIPHER · 密态分布式基建',
      tw: 'THE CIPHER · 密態分散式基建',
    },
    role: {
      vi: 'Lead Backend & Distributed Systems Specialist',
      en: 'Lead Backend & Distributed Systems Specialist',
      zh: '首席后端工程师与分布式架构专家',
      tw: '首席後端工程師與分散式架構專家',
    },
    specialty: {
      vi: 'High-Concurrency Microservices, Kubernetes & Cloud Native',
      en: 'High-Concurrency Microservices, Kubernetes & Cloud Native',
      zh: '超高并发微服务集群、Kubernetes 编排与云原生基建',
      tw: '超高併發微服務叢集、Kubernetes 編排與雲原生基建',
    },
    bio: {
      vi: 'Xây dựng hạ tầng backend phân tán chịu tải hàng triệu request, tối ưu hoá database latency và bảo mật chuẩn công nghiệp.',
      en: 'Architecting distributed microservices serving millions of requests with ultra-low latency and enterprise-grade security.',
      zh: '构筑承载千万级高频请求的弹性微服务集群，极致优化数据库检索延迟与企业级安全合规。',
      tw: '構築承載千萬級高頻請求的彈性微服務叢集，極致最佳化資料庫檢索延遲與企業級安全合規。',
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    coreSkills: ['Go / Rust', 'PostgreSQL', 'Docker & K8s', 'Kafka / Redis'],
    status: {
      vi: 'Infrastructure Specialist',
      en: 'Infrastructure Specialist',
      zh: '高可用基础设施专家',
      tw: '高可用基礎設施專家',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    highlight: false,
  }
];

