import { useState, useEffect, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const MEALS = [
  {
    id: 1, cat: "Nigerian Classic", name: "Party Jollof Rice & Chicken",
    price: "₦2,500", badge: "🔥 Most Popular",
    img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&q=80",
    wa: "Order%3A%20Jollof%20Rice%20%26%20Chicken",
    span: "mc1",
  },
  {
    id: 2, cat: "Soup & Swallow", name: "Egusi Soup & Pounded Yam",
    price: "₦3,000", badge: null,
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&q=80",
    wa: "Order%3A%20Egusi%20Soup%20%26%20Pounded%20Yam",
    span: "mc2",
  },
  {
    id: 3, cat: "Grilled Protein", name: "Beef Suya Skewers",
    price: "₦2,000", badge: "⭐ Chef's Pick",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    wa: "Order%3A%20Beef%20Suya%20Skewers",
    span: "mc3",
  },
  {
    id: 4, cat: "Rice Dish", name: "Nigerian Fried Rice & Stew",
    price: "₦2,500", badge: null,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    wa: "Order%3A%20Fried%20Rice%20%26%20Stew",
    span: "mc4",
  },
  {
    id: 5, cat: "Local Favourite", name: "Ofada Rice & Ayamase",
    price: "₦3,500", badge: null,
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    wa: "Order%3A%20Ofada%20Rice%20%26%20Ayamase",
    span: "mc5",
  },
  {
    id: 6, cat: "Traditional Soup", name: "Oha Soup & Eba",
    price: "₦3,000", badge: null,
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    wa: "Order%3A%20Oha%20Soup%20%26%20Eba",
    span: "mc6",
  },
  {
    id: 7, cat: "Best Value", name: "5-Day Office Meal Plan",
    price: "₦10,000/wk", badge: "💼 Office Plan",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    wa: "I%20want%20to%20subscribe%20to%20the%205-Day%20Meal%20Plan",
    span: "mc7",
  },
];

const TESTIMONIALS = [
  { stars:5, quote: "I've ordered every day for 3 months. The food is always fresh, portions are generous, and it arrives before my lunch break. Absolute game changer.", name:"Amaka Okafor", role:"Finance Officer · Garki, Abuja" },
  { stars:5, quote: "We subscribed our whole team. The jollof rice is unbeatable, prices are fair, and customer service via WhatsApp is instant. Highly recommended.", name:"Kelechi Eze", role:"HR Manager · Wuse 2, Abuja" },
  { stars:5, quote: "No more skipping lunch or eating overpriced fast food. Real home-style Nigerian meals at honest prices — all my colleagues order from them now.", name:"Bola Adewale", role:"Software Developer · Maitama, Abuja" },
];

const PLANS = [
  { name:"Starter Plan", detail:"5–10 employees · Daily delivery", price:"From ₦22,500/wk" },
  { name:"Team Plan", detail:"10–30 employees · Priority delivery", price:"From ₦55,000/wk" },
  { name:"Corporate Plan", detail:"30+ employees · Custom menu", price:"Custom Quote" },
];

const WA_BASE = "https://wa.me/2348000000000";
const waLink = (msg = "") => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

// ── HOOK: scroll reveal ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily:"'Jost',sans-serif", fontSize:"0.64rem", letterSpacing:"0.28em",
      textTransform:"uppercase", color:"#C9963A", fontWeight:400,
      display:"flex", alignItems:"center", gap:12, marginBottom:18,
    }}>
      <span style={{ display:"inline-block", width:30, height:1, background:"#C9963A" }} />
      {children}
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
      fontSize:"clamp(2.2rem,4vw,3.6rem)", lineHeight:1.15, color:"#F5EFE6",
      ...style,
    }}>
      {children}
    </h2>
  );
}

