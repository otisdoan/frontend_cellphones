import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spin, Empty } from "antd";
import { productApi } from "../utils/api/product.api";
import type { ProductProps } from "../types/api/ProductResponse";
import FooterHome from "../components/home/FooterHome";
import HeaderHome from "../components/home/HeaderHome";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll();
      const productsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setProducts(productsData);
      if (query) {
        const filtered = productsData.filter((product: ProductProps) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query && products.length > 0) {
      filterProducts(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, products]);

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("vi-VN").format(numPrice) + "đ";
  };

  const getProductImage = (product: ProductProps) => {
    if (product.product_image && product.product_image.length > 0) {
      return product.product_image[0];
    }
    return "https://via.placeholder.com/300x300?text=No+Image";
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderHome />

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Results Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Kết quả tìm kiếm
            {query && (
              <>
                {" "}
                cho: <span className="text-[#d70019]">"{query}"</span>
              </>
            )}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            {loading ? (
              "Đang tìm kiếm..."
            ) : (
              <>
                Tìm thấy{" "}
                <span className="font-semibold text-[#d70019]">
                  {filteredProducts.length}
                </span>{" "}
                sản phẩm
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" tip="Đang tải sản phẩm..." />
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <p className="text-gray-700 text-base md:text-lg font-medium mb-2">
                    Không tìm thấy sản phẩm phù hợp
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Vui lòng thử lại với từ khóa khác hoặc{" "}
                    <span
                      className="text-[#d70019] cursor-pointer hover:underline font-medium"
                      onClick={() => navigate("/")}
                    >
                      quay về trang chủ
                    </span>
                  </p>
                </div>
              }
            />
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                onClick={() => navigate(`/${product.slug}`)}
              >
                {/* Product Image */}
                <div className="relative bg-white p-4">
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Sale Badge */}
                  {product.sale_price &&
                    parseFloat(product.sale_price) <
                      parseFloat(product.price) && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-[#d70019] text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg">
                          GIẢM GIÁ
                        </div>
                      </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4 border-t border-gray-100">
                  {/* Product Name */}
                  <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2 h-10 md:h-12 mb-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-x-2">
                      <p className="text-[#d70019] font-bold text-base md:text-lg">
                        {formatPrice(product.sale_price || product.price)}
                      </p>
                    </div>

                    {product.sale_price &&
                      parseFloat(product.sale_price) <
                        parseFloat(product.price) && (
                        <div className="flex items-center gap-x-2">
                          <p className="text-gray-400 text-xs md:text-sm line-through">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      )}
                  </div>

                  {/* Stock Status */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    {product.status === "active" ? (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Còn hàng
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 font-medium">
                        ✗ Hết hàng
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Top Button */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-x-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg border border-gray-200 shadow-sm transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <span>Về đầu trang</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterHome />
    </div>
  );
};

export default SearchResults;
