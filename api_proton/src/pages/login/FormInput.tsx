import { useState } from "react";
import "./FormInput.css";

const FormInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e: any) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label className="form-label">{label}</label>
            <input
                className="form-input"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className="form-span">{errorMessage}</span>
        </div>
    );
};

export default FormInput;
