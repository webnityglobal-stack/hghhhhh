
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Activity,
  Pill,
  ShieldCheck,
  Truck,
  Plus,
  Cross,
  Thermometer,
  Microscope,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Medical Equipment",
    subtitle: "Monitor Your Health",
    description:
      "Discover reliable medical devices designed to help you monitor and manage your everyday health.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1000",
    icon: Stethoscope,
    count: "08",
    theme: "blue",
  },
  {
    id: 2,
    name: "Health & Wellness",
    subtitle: "Feel Better Every Day",
    description:
      "Explore wellness essentials that support your comfort, recovery and everyday wellbeing.",
    image:
      "https://images.unsplash.com/photo-1505576399273-565b52d4ac71?w=1000",
    icon: HeartPulse,
    count: "05",
    theme: "teal",
  },
  {
    id: 3,
    name: "Personal Care",
    subtitle: "Care Starts With You",
    description:
      "Find everyday personal care and protection products for your daily routine.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000",
    icon: Activity,
    count: "02",
    theme: "purple",
  },
  {
    id: 4,
    name: "Healthcare Essentials",
    subtitle: "Be Ready. Stay Prepared.",
    description:
      "Keep your home prepared with useful first-aid and healthcare essentials.",
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=1000",
    icon: Pill,
    count: "03",
    theme: "orange",
  },
];

