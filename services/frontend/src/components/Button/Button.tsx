interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Button(props: ButtonProps) {
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
        ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
