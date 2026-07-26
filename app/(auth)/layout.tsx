export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="skip-link rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-ink shadow-lg"
      >
        Skip to main content
      </a>
      {children}
    </>
  );
}
