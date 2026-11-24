
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Headphones,
  HelpCircle,
  Truck,
  RefreshCcw,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

const sections = [
  { id: "help-center", title: "Help Center", icon: Headphones },
  { id: "faq", title: "Frequently Asked Questions", icon: HelpCircle },
  { id: "shipping-policy", title: "Shipping Policy", icon: Truck },
  { id: "return-policy", title: "Return & Refund Policy", icon: RefreshCcw },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer: "Browse our products, add your selected items to the cart, and follow the checkout process to place your order."
  },
  {
    question: "How can I track my order?",
    answer: "Visit the My Orders section after logging into your account to check your order details and available tracking information."
  },
  {
    question: "Can I cancel my order?",
    answer: "Please contact our customer support as soon as possible with your order details to check whether cancellation is possible."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us through the Contact Us page. Our support contact details will be updated here when available."
  },
];

export default function Support() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);

      return () => clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="bg-[#0F1F3A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">
            We're Here to Help
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-3">
            Customer Support
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto leading-7">
            Find answers to your questions about orders, shipping, returns
            and shopping with MediCare.
          </p>
        </div>
      </section>

      {/* Support Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <Icon size={17} />
                {item.title}
              </a>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

        {/* Help Center */}
        <section
          id="help-center"
          className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Headphones size={25} />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">Support</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Help Center
              </h2>
            </div>
          </div>

          <p className="text-slate-600 leading-7">
            Need assistance with MediCare? We're here to help you with
            product information, orders, payments, delivery and other
            shopping-related questions.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            <div className="bg-slate-50 rounded-xl p-5">
              <Mail className="text-blue-600 mb-3" size={24} />
              <h3 className="font-bold text-slate-900">Email Support</h3>
              <p className="text-sm text-slate-500 mt-2">
                Our support email address will be updated soon.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <Phone className="text-blue-600 mb-3" size={24} />
              <h3 className="font-bold text-slate-900">Phone Support</h3>
              <p className="text-sm text-slate-500 mt-2">
                Our customer care number will be updated soon.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HelpCircle size={25} />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">Questions</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-slate-200 rounded-xl p-5"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-slate-800 list-none">
                  {faq.question}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-blue-600 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="text-slate-500 text-sm leading-7 mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Shipping Policy */}
        <section
          id="shipping-policy"
          className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck size={25} />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">Delivery</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Shipping Policy
              </h2>
            </div>
          </div>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-900">Order Processing</h3>
              <p>
                Orders are processed after successful confirmation. Processing
                and dispatch details will be shared as they become available.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Delivery Charges</h3>
              <p>
                Applicable shipping charges, if any, will be displayed during
                checkout before you confirm your order.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Delivery Updates</h3>
              <p>
                Please check your My Orders section for available order and
                delivery updates.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Incorrect Address</h3>
              <p>
                Please carefully verify your shipping address before placing
                an order. Contact support promptly if you notice an error.
              </p>
            </div>
          </div>
        </section>

        {/* Return Policy */}
        <section
          id="return-policy"
          className="scroll-mt-28 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <RefreshCcw size={25} />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-bold uppercase">Returns</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Return & Refund Policy
              </h2>
            </div>
          </div>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-900">Return Requests</h3>
              <p>
                If you receive a damaged, defective or incorrect product,
                please contact customer support with your order details
                and relevant photographs.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Product Condition</h3>
              <p>
                Return eligibility may depend on the product category,
                condition, packaging and applicable hygiene or safety
                requirements.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Refund Process</h3>
              <p>
                Refund requests will be reviewed after the return or
                cancellation is approved. Applicable refund details will
                be communicated to the customer.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Need Help?</h3>
              <p>
                Contact our customer support team before sending any
                product back. Please refer to the Contact Us page for
                available contact details.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
