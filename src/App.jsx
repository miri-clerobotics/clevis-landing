import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Zap, Play, Clock, ChevronRight, Mail, ArrowUpRight, 
  Shield, Layers, BarChart3, Smartphone, Globe, Factory, 
  Truck, Flame, Bot, Droplets, FlaskConical, X, CheckCircle2,
  Copy, Check
} from 'lucide-react';

// --- 전역 데이터 정의 ---
const strengths = [
  { icon: Zap, title: "실시간 동기화", desc: "분산된 노드 간 데이터 지연 시간을 2ms 미만으로 유지하여 실시간 공정 제어를 실현합니다." },
  { icon: Shield, title: "로봇 시뮬레이션 기능", desc: "가상 환경에서의 정밀한 로봇 가이던스 시뮬레이션을 통해 리스크를 사전에 방지합니다." },
  { icon: Layers, title: "무한 확장성", desc: "단일 워크플로우 내에서 수만 개의 노드를 지연 없이 관리하는 독보적인 아키텍처를 제공합니다." },
  { icon: Globe, title: "디지털 트윈 기능", desc: "현실 로봇 데이터가 실시간으로 전송되어 3D 가상 공간과 실제 공정이 완벽하게 일치합니다." },
  { icon: BarChart3, title: "정밀 분석", desc: "고도화된 데이터 흐름 분석을 통해 장비 가동률 향상 및 장애 발생을 실시간으로 예측합니다." },
  { icon: Smartphone, title: "원격 최적화", desc: "장소에 구애받지 않는 웹 기반 인터페이스로 실시간 현장 모니터링 및 로직 최적화가 가능합니다." }
];

const nodeGroups = [
  { name: "Logic & Control", nodes: ["AND/OR Gate", "Timer (On/Off)", "Counter", "Latch Relays"], desc: "공정의 흐름을 지능적으로 제어하는 핵심 논리 소자입니다. 조건부 동작과 시퀀스 제어의 기초가 됩니다." },
  { name: "Math Functions", nodes: ["Arithmetic", "Scaling Node", "Average Filter", "Comparator"], desc: "정밀한 실시간 데이터 수치 연산 및 센서 데이터의 스케일링을 수행합니다. 복잡한 수식을 노드로 연결하여 계산합니다." },
  { name: "Communication Hub", nodes: ["Modbus TCP/RTU", "MQTT Client", "EtherNet/IP", "REST WebHook"], desc: "이기종 장비 및 상위 시스템과의 완벽한 데이터 연동을 지원합니다. 클라우드와 현장을 잇는 가교 역할을 합니다." },
  { name: "Sensor Processing", nodes: ["Temperature AI", "Pressure Input", "Flow Velocity", "Computer Vision"], desc: "현장의 복잡한 아날로그 신호를 정밀한 디지털 값으로 변환합니다. 인공지능 기반의 시각 판단 데이터를 처리합니다." },
  { name: "Actuators & Drive", nodes: ["Servo Drive Pos", "Solenoid Valve", "VFD Speed Control"], desc: "정의된 로직에 따라 물리적 장비를 정밀하게 구동합니다. 위치 제어 및 속도 제어를 워크플로우에서 직접 관리합니다." },
  { name: "AI Analytics", nodes: ["Anomaly Detection", "Trend Forecasting", "Edge OCR"], desc: "엣지 단에서 지능형 판단을 내리는 강력한 인공지능 노드입니다. 고장 예지 및 패턴 인식을 수행하여 가동 중단을 미연에 방지합니다." }
];

const cases = [
  { icon: Factory, title: "스마트 팩토리 공정 자동화", industry: "Manufacturing" },
  { icon: Truck, title: "지능형 물류 분류 시스템", industry: "Logistics" },
  { icon: Flame, title: "에너지 최적화 그리드 관리", industry: "Energy" },
  { icon: Bot, title: "협동 로봇 정밀 협업 제어", industry: "Robotics" },
  { icon: Droplets, title: "수처리 시설 통합 모니터링", industry: "Infrastructure" },
  { icon: FlaskConical, title: "제약 화학 공정 배치 제어", industry: "Pharmaceutical" }
];

