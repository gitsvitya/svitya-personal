export default function AppIcon({
  name,
  className,
}: {
  name: "telegram" | "instagram" | "linkedin" | "email" | "settings" | "cookie";
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
      {name === "email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6 8.5 6.5L20.5 6" />
        </>
      )}
      {name === "settings" && (
        <>
          <path d="M9.24 5.35L10.26 5.01L10.44 3.14L13.56 3.14L13.74 5.01L14.76 5.35L15.71 5.83L17.16 4.63L19.37 6.84L18.17 8.29L18.65 9.24L18.99 10.26L20.86 10.44L20.86 13.56L18.99 13.74L18.65 14.76L18.17 15.71L19.37 17.16L17.16 19.37L15.71 18.17L14.76 18.65L13.74 18.99L13.56 20.86L10.44 20.86L10.26 18.99L9.24 18.65L8.29 18.17L6.84 19.37L4.63 17.16L5.83 15.71L5.35 14.76L5.01 13.74L3.14 13.56L3.14 10.44L5.01 10.26L5.35 9.24L5.83 8.29L4.63 6.84L6.84 4.63L8.29 5.83Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
      {name === "cookie" && (
        <>
          <path d="M20.9 13.3A9 9 0 1 1 10.7 3.1a4.2 4.2 0 0 0 4.7 5.2 4.2 4.2 0 0 0 5.5 5Z" />
          <g fill="currentColor" stroke="none">
            <circle cx="7.5" cy="8" r=".9" />
            <circle cx="6.5" cy="13" r=".9" />
            <circle cx="10" cy="17" r=".9" />
            <circle cx="14" cy="13.5" r=".9" />
          </g>
        </>
      )}
    </svg>
  );
}