function Categories() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 16,
      y: (x - 0.5) * 16,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <main className="min-h-screen bg-[#F6F9FD] overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#071D3B] text-white overflow-hidden">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-150px] right-[5%] w-[450px] h-[450px] rounded-full bg-blue-500 blur-[140px]" />
          <div className="absolute bottom-[-180px] left-[-100px] w-[450px] h-[450px] rounded-full bg-teal-400 blur-[150px]" />
        </div>

        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* LEFT CONTENT */}
            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300/20 bg-blue-400/10 text-blue-200 text-xs font-bold tracking-[2px] uppercase">
                <Sparkles size={15} />
                Discover MediCare
              </div>

              <h1 className="text-[42px] sm:text-6xl lg:text-[68px] font-extrabold leading-[1.1] tracking-tight mt-7">
                Healthcare
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#67E8F9] to-[#5EEAD4]">
                  Made Simple.
                </span>
              </h1>

              <p className="text-blue-100/75 text-sm sm:text-lg leading-8 mt-6 max-w-xl">
                Explore healthcare collections designed around your everyday
                needs. From medical equipment to personal care, find everything
                you need in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">

                <a
                  href="#category-list"
                  className="inline-flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-blue-500 text-white px-7 py-4 rounded-xl font-bold shadow-xl shadow-blue-950/30 transition-all hover:-translate-y-1"
                >
                  Explore Categories
                  <ArrowRight size={19} />
                </a>

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 border border-white/20 hover:bg-white/10 text-white px-7 py-4 rounded-xl font-semibold transition-all"
                >
                  View All Products
                  <MoveUpRight size={18} />
                </Link>

              </div>

              {/* TRUST POINTS */}
              <div className="flex flex-wrap gap-x-7 gap-y-4 mt-11 pt-7 border-t border-white/10">

                <div className="flex items-center gap-2 text-sm text-blue-100/80">
                  <ShieldCheck size={19} className="text-teal-300" />
                  Quality Focused
                </div>

                <div className="flex items-center gap-2 text-sm text-blue-100/80">
                  <Truck size={19} className="text-teal-300" />
                  Convenient Delivery
                </div>

              </div>
            </div>

            {/* RIGHT 3D VISUAL */}
            <div
              className="relative flex items-center justify-center min-h-[360px] sm:min-h-[480px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >

              {/* GLOW */}
              <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-blue-500/20 blur-[90px]" />

              {/* OUTER ROTATING RING */}
              <div className="absolute w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-blue-300/25 animate-[spin_35s_linear_infinite]" />

              {/* SECOND RING */}
              <div className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] rounded-full border border-teal-300/20 animate-[spin_25s_linear_infinite_reverse]" />

              {/* 3D MAIN OBJECT */}
              <div
                className="relative z-10 w-[245px] h-[245px] sm:w-[340px] sm:h-[340px] transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >

                {/* GLASS CIRCLE */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-blue-300/10 to-teal-300/10 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl" />

                {/* INNER CIRCLE */}
                <div className="absolute inset-5 rounded-full border border-white/20 bg-gradient-to-br from-blue-400/10 to-teal-300/10 flex items-center justify-center">

                  <div className="relative flex items-center justify-center w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#E8F4FF] to-[#B9E8F2] shadow-[0_25px_60px_rgba(0,0,0,0.25)]">

                    <div className="absolute inset-3 rounded-full border border-blue-200/80" />

                    <div className="relative flex items-center justify-center">
                      <HeartPulse
                        size={100}
                        strokeWidth={1.5}
                        className="text-[#1764B8] sm:w-[135px] sm:h-[135px]"
                      />
                    </div>

                    <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_20px_#2dd4bf]" />

                  </div>
                </div>

                {/* FLOATING ICONS */}
                <div
                  className="absolute -top-3 right-2 sm:right-5 w-16 h-16 sm:w-[76px] sm:h-[76px] bg-white rounded-2xl shadow-2xl flex items-center justify-center text-blue-600 animate-[bounce_4s_ease-in-out_infinite]"
                  style={{ transform: "translateZ(65px)" }}
                >
                  <Stethoscope size={34} />
                </div>

                <div
                  className="absolute bottom-3 -left-5 sm:-left-8 w-16 h-16 sm:w-[76px] sm:h-[76px] bg-gradient-to-br from-teal-300 to-teal-500 rounded-2xl shadow-2xl flex items-center justify-center text-white animate-[bounce_5s_ease-in-out_infinite]"
                  style={{ transform: "translateZ(85px)" }}
                >
                  <Activity size={34} />
                </div>

                <div
                  className="absolute top-[42%] -right-9 sm:-right-12 w-14 h-14 sm:w-16 sm:h-16 bg-[#FBBF24] rounded-2xl shadow-2xl flex items-center justify-center text-[#713F12] animate-[bounce_3.5s_ease-in-out_infinite]"
                  style={{ transform: "translateZ(95px)" }}
                >
                  <Plus size={34} />
                </div>

              </div>

              {/* FLOATING INFO CARD */}
              <div className="absolute bottom-2 left-0 sm:left-2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl animate-[bounce_5s_ease-in-out_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-400/20 flex items-center justify-center text-teal-300">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Everyday Care</p>
                    <p className="text-blue-100/60 text-xs mt-1">Made convenient</p>
                  </div>
                </div>
              </div>

              {/* SMALL FLOATING LABEL */}
              <div className="absolute top-5 right-0 sm:right-5 z-20 bg-white text-[#102A43] rounded-xl px-4 py-3 shadow-xl rotate-3">
                <div className="flex items-center gap-2">
                  <Cross size={17} className="text-blue-600" />
                  <span className="text-xs font-extrabold">HEALTH FIRST</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORY INTRO ================= */}
      <section id="category-list" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
              <span className="w-8 h-[2px] bg-blue-600" />
              Explore Collections
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] mt-4 tracking-tight">
              Shop By Category
            </h2>

            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl leading-7">
              Find exactly what you need with our carefully organised healthcare collections.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
          >
            Browse All Products
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative min-h-[340px] sm:min-h-[390px] rounded-[26px] overflow-hidden bg-[#102A43] shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
              >

                {/* BACKGROUND IMAGE */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B] via-[#071D3B]/40 to-transparent" />

                {/* TOP CATEGORY NUMBER */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">
                    COLLECTION 0{index + 1}
                  </span>

                  <span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                    <MoveUpRight size={21} />
                  </span>
                </div>

                {/* BOTTOM CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                      <Icon size={25} />
                    </div>

                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider">
                      {category.count} Available
                    </span>
                  </div>

                  <p className="text-teal-300 text-xs font-bold uppercase tracking-[1.5px] mb-2">
                    {category.subtitle}
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {category.name}
                  </h3>

                  <p className="text-white/70 text-sm leading-6 mt-3 max-w-md">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/20 mt-6 pt-5">
                    <span className="text-white font-bold text-sm">
                      Explore Collection
                    </span>

                    <span className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                      <ArrowRight size={19} />
                    </span>
                  </div>

                </div>

              </Link>
            );
          })}

        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

        <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-7 sm:p-10 lg:p-12">

          <div className="text-center mb-10">
            <p className="text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
              The MediCare Experience
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-3">
              Shopping Made More Convenient
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={30} />
              </div>
              <h3 className="font-bold text-[#102A43] mt-5">
                Quality-Focused Selection
              </h3>
              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Explore a range of healthcare and everyday care products.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                <Truck size={30} />
              </div>
              <h3 className="font-bold text-[#102A43] mt-5">
                Convenient Shopping
              </h3>
              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Discover your everyday essentials in one place.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <HeartPulse size={30} />
              </div>
              <h3 className="font-bold text-[#102A43] mt-5">
                Everyday Healthcare
              </h3>
              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Find products for your daily health and wellness needs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0D2855] to-[#155EEF] px-7 sm:px-12 py-12 sm:py-14">

          <div className="absolute -right-20 -top-32 w-80 h-80 rounded-full border-[35px] border-white/5" />
          <div className="absolute right-40 -bottom-40 w-80 h-80 rounded-full border-[35px] border-white/5" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-[2px]">
                <HeartPulse size={17} />
                Your Health Matters
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
                Find Everything You Need.
              </h2>

              <p className="text-blue-100/80 mt-3 max-w-xl leading-7">
                Explore our complete healthcare collection and discover your everyday essentials.
              </p>
            </div>

            <Link
              to="/shop"
              className="shrink-0 inline-flex items-center gap-3 bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold shadow-xl transition-all hover:-translate-y-1"
            >
              Start Shopping
              <ArrowRight size={19} />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Categories;
