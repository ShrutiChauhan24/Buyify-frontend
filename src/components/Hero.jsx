import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images-cdn.ubuy.ae/660ca46a3ca7d70bac0d182a-htnbo-cute-crop-tops-for-women-summer.jpg",
  "https://cottonworld.net/cdn/shop/files/L-TSHIRT-11670-21499-RUST_1.jpg?v=1753678084",
  "https://i.pinimg.com/564x/26/3a/0f/263a0fdf076f9a01492efee554e59e64.jpg",
  "https://cdn.shopify.com/s/files/1/0552/7322/6351/files/oversized-hoodie-mockup-of-a-modern-woman-posing-at-a-studio-m26238_585x.png?v=1706429570",
  "https://assets.ajio.com/medias/sys_master/root/20240129/RNa1/65b6c6cc8cdf1e0df5d39f17/-473Wx593H-467016465-pink-MODEL.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const slides = [...images, ...images];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index >= images.length) {
      setTimeout(() => setIndex(0), 700);
    }
  }, [index]);

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center px-4 sm:px-8 lg:px-20 bg-white overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 text-center sm:text-left flex flex-col justify-center items-center lg:items-start">
        <span className="text-pink-600 tracking-widest text-sm font-semibold">
          NEW COLLECTION
        </span>

        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight md:leading-tight text-center sm:text-left">
          Wear Your <br />
          <span className="text-pink-600">Confidence</span>
        </h1>

        <p className="mt-4 text-gray-500 max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg mx-auto sm:mx-0 text-center sm:text-left">
          Premium everyday clothing crafted for comfort, movement, and modern
          lifestyle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-10 justify-center sm:justify-start">
          <Link
            to={"/shop/all-products"}
            className="bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base"
          >
            Shop Now
          </Link>
          <button className="border-2 border-pink-600 text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base">
            Explore
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {/* RIGHT SIDE */}
<div className="w-full lg:w-1/2 overflow-hidden mt-10 lg:mt-0 flex justify-center items-center">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{
      // Using 100% here works best if the child is w-full
      transform: `translateX(-${index * 100}%)`,
    }}
  >
    {slides.map((src, i) => (
      <div
        key={i}
        className="shrink-0 w-full flex justify-center items-center"
      >
        <div className={`transition-transform duration-700 ${
          i === index ? "scale-100" : "scale-90"
        }`}>
          <img
            src={src}
            className="w-auto h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-2xl shadow-lg"
            alt="product"
          />
        </div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
};

export default Hero;
