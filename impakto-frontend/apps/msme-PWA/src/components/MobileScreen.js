import { jsx as _jsx } from "react/jsx-runtime";
export function MobileScreen({ children, backgroundColor = 'bg-white' }) {
    return (_jsx("div", { className: `${backgroundColor} h-full min-h-[667px] overflow-hidden flex flex-col p-6 relative`, children: children }));
}
