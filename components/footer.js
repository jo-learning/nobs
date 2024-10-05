import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <footer className="py-4 bg-gray-800 text-white">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className=" flex items-center justify-center lg:border-none border-b-2">
              <div>
                <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
                <ul>
                  <li className="mb-2">
                    <a href="tel:+1234567890" className="hover:underline">
                      Phone: +1 234 567 890
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="mailto:support@example.com"
                      className="hover:underline"
                    >
                      Email: support@example.com
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex items-center justify-center lg:border-none border-b-2">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Collaborate With Us
                </h2>
                <ul>
                  <li className="mb-2">
                    <a href="/partnerships" className="hover:underline">
                      Partnerships
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/affiliate" className="hover:underline">
                      Affiliate Program
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/careers" className="hover:underline">
                      Careers
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/sponsorship" className="hover:underline">
                      Sponsorships
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-32 flex items-center justify-center">
              <div className="container mx-auto flex flex-col  items-center justify-between">
                <div className="text-center md:text-left mb-4">
                  <p className="text-lg font-semibold">Stay Connected</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700"
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Nobsmart. All rights reserved.
          </p>
          <p className="text-sm">
            <a href="/privacy-policy" className="hover:underline text-gray-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
