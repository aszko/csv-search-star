export const AlgeriaLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="hsl(270 70% 55%)" />
      
      {/* Crescent */}
      <circle cx="50" cy="50" r="28" fill="white" />
      <circle cx="58" cy="50" r="22" fill="hsl(270 70% 55%)" />
      
      {/* Star */}
      <path
        d="M50 25 L52.5 40 L67.5 40 L55 50 L60 65 L50 55 L40 65 L45 50 L32.5 40 L47.5 40 Z"
        fill="white"
        transform="translate(8, 5) scale(0.7)"
      />
    </svg>
  );
};
