import { Mail, Phone, MapPin } from "lucide-react";
import {toast} from "react-toastify";

const Contact = () => {

   const handleSubmit = async (e)=>{
     e.preventDefault();
     try {
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const message = e.target.message.value.trim();

        if(!name || !email || !message){
          toast.error("All fields are required")
           return
        }
        toast.success("Message sent successfully")
         e.target.reset(); 
     } catch (error) {
       toast.error("Unable to submit message,try again later")
     }
   }

  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-20 py-24">
          <h1 className="text-5xl font-extrabold">
            Contact <span className="text-pink-600">Us</span>
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl text-lg">
            Have questions about our products, orders, or delivery?
            We’re here to help.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* CONTACT INFO */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Get in <span className="text-pink-600">Touch</span>
          </h2>

          <p className="text-gray-600 mb-8">
            Our support team is available to assist you with any
            questions or concerns.
          </p>

          <ul className="space-y-6 text-gray-600">
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-pink-600" />
              <span>support@buyify.com</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-pink-600" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-pink-600" />
              <span>
                BUYIFY Fashion Pvt. Ltd.<br />
                New Delhi, India
              </span>
            </li>
          </ul>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-gray-50 p-10 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                 name="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                name="message"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>

            <button
              type="submit"
              className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* MAP */}
      <div className="w-full" style={{height:"420px"}}>
        <iframe
          title="Store Location"
          src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
