import type { SVGProps } from 'react';

/**
 * Lumina icon set.
 *
 * One geometry system: 24×24 viewbox, 1.6px stroke, round caps and joins, and
 * shapes built on a 2px grid. Drawn in-repo rather than pulled from a library so
 * the weight matches the type and nothing ships that the product does not use.
 *
 * Icons are decorative by default (`aria-hidden`). Pass a `title` when an icon
 * is the only content of a control and no visible label exists.
 */

export type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Icon({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* — Navigation & direction ————————————————————————————————————— */

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17L17 7" />
    <path d="M8.5 7H17v8.5" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Icon>
);

export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 6l6 6-6 6" />
  </Icon>
);

export const ChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.5 6l-6 6 6 6" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.5 6.5l11 11" />
    <path d="M17.5 6.5l-11 11" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
);

export const ExternalLink = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13.5 4H20v6.5" />
    <path d="M20 4l-8.5 8.5" />
    <path d="M18 14.5v4a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6h4" />
  </Icon>
);

/* — State & feedback ————————————————————————————————————————— */

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Icon>
);

export const CheckCircle = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M8.25 12.25l2.75 2.75 4.75-5.5" />
  </Icon>
);

export const Info = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 11.25V16.5" />
    <path d="M12 7.75h.01" />
  </Icon>
);

export const AlertTriangle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10.7 4.6L3.3 17.8a1.5 1.5 0 001.3 2.2h14.8a1.5 1.5 0 001.3-2.2L13.3 4.6a1.5 1.5 0 00-2.6 0z" />
    <path d="M12 10v4" />
    <path d="M12 17h.01" />
  </Icon>
);

export const Spinner = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5a8.5 8.5 0 018.5 8.5" strokeWidth={2.2} />
    <path d="M20.5 12a8.5 8.5 0 11-8.5-8.5" opacity={0.28} strokeWidth={2.2} />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const Minus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

/* — Trend & data ——————————————————————————————————————————— */

export const TrendUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 16.5l5.5-5.5 3.5 3.5L20.5 7" />
    <path d="M15 7h5.5v5.5" />
  </Icon>
);

export const TrendDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 7.5l5.5 5.5 3.5-3.5L20.5 17" />
    <path d="M15 17h5.5v-5.5" />
  </Icon>
);

export const ChartLine = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 3.5v15A1.5 1.5 0 005.5 20H20" />
    <path d="M7.5 15.5l3.5-4.5 3 2.5 4.5-6" />
  </Icon>
);

export const ChartBar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 3.5v15A1.5 1.5 0 005.5 20H20" />
    <path d="M8 16.5v-3.5" />
    <path d="M12.5 16.5v-7" />
    <path d="M17 16.5v-10" />
  </Icon>
);

export const PieChart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5a8.5 8.5 0 108.5 8.5H12z" />
    <path d="M15.5 3.9a8.5 8.5 0 014.6 4.6l-4.6 1.9z" />
  </Icon>
);

/* — Money & product ————————————————————————————————————————— */

export const CreditCard = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" />
    <path d="M2.75 9.75h18.5" />
    <path d="M6.5 14.75h3.5" />
  </Icon>
);

export const Bank = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 9.5L12 4.5l8.5 5" />
    <path d="M6 9.5v8" />
    <path d="M10 9.5v8" />
    <path d="M14 9.5v8" />
    <path d="M18 9.5v8" />
    <path d="M3.5 20h17" />
  </Icon>
);

export const Receipt = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 3.5h13v17l-2.2-1.4-2.2 1.4-2.1-1.4-2.2 1.4-2.3-1.4z" />
    <path d="M9 8.5h6" />
    <path d="M9 12.5h6" />
  </Icon>
);

export const Target = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const Repeat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 8.5h11a4 4 0 014 4" />
    <path d="M7.5 5.5l-3 3 3 3" />
    <path d="M19.5 15.5h-11a4 4 0 01-4-4" />
    <path d="M16.5 18.5l3-3-3-3" />
  </Icon>
);

export const Bolt = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13.2 2.8L5.5 13.2h5.6l-.3 8 7.7-10.4h-5.6z" />
  </Icon>
);

