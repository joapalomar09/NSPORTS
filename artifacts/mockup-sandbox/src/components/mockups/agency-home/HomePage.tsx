import React, { useEffect, useState, useRef } from "react";
import { 
  Menu, 
  X, 
  ChevronRight,
  Shield, 
  ArrowRightLeft, 
  TrendingUp, 
  Briefcase, 
  Search, 
  Handshake, 
  Award, 
  UserCircle, 
  Dumbbell, 
  Globe,
  Quote,
  Instagram
} from "lucide-react";

// --- CUSTOM HOOKS ---

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting] as const;
}

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? "bg-[#121212]/95 backdrop-blur-md border-[#2B2B2B]" : "bg-transparent border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/elite-sport-logo.png" alt="Elite Sport" className="h-10 w-auto" />
          <div className="w-2 h-2 rounded-full bg-[#C6A25D]" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["Nosotros", "Servicios", "Jugadores", "Scouting", "Contacto"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-montserrat font-semibold text-white/80 hover:text-[#C6A25D] transition-colors uppercase tracking-wider">
              {item}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-24 left-0 w-full bg-[#121212] border-b border-[#2B2B2B] flex flex-col items-center py-6 gap-6 transition-all duration-300 origin-top ${mobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
        {["Nosotros", "Servicios", "Jugadores", "Scouting", "Contacto"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-montserrat font-semibold text-white hover:text-[#C6A25D] transition-colors uppercase tracking-wider">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <header className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url(/__mockup/images/agency-hero.jpg)", backgroundPosition: "center 20%" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#090909]/80 via-[#090909]/60 to-[#090909] backdrop-blur-[2px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-20 animate-fade-in-up">
        <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-white mb-6 uppercase">
          Construimos carreras.<br />
          Potenciamos <span className="text-[#C6A25D]">talento.</span>
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-light">
          Representación integral para futbolistas que buscan alcanzar su máximo potencial dentro y fuera de la cancha.
        </p>
        <div className="flex justify-center w-full sm:w-auto">
          <button className="px-8 py-4 bg-transparent border border-[#2B2B2B] hover:border-[#C6A25D] text-white font-montserrat font-bold uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer">
            Conocé la agencia
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#C6A25D]" />
      </div>
    </header>
  );
};

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }: { target: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(target * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isIntersecting]);

  return (
    <span ref={ref} className="font-bebas text-5xl md:text-7xl text-[#C6A25D] tabular-nums tracking-wide">
      {suffix.startsWith("+") ? "+" : ""}{count}{suffix.replace("+", "")}
    </span>
  );
};

const StatsBar = () => {
  const stats = [
    { value: 9, suffix: "+", label: "Jugadores" },
    { value: 5, suffix: "+", label: "Clubes" },
    { value: 3, suffix: "+", label: "Países" },
    { value: 4, suffix: "+", label: "Años" },
  ];

  return (
    <section id="nosotros" className="w-full bg-[#121212] border-y border-[#2B2B2B] py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-[#2B2B2B]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <span className="font-montserrat font-semibold text-white/50 tracking-[0.2em] uppercase mt-2 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group bg-[#121212] border border-[#2B2B2B] p-8 transition-all duration-500 hover:border-[#C6A25D] hover:-translate-y-2 cursor-pointer ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <Icon className="text-[#C6A25D] mb-6 transition-transform duration-500 group-hover:scale-110" size={36} strokeWidth={1.5} />
      <h3 className="font-montserrat font-bold text-xl text-white mb-3 tracking-wide">{title}</h3>
      <p className="font-inter text-white/60 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};

const Alianza = () => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section id="alianza" className="py-24 bg-[#121212] border-y border-[#2B2B2B] scroll-mt-24">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 flex flex-col items-center text-center transition-all duration-700 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="font-montserrat font-bold text-[#C6A25D] tracking-[0.2em] uppercase text-sm mb-4">Alianza</span>
        <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider mb-12">Cooperación Internacional</h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-10">
          <div className="flex items-center gap-2">
            <img src="/__mockup/images/elite-sport-logo.png" alt="NSPORT" className="h-12 w-auto" />
          </div>

          <span className="font-bebas text-5xl md:text-6xl leading-none text-[#C6A25D]">&amp;</span>

          <div className="flex items-center gap-4">
            <img src="/__mockup/images/bta-logo-white.png" alt="BTA - Behind the Athlete" className="h-12 w-auto" />
            <a
              href="https://www.instagram.com/behindtheathleteteam?igsh=MXA2cXRvbmpmY3J2Ng=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de BTA - Behind the Athlete"
              className="w-9 h-9 flex items-center justify-center border border-[#2B2B2B] rounded-full text-white/70 hover:text-[#C6A25D] hover:border-[#C6A25D] transition-colors"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <p className="font-inter text-white/70 leading-relaxed max-w-2xl text-base md:text-lg">
          NSPORT se une a <span className="text-white font-semibold">BTA (Behind the Athlete)</span> en una alianza estratégica internacional que potencia el desarrollo de nuestros jugadores hacia el mercado europeo, combinando red de contactos, experiencia en negociaciones y estructura profesional a ambos lados del Atlántico.
        </p>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: Shield, title: "Representación", description: "Gestión integral de la carrera del futbolista profesional y juvenil." },
    { icon: ArrowRightLeft, title: "Transferencias", description: "Negociación y ejecución de traspasos a nivel nacional e internacional." },
    { icon: TrendingUp, title: "Marketing", description: "Desarrollo de marca personal y posicionamiento digital." },
    { icon: Briefcase, title: "Asesoramiento", description: "Acompañamiento legal, financiero y contable especializado." },
    { icon: Search, title: "Scouting", description: "Identificación temprana y captación de talentos emergentes." },
    { icon: Handshake, title: "Negociaciones", description: "Optimización de contratos laborales y acuerdos comerciales." },
    { icon: Award, title: "Patrocinios", description: "Búsqueda y gestión de sponsors y marcas deportivas." },
    { icon: UserCircle, title: "Imagen Personal", description: "Relaciones públicas y manejo de crisis en medios de comunicación." },
    { icon: Dumbbell, title: "Preparación Profesional", description: "Entrenamiento físico, nutrición y psicología deportiva." },
    { icon: Globe, title: "Networking", description: "Conexiones directas con direcciones deportivas de clubes europeos." },
  ];

  return (
    <section id="servicios" className="py-24 bg-[#090909] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-montserrat font-bold text-[#C6A25D] tracking-[0.2em] uppercase text-sm mb-4">Nuestros Servicios</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider">Gestión 360°</h2>
          <div className="w-16 h-1 bg-[#C6A25D] mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div key={i} className={i >= 9 ? "lg:col-start-2" : ""}>
              <ServiceCard {...svc} delay={(i % 3) * 100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlayerCard = ({ name, age, position, club, image, imagePosition, delay }: { name: string, age: number, position: string, club: string, image: string, imagePosition?: string, delay: number }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative h-[450px] overflow-hidden bg-[#121212] border border-[#2B2B2B] transition-all duration-700 cursor-pointer ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={name}
          style={{ objectPosition: imagePosition || "center top" }}
          className="w-full h-full object-cover filter grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/80 to-transparent" />
        {/* Glow effect on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#C6A25D]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bebas text-4xl text-white tracking-wide uppercase leading-none">
            {firstName}<br />{lastName}
          </h3>
          <span className="font-montserrat font-bold text-[#C6A25D] border border-[#C6A25D] px-2 py-1 text-xs uppercase tracking-widest">{position}</span>
        </div>
        <div className="flex items-center gap-4 text-white/70 font-inter text-sm mb-6">
          <span>{age} años</span>
          <div className="w-1 h-1 rounded-full bg-[#C6A25D]" />
          <span className="font-semibold">{club}</span>
        </div>
        
        <button className="w-full py-3 border border-[#2B2B2B] text-white font-montserrat font-bold text-xs uppercase tracking-widest transition-all duration-300 group-hover:border-[#C6A25D] group-hover:bg-[#C6A25D] group-hover:text-[#090909] flex items-center justify-center gap-2 cursor-pointer">
          Ver Perfil <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Jugadores = () => {
  const [showAll, setShowAll] = useState(false);
  const players = [
    { name: "Ramiro Tulián", age: 18, position: "DEL", club: "Belgrano", image: "/__mockup/images/ramiro-tulian-2.jpg" },
    { name: "Lautaro Barraza", age: 20, position: "DEL", club: "Cancún FC", image: "/__mockup/images/lautaro-barraza.jpg" },
    { name: "Pedro Gutiérrez", age: 20, position: "DEF", club: "Belgrano", image: "/__mockup/images/pedro-gutierrez.jpg" },
    { name: "Bautista Torres", age: 16, position: "DEL", club: "Banfield", image: "/__mockup/images/bautista-torres.jpg" },
    { name: "Francisco Mansilla", age: 14, position: "DEL", club: "Belgrano", image: "/__mockup/images/francisco-mansilla.jpg" },
    { name: "Matías Macagno", age: 14, position: "DEL", club: "Talleres", image: "/__mockup/images/matias-macagno.jpg" },
    { name: "Benicio Zapata", age: 14, position: "MED", club: "Talleres", image: "/__mockup/images/benicio-zapata.jpg" },
    { name: "Ignacio Ludueña", age: 16, position: "DEL", club: "Instituto", image: "/__mockup/images/ignacio-luduena.jpg", imagePosition: "70% 30%" },
    { name: "Kevin Garay", age: 20, position: "DEL", club: "Belgrano", image: "/__mockup/images/kevin-garay.jpg" },
  ];

  return (
    <section id="jugadores" className="py-24 bg-[#121212] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-montserrat font-bold text-[#C6A25D] tracking-[0.2em] uppercase text-sm mb-4 block">Talento de Exportación</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider">Jugadores Destacados</h2>
          </div>
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="font-montserrat font-bold text-white hover:text-[#C6A25D] text-sm uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
          >
            {showAll ? "Ver menos" : "Ver todos"} <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(showAll ? players : players.slice(0, 4)).map((player, i) => (
            <PlayerCard key={i} {...player} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const clubs = ["Belgrano", "Talleres", "Instituto", "Banfield", "Cancún FC"];
  
  return (
    <section className="py-12 bg-[#090909] border-y border-[#2B2B2B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="font-montserrat font-bold text-white/40 tracking-[0.2em] uppercase text-xs">Clubes que confían en nosotros</span>
      </div>
      <div className="relative w-full flex">
        <div className="flex whitespace-nowrap animate-marquee">
          {clubs.concat(clubs).concat(clubs).map((club, i) => (
            <div key={i} className="inline-flex items-center mx-8">
              <span className="font-bebas text-4xl text-[#2B2B2B] hover:text-[#C6A25D] transition-colors duration-300 select-none cursor-default">
                {club}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#2B2B2B] mx-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseItem = ({ item, i }: { item: { year: string; origin: string; dest: string; player: string; desc: string }; i: number }) => {
  const isEven = i % 2 === 0;
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 transition-all duration-700 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {/* Left Side (Desktop) */}
      <div className={`hidden md:block w-[45%] text-right ${isEven ? "order-1" : "order-3 text-left"}`}>
        <span className="font-bebas text-4xl text-[#C6A25D]/50 block mb-2">{item.year}</span>
        <span className="font-montserrat font-bold text-white uppercase text-sm tracking-widest">{isEven ? item.origin : item.dest}</span>
      </div>

      {/* Center Node */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#090909] border-2 border-[#C6A25D] md:-translate-x-1/2 flex items-center justify-center order-2 mt-1 md:mt-0 z-10 shadow-[0_0_15px_rgba(198,162,93,0.5)]">
        <div className="w-1 h-1 rounded-full bg-[#C6A25D]" />
      </div>

      {/* Right Side / Mobile Content */}
      <div className={`pl-12 md:pl-0 md:w-[45%] ${isEven ? "order-3 text-left" : "order-1 text-right"}`}>
        <div className="md:hidden mb-2">
          <span className="font-bebas text-2xl text-[#C6A25D]">{item.year}</span>
        </div>
        <div className={`bg-[#121212] border border-[#2B2B2B] p-6 transition-colors duration-300 hover:border-[#C6A25D] cursor-default ${!isEven ? "md:text-right" : ""}`}>
          <h4 className="font-bebas text-3xl text-white tracking-wide mb-1">{item.player}</h4>
          <p className="font-montserrat font-semibold text-[#C6A25D] text-xs uppercase tracking-widest mb-3">
            <span className="md:hidden">{item.origin} → </span>{isEven ? item.dest : item.origin}
          </p>
          <p className="font-inter text-white/60 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const CasosExito = () => {
  const cases = [
    { year: "2026", origin: "Belgrano 🇦🇷", dest: "Belgrano 🇦🇷", player: "R. Tulián", desc: "Firma de su primer contrato profesional y renovación del mismo." },
    { year: "2026", origin: "Cancún FC 🇲🇽", dest: "Instituto 🇦🇷", player: "L. Barraza", desc: "Traspaso internacional y contrato por 3 años." },
  ];

  return (
    <section id="scouting" className="py-24 bg-[#090909] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-montserrat font-bold text-[#C6A25D] tracking-[0.2em] uppercase text-sm mb-4">Trayectoria</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider">Casos de Éxito</h2>
          <div className="w-16 h-1 bg-[#C6A25D] mt-6" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2B2B2B] md:-translate-x-1/2" />
          {cases.map((item, i) => (
            <CaseItem key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { quote: "Desde el primer día sentí que mi carrera estaba en manos de profesionales. No solo se encargan del contrato, se preocupan por vos como persona.", name: "Facundo M.", role: "Jugador Profesional" },
    { quote: "La transparencia y la seriedad con la que manejan cada negociación es única. Entienden el mercado europeo a la perfección.", name: "Javier S.", role: "Director Deportivo" },
    { quote: "Como padre, confiarle el futuro de tu hijo a alguien no es fácil. Con Elite Sport encontramos una familia que lo protege y potencia.", name: "Roberto C.", role: "Padre de Jugador" },
    { quote: "La diferencia está en los detalles. El equipo de marketing y asesoría legal está siempre un paso adelante.", name: "Lucas P.", role: "Jugador Internacional" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-[#121212] border-y border-[#2B2B2B] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Quote size={400} className="text-[#2B2B2B]/20" strokeWidth={0.5} />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="h-[280px] md:h-[200px] flex flex-col items-center justify-center text-center">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className={`absolute transition-all duration-700 ease-in-out w-full px-6 ${
                i === current 
                  ? "opacity-100 translate-x-0" 
                  : i < current ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"
              }`}
            >
              <p className="font-inter italic text-xl md:text-3xl text-white leading-relaxed mb-8 font-light">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-bebas text-2xl text-white tracking-widest">{t.name}</h4>
                <span className="font-montserrat font-semibold text-[#C6A25D] text-xs uppercase tracking-widest">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-8 bg-[#C6A25D]" : "w-2 bg-[#2B2B2B] hover:bg-[#C6A25D]/50"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacto" className="bg-[#090909] pt-20 pb-10 border-t-2 border-[#C6A25D] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/__mockup/images/elite-sport-logo.png" alt="Elite Sport" className="h-9 w-auto" />
              <div className="w-2 h-2 rounded-full bg-[#C6A25D]" />
            </div>
            <p className="font-inter text-white/50 text-sm leading-relaxed max-w-xs">Agencia líder en representación integral de futbolistas. Conectando el talento con el más alto nivel del fútbol mundial.</p>
          </div>
          
          <div>
            <h4 className="font-montserrat font-bold text-white uppercase text-sm tracking-widest mb-6">Navegación</h4>
            <ul className="space-y-3">
              {["Nosotros", "Servicios", "Jugadores Destacados", "Scouting", "Contacto"].map(item => (
                <li key={item}>
                  <a href="#" className="font-inter text-white/50 hover:text-[#C6A25D] text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-bold text-white uppercase text-sm tracking-widest mb-6">Contacto</h4>
            <ul className="space-y-3 mb-8">
              <li className="font-inter text-white/50 text-sm">Córdoba, Argentina</li>
              <li className="font-inter text-white/50 text-sm">Madrid, España</li>
              <li className="font-inter text-white/50 text-sm">info@nsports.com</li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/agencia.nsport?igsh=MWI5bHBjaG1mem42Nw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#2B2B2B] flex items-center justify-center text-white/50 hover:text-[#C6A25D] hover:border-[#C6A25D] transition-colors cursor-pointer"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2B2B2B] gap-4">
          <p className="font-inter text-white/30 text-xs">
            © {new Date().getFullYear()} Nova Sports Agencia. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-inter text-white/30 hover:text-white text-xs transition-colors">Política de privacidad</a>
            <a href="#" className="font-inter text-white/30 hover:text-white text-xs transition-colors">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Montserrat:wght@600;700&display=swap');
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #090909;
          color: #ffffff;
        }
      `}} />
      <div className="min-h-screen bg-[#090909] selection:bg-[#C6A25D] selection:text-[#090909]">
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <Alianza />
          <Services />
          <Jugadores />
          <Marquee />
          <CasosExito />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
}
