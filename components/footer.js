export default function Footer() {
  return (
    <>
      <footer className="py-4 bg-gray-800 text-white">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-32 flex items-center justify-center">
              Column 1
            </div>
            <div className="h-32 flex items-center justify-center">
              Column 2
            </div>
            <div className="h-32 flex items-center justify-center">
              Column 3
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} My Website. All rights reserved.
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
