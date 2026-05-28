import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Zap, Play, Clock, ChevronRight, Mail, ArrowUpRight, 
  Shield, Layers, BarChart3, Smartphone, Globe, Factory, 
  Truck, Flame, Bot, Droplets, FlaskConical, X, CheckCircle2,
  Copy, Check, MessageSquare, Monitor, Cpu, Menu
} from 'lucide-react';

// --- EmailJS 설정 ---
const EMAILJS_SERVICE_ID = "miri@clerobotics.com"; 
const EMAILJS_TEMPLATE_ID = "template_i2fiowi";
const EMAILJS_PUBLIC_KEY = "0rNqhon0xdP9HuLuZ";

// --- 다국어 번역 사전 정의 ---
const translations = {
  ko: {
    menuFeatures: "Features",
    menuLibrary: "Library",
    menuApps: "Applications",
    menuContact: "Contact",
    heroTitle1: "Next-Gen Low-Code Engine for",
    heroTitle2: "Vision Workflows",
    heroDesc: "복잡한 산업용 비전 로직을 시각적인 워크플로우로 구현하고 실시간 지능형 공정 제어를 실현하세요.",
    coreStrengthsTag: "Core strengths",
    coreStrengthsTitle: "산업 현장을 혁신하는 지능형 기술",
    libraryTag: "Continuing to update",
    libraryTitle: "Advanced Node Library",
    libraryDesc: "25개 이상의 산업 특화 노드 카테고리를 통해 공정의 모든 과정을 시각적으로 구현할 수 있습니다.",
    appsTag: "Industrial applications",
    appsTitle: "산업분야별 혁신적인 적용 사례",
    contactTag: "Contact",
    contactTitle: "클레비스 문의하기",
    supportCardTitle: "지원",
    supportCardDesc: "클레비스에 관한 답변과 기술적인 도움을 드려요. 전문팀이 신속하게 응대해 드립니다.",
    supportBtn: "상세 문의하기",
    otherCardTitle: "기타문의",
    otherCardDesc: "다른 궁금한 점이 있으신가요? 메일 주소를 복사하여 직접 문의를 남겨주세요.",
    contactFormTitle: "상세 문의 접수",
    contactFormDesc: "고객님의 환경에 최적화된 솔루션을 제안해 드립니다.",
    formType: "문의 유형",
    formProcess: "공정 유형",
    formCompany: "회사명 / 지역",
    formName: "성명",
    formPosition: "직급",
    formPhone: "연락처",
    formEmail: "이메일 주소",
    formContent: "문의 내용",
    formPrivacy: "개인정보 수집 및 이용에 동의합니다.",
    formSubmit: "문의하기",
    formSending: "전송 중...",
    toastCopied: "이메일 주소가 복사되었습니다.",
    modalSuccessTitle: "문의가 접수되었습니다",
    modalSuccessDesc: "담당자가 신속히 연락드리겠습니다.",
    alertLoad: "서비스 로드 중입니다.",
    alertError: "전송에 실패했습니다. 메일로 직접 문의 바랍니다."
  },
  en: {
    menuFeatures: "Features",
    menuLibrary: "Library",
    menuApps: "Applications",
    menuContact: "Contact",
    heroTitle1: "Next-Gen Low-Code Engine for",
    heroTitle2: "Vision Workflows",
    heroDesc: "Implement complex industrial vision logic into visual workflows and realize real-time intelligent process control.",
    coreStrengthsTag: "Core strengths",
    coreStrengthsTitle: "Intelligent Technologies Innovating Industrial Fields",
    libraryTag: "Continuing to update",
    libraryTitle: "Advanced Node Library",
    libraryDesc: "Visually implement every step of your process with over 25 industry-specific node categories.",
    appsTag: "Industrial applications",
    appsTitle: "Innovative Application Cases by Industry",
    contactTag: "Contact",
    contactTitle: "Contact CleVis",
    supportCardTitle: "Support",
    supportCardDesc: "Get answers and technical help about CleVis. Our expert team will respond quickly.",
    supportBtn: "Inquire Details",
    otherCardTitle: "Other Inquiries",
    otherCardDesc: "Have other questions? Copy our email address to contact us directly.",
    contactFormTitle: "Detailed Inquiry",
    contactFormDesc: "We propose the optimal solution optimized for your environment.",
    formType: "Inquiry Type",
    formProcess: "Process Type",
    formCompany: "Company / Region",
    formName: "Name",
    formPosition: "Position",
    formPhone: "Contact Number",
    formEmail: "Email Address",
    formContent: "Inquiry Content",
    formPrivacy: "I agree to the collection and use of personal information.",
    formSubmit: "Inquire Now",
    formSending: "Sending...",
    toastCopied: "Email address has been copied.",
    modalSuccessTitle: "Inquiry Submitted",
    modalSuccessDesc: "Our representative will contact you shortly.",
    alertLoad: "Service is loading.",
    alertError: "Failed to send. Please contact us directly via email."
  },
  jp: {
    menuFeatures: "機能",
    menuLibrary: "ライブラリ",
    menuApps: "適用事例",
    menuContact: "お問い合わせ",
    heroTitle1: "次世代ローコードエンジン",
    heroTitle2: "Vision Workflows",
    heroDesc: "複雑な産業用ビジョンロジックを視覚的なワークフローで構築し、リアルタイムなインテリジェント工程制御を実現します。",
    coreStrengthsTag: "強み",
    coreStrengthsTitle: "産業現場を革新するインテリジェント技術",
    libraryTag: "アップデート継続中",
    libraryTitle: "高度なノードライブラリ",
    libraryDesc: "25種類以上の産業特化ノードカテゴリにより、工程のすべてのプロセスを視覚的に実装できます。",
    appsTag: "産業別適用",
    appsTitle: "産業分野別の革新적인 適用事例",
    contactTag: "お問い合わせ",
    contactTitle: "CleVisへのお問い合わせ",
    supportCardTitle: "サポート",
    supportCardDesc: "CleVisに関する回答や技術的な支援を提供します。専門チームが迅速に対応いたします。",
    supportBtn: "詳細を問い合わせる",
    otherCardTitle: "その他のお問い合わせ",
    otherCardDesc: "その他にご不明な点はありますか？メールアドレスをコピーして直接お問い合わせください。",
    contactFormTitle: "詳細問い合わせ受付",
    contactFormDesc: "お客様の環境に最適なソリューションをご提案いたします。",
    formType: "問い合わせ種別",
    formProcess: "工程種別",
    formCompany: "会社名 / 地域",
    formName: "氏名",
    formPosition: "役職",
    formPhone: "連絡先",
    formEmail: "メールアドレス",
    formContent: "問い合わせ内容",
    formPrivacy: "個人情報の収集・利用に同意します。",
    formSubmit: "送信する",
    formSending: "送信中...",
    toastCopied: "メールアドレスがコピーされました。",
    modalSuccessTitle: "お問い合わせを受け付けました",
    modalSuccessDesc: "担当者より迅速にご連絡いたします。",
    alertLoad: "サービスをロード中です。",
    alertError: "送信に失敗しました。メールで直接お問い合わせください。"
  }
};

