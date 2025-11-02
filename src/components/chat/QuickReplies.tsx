interface QuickRepliesProps {
  replies: string[];
  onReplyClick: (reply: string) => void;
}

const QuickReplies = ({ replies, onReplyClick }: QuickRepliesProps) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="mt-2 md:mt-3 flex flex-wrap gap-1.5 md:gap-2">
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onReplyClick(reply)}
          className="px-2.5 md:px-3 py-1.5 md:py-2 bg-white hover:bg-red-50 text-red-600 text-xs md:text-sm font-medium rounded-lg border border-red-200 hover:border-red-400 transition-all duration-200 hover:shadow-sm active:scale-95"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
