interface TextInputProps {
  placeholder: string;
  value?: string;
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
      value={props.value}
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
        outline-hidden
        transition-all duration-150 ease-in-out
        placeholder:text-acc-dim

        ${
          props.error
            ? `
            border-err-dim 
            focus:border-err 
            hover:border-err 
            bg-err-bg
            placeholder:text-err-dim
            `
            : `
            border-acc-dim
            focus:border-acc
            hover:border-acc
            `
        }
      `}
      placeholder={props.placeholder}
    ></input>
  );
}
