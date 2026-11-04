function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">

      {/* Product Image */}
      <div className="bg-blue-50 p-6 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        <div className="text-yellow-500 text-sm mb-2">
          ⭐ {product.rating} / 5
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {product.name}
        </h2>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{product.mrp}
          </span>
        </div>

        {/* Add To Cart */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;