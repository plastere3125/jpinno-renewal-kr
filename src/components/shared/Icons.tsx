type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ChevronDown = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ChevronLeft = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
export const ChevronRight = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const MenuIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);
export const CloseIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const PlayIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
);
export const PauseIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
  </svg>
);
export const PhoneIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const MailIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const DocIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
);
export const ZoomIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.5-4.5M11 8v6M8 11h6" />
  </svg>
);

/** 외부 채널 아이콘(단색, currentColor) — 네이버 블로그 'b' 말풍선 · 유튜브 재생 버튼 · 링크드인 'in' */
export function ChannelIcon({ k, className = "size-[18px]" }: { k: string; className?: string }) {
  if (k === "youtube")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  if (k === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.5C6.2 2.5 1.5 6.3 1.5 11c0 2.9 1.8 5.5 4.6 7l-.9 3.3c-.1.4.3.7.6.5l4-2.6c.7.1 1.4.2 2.2.2 5.8 0 10.5-3.8 10.5-8.4S17.8 2.5 12 2.5Z" />
      <path fill="var(--channel-ink, #fff)" d="M8.6 7.2h1.6v2.9c.4-.5 1-.8 1.8-.8 1.6 0 2.7 1.3 2.7 3.1s-1.1 3.1-2.8 3.1c-.8 0-1.4-.3-1.8-.9v.7H8.6V7.2Zm3 3.5c-.9 0-1.4.7-1.4 1.7s.5 1.7 1.4 1.7 1.4-.7 1.4-1.7-.5-1.7-1.4-1.7Z" />
    </svg>
  );
}

/** 하위 호환: 이전 텍스트 배지 이름 */
export const ChannelMark = ChannelIcon;
