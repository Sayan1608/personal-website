"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What technologies does Sayan work with?",
  "Tell me about his experience",
  "What has he built recently?"
];

export function ProfileChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLoading, error]);

  async function sendMessage(questionText: string) {
    const question = questionText.trim();
    if (!question || isLoading || question.length > 1_000) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) })
      });
      const result: unknown = await response.json();

      if (
        typeof result !== "object" ||
        result === null ||
        !("reply" in result) ||
        typeof result.reply !== "string"
      ) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "The assistant returned an invalid response. Please try again.";
        throw new Error(message);
      }

      setMessages([...nextMessages, { role: "assistant", content: result.reply }]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Couldn’t send your message. Please try again."
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="profile-chat">
      {isOpen && (
        <section aria-label="Ask Sayan's AI profile assistant" className="chat-panel">
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true"><Sparkles size={17} /></div>
            <div className="chat-heading">
              <strong>Profile assistant</strong>
              <span><span className="chat-online-dot" /> AI · here to help</span>
            </div>
            <button
              aria-label="Close profile assistant"
              className="chat-close icon-button"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
          </header>

          <div aria-live="polite" className="chat-messages" ref={messageListRef} role="log">
            {messages.length === 0 ? (
              <div className="chat-welcome">
                <span className="chat-welcome-icon"><Sparkles aria-hidden="true" size={17} /></span>
                <h2>Hi, I&apos;m Sayan&apos;s AI profile assistant.</h2>
                <p>Ask me about his experience, skills, education, or GitHub projects.</p>
                <div className="chat-suggestions">
                  {suggestions.map((suggestion) => (
                    <button
                      disabled={isLoading}
                      key={suggestion}
                      onClick={() => void sendMessage(suggestion)}
                      type="button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  className={`chat-message is-${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  {message.content}
                </div>
              ))
            )}
            {isLoading && (
              <div aria-label="Assistant is thinking" className="chat-message is-assistant chat-thinking">
                <span /><span /><span />
              </div>
            )}
            {error && <p className="chat-error" role="alert">{error}</p>}
          </div>

          <form
            className="chat-form"
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              void sendMessage(input);
            }}
          >
            <label className="visually-hidden" htmlFor="profile-chat-input">Ask a question</label>
            <input
              autoComplete="off"
              disabled={isLoading}
              id="profile-chat-input"
              maxLength={1_000}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Sayan’s profile..."
              ref={inputRef}
              value={input}
            />
            <button
              aria-label="Send message"
              className="chat-send"
              disabled={isLoading || !input.trim()}
              type="submit"
            >
              <Send aria-hidden="true" size={16} />
            </button>
          </form>
          <p className="chat-disclaimer">
            AI-generated via OpenRouter · Questions aren&apos;t saved by this site
          </p>
        </section>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close profile assistant" : "Chat with Sayan's AI profile assistant"}
        className={`chat-launcher${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={20} /> : <MessageCircle aria-hidden="true" size={20} />}
        {!isOpen && <span>Ask my AI twin</span>}
      </button>
    </div>
  );
}
