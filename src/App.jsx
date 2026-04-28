import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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
        width: isMain ? '380px' : '260px',
        padding: '8px',
        background: 'white',
        boxShadow: glow 
          ? '0px 20px 40px -10px rgba(248, 113, 113, 0.15), 0px 0px 15px rgba(248, 113, 113, 0.08)' 
          : '0px 8px 24px rgba(28, 28, 28, 0.05)',
        borderRadius: '10px',
        outline: isMain ? '1.5px #111111 solid' : '1px #E5E7EB solid',
        outlineOffset: '-1.5px',
        flexDirection: 'column',
        display: 'inline-flex',
        zIndex: isMain ? 50 : 10,
      }}
    >
      <div style={{ alignSelf: 'stretch', paddingTop: '12px', paddingBottom: '6px', background: '#F3F4F6', overflow: 'hidden', borderRadius: '5px', flexDirection: 'column', display: 'flex', gap: '8px' }}>
        <div style={{ alignSelf: 'stretch', paddingLeft: '12px', paddingRight: '12px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ flex: '1 1 0', flexDirection: 'column', display: 'inline-flex' }}>
            <div style={{ color: '#6B7280', fontSize: '10px', fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '14px', letterSpacing: '0.05em' }}>{subTitle}</div>
            <div style={{ alignSelf: 'stretch', color: '#111827', fontSize: isMain ? '16px' : '13px', fontFamily: 'Pretendard', fontWeight: '800', lineHeight: '22px' }}>{title}</div>
          </div>
          <div style={{ width: '48px', height: '32px', background: 'white', border: '1px #616161 solid', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <Play size={16} color={isMain ? "#111" : "#616161"} />
          </div>
        </div>
        <div style={{ alignSelf: 'stretch', paddingLeft: '12px', paddingRight: '12px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ height: '18px', padding: '1px 8px', background: 'white', borderRadius: '100px', border: '1px #E5E7EB solid', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
            <div style={{ color: '#4B5563', fontSize: '9px', fontFamily: 'Pretendard', fontWeight: '600' }}>LS electric</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontFamily: 'Pretendard', fontWeight: '500' }}>0.142s</div>
            <Clock size={12} color="#9CA3AF" />
          </div>
        </div>
      </div>
      <div style={{ alignSelf: 'stretch', paddingTop: '10px', paddingBottom: '4px', flexDirection: 'column', display: 'flex', gap: '6px' }}>
        {[
          { label: "Executed flow port", type: "Nullable <Boolean>", active: true },
          { label: "Error flow port", type: "Nullable <Boolean>", active: false }
        ].map((port, idx) => (
          <div key={idx} style={{ position: 'relative', justifyContent: 'space-between', alignItems: 'center', display: 'flex', gap: '12px', padding: '0 8px' }}>
            <div style={{ flex: 1.1, height: '34px', background: '#FFFFFF', border: '1px dashed #E5E7EB', borderRadius: '4px' }} />
            <div style={{ flex: 1, padding: '2px 10px', background: '#F9FAFB', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '8px', color: '#9CA3AF', fontWeight: 'medium' }}>{port.type}</span>
              <span style={{ fontSize: '11px', color: '#374151', fontWeight: '600' }}>{port.label}</span>
            </div>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              background: 'white', 
              borderRadius: '50%', 
              border: `1px #666666 solid`, 
              position: 'absolute',
              right: '-13px',
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
  <div className="mb-8 text-center md:text-left flex flex-col items-center md:items-start">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`inline-flex items-center py-1.5 px-3.5 border rounded-full backdrop-blur-md shadow-inner mb-4 ${light ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'}`}
    >
      <span className={`text-[11px] font-sans font-bold tracking-[0.05em] uppercase ${light ? 'text-red-300' : 'text-red-400'}`}>
        {tag}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-2xl md:text-3xl font-semibold tracking-normal leading-tight font-sans ${light ? 'text-white' : 'text-[#0F172A]'}`}
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [nodes, setNodes] = useState([]);
  const containerRef = useRef(null);

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
    { icon: Zap, title: "실시간 동기화", desc: "분산된 노드 간 데이터 지연 시간을 2ms 미만으로 유지합니다." },
    { icon: Shield, title: "로봇 시뮬레이션 기능", desc: "가상 환경에서의 로봇 가이던스 시뮬레이션을 보여줍니다." },
    { icon: Layers, title: "무한 확장성", desc: "단일 워크플로우 내에서 수만 개의 노드를 관리합니다." },
    { icon: Globe, title: "디지털 트윈 기능", desc: "현실 로봇 데이터가 실시간으로 가상 모델로 전송되어, 3D 가상 공간 내 로봇과 실제 로봇이 동일하게 움직입니다." },
    { icon: BarChart3, title: "정밀 분석", desc: "데이터 흐름 기반으로 가동률 및 장애를 실시간 예측합니다." },
    { icon: Smartphone, title: "원격 최적화", desc: "웹 기반 인터페이스로 어디서나 현장을 모니터링합니다." }
  ];

  const nodeGroups = [
    { name: "Logic & Control", count: 5, nodes: ["AND/OR Gate", "Timer (On/Off)", "Up/Down Counter", "Flip-Flop", "Latch Relays"], desc: "공정의 흐름을 제어하는 핵심 논리 소자입니다." },
    { name: "Math Functions", count: 4, nodes: ["Arithmetic (Add/Sub/Mul)", "Scaling Node", "Average Filter", "Comparator"], desc: "실시간 데이터 수치 연산 및 정밀 스케일링을 수행합니다." },
    { name: "Communication Hub", count: 4, nodes: ["Modbus TCP/RTU", "MQTT Client", "EtherNet/IP", "REST WebHook"], desc: "이기종 장비 및 상위 시스템과의 완벽한 데이터 연동을 지원합니다." },
    { name: "Sensor Processing", count: 4, nodes: ["Temperature AI", "Pressure Input", "Flow Velocity", "Computer Vision"], desc: "현장의 아날로그 및 시각 신호를 디지털 값으로 변환합니다." },
    { name: "Actuators & Drive", count: 3, nodes: ["Servo Drive Pos", "Solenoid Valve", "VFD Speed Control"], desc: "로직에 따라 물리적 장비를 정밀하게 구동합니다." },
    { name: "AI Analytics", count: 3, nodes: ["Anomaly Detection", "Trend Forecasting", "Edge OCR"], desc: "엣지 단에서 지능형 판단을 내리는 고급 노드 그룹입니다." }
  ];

  const cases = [
    { icon: Factory, title: "스마트 팩토리 공정 자동화", industry: "Manufacturing" },
    { icon: Truck, title: "지능형 물류 분류 시스템", industry: "Logistics" },
    { icon: Flame, title: "에너지 최적화 그리드 관리", industry: "Energy" },
    { icon: Bot, title: "협동 로봇 정밀 협업 제어", industry: "Robotics" },
    { icon: Droplets, title: "수처리 시설 통합 모니터링", industry: "Infrastructure" },
    { icon: FlaskConical, title: "제약 화학 공정 배치 제어", industry: "Pharmaceutical" }
  ];

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full bg-[#F8F9FB] overflow-x-hidden relative flex flex-col font-sans selection:bg-red-500 selection:text-white pt-[76px]">
      
      {/* 상단 내비게이션 바 */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-4 flex justify-between items-center bg-white/20 backdrop-blur-md border-b border-white/10 font-sans">
        <div onClick={() => scrollToSection('home')} className="flex items-center gap-3 cursor-pointer group transition-all">
          <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Zap className="text-white" size={16} fill="currentColor" />
          </div>
          <div>
            <span className="font-semibold text-lg tracking-tight block leading-none text-[#1c1c1c]">CleVis</span>
            <span className="text-[8px] font-sans text-red-400 font-bold uppercase tracking-widest mt-0.5 block">Beta v1.0</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold text-gray-500 tracking-[0.05em]">
          <button onClick={() => scrollToSection('features')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Features</button>
          <button onClick={() => scrollToSection('library')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Node</button>
          <button onClick={() => scrollToSection('application')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Application</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#0F172A] transition-colors cursor-pointer text-nowrap font-sans uppercase">Contact</button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="h-[calc(100vh-76px)] relative flex flex-col overflow-hidden">
        <motion.div style={{ x: translateX, y: translateY, backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)` }} className="absolute inset-[-10%] pointer-events-none opacity-30 z-0 bg-[length:40px_40px]" />
        <main className="flex-1 relative flex flex-col items-center justify-center p-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <AnimatePresence>
              {nodes.map(node => (
                <motion.line key={`line-${node.id}`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke="rgba(248, 113, 113, 0.12)" strokeWidth="1" strokeDasharray="6 6" />
              ))}
            </AnimatePresence>
          </svg>

          <AnimatePresence>
            {nodes.map(node => (
              <motion.div key={node.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.3, scale: node.scale, y: [0, -15, 0] }} transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }} exit={{ opacity: 0 }} className="absolute pointer-events-none" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                <PLCNode title={node.title} subTitle="FIELD_BUS" />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="relative z-20 perspective-[2000px]">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} animate={{ y: [0, -10, 0] }} transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotateX: { type: "spring", stiffness: 100 }, rotateY: { type: "spring", stiffness: 100 } }}>
              <motion.div style={{ scale: useTransform(smoothY, [-0.5, 0.5], [1.1, 0.9]), opacity: useTransform(smoothY, [-0.5, 0.5], [0.1, 0.03]) }} className="absolute inset-0 blur-2xl bg-black translate-y-16 rounded-full -z-10" />
              <PLCNode isMain={true} glow={true} title="Load 3D data from file" subTitle="Image 3D" />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-4 -right-4 bg-[#0F172A] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-1.5 shadow-xl border border-white/10">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
                IO: LIVE
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-20 text-center z-30 max-w-3xl px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-normal text-[#0F172A] mb-6 leading-[1.1]">CleVis <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-sans">Workflow Engine</span></h1>
              <p className="text-gray-500 font-semibold text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 opacity-80 font-sans">산업용 로직을 3D 토폴로지로 실시간 관리하고 모니터링 하세요. <br className="hidden md:block" />복잡한 공정을 하나의 유연한 워크플로우로 통합합니다.</p>
              <div className="flex justify-center">
                <button onClick={() => scrollToSection('features')} className="group relative overflow-hidden bg-[#1c1c1c] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-red-400/20 active:scale-95 text-sm">
                  <span className="relative z-10 uppercase tracking-widest">Launch Flow Editor</span>
                  <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-24 bg-white font-sans">
        <div className="container mx-auto px-6 md:px-12">
          <SectionTitle tag="Core strengths" title="산업 현장을 혁신하는 강점" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {strengths.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-8 rounded-2xl border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 mb-6 group-hover:bg-red-400 group-hover:text-white transition-colors">
                  <s.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-3 font-sans">{s.title}</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed font-sans">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LIBRARY SECTION (Node library) */}
      <section id="library" className="min-h-screen bg-[#F3F4F6] py-32 relative overflow-hidden font-sans">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-red-400/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="flex flex-col gap-8 lg:sticky lg:top-32 h-fit text-center lg:text-left">
              <SectionTitle tag="Continuing to update" title="Node library" />
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0 font-sans -mt-4">23종의 정밀 노드를 통해 어떤 복잡한 산업 공정도 시각적으로 구현하고 즉시 가동할 수 있습니다.</p>
            </div>
            <div className="pl-4 relative">
              <div className="absolute left-0 top-4 bottom-4 w-[1px]" style={{ background: 'linear-gradient(to bottom, rgba(248, 113, 113, 0) 0%, rgba(248, 113, 113, 0.4) 15%, rgba(248, 113, 113, 0.4) 85%, rgba(248, 113, 113, 0) 100%)' }}></div>
              <div className="flex flex-col gap-16">
                {nodeGroups.map((group, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex-col pl-10 relative flex gap-2" >
                    <div className="inline-flex items-center self-start bg-red-400/15 border border-transparent rounded-lg px-2.5 py-1 gap-2 mb-1 group transition-all hover:bg-red-400/20">
                      <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-red-500 tracking-wider uppercase">
                        <span>{group.count} Integrated Nodes</span>
                        <span className="opacity-30 px-1">•</span>
                        <span>Group {idx + 1}</span>
                      </div>
                      <div className="w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 fill-red-500"><path d="M12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6L14 4z" /></svg>
                      </div>
                    </div>
                    <h3 className="text-[#0F172A] text-xl md:text-2xl font-bold tracking-tight font-sans leading-tight">{group.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-md font-sans opacity-90">{group.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {group.nodes.map((node, nIdx) => (
                        <span key={nIdx} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-red-400 font-sans shadow-sm hover:border-red-200 transition-colors">{node}</span>
                      ))}
                    </div>
                    <div className="absolute left-[-21px] top-[14px] w-4 h-4">
                      <div className="w-full h-full rounded-full border border-red-400/30 p-1 bg-[#F3F4F6] relative z-10"><div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, #fff, #f87171 50%, #991b1b)' }}></div></div>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-gradient-to-r from-red-400 to-transparent" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION SECTION */}
      <section id="application" className="min-h-screen flex flex-col justify-center py-24 bg-white font-sans">
        <div className="container mx-auto px-6 md:px-12">
          <SectionTitle tag="Industrial applications" title="주요 산업분야 적용 사례" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {cases.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group cursor-pointer">
                <div className="aspect-video rounded-2xl bg-[#F9FAFB] mb-4 overflow-hidden relative shadow-sm border border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 group-hover:scale-105 transition-transform duration-500">
                    <c.icon size={40} className="text-red-200 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[8px] font-black uppercase text-red-400 tracking-widest font-sans">{c.industry}</div>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-red-400 transition-colors flex items-center gap-1.5 px-1 font-sans">{c.title}<ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="min-h-[50vh] flex flex-col justify-center items-center py-12 bg-white relative overflow-hidden font-sans border-t border-gray-100">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-400/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle tag="Onboarding" title="클레비스와 스마트하게 시작하세요" />
            <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed max-w-xl mx-auto font-sans -mt-4">기술 지원부터 현장 적용까지, 전문가 팀이 가장 빠르고 안정적인 도입을 지원합니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 max-w-xl mx-auto">
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-red-400/10 transition-all group font-sans">
                <Mail className="mb-2 text-red-400" size={20} />
                <h4 className="font-bold text-sm text-[#0F172A]">상담 요청하기</h4>
                <p className="text-[8px] text-gray-400 mt-1">24시간 이내 연락 예정</p>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 py-16 px-8 md:px-12 font-sans text-gray-400 text-[13px] leading-relaxed">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
            <div onClick={() => scrollToSection('home')} className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"><Zap className="text-white" size={16} fill="currentColor" /></div>
              <span className="font-bold text-xl tracking-tight text-gray-400">CleVis</span>
            </div>
          </div>
          <div className="mb-10">
            <div className="font-bold text-[13px] mb-4 text-gray-400 uppercase">클레로보틱스 주식회사</div>
            <div className="space-y-2 text-gray-400">
              <div className="flex flex-wrap gap-x-4 items-center">
                <span><strong className="font-bold">사업자등록번호</strong> 157-86-02249</span>
                <span className="opacity-30 text-gray-400">|</span>
                <span><strong className="font-bold">이메일</strong> hello@clerobotics.com</span>
              </div>
              <div className="pt-2">
                <p className="mb-1"><strong className="font-bold">본사 (기술연구소)</strong> 04778 서울 성동구 왕십리로 58, 511호-514호, 517호 <span className="mx-2 opacity-30 text-gray-200">|</span> <strong className="font-bold">전화</strong> 02-468-1114 <span className="mx-2 opacity-30 text-gray-200">|</span> <strong className="font-bold">팩스</strong> 02-2284-0135</p>
                <p><strong className="font-bold">시스템연구소 (데모/전시)</strong> 15847 경기 군포시 공단로 117, 1층 <span className="mx-2 opacity-30 text-gray-200">|</span> <strong className="font-bold">전화</strong> 031-427-0314 <span className="mx-2 opacity-30 text-gray-200">|</span> <strong className="font-bold">팩스</strong> 031-427-0315</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[12px] opacity-60 text-gray-400">Copyright ⓒ 클레로보틱스 주식회사. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}