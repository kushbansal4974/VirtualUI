import React, { useState } from "react";

/**
 * ProfileCard
 * A self-contained, prop-driven profile card component.
 * Designed for npm package distribution — no external CSS, no external deps.
 *
 * @param {Object} props
 * @param {string} [props.avatarUrl] - Profile image URL.
 * @param {string} [props.name] - Person's display name.
 * @param {string} [props.role] - Job title / subtitle.
 * @param {string} [props.bio] - Short bio / description text.
 * @param {{label: string, value: string|number}[]} [props.stats] - Stat blocks (e.g. Followers, Posts).
 * @param {{label: string, onClick: Function}[]} [props.socialLinks] - Small text/icon links row.
 * @param {string} [props.primaryButtonText] - Primary action button label.
 * @param {Function} [props.onPrimaryButtonClick] - Primary button click handler.
 * @param {string} [props.secondaryButtonText] - Secondary action button label.
 * @param {Function} [props.onSecondaryButtonClick] - Secondary button click handler.
 * @param {string} [props.accentColor] - Accent color for buttons/highlights.
 * @param {string} [props.bgColor] - Card background color.
 * @param {string} [props.textColor] - Primary text color.
 * @param {string} [props.borderRadius] - Card corner radius.
 * @param {string} [props.width] - Card width.
 * @param {boolean} [props.hoverEffect] - Enable lift/shadow hover animation.
 * @param {Object} [props.style] - Extra style overrides merged onto the root element.
 */
const ProfileCard = ({
  avatarUrl = "https://i.pravatar.cc/150?img=12",
  name = "Jane Doe",
  role = "Product Designer",
  bio = "Building simple, human-centered interfaces. Passionate about design systems and accessibility.",
  stats = [
    { label: "Projects", value: 24 },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: 180 },
  ],
  socialLinks = [],
  primaryButtonText = "Follow",
  onPrimaryButtonClick = () => {},
  secondaryButtonText = "Message",
  onSecondaryButtonClick = () => {},
  accentColor = "#4f46e5",
  bgColor = "#ffffff",
  textColor = "#111827",
  borderRadius = "16px",
  width = "300px",
  hoverEffect = true,
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handlePrimaryClick = () => {
    setIsFollowing((prev) => !prev);
    onPrimaryButtonClick(!isFollowing);
  };

  const cardStyle = {
    width,
    backgroundColor: bgColor,
    color: textColor,
    borderRadius,
    border: "1px solid #e5e7eb",
    padding: "24px",
    textAlign: "center",
    fontFamily: "inherit",
    boxShadow:
      hoverEffect && isHovered
        ? "0 14px 28px rgba(0,0,0,0.12)"
        : "0 1px 3px rgba(0,0,0,0.06)",
    transform: hoverEffect && isHovered ? "translateY(-4px)" : "translateY(0)",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={avatarUrl}
        alt={name}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `3px solid ${accentColor}33`,
        }}
      />

      <h3 style={{ margin: "14px 0 2px 0", fontSize: "17px", fontWeight: 700 }}>
        {name}
      </h3>
      <p style={{ margin: 0, fontSize: "13px", color: accentColor, fontWeight: 600 }}>
        {role}
      </p>

      <p
        style={{
          margin: "12px 0 0 0",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#6b7280",
        }}
      >
        {bio}
      </p>

      {stats.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0",
            paddingTop: "16px",
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: "11.5px", color: "#9ca3af" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {socialLinks.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          {socialLinks.map((link, i) => (
            <span
              key={i}
              onClick={link.onClick}
              style={{ fontSize: "12px", color: accentColor, cursor: "pointer", fontWeight: 600 }}
            >
              {link.label}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handlePrimaryClick}
          style={{
            flex: 1,
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            backgroundColor: isFollowing ? "#9ca3af" : accentColor,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {isFollowing ? "Following" : primaryButtonText}
        </button>

        {secondaryButtonText && (
          <button
            onClick={onSecondaryButtonClick}
            style={{
              flex: 1,
              border: `1px solid ${accentColor}`,
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: 600,
              color: accentColor,
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
export { ProfileCard };