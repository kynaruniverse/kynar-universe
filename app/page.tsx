export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-home-base p-4">
      {/* Visual Test Card */}
      <div className="bg-home-surface p-8 rounded-2xl shadow-lg max-w-sm text-center">
        <h1 className="text-h1-mob font-bold text-home-text mb-4">
          Welcome Traveler
        </h1>
        <p className="text-body mb-6">
          This is the Kynar Universe. The fonts should be elegant (Lora) and the headers bold (Outfit).
        </p>
        <button className="bg-signal-cyan text-white px-6 py-3 rounded-md font-bold hover:opacity-90 transition-all">
          Start Exploring
        </button>
      </div>
    </main>
  );
}
