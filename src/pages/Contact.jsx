
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  ShieldCheck,
  ArrowRight,
  HeartPulse,
  Plus,
  ChevronDown,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
    description: "Speak with our support team",
    link: "tel:+919876543210",
    color: "blue",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "support@medicare.com",
    description: "Send us your queries anytime",
    link: "mailto:support@medicare.com",
    color: "teal",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "New Delhi, India",
    description: "Our customer support office",
    link: "https://maps.google.com/?q=New+Delhi",
    color: "purple",
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order by visiting the My Orders section after logging into your MediCare account.",
  },
  {
    question: "How can I return a product?",
    answer:
      "Please contact our support team with your order details. Our team will guide you through the applicable return process.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery timelines depend on your location and product availability. You can check the estimated delivery details during checkout.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our team through the contact form, phone number or email listed on this page.",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `
Hello MediCare Support,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-[#071D3B] text-white overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-teal-400/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300/20 bg-blue-400/10 text-blue-200 text-xs font-bold tracking-[2px] uppercase">
                <MessageCircle size={15} />
                We're Here To Help
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-7">
                Let's Talk About
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                  Your Health.
                </span>
              </h1>

              <p className="text-blue-100/75 text-sm sm:text-lg leading-8 mt-6 max-w-xl">
                Have questions about our products, orders or services?
                Our support team is here to make your MediCare shopping
                experience simple and convenient.
              </p>

              <div className="flex flex-wrap gap-5 mt-9">
                <div className="flex items-center gap-2 text-sm text-blue-100/80">
                  <ShieldCheck size={19} className="text-teal-300" />
                  Customer Assistance
                </div>

                <div className="flex items-center gap-2 text-sm text-blue-100/80">
                  <Clock size={19} className="text-teal-300" />
                  Support Hours
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center min-h-[280px] sm:min-h-[350px]">

              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                <div className="absolute inset-5 rounded-full border border-dashed border-teal-300/30 animate-[spin_30s_linear_infinite]" />

                <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-white to-blue-100 flex items-center justify-center shadow-2xl">
                  <HeartPulse
                    size={105}
                    className="text-blue-600 sm:w-[130px] sm:h-[130px]"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="absolute top-8 right-2 sm:right-5 w-14 h-14 rounded-2xl bg-teal-400 text-white flex items-center justify-center shadow-xl">
                  <Headphones size={29} />
                </div>

                <div className="absolute bottom-7 left-0 sm:left-2 w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-xl">
                  <MessageCircle size={27} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 -mt-7 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.link}
                target={item.title === "Visit Us" ? "_blank" : undefined}
                rel={item.title === "Visit Us" ? "noreferrer" : undefined}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : item.color === "teal"
                    ? "bg-teal-50 text-teal-600"
                    : "bg-purple-50 text-purple-600"
                }`}>
                  <Icon size={24} />
                </div>

                <h3 className="font-extrabold text-[#102A43] text-lg mt-5">
                  {item.title}
                </h3>

                <p className="font-bold text-blue-600 mt-2">
                  {item.value}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  {item.description}
                </p>
              </a>
            );
          })}

        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
              Get In Touch
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] mt-4 leading-tight">
              We'd Love To
              <span className="block text-blue-600">Hear From You.</span>
            </h2>

            <p className="text-slate-500 leading-7 mt-5">
              Whether you need help with an order, have a product question
              or simply want to share feedback, send us a message.
            </p>

            <div className="mt-9 space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#102A43]">
                    Customer First
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-6">
                    We aim to make every interaction helpful and convenient.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Headphones size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#102A43]">
                    Support Assistance
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-6">
                    Reach out to our team for shopping-related queries.
                  </p>
                </div>
              </div>

              <div className="bg-[#102A43] rounded-2xl p-6 mt-8 text-white">
                <div className="flex items-center gap-3">
                  <Clock size={23} className="text-teal-300" />
                  <h3 className="font-bold">Support Hours</h3>
                </div>
                <p className="text-blue-100/80 text-sm mt-3 leading-6">
                  Monday – Saturday
                  <br />
                  10:00 AM – 6:00 PM
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-100 shadow-xl shadow-blue-900/5">

            <h3 className="text-2xl font-extrabold text-[#102A43]">
              Send Us A Message
            </h3>

            <p className="text-sm text-slate-500 mt-2 mb-7">
              Fill out the form and connect with our support team on WhatsApp.
            </p>

            {submitted && (
              <div className="bg-teal-50 border border-teal-200 text-teal-700 p-4 rounded-xl text-sm mb-6">
                WhatsApp opened with your message. Please send it there to complete your enquiry.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9+\-\s()]{10,18}"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition bg-white"
                  >
                    <option value="">Select subject</option>
                    <option value="Order Related">Order Related</option>
                    <option value="Product Enquiry">Product Enquiry</option>
                    <option value="Delivery Issue">Delivery Issue</option>
                    <option value="Return & Refund">Return & Refund</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
              >
                Send Message
                <Send size={18} />
              </button>

              <p className="text-xs text-slate-400 text-center">
                Your enquiry will open in WhatsApp for you to send.
              </p>

            </form>
          </div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16">

        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">

          <div className="p-6 sm:p-8">
            <p className="text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
              Find Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-3">
              We're Here To Help
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Find our location on the map.
            </p>
          </div>

          <iframe
            title="MediCare Location"
            src="https://www.google.com/maps?q=New+Delhi,India&output=embed"
            className="w-full h-[300px] sm:h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">

        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
            Help Center
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] mt-3">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Quick answers to common shopping and support questions.
          </p>
        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
              >
                <span className="font-bold text-[#102A43] text-sm sm:text-base">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-blue-600 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="px-5 sm:px-6 pb-6 text-sm text-slate-500 leading-7">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 sm:px-8 lg:px-10 pb-16">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0D2855] to-[#155EEF] rounded-3xl p-8 sm:p-12 text-center text-white">

          <HeartPulse size={38} className="mx-auto text-teal-300" />

          <h2 className="text-2xl sm:text-4xl font-extrabold mt-5">
            Need Help With Something?
          </h2>

          <p className="text-blue-100 mt-3 max-w-xl mx-auto leading-7">
            Our team is ready to assist you with your MediCare shopping enquiries.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold mt-7 transition"
          >
            Explore Products
            <ArrowRight size={19} />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Contact;
