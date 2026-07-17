import React, { forwardRef, useState } from "react";

// ---- Style tokens (like a design system config) ----
const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontFamily: "inherit",
  fontWeight: 500,
  borderRadius: "8px",
  border: "1px solid transparent",
  cursor: "pointer",
  outline: "none",
  transition: "all 0.15s ease",
  whiteSpace: "nowrap",
  userSelect: "none",
};

const variantStyles = {
  default: {
    idle: { backgroundColor: "#111827", color: "#ffffff", borderColor: "#111827" },
    hover: { backgroundColor: "#1f2937", borderColor: "#1f2937" },
  },
  destructive: {
    idle: { backgroundColor: "#dc2626", color: "#ffffff", borderColor: "#dc2626" },
    hover: { backgroundColor: "#b91c1c", borderColor: "#b91c1c" },
  },
  outline: {
    idle: { backgroundColor: "transparent", color: "#111827", borderColor: "#d1d5db" },
    hover: { backgroundColor: "#f3f4f6", borderColor: "#9ca3af" },
  },
  secondary: {
    idle: { backgroundColor: "#f3f4f6", color: "#111827", borderColor: "#f3f4f6" },
    hover: { backgroundColor: "#e5e7eb", borderColor: "#e5e7eb" },
  },
  ghost: {
    idle: { backgroundColor: "transparent", color: "#111827", borderColor: "transparent" },
    hover: { backgroundColor: "#f3f4f6", borderColor: "transparent" },
  },
  link: {
    idle: { backgroundColor: "transparent", color: "#4f46e5", borderColor: "transparent" },
    hover: { backgroundColor: "transparent", color: "#4338ca" },
  },
};

const sizeStyles = {
  sm: { height: "32px", padding: "0 12px", fontSize: "13px" },
  default: { height: "40px", padding: "0 16px", fontSize: "14px" },
  lg: { height: "48px", padding: "0 24px", fontSize: "16px" },
  icon: { height: "40px", width: "40px", padding: 0, fontSize: "14px" },
};

const disabledStyle = {
  opacity: 0.5,
  cursor: "not-allowed",
  pointerEvents: "none",
};

/**
 * Reusable Button component (shadcn-style API)
 *
 * Props:
 * - variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
 * - size: "default" | "sm" | "lg" | "icon"
 * - disabled: boolean
 * - loading: boolean
 * - icon: ReactNode (rendered before children)
 * - style: extra inline style overrides
 */
export const Button = forwardRef(
  (
    {
      children = "Button",
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      icon = null,
      style = {},
      onClick = () => {},
      ...rest
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const v = variantStyles[variant] || variantStyles.default;
    const s = sizeStyles[size] || sizeStyles.default;

    const computedStyle = {
      ...baseStyle,
      ...s,
      ...v.idle,
      ...(isHovered && !disabled ? v.hover : {}),
      ...(isActive && !disabled ? { transform: "scale(0.97)" } : {}),
      ...(disabled ? disabledStyle : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        style={computedStyle}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={onClick}
        {...rest}
      >
        {loading && (
          <span
            style={{
              width: "14px",
              height: "14px",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.6s linear infinite",
            }}
          />
        )}
        {!loading && icon}
        {children}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;