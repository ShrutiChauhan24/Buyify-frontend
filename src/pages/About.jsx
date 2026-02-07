const About = () => {
  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-20 py-24">
          <h1 className="text-5xl font-extrabold leading-tight">
            About <span className="text-pink-600">Us</span>
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl text-lg">
            We design modern clothing for people who value comfort,
            confidence, and everyday style.
          </p>
        </div>
      </div>

      {/* STORY */}
      <div className="max-w-7xl mx-auto px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Our <span className="text-pink-600">Story</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            BUYIFY was born from a simple idea — clothing should feel
            as good as it looks. We were tired of choosing between
            comfort and style, so we decided to create both.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From premium fabrics to modern silhouettes, every piece
            is designed to fit effortlessly into your daily life.
          </p>
        </div>

        <img
          src="https://img.freepik.com/premium-photo/women-s-fashion-store-shopping-center_1112-8047.jpg"
          alt="Our Story"
          className="rounded-3xl object-cover w-full"
          style={{height:"420px"}}
        />
      </div>

      {/* VALUES */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-20 py-20">
          <h2 className="text-4xl font-bold mb-12">
            Our <span className="text-pink-600">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We use carefully selected fabrics and strict quality
                checks to ensure long-lasting comfort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Designed for You</h3>
              <p className="text-gray-600">
                Our designs focus on real people, real movement, and
                real everyday wear.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                From pricing to delivery, we believe in being honest
                and clear with our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <img
          src="https://media.istockphoto.com/id/1572391955/photo/clothing-boutique-with-clothes-and-accessories-on-display.jpg?s=612x612&w=0&k=20&c=7Wz2BgEet3vbGQA9g4M0NDZzV3pMTa8t8UDIcOq_r4E="
          alt="Why Choose Us"
          className="rounded-3xl object-cover w-full"
          style={{height:"420px"}}
        />

        <div>
          <h2 className="text-4xl font-bold mb-6">
            Why <span className="text-pink-600">Choose Us</span>
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li>✔ Premium quality fabrics</li>
            <li>✔ Modern & minimal designs</li>
            <li>✔ Secure payments & easy returns</li>
            <li>✔ Fast and reliable delivery</li>
            <li>✔ Customer-first support</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-pink-600">
        <div className="max-w-7xl mx-auto px-20 py-20 text-white">
          <h2 className="text-4xl font-extrabold mb-6">
            Wear Confidence. Wear BUYIFY.
          </h2>
          <p className="max-w-xl mb-8 text-pink-100">
            Discover clothing designed to move with you — wherever
            life takes you.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
