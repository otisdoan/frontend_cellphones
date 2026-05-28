import React, { useState, useMemo } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { FiThumbsUp, FiX, FiCheck, FiChevronRight } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

interface MockReview {
  id: number;
  userName: string;
  userInitials: string;
  avatarBg: string;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  tags?: string[];
  isVerifiedPurchase: boolean;
  dateText: string;
  helpfulCount: number;
  isUpvoted?: boolean;
}

interface ProductReviewsProps {
  productName?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productName = "sản phẩm" }) => {
  // Initial Mock Reviews
  const [reviews, setReviews] = useState<MockReview[]>([
    {
      id: 1,
      userName: "Lương Quốc Khang",
      userInitials: "L",
      avatarBg: "bg-purple-700",
      rating: 5,
      title: "Tuyệt vời",
      content: "9/10. Mọi thứ hoàn hảo.",
      pros: [
        "AI thông minh ( Ưng nhất là xóa vật thể trong ảnh )",
        "Siêu phù hợp cho người có bảo mật riêng tư",
        "Mua chưng, không chơi game dt nên chưa biết hiệu năng thế nào, nhma dòng mới chắc xịn :3",
        "Nhiều thứ linh tinh khác, có lẽ đời trước đã có sẵn"
      ],
      cons: [
        "Pin vẫn 5000 mAh",
        "Bút Pen bên trái và ko điều khi lắp ngược 180 độ",
        "Cam lồi làm chênh dt khi để ngửa trên bàn ( phải dùng ốp khắc phục )"
      ],
      tags: ["Hiệu năng Siêu mạnh mẽ", "Thời lượng pin Khủng", "Chất lượng camera Chụp đẹp, chuyên nghiệp"],
      isVerifiedPurchase: true,
      dateText: "Đánh giá đã đăng vào 1 tháng trước",
      helpfulCount: 12,
    },
    {
      id: 2,
      userName: "Hoàng Việt",
      userInitials: "H",
      avatarBg: "bg-green-700",
      rating: 5,
      title: "Tuyệt vời",
      content: "tuyệt vời. quá chất lượng",
      isVerifiedPurchase: false,
      dateText: "Đánh giá đã đăng vào 3 tuần trước",
      helpfulCount: 2,
    },
    {
      id: 3,
      userName: "Anh Bảo",
      userInitials: "A",
      avatarBg: "bg-indigo-600",
      rating: 5,
      title: "Tuyệt vời",
      content: "da mu hang chat luong dich vu tot",
      isVerifiedPurchase: true,
      dateText: "Đánh giá đã đăng vào 1 tuần trước",
      helpfulCount: 0,
    },
    {
      id: 4,
      userName: "Tiến Văn",
      userInitials: "T",
      avatarBg: "bg-amber-700",
      rating: 5,
      title: "Tuyệt vời",
      content: "Sản phẩm xuất sắc, hiệu năng đỉnh, chụp đêm tuyệt vời. Chơi game siêu mượt. Giá này ngon hơn cả Iphone 17 promax",
      tags: ["Hiệu năng Siêu mạnh mẽ", "Thời lượng pin Cực khủng", "Chất lượng camera Chụp đẹp, chuyên nghiệp"],
      isVerifiedPurchase: true,
      dateText: "Đánh giá đã đăng vào 2 tuần trước",
      helpfulCount: 5,
    },
    {
      id: 5,
      userName: "Nguyễn Thị Hoa",
      userInitials: "N",
      avatarBg: "bg-red-600",
      rating: 4,
      title: "Rất tốt",
      content: "Sản phẩm dùng tốt, pin khỏe nhma chụp ảnh hơi tối tí khi ở trong phòng thiếu sáng.",
      isVerifiedPurchase: true,
      dateText: "Đánh giá đã đăng vào 4 tuần trước",
      helpfulCount: 1,
    },
    {
      id: 6,
      userName: "Trần Minh Tâm",
      userInitials: "T",
      avatarBg: "bg-blue-600",
      rating: 5,
      title: "Tuyệt vời",
      content: "rất thích hợp trong tầm giá, giao hàng nhanh chóng, đóng gói cẩn thận.",
      isVerifiedPurchase: true,
      dateText: "Đánh giá đã đăng vào 1 tháng trước",
      helpfulCount: 3,
    }
  ]);

  // Active filters states
  const [activeFilter, setActiveFilter] = useState<string>("Tất cả");
  // Limit visible reviews limit
  const [displayLimit, setDisplayLimit] = useState<number>(5);
  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Review Form States
  const [newRating, setNewRating] = useState<number>(5);
  const [newPerformanceRating, setNewPerformanceRating] = useState<number>(5);
  const [newBatteryRating, setNewBatteryRating] = useState<number>(5);
  const [newCameraRating, setNewCameraRating] = useState<number>(5);
  const [newContent, setNewContent] = useState<string>("");
  const [newProsText, setNewProsText] = useState<string>("");
  const [newConsText, setNewConsText] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Pre-defined quick tags that user can select
  const availableTags = [
    "Hiệu năng Siêu mạnh mẽ",
    "Thời lượng pin Khủng",
    "Chất lượng camera Chụp đẹp, chuyên nghiệp",
    "Thiết kế sang trọng",
    "Màn hình sắc nét",
    "Sạc siêu nhanh"
  ];

  // Dynamic statistics calculations based on the reviews state
  const totalReviews = reviews.length;
  
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const rating = Math.min(5, Math.max(1, Math.round(r.rating))) as 5|4|3|2|1;
      distribution[rating] += 1;
    });
    return distribution;
  }, [reviews]);

  const ratingAverage = useMemo(() => {
    if (totalReviews === 0) return "5.0";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  // Handle Tag Selection in Form
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Upvote Helpful button click
  const handleHelpfulClick = (reviewId: number) => {
    setReviews(prevReviews =>
      prevReviews.map(r => {
        if (r.id === reviewId) {
          const upvoted = !r.isUpvoted;
          return {
            ...r,
            helpfulCount: upvoted ? r.helpfulCount + 1 : r.helpfulCount - 1,
            isUpvoted: upvoted
          };
        }
        return r;
      })
    );
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) {
      alert("Vui lòng nhập nội dung đánh giá");
      return;
    }
    if (!newName.trim()) {
      alert("Vui lòng nhập họ và tên của bạn");
      return;
    }

    const initials = newName.trim().charAt(0).toUpperCase();
    const bgColors = ["bg-red-600", "bg-purple-600", "bg-pink-600", "bg-green-600", "bg-blue-600", "bg-amber-600", "bg-indigo-600"];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const splitPros = newProsText.trim() ? newProsText.split("\n").filter(line => line.trim()) : undefined;
    const splitCons = newConsText.trim() ? newConsText.split("\n").filter(line => line.trim()) : undefined;

    const newReview: MockReview = {
      id: Date.now(),
      userName: newName.trim(),
      userInitials: initials,
      avatarBg: randomBg,
      rating: newRating,
      title: newRating >= 4 ? "Tuyệt vời" : newRating >= 3 ? "Bình thường" : "Chưa tốt",
      content: newContent.trim(),
      pros: splitPros,
      cons: splitCons,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      isVerifiedPurchase: true, // Mocked as verified purchase
      dateText: "Đánh giá vừa mới được đăng",
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    
    // Reset Form States
    setNewRating(5);
    setNewPerformanceRating(5);
    setNewBatteryRating(5);
    setNewCameraRating(5);
    setNewContent("");
    setNewProsText("");
    setNewConsText("");
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setSelectedTags([]);
    
    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      if (activeFilter === "Tất cả") return true;
      if (activeFilter === "Có hình ảnh") return false; // Mocking: initial mock has no images
      if (activeFilter === "Đã mua hàng") return r.isVerifiedPurchase;
      if (activeFilter === "5 sao") return r.rating === 5;
      if (activeFilter === "4 sao") return r.rating === 4;
      if (activeFilter === "3 sao") return r.rating === 3;
      if (activeFilter === "2 sao") return r.rating === 2;
      if (activeFilter === "1 sao") return r.rating === 1;
      return true;
    });
  }, [reviews, activeFilter]);

  // Displayed sliced reviews
  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, displayLimit);
  }, [filteredReviews, displayLimit]);

  // Sub-component to render star icons
  const renderStars = (score: number, sizeClass = "text-base") => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const starsArray = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsArray.push(<FaStar key={i} className={`text-yellow-400 ${sizeClass}`} />);
      } else if (i === fullStars + 1 && halfStar) {
        starsArray.push(<FaStar key={i} className={`text-yellow-400 ${sizeClass}`} />);
      } else {
        starsArray.push(<FaRegStar key={i} className={`text-gray-300 ${sizeClass}`} />);
      }
    }
    return <div className="flex gap-x-0.5">{starsArray}</div>;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/70 shadow-sm p-4 md:p-6 my-6 font-sans">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Đánh giá {productName}
      </h3>

      {/* RATING SUMMARY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-b border-gray-100 pb-6 mb-6 select-none">
        
        {/* Left Column: Average Score */}
        <div className="flex flex-col items-center justify-center text-center lg:border-r border-gray-100 lg:pr-6">
          <span className="text-5xl font-extrabold text-gray-800 tracking-tight leading-none mb-2">
            {ratingAverage}
            <span className="text-2xl font-normal text-gray-400">/5</span>
          </span>
          <div className="mb-2">
            {renderStars(parseFloat(ratingAverage), "text-[1.35rem]")}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {totalReviews} lượt đánh giá
          </span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-[#d70019] hover:bg-red-700 text-white font-semibold text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] w-full max-w-[170px]"
          >
            Viết đánh giá
          </button>
        </div>

        {/* Middle Column: Star Progress Bars */}
        <div className="flex flex-col justify-center space-y-2 lg:px-4">
          {[5, 4, 3, 2, 1].map(starNum => {
            const count = ratingDistribution[starNum as 5|4|3|2|1] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={starNum} className="flex items-center text-xs text-gray-600">
                <span className="w-4 font-bold text-right mr-1">{starNum}</span>
                <FaStar className="text-yellow-400 text-xs mr-2 flex-shrink-0" />
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#d70019] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-20 text-left pl-3 text-gray-400 font-medium">
                  {count} đánh giá ({Math.round(percentage)}%)
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Experience Breakdown */}
        <div className="flex flex-col justify-center lg:border-l border-gray-100 lg:pl-6 space-y-4">
          <span className="text-sm font-bold text-gray-700">Đánh giá theo trải nghiệm</span>
          
          {/* Performance */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Hiệu năng</span>
            <div className="flex items-center gap-x-2">
              {renderStars(5, "text-xs")}
              <span className="font-bold text-gray-800">5/5</span>
              <span className="text-gray-400">({totalReviews} lượt)</span>
            </div>
          </div>

          {/* Battery */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Thời lượng pin</span>
            <div className="flex items-center gap-x-2">
              {renderStars(4.8, "text-xs")}
              <span className="font-bold text-gray-800">4.8/5</span>
              <span className="text-gray-400">({totalReviews} lượt)</span>
            </div>
          </div>

          {/* Camera */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Chất lượng camera</span>
            <div className="flex items-center gap-x-2">
              {renderStars(5, "text-xs")}
              <span className="font-bold text-gray-800">5/5</span>
              <span className="text-gray-400">({totalReviews} lượt)</span>
            </div>
          </div>
        </div>

      </div>

      {/* FILTER BUTTONS TAG ROW */}
      <div className="flex flex-col gap-y-3 mb-6">
        <span className="text-sm font-bold text-gray-700">Lọc đánh giá theo:</span>
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Có hình ảnh", "Đã mua hàng", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"].map(filterVal => {
            const isActive = activeFilter === filterVal;
            return (
              <button
                key={filterVal}
                onClick={() => setActiveFilter(filterVal)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer select-none font-medium ${
                  isActive 
                    ? "border-blue-500 bg-blue-50 text-blue-600" 
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {filterVal}
              </button>
            );
          })}
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="divide-y divide-gray-100 select-none animate-fade-in">
        {displayedReviews.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            Không có đánh giá nào phù hợp với bộ lọc đã chọn.
          </div>
        ) : (
          displayedReviews.map(review => (
            <div key={review.id} className="py-5 flex flex-col md:flex-row md:items-start gap-4">
              
              {/* Left Side: Avatar and Name */}
              <div className="flex items-center md:items-start gap-x-3 md:w-48 flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm ${review.avatarBg}`}>
                  {review.userInitials}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-sm">{review.userName}</span>
                  {review.isVerifiedPurchase && (
                    <span className="text-[10px] text-green-600 font-semibold flex items-center gap-x-0.5 mt-0.5">
                      <IoCheckmarkCircle className="text-xs" />
                      Đã mua tại CellphoneS
                    </span>
                  )}
                </div>
              </div>

              {/* Right Side: Rating details & Comment content */}
              <div className="flex-1 flex flex-col space-y-2">
                <div className="flex items-center gap-x-2">
                  {renderStars(review.rating, "text-xs")}
                  <span className="text-xs font-bold text-gray-800">{review.title}</span>
                </div>

                {/* Specific Attribute Tags */}
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {review.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-semibold px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pros and Cons detailed blocks */}
                <div className="text-gray-700 text-xs space-y-2 leading-relaxed mt-2 font-medium">
                  {review.content && <p className="text-gray-800 mb-1.5 font-semibold">{review.content}</p>}
                  
                  {review.cons && review.cons.length > 0 && (
                    <div className="space-y-0.5">
                      <span className="text-red-600 font-bold">Điểm Trừ:</span>
                      {review.cons.map((con, idx) => (
                        <p key={idx} className="text-gray-500 pl-2">- {con}</p>
                      ))}
                    </div>
                  )}

                  {review.pros && review.pros.length > 0 && (
                    <div className="space-y-0.5">
                      <span className="text-green-600 font-bold">Điểm Cộng:</span>
                      {review.pros.map((pro, idx) => (
                        <p key={idx} className="text-gray-500 pl-2">+ {pro}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 border-t border-gray-50/50 pt-3 select-none">
                  <span>{review.dateText}</span>
                  
                  <button 
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-x-1 border px-3 py-1 rounded cursor-pointer transition-all hover:bg-gray-50 ${
                      review.isUpvoted 
                        ? "border-blue-500 text-blue-600 bg-blue-50" 
                        : "border-gray-200 text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FiThumbsUp className="text-xs" />
                    <span>Hữu ích ({review.helpfulCount})</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* VIEW ALL REVIEWS ACTION BUTTON */}
      {filteredReviews.length > displayLimit && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setDisplayLimit(filteredReviews.length)}
            className="flex items-center justify-center gap-x-2 text-xs font-semibold text-gray-700 bg-[#f3f4f6] hover:bg-gray-200 transition-all rounded-xl py-3 px-8 w-full md:w-auto md:min-w-[300px] cursor-pointer"
          >
            <span>Xem tất cả đánh giá</span>
            <FiChevronRight className="text-xs font-bold" />
          </button>
        </div>
      )}

      {/* WRITE A REVIEW DIALOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto select-none">
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h4 className="font-bold text-gray-800 text-base">Đánh giá {productName}</h4>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-50"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Overall Star Picker */}
              <div className="flex flex-col items-center justify-center text-center py-2 bg-gray-50 rounded-xl">
                <span className="text-xs font-bold text-gray-600 mb-2">Đánh giá tổng thể của bạn</span>
                <div className="flex gap-x-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isSelected = starVal <= newRating;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewRating(starVal)}
                        className="cursor-pointer transition-all hover:scale-110"
                      >
                        <FaStar className={`text-2xl ${isSelected ? "text-yellow-400" : "text-gray-300"}`} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-gray-400 mt-1">
                  {newRating === 5 ? "Tuyệt vời" : newRating === 4 ? "Tốt" : newRating === 3 ? "Bình thường" : newRating === 2 ? "Chưa tốt" : "Rất kém"}
                </span>
              </div>

              {/* Sub Ratings Breakdown (Performance, Battery, Camera) */}
              <div className="space-y-2 border-b border-gray-100 pb-3">
                <span className="text-xs font-bold text-gray-700 block">Đánh giá trải nghiệm thực tế</span>
                
                {/* Performance */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Hiệu năng</span>
                  <div className="flex gap-x-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewPerformanceRating(starVal)}
                        className="cursor-pointer"
                      >
                        <FaStar className={`text-sm ${starVal <= newPerformanceRating ? "text-yellow-400" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Battery */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Thời lượng pin</span>
                  <div className="flex gap-x-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewBatteryRating(starVal)}
                        className="cursor-pointer"
                      >
                        <FaStar className={`text-sm ${starVal <= newBatteryRating ? "text-yellow-400" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Chất lượng camera</span>
                  <div className="flex gap-x-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewCameraRating(starVal)}
                        className="cursor-pointer"
                      >
                        <FaStar className={`text-sm ${starVal <= newCameraRating ? "text-yellow-400" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick tags selection */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-700 block">Đặc điểm bạn thích nhất</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`text-[10px] px-2.5 py-1 rounded border transition-all cursor-pointer font-medium ${
                          isSelected
                            ? "bg-blue-50 border-blue-500 text-blue-600 flex items-center gap-x-0.5"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {isSelected && <FiCheck className="text-[9px]" />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review detailed description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nội dung đánh giá</label>
                <textarea
                  required
                  placeholder="Hãy chia sẻ trải nghiệm thực tế của bạn về hiệu năng, thiết kế, thời lượng pin..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Pros & Cons detailed lists */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-green-600">Điểm Cộng (mỗi dòng 1 ý)</label>
                  <textarea
                    placeholder="Màn hình sáng&#10;Thiết kế mỏng"
                    value={newProsText}
                    onChange={(e) => setNewProsText(e.target.value)}
                    rows={2}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-red-600">Điểm Trừ (mỗi dòng 1 ý)</label>
                  <textarea
                    placeholder="Loa hơi bé&#10;Dễ bám vân tay"
                    value={newConsText}
                    onChange={(e) => setNewConsText(e.target.value)}
                    rows={2}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Personal Information (Name, Phone, Email) */}
              <div className="border-t border-gray-100 pt-3 space-y-3">
                <span className="text-xs font-bold text-gray-700 block">Thông tin liên hệ của bạn</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="Số điện thoại"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <input
                  type="email"
                  placeholder="Địa chỉ Email (Không bắt buộc)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Modal Actions Footer */}
              <div className="flex items-center justify-end gap-x-2 border-t border-gray-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-xs font-bold rounded-lg text-gray-600 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d70019] hover:bg-red-700 text-xs font-bold rounded-lg text-white cursor-pointer shadow-sm"
                >
                  Gửi đánh giá
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
