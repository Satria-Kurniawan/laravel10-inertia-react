import { forwardRef, useRef, useState, useEffect } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        onChange,
        isFocused = false,
        errorMessage,
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const [focused, setFocused] = useState(false);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    "w-full rounded-md bg-tertiary border-none py-1.5 px-3 focus:outline-none focus:ring-primary" +
                    className
                }
                ref={input}
                onChange={onChange}
                onBlur={() => setFocused(true)}
                focused={focused.toString()}
            />
            <span className="hidden text-sm text-danger">{errorMessage}</span>
        </div>
    );
});