export const Sparkle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M11 3.2l1.85 4.95L17.8 10l-4.95 1.85L11 16.8l-1.85-4.95L4.2 10l4.95-1.85z" />
    <path d="M17.8 14.6l.85 2.3 2.3.85-2.3.85-.85 2.3-.85-2.3-2.3-.85 2.3-.85z" />
  </Icon>
);

export const Layers = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5l8.5 4.25L12 12 3.5 7.75z" />
    <path d="M3.5 12.25L12 16.5l8.5-4.25" />
    <path d="M3.5 16.5L12 20.75l8.5-4.25" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 9.75h17" />
    <path d="M8 3.25v3.5" />
    <path d="M16 3.25v3.5" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 7.25V12.4l3.1 1.9" />
  </Icon>
);

/* — Trust & security ————————————————————————————————————————— */

export const Shield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.25l7.5 2.8v5.45c0 4.2-3 7.65-7.5 9.25-4.5-1.6-7.5-5.05-7.5-9.25V6.05z" />
  </Icon>
);

export const ShieldCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.25l7.5 2.8v5.45c0 4.2-3 7.65-7.5 9.25-4.5-1.6-7.5-5.05-7.5-9.25V6.05z" />
    <path d="M9 12l2.15 2.15L15.25 10" />
  </Icon>
);

export const Lock = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4.75" y="10.25" width="14.5" height="9.75" rx="2.25" />
    <path d="M8.25 10.25V7.5a3.75 3.75 0 017.5 0v2.75" />
    <path d="M12 14v2.25" />
  </Icon>
);

export const Key = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8.75" cy="8.75" r="4.25" />
    <path d="M11.75 11.75L20 20" />
    <path d="M17 17l2.25-2.25" />
  </Icon>
);

export const Eye = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 12S6.5 5.75 12 5.75 21.25 12 21.25 12 17.5 18.25 12 18.25 2.75 12 2.75 12z" />
    <circle cx="12" cy="12" r="2.9" />
  </Icon>
);

export const EyeOff = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 4l16 16" />
    <path d="M9.9 6.05A9.7 9.7 0 0112 5.75c5.5 0 9.25 6.25 9.25 6.25a17.6 17.6 0 01-3.5 4.15" />
    <path d="M6.6 7.85A17.4 17.4 0 002.75 12S6.5 18.25 12 18.25a9.9 9.9 0 002.65-.36" />
    <path d="M10 10.15a2.75 2.75 0 003.85 3.85" />
  </Icon>
);

export const Globe = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M3.4 12h17.2" />
    <path d="M12 3.25c2.2 2.35 3.45 5.45 3.45 8.75S14.2 18.4 12 20.75c-2.2-2.35-3.45-5.45-3.45-8.75S9.8 5.6 12 3.25z" />
  </Icon>
);

/* — People & account ————————————————————————————————————————— */

export const User = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.25" r="3.75" />
    <path d="M4.75 20a7.25 7.25 0 0114.5 0" />
  </Icon>
);

export const Users = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9.5" cy="8.25" r="3.5" />
    <path d="M3 19.5a6.5 6.5 0 0113 0" />
    <path d="M16 5.15a3.5 3.5 0 010 6.2" />
    <path d="M17.4 13.9A6.5 6.5 0 0121 19.5" />
  </Icon>
);

export const Logout = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 20H6.5A2.5 2.5 0 014 17.5v-11A2.5 2.5 0 016.5 4h3" />
    <path d="M15.75 15.75L19.5 12l-3.75-3.75" />
    <path d="M19.5 12h-9.75" />
  </Icon>
);

export const Home = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.75 10.5L12 4l8.25 6.5" />
    <path d="M6 9.4v9.1A1.5 1.5 0 007.5 20h9a1.5 1.5 0 001.5-1.5V9.4" />
    <path d="M10 20v-5h4v5" />
  </Icon>
);

export const Bell = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 9.75a6 6 0 10-12 0c0 4.6-1.75 6.25-1.75 6.25h15.5S18 14.35 18 9.75z" />
    <path d="M10.4 19a1.9 1.9 0 003.2 0" />
  </Icon>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10.75" cy="10.75" r="6.25" />
    <path d="M15.4 15.4l5.1 5.1" />
  </Icon>
);

