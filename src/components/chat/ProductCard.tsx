import type { ProductCard as ProductCardType } from "../../types/chat.types";

interface ProductCardProps {
  product: ProductCardType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  // Safety check
  if (!product.slug) {
    console.error("⚠️ Product missing slug:", product);
    return null;
  }

  return (
    <a
      href={`/${product.slug}`}
      className="block bg-white rounded-lg md:rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="p-2 md:p-3">
        <div className="flex gap-2 md:gap-3">
          {/* Product Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 mb-1 md:mb-2 group-hover:text-red-600 transition-colors">
              {product.name}
            </h4>

            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {/* Sale Price */}
              <span className="text-sm md:text-base font-bold text-red-600">
                {formatPrice(product.sale_price || product.price)}
              </span>

              {/* Original Price */}
              {product.sale_price && product.sale_price < product.price && (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="inline-flex items-center px-1.5 md:px-2 py-0.5 rounded-md text-xs font-semibold bg-red-100 text-red-700">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
