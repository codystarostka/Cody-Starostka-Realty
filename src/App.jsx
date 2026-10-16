import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ---------- Contact info and links (edit here) ---------- */
const FORM_URL = "https://formspree.io/f/mlgzdlqq";
const MI_PHONE = { display: "(616) 251-9092", raw: "+16162519092" };
const IL_PHONE = { display: "(708) 310-9619", raw: "+17083109619" };
const EMAIL = "codystarostka@gmail.com";
const INSTAGRAM = "https://www.instagram.com/codystarhomes";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61590030689247";
const GOOGLE_REVIEWS = "https://share.google/nNwyRksNX4hQyj49c";
const GOOGLE_WRITE_REVIEW = "https://g.page/r/CXLUuu0R19LTEBM/review";
const HOMES_PROFILE = "https://www.homes.com/real-estate-agents/cody-starostka/3d1h49e/";

const CONSENT =
  "By submitting, you agree to be contacted by call, text or email about your request. Message and data rates may apply. Reply STOP to opt out of texts.";

/* ---------- Content ---------- */
const GALLERY = [
  { src: "/images/gallery-1-brick-home.jpg", alt: "Brick and siding home with black garage doors" },
  { src: "/images/gallery-2-coffered-living-room.jpg", alt: "Living room with coffered ceiling and hardwood floors" },
  { src: "/images/gallery-3-split-level-home.jpg", alt: "Tan split-level home with brown garage door and landscaping" },
  { src: "/images/gallery-4-accent-wall-living-room.jpg", alt: "Living room with black accent wall and fireplace" },
  { src: "/images/gallery-5-cape-home-fall.jpg", alt: "White cape-style home surrounded by fall trees" },
  { src: "/images/gallery-6-hardwood-entry.jpg", alt: "Entry with red hardwood floors and staircase" },
  { src: "/images/gallery-7-drone-aerial.jpg", alt: "Drone aerial of fall foliage along a river" },
  { src: "/images/gallery-8-tan-brick-home.jpg", alt: "Tan brick home with attached garage" },
  { src: "/images/gallery-9-back-deck.jpg", alt: "Back deck with patio table and umbrella" },
];

const STEPS = [
  { n: "01", title: "Launch", text: "Professional photography, drone aerials and marketing from day one." },
  { n: "02", title: "Showings", text: "I vet every showing request and make sure buyers are pre-approved." },
  { n: "03", title: "Offers", text: "Contract review and negotiation on your behalf." },
  { n: "04", title: "Closing", text: "Updates at every step, all the way through closing." },
];

const BUYER_CARDS = [
  { title: "First-time buyers", text: "From pre-approval to closing, I make sure nothing is a surprise and that you feel confident at every stage." },
  { title: "Investors", text: "Single-family rentals, multi-units, fix-and-flips and Section 8 / HCV properties, with a focus on the numbers behind the deal." },
  { title: "Relocating or building", text: "Moving between Chicagoland and West Michigan, or buying new construction, vacant lots or teardown properties." },
];

const FEATURED_REVIEW = {
  name: "Zack, home seller",
  quote:
    "Honestly, where do I even begin? Cody made the entire process incredibly easy for us from start to finish. We were able to be very hands-off because he took care of everything and made sure the process went smoothly every step of the way. Selling a home can be stressful, but Cody made it feel effortless. This was, without a doubt, the easiest home-selling experience I’ve ever had. We couldn’t be happier with the service he provided and would absolutely recommend him to anyone looking to buy or sell a home!",
};

const REVIEWS = [
  { name: "Brian", quote: "Working with Cody was a great experience from start to finish. He was always available to answer my questions and made everything feel simple and stress-free." },
  { name: "Shaun", quote: "If you are looking for someone who truly understands the numbers behind investment properties, Cody really stands out. His knowledge gave me a lot of confidence." },
  { name: "Lucas", quote: "Cody is dependable and easy to work with. I would definitely suggest him to anyone looking for help." },
  { name: "Javier", quote: "Cody genuinely cares about his clients. He is approachable, easy to talk to, and always had my best interests in mind, which made the whole experience feel different in a good way." },
];

const FAQS = [
  { q: "How much does it cost to sell with you?", a: "Real estate commissions are negotiable. I offer competitive pricing compared to traditional commission structures, so you can save money without giving up service. Reach out by call, text or the form and I'll give you a quote." },
  { q: "Do I pay anything if my home doesn't sell?", a: "No. No sale, no fee. I don't get paid unless your home sells." },
  { q: "Do you work with first-time home buyers?", a: "Absolutely, and it's one of my favorite parts of the job. I walk buyers through every step from pre-approval to closing. I make sure nothing is a surprise and that you feel confident at every stage." },
  { q: "Can you help me relocate from Chicago to Michigan?", a: "Yes, this is one of my most common situations. I help clients sell their Chicago-area home and buy in West Michigan at the same time, so the move goes smoothly." },
  { q: "Do you work with real estate investors?", a: "Yes. I work with buyers and sellers of investment properties, including single-family rentals, multi-units, fix-and-flips and Section 8 / HCV properties across the Chicago metro and suburbs." },
  { q: "What is the best neighborhood to buy in Chicago?", a: "It depends on your goals. For first-time buyers, the Southwest suburbs like Orland Park and Tinley Park offer great value. For investment, the South suburbs have strong rental demand. For lifestyle, Lincoln Park and Lakeview are hard to beat." },
  { q: "Is Holland, Michigan a good place to buy a vacation home?", a: "Yes. Holland is one of the most popular vacation home markets in the Midwest, with Lake Michigan beaches, a charming downtown and a strong short-term rental market. Saugatuck and Grand Haven nearby are also excellent options." },
  { q: "How many properties have you closed?", a: "More than 115 closed transactions across Chicagoland and West Michigan. I've helped buyers, sellers and investors with homes, vacant lots, new construction, teardown properties, flips and more." },
];