// --- 컴포넌트: PLC 노드 (시각적 요소) ---
const PLCNode = ({ title = "Load 3D data from file", subTitle = "Image 3D", isMain = false, glow = false }) => (
  <motion.div 
    whileHover={isMain ? { scale: 1.02, y: -5, transition: { duration: 0.2 } } : {}}
    className="bg-white p-2.5 rounded-[12px] flex flex-col z-10"
    style={{
      width: isMain ? '420px' : '280px',
      boxShadow: glow 
        ? '0px 20px 40px -10px rgba(248, 113, 113, 0.15), 0px 0px 15px rgba(248, 113, 113, 0.08)' 
        : '0px 8px 24px rgba(28, 28, 28, 0.05)',
      outline: isMain ? '2px #111111 solid' : '1px #E5E7EB solid',
      outlineOffset: '-2px',
    }}
  >
    <div className="bg-[#F3F4F6] rounded-[6px] pt-3.5 pb-2 px-3.5 flex flex-col gap-2.5 overflow-hidden text-left">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-[#6B7280] text-[10px] font-bold tracking-wider uppercase leading-none mb-1">{subTitle}</div>
          <div className={`text-[#111827] font-black leading-tight ${isMain ? 'text-[18px]' : 'text-[14px]'}`}>{title}</div>
        </div>
        <div className="w-[40px] h-[32px] bg-white border-[1.5px] border-[#616161] rounded-[6px] flex items-center justify-center shrink-0">
           <Play size={16} color={isMain ? "#111" : "#616161"} fill="currentColor" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="bg-white border border-[#E5E7EB] rounded-full px-2 py-0.5 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
          <div className="text-[#4B5563] text-[9px] font-bold uppercase tracking-tighter">LS electric</div>
        </div>
        <div className="flex items-center gap-1 text-[#9CA3AF]">
          <span className="text-[10px] font-medium tracking-tight">0.142s</span>
          <Clock size={12} />
        </div>
      </div>
    </div>
    <div className="pt-3 pb-1.5 flex flex-col gap-2">
      {[
        { label: "Executed flow port", type: "Nullable <Boolean>", active: true },
        { label: "Error flow port", type: "Nullable <Boolean>", active: false }
      ].map((port, idx) => (
        <div key={idx} className="relative flex justify-between items-center gap-3 px-2">
          <div className="flex-1 h-[36px] bg-white border border-dashed border-[#E5E7EB] rounded-[6px]" />
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] py-1 px-2.5 flex flex-col items-end">
            <span className="text-[#9CA3AF] text-[8px] font-medium leading-none mb-0.5">{port.type}</span>
            <span className="text-[#374151] text-[11px] font-bold leading-none">{port.label}</span>
          </div>
          <div className="w-3 h-3 bg-white rounded-full border-[1.5px] border-[#666] absolute right-[-14px] top-1/2 -translate-y-1/2 z-20">
              {port.active && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-40" />}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- 컴포넌트: 섹션 제목 ---
const SectionTitle = ({ tag, title, light = false }) => (
  <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center py-2 px-4 border rounded-full backdrop-blur-md shadow-inner mb-5 ${light ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'}`}
    >
      <span className={`text-[12px] font-bold tracking-[0.05em] uppercase ${light ? 'text-red-300' : 'text-red-400'}`}>
        {tag}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight ${light ? 'text-white' : 'text-[#0F172A]'}`}
    >
      {title}
    </motion.h2>
  </div>
);

// --- 메인 애플리케이션 ---
export default function App() {
  const [bgNodes, setBgNodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [inquiryData, setInquiryData] = useState({ 
    type: '구매문의', processType: '위치보정 (장착/ 조립 등)', company: '', name: '', position: '', phone: '', email: '', message: '', agreed: false
  });
  
  const containerRef = useRef(null);
  const librarySectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: librarySectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * nodeGroups.length), nodeGroups.length - 1);
    const safeIndex = index < 0 ? 0 : index;
    if (safeIndex !== activeIndex) setActiveIndex(safeIndex);
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
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
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryData.agreed) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setInquiryData({ type: '구매문의', processType: '위치보정 (장착/ 조립 등)', company: '', name: '', position: '', phone: '', email: '', message: '', agreed: false });
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newNode = { id: Math.random(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, title: `Remote_Node_${Math.floor(Math.random() * 99)}`, scale: 0.6 + Math.random() * 0.3 };
      setBgNodes(prev => [...prev.slice(-3), newNode]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full bg-[#F8F9FB] relative flex flex-col font-sans selection:bg-red-500 selection:text-white pt-[140px]">
      
      {/* 0. FLOATING HEADER */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[900px] z-[100] px-10 py-4 flex justify-between items-center bg-white/40 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all">
        <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group">
          <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="text-white" size={20} fill="currentColor" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-xl tracking-tight block leading-none text-[#1c1c1c]">CleVis</span>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 block">Beta v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-6 md:gap-10 text-[12px] font-bold text-gray-500 tracking-[0.05em]">
          {['Features', 'Library', 'Application', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#0F172A] transition-colors uppercase cursor-pointer whitespace-nowrap">{item}</button>
          ))}
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-[70vh] relative flex flex-col overflow-hidden">
        <motion.div style={{ x: translateX, y: translateY, backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)` }} className="absolute inset-[-10%] pointer-events-none opacity-30 z-0 bg-[length:50px_50px]" />
        <main className="flex-1 relative flex flex-col items-center justify-center p-8 mt-[-60px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <AnimatePresence>
              {bgNodes.map(node => (
                <motion.line key={`line-${node.id}`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke="rgba(248, 113, 113, 0.1)" strokeWidth="1" strokeDasharray="8 8" />
              ))}
            </AnimatePresence>
          </svg>
          <div className="relative z-20 perspective-[2500px]">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} animate={{ y: [0, -15, 0] }} transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}>
              <PLCNode title="Load 3D data from file" subTitle="Image 3D" isMain={true} glow={true} />
            </motion.div>
          </div>
          <div className="mt-24 text-center z-30 max-w-4xl px-4">
            <h1 className="text-4xl md:text-7xl font-black text-[#0F172A] mb-8 leading-[1.1] tracking-tight">CleVis <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Workflow Engine</span></h1>
            <p className="text-gray-500 font-medium text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-12 opacity-90 text-center">산업용 로직을 3D 토폴로지로 실시간 관리하고 지능적으로 모니터링 하세요.</p>
            {/* Launch Flow Editor 버튼이 삭제되었습니다 */}
          </div>
        </main>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-32 bg-white font-sans relative z-10">
        <div className="container mx-auto px-6 md:px-16">
          <SectionTitle tag="Core strengths" title="산업 현장을 혁신하는 지능형 기술" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {strengths.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 rounded-3xl border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <s.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4">{s.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL LIBRARY SECTION */}
      <section id="library" ref={librarySectionRef} className="relative bg-[#F3F4F6]" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <div className="h-[600vh] w-full relative">
          <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden z-20">
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-12 md:px-24 bg-white border-r border-gray-100">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <SectionTitle tag="Continuing to update" title="Advanced Node Library" />
                <p className="text-gray-600 text-lg md:text-2xl leading-relaxed max-w-xl font-sans mt-4">23종 이상의 정밀 산업 노드를 통해 복잡한 공정도 시각적으로 구현하고 즉각적으로 가동할 수 있습니다.</p>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 h-full relative flex flex-col items-center justify-center p-12 bg-gray-50/50">
              <div className="absolute inset-0 bg-[#F3F4F6] opacity-30 z-0" />
              <div className="relative w-full h-[55%] flex items-center justify-center perspective-[2000px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.9, rotateY: 15, x: 40 }} animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, scale: 0.9, rotateY: -15, x: -40 }} transition={{ type: "spring", stiffness: 100, damping: 25 }} className="relative z-10">
                    <div className="relative transform-style-3d">
                      <div className="absolute inset-0 blur-3xl bg-red-400/20 rounded-full translate-y-12 scale-125 -z-10" />
                      {nodeGroups[activeIndex] && (
                        <PLCNode title={nodeGroups[activeIndex].nodes[0]} subTitle={nodeGroups[activeIndex].name.toUpperCase()} />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="w-full max-w-xl h-[35%] mt-12 relative px-4 text-center md:text-left flex flex-col items-center md:items-start">
                <AnimatePresence mode="wait">
                  <motion.div key={activeIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center bg-red-400/10 border border-red-400/20 rounded-lg px-5 py-2 mb-5">
                      <span className="text-red-500 text-sm font-black uppercase tracking-[0.15em]">Group {activeIndex + 1}</span>
                    </div>
                    <h4 className="text-[#0F172A] text-2xl md:text-4xl font-extrabold mb-5 tracking-tight leading-none">
                        {nodeGroups[activeIndex]?.name || ""}
                    </h4>
                    <p className="text-gray-500 text-sm md:text-xl leading-relaxed font-medium max-w-lg">
                        {nodeGroups[activeIndex]?.desc || ""}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-8">
                      {(nodeGroups[activeIndex]?.nodes || []).map((tag, tIdx) => (
                         <span key={tIdx} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-red-400 shadow-sm">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION SECTION */}
      <section id="application" className="min-h-screen flex flex-col justify-center py-32 bg-white font-sans relative z-10 text-center">
        <div className="container mx-auto px-8 md:px-20">
          <SectionTitle tag="Industrial applications" title="산업분야별 혁신적인 적용 사례" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {cases.map((c, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="aspect-video rounded-3xl bg-[#F9FAFB] mb-6 overflow-hidden relative shadow-md border border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 group-hover:scale-110 transition-transform duration-700">
                    <c.icon size={50} className="text-red-200 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur shadow-md rounded-xl text-xs font-black uppercase text-red-400 tracking-widest font-sans">{c.industry}</div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#0F172A] group-hover:text-red-500 transition-colors flex items-center gap-2.5 px-2 justify-center font-sans">
                  {c.title}<ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="min-h-[80vh] flex flex-col justify-center items-center py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-400/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-8 text-center max-w-6xl relative z-10">
          <SectionTitle tag="Contact" title="클레비스 문의하기" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {/* 카드 1: 지원 (상세 문의) */}
            <motion.button 
              whileHover={{ y: -8, boxShadow: '0 30px 60px -15px rgba(248, 113, 113, 0.12)' }}
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center p-12 bg-white rounded-[48px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100 transition-all group cursor-pointer"
            >
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-red-400 transition-all duration-500">
                <Mail className="text-red-500 group-hover:text-white" size={40} />
              </div>
              <h4 className="font-black text-2xl text-[#0F172A] mb-4 uppercase tracking-tighter font-sans">지원</h4>
              <p className="text-gray-400 font-bold text-lg text-center leading-relaxed font-sans">
                클레비스에 관한 답변과 <br />기술적인 도움을 드려요.
              </p>
              <div className="mt-10 flex items-center gap-2 text-red-500 font-black text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform font-sans">
                상세 문의하기 <ArrowUpRight size={18} />
              </div>
            </motion.button>

            {/* 카드 2: 기타문의 */}
            <motion.button 
              whileHover={{ y: -8, boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.12)' }}
              onClick={copyEmail}
              className="flex flex-col items-center justify-center p-12 bg-white rounded-[48px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#0F172A] transition-all duration-500">
                <Mail className="text-gray-400 group-hover:text-white" size={40} />
              </div>
              <h4 className="font-black text-2xl text-[#0F172A] mb-4 uppercase tracking-tighter font-sans">기타문의</h4>
              <p className="text-gray-400 font-bold text-lg text-center leading-relaxed font-sans">
                다른 문의사항이 있으신가요?
              </p>
              
              <div className="mt-10 flex items-center gap-3 px-6 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-gray-100 transition-colors w-full justify-between max-w-[280px]">
                <span className="text-[#0F172A] font-bold text-sm tracking-tight font-sans">hello@clerobotics.com</span>
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <Check className="text-green-500" size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <Copy className="text-gray-400 group-hover:text-[#0F172A] transition-colors" size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isCopied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 bg-[#0F172A] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg font-sans"
                  >
                    이메일 주소가 복사되었습니다!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </section>

      {/* --- INQUIRY MODAL (비즈니스 상세 항목) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-2xl rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 size={40} /></div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-sans">문의가 접수되었습니다</h3>
                  <p className="text-gray-500 font-sans">작성해주신 정보를 바탕으로 담당자가 신속히 연락드리겠습니다.</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#0F172A] cursor-pointer"><X size={24} /></button>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-sans">상세 문의 접수</h3>
                  <p className="text-gray-500 mb-8 font-medium font-sans text-sm">고객님의 환경에 최적화된 솔루션을 제안해 드립니다.</p>
                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-left font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-[#0F172A] ml-1 uppercase opacity-70">문의 유형</label>
                        <select value={inquiryData.type} onChange={(e) => setInquiryData({...inquiryData, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium text-gray-700 cursor-pointer">
                          <option>구매문의</option><option>기술지원</option><option>기타문의</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-[#0F172A] ml-1 uppercase opacity-70">공정 유형</label>
                        <select value={inquiryData.processType} onChange={(e) => setInquiryData({...inquiryData, processType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium text-gray-700 cursor-pointer">
                          <option>위치보정 (장착/ 조립 등)</option><option>물류 효율화를 위한 랜덤 팔레타이징(적재)</option><option>제품 조립 품질 향상을 위한 갭/단차 검사</option><option>제품 외관 품질검사를 위한 표면 검사</option><option>기타</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" required placeholder="회사명 / 지역" value={inquiryData.company} onChange={(e) => setInquiryData({...inquiryData, company: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium shadow-none" />
                      <input type="text" required placeholder="성명" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium shadow-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" required placeholder="직급" value={inquiryData.position} onChange={(e) => setInquiryData({...inquiryData, position: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium shadow-none" />
                      <input type="tel" required placeholder="연락처 (010-0000-0000)" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium shadow-none" />
                    </div>
                    <input type="email" required placeholder="회신 받을 이메일 주소" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium shadow-none" />
                    <textarea maxLength={1000} rows={4} required placeholder="구체적인 문의 내용을 작성해 주세요." value={inquiryData.message} onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-all text-[13px] font-medium resize-none shadow-none" />
                    <div className="flex items-center gap-3 py-1">
                      <input type="checkbox" id="privacy-agree" checked={inquiryData.agreed} onChange={(e) => setInquiryData({...inquiryData, agreed: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-400 cursor-pointer" />
                      <label htmlFor="privacy-agree" className="text-[12px] font-medium text-gray-600 cursor-pointer select-none">개인정보 수집 및 이용에 동의합니다. (필수)</label>
                    </div>
                    <button type="submit" disabled={!inquiryData.agreed} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg text-white ${inquiryData.agreed ? 'bg-[#1c1c1c] hover:bg-red-500 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}>문의하기</button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 py-20 px-10 md:px-20 font-sans text-gray-500 text-[14px] leading-relaxed relative z-10 text-left">
        <div className="container mx-auto max-w-7xl">
          <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group mb-10">
            <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"><Zap className="text-white" size={20} fill="currentColor" /></div>
            <span className="font-bold text-2xl tracking-tight text-gray-700">CleVis</span>
          </div>
          <div className="mb-14 text-[13px]">
            <div className="font-bold mb-4 text-gray-700 uppercase tracking-wide text-left font-sans">클레로보틱스 주식회사</div>
            <div className="space-y-3 font-sans">
              <div className="flex flex-wrap gap-x-6 items-center">
                <span><strong>사업자등록번호</strong> 157-86-02249</span>
                <span className="opacity-30 text-gray-300">|</span>
                <span><strong>이메일</strong> hello@clerobotics.com</span>
              </div>
              <div className="pt-4 grid gap-3 text-left">
                <p><strong>본사 (기술연구소)</strong> 04778 서울 성동구 왕십리로 58, 511호-514호, 517호 <span className="mx-3 opacity-30 text-gray-300">|</span> <strong>전화</strong> 02-468-1114</p>
                <p><strong>시스템연구소 (데모/전시)</strong> 15847 경기 군포시 공단로 117, 1층 <span className="mx-3 opacity-30 text-gray-300">|</span> <strong>전화</strong> 031-427-0314</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-10 text-sm opacity-70 font-sans">Copyright ⓒ 클레로보틱스 주식회사. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}