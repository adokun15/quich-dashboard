export default function Card({ className, children }) {
  return (
    <div
      className={`${className} shadow 
      bg-primary90 py-4 h-fit px-6 rounded-2xl `}
    >
      {children}
    </div>
  );
}