// --- 동적 데이터 가변 번역 시스템 ---
const getNodeGroups = (lang) => {
  const dict = {
    ko: [
      { name: "Logic & Control", nodes: ["FlowControl", "Boolean", "Iteration", "DateTime"], desc: "워크플로우의 실행 흐름을 결정하고 조건부 논리를 실행합니다. 복잡한 시퀀스 제어의 핵심이 되는 제어 소자입니다." },
      { name: "Data Processing", nodes: ["Int16", "Int32", "Long", "Double", "String", "Convert"], desc: "현장의 실시간 데이터를 정밀하게 처리하고 변환합니다. 다양한 데이터 타입을 표준화하여 시스템 간의 정합성을 보장합니다." },
      { name: "Vision System", nodes: ["2D Camera", "3D Camera", "Image2D", "Image3D", "Lighting"], desc: "이미지 획득부터 하드웨어 동기화까지 비전 공정의 기초를 담당합니다. 산업용 고성능 센서와의 완벽한 정합을 지원합니다." },
      { name: "Robotics & Interface", nodes: ["Plc", "Robot", "RobotPose"], desc: "이기종 로봇과 PLC 간의 물리적 인터페이스를 제어합니다. 정밀한 좌표계 계산(Pose)과 실시간 장비 연동을 가능하게 합니다." },
      { name: "Smart Analytics", nodes: ["Aritmetic", "Matrix", "Numeric", "Onnx"], desc: "고도화된 수치 연산 및 AI 모델 추론을 수행합니다. 딥러닝 기반의 분석 결과를 워크플로우에 직접 통합하여 지능형 제어를 실현합니다." },
      { name: "Storage & Custom", nodes: ["DB", "List", "UserDefined"], desc: "데이터 영속성을 위한 저장소 연동 및 사용자 로직을 확장합니다. 시스템의 범용성을 극대화하는 유연한 설계를 제공합니다." }
    ],
    en: [
      { name: "Logic & Control", nodes: ["FlowControl", "Boolean", "Iteration", "DateTime"], desc: "Determines the execution flow of workflows and runs conditional logic. It is a core control element of complex sequences." },
      { name: "Data Processing", nodes: ["Int16", "Int32", "Long", "Double", "String", "Convert"], desc: "Precisely processes and converts real-time data from the field. It standardizes various data types to guarantee system integrity." },
      { name: "Vision System", nodes: ["2D Camera", "3D Camera", "Image2D", "Image3D", "Lighting"], desc: "Responsible for the basics of the vision process, from image acquisition to hardware synchronization. Supports seamless integration with industrial sensors." },
      { name: "Robotics & Interface", nodes: ["Plc", "Robot", "RobotPose"], desc: "Controls the physical interface between heterogeneous robots and PLCs. Enables precise coordinate calculations (Pose) and real-time equipment interworking." },
      { name: "Smart Analytics", nodes: ["Aritmetic", "Matrix", "Numeric", "Onnx"], desc: "Performs highly advanced mathematical calculations and AI model inference. Integrates deep learning analytics directly into workflows." },
      { name: "Storage & Custom", nodes: ["DB", "List", "UserDefined"], desc: "Integrates storage for data persistence and expands custom user logic. Provides a flexible design maximizing system versatility." }
    ],
    jp: [
      { name: "Logic & Control", nodes: ["FlowControl", "Boolean", "Iteration", "DateTime"], desc: "ワークフローの実行フローを決定し、条件ロジックを実行します。複雑なシーケンス制御のコアとなる制御要素です。" },
      { name: "Data Processing", nodes: ["Int16", "Int32", "Long", "Double", "String", "Convert"], desc: "現場のリアルタイムデータを精密に処理して変換します。多様なデータタイプを標準化し、システム間の整合性を保証します。" },
      { name: "Vision System", nodes: ["2D Camera", "3D Camera", "Image2D", "Image3D", "Lighting"], desc: "画像取得からハードウェア同期まで、ビジョンプロセスの基礎を担当します。産業用の高性能センサーとの完璧な整合をサポートします。" },
      { name: "Robotics & Interface", nodes: ["Plc", "Robot", "RobotPose"], desc: "異機種ロボットとPLC間の物理的なインターフェースを制御します。精密な座標系計算（Pose）とリアルタイムの設備連動を可能にします。" },
      { name: "Smart Analytics", nodes: ["Aritmetic", "Matrix", "Numeric", "Onnx"], desc: "高度な数値演算およびAIモデル推論を実行します。ディープラーニングベースの分析結果をワークフローに直接統合し、知能型制御を実現します。" },
      { name: "Storage & Custom", nodes: ["DB", "List", "UserDefined"], desc: "データ永続性のためのストレージ連動およびユーザー独自のロジックを拡張します。システムの汎用性を極大化する柔軟な設計を提供します。" }
    ]
  };
  return dict[lang] || dict['ko'];
};

