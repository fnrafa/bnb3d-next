import React, {useState} from "react";

interface Props {
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
}

const InputField: React.FC<Props> = ({
                                         name,
                                         value,
                                         onChange,
                                         placeholder = "",
                                         type = "text",
                                         required = false,
                                         disabled = false,
                                     }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`w-full px-4 sm:px-5 py-2 sm:py-3 text-base sm:text-lg bg-secondary text-white rounded-lg shadow-md transition-all duration-300
                ${
                isFocused
                    ? "border-highlight ring-2 ring-highlight"
                    : "border-primary hover:border-highlight"
            } 
                focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-paragraph`}
        />
    );
};

export default InputField;
