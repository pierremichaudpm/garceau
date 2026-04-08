import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import "./App.css";

const HERO_SLIDES = [
  { src: "/hero.webp", pos: "center 40%", mobilePos: "center center" },
  { src: "/velo-tour-des-deux-lacs.jpg", pos: "center center", mobilePos: "center center" },
  { src: "/donat_lac.jpg", pos: "center 30%", mobilePos: "center center" },
  { src: "/hiking.jpg", pos: "center center", mobilePos: "72% center" },
];

const PHOTOS = {
  mtb: "/velomontagne.jpg",
  route: "/velostdonat.jpg",
  rando: "/sentiers-randonnees.jpg",
  trail: "/trail.jpeg",
  gravel: "/gravel.jpeg",
  terrasse: "/bar4.jpg",
  camp: "/belvedere.jpg",
};

const ACTIVITIES = [
  {
    id: "velo-montagne", label: "Vélo de montagne", tag: "MTB", photo: PHOTOS.mtb,
    desc: "Sentiers en progression avec connexions vers le Parc Nature Étude et le Parc des Pionniers.",
    level: "Débutant → Intermédiaire", distance: "Réseau en développement",
    modal: {
      title: "Vélo de montagne",
      intro: "Garceau est au cœur d'un réseau MTB en pleine expansion. Trois zones de skill park à la base, des connexions directes vers deux parcs majeurs et l'accès au Parc national du Mont-Tremblant.",
      highlights: [
        { label: "Parc des Pionniers", value: "6+ km de singletrack intermédiaire sur terrain montagneux. Accès plage au lac Archambault après la ride." },
        { label: "Parc Nature-Études", value: "10 km de sentiers débutants en forêt avec passerelles en bois. Idéal pour les familles." },
        { label: "Parc national du Mont-Tremblant", value: "30+ km de sentiers MTB incluant le populaire circuit Chute aux Rats, à quelques minutes du village." },
        { label: "Skill parks", value: "3 zones d'habileté à la base pour tous les niveaux, inaugurées en 2025. Plus de 1M$ investis dans la transformation 4 saisons." },
      ],
      stats: [
        { n: "3", l: "Skill parks" },
        { n: "46+", l: "km de sentiers" },
        { n: "305m", l: "Dénivelé" },
      ],
    },
  },
  {
    id: "velo-route", label: "Vélo de route", tag: "ROUTE", photo: PHOTOS.route,
    desc: "Circuits reconnus : tour des Deux Lacs, Le Nordet, secteur Baribeau. Parcours panoramiques de 30 à 100 km.",
    level: "Tous niveaux", distance: "30 – 100 km",
    modal: {
      title: "Vélo de route",
      intro: "Saint-Donat est une destination vélo de route reconnue au Québec. Deux circuits majeurs, des routes panoramiques entre lacs et montagnes, et un asphalte de qualité.",
      highlights: [
        { label: "Tour des Deux Lacs", value: "65,8 km · +611 m de dénivelé. Boucle autour des lacs Archambault et Ouareau. Vues spectaculaires en continu. Option courte disponible (un seul lac)." },
        { label: "Le Nordet", value: "84 km · +1 023 m de dénivelé. Un incontournable pour les cyclistes sérieux. 900 m de D+ sur 30 km dans le tronçon Nordet. Terrain montagneux entre Lanaudière et les Laurentides." },
        { label: "Secteur Baribeau", value: "Circuit local accessible depuis la base. Routes tranquilles à travers la campagne de Saint-Donat." },
        { label: "Infrastructure", value: "Voies cyclables élargies sur la Route 125. Stationnement gratuit à la base. Atelier mécanique et lave-vélo au retour." },
      ],
      stats: [
        { n: "65,8", l: "km — Deux Lacs" },
        { n: "84", l: "km — Le Nordet" },
        { n: "1 023m", l: "D+ Nordet" },
      ],
    },
  },
  {
    id: "randonnee", label: "Randonnée", tag: "RANDO", photo: PHOTOS.rando,
    desc: "Accès instantané aux sentiers depuis le bas de montagne. Boucles de 3 à 15 km à travers la forêt.",
    level: "Facile → Difficile", distance: "3 – 15 km",
    modal: {
      title: "Randonnée",
      intro: "7 randonnées gratuites autour de Saint-Donat — du sentier familial de 2 km au sommet le plus haut de Lanaudière. 200+ km de sentiers dans le territoire, incluant le Sentier National.",
      highlights: [
        { label: "Montagne Noire", value: "13 km A/R · 875 m · Difficile. Plus haut sommet de Saint-Donat. Site d'écrasement d'un bombardier Liberator (1943). Tour d'observation au sommet." },
        { label: "Cap de la Fée", value: "6,1 km · 625 m · Intermédiaire. Vues sur les deux lacs. Cascades, petite chute, refuge à 2 km." },
        { label: "Mont Sourire", value: "2 km · 617 m · Facile. Rando courte et familiale. Panorama magnifique sur Saint-Donat et les montagnes." },
        { label: "Mont Ouareau", value: "13,1 km · 685 m · Intermédiaire. Sentier National. Vues panoramiques reliant les deux lacs. Refuge." },
        { label: "Sentier des Étangs", value: "2,3 km en boucle · Facile. Trois étangs, 184 espèces d'oiseaux, panneaux d'interprétation." },
      ],
      stats: [
        { n: "7", l: "Sentiers gratuits" },
        { n: "875m", l: "Sommet max" },
        { n: "200+", l: "km de réseau" },
      ],
    },
  },
  {
    id: "trail", label: "Trail running", tag: "TRAIL", photo: PHOTOS.trail,
    desc: "Les mêmes sentiers, un autre rythme. Dénivelé, sous-bois, single track. Départ et retour au bas de montagne.",
    level: "Intermédiaire → Avancé", distance: "5 – 15 km",
    modal: {
      title: "Trail running",
      intro: "Saint-Donat est une destination trail établie, ancrée par l'Ultra-Trail des Pionniers (Série Trails Québec). 200+ km de sentiers, 460 m de dénivelé sur Montagne Noire et Garceau comme point de départ naturel.",
      highlights: [
        { label: "Ultra-Trail des Pionniers", value: "Départ de Ski Garceau. Boucle des Hauts-Sommets : 70 km, ~2 300 m D+. Demi-Boucle : 35 km, ~1 200 m D+. Backyard : boucles de 4,5 km, dernier debout." },
        { label: "Courses du dimanche", value: "21 km (800 m D+) · 10 km (300 m D+) · 5 km (100 m D+) · 1 km Junior. Tous les niveaux, depuis le Parc des Pionniers." },
        { label: "Terrain", value: "Sous-bois, single track, racines, dénivelé. Du Mont Sourire (facile, 2 km) à Montagne Noire (13 km, 460 m D+). Variété de surfaces et de profils." },
        { label: "Infrastructures", value: "Garceau sert de camp de base toute l'année. Resto-bar, douches, stationnement gratuit. Réseau praticable du printemps à l'automne." },
      ],
      stats: [
        { n: "70", l: "km Ultra-Trail" },
        { n: "2 300m", l: "D+ max" },
        { n: "6", l: "Distances course" },
      ],
    },
  },
  {
    id: "gravel", label: "Gravel", tag: "GRAVEL", photo: PHOTOS.gravel,
    desc: "Routes mixtes autour de Saint-Donat. Asphalte, gravier, chemins forestiers. Le meilleur des deux mondes.",
    level: "Intermédiaire", distance: "40 – 80 km",
    modal: {
      title: "Gravel",
      intro: "Le réseau de chemins forestiers et de routes non pavées de Saint-Donat en fait un terrain de jeu gravel exceptionnel. Garceau est le point de départ idéal avec ses services post-ride.",
      highlights: [
        { label: "Boucle Mont-Tremblant", value: "63 km depuis Garceau à travers le Parc national. 50%+ sur gravel varié : hardpack, sable, sections rocheuses." },
        { label: "Chemin du Mont-Jasper", value: "2,9 km. L'une des plus longues montées gravel des Laurentides." },
        { label: "Montagne Noire", value: "11,1 km. Gravel aventure — pentu, rocheux, sauvage." },
        { label: "Lien Interval", value: "Chemin du Lac-Legault / Sentier Interval (8 km). Liaison Sainte-Lucie – Saint-Donat, particulièrement populaire." },
      ],
      stats: [
        { n: "63", l: "km boucle parc" },
        { n: "50%+", l: "Non-pavé" },
        { n: "∞", l: "Combinaisons" },
      ],
    },
  },
];

