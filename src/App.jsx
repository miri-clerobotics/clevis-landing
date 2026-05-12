import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Zap, Play, Clock, ChevronRight, Mail, ArrowUpRight, 
  Shield, Layers, BarChart3, Smartphone, Globe, Factory, 
  Truck, Flame, Bot, Droplets, FlaskConical, X, CheckCircle2,
  Copy, Check, MessageSquare, Monitor, Cpu
} from 'lucide-react';

// --- EmailJS 설정 ---
const EMAILJS_SERVICE_ID = "miri@clerobotics.com"; 
const EMAILJS_TEMPLATE_ID = "template_i2fiowi";
const EMAILJS_PUBLIC_KEY = "0rNqhon0xdP9HuLuZ";

// --- 1. 데이터 정의 ---
const nodeGroups = [
  { 
    name: "Logic & Control", 
    nodes: ["FlowControl", "Boolean", "Iteration", "DateTime"], 
    desc: "워크플로우의 실행 흐름을 결정하고 조건부 논리를 실행합니다. 복잡한 시퀀스 제어의 핵심이 되는 제어 소자입니다." 
  },
  { 
    name: "Data Processing", 
    nodes: ["Int16", "Int32", "Long", "Double", "String", "Convert"], 
    desc: "현장의 실시간 데이터를 정밀하게 처리하고 변환합니다. 다양한 데이터 타입을 표준화하여 시스템 간의 정합성을 보장합니다." 
  },
  { 
    name: "Vision System", 
    nodes: ["2D Camera", "3D Camera", "Image2D", "Image3D", "Lighting"], 
    desc: "이미지 획득부터 하드웨어 동기화까지 비전 공정의 기초를 담당합니다. 산업용 고성능 센서와의 완벽한 정합을 지원합니다." 
  },
  { 
    name: "Robotics & Interface", 
    nodes: ["Plc", "Robot", "RobotPose"], 
    desc: "이기종 로봇과 PLC 간의 물리적 인터페이스를 제어합니다. 정밀한 좌표계 계산(Pose)과 실시간 장비 연동을 가능하게 합니다." 
  },
  { 
    name: "Smart Analytics", 
    nodes: ["Aritmetic", "Matrix", "Numeric", "Onnx"], 
    desc: "고도화된 수치 연산 및 AI 모델 추론을 수행합니다. 딥러닝 기반의 분석 결과를 워크플로우에 직접 통합하여 지능형 제어를 실현합니다." 
  },
  { 
    name: "Storage & Custom", 
    nodes: ["DB", "List", "UserDefined"], 
    desc: "데이터 영속성을 위한 저장소 연동 및 사용자만의 고유한 로직을 확장합니다. 시스템의 범용성을 극대화하는 유연한 설계를 제공합니다." 
  }
];

const strengths = [
  { icon: Layers, title: "비주얼 프로그래밍", desc: "노드 기반 편집기 사용으로 코드 레벨의 직접적인 수정 없이도 현장의 다변화된 요구사항에 맞춘 유연한 로직 구성과 파라미터 최적화가 가능합니다." },
  { icon: BarChart3, title: "정밀 분석", desc: "FineLocalizer와 FineInspector의 검증된 고정밀 분석 기능을 통합하여 제공하며, 장애 발생을 실시간으로 예측합니다." },
  { icon: Shield, title: "로봇 시뮬레이션 기능", desc: "가상 환경에서의 정밀한 로봇 가이던스 시뮬레이션을 통해 리스크를 사전에 방지하고 테스트합니다." },
  { icon: Cpu, title: "멀티 디바이스 통합 관리", desc: "특정 센서 하드웨어나 로봇 시스템과의 연동 기능을 사용자 환경에 맞춰 자유롭게 추가하고 대응할 수 있는 높은 범용성, 현장 안정성을 갖추고 있습니다." },
  { icon: Monitor, title: "유연한 인터페이스 설계", desc: "가변형 화면 구성 기능(GUI 빌더)을 지원하여 현장 작업 환경과 관리 목적에 최적화된 대시보드 및 제어 화면을 직접 구성할 수 있습니다." },
  { icon: Globe, title: "디지털 트윈 기능", desc: "현실 로봇 데이터가 실시간으로 전송되어 3D 가상 공간과 실제 공정이 완벽하게 일치합니다." }
];

