import { FiShoppingCart } from 'react-icons/fi';

export default function ShoppingCartButton({ cartCount }) {
  return (
    <div className="relative">
      <button className="text-gray-700">
        <FiShoppingCart size={28} />
      </button>

      {/* Badge for cart count */}
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  );
}
