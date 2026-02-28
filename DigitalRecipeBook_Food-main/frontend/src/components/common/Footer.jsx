/**
 * Footer Component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🍳 RecipeBook</h3>
            <p className="text-gray-400">
              Your personal digital recipe book to organize, share, and discover delicious recipes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="/" className="hover:text-primary transition">About</a></li>
              <li><a href="/" className="hover:text-primary transition">Contact</a></li>
              <li><a href="/" className="hover:text-primary transition">Privacy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-primary transition">Facebook</a>
              <a href="#" className="hover:text-primary transition">Twitter</a>
              <a href="#" className="hover:text-primary transition">Instagram</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Digital Recipe Book. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