const SERVICES = [
  {
    name: "Boutique 4 saisons", detail: "10 000 pi²",
    modal: {
      title: "Boutique 4 saisons",
      desc: "10 000 pi² dédiés au plein air — de la planche à neige au vélo de montagne, en passant par le SUP et l'équipement de plage. Ouverte 365 jours par année depuis 2002.",
      extra: "Centre de démo pour tester l'équipement. Département course. Ski alpin, snowboard, touring, vélos de montagne, vêtements été, maillots, sports nautiques.",
      hours: "Lun-ven 8h30-16h30 · Sam-dim 8h-16h30",
      contact: "819 424-4189 · boutique@skigarceau.com",
    },
  },
  {
    name: "Resto-bar & terrasse", detail: "Vue sur la montagne",
    modal: {
      title: "Resto-bar & terrasse",
      desc: "Après-ride bien mérité : terrasse ensoleillée, menu gourmand et vue directe sur la montagne. Le spot de rassemblement naturel au retour des sentiers.",
      extra: "Nouvelle équipe food service depuis l'été 2025. Terrasse extérieure au pied de la montagne. Ambiance décontractée, parfait pour les groupes.",
      hours: "Horaires été 2026 à confirmer",
    },
  },
  {
    name: "Atelier mécanique", detail: "Vélo & ski",
    modal: {
      title: "Atelier mécanique",
      desc: "Nos mécaniciens certifiés prennent soin de vos vélos et skis. Mise au point, réparation, ajustement — tout sous un même toit, été comme hiver.",
      extra: "Programme Opération re-CYCLE : vélos donnés reconditionnés par nos techniciens. Service complet de mise au point, réparation et ajustement pour vélos et skis/planches.",
    },
  },
  {
    name: "Lave-vélo", detail: "Libre-service",
    modal: {
      title: "Lave-vélo",
      desc: "Station de lavage dédiée pour rincer la boue après vos sorties en sentier. Parce qu'un vélo propre, c'est un vélo heureux.",
      extra: "Libre-service au pied de la montagne. Accessible après chaque sortie trail ou MTB.",
    },
  },
  {
    name: "Stationnement", detail: "Gratuit",
    modal: {
      title: "Stationnement gratuit",
      desc: "Stationnement gratuit à la base, 190 chemin du Lac Blanc. Arrivez, roulez, profitez.",
      extra: "Le Parc des Pionniers (17 chemin Hector-Bilodeau) offre aussi un stationnement gratuit pour l'accès plage et sentiers côté lac.",
    },
  },
  {
    name: "Zone famille", detail: "Pump track · Slackline",
    modal: {
      title: "Zone famille",
      desc: "Pump track, parcours d'habiletés et slackline — pendant que les grands roulent en montagne, les petits s'éclatent à la base.",
      extra: "Trois zones de skill park inaugurées en 2025. Vélos, trottinettes, skateboards bienvenus. Le Parc des Pionniers à proximité offre aussi une plage surveillée, structures de jeux, aires de pique-nique et BBQ.",
    },
  },
  {
    name: "Belvédère", detail: "Panorama Lanaudière",
    modal: {
      title: "Belvédère",
      desc: "Le plus haut point de vue de Lanaudière. À 717 m, la vue s'étend des lacs Archambault et Ouareau jusqu'à l'horizon des Laurentides.",
      extra: "Nouveau belvédère panoramique créé dans le cadre du plan d'investissements 2025. Accessible depuis les sentiers de la montagne.",
    },
  },
  {
    name: "Bornes de recharge", detail: "Véhicules électriques",
    modal: {
      title: "Bornes de recharge EV",
      desc: "4 bornes de recharge doubles pour véhicules électriques. Rechargez pendant que vous roulez.",
      extra: "Directement sur le site, au stationnement de la base. Compatibles avec les standards courants.",
    },
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Reveal = forwardRef(function Reveal({ children, className = "", as: Tag = "div", ...props }, externalRef) {
  const internalRef = useReveal();
  const mergedRef = useCallback((node) => {
    internalRef.current = node;
    if (typeof externalRef === "function") externalRef(node);
    else if (externalRef) externalRef.current = node;
  }, [externalRef]);
  return <Tag ref={mergedRef} className={`reveal ${className}`} {...props}>{children}</Tag>;
});

function Modal({ data, onClose, type }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  if (type === "activity") {
    const m = data.modal;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-photo" style={{ backgroundImage: `url(${data.photo})` }}>
            <span className="modal-tag">{data.tag}</span>
          </div>
          <div className="modal-body">
            <h3 className="modal-title">{m.title}</h3>
            <p className="modal-intro">{m.intro}</p>
            <div className="modal-stats">
              {m.stats.map((s, i) => (
                <div key={i} className="modal-stat">
                  <div className="modal-stat-n">{s.n}</div>
                  <div className="modal-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="modal-highlights">
              {m.highlights.map((h, i) => (
                <div key={i} className="modal-hl">
                  <div className="modal-hl-label">{h.label}</div>
                  <div className="modal-hl-value">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const m = data.modal;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-service" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-srv-header">
            <span className="modal-srv-dot" />
            <h3 className="modal-title">{m.title}</h3>
          </div>
          <p className="modal-intro">{m.desc}</p>
          <p className="modal-extra">{m.extra}</p>
          {m.hours && (
            <div className="modal-info-row">
              <span className="modal-info-label">Horaires</span>
              <span className="modal-info-value">{m.hours}</span>
            </div>
          )}
          {m.contact && (
            <div className="modal-info-row">
              <span className="modal-info-label">Contact</span>
              <span className="modal-info-value">{m.contact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chatbot() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const [open, setOpen] = useState(!isMobile);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Salut! Je suis l'assistant Garceau. Comment puis-je t'aider?" }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: "Merci pour ta question! Notre équipe pourra te répondre sous peu. En attendant, explore nos activités et services." }]);
    }, 800);
  };

  return (
    <div className="chat-wrapper">
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-left">
              <span className="chat-header-dot" />
              <span className="chat-header-title">Garceau</span>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chat-input-bar">
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Pose ta question..."
            />
            <button className="chat-send" onClick={send}>→</button>
          </div>
        </div>
      )}
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [activeActivity, setActiveActivity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const [modal, setModal] = useState(null);
  const actPausedRef = useRef(true);
  const actVisibleRef = useRef(false);
  const actStartedRef = useRef(false);
  const actSectionRef = useRef(null);
  const actDotsRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled((window.scrollY || 0) > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide(s => (s + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Detect when activities section scrolls into view
  useEffect(() => {
    const el = actSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        actVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !actStartedRef.current) {
          actStartedRef.current = true;
          // 5s delay before starting auto-rotate
          setTimeout(() => { actPausedRef.current = false; }, 5000);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Activity auto-rotate: only when visible, started, not paused, no modal
  useEffect(() => {
    if (!actStartedRef.current || actPausedRef.current || modal || !actVisibleRef.current) return;
    const interval = setInterval(() => {
      setActiveActivity(i => (i + 1) % ACTIVITIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeActivity, modal]);

  const setActivityManual = (val) => {
    const next = typeof val === "function" ? val(activeActivity) : val;
    setActiveActivity(next);
    actPausedRef.current = true;
    setTimeout(() => { actPausedRef.current = false; }, 10000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Auto-scroll dots to active (only within the dots container, not the page)
  useEffect(() => {
    const container = actDotsRef.current;
    if (!container) return;
    const activeBtn = container.children[activeActivity];
    if (activeBtn) {
      const left = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeActivity]);

  // Touch swipe for activities
  const touchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setActivityManual(i => Math.min(i + 1, ACTIVITIES.length - 1));
      else setActivityManual(i => Math.max(i - 1, 0));
    }
  };

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-mark">
          <img src="/logo.png" alt="Ski Garceau" className="nav-logo" />
          GARCEAU
          <span className="nav-season">L'ÉTÉ</span>
        </div>
        <div className="nav-links">
          {["Activités", "Services", "Camp de base", "Infos"].map((item, i) => (
            <button key={i} className="nav-link" onClick={() => scrollTo(["activites","services","camp","infos"][i])}>
              {item}
            </button>
          ))}
          <a href="https://skigarceau.com" target="_blank" rel="noopener noreferrer" className="nav-link nav-winter">
            Hiver ↗
          </a>
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {["Activités", "Services", "Camp de base", "Infos"].map((item, i) => (
            <button key={i} onClick={() => scrollTo(["activites","services","camp","infos"][i])}>{item}</button>
          ))}
          <button onClick={() => window.open("https://skigarceau.com", "_blank")} style={{ color: "var(--red)" }}>
            Site hiver ↗
          </button>
        </div>
      )}

      {/* HERO CAROUSEL */}
      <section className="hero">
        <div className="hero-slides">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide hero-slide-${i}`}
              data-active={i === heroSlide}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">Saint-Donat · Lanaudière · 717 m</div>
            <h1 className="hero-h1">
              Le point<br />de départ<br /><em>naturel.</em>
            </h1>
            <p className="hero-sub">
              Camp de base plein air. Point d'ancrage. Lieu de retour.
              Garceau bouge aussi l'été.
            </p>
            <div className="hero-ctas">
              <button className="btn-r" onClick={() => scrollTo("activites")}>Explorer les activités</button>
              <button className="btn-g" onClick={() => scrollTo("services")}>Services & infos</button>
            </div>
            <div className="hero-dots">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} className={`hero-dot ${i === heroSlide ? "hero-dot-on" : ""}`} onClick={() => setHeroSlide(i)} />
              ))}
            </div>
          </div>

          <Chatbot />
        </div>
      </section>

      {/* ACTIVITÉS — carousel horizontal */}
      <Reveal as="section" className="sec" id="activites" ref={actSectionRef}>
        <div className="sec-head">
          <span className="sec-num">01</span>
          <h2 className="sec-t">Activités</h2>
          <div className="act-arrows">
            <button className="act-arrow" onClick={() => setActivityManual(i => (i - 1 + ACTIVITIES.length) % ACTIVITIES.length)}>←</button>
            <span className="act-counter">{activeActivity + 1}/{ACTIVITIES.length}</span>
            <button className="act-arrow" onClick={() => setActivityManual(i => (i + 1) % ACTIVITIES.length)}>→</button>
          </div>
        </div>
        <div className="act-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="act-track" style={{ transform: `translateX(-${activeActivity * 100}%)` }}>
            {ACTIVITIES.map((a, i) => (
              <div key={a.id} className="act-slide">
                <div className="act-card" onClick={() => setModal({ type: "activity", data: a })}>
                  <div className="act-photo" style={{ backgroundImage: `url(${a.photo})` }}>
                    <div className="act-photo-tag">{a.tag}</div>
                  </div>
                  <div className="act-info">
                    <div>
                      <h3 className="act-name">{a.label}</h3>
                      <p className="act-desc">{a.desc}</p>
                    </div>
                    <div className="act-bottom">
                      <div className="act-meta">
                        <div>
                          <div className="act-ml">Niveau</div>
                          <div className="act-mv">{a.level}</div>
                        </div>
                        <div>
                          <div className="act-ml">Distance</div>
                          <div className="act-mv">{a.distance}</div>
                        </div>
                      </div>
                      <span className="act-more">Détails →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="act-dots" ref={actDotsRef}>
          {ACTIVITIES.map((a, i) => (
            <button key={a.id} className={`act-dot ${i === activeActivity ? "act-dot-on" : ""}`} onClick={() => setActivityManual(i)}>
              {a.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* SERVICES */}
      <Reveal as="section" className="sec" id="services">
        <div className="sec-head">
          <span className="sec-num">02</span>
          <h2 className="sec-t">Services</h2>
        </div>
        <div className="srv-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="srv-cell" onClick={() => setModal({ type: "service", data: s })}>
              <div className="srv-n">{s.name}</div>
              <div className="srv-d">{s.detail}</div>
              <span className="srv-more">+</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* TERRASSE */}
      <Reveal className="terrasse" style={{ paddingTop: 48 }}>
        <img src={PHOTOS.terrasse} alt="Terrasse avec vue sur la montagne" className="terrasse-img" />
        <div className="terrasse-caption">
          <span className="terrasse-caption-text">Terrasse · Resto-bar</span>
          <span className="terrasse-caption-tag">Vue sur la montagne</span>
        </div>
      </Reveal>

      {/* CAMP DE BASE */}
      <Reveal as="section" className="camp" id="camp">
        <div className="camp-inner">
          <img src={PHOTOS.camp} alt="Montagne" className="camp-img" />
          <div>
            <div className="camp-label">03 — Camp de base</div>
            <p className="camp-q">
              Garceau n'est pas qu'une station de ski.<br />
              C'est un lieu central de montagne — vivant, accueillant, rassembleur.
            </p>
            <p className="camp-p">
              Point de départ pour les sentiers. Point d'ancrage pour la journée.
              Lieu de retour après l'effort. La boutique, la terrasse, le belvédère,
              le pump track — tout part d'ici et tout y revient.
            </p>
            <p className="camp-p">
              À 90 minutes de Montréal, au cœur de Saint-Donat, Garceau est le
              camp de base naturel pour découvrir la montagne autrement.
            </p>
          </div>
        </div>
      </Reveal>

      {/* INFOS */}
      <Reveal as="section" className="sec" id="infos">
        <div className="sec-head">
          <span className="sec-num">04</span>
          <h2 className="sec-t">Infos pratiques</h2>
        </div>
        <div className="info-grid">
          <div className="info-cell">
            <div className="info-l">Adresse</div>
            <div className="info-v">190, chemin du Lac Blanc<br />Saint-Donat, QC  J0T 2C0</div>
          </div>
          <div className="info-cell">
            <div className="info-l">Contact</div>
            <div className="info-v">819 424-2784<br />1 800 GARCEAU<br />ski@skigarceau.com</div>
          </div>
          <div className="info-cell">
            <div className="info-l">Accès</div>
            <div className="info-v">90 min de Montréal<br />Stationnement gratuit<br />Bornes de recharge EV</div>
          </div>
          <div className="info-cell">
            <div className="info-l">Boutique & Resto-bar</div>
            <div className="info-v">Horaires à confirmer<br />pour la saison été 2026</div>
          </div>
        </div>

        <a href="https://skigarceau.com" target="_blank" rel="noopener noreferrer" className="wint">
          <div>
            <div className="wint-sub">Saison hivernale</div>
            <div className="wint-t">Voir le site hiver — skigarceau.com</div>
          </div>
          <span className="wint-arr">→</span>
        </a>
      </Reveal>

      {/* FOOTER */}
      <footer className="foot">
        <div>
          <div className="foot-brand"><span style={{ color: "var(--red)", marginRight: 8 }}>■</span>SKI GARCEAU — ÉTÉ 2026</div>
          <div className="foot-proto">PROTOTYPE — STUDIO MICHO</div>
        </div>
        <div className="foot-r">190, ch. du Lac Blanc, Saint-Donat<br />819 424-2784 · ski@skigarceau.com</div>
      </footer>

      {/* MODAL */}
      {modal && <Modal data={modal.data} type={modal.type} onClose={() => setModal(null)} />}
    </>
  );
}
