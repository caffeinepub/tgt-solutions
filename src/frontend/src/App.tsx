import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Facebook,
  HeadphonesIcon,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Route,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";

const LOGO_SRC =
  "/assets/img_20260330_183417-019d3ed8-9e19-77ad-8c0d-d719facfc2c9.jpg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pan India Network", href: "#network" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const SERVICES = [
  {
    icon: Truck,
    title: "Full Truckload (FTL)",
    description:
      "Dedicated full truck capacity for your cargo — ideal for large shipments that require an entire vehicle. Faster transit, direct routes, and maximum security for your goods.",
    highlight: "Full Capacity",
  },
  {
    icon: Route,
    title: "Part Load (LTL)",
    description:
      "Cost-effective Less Than Truckload solutions for smaller consignments. Share truck space, pay only for what you use, and still get reliable, timely delivery across India.",
    highlight: "Cost Effective",
  },
  {
    icon: Settings,
    title: "Customized Logistic",
    description:
      "End-to-end logistics solutions crafted specifically for your business requirements. Flexible scheduling, dedicated vehicles, and personalized service tailored to your supply chain.",
    highlight: "Custom Built",
  },
];

const STATS = [
  { value: "9+", label: "Years of Experience", icon: Star },
  { value: "500+", label: "Trucks Fleet", icon: Truck },
  { value: "28+", label: "States Covered", icon: MapPin },
  { value: "91%", label: "On-Time Rate", icon: TrendingUp },
  { value: "24/7", label: "Support", icon: HeadphonesIcon },
];

const NETWORK_STATS = [
  { value: "34", label: "States & UTs", icon: MapPin },
  { value: "200+", label: "Cities Served", icon: Building2 },
  { value: "1000+", label: "Monthly Deliveries", icon: Package },
  { value: "91%", label: "On-Time Rate", icon: TrendingUp },
];

