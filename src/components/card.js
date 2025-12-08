export default function Card({ className, children }) {
  return (
    <div className={`shadow-md card_white  dark:card_dark ${className}`}>
      {children}
    </div>
  );
}
