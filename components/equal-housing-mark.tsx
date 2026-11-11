/** Equal Housing Opportunity mark (house with equals sign), drawn in currentColor. */
export function EqualHousingMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Equal Housing Opportunity"
    >
      <path
        d="M32 4 4 24v6h6v28h44V30h6v-6L32 4Zm16 48H16V27.5L32 16l16 11.5V52Z"
        fill="currentColor"
      />
      <rect x="22" y="30" width="20" height="5" fill="currentColor" />
      <rect x="22" y="40" width="20" height="5" fill="currentColor" />
    </svg>
  );
}