const STEPS = [
  {
    step: "01",
    title: "Book Your Shipment",
    description:
      "Fill in your consignment details online or call us. Get an instant quote and confirm your booking in minutes.",
    icon: Route,
  },
  {
    step: "02",
    title: "Pickup & Transit",
    description:
      "Our fleet picks up your cargo from your doorstep. Real-time tracking keeps you informed at every stage.",
    icon: Truck,
  },
  {
    step: "03",
    title: "Safe Delivery",
    description:
      "Your consignment is delivered safely to the destination. Proof of delivery and digital confirmation provided.",
    icon: CheckCircle,
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

// Scrolls to a section by id, accounting for fixed header height.
// If `delay` is provided (ms), the scroll is deferred — use this after
// closing the mobile menu so the layout settles before measuring.
const scrollToSection = (href: string, delay = 0) => {
  const doScroll = () => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    // Use scrollIntoView for reliable cross-browser support,
    // then manually nudge by the header height.
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (delay > 0) {
    setTimeout(doScroll, delay);
  } else {
    doScroll();
  }
};

function WebsitePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-36 md:h-40">
            {/* biome-ignore lint/a11y/useValidAnchor: scrolls to section */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex-shrink-0"
            >
              <div className="bg-white rounded-xl p-2 shadow-md">
                <img
                  src={LOGO_SRC}
                  alt="TGT Solutions"
                  className="h-28 md:h-32 w-auto object-contain"
                />
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* biome-ignore lint/a11y/useValidAnchor: scrolls to section */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                data-ocid="header.get_quote.button"
                className="hidden sm:flex items-center gap-2 bg-gold text-white font-semibold px-5 py-2.5 rounded text-sm hover:bg-gold-light transition-colors shadow-gold"
              >
                GET A QUOTE
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                className="md:hidden text-white p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-ocid="nav.hamburger.toggle"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
              style={{ backgroundColor: "#071E35" }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      // Delay scroll until the menu close animation finishes
                      scrollToSection(link.href, 350);
                    }}
                    className="text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                {/* biome-ignore lint/a11y/useValidAnchor: scrolls to section */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    scrollToSection("#contact", 350);
                  }}
                  data-ocid="mobile.get_quote.button"
                  className="mt-2 bg-gold text-white font-semibold px-5 py-3 rounded text-sm text-center"
                >
                  GET A QUOTE
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-truck.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
              <Truck className="w-3.5 h-3.5" />
              TGT Solutions
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              MOVING INDIA
              <span className="block text-gold">FORWARD</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Reliable, fast, and safe road logistics across all 28 states and 6
              union territories. Trusted by thousands of businesses across
              India.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* biome-ignore lint/a11y/useValidAnchor: scrolls to section */}
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#services");
                }}
                data-ocid="hero.explore_services.button"
                className="flex items-center gap-2 bg-gold text-white font-bold px-8 py-4 rounded text-base hover:bg-gold-light transition-all shadow-gold"
              >
                EXPLORE OUR SERVICES
                <ArrowRight className="w-5 h-5" />
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: scrolls to section */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                data-ocid="hero.get_quote.button"
                className="flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded text-base hover:bg-white/10 transition-all"
              >
                GET A QUOTE
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, text: "Insured Cargo" },
              { icon: TrendingUp, text: "Real-time Tracking" },
              { icon: MapPin, text: "Pan India Coverage" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2"
              >
                <Icon className="w-4 h-4 text-gold" />
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        style={{ scrollMarginTop: "160px" }}
        className="py-20 md:py-28 bg-[#F3F6F9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mt-2">
              Our Logistics Services
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
              Full Truckload, Part Load, and Customized Logistics — solutions
              for every business need.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            data-ocid="services.list"
          >
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
                className="bg-white rounded-xl p-7 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-gold/30"
              >
                <div className="w-14 h-14 bg-navy/8 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                  <svc.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                </div>
                <div className="inline-block bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {svc.highlight}
                </div>
                <h3 className="font-display font-bold text-navy text-lg mb-3">
                  {svc.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {svc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / STATS */}
      <section
        id="about"
        style={{ scrollMarginTop: "160px" }}
        className="py-16 bg-navy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PAN INDIA NETWORK */}
      <section
        id="network"
        style={{ scrollMarginTop: "160px" }}
        className="py-20 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Branded identity badge — replaces the logo image */}
              <div className="inline-flex items-center gap-2 bg-navy rounded-full px-4 py-2 mb-5">
                <Truck className="w-4 h-4 text-gold" />
                <span className="text-white font-bold text-sm tracking-wide">
                  TGT Solutions
                </span>
                <span className="text-gold/60 text-xs">• Est. 2015</span>
              </div>

              <span className="block text-gold font-semibold text-sm tracking-widest uppercase">
                Coverage
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mt-2 mb-6">
                Pan India
                <br />
                Network
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                TGT Solutions operates an extensive logistics network spanning
                every corner of India. From the Himalayan foothills to the
                southern coasts, from the western deserts to the northeastern
                frontiers — we connect it all.
              </p>

              {/* Premium stat cards — 2x2 dark navy grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {NETWORK_STATS.map((ns, index) => (
                  <motion.div
                    key={ns.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-navy rounded-xl p-5 border-l-4 border-gold shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-display text-3xl font-extrabold text-gold">
                          {ns.value}
                        </div>
                        <div className="text-white/70 text-sm mt-1 font-medium">
                          {ns.label}
                        </div>
                      </div>
                      <ns.icon className="w-7 h-7 text-gold/40 mt-1 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <ul className="space-y-3">
                {[
                  "All 28 states and 6 union territories covered",
                  "Hub-and-spoke model for faster last-mile delivery",
                  "Dedicated road freight routes across major corridors",
                  "Real-time tracking on every vehicle",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* RIGHT COLUMN — Live Network Dashboard Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gold/30 bg-navy">
                {/* Panel header strip */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                    </span>
                    <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
                      Live Network
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-gold" />
                    <span className="text-gold text-xs font-bold tracking-wide">
                      TGT Solutions
                    </span>
                  </div>
                </div>

                {/* Map area with floating badges */}
                <div className="relative p-4 pb-2">
                  <img
                    src="/assets/generated/india-logistics-map.dim_700x750.png"
                    alt="TGT Solutions Pan India Network"
                    className="w-full h-auto object-contain max-h-[460px]"
                  />

                  {/* Top-left: 34 States & UTs */}
                  <div className="absolute top-8 left-8 bg-navy/90 backdrop-blur-sm border border-gold/50 rounded-xl px-4 py-2.5 shadow-lg">
                    <div className="font-display text-2xl font-extrabold text-gold leading-none">
                      34
                    </div>
                    <div className="text-white/55 text-xs mt-0.5 font-medium">
                      States &amp; UTs
                    </div>
                  </div>

                  {/* Top-right: 500+ Trucks Active */}
                  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 shadow-lg">
                    <div className="font-display text-xl font-extrabold text-white leading-none">
                      500+
                    </div>
                    <div className="text-gold text-xs mt-0.5 font-semibold">
                      Trucks Active
                    </div>
                  </div>

                  {/* Bottom-left: 200+ Cities */}
                  <div className="absolute bottom-10 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 shadow-lg">
                    <div className="font-display text-xl font-extrabold text-white leading-none">
                      200+
                    </div>
                    <div className="text-gold text-xs mt-0.5 font-semibold">
                      Cities Covered
                    </div>
                  </div>

                  {/* Bottom-right: 91% On-Time (pulsing) */}
                  <motion.div
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-10 right-8 bg-gold rounded-xl px-4 py-2.5 shadow-lg"
                    style={{ boxShadow: "0 0 20px rgba(202,160,45,0.45)" }}
                  >
                    <div className="font-display text-xl font-extrabold text-white leading-none">
                      91%
                    </div>
                    <div className="text-white/80 text-xs mt-0.5 font-semibold">
                      On-Time Rate
                    </div>
                  </motion.div>
                </div>

                {/* Route chips strip */}
                <div className="px-5 py-3.5 bg-white/5 border-t border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white/35 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
                      Key Routes
                    </span>
                    {[
                      "Delhi ↔ Mumbai",
                      "Delhi ↔ Chennai",
                      "Mumbai ↔ Kolkata",
                    ].map((route) => (
                      <span
                        key={route}
                        className="bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-[#F3F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mt-2">
              How It Works
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Book your shipment in 3 easy steps and let TGT handle the rest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gold/30" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                data-ocid={`steps.item.${i + 1}`}
                className="relative bg-white rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  <step.icon className="w-8 h-8 text-gold" />
                </div>
                <div className="absolute -top-3 -right-3 bg-gold text-white font-display font-extrabold text-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{ scrollMarginTop: "160px" }}
        className="py-20 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">
              Reach Out
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mt-2">
              Get in Touch
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
              Reach out directly to get a quote or for any enquiry — we respond
              promptly.
            </p>
          </motion.div>

          {/* 3 large contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 98115 81759",
                href: "tel:+919811581759",
                desc: "Mon–Sat, 8 AM – 8 PM",
                ocid: "contact.item.1",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "mail2maheshku@gmail.com",
                href: "mailto:mail2maheshku@gmail.com",
                desc: "We reply within 24 hours",
                ocid: "contact.item.2",
              },
              {
                icon: MapPin,
                label: "Visit Us",
                value: "Mohan Nagar, Ghaziabad, Delhi NCR, India",
                href: "https://maps.google.com/?q=Mohan+Nagar+Ghaziabad",
                desc: "Mon–Sat, 9 AM – 6 PM",
                ocid: "contact.item.3",
              },
            ].map(({ icon: Icon, label, value, href, desc, ocid }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={ocid}
                className="group flex flex-col items-center text-center bg-navy rounded-2xl p-8 md:p-10 shadow-lg border border-gold/20 hover:border-gold/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="w-20 h-20 bg-gold/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-gold" />
                </div>
                <div className="text-gold font-semibold text-xs tracking-widest uppercase mb-3">
                  {label}
                </div>
                <div className="text-white font-bold text-base md:text-lg leading-snug mb-3">
                  {value}
                </div>
                <div className="text-white/50 text-sm">{desc}</div>
                <div className="mt-5 flex items-center gap-1.5 text-gold/70 group-hover:text-gold text-xs font-semibold transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Connect now</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Office hours card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto bg-[#F3F6F9] rounded-2xl p-8 shadow-card border border-navy/10"
            data-ocid="contact.panel"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-display font-bold text-navy text-xl">
                Office Hours
              </h4>
            </div>
            <div className="space-y-4 text-sm">
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
              ].map(({ day, hours }) => (
                <div
                  key={day}
                  className="flex justify-between items-center border-b border-navy/10 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-gray-600 font-medium">{day}</span>
                  <span className="text-navy font-bold">{hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 bg-navy rounded-xl px-5 py-4">
              <HeadphonesIcon className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-white/90 text-sm font-medium">
                Emergency helpline available 24/7 — call us anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-white" style={{ backgroundColor: "#071E35" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="inline-block bg-white rounded-lg p-1.5 mb-4">
                <img
                  src={LOGO_SRC}
                  alt="TGT Solutions"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Pan India Roadways &amp; Logistics. Moving India forward with
                reliability, speed, and care.
              </p>
              <div className="flex gap-3 mt-5">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-5 text-base">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 hover:text-gold text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-5 text-base">
                Services
              </h4>
              <ul className="space-y-3">
                {SERVICES.map((svc) => (
                  <li key={svc.title}>
                    <span className="text-white/60 text-sm">{svc.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-5 text-base">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm">+91 98115 81759</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm">
                    mail2maheshku@gmail.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm">
                    Mohan Nagar, Ghaziabad, Delhi NCR, India
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              &copy; {year} TGT Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                data-ocid="footer.admin.link"
                className="text-white/20 hover:text-white/50 text-xs transition-colors"
              >
                Admin
              </a>
              <p className="text-white/40 text-sm">
                Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  return isAdmin ? <AdminPage /> : <WebsitePage />;
}
