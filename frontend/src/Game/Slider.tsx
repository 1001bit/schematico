import { useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  initial: number;
  onChange: (curr: number) => void;
  label?: string;
  className?: string;
}

const Slider = ({
  min,
  max,
  step,
  initial,
  onChange,
  label,
  className,
}: SliderProps) => {
  const [value, setValue] = useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className={`mt-2 text-sm`}>
        {label}
        {value}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
