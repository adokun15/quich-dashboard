export default function Card({ className, children }) {
  return (
    <div
      className={`${className} shadow-md bg-primary800 py-4 px-6 rounded-2xl `}
    >
      {children}
    </div>
  );
}
