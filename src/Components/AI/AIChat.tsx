import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import merry from "../../assets/merry.png"


type Message = {
    sender: string;
    text: string;
}

type Props = {
    onClose: () => void;
    messages: Message[];
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
};



const AIChat = ({
    onClose,
    messages,
    message,
    setMessage,
    sendMessage,
}: Props) => {

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="fixed bottom-28 right-8 w-96 h-137.5 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            <div className="bg-vercity text-white p-4 flex justify-between items-center">
                <div>
                    <h2 className="font-semibold">Merry AI</h2>
                    <p className="text-xs text-white/80">
                        Your personal learning mentor
                    </p>
                </div>

                <button onClick={onClose}>
                    <X />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">

                {messages.map((msg, index) => (
                    msg.sender === "ai" ? (
                        <div key={index} className="flex gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-vercity text-white flex items-center justify-center">
                                {merry}
                            </div>

                            <div className="bg-gray-100 rounded-xl p-3 max-w-[80%]">
                                <p className="text-xs font-semibold text-vercity mb-1">
                                    {msg.sender}
                                </p>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="flex justify-end mb-3">
                            <div className="bg-vercity text-white rounded-xl p-3 max-w-[80%]">
                                <p className="text-xs font-semibold opacity-80 mb-1">
                                    {msg.sender}
                                </p>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    )
                ))}

                <div ref={bottomRef} />

            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="border-t p-3 flex gap-2">

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 border rounded-xl px-4 py-2 outline-none"
                />

                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`px-5 rounded-xl text-white ${message.trim()
                        ? "bg-vercity"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Send
                </button>

            </form>



        </div>
    );
};

export default AIChat;