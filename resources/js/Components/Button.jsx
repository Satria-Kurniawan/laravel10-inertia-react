const Button = ({ type, variant, text, className = "", onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`rounded-md font-semibold px-3 py-1.5 ${
                variant === "primary"
                    ? "bg-primary text-black"
                    : variant === "secondary" && "bg-secondary text-black"
            } ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
