export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`my-2 p-3 rounded-lg max-w-xs transition-transform transform animate-slideUp ${
        isUser
          ? "bg-blue-500 text-white self-end hover:scale-105"
          : "bg-gray-200 text-black self-start hover:scale-105"
      }`}
    >
      {message.content}
    </div>
  );
}
