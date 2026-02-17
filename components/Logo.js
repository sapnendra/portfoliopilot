export default function Logo({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
      
      {/* Upward Arrow (Growth) */}
      <path
        d="M50 25 L65 40 L57 40 L57 55 L43 55 L43 40 L35 40 Z"
        fill="white"
        opacity="0.95"
      />
      
      {/* Stock Chart Line */}
      <path
        d="M20 70 L30 65 L40 68 L50 60 L60 63 L70 55 L80 58"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}
