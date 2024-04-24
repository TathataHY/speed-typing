import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

export const RestartButton = ({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};
