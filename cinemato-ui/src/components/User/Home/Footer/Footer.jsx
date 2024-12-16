import { FaHeadphonesAlt, FaRedoAlt, FaEnvelope } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Top Section with Icons */}
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
          {/* 24/7 Customer Support */}
          <div className="flex flex-col items-center">
            <FaHeadphonesAlt size={50} className="text-secondary mb-4" />
            <h3 className="text-lg font-semibold">24/7 Customer Support</h3>
            <p className="text-sm text-gray-400 mt-2">
              We're here to assist you anytime, anywhere.
            </p>
          </div>
          {/* Resend Booking Confirmation */}
          <div className="flex flex-col items-center">
            <FaRedoAlt size={50} className="text-secondary mb-4" />
            <h3 className="text-lg font-semibold">Resend Booking Confirmation</h3>
            <p className="text-sm text-gray-400 mt-2">
              Lost your ticket details? Resend it instantly.
            </p>
          </div>
          {/* Subscribe to Newsletter */}
          <div className="flex flex-col items-center">
            <FaEnvelope size={50} className="text-secondary mb-4" />
            <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-400 mt-2">
              Get the latest updates and offers straight to your inbox.
            </p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm leading-relaxed">
            Welcome to our movie booking website, your one-stop destination to book tickets for the latest blockbusters and cult classics. We provide seamless and hassle-free booking services, ensuring you never miss a moment of the magic. Discover exclusive deals, top-notch recommendations, and a personalized movie experience tailored to your taste. Lights, camera, action!
          </p>
        </div>

        <div className="text-center mb-5">

          <div className="flex justify-center space-x-6 text-gray-400">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition duration-300"
            >
              <FiFacebook size={28} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition duration-300"
            >
              <FiInstagram size={28} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition duration-300"
            >
              <FiTwitter size={28} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-white transition duration-300"
            >
              <FiYoutube size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-gray-500 text-sm text-center py-4">
        <p>&copy; {new Date().getFullYear()} Cinemato. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