const cases = [
  { icon: Factory, title: "스마트 팩토리 공정 자동화", industry: "Manufacturing" },
  { icon: Truck, title: "지능형 물류 분류 시스템", industry: "Logistics" },
  { icon: Flame, title: "에너지 최적화 그리드 관리", industry: "Energy" },
  { icon: Bot, title: "협동 로봇 정밀 협업 제어", industry: "Robotics" },
  { icon: Droplets, title: "수처리 시설 통합 모니터링", industry: "Infrastructure" },
  { icon: FlaskConical, title: "제약 화학 공정 배치 제어", industry: "Pharmaceutical" }
];

// --- 2. 컴포넌트: PLC 노드 비주얼 ---
const PLCNode = ({ title = "Node Title", subTitle = "Category", isMain = false, glow = false }) => (
  <div 
    className="bg-white p-2.5 rounded-[12px] flex flex-col z-10 mx-auto"
    style={{
      width: isMain ? '420px' : '280px',
      boxShadow: glow ? '0px 20px 40px -10px rgba(0, 0, 0, 0.05)' : '0px 8px 24px rgba(0, 0, 0, 0.03)',
      outline: isMain ? '2px #111 solid' : '1px #E5E7EB solid',
      outlineOffset: '-2px',
    }}
  >
    <div className="bg-[#F3F4F6] rounded-[6px] pt-3.5 pb-2 px-3.5 flex flex-col gap-2.5 overflow-hidden text-left">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-[#6B7280] text-[10px] font-semibold tracking-wider uppercase leading-none mb-1">{subTitle}</div>
          <div className={`text-[#111827] font-bold leading-tight ${isMain ? 'text-[18px]' : 'text-[14px]'}`}>{title}</div>
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
        <div className="flex items-center gap-1 text-[#9CA3AF] text-[10px] font-normal tracking-tight">
          0.142s <Clock size={12} />
        </div>
      </div>
    </div>
    <div className="pt-3 pb-1.5 flex flex-col gap-2">
      {[1, 2].map((_, idx) => (
        <div key={idx} className="relative flex justify-between items-center gap-3 px-2">
          <div className="flex-1 h-[36px] bg-white border border-dashed border-[#E5E7EB] rounded-[6px]" />
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] py-1 px-2.5 flex flex-col items-end">
            <span className="text-[#9CA3AF] text-[8px] font-normal mb-0.5">Nullable</span>
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

// --- 3. 컴포넌트: 섹션 제목 ---
const SectionTitle = ({ tag, title }) => (
  <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start">
    <div className="inline-flex items-center py-2 px-4 border border-gray-200 bg-white rounded-full backdrop-blur-md mb-5">
      <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-red-500">{tag}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#0F172A]">{title}</h2>
  </div>
);

// --- 4. 메인 애플리케이션 ---
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [inquiryData, setInquiryData] = useState({ 
    type: '구매문의', processType: '위치보정 (장착/ 조립 등)', company: '', name: '', position: '', phone: '', email: '', message: '', agreed: false
  });
  
  const containerRef = useRef(null);
  const librarySectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: librarySectionRef, offset: ["start start", "end end"] });

  // EmailJS 라이브러리 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => { if (window.emailjs) window.emailjs.init(EMAILJS_PUBLIC_KEY); };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * nodeGroups.length), nodeGroups.length - 1);
    const safeIndex = index < 0 ? 0 : index;
    if (safeIndex !== activeIndex) setActiveIndex(safeIndex);
  });

  const scrollToSection = (id) => {
    const targetId = id === 'applications' ? 'application' : id;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    if (!window.emailjs) { alert("서비스 로드 중입니다."); return; }
    setIsSending(true);

    const templateParams = { ...inquiryData };
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setInquiryData({ type: '구매문의', processType: '위치보정 (장착/ 조립 등)', company: '', name: '', position: '', phone: '', email: '', message: '', agreed: false });
      }, 2500);
    }, (error) => {
      console.error(error);
      setIsSending(false);
      alert("전송에 실패했습니다. 메일로 직접 문의 바랍니다.");
    });
  };

  return (
    <div ref={containerRef} className="w-full bg-[#F8F9FB] relative flex flex-col font-sans selection:bg-red-500 selection:text-white pt-[140px]">
      
      {/* 0. FLOATING HEADER */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] md:w-[584px] h-[60px] z-[100] px-6 py-2 flex items-center gap-x-6 bg-white/40 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all">
        <div onClick={() => scrollToSection('home')} className="flex grow items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-base tracking-tight leading-none text-[#1c1c1c]">CleVis</span>
            <span className="text-[8px] text-red-400 font-bold uppercase tracking-widest mt-0.5">Beta v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[11px] font-semibold text-gray-500 tracking-[0.05em]">
          {['Features', 'Library', 'Applications', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#0F172A] transition-colors cursor-pointer whitespace-nowrap">{item}</button>
          ))}
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-[75vh] relative flex flex-col items-center justify-center p-8 overflow-hidden text-center">
        <div className="container mx-auto max-w-[1280px] flex flex-col items-center z-20">
            <div className="perspective-[2500px] mb-20">
                <PLCNode title="Load 3D data from file" subTitle="Image 3D" isMain={true} glow={true} />
            </div>
            <div className="text-center max-w-5xl px-4 flex flex-col items-center">
                <h1 className="text-4xl md:text-7xl font-bold text-[#0F172A] mb-8 leading-[1.1] tracking-tight">
                    Next-Gen Low-Code Engine for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 px-2">
                        Vision Workflows
                    </span>
                </h1>
                <p className="text-gray-500 font-normal text-base md:text-xl leading-relaxed max-w-3xl mx-auto opacity-90 text-center">
                    복잡한 산업용 비전 로직을 시각적인 워크플로우로 구현하고 <br className="hidden md:block" />
                    실시간 지능형 공정 제어를 실현하세요.
                </p>
            </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-32 bg-white relative z-10 px-8">
        <div className="container mx-auto max-w-[1280px]">
          <SectionTitle tag="Core strengths" title="산업 현장을 혁신하는 지능형 기술" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
            {strengths.map((s, i) => (
              <div key={i} className="p-10 rounded-3xl border border-gray-100 bg-[#F9FAFB] shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-400 group-hover:text-white transition-colors"><s.icon size={26} /></div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL LIBRARY SECTION (GROUP 뱃지 삭제됨) */}
      <section id="library" ref={librarySectionRef} className="relative bg-[#F3F4F6]" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <div className="h-[600vh] w-full relative">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20">
            <div className="container mx-auto max-w-[1280px] flex flex-col lg:flex-row items-center relative h-full">
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-0 text-left">
                    <div className="inline-flex w-fit items-center py-2 px-4 border border-gray-200 bg-white rounded-full backdrop-blur-md mb-5 shadow-none">
                        <span className="text-[12px] font-semibold uppercase text-red-400">Continuing to update</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A]">Advanced Node Library</h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-4 pr-12 font-normal opacity-80">25개 이상의 산업 특화 노드 카테고리를 통해 공정의 모든 과정을 시각적으로 완벽하게 구현할 수 있습니다.</p>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -40 }} transition={{ type: "spring", stiffness: 100, damping: 25 }} className="relative z-10 mb-12">
                             <PLCNode title={nodeGroups[activeIndex].nodes[0]} subTitle={nodeGroups[activeIndex].name.toUpperCase()} isMain={true} glow={true} />
                        </motion.div>
                    </AnimatePresence>
                    <div className="w-full max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
                        <AnimatePresence mode="wait">
                        <motion.div key={activeIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                            {/* GROUP 뱃지가 여기에서 삭제되었습니다 */}
                            <h4 className="text-[#0F172A] text-2xl md:text-4xl font-bold mb-5 tracking-tight leading-none">{nodeGroups[activeIndex].name}</h4>
                            <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-normal max-w-lg mb-8">{nodeGroups[activeIndex].desc}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                                {nodeGroups[activeIndex].nodes.map((tag, tIdx) => (
                                    <span key={tIdx} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-semibold text-red-400 shadow-sm">{tag}</span>
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
      <section id="application" className="min-h-screen flex flex-col justify-center py-32 bg-white relative z-10 px-8 text-center">
        <div className="container mx-auto max-w-[1280px]">
            <SectionTitle tag="Industrial applications" title="산업분야별 혁신적인 적용 사례" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
                {cases.map((c, i) => (
                <div key={i} className="group cursor-pointer text-center">
                    <div className="aspect-video rounded-3xl bg-[#F9FAFB] mb-6 overflow-hidden relative shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 group-hover:scale-110 transition-transform duration-700">
                            <c.icon size={50} className="text-red-200 group-hover:text-red-400 transition-colors" />
                        </div>
                        <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur shadow-md rounded-xl text-xs font-bold uppercase text-red-400 tracking-widest font-sans">{c.industry}</div>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-[#0F172A] group-hover:text-red-500 transition-colors flex items-center gap-2.5 px-2 justify-center">
                        {c.title}<ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </h3>
                </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="min-h-[80vh] flex flex-col justify-center items-center py-24 bg-white relative overflow-hidden border-t border-gray-100 px-8">
        <div className="container mx-auto max-w-[1280px] text-center">
          <SectionTitle tag="Contact" title="클레비스 문의하기" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto text-left">
            <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-start p-10 bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:border-gray-200 group text-left cursor-pointer h-full relative">
              <h4 className="text-xl font-bold text-[#111827] mb-2 tracking-tight">지원</h4>
              <p className="text-[#6B7280] text-[15px] font-normal leading-relaxed mb-10 pr-4">클레비스에 관한 답변과 기술적인 도움을 드려요. <br/>전문팀이 신속하게 응대해 드립니다.</p>
              <div className="mt-auto flex items-center gap-2 text-red-500 font-semibold text-[13px] uppercase tracking-widest font-sans transition-none">
                상세 문의하기 <ArrowUpRight size={16} />
              </div>
            </div>
            <div onClick={copyEmail} className="flex flex-col items-start p-10 bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:border-gray-200 group text-left cursor-pointer h-full relative overflow-hidden">
              <h4 className="text-xl font-bold text-[#111827] mb-2 tracking-tight">기타문의</h4>
              <p className="text-[#6B7280] text-[15px] font-normal leading-relaxed mb-10 pr-4">다른 궁금한 점이 있으신가요? <br/>메일 주소를 복사하여 직접 문의를 남겨주세요.</p>
              <div className="mt-auto flex items-center gap-3 px-5 py-3 bg-[#F9FAFB] rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors w-full justify-between">
                <span className="text-[#111827] font-semibold text-sm">hello@clerobotics.com</span>
                <Copy className="text-gray-400 transition-colors group-hover:text-[#111827]" size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Toast */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 50, x: "-50%" }} className="fixed bottom-12 left-1/2 z-[300] bg-[#0F172A] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="text-[14px] font-semibold tracking-tight font-sans">이메일 주소가 클립보드에 복사되었습니다.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INQUIRY MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-2xl rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={40} /></div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-sans">문의가 접수되었습니다</h3>
                  <p className="text-gray-500 font-sans text-center font-normal">담당자가 신속히 연락드리겠습니다.</p>
                </div>
              ) : (
                <div className="text-left font-sans">
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#0F172A] cursor-pointer"><X size={24} /></button>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-sans text-left">상세 문의 접수</h3>
                  <p className="text-gray-500 mb-8 font-normal font-sans text-sm text-left opacity-80">고객님의 환경에 최적화된 솔루션을 제안해 드립니다.</p>
                  <form onSubmit={handleInquirySubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">문의 유형</label>
                        <select value={inquiryData.type} onChange={(e) => setInquiryData({...inquiryData, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium text-gray-700 cursor-pointer">
                          <option>구매문의</option><option>기술지원</option><option>기타문의</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">공정 유형</label>
                        <select value={inquiryData.processType} onChange={(e) => setInquiryData({...inquiryData, processType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium text-gray-700 cursor-pointer">
                          <option>위치보정 (장착/ 조립 등)</option><option>물류 효율화를 위한 랜덤 팔레타이징(적재)</option><option>제품 조립 품질 향상을 위한 갭/단차 검사</option><option>제품 외관 품질검사를 위한 표면 검사</option><option>기타</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">회사명 / 지역</label>
                        <input type="text" required placeholder="예: 클레로보틱스 / 서울" value={inquiryData.company} onChange={(e) => setInquiryData({...inquiryData, company: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal shadow-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">성명</label>
                        <input type="text" required placeholder="성명을 입력해 주세요" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal shadow-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">직급</label>
                        <input type="text" required placeholder="예: 팀장" value={inquiryData.position} onChange={(e) => setInquiryData({...inquiryData, position: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal shadow-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">연락처</label>
                        <input type="tel" required placeholder="010-0000-0000" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal shadow-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">회신 받을 이메일 주소</label>
                      <input type="email" required placeholder="example@email.com" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal shadow-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-semibold text-[#0F172A] opacity-70 tracking-wide">문의 내용</label>
                      <textarea maxLength={1000} rows={4} required placeholder="구체적인 문의 내용을 작성해 주세요." value={inquiryData.message} onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-normal resize-none h-32" />
                    </div>
                    <div className="flex items-center gap-3 py-1 text-left">
                      <input type="checkbox" id="privacy-agree" checked={inquiryData.agreed} onChange={(e) => setInquiryData({...inquiryData, agreed: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400 cursor-pointer" />
                      <label htmlFor="privacy-agree" className="text-[12px] font-normal text-gray-600 cursor-pointer select-none">개인정보 수집 및 이용에 동의합니다.</label>
                    </div>
                    <button type="submit" disabled={!inquiryData.agreed || isSending} className={`w-full py-4 rounded-xl font-semibold transition-all text-white font-sans ${inquiryData.agreed && !isSending ? 'bg-[#1c1c1c] hover:bg-black cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}>
                      {isSending ? "전송 중..." : "문의하기"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 py-20 px-10 md:px-20 font-sans text-gray-500 text-[14px] leading-relaxed relative z-10 text-left">
        <div className="container mx-auto max-w-[1280px]">
          <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group mb-10">
            <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"><Zap className="text-white" size={20} fill="currentColor" /></div>
            <span className="font-semibold text-2xl tracking-tight text-gray-700 font-sans">CleVis</span>
          </div>
          <div className="mb-14 text-[13px]">
            <div className="font-bold mb-4 text-gray-700 uppercase tracking-wide font-sans text-left">클레로보틱스 주식회사</div>
            <div className="space-y-3 font-sans">
              <div className="flex flex-wrap gap-x-6 items-center">
                <span><strong>사업자등록번호</strong> 157-86-02249</span><span className="opacity-30 text-gray-300">|</span><span><strong>이메일</strong> hello@clerobotics.com</span>
              </div>
              <div className="pt-4 grid gap-3 text-left">
                <p><strong>본사 (기술연구소)</strong> 04778 서울 성동구 왕십리로 58, 511호-514호, 517호 <span className="mx-3 opacity-30 text-gray-300">|</span> <strong>전화</strong> 02-468-1114</p>
                <p><strong>시스템연구소 (데모/전시)</strong> 15847 경기 군포시 공단로 117, 1층 <span className="mx-3 opacity-30 text-gray-300">|</span> <strong>전화</strong> 031-427-0314</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-10 text-sm opacity-70 font-sans text-left">Copyright ⓒ 클레로보틱스 주식회사. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}