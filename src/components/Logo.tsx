export default function Logo({ className = "text-3xl" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-display uppercase leading-none tracking-wide ${className}`}>
      Avance
      <svg className="h-[0.7em] w-[0.7em] text-brand" viewBox="0 0 16 16" aria-hidden>
        <path d="M2 8h10M8 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" />
      </svg>
    </span>
  );
}
