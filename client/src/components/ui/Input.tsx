import type { ChangeEvent, InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  value: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  type = "text",
  value,
  id,
  name,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = "off",
  onChange,
}: InputProps) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};
