interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className="
        border-1
        border-acc-dim 
        hover:border-acc
        hover:bg-acc
        hover:text-black
        active:bg-acc-dim
        active:border-acc-dim
        hover:cursor-pointer 
        px-2 py-1
        w-full
        transition-all duration-150 ease-in-out
      "
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