/* ---------- Helpers ---------- */
async function sendLead(data) {
  const res = await fetch(FORM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Form failed");
}

function splitContact(value) {
  const v = value.trim();
  return v.includes("@") ? { email: v, phone: "" } : { email: "", phone: v };
}

function go(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function safeGet(key) {
  try { return window.sessionStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { window.sessionStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

/* ---------- Small components ---------- */
function Stars() {
  const path = "M8 0l2.4 5.2 5.6.6-4.2 3.8 1.2 5.5L8 12.3 3 15.1l1.2-5.5L0 5.8l5.6-.6z";
  return (
    <svg width="92" height="16" viewBox="0 0 92 16" role="img" aria-label="5 out of 5 stars" fill="#ffb347">
      {[0, 18, 36, 54, 72].map((x) => (
        <path key={x} d={path} transform={"translate(" + x + " 0)"} />
      ))}
    </svg>
  );
}

function Thanks({ title }) {
  return (
    <div className="thanks">
      <div className="serif thanks-title">{title || "Got it, thank you."}</div>
      <p>
        I'll reach out within 24 hours with your free home value report and pricing breakdown. Want to talk now? Call or text me.
      </p>
      <p className="thanks-nums">
        <a href={"tel:" + MI_PHONE.raw}>West Michigan {MI_PHONE.display}</a>
        <a href={"tel:" + IL_PHONE.raw}>Chicagoland {IL_PHONE.display}</a>
      </p>
    </div>
  );
}

function ReportForm({ source, idPrefix }) {
  const [f, setF] = useState({ name: "", address: "", contact: "" });
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!f.name.trim() || !f.address.trim() || !f.contact.trim()) {
      setState("missing");
      return;
    }
    setState("sending");
    const c = splitContact(f.contact);
    sendLead({ name: f.name, address: f.address, email: c.email, phone: c.phone, form_source: source })
      .then(() => setState("done"))
      .catch(() => setState("error"));
  }

  if (state === "done") return <Thanks />;

  return (
    <form onSubmit={submit} className="form" noValidate>
      <div className="field">
        <label htmlFor={idPrefix + "-name"}>Name</label>
        <input id={idPrefix + "-name"} type="text" autoComplete="name" placeholder="Your name" value={f.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label htmlFor={idPrefix + "-addr"}>Property address</label>
        <input id={idPrefix + "-addr"} type="text" autoComplete="street-address" placeholder="Street, city" value={f.address} onChange={set("address")} />
      </div>
      <div className="field">
        <label htmlFor={idPrefix + "-contact"}>Phone or email</label>
        <input id={idPrefix + "-contact"} type="text" autoComplete="email" placeholder="Best way to reach you" value={f.contact} onChange={set("contact")} />
      </div>
      <button type="submit" className="btn btn-full" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Get My Free Report"}
      </button>
      {state === "missing" && <p className="form-msg" role="alert">Please fill in your name, property address and a phone or email.</p>}
      {state === "error" && (
        <p className="form-msg" role="alert">
          Something went wrong. Please call or text {MI_PHONE.display} (Michigan) or {IL_PHONE.display} (Chicagoland).
        </p>
      )}
      <p className="consent">{CONSENT}</p>
    </form>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: "", address: "", contact: "", goal: "", how: "" });
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!f.name.trim() || !f.contact.trim()) {
      setState("missing");
      return;
    }
    setState("sending");
    const c = splitContact(f.contact);
    sendLead({
      name: f.name,
      address: f.address,
      email: c.email,
      phone: c.phone,
      looking_to: f.goal,
      best_way_to_reach: f.how,
      form_source: "Contact Form",
    })
      .then(() => setState("done"))
      .catch(() => setState("error"));
  }

  if (state === "done") return <Thanks />;

  return (
    <form onSubmit={submit} className="form" noValidate>
      <div className="serif form-title">Get my free report</div>
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" type="text" autoComplete="name" placeholder="Your name" value={f.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label htmlFor="c-addr">Property address (if selling)</label>
        <input id="c-addr" type="text" autoComplete="street-address" placeholder="Street, city" value={f.address} onChange={set("address")} />
      </div>
      <div className="field">
        <label htmlFor="c-contact">Phone or email</label>
        <input id="c-contact" type="text" autoComplete="email" placeholder="Best way to reach you" value={f.contact} onChange={set("contact")} />
      </div>
      <fieldset className="radios">
        <legend>I'm looking to</legend>
        {["Sell", "Buy", "Both"].map((o) => (
          <label key={o} className="radio">
            <input type="radio" name="goal" value={o} checked={f.goal === o} onChange={set("goal")} />
            {o}
          </label>
        ))}
      </fieldset>
      <fieldset className="radios">
        <legend>Best way to reach me</legend>
        {["Call", "Text", "Email"].map((o) => (
          <label key={o} className="radio">
            <input type="radio" name="how" value={o} checked={f.how === o} onChange={set("how")} />
            {o}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="btn btn-full" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Get My Free Report"}
      </button>
      {state === "missing" && <p className="form-msg" role="alert">Please add your name and a phone or email.</p>}
      {state === "error" && (
        <p className="form-msg" role="alert">
          Something went wrong. Please call or text {MI_PHONE.display} (Michigan) or {IL_PHONE.display} (Chicagoland).
        </p>
      )}
      <p className="consent">{CONSENT}</p>
      <p className="consent">
        Prefer to talk? Call or text the number for your market.{" "}
        <a href="/privacy.html">Privacy Policy</a>
      </p>
    </form>
  );
}

function CallTextMenu({ onNavigate }) {
  return (
    <div className="ct-panel">
      <div className="ct-row">
        <span>West Michigan</span>
        <a className="btn btn-sm" href={"tel:" + MI_PHONE.raw} onClick={onNavigate}>Call</a>
        <a className="btn btn-sm btn-outline" href={"sms:" + MI_PHONE.raw} onClick={onNavigate}>Text</a>
      </div>
      <div className="ct-row">
        <span>Chicagoland</span>
        <a className="btn btn-sm" href={"tel:" + IL_PHONE.raw} onClick={onNavigate}>Call</a>
        <a className="btn btn-sm btn-outline" href={"sms:" + IL_PHONE.raw} onClick={onNavigate}>Text</a>
      </div>
    </div>
  );
}

function ReportPopup({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>&times;</button>
        <h2 id="popup-title" className="serif popup-title">Thinking About Selling? Start With the Numbers.</h2>
        <p className="popup-sub">Free home value report and pricing breakdown. No pressure, no obligation.</p>
        <ReportForm source="Popup" idPrefix="p" />
      </div>
    </div>
  );
}

function Lightbox({ index, onClose, onMove }) {
  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onMove]);

  if (index === null) return null;
  const img = GALLERY[index];
  return (
    <div className="overlay dark" onClick={onClose}>
      <button type="button" className="lb-btn lb-close" aria-label="Close photo" onClick={onClose}>&times;</button>
      <button type="button" className="lb-btn lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onMove(-1); }}>&#8249;</button>
      <img className="lb-img" src={img.src} alt={img.alt} onClick={(e) => e.stopPropagation()} />
      <button type="button" className="lb-btn lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onMove(1); }}>&#8250;</button>
    </div>
  );
}

/* ---------- Page ---------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctOpen, setCtOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [lb, setLb] = useState(null);

  // Popup once per visit after 25 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!safeGet("popup_shown")) {
        setPopupOpen(true);
        safeSet("popup_shown", "1");
      }
    }, 25000);
    return () => clearTimeout(t);
  }, []);

  const moveLb = (d) => setLb((i) => (i === null ? null : (i + d + GALLERY.length) % GALLERY.length));
  const jump = (id) => (e) => { e.preventDefault(); setMenuOpen(false); go(id); };

  return (
    <div className="cs">
      <style>{CSS}</style>

      {/* NAV */}
      <header className="nav">
        <div className="nav-in">
          <a href="/" className="brand">
            <span className="serif brand-name">Cody Starostka</span>
            <span className="brand-sub">Realtor · eXp Realty · The Axon Group</span>
          </a>
          <nav className="nav-links" aria-label="Main">
            <a href="#markets" onClick={jump("markets")}>Markets</a>
            <a href="#about" onClick={jump("about")}>About</a>
            <Link to="/axon-group">My Team</Link>
            <Link to="/blog">Blog</Link>
            <div className="ct-wrap">
              <button type="button" className="btn btn-sm" aria-expanded={ctOpen} onClick={() => setCtOpen(!ctOpen)}>Call / Text</button>
              {ctOpen && <CallTextMenu onNavigate={() => setCtOpen(false)} />}
            </div>
          </nav>
          <button type="button" className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <div className="mob-menu">
            <a href="#markets" onClick={jump("markets")}>Markets</a>
            <a href="#about" onClick={jump("about")}>About</a>
            <Link to="/axon-group">My Team</Link>
            <Link to="/blog">Blog</Link>
            <a href="#contact" onClick={jump("contact")}>Free home value report</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero">
        <img className="hero-img heroA" src="/images/gallery-1-brick-home.jpg" alt="Brick home with black garage doors under a blue sky" />
        <img className="hero-img heroB" src="/images/gallery-7-drone-aerial.jpg" alt="Drone aerial of fall colors over a Michigan river" />
        <div className="hero-shade" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <div className="who">
              <img src="/images/cody-headshot.jpg" alt="Cody Starostka" className="who-img" />
              <div className="who-text">
                <span className="serif who-name">Cody Starostka</span>
                <a href={GOOGLE_REVIEWS} className="who-stars" target="_blank" rel="noopener noreferrer">
                  <Stars />
                  Rated 5 stars on Google
                </a>
              </div>
            </div>
            <div className="eyebrow">West Michigan · Chicagoland</div>
            <h1 className="serif hero-h1">Get premium service without paying the premium price.</h1>
            <p className="hero-p">
              I handle everything from photography to closing day, and I only get paid when your home sells. 115+ closings across Chicagoland and West Michigan.
            </p>
            <div className="hero-btns">
              <a href="#work" className="btn btn-ghost" onClick={jump("work")}>See my work</a>
            </div>
            <div className="hero-facts">
              <span>115+ closings</span>
              <span>5-star Google reviews</span>
              <span>The Axon Group</span>
              <a href="#buy" onClick={jump("buy")}>Looking to buy? Let's talk</a>
            </div>
          </div>
          <div className="hero-form card-form">
            <div className="serif form-title">What's my home worth?</div>
            <p className="form-sub">Free home value report and personalized pricing breakdown. No pressure, no obligation.</p>
            <ReportForm source="Hero Form" idPrefix="h" />
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section id="markets" className="sec wrap">
        <div className="sec-head">
          <h2 className="serif">Two markets, one agent</h2>
          <p>Whether you're selling in West Michigan or Chicagoland, you get the same marketing, the same pricing approach and the same person answering your calls.</p>
        </div>
        <div className="grid-2">
          <div className="market">
            <div className="serif market-name">West Michigan</div>
            <p>Selling or buying across West Michigan. Reach me directly for a pricing breakdown.</p>
            <div>
              <div className="areas-label">Areas I serve</div>
              <div className="areas">Holland, Zeeland, Saugatuck, Grand Haven, Hudsonville, Grand Rapids &amp; more!</div>
            </div>
            <div className="btn-row">
              <a className="btn" href={"tel:" + MI_PHONE.raw}>Call {MI_PHONE.display}</a>
              <a className="btn btn-outline" href={"sms:" + MI_PHONE.raw}>Text</a>
            </div>
          </div>
          <div className="market">
            <div className="serif market-name">Chicagoland</div>
            <p>Selling or buying in the city and surrounding suburbs. Reach me directly for a pricing breakdown.</p>
            <div>
              <div className="areas-label">Areas I serve</div>
              <div className="areas">Chicago, Tinley Park, Orland Park, Homer Glen, Lemont, Palos Heights &amp; more!</div>
            </div>
            <div className="btn-row">
              <a className="btn" href={"tel:" + IL_PHONE.raw}>Call {IL_PHONE.display}</a>
              <a className="btn btn-outline" href={"sms:" + IL_PHONE.raw}>Text</a>
            </div>
          </div>
        </div>
        <p className="fine">Also licensed in Florida.</p>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="sec wrap">
        <div className="sec-head">
          <h2 className="serif">How your home gets presented</h2>
          <p>Professional photography and drone aerials come standard. A few recent examples from my listings.</p>
        </div>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <button type="button" key={g.src} className="g-item" aria-label={"Enlarge photo: " + g.alt} onClick={() => setLb(i)}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="step-n">{s.n} · {s.title.toUpperCase()}</div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="nsnf">
          <div className="serif">No sale, no fee. I don't get paid unless your home sells.</div>
          <a href="#contact" className="btn" onClick={jump("contact")}>Get a free pricing breakdown</a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="band navy">
        <div className="wrap narrow center">
          <h2 className="serif">Pricing that saves you money</h2>
          <p>
            I offer competitive pricing compared to traditional commission structures, so you keep more of your money without giving up the service. You still get professional photography, drone aerials, marketing, showing screening, negotiation and support all the way through closing.
          </p>
          <p>Reach out for a quote.</p>
          <a href="#contact" className="btn" onClick={jump("contact")}>Get a quote</a>
        </div>
      </section>

      {/* BUYERS */}
      <section id="buy" className="band white">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="serif">Buying? I'll keep it simple.</h2>
            <p>Whether it's your first home, an investment or a move between Chicagoland and West Michigan, I walk you through every step and keep the deal moving.</p>
          </div>
          <div className="grid-3">
            {BUYER_CARDS.map((c) => (
              <div key={c.title} className="buyer">
                <div className="serif buyer-title">{c.title}</div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <a href="#contact" className="btn" onClick={jump("contact")}>Talk with me about buying</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="band white bordered">
        <div className="wrap about">
          <img src="/images/cody-headshot.jpg" alt="Cody Starostka, realtor" className="about-img" loading="lazy" />
          <div className="about-copy">
            <h2 className="serif">Meet Cody</h2>
            <p>
              I grew up around real estate, with my family in the business, so it&rsquo;s been a part of my life for as long as I can remember. Since getting my license, I&rsquo;ve helped clients buy and sell homes, vacant lots, new construction, teardown properties, flips, and everything in between. With more than 115 closed transactions, I&rsquo;ve seen a lot of different situations and know how to help keep a deal moving.
            </p>
            <p>I work with clients in West Michigan and the Chicagoland area. In Illinois, I&rsquo;m part of the Axon Group.</p>
            <p>
              My goal is to make buying or selling as easy as possible and help my clients save money along the way. Thinking about selling? Get a free home value estimate and learn more about my pricing.
            </p>
            <div><a href="#contact" className="btn" onClick={jump("contact")}>Get my free home value estimate</a></div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="sec wrap">
        <div className="sec-head">
          <h2 className="serif">What clients say</h2>
          <div className="review-links">
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">Read my reviews on Google</a>
            <a href={GOOGLE_WRITE_REVIEW} target="_blank" rel="noopener noreferrer">Leave a review</a>
          </div>
        </div>
        <figure className="featured">
          <blockquote className="serif">{FEATURED_REVIEW.quote}</blockquote>
          <figcaption>{FEATURED_REVIEW.name}</figcaption>
        </figure>
        <div className="grid-4">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="review">
              <blockquote>{r.quote}</blockquote>
              <figcaption>{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap faq">
        <h2 className="serif center">Common questions</h2>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="band navy">
        <div className="wrap contact">
          <div className="contact-copy">
            <h2 className="serif">Thinking about selling? Start with the numbers.</h2>
            <p className="lead">Free home value report and pricing breakdown. No pressure, no obligation.</p>
            <div className="contact-lines">
              <div><strong>West Michigan</strong><a href={"tel:" + MI_PHONE.raw}>{MI_PHONE.display}</a><span>Call or text</span></div>
              <div><strong>Chicagoland</strong><a href={"tel:" + IL_PHONE.raw}>{IL_PHONE.display}</a><span>Call or text</span></div>
              <div><strong>Email</strong><a href={"mailto:" + EMAIL}>{EMAIL}</a></div>
            </div>
            <div className="follow">
              <strong>Follow along</strong>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <div className="card-form contact-form"><ContactForm /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap foot-grid">
          <div>
            <div className="serif foot-name">Cody Starostka</div>
            <div>eXp Realty · The Axon Group</div>
            <div className="foot-gap"><strong>Licenses</strong></div>
            <div>Illinois License: 475199260</div>
            <div>Michigan License: 6501470306</div>
            <div>Florida License: SL3637841</div>
          </div>
          <div>
            <div>West Michigan: {MI_PHONE.display}</div>
            <div>Chicagoland &amp; Florida: {IL_PHONE.display}</div>
            <div>{EMAIL}</div>
          </div>
          <div>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a>
            <Link to="/axon-group">My Team</Link>
            <Link to="/blog">Blog</Link>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">Google reviews</a>
            <a href={HOMES_PROFILE} target="_blank" rel="noopener noreferrer">Homes.com profile</a>
            <a href="/privacy.html">Privacy Policy</a>
          </div>
        </div>
        <div className="foot-legal">
          Equal Housing Opportunity. &copy; {new Date().getFullYear()} Cody Starostka, eXp Realty.
        </div>
      </footer>

      {/* Floating tab (desktop) */}
      <button type="button" className="ftab" onClick={() => setPopupOpen(true)}>What's my home worth?</button>

      {/* Sticky Call/Text bar (phones) */}
      <div className="mbar" role="group" aria-label="Call or text Cody">
        <div className="mbar-col">
          <span>Michigan</span>
          <div><a className="btn btn-sm" href={"tel:" + MI_PHONE.raw}>Call</a><a className="btn btn-sm btn-outline" href={"sms:" + MI_PHONE.raw}>Text</a></div>
        </div>
        <div className="mbar-col">
          <span>Chicago</span>
          <div><a className="btn btn-sm" href={"tel:" + IL_PHONE.raw}>Call</a><a className="btn btn-sm btn-outline" href={"sms:" + IL_PHONE.raw}>Text</a></div>
        </div>
      </div>

      <ReportPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      <Lightbox index={lb} onClose={() => setLb(null)} onMove={moveLb} />
    </div>
  );
}

/* ---------- Styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@600;700&display=swap');
.cs{--navy:#1e3a5f;--orange:#b85f00;--orange-d:#9c4f00;--cream:#faf7f2;--ink:#1a1510;--muted:#4a4036;--line:#e2d9ce;font-family:Lato,system-ui,sans-serif;color:var(--ink);background:var(--cream);line-height:1.5;overflow-x:hidden}
.cs *{box-sizing:border-box}
.cs h1,.cs h2,.cs p,.cs figure,.cs blockquote{margin:0}
.cs a{color:var(--navy)}
.cs .serif{font-family:'Playfair Display',Georgia,serif}
.cs .wrap{max-width:1200px;margin:0 auto;padding:0 32px}
.cs .narrow{max-width:900px}
.cs .center{text-align:center}
.cs section[id]{scroll-margin-top:84px}

.cs .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 26px;background:var(--orange);color:#fff;font:700 16px Lato,sans-serif;border:2px solid var(--orange);border-radius:4px;text-decoration:none;cursor:pointer}
.cs .btn:hover{background:var(--orange-d);border-color:var(--orange-d);color:#fff}
.cs .btn:disabled{opacity:.7;cursor:wait}
.cs .btn-sm{min-height:44px;padding:0 18px;font-size:15px}
.cs .btn-full{width:100%}
.cs .btn-outline{background:#fff;color:var(--navy);border-color:var(--navy)}
.cs .btn-outline:hover{background:#eef2f7;color:var(--navy);border-color:var(--navy)}
.cs .btn-ghost{background:transparent;border-color:#fff;color:#fff}
.cs .btn-ghost:hover{background:rgba(255,255,255,.14);border-color:#fff}
.cs .btn-row{display:flex;flex-wrap:wrap;gap:12px}

.cs .nav{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid var(--line)}
.cs .nav-in{max-width:1200px;margin:0 auto;padding:12px 32px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.cs .brand{display:flex;flex-direction:column;text-decoration:none}
.cs .brand-name{font-size:24px;font-weight:700;color:var(--navy)}
.cs .brand-sub{font-size:12px;letter-spacing:1.5px;color:#6b6050;text-transform:uppercase}
.cs .nav-links{display:flex;align-items:center;gap:26px}
.cs .nav-links>a{text-decoration:none;font-weight:700;font-size:15px}
.cs .nav-links>a:hover{color:var(--orange)}
.cs .ct-wrap{position:relative}
.cs .ct-panel{position:absolute;right:0;top:calc(100% + 8px);width:300px;background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.18);display:flex;flex-direction:column;gap:10px}
.cs .ct-row{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:8px;font-weight:700;color:var(--navy);font-size:15px}
.cs .burger{display:none;background:none;border:0;cursor:pointer;flex-direction:column;gap:5px;padding:10px}
.cs .burger span{display:block;width:24px;height:2px;background:var(--navy);border-radius:2px}
.cs .mob-menu{display:flex;flex-direction:column;border-top:1px solid var(--line);padding:8px 24px 16px;background:#fff}
.cs .mob-menu a{padding:12px 0;font-weight:700;text-decoration:none;font-size:16px}

.cs .hero{position:relative;overflow:hidden;background:var(--navy);min-height:640px}
.cs .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cs .heroA{animation:fadeA 14s ease-in-out infinite}
.cs .heroB{opacity:0;animation:fadeB 14s ease-in-out infinite}
@keyframes fadeA{0%,40%{opacity:1}50%,90%{opacity:0}100%{opacity:1}}
@keyframes fadeB{0%,40%{opacity:0}50%,90%{opacity:1}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.cs .heroA,.cs .heroB{animation:none}.cs .heroB{display:none}}
.cs .hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,30,52,.88) 0%,rgba(14,30,52,.62) 50%,rgba(14,30,52,.25) 100%)}
.cs .hero-in{position:relative;padding-top:72px;padding-bottom:72px;display:flex;flex-wrap:wrap;align-items:center;gap:48px}
.cs .hero-copy{flex:1 1 480px;min-width:0;color:#fff}
.cs .who{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.cs .who-img{width:88px;height:88px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:3px solid #fff;flex:none}
.cs .who-text{display:flex;flex-direction:column;gap:4px}
.cs .who-name{font-size:20px;font-weight:700}
.cs .who-stars{display:flex;align-items:center;gap:8px;font-size:15px;color:#f3ede4;text-decoration:underline}
.cs .eyebrow{margin-top:18px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;color:#ffd9a8}
.cs .hero-h1{margin:14px 0 18px;font-size:56px;line-height:1.08;font-weight:700;text-wrap:balance}
.cs .hero-p{font-size:19px;line-height:1.55;max-width:560px;color:#f3ede4;margin-bottom:28px}
.cs .hero-btns{display:flex;flex-wrap:wrap;gap:14px}
.cs .hero-facts{margin-top:26px;display:flex;flex-wrap:wrap;gap:8px 22px;font-size:15px;color:#f3ede4}
.cs .hero-facts a{color:#ffd9a8;font-weight:700}
.cs .card-form{background:#fff;border-radius:8px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.28);color:var(--ink)}
.cs .hero-form{flex:0 1 380px;min-width:0}
.cs .form{display:flex;flex-direction:column;gap:14px}
.cs .form-title{font-size:24px;line-height:1.2;font-weight:700;color:var(--navy);margin-bottom:6px}
.cs .form-sub{font-size:15px;line-height:1.5;color:var(--muted);margin-bottom:14px}
.cs .field{display:flex;flex-direction:column;gap:6px}
.cs .field label,.cs .radios legend{font:700 13px Lato,sans-serif;color:var(--navy)}
.cs input[type=text]{width:100%;min-height:48px;padding:0 14px;border:1px solid #cfc4b6;border-radius:4px;font:400 16px Lato,sans-serif;background:#fff;color:var(--ink)}
.cs input[type=text]:focus{outline:2px solid var(--orange);outline-offset:1px;border-color:var(--orange)}
.cs .radios{margin:0;padding:0;border:0;display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center}
.cs .radios legend{padding:0;margin-bottom:6px}
.cs .radio{display:flex;align-items:center;gap:8px;font-size:15px;min-height:32px}
.cs .radio input{width:20px;height:20px;accent-color:var(--orange)}
.cs .consent{font-size:12px;line-height:1.5;color:#5a4f42}
.cs .form-msg{font-size:14px;color:#8a1c1c;font-weight:700}
.cs .thanks{padding:8px 0;display:flex;flex-direction:column;gap:12px}
.cs .thanks-title{font-size:22px;font-weight:700;color:var(--navy)}
.cs .thanks p{font-size:15px;line-height:1.55;color:var(--muted)}
.cs .thanks-nums{display:flex;flex-direction:column;gap:6px}
.cs .thanks-nums a{font-weight:700}

.cs .sec{padding-top:80px;padding-bottom:40px}
.cs .sec-head{text-align:center;max-width:720px;margin:0 auto 36px}
.cs .sec-head h2,.cs .band h2,.cs .faq h2{font-size:38px;line-height:1.15;font-weight:700;color:var(--navy);margin-bottom:12px}
.cs .sec-head p{font-size:18px;line-height:1.6;color:var(--muted)}
.cs .grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.cs .grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.cs .grid-4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.cs .market{background:#fff;border:1px solid var(--line);border-radius:8px;padding:36px;display:flex;flex-direction:column;gap:14px}
.cs .market-name{font-size:28px;font-weight:700;color:var(--navy)}
.cs .market p{font-size:16px;line-height:1.6;color:var(--muted)}
.cs .areas-label{font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6b6050;margin-bottom:6px}
.cs .areas{font-size:16px;line-height:1.6;color:var(--navy);font-weight:700}
.cs .fine{text-align:center;margin-top:20px;font-size:14px;color:#6b6050}

.cs .gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.cs .g-item{padding:0;border:0;background:none;cursor:zoom-in;border-radius:6px;overflow:hidden;display:block}
.cs .g-item img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;transition:transform .3s ease}
.cs .g-item:hover img{transform:scale(1.03)}
.cs .g-item:focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.cs .steps{margin-top:44px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.cs .step{background:#fff;border:1px solid var(--line);border-radius:8px;padding:24px;display:flex;flex-direction:column;gap:8px}
.cs .step-n{font-weight:700;font-size:14px;color:var(--orange);letter-spacing:1.4px}
.cs .step p{font-size:15px;line-height:1.55;color:var(--muted)}
.cs .nsnf{margin-top:36px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:20px 32px;font-size:22px;font-weight:600;color:var(--navy);text-align:center}
.cs .nsnf .serif{font-weight:600}

.cs .band{padding:80px 0}
.cs .band.navy{background:var(--navy);color:#fff}
.cs .band.navy h2{color:#fff}
.cs .band.navy .narrow p{font-size:19px;line-height:1.65;color:#e8e1d6;margin-bottom:18px}
.cs .band.navy .btn{margin-top:4px}
.cs .band.navy .narrow{display:flex;flex-direction:column;align-items:center}
.cs .band.navy .narrow p{max-width:720px}
.cs .band.white{background:#fff;border-top:1px solid var(--line)}
.cs .band.bordered{border-bottom:1px solid var(--line)}
.cs .buyer{background:var(--cream);border:1px solid var(--line);border-radius:8px;padding:28px;display:flex;flex-direction:column;gap:10px}
.cs .buyer-title{font-size:22px;font-weight:700;color:var(--navy)}
.cs .buyer p{font-size:15px;line-height:1.6;color:var(--muted)}

.cs .about{display:flex;flex-wrap:wrap;gap:48px;align-items:center}
.cs .about-img{flex:0 1 340px;width:340px;max-width:100%;aspect-ratio:4/5;object-fit:cover;object-position:50% 20%;border-radius:8px}
.cs .about-copy{flex:1 1 480px;min-width:0;display:flex;flex-direction:column;gap:16px}
.cs .about-copy h2{margin:0}
.cs .about-copy p{font-size:18px;line-height:1.65;color:#3a3128}

.cs .review-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 24px;font-weight:700}
.cs .featured{background:var(--navy);color:#fff;border-radius:8px;padding:36px 40px;margin-bottom:20px;display:flex;flex-direction:column;gap:18px}
.cs .featured blockquote{font-size:22px;line-height:1.5;font-weight:600;text-wrap:pretty}
.cs .featured figcaption{font-weight:700;color:#ffd9a8}
.cs .review{background:#fff;border:1px solid var(--line);border-radius:8px;padding:26px;display:flex;flex-direction:column;gap:14px}
.cs .review blockquote{font-size:15px;line-height:1.6;color:#3a3128}
.cs .review figcaption{font-weight:700;color:var(--navy)}

.cs .faq{max-width:860px;padding-bottom:80px;padding-top:40px}
.cs .faq h2{margin-bottom:28px}
.cs .faq-list{display:flex;flex-direction:column;gap:12px}
.cs details{background:#fff;border:1px solid var(--line);border-radius:8px;padding:18px 22px}
.cs summary{cursor:pointer;font-weight:700;font-size:17px;color:var(--navy)}
.cs details p{margin-top:12px;font-size:16px;line-height:1.6;color:var(--muted)}

.cs .contact{display:flex;flex-wrap:wrap;gap:48px}
.cs .contact-copy{flex:1 1 420px;min-width:0;display:flex;flex-direction:column;gap:18px}
.cs .contact-copy h2{font-size:40px;line-height:1.12;margin:0}
.cs .lead{font-size:18px;line-height:1.6;color:#e8e1d6}
.cs .contact-lines{display:flex;flex-direction:column;gap:14px;margin-top:8px}
.cs .contact-lines div{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.cs .contact-lines strong{min-width:130px}
.cs .contact-lines a,.cs .follow a{color:#fff;font-size:20px}
.cs .contact-lines span{font-size:14px;color:#d9d1c4}
.cs .follow{display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:12px}
.cs .follow a{font-size:17px}
.cs .contact-form{flex:1 1 380px;min-width:0;padding:32px}

.cs .footer{background:#14283f;color:#d9d1c4;font-size:14px;line-height:1.7}
.cs .foot-grid{padding-top:40px;padding-bottom:40px;display:flex;flex-wrap:wrap;gap:32px 64px;justify-content:space-between}
.cs .foot-grid>div{display:flex;flex-direction:column;gap:4px}
.cs .foot-grid a{color:#fff}
.cs .foot-name{font-size:20px;font-weight:700;color:#fff}
.cs .foot-gap{margin-top:8px;color:#fff}
.cs .foot-legal{border-top:1px solid #2d4766;padding:18px 32px;text-align:center;font-size:13px}

.cs .overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px}
.cs .overlay.dark{background:rgba(10,14,20,.92)}
.cs .popup{position:relative;background:#fff;border-radius:10px;max-width:460px;width:100%;max-height:92vh;overflow-y:auto;padding:32px;box-shadow:0 24px 80px rgba(0,0,0,.35)}
.cs .popup-title{font-size:26px;line-height:1.2;font-weight:700;color:var(--navy);margin-bottom:8px;padding-right:28px}
.cs .popup-sub{font-size:15px;color:var(--muted);margin-bottom:16px}
.cs .close{position:absolute;top:8px;right:10px;width:44px;height:44px;background:none;border:0;font-size:30px;line-height:1;color:#6b6050;cursor:pointer}
.cs .lb-img{max-width:92vw;max-height:86vh;border-radius:6px;display:block}
.cs .lb-btn{position:absolute;width:48px;height:48px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:30px;line-height:1;cursor:pointer}
.cs .lb-btn:hover{background:rgba(255,255,255,.32)}
.cs .lb-close{top:16px;right:16px}
.cs .lb-prev{left:16px;top:50%;transform:translateY(-50%)}
.cs .lb-next{right:16px;top:50%;transform:translateY(-50%)}

.cs .ftab{position:fixed;right:20px;bottom:20px;z-index:60;min-height:48px;padding:0 20px;background:var(--navy);color:#fff;font:700 15px Lato,sans-serif;border:0;border-radius:24px;box-shadow:0 8px 24px rgba(0,0,0,.25);cursor:pointer}
.cs .ftab:hover{background:#15304f}
.cs .mbar{display:none}

@media (max-width:900px){
  .cs .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cs .steps{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cs .grid-3{grid-template-columns:1fr}
  .cs .gallery{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:768px){
  .cs .wrap{padding:0 20px}
  .cs .nav-in{padding:10px 20px}
  .cs .nav-links{display:none}
  .cs .burger{display:flex}
  .cs .brand-name{font-size:20px}
  .cs .brand-sub{font-size:10px;letter-spacing:1px}
  .cs .hero-in{padding-top:40px;padding-bottom:40px;gap:32px}
  .cs .hero-h1{font-size:34px}
  .cs .hero-p{font-size:17px}
  .cs .sec{padding-top:56px;padding-bottom:24px}
  .cs .band{padding:56px 0}
  .cs .sec-head h2,.cs .band h2,.cs .faq h2{font-size:30px}
  .cs .contact-copy h2{font-size:30px}
  .cs .grid-2,.cs .grid-4,.cs .steps,.cs .gallery{grid-template-columns:1fr}
  .cs .market{padding:24px}
  .cs .featured{padding:26px 22px}
  .cs .featured blockquote{font-size:18px}
  .cs .ftab{display:none}
  .cs .mbar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;position:fixed;left:0;right:0;bottom:0;z-index:60;background:#fff;border-top:1px solid #d6cbbb;padding:8px 12px 12px}
  .cs .mbar-col{display:flex;flex-direction:column;gap:6px}
  .cs .mbar-col span{font-weight:700;font-size:13px;color:var(--navy);text-align:center}
  .cs .mbar-col div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
  .cs .footer{padding-bottom:110px}
  .cs .lb-prev{left:6px}
  .cs .lb-next{right:6px}
}
`;
