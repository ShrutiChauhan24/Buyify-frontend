import {
  ShieldCheck,
  RefreshCcw,
  Truck,
  Headphones,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "100% safe & encrypted",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Across India",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We’re here to help",
  },
];

const TrustSignals = () => {
  return (
   <section className="border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20 py-8 md:py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {trustItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-center sm:items-start gap-4 text-center sm:text-left justify-center sm:justify-start"
          >
            <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-pink-600" />
            </div>

            <div>
              <p className="font-semibold text-sm">
                {item.title}
              </p>
              <p className="text-gray-500 text-xs">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

  );
};

export default TrustSignals;
