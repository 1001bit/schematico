interface TextInputProps {
  placeholder: string;
  onChange?: (text: string) => void;
  password?: boolean;
  length: number;
  name?: string;
  error?: boolean;
}

export default function TextInput(props: TextInputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  return (
    <input
      type={props.password ? "password" : "text"}
      onChange={onChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      maxLength={props.length}
      name={props.name}
      required
      className={`
        border-1
        px-2 py-1 
        placeholder:text-lg 
        placeholder:text-white-dim 
        outline-hidden
        transition-all duration-150 ease-in-out
        
        ${
          props.error
            ? `
            border-err-dim 
            focus:border-err 
            hover:border-err 
            `
            : `
            border-white-dim 
            focus:border-white 
            hover:border-white 
            `
        }
      `}
      placeholder={props.placeholder}
    ></input>
  );
}
