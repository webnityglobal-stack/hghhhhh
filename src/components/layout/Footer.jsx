
import { Link } from "react-router-dom";
import {
    Heart,
    Mail,
    Phone,
    MapPin,
    Globe,
    Camera,
    BriefcaseBusiness,
    MessageCircle,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

function Footer() {
    return (
        <footer className="bg-[#0F1F3A] text-white">

            {/* Newsletter Section */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Stay Healthy, Stay Updated!
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">
                            Get updates about healthcare products and special offers.
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Newsletter subscription will be available soon!");
                        }}
                        className="flex w-full lg:max-w-md bg-white rounded-xl p-1.5"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            className="w-full min-w-0 px-3 py-2 text-sm text-slate-800 outline-none rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition shrink-0"
                        >
                            Subscribe
                            <ArrowRight size={16} />
                        </button>
                    </form>

                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2">
                            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Heart size={25} fill="white" />
                            </div>

                            <span className="text-2xl font-extrabold">
                                Medi<span className="text-blue-400">Care</span>
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-7 mt-5 max-w-xs">
                            Your trusted destination for medical equipment,
                            healthcare essentials and wellness products.
                            Making healthcare shopping simple and convenient.
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            {[
                                { icon: Globe, url: "#", name: "Website" },
                                { icon: Camera, url: "#", name: "Instagram" },
                                { icon: BriefcaseBusiness, url: "#", name: "LinkedIn" },
                                { icon: MessageCircle, url: "#", name: "Social Media" },
                            ].map((social, index) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        aria-label={social.name}
                                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Shop Products</Link></li>
                            <li><Link to="/my-orders" className="hover:text-white transition">My Orders</Link></li>
                            <li><Link to="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">
                            Customer Support
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/contact" className="hover:text-white transition">Help Center</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
                            <li><Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>
                            <li><Link to="/return-policy" className="hover:text-white transition">Return Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Customer Care</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">
                            Get In Touch
                        </h3>

                        <div className="space-y-5 text-sm text-slate-400">

                            <div className="flex gap-3 items-start">
                                <MapPin size={19} className="text-blue-400 shrink-0 mt-1" />
                                <p>
                                    MediCare Healthcare Store
                                    <br />
                                    India
                                </p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <Phone size={19} className="text-blue-400 shrink-0" />
                                <span>Contact number coming soon</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <Mail size={19} className="text-blue-400 shrink-0" />
                                <span>Email address coming soon</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <ShieldCheck size={19} className="text-teal-400 shrink-0" />
                                <span>Customer-first shopping experience</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-5">

                    <p className="text-xs sm:text-sm text-slate-500 text-center">
                        © {new Date().getFullYear()} MediCare. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-5 text-xs sm:text-sm text-slate-400">
                        <Link to="/privacy-policy" className="hover:text-white transition">
                            Privacy Policy
                        </Link>

                        <Link to="/terms" className="hover:text-white transition">
                            Terms & Conditions
                        </Link>

                        <Link to="/contact" className="hover:text-white transition">
                            Support
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
