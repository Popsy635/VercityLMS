import { MessageCircle } from "lucide-react";

type Props = {
  onClick: () => void;
};

const AIButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-vercity text-white w-14 h-14 rounded-full shadow-xl hover:scale-105 transition"
    >
      <MessageCircle className="mx-auto" size={24} />
    </button>
  );
};

export default AIButton;