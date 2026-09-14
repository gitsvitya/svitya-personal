export default function SocialIcon({
  name,
  className,
}: {
  name: "telegram" | "instagram" | "linkedin";
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "telegram" && (
        <>
          <path d="m21 3-6 18-4-8-8-4Z" />
          <path d="m21 3-10 10" />
        </>
      )}
      {name === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "linkedin" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7.5 10v7M11.5 17v-7M11.5 13a3 3 0 0 1 6 0v4" />
          <circle cx="7.5" cy="7" r=".7" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
