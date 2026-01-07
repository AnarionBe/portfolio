import { useState, useEffect, useReducer } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  startTyping?: boolean;
}

function TypingAnimationInner({
  text,
  speed = 100,
  className = "",
  startTyping = true,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      return;
    }

    // Pause animation when hovered
    if (isHovered) {
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, startTyping, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-[0.5em] h-[1em] bg-primary ml-1 animate-pulse align-middle"></span>
      )}
    </span>
  );
}

// Reducer to track when startTyping transitions from false to true
function resetKeyReducer(
  state: { key: number; prevStartTyping: boolean },
  startTyping: boolean
) {
  if (startTyping && !state.prevStartTyping) {
    return { key: state.key + 1, prevStartTyping: startTyping };
  }
  return { ...state, prevStartTyping: startTyping };
}

export function TypingAnimation(props: TypingAnimationProps) {
  const [state, dispatch] = useReducer(resetKeyReducer, {
    key: 0,
    prevStartTyping: props.startTyping ?? true,
  });

  // Update state when startTyping prop changes
  useEffect(() => {
    dispatch(props.startTyping ?? true);
  }, [props.startTyping]);

  // Use key to force component remount when section comes into view
  return <TypingAnimationInner {...props} key={state.key} />;
}
