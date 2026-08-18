export default function WelcomeGreetings() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">Good Afternoon, Daniel!</h1>
      <div className="flex  gap-x-4">
        {/* Outline Buttons */}
        <button className="outline_button">Share Store</button>
        <button className="outline_button">Upgrade plan</button>
      </div>
    </section>
  );
}