function GoldButton({ href, children, style }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display:"inline-flex", alignItems:"center", gap:8,
      background:"#C9963A", color:"#0A0806",
      padding:"13px 34px", borderRadius:2,
      fontFamily:"'Jost',sans-serif", fontSize:"0.7rem",
      letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600,
      textDecoration:"none", transition:"all 0.25s",
      ...style,
    }}
    onMouseEnter={e => Object.assign(e.currentTarget.style, { background:"#E8B86D", transform:"translateY(-2px)" })}
    onMouseLeave={e => Object.assign(e.currentTarget.style, { background:"#C9963A", transform:"translateY(0)" })}
    >
      {children}
    </a>
  );
}

function OutlineButton({ href, onClick, children, style }) {
  return (
    <a href={href} onClick={onClick} style={{
      display:"inline-flex", alignItems:"center", gap:8,
      border:"1px solid rgba(245,239,230,0.35)", color:"#F5EFE6",
      padding:"12px 32px", borderRadius:2,
      fontFamily:"'Jost',sans-serif", fontSize:"0.7rem",
      letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:500,
      textDecoration:"none", transition:"all 0.25s", cursor:"pointer",
      ...style,
    }}
    onMouseEnter={e => Object.assign(e.currentTarget.style, { borderColor:"#F5EFE6" })}
    onMouseLeave={e => Object.assign(e.currentTarget.style, { borderColor:"rgba(245,239,230,0.35)" })}
    >
      {children}
    </a>
  );
}

// ── MEAL CARD ────────────────────────────────────────────────────────────────
function MealCard({ meal, style }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        position:"relative", overflow:"hidden", borderRadius:4,
        cursor:"pointer", ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={meal.img} alt={meal.name}
        style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition:"transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div style={{
        position:"absolute", inset:0,
        background: hovered
          ? "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.3) 55%,transparent 100%)"
          : "linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.12) 55%,transparent 100%)",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:28, transition:"background 0.4s",
      }}>
        <div style={{ fontSize:"0.6rem", letterSpacing:"0.24em", textTransform:"uppercase", color:"#C9963A", marginBottom:6 }}>
          {meal.cat}
        </div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:600, color:"#fff", lineHeight:1.2, marginBottom:8 }}>
          {meal.name}
        </div>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          marginTop:12,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:600, color:"#E8B86D" }}>
            {meal.price}
          </span>
          <a href={waLink(meal.wa)} target="_blank" rel="noreferrer" style={{
            background:"#C9963A", color:"#0A0806",
            padding:"7px 18px", borderRadius:2,
            fontSize:"0.65rem", letterSpacing:"0.16em", textTransform:"uppercase",
            fontWeight:600, textDecoration:"none",
          }}>
            Order Now
          </a>
        </div>
      </div>
      {meal.badge && (
        <div style={{
          position:"absolute", top:16, right:16,
          background:"#C9963A", color:"#0A0806",
          fontSize:"0.6rem", letterSpacing:"0.14em", textTransform:"uppercase",
          padding:"5px 12px", borderRadius:2, fontWeight:600,
        }}>
          {meal.badge}
        </div>
      )}
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navStyle = {
    position:"fixed", top:0, left:0, right:0, zIndex:500,
    padding:"0 6%", height:76,
    display:"flex", alignItems:"center", justifyContent:"space-between",
    background: scrolled ? "rgba(10,8,6,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(201,150,58,0.15)" : "none",
    transition:"all 0.4s ease",
  };

  const navLinks = ["Menu","Why Us","About","Contact"];

  return (
    <>
      <nav style={navStyle}>
        <button onClick={() => setPage("home")} style={{
          background:"none", border:"none", cursor:"pointer",
          display:"flex", alignItems:"center", gap:12, color:"#F5EFE6",
        }}>
          <div style={{ width:36, height:36, border:"1px solid #C9963A", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", color:"#C9963A" }}>🍱</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:600, letterSpacing:"0.06em", lineHeight:1 }}>Daily Office Bites</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.6rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#C9963A", marginTop:3 }}>Abuja · Est. 2024</div>
          </div>
        </button>

        <div style={{ display:"flex", gap:36, listStyle:"none" }} className="desk-nav">
          {navLinks.map(l => (
            <button key={l} onClick={() => setPage(l.toLowerCase().replace(" ",""))}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"#D4C4A8", fontWeight:500, transition:"color 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.color="#F5EFE6"}
              onMouseLeave={e => e.currentTarget.style.color="#D4C4A8"}
            >
              {l}
            </button>
          ))}
        </div>

        <a href={waLink("Hello! I want to order office meals")} target="_blank" rel="noreferrer"
          style={{
            display:"flex", alignItems:"center", gap:8, background:"transparent",
            border:"1px solid #C9963A", color:"#C9963A",
            padding:"9px 20px", borderRadius:2,
            fontFamily:"'Jost',sans-serif", fontSize:"0.7rem",
            letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:500,
            textDecoration:"none", transition:"all 0.3s",
          }}
          onMouseEnter={e => Object.assign(e.currentTarget.style, { background:"#C9963A", color:"#0A0806" })}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { background:"transparent", color:"#C9963A" })}
          className="desk-nav"
        >
          💬 Order Now
        </a>

        <button onClick={() => setDrawerOpen(true)} className="mob-only"
          style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:5, padding:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width:22, height:1, background:"#F5EFE6", display:"block" }} />)}
        </button>
      </nav>

      {drawerOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:490, background:"rgba(10,8,6,0.97)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32 }}>
          <button onClick={() => setDrawerOpen(false)} style={{ position:"absolute", top:26, right:26, background:"none", border:"none", color:"#8A7A68", fontSize:"1.4rem", cursor:"pointer" }}>✕</button>
          {["Home","Menu","Why Us","About","Contact"].map(l => (
            <button key={l} onClick={() => { setPage(l.toLowerCase().replace(" ","")); setDrawerOpen(false); }}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", fontWeight:300, color:"#F5EFE6" }}
              onMouseEnter={e => e.currentTarget.style.color="#C9963A"}
              onMouseLeave={e => e.currentTarget.style.color="#F5EFE6"}
            >
              {l}
            </button>
          ))}
          <a href={waLink("Hello!")} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", fontWeight:300, color:"#C9963A", textDecoration:"none" }}>
            💬 Order
          </a>
        </div>
      )}
    </>
  );
}

