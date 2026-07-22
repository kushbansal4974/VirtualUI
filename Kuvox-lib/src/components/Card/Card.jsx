import React, { useState } from "react";

/**
 * Card — fully self-contained, prop-driven component.
 * Renders sensible content by default, fully customizable via props.
 *
 * Props:
 * - title, description        -> text content
 * - imageUrl                  -> optional top image
 * - badge                     -> small label text (e.g. "New")
 * - footerText                -> small text on the left of footer
 * - buttonText, onButtonClick -> action button
 * - bgColor, textColor        -> base colors
 * - accentColor               -> badge/button color
 * - borderRadius, width       -> layout
 * - hoverEffect (bool)        -> lift + shadow on hover
 */
export const Card = ({
  title = "Card Title",
  description = "This is a simple, reusable card component. Pass props to customize the title, description, colors, image, and actions.",
  imageUrl = "",
  badge = "New",
  footerText = "Updated just now",
  buttonText = "Learn More",
  onButtonClick = () => {},
  bgColor = "#ffffff",
  textColor = "#111827",
  accentColor = "#4f46e5",
  borderRadius = "14px",        
  width = "320px",
  hoverEffect = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cardStyle = {
    width,
    backgroundColor: bgColor,
    color: textColor,
    borderRadius,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    fontFamily: "inherit",
    boxShadow:
      hoverEffect && isHovered
        ? "0 12px 24px rgba(0,0,0,0.12)"
        : "0 1px 3px rgba(0,0,0,0.06)",
    transform: hoverEffect && isHovered ? "translateY(-4px)" : "translateY(0)",
    transition: "all 0.25s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
        />
      )}

      <div style={{ padding: "20px" }}>
        {badge && (
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              color: accentColor,
              backgroundColor: `${accentColor}1A`,
              padding: "4px 10px",
              borderRadius: "999px",
              marginBottom: "10px",
            }}
          >
            {badge}
          </span>
        )}

        <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", fontWeight: 700 }}>
          {title}
        </h3>

        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.6, color: "#6b7280" }}>
          {description}
        </p>

        <div
          style={{
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{footerText}</span>

          {buttonText && (
            <button
              onClick={onButtonClick}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: accentColor,
                cursor: "pointer",
                transform: isPressed ? "scale(0.96)" : "scale(1)",
                transition: "transform 0.1s ease, opacity 0.2s ease",
                opacity: isHovered ? 0.92 : 1,
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;