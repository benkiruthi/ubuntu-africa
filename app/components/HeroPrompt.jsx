"use client";

import { useState, useEffect, useRef } from "react";

const PROMPTS = [
  "Help me start a business",
  "Teach me AI",
  "Find funding for my startup",
  "Build my website",
  "Find customers",
  "Find a job in Nairobi",
  "Improve my farm yield",
  "Grow my business",
  "Create a marketing plan",
  "Write a CV",
  "Learn coding from scratch",
  "Save money and invest",
  "Find a mentor",
  "Understand my legal rights",
];

export default function HeroPrompt() {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const textareaRef = useRef(null);

  // Cycle through placeholder prompts with a typewriter effect
  useEffect(() => {
    const target = PROMPTS[placeholderIndex];
    let timeout;

    if (typing) {
      if (displayedPlaceholder.length < target.length) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(target.slice(0, displayedPlaceholder.length + 1));
        }, 42);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1));
        }, 22);
      } else {
        setPlaceholderIndex((i) => (i + 1) % PROMPTS.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, typing, placeholderIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    // Future: route to Ebbli AI workspace
    alert(`Ebbli AI is coming soon! You asked: "${value}"`);
  };

  return (
    <form className="hero-prompt" onSubmit={handleSubmit} role="search" aria-label="Ask Ebbli AI">
      <div className="hero-prompt-inner">
        <textarea
          ref={textareaRef}
          className="hero-prompt-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // auto-grow
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 180) + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={displayedPlaceholder || "Ask Ebbli AI anything…"}
          rows={1}
          aria-label="Your question or goal"
        />
        <div className="hero-prompt-bar">
          <div className="hero-prompt-icons">
            <button type="button" className="hero-prompt-icon" title="Voice input" aria-label="Voice input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
            <button type="button" className="hero-prompt-icon" title="Upload file" aria-label="Upload file">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </button>
            <button type="button" className="hero-prompt-icon" title="Upload image" aria-label="Upload image">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
            <button type="button" className="hero-prompt-icon" title="Camera" aria-label="Camera">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="hero-prompt-submit"
            disabled={!value.trim()}
            aria-label="Ask Ebbli AI"
          >
            Ask Ebbli AI
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