// ── HERO PAGE ────────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
  return (
    <section style={{ position:"relative", height:"100vh", minHeight:700, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1800&q=80')",
        backgroundSize:"cover", backgroundPosition:"center",
        animation:"heroZoom 12s ease-in-out infinite alternate",
      }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(10,8,6,0.72) 0%,rgba(10,8,6,0.45) 50%,rgba(10,8,6,0.78) 100%)" }} />
      <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 24px", animation:"heroReveal 1.2s 0.3s both" }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.68rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"#C9963A", marginBottom:22, display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
          <span style={{ display:"inline-block", width:40, height:1, background:"#C9963A", opacity:0.7 }} />
          Fresh · Affordable · Delivered Daily
          <span style={{ display:"inline-block", width:40, height:1, background:"#C9963A", opacity:0.7 }} />
        </div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,7vw,6.5rem)", fontWeight:300, lineHeight:1.08, color:"#fff", marginBottom:24 }}>
          Real Nigerian Meals.<br />
          <em style={{ color:"#E8B86D", fontStyle:"italic" }}>Right At Your Desk.</em>
        </h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em", color:"#D4C4A8", fontWeight:300, maxWidth:480, margin:"0 auto 44px", lineHeight:1.8 }}>
          No cooking, no stress — quality office meals delivered across Abuja every working day. Order by 9AM, eat by noon.
        </p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
          <GoldButton href={waLink("Hello! I want to order office meals")}>💬 Order on WhatsApp</GoldButton>
          <OutlineButton onClick={() => setPage("menu")}>View Today's Menu</OutlineButton>
        </div>
      </div>
      <div
        onClick={() => document.getElementById("howSection")?.scrollIntoView({ behavior:"smooth" })}
        style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#8A7A68", cursor:"pointer", animation:"bounce 2.5s infinite" }}
      >
        <div style={{ width:1, height:36, background:"linear-gradient(to bottom, transparent, #C9963A)" }} />
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Jollof Rice","Egusi Soup","Suya Skewers","Pounded Yam","Ofada Rice","Fried Rice","Oha Soup","Bitterleaf Stew","Yam Porridge"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:"#C9963A", padding:"14px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", animation:"marquee 22s linear infinite", whiteSpace:"nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#0A0806", fontWeight:600, padding:"0 32px", display:"inline-flex", alignItems:"center", gap:32 }}>
            {item}
            <span style={{ width:4, height:4, background:"#0A0806", borderRadius:"50%", opacity:0.5, display:"inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <Marquee />

      {/* HOW IT WORKS */}
      <section id="howSection" style={{ padding:"110px 6%", background:"#110E0B" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:100, alignItems:"center" }}>
          <Reveal>
            <div style={{ position:"relative", height:560 }}>
              <div style={{ position:"absolute", top:0, left:0, width:"75%", height:"82%", borderRadius:4, overflow:"hidden" }}>
                <img src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&q=80" alt="Cooking" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, width:"52%", height:"50%", borderRadius:4, overflow:"hidden", border:"4px solid #110E0B" }}>
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" alt="Delivered meal" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ position:"absolute", top:"50%", left:"58%", transform:"translate(-50%,-50%)", background:"#C9963A", width:90, height:90, borderRadius:"50%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:2, animation:"rotateSlow 20s linear infinite" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, lineHeight:1, color:"#0A0806" }}>3</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.55rem", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, color:"#0A0806" }}>Steps</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <SectionLabel>How It Works</SectionLabel>
            <SectionTitle style={{ marginBottom:0 }}>Simple. <em style={{ fontStyle:"italic", color:"#E8B86D" }}>Seamless.</em><br />Satisfying.</SectionTitle>
            <div style={{ marginTop:44, display:"flex", flexDirection:"column", gap:0 }}>
              {[
                { n:"01", title:"Browse the Menu", body:"Check our daily rotating menu of fresh Nigerian classics — jollof, egusi, ofada rice, suya, and more." },
                { n:"02", title:"Order via WhatsApp", body:"Send your order, office address, and quantity by 9AM. We confirm instantly and get your meal cooking." },
                { n:"03", title:"Enjoy at Your Desk", body:"Fresh, hot, and beautifully packaged — your meal arrives before your lunch break. Every single day." },
              ].map(step => (
                <div key={step.n} style={{ display:"flex", gap:24, padding:"28px 0", borderBottom:"1px solid rgba(201,150,58,0.12)" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:300, color:"rgba(201,150,58,0.2)", minWidth:56, lineHeight:1 }}>{step.n}</span>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:600, color:"#F5EFE6", marginBottom:6 }}>{step.title}</h3>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.83rem", color:"#8A7A68", lineHeight:1.7, fontWeight:300 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section style={{ padding:"100px 6%", background:"#0A0806" }}>
        <Reveal>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:24 }}>
            <div>
              <SectionLabel>Our Menu</SectionLabel>
              <SectionTitle>Daily Nigerian<br /><em style={{ fontStyle:"italic", color:"#E8B86D" }}>Favourites</em></SectionTitle>
            </div>
            <OutlineButton onClick={() => setPage("menu")}>See Full Menu →</OutlineButton>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(12,1fr)", gridTemplateRows:"auto", gap:16 }}>
            {MEALS.map((meal) => {
              const spans = { mc1:"span 5", mc2:"span 7", mc3:"span 4", mc4:"span 4", mc5:"span 4", mc6:"span 6", mc7:"span 6" };
              const heights = { mc1:400, mc2:400, mc3:340, mc4:340, mc5:340, mc6:360, mc7:360 };
              return (
                <MealCard key={meal.id} meal={meal} style={{ gridColumn: spans[meal.span], height: heights[meal.span] }} />
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* WHY US */}
      <section style={{ padding:"100px 6%", background:"#1A1410" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <Reveal>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
              {[
                { icon:"💰", title:"Truly Affordable", body:"Meals from ₦2,000. Every office worker deserves a fresh, quality lunch without spending a fortune daily." },
                { icon:"🥘", title:"Freshly Cooked", body:"Every meal is made that morning by our partner cooks. No reheating, no preservatives — real daily-fresh food." },
                { icon:"⏰", title:"Always On Time", body:"We know office schedules. Your meal arrives before your lunch break — reliably, every single working day." },
                { icon:"🛡️", title:"Safe & Hygienic", body:"Prepared in supervised kitchens, sealed in food-safe containers, and quality-checked before every dispatch." },
              ].map(c => (
                <div key={c.title} style={{ background:"#231C16", padding:"36px 30px", transition:"background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(201,150,58,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background="#231C16"}
                >
                  <span style={{ fontSize:"1.6rem", display:"block", marginBottom:16 }}>{c.icon}</span>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:600, color:"#F5EFE6", marginBottom:8 }}>{c.title}</h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", color:"#8A7A68", lineHeight:1.75, fontWeight:300 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <SectionLabel>Why Choose Us</SectionLabel>
            <SectionTitle>The Smart Way to <em style={{ fontStyle:"italic", color:"#E8B86D" }}>Feed Your Office</em></SectionTitle>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#8A7A68", lineHeight:1.85, fontWeight:300, maxWidth:500, margin:"24px 0 32px" }}>
              We're not a restaurant. We're a food supply partner — purpose-built for offices and busy professionals across Abuja. Real Nigerian food, real value, real reliability.
            </p>
            <div style={{ display:"flex", gap:40, paddingTop:32, borderTop:"1px solid rgba(201,150,58,0.15)", marginBottom:40 }}>
              {[{ n:"200+", l:"Meals Daily" },{ n:"50+", l:"Offices Served" },{ n:"4.9★", l:"Avg Rating" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.8rem", fontWeight:300, color:"#E8B86D", lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"#8A7A68", marginTop:6 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <GoldButton href={waLink("Hello! I want to start ordering")}>💬 Start Ordering Today</GoldButton>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"100px 6%", background:"#0A0806" }}>
        <Reveal>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ marginBottom:64 }}>
              <SectionLabel>Testimonials</SectionLabel>
              <SectionTitle>What Our <em style={{ fontStyle:"italic", color:"#E8B86D" }}>Customers</em> Say</SectionTitle>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background:"#1A1410", padding:"44px 36px", transition:"background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#231C16"}
                  onMouseLeave={e => e.currentTarget.style.background="#1A1410"}
                >
                  <div style={{ color:"#C9963A", fontSize:"0.85rem", letterSpacing:3, marginBottom:20 }}>{"★".repeat(t.stars)}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:300, fontStyle:"italic", color:"#F5EFE6", lineHeight:1.7, marginBottom:28 }}>"{t.quote}"</p>
                  <div style={{ width:30, height:1, background:"#C9963A", marginBottom:20, opacity:0.6 }} />
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#D4C4A8", fontWeight:500 }}>{t.name}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.73rem", color:"#8A7A68", marginTop:4 }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", padding:"140px 6%", textAlign:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&q=80')", backgroundSize:"cover", backgroundPosition:"center" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(10,8,6,0.82)" }} />
        <Reveal style={{ position:"relative", zIndex:2 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:300, color:"#fff", marginBottom:16 }}>
            Ready to Eat<br /><em style={{ fontStyle:"italic", color:"#E8B86D" }}>Better at Work?</em>
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", color:"#D4C4A8", marginBottom:44, fontWeight:300, letterSpacing:"0.06em" }}>
            Join 200+ office workers across Abuja already enjoying daily fresh Nigerian meals.
          </p>
          <a href={waLink("Hello! I want to start ordering from Daily Office Bites")} target="_blank" rel="noreferrer"
            style={{ background:"#25D366", color:"#fff", padding:"16px 44px", borderRadius:2, fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:600, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, boxShadow:"0 8px 32px rgba(37,211,102,0.3)" }}>
            💬 Order on WhatsApp Now
          </a>
        </Reveal>
      </section>
    </>
  );
}

// ── MENU PAGE ────────────────────────────────────────────────────────────────
function MenuPage() {
  return (
    <section style={{ padding:"120px 6% 90px", background:"#0A0806", minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <SectionLabel>Full Menu</SectionLabel>
          <SectionTitle style={{ marginBottom:12 }}>Every Meal, <em style={{ fontStyle:"italic", color:"#E8B86D" }}>Daily Fresh</em></SectionTitle>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#8A7A68", lineHeight:1.85, maxWidth:560, marginBottom:60 }}>Order by 9AM for same-day lunchtime delivery. All meals freshly cooked each morning.</p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:16 }}>
            {MEALS.map(meal => (
              <MealCard key={meal.id} meal={meal} style={{ height:320 }} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ marginTop:60, background:"#C9963A", borderRadius:4, padding:40, textAlign:"center" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"#0A0806", marginBottom:10 }}>Can't decide? Let us choose for you.</h3>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", color:"rgba(10,8,6,0.7)", marginBottom:24 }}>Subscribe to our 5-Day Office Plan — a fresh, rotating meal every day of the work week.</p>
            <a href={waLink("I want to subscribe to the 5-Day Office Meal Plan")} target="_blank" rel="noreferrer"
              style={{ background:"#0A0806", color:"#C9963A", padding:"13px 36px", borderRadius:2, fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
              💬 Subscribe on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <section style={{ padding:"120px 6% 90px", background:"#110E0B", minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <Reveal>
            <div style={{ position:"relative", height:580 }}>
              <div style={{ position:"absolute", top:0, right:0, width:"80%", height:"75%", borderRadius:4, overflow:"hidden" }}>
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=80" alt="Our partner cook" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, width:"55%", height:"48%", borderRadius:4, overflow:"hidden", border:"4px solid #110E0B" }}>
                <img src="https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=500&q=80" alt="Fresh ingredients" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <SectionLabel>Our Story</SectionLabel>
            <SectionTitle>Your Office's <em style={{ fontStyle:"italic", color:"#E8B86D" }}>Kitchen Partner</em></SectionTitle>
            <div style={{ marginTop:24 }}>
              {["Daily Office Bites was born from a simple truth: thousands of office workers in Abuja skip lunch, grab unhealthy snacks, or overpay for fast food every single day. We set out to change that.","We're not a restaurant. We partner with vetted, experienced home cooks across Abuja — coordinating fresh meal preparation, packaging, and delivery directly to office doors, every working day.","Every meal is cooked fresh that morning, quality-checked before dispatch, and delivered in sealed food-safe packaging. No shortcuts. No compromises."].map((p, i) => (
                <p key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", color:"#8A7A68", lineHeight:1.9, marginBottom:16, fontWeight:300 }}>{p}</p>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:32 }}>
              {["Freshly Cooked Daily","Hygienic & Sealed","Experienced Cooks","Consistent Quality"].map(p => (
                <div key={p} style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4C4A8", fontWeight:500 }}>
                  <span style={{ width:20, height:1, background:"#C9963A", flexShrink:0, display:"inline-block" }} />
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("Daily personal meal delivery");
  const [msg, setMsg] = useState("");

  const submitWA = () => {
    const text = `Hello Daily Office Bites! My name is ${name || "a customer"}${phone ? ", " + phone : ""}. I'd like to enquire about ${service}. ${msg}`;
    window.open(waLink(text), "_blank");
  };

  const inputStyle = {
    width:"100%", padding:"13px 16px",
    background:"#231C16", border:"1px solid rgba(201,150,58,0.2)", borderRadius:2,
    color:"#F5EFE6", fontFamily:"'Jost',sans-serif", fontSize:"0.88rem",
    fontWeight:300, outline:"none",
  };
  const labelStyle = { display:"block", fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"#8A7A68", marginBottom:8, fontWeight:500 };

  return (
    <section style={{ padding:"120px 6% 90px", background:"#1A1410", minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }}>
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>We're Just a<br /><em style={{ fontStyle:"italic", color:"#E8B86D" }}>Message Away</em></SectionTitle>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#8A7A68", lineHeight:1.85, fontWeight:300, maxWidth:500, margin:"24px 0 44px" }}>
            WhatsApp is the fastest way to reach us. We reply within minutes and confirm orders instantly.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { icon:"💬", label:"WhatsApp (Fastest)", value:"+234 800 000 0000", href:waLink("Hello!") },
              { icon:"📞", label:"Phone Call", value:"+234 800 000 0000", href:"tel:+2348000000000" },
              { icon:"📍", label:"Service Area", value:"Abuja FCT, Nigeria", href:null },
              { icon:"🕘", label:"Order Deadline", value:"9:00 AM Daily (Mon–Fri)", href:null },
            ].map((ch, i) => (
              <a key={i} href={ch.href || "#"} target={ch.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                style={{ display:"flex", alignItems:"center", gap:18, padding:"22px 0", borderBottom:"1px solid rgba(201,150,58,0.12)", textDecoration:"none", color:"#F5EFE6", transition:"padding 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft="8px"}
                onMouseLeave={e => e.currentTarget.style.paddingLeft="0"}
              >
                <div style={{ width:44, height:44, border:"1px solid rgba(201,150,58,0.3)", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>
                  {ch.icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"#8A7A68" }}>{ch.label}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.92rem", marginTop:3 }}>{ch.value}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(201,150,58,0.08)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:2, padding:"16px 20px", marginTop:32 }}>
            <span style={{ fontSize:"1.4rem" }}>⏰</span>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", color:"#D4C4A8", lineHeight:1.6 }}>
              <strong style={{ color:"#E8B86D" }}>Order by 9:00 AM</strong> for same-day lunchtime delivery. Late orders are scheduled for the next working day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"#F5EFE6", marginBottom:32 }}>Send a Message</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <label style={labelStyle}>Your Name</label>
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Amaka Johnson"
                onFocus={e => e.target.style.borderColor="#C9963A"} onBlur={e => e.target.style.borderColor="rgba(201,150,58,0.2)"} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder="08012345678"
                onFocus={e => e.target.style.borderColor="#C9963A"} onBlur={e => e.target.style.borderColor="rgba(201,150,58,0.2)"} />
            </div>
          </div>
          <div style={{ marginTop:16 }}>
            <label style={labelStyle}>Office Address</label>
            <input style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. Plot 234, Wuse 2, Abuja"
              onFocus={e => e.target.style.borderColor="#C9963A"} onBlur={e => e.target.style.borderColor="rgba(201,150,58,0.2)"} />
          </div>
          <div style={{ marginTop:16 }}>
            <label style={labelStyle}>Enquiry Type</label>
            <select style={{ ...inputStyle, cursor:"pointer" }} value={service} onChange={e => setService(e.target.value)}>
              {["Daily personal meal delivery","Weekly meal plan subscription","Bulk office order (5+ people)","Corporate meal subscription","General enquiry"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginTop:16 }}>
            <label style={labelStyle}>Message</label>
            <textarea style={{ ...inputStyle, minHeight:110, resize:"vertical" }} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Meal preferences, dietary needs, or questions…"
              onFocus={e => e.target.style.borderColor="#C9963A"} onBlur={e => e.target.style.borderColor="rgba(201,150,58,0.2)"} />
          </div>
          <button onClick={submitWA} style={{ width:"100%", marginTop:20, background:"#C9963A", color:"#0A0806", border:"none", padding:14, borderRadius:2, fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:600, cursor:"pointer", transition:"background 0.25s" }}
            onMouseEnter={e => e.currentTarget.style.background="#E8B86D"}
            onMouseLeave={e => e.currentTarget.style.background="#C9963A"}
          >
            Send via WhatsApp →
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#0A0806", borderTop:"1px solid rgba(201,150,58,0.12)", padding:"70px 6% 36px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:60, paddingBottom:50, borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:36 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:300, color:"#F5EFE6", marginBottom:6 }}>Daily Office Bites</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#C9963A", marginBottom:18 }}>Fresh · Affordable · Reliable</div>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", color:"#8A7A68", lineHeight:1.7, maxWidth:220, fontWeight:300 }}>Fresh Nigerian office meals delivered daily across Abuja. We're your kitchen partner.</p>
          </div>
          {[
            { title:"Navigate", links:[["Home","home"],["Menu","menu"],["About","about"],["Contact","contact"]] },
            { title:"Services", links:[["Daily Meals","menu"],["Weekly Plans","menu"],["Bulk Orders","contact"],["Office Subs","contact"]] },
            { title:"Contact", links:[["💬 WhatsApp",null],["📞 Call Us",null],["📍 Abuja, NG",null],["Mon–Fri 7AM–3PM",null]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#C9963A", marginBottom:20, fontWeight:500 }}>{col.title}</h4>
              {col.links.map(([text, page]) => (
                <button key={text} onClick={() => page && setPage(page)} style={{ display:"block", background:"none", border:"none", cursor: page ? "pointer" : "default", fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", color:"#8A7A68", marginBottom:12, padding:0, transition:"color 0.2s", fontWeight:300 }}
                  onMouseEnter={e => e.currentTarget.style.color="#F5EFE6"}
                  onMouseLeave={e => e.currentTarget.style.color="#8A7A68"}
                >
                  {text}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", color:"#8A7A68", fontWeight:300 }}>© 2025 Daily Office Bites. All rights reserved. Proudly serving Abuja, Nigeria.</p>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", color:"#8A7A68", fontWeight:300 }}>Food Delivery Abuja · Office Meals Abuja</p>
        </div>
      </div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:#0A0806; color:#F5EFE6; overflow-x:hidden; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#110E0B; }
        ::-webkit-scrollbar-thumb { background:#C9963A; border-radius:2px; }
        @keyframes heroZoom { from{transform:scale(1.05)} to{transform:scale(1.12)} }
        @keyframes heroReveal { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes rotateSlow { from{transform:translate(-50%,-50%) rotate(0)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes bounce { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,8px)} }
        @keyframes fabPulse { 0%,100%{box-shadow:0 6px 28px rgba(37,211,102,0.45)} 50%{box-shadow:0 6px 44px rgba(37,211,102,0.65),0 0 0 10px rgba(37,211,102,0.08)} }
        .desk-nav { display:flex!important; }
        .mob-only { display:none!important; }
        @media(max-width:768px){
          .desk-nav { display:none!important; }
          .mob-only { display:flex!important; }
        }
      `}</style>

      {/* WhatsApp FAB */}
      <a href={waLink("Hello! I want to order office meals")} target="_blank" rel="noreferrer"
        style={{ position:"fixed", bottom:28, right:28, zIndex:600, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", textDecoration:"none", animation:"fabPulse 3s infinite" }}>
        💬
      </a>

      <Nav page={page} setPage={(p) => { setPage(p); }} />

      <main>
        {page === "home"    && <HomePage setPage={setPage} />}
        {page === "menu"    && <MenuPage />}
        {page === "whyus"   && <HomePage setPage={setPage} />}
        {page === "about"   && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer setPage={setPage} />
    </>
  );
}