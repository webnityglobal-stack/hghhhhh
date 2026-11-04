
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    ShieldCheck,
    Truck,
    Headphones,
    BadgeCheck,
    Star,
    ShoppingCart,
    Check,
    HeartPulse,
    Activity,
    Pill,
    Stethoscope,
    Clock3,
    Quote,
} from "lucide-react";

import products from "../data/products";

const categories = [
    {
        name: "Medical Equipment",
        description: "Reliable devices for everyday health monitoring.",
        image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800",
        icon: Stethoscope,
    },
    {
        name: "Health & Wellness",
        description: "Everyday essentials for a healthier lifestyle.",
        image:
            "https://images.unsplash.com/photo-1505576399273-565b52d4ac71?w=800",
        icon: HeartPulse,
    },
    {
        name: "Personal Care",
        description: "Thoughtful essentials for your daily routine.",
        image:
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800",
        icon: Activity,
    },
    {
        name: "Healthcare Essentials",
        description: "The essentials you need, all in one place.",
        image:
            "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800",
        icon: Pill,
    },
];

const benefits = [
    {
        icon: ShieldCheck,
        title: "Quality-Focused Products",
        description:
            "Explore carefully selected healthcare products for your everyday needs.",
    },
    {
        icon: Truck,
        title: "Convenient Delivery",
        description:
            "Shop online and get your healthcare essentials delivered to your doorstep.",
    },
    {
        icon: BadgeCheck,
        title: "Simple & Secure Shopping",
        description:
            "Enjoy a straightforward shopping experience with easy order management.",
    },
    {
        icon: Headphones,
        title: "Customer Assistance",
        description:
            "Our support team is available to help with your shopping queries.",
    },
];

const testimonials = [
    {
        name: "Priya Sharma",
        location: "Delhi",
        review:
            "The website is easy to use and I could quickly find the healthcare products I needed.",
    },
    {
        name: "Amit Verma",
        location: "Noida",
        review:
            "A convenient shopping experience with a good selection of everyday healthcare essentials.",
    },
    {
        name: "Neha Gupta",
        location: "Gurugram",
        review:
            "I liked the clean product display and simple ordering experience. Very convenient.",
    },
];

