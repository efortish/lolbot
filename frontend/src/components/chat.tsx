import { useRef, useState } from "react";
import { chatMessage } from "../services/api";
import "../App.css";

type Message = { from: "user" | "bot"; text: string };

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError(null);
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    const userInput = input;
    setInput("");
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      0
    );

    try {
      const reply = await chatMessage(userInput);
      setMessages((msgs) => [...msgs, { from: "bot", text: reply }]);
    } catch (err: any) {
      if (err?.response?.status === 400) {
        setError("Message cannot be empty.");
      } else {
        setError("Connection lost, please retry.");
      }
    } finally {
      setLoading(false);
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        0
      );
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && input.trim()) sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-card">
        {/* Header */}
        <div className="chat-header">
          <h1 className="chat-title">League of Legends Expert Bot by Kevyn</h1>
          <p className="chat-subtitle">
            Ask me anything about League of Legends!
          </p>
        </div>

        {/* Chat Messages */}
        <div className="messages-area">
          {messages.length === 0 && (
            <div className="empty-chat">👋 Start a conversation!</div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`message-container ${msg.from}`}>
              <div className={`message-bubble ${msg.from}`}>{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div className="typing-container">
              <div className="typing-bubble">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask about champions, items, strategies..."
            className="chat-input"
            autoFocus
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="send-button"
          >
            ➤
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">⚠️ {error}</div>}
      </div>
    </div>
  );
}
