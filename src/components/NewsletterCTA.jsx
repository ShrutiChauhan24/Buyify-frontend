import { Mail } from "lucide-react";

const NewsletterCTA = () => {
  return (
    <section className="bg-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20">
        
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">

          {/* LEFT */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Get <span className="text-pink-600">10% Off</span> Your First Order
            </h2>
            <p className="text-gray-500 mt-3 sm:mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
              Join our newsletter to get exclusive deals, early access to new drops,
              and style inspiration.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row items-stretch sm:items-center bg-gray-100 rounded-full p-2 gap-2 sm:gap-0">
              
              <div className="flex items-center gap-2 px-4 text-gray-400 flex-1">
                <Mail className="w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none w-full text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
