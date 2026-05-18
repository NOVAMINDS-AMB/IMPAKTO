import { jsx as _jsx } from "react/jsx-runtime";
export function PrimaryButton({ children, onClick, variant = 'primary', disabled = false }) {
    const baseClasses = "w-full py-4 px-6 rounded-xl text-center transition-all active:scale-95";
    const variantClasses = variant === 'primary'
        ? "bg-emerald-600 text-white hover:bg-emerald-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    return (_jsx("button", { onClick: onClick, disabled: disabled, className: `${baseClasses} ${variantClasses} ${disabledClasses}`, children: children }));
}