function Home() {
    const [addedProduct, setAddedProduct] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (product) => {
        let user = null;

        try {
            user = JSON.parse(localStorage.getItem("medicareUser") || "null");
        } catch {
            user = null;
        }

        if (!user?.email) {
            navigate("/login", {
                state: {
                    from: location,
                    action: "add-to-cart",
                },
            });
            return;
        }

        try {
            const existingCart = JSON.parse(
                localStorage.getItem("medicareCart") || "[]"
            );

            const existingProduct = existingCart.find(
                (item) => item.id === product.id
            );

            let updatedCart;

            if (existingProduct) {
                updatedCart = existingCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [
                    ...existingCart,
                    { ...product, quantity: 1 },
                ];
            }

            localStorage.setItem("medicareCart", JSON.stringify(updatedCart));
            setAddedProduct(product.id);

            setTimeout(() => {
                setAddedProduct(null);
            }, 1800);
        } catch {
            alert("Unable to add product. Please try again.");
        }
    };

    return (
        <>
            <main className="bg-white overflow-hidden">

                {/* HERO SECTION */}

                {/* PREMIUM HEALTHCARE HERO */}
                <section className="relative bg-[#F5F9FF] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-11 lg:py-14">

                        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-center">

                            {/* LEFT CONTENT */}
                            <div className="relative z-10">

                                <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-2 text-blue-700 text-xs font-bold tracking-wide shadow-sm">
                                    <ShieldCheck size={15} />
                                    YOUR TRUSTED HEALTHCARE STORE
                                </div>

                                <h1 className="text-[36px] sm:text-5xl lg:text-[58px] font-extrabold text-[#102A43] leading-[1.13] tracking-tight mt-6">
                                    Better Healthcare,
                                    <span className="block text-[#2563EB]">
                                        Better Living.
                                    </span>
                                </h1>

                                <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 mt-5 max-w-xl">
                                    Discover quality medical equipment, healthcare essentials
                                    and wellness products. Everything you need for everyday
                                    care, conveniently available in one place.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 mt-7">
                                    <Link
                                        to="/shop"
                                        className="inline-flex items-center justify-center gap-3 bg-[#155EEF] hover:bg-[#124BCC] text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200/60 transition-all duration-300"
                                    >
                                        Explore Products
                                        <ArrowRight size={19} />
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition-all"
                                    >
                                        Contact Us
                                    </Link>
                                </div>

                                {/* TRUST POINTS */}
                                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 pt-6 border-t border-blue-100">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-teal-600" />
                                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                                            Quality Focused
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Truck size={18} className="text-teal-600" />
                                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                                            Easy Delivery
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Headphones size={18} className="text-teal-600" />
                                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                                            Customer Support
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="relative">

                                <div className="absolute -inset-4 bg-blue-100/60 rounded-[32px] blur-2xl" />

                                <div className="relative rounded-[24px] overflow-hidden bg-white p-2 shadow-xl shadow-blue-900/10 border border-white">

                                    <img
                                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=85"
                                        alt="Healthcare professional providing medical care"
                                        className="w-full h-[260px] sm:h-[370px] lg:h-[455px] object-cover rounded-[19px]"
                                    />

                                    {/* IMAGE INFO CARD */}
                                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <HeartPulse size={24} />
                                            </div>

                                            <div>
                                                <h3 className="text-sm sm:text-base font-bold text-[#102A43]">
                                                    Your Health Matters
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                                    Everyday healthcare, made convenient.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* TRUST STRIP */}
                <section className="border-b border-slate-100 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: ShieldCheck, text: "Quality-Focused Products" },
                            { icon: Truck, text: "Convenient Delivery" },
                            { icon: BadgeCheck, text: "Easy Shopping Experience" },
                            { icon: Headphones, text: "Customer Assistance" },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.text}
                                    className="flex items-center justify-center gap-3"
                                >
                                    <Icon size={22} className="text-blue-600 shrink-0" />
                                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                                        {item.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CATEGORIES */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
                            <div>
                                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                    Explore Our Collection
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                                    Shop by Category
                                </h2>
                                <p className="text-slate-500 mt-3">
                                    Find the right essentials for your everyday care.
                                </p>
                            </div>

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                            >
                                View All Products
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <Link
                                        to={`/shop?category=${encodeURIComponent(category.name)}`}
                                        key={category.name}
                                        className="group rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-xl hover:shadow-blue-100/70 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

                                            <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-lg">
                                                <Icon size={22} />
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="font-bold text-slate-900 text-lg">
                                                    {category.name}
                                                </h3>
                                                <ArrowUpRight
                                                    size={20}
                                                    className="text-blue-600 shrink-0"
                                                />
                                            </div>

                                            <p className="text-sm text-slate-500 mt-2 leading-6">
                                                {category.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FEATURED PRODUCTS */}
                <section className="py-16 sm:py-20 bg-[#F7F9FC]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
                            <div>
                                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                    Our Selection
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                                    Featured Products
                                </h2>
                                <p className="text-slate-500 mt-3">
                                    Discover healthcare essentials from our collection.
                                </p>
                            </div>

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                            >
                                Shop All Products
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.slice(0, 3).map((product) => {
                                const discount = product.mrp
                                    ? Math.round(
                                        ((product.mrp - product.price) / product.mrp) * 100
                                    )
                                    : 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-100/60 transition-all group"
                                    >
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="relative block bg-[#F1F6FD] p-5"
                                        >
                                            {discount > 0 && (
                                                <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                    {discount}% OFF
                                                </span>
                                            )}

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-56 object-contain group-hover:scale-105 transition duration-500"
                                            />
                                        </Link>

                                        <div className="p-5">
                                            <Link to={`/product/${product.id}`}>
                                                <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <div className="flex items-center gap-1.5 mt-3">
                                                <Star
                                                    size={16}
                                                    className="text-amber-400 fill-amber-400"
                                                />
                                                <span className="text-sm font-semibold text-slate-700">
                                                    {product.rating}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    Customer Rating
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 mt-4">
                                                <span className="text-xl font-extrabold text-slate-900">
                                                    ₹{product.price.toLocaleString("en-IN")}
                                                </span>

                                                {product.mrp > product.price && (
                                                    <span className="text-sm text-slate-400 line-through">
                                                        ₹{product.mrp.toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`w-full mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition ${addedProduct === product.id
                                                        ? "bg-teal-600 text-white"
                                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                                    }`}
                                            >
                                                {addedProduct === product.id ? (
                                                    <>
                                                        <Check size={19} />
                                                        Added to Cart
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingCart size={19} />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* PROMOTIONAL BANNER */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-[30px] bg-[#0D2855]">
                            <div className="absolute -right-20 -top-28 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                            <div className="absolute -left-20 -bottom-28 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

                            <div className="relative grid lg:grid-cols-2 items-center gap-8 p-7 sm:p-12 lg:p-14">
                                <div>
                                    <span className="inline-flex items-center gap-2 bg-white/10 text-blue-100 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider">
                                        <HeartPulse size={16} />
                                        Everyday Healthcare
                                    </span>

                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mt-6">
                                        Make Your Health
                                        <span className="block text-teal-300">
                                            A Priority.
                                        </span>
                                    </h2>

                                    <p className="text-blue-100 leading-7 mt-5 max-w-lg">
                                        Explore our healthcare collection and find the essentials
                                        that support your everyday wellbeing.
                                    </p>

                                    <Link
                                        to="/shop"
                                        className="inline-flex items-center gap-3 bg-white hover:bg-blue-50 text-blue-800 px-7 py-4 rounded-xl font-bold mt-8 transition"
                                    >
                                        Start Shopping
                                        <ArrowRight size={19} />
                                    </Link>
                                </div>

                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1000"
                                        alt="Healthcare professional"
                                        className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className="py-16 sm:py-20 bg-[#F7F9FC]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center mb-12">
                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                Why MediCare
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                                A Better Way to Shop for Healthcare
                            </h2>

                            <p className="text-slate-500 mt-4 leading-7">
                                We make it easier to discover and shop for your everyday
                                healthcare essentials.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <div
                                        key={benefit.title}
                                        className="p-7 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition"
                                    >
                                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                            <Icon size={26} />
                                        </div>

                                        <h3 className="font-bold text-slate-900 mt-6">
                                            {benefit.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 leading-7 mt-3">
                                            {benefit.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                Customer Experiences
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                                What Our Customers Say
                            </h2>

                            <p className="text-slate-500 mt-3">
                                A simple shopping experience is at the heart of what we do.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((item) => (
                                <div
                                    key={item.name}
                                    className="border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition"
                                >
                                    <Quote size={30} className="text-blue-200" />

                                    <div className="flex gap-1 mt-5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={16}
                                                className="fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-600 leading-7 mt-4">
                                        "{item.review}"
                                    </p>

                                    <div className="border-t border-slate-100 mt-6 pt-5">
                                        <h3 className="font-bold text-slate-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                    <div className="max-w-7xl mx-auto rounded-[28px] bg-blue-50 border border-blue-100 px-6 sm:px-12 py-12 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-7">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold">
                                <Clock3 size={17} />
                                YOUR HEALTHCARE STORE
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                                Find Your Everyday Essentials
                            </h2>

                            <p className="text-slate-500 mt-3">
                                Explore our collection and shop with convenience.
                            </p>
                        </div>

                        <Link
                            to="/shop"
                            className="shrink-0 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition"
                        >
                            Shop Now
                            <ArrowRight size={19} />
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
}

export default Home;
