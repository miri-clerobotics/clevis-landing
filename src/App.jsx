import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Zap, Play, Clock, ChevronRight, Mail, ArrowUpRight, 
  Shield, Layers, BarChart3, Smartphone, Globe, Factory, 
  Truck, Flame, Bot, Droplets, FlaskConical
} from 'lucide-react';

// --- 산업용 PLC 노드 컴포넌트 ---
const PLCNode = ({ title = "Load 3D data from file", subTitle = "Image 3D", isMain = false, glow = false }) => {
  return (
    <motion.div 
      whileHover={isMain ? { scale: 1.02, y: -5, transition: { duration: 0.2 } } : {}}
      style={{
        width: isMain ? '420px' : '280px',
        padding: '10px',
        background: 'white',
        boxShadow: glow 
          ? '0px 20px 40px -10px rgba(248, 113, 113, 0.15), 0px 0px 15px rgba(248, 113, 113, 0.08)' 
          : '0px 8px 24px rgba(28, 28, 28, 0.05)',
        borderRadius: '12px',
        outline: isMain ? '2px #111111 solid' : '1px #E5E7EB solid',
        outlineOffset: '-2px',
        flexDirection: 'column',
        display: 'inline-flex',
        zIndex: isMain ? 50 : 10,
      }}
    >
      <div style={{ alignSelf: 'stretch', paddingTop: '14px', paddingBottom: '8px', background: '#F3F4F6', overflow: 'hidden', borderRadius: '6px', flexDirection: 'column', display: 'flex', gap: '10px' }}>
        <div style={{ alignSelf: 'stretch', paddingLeft: '14px', paddingRight: '14px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ flex: '1 1 0', flexDirection: 'column', display: 'inline-flex' }}>
            <div style={{ color: '#6B7280', fontSize: '12px', fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '16px', letterSpacing: '0.05em' }}>{subTitle}</div>
            <div style={{ alignSelf: 'stretch', color: '#111827', fontSize: isMain ? '20px' : '16px', fontFamily: 'Pretendard', fontWeight: '800', lineHeight: '26px' }}>{title}</div>
          </div>
          <div style={{ width: '54px', height: '36px', background: 'white', border: '1.5px #616161 solid', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <Play size={20} color={isMain ? "#111" : "#616161"} />
          </div>
        </div>
        <div style={{ alignSelf: 'stretch', paddingLeft: '14px', paddingRight: '14px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ height: '22px', padding: '1px 10px', background: 'white', borderRadius: '100px', border: '1px #E5E7EB solid', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <div style={{ color: '#4B5563', fontSize: '11px', fontFamily: 'Pretendard', fontWeight: '600' }}>LS electric</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '12px', fontFamily: 'Pretendard', fontWeight: '500' }}>0.142s</div>
            <Clock size={14} color="#9CA3AF" />
          </div>
        </div>
      </div>
      <div style={{ alignSelf: 'stretch', paddingTop: '12px', paddingBottom: '6px', flexDirection: 'column', display: 'flex', gap: '8px' }}>
        {[
          { label: "Executed flow port", type: "Nullable <Boolean>", active: true },
          { label: "Error flow port", type: "Nullable <Boolean>", active: false }
        ].map((port, idx) => (
          <div key={idx} style={{ position: 'relative', justifyContent: 'space-between', alignItems: 'center', display: 'flex', gap: '14px', padding: '0 10px' }}>
            <div style={{ flex: 1.1, height: '40px', background: '#FFFFFF', border: '1px dashed #E5E7EB', borderRadius: '6px' }} />
            <div style={{ flex: 1, padding: '4px 12px', background: '#F9FAFB', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 'medium' }}>{port.type}</span>
              <span style={{ fontSize: '13px', color: '#374151', fontWeight: '600' }}>{port.label}</span>
            </div>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              background: 'white', 
              borderRadius: '50%', 
              border: `1.5px #666666 solid`, 
              position: 'absolute',
              right: '-15px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}>
                {port.active && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-40" />}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- 공통 섹션 제목 컴포넌트 ---
const SectionTitle = ({ tag, title, light = false }) => (
  <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`inline-flex items-center py-2 px-4 border rounded-full backdrop-blur-md shadow-inner mb-5 ${light ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'}`}
    >
      <span className={`text-[13px] font-sans font-bold tracking-[0.05em] uppercase ${light ? 'text-red-300' : 'text-red-400'}`}>
        {tag}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-3xl md:text-4xl font-semibold tracking-tight leading-tight font-sans ${light ? 'text-white' : 'text-[#0F172A]'}`}
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [nodes, setNodes] = useState([]);
  const containerRef = useRef(null);
  const librarySectionRef = useRef(null);

  // 브라우저 메인 스크롤 추적
  const { scrollYProgress } = useScroll({
    target: librarySectionRef,
    offset: ["start start", "end end"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const addNode = () => {
      const newNode = {
        id: Math.random(),
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        title: `Remote_IO_${Math.floor(Math.random() * 99)}`,
        scale: 0.7 + Math.random() * 0.2
      };
      setNodes(prev => [...prev.slice(-4), newNode]);
    };
    const interval = setInterval(addNode, 4000);
    addNode();
    return () => clearInterval(interval);
  }, []);

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

  // 메인 스크롤 진행도에 따른 활성 그룹 인덱스 계산
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", v => {
      const index = Math.min(Math.floor(v * nodeGroups.length), nodeGroups.length - 1);
      setActiveIndex(index < 0 ? 0 : index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, nodeGroups.length]);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full bg-[#F8F9FB] relative flex flex-col font-sans selection:bg-red-500 selection:text-white pt-[84px]">
      
      {/* 상단 내비게이션 바 */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-5 flex justify-between items-center bg-white/30 backdrop-blur-lg border-b border-white/20 font-sans">
        <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group transition-all">
          <div className="w-10 h-10 group-hover:scale-105 transition-transform">
            <img 
              src="/my-logo.svg" 
              alt="CleVis Logo" 
              className="w-full h-full object-contain shadow-sm rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-[#0F172A] rounded-xl items-center justify-center">
              <Zap className="text-white" size={20} fill="currentColor" />
            </div>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight block leading-none text-[#1c1c1c]">CleVis</span>
            <span className="text-[10px] font-sans text-red-400 font-bold uppercase tracking-widest mt-1 block">Beta v1.0</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[12px] font-bold text-gray-500 tracking-[0.05em]">
          <button onClick={() => scrollToSection('features')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Features</button>
          <button onClick={() => scrollToSection('library')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Node</button>
          <button onClick={() => scrollToSection('application')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Application</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Contact</button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="h-[calc(100vh-84px)] relative flex flex-col overflow-hidden">
        <motion.div style={{ x: translateX, y: translateY, backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)` }} className="absolute inset-[-10%] pointer-events-none opacity-30 z-0 bg-[length:50px_50px]" />
        <main className="flex-1 relative flex flex-col items-center justify-center p-8">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <AnimatePresence>
              {nodes.map(node => (
                <motion.line key={`line-${node.id}`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke="rgba(248, 113, 113, 0.15)" strokeWidth="1.5" strokeDasharray="8 8" />
              ))}
            </AnimatePresence>
          </svg>

          <AnimatePresence>
            {nodes.map(node => (
              <motion.div key={node.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.35, scale: node.scale, y: [0, -20, 0] }} transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }} exit={{ opacity: 0 }} className="absolute pointer-events-none" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                <PLCNode title={node.title} subTitle="FIELD_BUS" />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="relative z-20 perspective-[2500px]">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} animate={{ y: [0, -15, 0] }} transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotateX: { type: "spring", stiffness: 100 }, rotateY: { type: "spring", stiffness: 100 } }}>
              <motion.div style={{ scale: useTransform(smoothY, [-0.5, 0.5], [1.1, 0.9]), opacity: useTransform(smoothY, [-0.5, 0.5], [0.15, 0.05]) }} className="absolute inset-0 blur-3xl bg-black translate-y-20 rounded-full -z-10" />
              <PLCNode isMain={true} glow={true} />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-6 -right-6 bg-[#0F172A] text-white px-4 py-2 rounded-xl text-[11px] font-black flex items-center gap-2 shadow-2xl border border-white/10">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                IO: LIVE
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-24 text-center z-30 max-w-4xl px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#0F172A] mb-8 leading-[1.1]">CleVis <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-sans">Workflow Engine</span></h1>
              <p className="text-gray-500 font-semibold text-sm md:text-xl leading-relaxed max-w-3xl mx-auto mb-12 opacity-90 font-sans">산업용 로직을 3D 토폴로지로 실시간 관리하고 지능적으로 모니터링 하세요. <br className="hidden md:block" />복잡한 산업 공정을 하나의 직관적이고 유연한 워크플로우로 통합합니다.</p>
              <div className="flex justify-center">
                <button onClick={() => scrollToSection('features')} className="group relative overflow-hidden bg-[#1c1c1c] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all hover:shadow-red-500/25 active:scale-95 text-base">
                  <span className="relative z-10 uppercase tracking-widest">Launch Flow Editor</span>
                  <ChevronRight size={22} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-32 bg-white font-sans relative z-10">
        <div className="container mx-auto px-6 md:px-16">
          <SectionTitle tag="Core strengths" title="산업 현장을 혁신하는 지능형 기술" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
            {strengths.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-10 rounded-3xl border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <s.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4 font-sans">{s.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-sans">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL LIBRARY SECTION (CSS 레이아웃 완벽 고정 버전) */}
      <section 
        id="library" 
        ref={librarySectionRef} 
        className="relative bg-[#F3F4F6] font-sans"
        style={{ clipPath: 'inset(0 0 0 0)' }} 
      >
        <div className="h-[600vh] w-full relative">
          <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden z-20">
            
            {/* 좌측: 고정 정보 섹션 */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-12 md:px-24 bg-white border-r border-gray-100">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <SectionTitle tag="Continuing to update" title="Advanced Node Library" />
                <p className="text-gray-600 text-lg md:text-2xl leading-relaxed max-w-xl font-sans mt-4">
                  23종 이상의 정밀 산업 노드를 통해 복잡한 공정도 시각적으로 구현하고 즉각적으로 가동할 수 있습니다.
                </p>
              </motion.div>
            </div>

            {/* 우측: 가변 섹션 */}
            <div className="w-full lg:w-1/2 h-full relative flex flex-col items-center justify-center p-12 bg-gray-50/50">
              <div className="absolute inset-0 bg-[#F3F4F6] opacity-30 z-0" />
              
              <div className="relative w-full h-[55%] flex items-center justify-center perspective-[2000px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15, x: 40 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -15, x: -40 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25 }}
                    className="relative z-10"
                  >
                    <div className="relative transform-style-3d">
                      <div className="absolute inset-0 blur-3xl bg-red-400/20 rounded-full translate-y-12 scale-125 -z-10" />
                      <PLCNode 
                        isMain={true} 
                        glow={true} 
                        title={nodeGroups[activeIndex].nodes[0]} 
                        subTitle={nodeGroups[activeIndex].name.toUpperCase()} 
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full max-w-xl h-[35%] mt-12 relative">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center md:text-left flex flex-col items-center md:items-start px-4"
                  >
                    <div className="inline-flex items-center bg-red-400/10 border border-red-400/20 rounded-lg px-5 py-2 mb-5">
                      <span className="text-red-500 text-sm font-black uppercase tracking-[0.15em]">
                        Group {activeIndex + 1}
                      </span>
                    </div>
                    <h4 className="text-[#0F172A] text-2xl md:text-4xl font-extrabold mb-5 tracking-tight">
                      {nodeGroups[activeIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm md:text-xl leading-relaxed font-medium max-w-lg">
                      {nodeGroups[activeIndex].desc}
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-8">
                      {nodeGroups[activeIndex].nodes.map((tag, tIdx) => (
                         <span key={tIdx} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-red-400 shadow-sm">
                           {tag}
                         </span>
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
      <section id="application" className="min-h-screen flex flex-col justify-center py-32 bg-white font-sans relative z-10">
        <div className="container mx-auto px-8 md:px-20">
          <SectionTitle tag="Industrial applications" title="산업분야별 혁신적인 적용 사례" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {cases.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group cursor-pointer">
                <div className="aspect-video rounded-3xl bg-[#F9FAFB] mb-6 overflow-hidden relative shadow-md border border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 group-hover:scale-110 transition-transform duration-700">
                    <c.icon size={50} className="text-red-200 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur shadow-md rounded-xl text-xs font-black uppercase text-red-400 tracking-widest font-sans">{c.industry}</div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#0F172A] group-hover:text-red-500 transition-colors flex items-center gap-2.5 px-2 font-sans">
                  {c.title}
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-[-4px] group-hover:translate-x-0 group-hover:translate-y-0" />
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="min-h-[60vh] flex flex-col justify-center items-center py-20 bg-white relative overflow-hidden font-sans border-t border-gray-100">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-400/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle tag="Onboarding" title="클레비스와 함께 스마트 팩토리를 시작하세요" />
            <p className="text-base md:text-lg text-gray-500 font-medium mb-12 leading-relaxed max-w-2xl mx-auto font-sans -mt-6">최고의 기술 지원팀이 귀사의 현장에 가장 최적화된 워크플로우 도입을 완벽하게 지원합니다.</p>
            <div className="grid grid-cols-1 max-w-lg mx-auto">
              <button className="flex flex-col items-center justify-center p-10 bg-white rounded-[32px] shadow-2xl border border-gray-100 hover:shadow-red-400/15 transition-all group font-sans">
                <Mail className="mb-4 text-red-400 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-bold text-lg md:text-xl text-[#0F172A]">지금 바로 상담 요청하기</h4>
                <p className="text-xs md:text-sm text-gray-400 mt-2 font-medium">영업일 기준 24시간 이내에 전문가가 연락드립니다.</p>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 통합 푸터 섹션 */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 py-20 px-10 md:px-20 font-sans text-gray-500 text-[14px] leading-relaxed relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-10">
            <div onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer group">
              <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Zap className="text-white" size={20} fill="currentColor" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-700">CleVis</span>
            </div>
          </div>

          <div className="mb-14">
            <div className="font-bold text-[15px] mb-6 text-gray-700 uppercase tracking-wide">클레로보틱스 주식회사</div>
            <div className="space-y-3 text-gray-500">
              <div className="flex flex-wrap gap-x-6 items-center">
                <span><strong className="font-bold">사업자등록번호</strong> 157-86-02249</span>
                <span className="opacity-30 text-gray-300">|</span>
                <span><strong className="font-bold">이메일</strong> hello@clerobotics.com</span>
              </div>
              
              <div className="pt-4 grid gap-3">
                <p>
                  <strong className="font-bold">본사 (기술연구소)</strong> 04778 서울 성동구 왕십리로 58, 511호-514호, 517호 <span className="mx-3 opacity-30 text-gray-300">|</span> 
                  <strong className="font-bold">전화</strong> 02-468-1114 <span className="mx-3 opacity-30 text-gray-300">|</span> 
                  <strong className="font-bold">팩스</strong> 02-2284-0135
                </p>
                <p>
                  <strong className="font-bold">시스템연구소 (데모/전시)</strong> 15847 경기 군포시 공단로 117, 1층 <span className="mx-3 opacity-30 text-gray-300">|</span> 
                  <strong className="font-bold">전화</strong> 031-427-0314 <span className="mx-3 opacity-30 text-gray-300">|</span> 
                  <strong className="font-bold">팩스</strong> 031-427-0315
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm opacity-70">
              Copyright ⓒ 클레로보틱스 주식회사. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}