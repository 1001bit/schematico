import { useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  confirm?: boolean;
}

export default function Button({
  onClick: clickCallback,
  children,
  className,
  confirm,
}: ButtonProps) {
  const [confirmation, setConfirmation] = useState(false);

  const onClick = () => {
    if (!confirm) {
      clickCallback && clickCallback();
    } else if (confirmation) {
      clickCallback && clickCallback();
      setConfirmation(false);
    } else {
      setConfirmation(true);
      setTimeout(() => setConfirmation(false), 5000);
    }
  };

  return (
    <button
      className={`
        border-1
        text-acc
        border-acc
        hover:bg-acc
        hover:text-black
        active:bg-acc-dim
        active:border-acc-dim
        drop-shadow-acc
        bg-acc-bg
        backdrop-blur-[1px]
        hover:cursor-pointer 
        px-2 py-1
        transition-all duration-75 ease-in-out
        select-none
        ${className}
      `}
      onClick={onClick}
    >
      {children}
      {confirmation && " (confirm)"}
    </button>
  );
}
