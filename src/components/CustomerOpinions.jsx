import { Star } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    name: "Smriti Verma",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "The quality is honestly amazing. Fabric feels premium and the fit is perfect. Definitely ordering again!",
  },
  {
    name: "Amit Sharma",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Loved the hoodie! Delivery was fast and packaging was neat. Worth the price.",
  },
  {
    name: "Shruti Chauhan",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Super comfortable and stylish. I get compliments every time I wear it.",
  },
  {
    name: "Rahul Mehra",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment: "Great experience. The customer support was very helpful with my size exchange.",
  },
];

const CustomerOpinions = () => {
  return (
    <section className="bg-white overflow-hidden">
      {/* Dynamic padding: px-6 for mobile, px-20 for desktop */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">

        {/* Header - Centered for mobile */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            What People <span className="text-pink-600">Say</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Real opinions from our customers
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2} // Shows a peek of the next card on mobile
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            // When window width is >= 640px (tablet)
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // When window width is >= 1024px (desktop)
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-14" // Space for pagination dots
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition h-full flex flex-col border border-gray-100">
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-pink-600 text-pink-600"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  “{review.comment}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Adding some global CSS for Swiper pagination dots color */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #db2777 !important; /* pink-600 */
        }
      `}</style>
    </section>
  );
};

export default CustomerOpinions;