const getStrengths = (lang) => {
  const dict = {
    ko: [
      { icon: Layers, title: "비주얼 프로그래밍", desc: "노드 기반 편집기 사용으로 코드 레벨의 직접적인 수정 없이도 현장의 다변화된 요구사항에 맞춘 유연한 로직 구성과 파라미터 최적화가 가능합니다." },
      { icon: BarChart3, title: "정밀 분석", desc: "고도화된 데이터 흐름 분석을 통해 장비 가동률 향상 및 장애 발생을 실시간으로 예측합니다." },
      { icon: Shield, title: "로봇 시뮬레이션 기능", desc: "가상 환경에서의 정밀한 로봇 가이던스 시뮬레이션을 통해 리스크를 사전에 방지하고 테스트합니다." },
      { icon: Cpu, title: "멀티 디바이스 통합 관리", desc: "특정 센서 하드웨어나 로봇 시스템과의 연동 기능을 자유롭게 추가할 수 있는 높은 범용성을 갖추고 있습니다." },
      { icon: Monitor, title: "유연한 인터페이스 설계", desc: "가변형 화면 구성 기능을 지원하여 대시보드 및 제어 화면을 직접 구성할 수 있습니다." },
      { icon: Globe, title: "디지털 트윈 기능", desc: "현실 로봇 데이터가 실시간으로 전송되어 3D 가상 공간과 실제 공정이 일치합니다." }
    ],
    en: [
      { icon: Layers, title: "Visual Programming", desc: "By using a node-based editor, flexible logic configuration and parameter optimization are possible without direct code modifications." },
      { icon: BarChart3, title: "Precision Analysis", desc: "Through advanced data flow analysis, equipment utilization is improved and failures are predicted in real-time." },
      { icon: Shield, title: "Robot Simulation", desc: "Virtual environment simulation prevents and tests risks in robot guidance beforehand." },
      { icon: Cpu, title: "Multi-Device Management", desc: "Provides high compatibility, enabling users to freely add and adapt connection features with specific sensor hardware or robot systems." },
      { icon: Monitor, title: "Flexible Interface Design", desc: "Supports variable screen configuration (GUI builder) to directly design customized dashboards and control panels." },
      { icon: Globe, title: "Digital Twin Integration", desc: "Real-world robot data is transmitted in real-time, perfectly matching the 3D virtual space with the physical process." }
    ],
    jp: [
      { icon: Layers, title: "ビジュアルプログラミング", desc: "ノードベースのエディタを使用することで、コードレベルの直接修正なしに、現場の多様な要件に合わせた柔軟なロジック構成とパラメータ最適化が可能です。" },
      { icon: BarChart3, title: "精密分析", desc: "高度なデータフロー分析を通じて、装置の稼働率を向上させ、障害発生をリアルタイムで予測します。" },
      { icon: Shield, title: "ロボットシミュレーション機能", desc: "仮想環境での精密なロボットガイダンスシミュレーションにより、リスクを事前に防止・テストします。" },
      { icon: Cpu, title: "マルチデバイス統合管理", desc: "特定のセンサーハードウェアやロボットシステムとの連動機能を、ユーザー環境に合わせて自由に追加できる高い汎用性を備えています。" },
      { icon: Monitor, title: "柔軟なインターフェース設計", desc: "可変型画面構成機能（GUIビルダー）をサポートし、現場の作業環境や管理目的に最適化されたダッシュボードと制御画面を直接構成できます。" },
      { icon: Globe, title: "デジタルツイン機能", desc: "現実のロボットデータがリアルタイムで送信され、3D仮想空間と実際のプロセスが完全に一致します。" }
    ]
  };
  return dict[lang] || dict['ko'];
};

