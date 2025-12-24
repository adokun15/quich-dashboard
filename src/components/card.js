export default function Card({ className, children }) {
  return (
    <div
      className={`shadow-md bg-card2 py-4 px-6 rounded-2xl dark: ${className}`}
    >
      {children}
    </div>
  );
}