export const Filter = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6.5h16" />
    <path d="M7 12h10" />
    <path d="M10 17.5h4" />
  </Icon>
);

export const Sliders = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h9" />
    <path d="M17.5 8h2.5" />
    <path d="M4 16h3.5" />
    <path d="M12 16h8" />
    <circle cx="15.25" cy="8" r="2.25" />
    <circle cx="9.75" cy="16" r="2.25" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.25" width="18" height="13.5" rx="2.5" />
    <path d="M3.6 8.25l7.55 5.05a1.5 1.5 0 001.7 0l7.55-5.05" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20.75s6.75-6.15 6.75-10.75a6.75 6.75 0 10-13.5 0c0 4.6 6.75 10.75 6.75 10.75z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v11" />
    <path d="M7.75 10.75L12 15l4.25-4.25" />
    <path d="M4.5 19.5h15" />
  </Icon>
);

export const Quote = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M9.6 5.4c-3 1.9-4.9 4.8-4.9 8.1 0 3.1 1.9 5.3 4.6 5.3 2.3 0 3.9-1.6 3.9-3.9 0-2.2-1.5-3.7-3.5-3.7-.3 0-.6 0-.9.1.4-1.7 1.5-3.1 3.2-4.2zm9.3 0c-3 1.9-4.9 4.8-4.9 8.1 0 3.1 1.9 5.3 4.6 5.3 2.3 0 3.9-1.6 3.9-3.9 0-2.2-1.5-3.7-3.5-3.7-.3 0-.6 0-.9.1.4-1.7 1.5-3.1 3.2-4.2z" />
  </Icon>
);

export const Star = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M12 3.2l2.63 5.62 5.87.83-4.28 4.3 1.03 6.06L12 17.15l-5.25 2.86 1.03-6.06-4.28-4.3 5.87-.83z" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.5 5.75l9.25 6.25-9.25 6.25z" />
  </Icon>
);

/* — Brand marks for the social sign-in row —————————————————————— */

export const GoogleMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="#4285F4"
      d="M23.04 12.26c0-.85-.08-1.67-.22-2.45H12v4.64h6.19a5.3 5.3 0 01-2.3 3.47v2.88h3.72c2.18-2 3.43-4.96 3.43-8.54z"
    />
    <path
      fill="#34A853"
      d="M12 23.5c3.1 0 5.71-1.03 7.61-2.79l-3.72-2.88c-1.03.69-2.35 1.1-3.89 1.1-2.99 0-5.52-2.02-6.43-4.73H1.72v2.97A11.5 11.5 0 0012 23.5z"
    />
    <path
      fill="#FBBC05"
      d="M5.57 14.2a6.9 6.9 0 010-4.4V6.83H1.72a11.5 11.5 0 000 10.34l3.85-2.97z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.69 0 3.2.58 4.4 1.72l3.29-3.29C17.7 1.28 15.1.25 12 .25A11.5 11.5 0 001.72 6.83L5.57 9.8C6.48 7.09 9.01 4.75 12 4.75z"
    />
  </svg>
);

export const AppleMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M16.36 12.66c-.02-2.34 1.91-3.47 2-3.52-1.09-1.6-2.79-1.82-3.39-1.84-1.44-.15-2.82.85-3.55.85-.73 0-1.86-.83-3.06-.81-1.57.02-3.02.91-3.83 2.32-1.63 2.83-.42 7.01 1.17 9.3.78 1.12 1.71 2.38 2.93 2.33 1.18-.05 1.62-.76 3.04-.76 1.42 0 1.82.76 3.06.74 1.26-.02 2.06-1.14 2.83-2.27.89-1.3 1.26-2.56 1.28-2.63-.03-.01-2.45-.94-2.48-3.71zM14.03 5.4c.65-.79 1.09-1.88.97-2.97-.94.04-2.07.63-2.74 1.41-.6.7-1.13 1.81-.99 2.88 1.05.08 2.12-.53 2.76-1.32z" />
  </svg>
);
