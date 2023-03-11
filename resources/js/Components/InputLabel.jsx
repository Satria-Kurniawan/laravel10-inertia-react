export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block text-sm text-secondary ` + className}
        >
            {value ? value : children}
        </label>
    );
}