const getCases = (lang) => {
  const dict = {
    ko: [
      { icon: Factory, title: "각자 각인 인식 시스템", industry: "Manufacturing", image: "/images/app-1.jpg" },
      { icon: Truck, title: "지능형 물류 분류 시스템", industry: "Logistics", image: "/images/app-2.jpg" },
      { icon: Flame, title: "에너지 최적화 그리드 관리", industry: "Energy", image: "/images/app-3.jpg" },
      { icon: Bot, title: "협동 로봇 정밀 협업 제어", industry: "Robotics", image: "/images/app-4.jpg" },
      { icon: Droplets, title: "수처리 시설 통합 모니터링", industry: "Infrastructure", image: "/images/app-5.jpg" },
      { icon: FlaskConical, title: "제약 화학 공정 배치 제어", industry: "Pharmaceutical", image: "/images/app-6.jpg" }
    ],
    en: [
      { icon: Factory, title: "Laser Marking Recognition", industry: "Manufacturing", image: "/images/app-1.jpg" },
      { icon: Truck, title: "Intelligent Logistics Sorting", industry: "Logistics", image: "/images/app-2.jpg" },
      { icon: Flame, title: "Energy Optimized Grid", industry: "Energy", image: "/images/app-3.jpg" },
      { icon: Bot, title: "Cooperative Robot Precision Control", industry: "Robotics", image: "/images/app-4.jpg" },
      { icon: Droplets, title: "Water Treatment Integrated Monitoring", industry: "Infrastructure", image: "/images/app-5.jpg" },
      { icon: FlaskConical, title: "Pharma-Chemical Batch Control", industry: "Pharmaceutical", image: "/images/app-6.jpg" }
    ],
    jp: [
      { icon: Factory, title: "文字刻印認識システム", industry: "Manufacturing", image: "/images/app-1.jpg" },
      { icon: Truck, title: "インテリジェント物流仕分け", industry: "Logistics", image: "/images/app-2.jpg" },
      { icon: Flame, title: "エネルギー最適化グリッド管理", industry: "Energy", image: "/images/app-3.jpg" },
      { icon: Bot, title: "協調ロボット精密協調制御", industry: "Robotics", image: "/images/app-4.jpg" },
      { icon: Droplets, title: "水処理施設統合モニタリング", industry: "Infrastructure", image: "/images/app-5.jpg" },
      { icon: FlaskConical, title: "製薬化学プロセスバッチ制御", industry: "Pharmaceutical", image: "/images/app-6.jpg" }
    ]
  };
  return dict[lang] || dict['ko'];
};

// --- 2. 컴포넌트: PLC 노드 비주얼 ---
const PLCNode = ({ title = "Node Title", subTitle = "Category", isMain = false, glow = false }) => (
  <div 
    className="bg-white p-2.5 rounded-[12px] flex flex-col z-10 mx-auto"
    style={{
      width: isMain ? 'min(420px, 85vw)' : '280px',
      boxShadow: glow ? '0px 20px 40px -10px rgba(0, 0, 0, 0.05)' : '0px 8px 24px rgba(0, 0, 0, 0.03)',
      outline: isMain ? '2px #111 solid' : '1px #E5E7EB solid',
      outlineOffset: '-2px',
    }}
  >
    <div className="bg-[#F3F4F6] rounded-[6px] pt-3.5 pb-2 px-3.5 flex flex-col gap-2.5 overflow-hidden text-left font-sans">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-[#6B7280] text-[10px] font-semibold tracking-wider uppercase leading-none mb-1">
            {subTitle}
          </div>
          <div className={`text-[#111827] font-bold leading-tight ${isMain ? 'text-[18px]' : 'text-[14px]'}`}>
            {title}
          </div>
        </div>
        <div className="w-[40px] h-[32px] bg-white border-[1.5px] border-[#616161] rounded-[6px] flex items-center justify-center shrink-0">
           <Play size={16} color="#616161" fill="currentColor" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="bg-white border border-[#E5E7EB] rounded-full px-2 py-0.5 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
          <div className="text-[#4B5563] text-[9px] font-bold uppercase tracking-tighter">LS electric</div>
        </div>
        <div className="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
          0.142s <Clock size={12} />
        </div>
      </div>
    </div>
    <div className="pt-3 pb-1.5 flex flex-col gap-2">
      {[1, 2].map((_, idx) => (
        <div key={idx} className="relative flex justify-between items-center gap-3 px-2 font-sans">
          <div className="flex-1 h-[36px] bg-white border border-dashed border-[#E5E7EB] rounded-[6px]" />
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] py-1 px-2.5 flex flex-col items-end">
            <span className="text-[#9CA3AF] text-[8px] mb-0.5 font-medium">Nullable</span>
            <span className="text-[#374151] text-[11px] font-semibold leading-none">Flow port</span>
          </div>
          <div className="w-3 h-3 bg-white rounded-full border-[1.5px] border-[#666] absolute right-[-14px] top-1/2 -translate-y-1/2 z-20">
              {idx === 0 && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-40" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SectionTitle = ({ tag, title }) => (
  <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start font-sans">
    <div className="inline-flex items-center py-2 px-4 border border-gray-200 bg-white rounded-full backdrop-blur-md mb-5">
      <span className="text-[12px] font-bold tracking-[0.05em] uppercase text-red-500">{tag}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-[#0F172A] break-keep">{title}</h2>
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // --- 다국어 변경을 위한 핵심 상태 관리 ---
  const [lang, setLang] = useState('ko'); 
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const [inquiryData, setInquiryData] = useState({ 
    type: '구매문의', processType: '위치보정 (장착/ 조립 등)', company: '', name: '', position: '', phone: '', email: '', message: '', agreed: false
  });
  
  const librarySectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: librarySectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => { if (window.emailjs) window.emailjs.init(EMAILJS_PUBLIC_KEY); };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // 언어 드롭다운 바깥 영역 클릭 시 닫히도록 이벤트 리스너 추가
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * nodeGroups.length), nodeGroups.length - 1);
    const safeIndex = index < 0 ? 0 : index;
    if (safeIndex !== activeIndex) setActiveIndex(safeIndex);
  });

  const scrollToSection = (id) => {
    const targetId = id === 'Applications' ? 'application' : id.toLowerCase();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const copyEmail = () => {
    const email = "hello@clerobotics.com";
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryData.agreed || isSending) return;
    if (!window.emailjs) { alert(translations[lang].alertLoad); return; }
    setIsSending(true);
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, inquiryData, EMAILJS_PUBLIC_KEY)
    .then(() => {
      setIsSending(false); setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setIsModalOpen(false); }, 2500);
    }, () => { setIsSending(false); alert(translations[lang].alertError); });
  };

  const activeNodeGroups = getNodeGroups(lang);
  const activeStrengths = getStrengths(lang);
  const activeCases = getCases(lang);

  return (
    <div className="w-full bg-[#F8F9FB] relative flex flex-col font-sans selection:bg-red-500 selection:text-white pt-[100px] md:pt-[140px]">
      
      {/* 0. FLOATING HEADER (top padding 고정: top-8) */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-[700px] h-[60px] z-[100] px-4 md:px-6 py-2 flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
        
        {/* 로고 영역 (항상 노출, 아이콘 포함 및 hover 텍스트 슬라이딩) */}
        <div onClick={() => scrollToSection('home')} className="flex items-center cursor-pointer group h-full relative overflow-hidden shrink-0">
          <div className="flex items-center h-full shrink-0">
            <img src="/my-logo.svg" alt="CleVis Logo" className="h-6 md:h-7 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden items-center justify-center w-7 h-7 bg-[#0F172A] rounded-lg">
              <Zap className="text-white" size={14} fill="currentColor" />
            </div>
          </div>
          
          <div className="relative h-6 md:h-7 ml-2 md:ml-3 overflow-hidden pointer-events-none font-sans">
            <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7">
              <div className="h-6 md:h-7 flex items-center">
                <span className="font-bold text-[16px] md:text-[18px] tracking-tight text-[#1c1c1c]">CleVis</span>
              </div>
              <div className="h-6 md:h-7 flex items-center">
                <span className="font-bold text-[10px] md:text-[11px] text-red-500 uppercase tracking-widest leading-none">Beta Version</span>
              </div>
            </div>
          </div>
        </div>

        {/* 네비게이션 메뉴 및 언어 선택 컨테이너 */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-bold text-gray-500 tracking-[0.05em] font-sans">
            {['Features', 'Library', 'Applications', 'Contact'].map(item => {
              const labelMap = {
                Features: translations[lang].menuFeatures,
                Library: translations[lang].menuLibrary,
                Applications: translations[lang].menuApps,
                Contact: translations[lang].menuContact,
              };
              return (
                <button key={item} onClick={() => scrollToSection(item)} className="hover:text-[#0F172A] transition-colors cursor-pointer uppercase">{labelMap[item]}</button>
              );
            })}
          </div>

          {/* 다국어 선택 드롭다운 (Globe 아이콘) */}
          <div className="relative shrink-0" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)} 
              className="p-2 text-gray-500 hover:text-black hover:bg-gray-100/60 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            >
              <Globe size={18} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3.5 w-28 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl p-1.5 z-[200] flex flex-col gap-1 text-[12px] font-bold text-gray-700"
                >
                  {[
                    { code: 'ko', label: '한국어' },
                    { code: 'jp', label: '日本語' },
                    { code: 'en', label: 'English' }
                  ].map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-xl transition-colors hover:bg-gray-50 cursor-pointer ${lang === item.code ? 'text-red-500 bg-red-50/50' : 'text-gray-700'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 모바일 햄버거 토글 */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-black transition-colors">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl p-6 flex flex-col gap-4 md:hidden font-sans"
            >
              {['Features', 'Library', 'Applications', 'Contact'].map(item => {
                const labelMap = {
                  Features: translations[lang].menuFeatures,
                  Library: translations[lang].menuLibrary,
                  Applications: translations[lang].menuApps,
                  Contact: translations[lang].menuContact,
                };
                return (
                  <button key={item} onClick={() => scrollToSection(item)} className="text-left py-3 px-4 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">{labelMap[item]}</button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION (반응형 2줄 배치 고정) */}
      <section id="home" className="min-h-[70vh] md:min-h-[75vh] relative flex flex-col items-center justify-center p-6 md:p-8 overflow-hidden text-center">
        <div className="container mx-auto max-w-[1280px] flex flex-col items-center z-20">
            <div className="perspective-[2500px] mb-12 md:mb-20">
                <PLCNode title="Load 3D data from file" subTitle="Image 3D" isMain={true} glow={true} />
            </div>
            <div className="text-center max-w-5xl px-4 flex flex-col items-center font-sans">
                <h1 className="text-[clamp(1.8rem,5.2vw,4rem)] font-extrabold text-[#0F172A] mb-6 md:mb-8 leading-[1.15] tracking-tight break-keep">
                    {translations[lang].heroTitle1} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 px-2 inline-block">{translations[lang].heroTitle2}</span>
                </h1>
                <p className="text-gray-500 font-medium text-sm md:text-lg leading-relaxed max-w-2xl mx-auto opacity-90 break-keep">
                    {translations[lang].heroDesc}
                </p>
            </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-20 md:py-32 bg-white relative z-10 px-6 md:px-8 text-left font-sans">
        <div className="container mx-auto max-w-[1280px]">
          <SectionTitle tag={translations[lang].coreStrengthsTag} title={translations[lang].coreStrengthsTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
            {activeStrengths.map((s, i) => (
              <div key={i} className="p-8 md:p-10 rounded-3xl border border-gray-100 bg-[#F9FAFB] shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-6 md:mb-8 group-hover:bg-red-400 group-hover:text-white transition-colors"><s.icon size={24} /></div>
                <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3 md:mb-4">{s.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL LIBRARY SECTION */}
      <section id="library" ref={librarySectionRef} className="relative bg-[#F3F4F6]" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <div className="h-[600vh] w-full relative">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-6 md:px-8">
            <div className="container mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center relative h-full">
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left font-sans">
                    <div className="inline-flex w-fit items-center py-2 px-4 border border-gray-200 bg-white rounded-full backdrop-blur-md mb-5">
                        <span className="text-[10px] md:text-[12px] font-bold uppercase text-red-400">{translations[lang].libraryTag}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">{translations[lang].libraryTitle}</h2>
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed mt-4 opacity-80 break-keep font-medium">{translations[lang].libraryDesc}</p>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 md:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -40 }} transition={{ type: "spring", stiffness: 100, damping: 25 }} className="relative z-10 mb-8 md:mb-12">
                             <PLCNode title={activeNodeGroups[activeIndex].nodes[0]} subTitle={activeNodeGroups[activeIndex].name.toUpperCase()} isMain={true} glow={true} />
                        </motion.div>
                    </AnimatePresence>
                    <div className="w-full max-w-xl text-center md:text-left flex flex-col items-center md:items-start font-sans">
                        <AnimatePresence mode="wait">
                        <motion.div key={activeIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                            <h4 className="text-[#0F172A] text-xl md:text-4xl font-extrabold mb-4 md:mb-5 tracking-tight">{activeNodeGroups[activeIndex].name}</h4>
                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-lg font-medium">{activeNodeGroups[activeIndex].desc}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {activeNodeGroups[activeIndex].nodes.map((tag, tIdx) => (
                                    <span key={tIdx} className="px-3 py-1 md:px-4 md:py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] md:text-[12px] font-bold text-red-400 shadow-sm">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION SECTION */}
      <section id="application" className="min-h-screen flex flex-col justify-center py-20 md:py-32 bg-white relative z-10 px-6 md:px-8 text-center font-sans">
        <div className="container mx-auto max-w-[1280px]">
            <SectionTitle tag={translations[lang].appsTag} title={translations[lang].appsTitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10 md:mt-16">
                {activeCases.map((c, i) => (
                <div key={i} className="group cursor-pointer text-center">
                    <div className="aspect-video rounded-3xl bg-[#F9FAFB] mb-3 overflow-hidden relative border border-gray-100 transition-all">
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                            {c.image ? <img src={c.image} alt={c.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50"><c.icon size={40} className="text-red-200" /></div>}
                        </div>
                    </div>
                    <h3 className="text-sm md:text-lg font-bold text-[#0F172A] group-hover:text-red-500 transition-colors flex items-center gap-2 justify-center">
                        {c.title}<ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </h3>
                </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="min-h-[80vh] flex flex-col justify-center items-center py-20 md:py-24 bg-white relative border-t border-gray-100 px-6 md:px-8 text-left font-sans">
        <div className="container mx-auto max-w-[1280px] text-center">
          <SectionTitle tag={translations[lang].contactTag} title={translations[lang].contactTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-16 max-w-5xl mx-auto text-left">
            <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-start p-8 md:p-10 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 group cursor-pointer h-full transition-all">
              <h4 className="text-lg md:text-xl font-bold text-[#111827] mb-2 tracking-tight">{translations[lang].supportCardTitle}</h4>
              <p className="text-[#6B7280] text-sm md:text-[15px] mb-8 md:mb-10 break-keep font-medium">{translations[lang].supportCardDesc}</p>
              <div className="mt-auto flex items-center gap-2 text-red-500 font-bold text-[12px] md:text-[13px] uppercase tracking-widest transition-none">{translations[lang].supportBtn} <ArrowUpRight size={16} /></div>
            </div>
            <div onClick={copyEmail} className="flex flex-col items-start p-8 md:p-10 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md group cursor-pointer h-full transition-all overflow-hidden">
              <h4 className="text-lg md:text-xl font-bold text-[#111827] mb-2 tracking-tight">{translations[lang].otherCardTitle}</h4>
              <p className="text-[#6B7280] text-sm md:text-[15px] mb-8 md:mb-10 break-keep font-medium">{translations[lang].otherCardDesc}</p>
              <div className="mt-auto flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors w-full justify-between">
                <span className="text-[#111827] font-bold text-xs md:text-sm">hello@clerobotics.com</span>
                <Copy className="text-gray-400 group-hover:text-[#111827]" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating UI Elements */}
      <AnimatePresence>{isToastVisible && <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 50, x: "-50%" }} className="fixed bottom-8 md:bottom-12 left-1/2 z-[300] bg-[#0F172A] text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md font-sans"><CheckCircle2 className="text-green-400" size={20} /><span className="text-[12px] md:text-[14px] font-bold">{translations[lang].toastCopied}</span></motion.div>}</AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-2xl rounded-[32px] p-6 md:p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] font-sans">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center"><div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={40} /></div><h3 className="text-2xl font-bold text-[#0F172A] mb-2">{translations[lang].modalSuccessTitle}</h3><p className="text-gray-500 font-medium">{translations[lang].modalSuccessDesc}</p></div>
              ) : (
                <div className="text-left">
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#0F172A] cursor-pointer"><X size={24} /></button>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{translations[lang].contactFormTitle}</h3>
                  <p className="text-gray-500 mb-8 text-sm opacity-80 break-keep font-medium">{translations[lang].contactFormDesc}</p>
                  <form onSubmit={handleInquirySubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formType}</label><select value={inquiryData.type} onChange={(e) => setInquiryData({...inquiryData, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium"><option>구매문의</option><option>기술지원</option><option>기타문의</option></select></div><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formProcess}</label><select value={inquiryData.processType} onChange={(e) => setInquiryData({...inquiryData, processType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium"><option>위치보정</option><option>랜덤 팔레타이징</option><option>품질 검사</option><option>표면 검사</option><option>기타</option></select></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formCompany}</label><input type="text" required placeholder="클레로보틱스 / 서울" value={inquiryData.company} onChange={(e) => setInquiryData({...inquiryData, company: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium" /></div><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formName}</label><input type="text" required placeholder="성명을 입력해 주세요" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium" /></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formPosition}</label><input type="text" required placeholder="팀장" value={inquiryData.position} onChange={(e) => setInquiryData({...inquiryData, position: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium shadow-none" /></div><div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formPhone}</label><input type="tel" required placeholder="010-0000-0000" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium shadow-none" /></div></div>
                    <div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formEmail}</label><input type="email" required placeholder="example@email.com" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium shadow-none" /></div>
                    <div className="space-y-1.5"><label className="text-[12px] font-bold text-[#0F172A] opacity-70">{translations[lang].formContent}</label><textarea maxLength={1000} rows={4} required placeholder="문의 내용을 작성해 주세요." value={inquiryData.message} onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-[13px] font-medium resize-none h-32" /></div>
                    <div className="flex items-center gap-3 py-1"><input type="checkbox" id="privacy-agree" checked={inquiryData.agreed} onChange={(e) => setInquiryData({...inquiryData, agreed: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400" /><label htmlFor="privacy-agree" className="text-[12px] font-medium text-gray-600 cursor-pointer">{translations[lang].formPrivacy}</label></div>
                    <button type="submit" disabled={!inquiryData.agreed || isSending} className={`w-full py-4 rounded-xl font-bold transition-all text-white ${inquiryData.agreed && !isSending ? 'bg-[#1c1c1c] hover:bg-black cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}>{isSending ? translations[lang].formSending : translations[lang].formSubmit}</button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 py-20 px-8 md:px-20 font-sans text-gray-500 text-[14px] leading-relaxed relative z-10 text-left font-medium">
        <div className="container mx-auto max-w-[1280px]">
          <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group mb-10"><div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"><Zap className="text-white" size={20} fill="currentColor" /></div><span className="font-bold text-2xl tracking-tight text-gray-700">CleVis</span></div>
          <div className="mb-14 text-[12px] md:text-[13px]">
            <div className="font-bold mb-4 text-gray-700 uppercase tracking-wide">클레로보틱스 주식회사</div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-x-6 items-center"><span><strong>사업자등록번호</strong> 157-86-02249</span><span className="hidden md:inline opacity-30 text-gray-300">|</span><span><strong>이메일</strong> hello@clerobotics.com</span></div>
              <div className="pt-4 grid gap-3"><p><strong>본사 (기술연구소)</strong> 04778 서울 성동구 왕십리로 58, 511호-514호, 517호</p><p><strong>시스템연구소 (데모/전시)</strong> 15847 경기 군포시 공단로 117, 1층</p></div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-10 text-[11px] md:text-sm opacity-70">Copyright ⓒ 클레로보틱스 주식회사. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}