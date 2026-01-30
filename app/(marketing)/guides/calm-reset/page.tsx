import Article from '@/components/ui/Article';
import Link from 'next/link';

export default function CalmResetGuide() {
  return (
    <div className="flex flex-col gap-10 pb-24">
      
      {/* 1. Header & Intent */}
      <header className="pt-8 border-b border-kyn-slate-500/10 pb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-kyn-caramel-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-kyn-slate-500 font-bold">
            The Safety Net
          </span>
        </div>
        <h1 className="text-4xl font-semibold text-kyn-green-700 leading-tight mb-4">
          The Calm Reset
        </h1>
        <p className="text-xl text-kyn-slate-500 italic">
          How to return when life gets messy.
        </p>
      </header>

      {/* 2. The Guide Content */}
      <Article>
        <p>
          It is a law of nature that systems eventually break. You will get ill, 
          work will get intense, or you will simply lose interest for a few weeks. 
          In most apps, this results in a wall of red notifications and "broken streaks."
        </p>

        <h2>1. The First Rule: No Shame</h2>
        <p>
          Kynar is designed to be <strong>dropped and picked up.</strong> 
          There are no streaks to lose. If you haven't opened your Weekly Overview 
          in three weeks, the system isn't "failing"—it is simply waiting for you.
        </p>

        <h2>2. The Three-Minute Audit</h2>
        <p>
          When you feel ready to return, don't try to "catch up" on what you missed. 
          Follow this simple ritual:
        </p>
        <ul>
          <li><strong>Clear the past:</strong> Archive or delete any tasks from last week. They are gone.</li>
          <li><strong>Check the Admin:</strong> Are there any bills or dates in the next 48 hours?</li>
          <li><strong>Pick one focus:</strong> What is the single most grounding thing you can do today?</li>
        </ul>

        <h2>3. Permission to Start Small</h2>
        <p>
          You do not need to use every feature of Kynar Home. If all you do today 
          is check your "Don't Forget" space, you have succeeded.
        </p>

        <div className="mt-12 p-8 rounded-[32px] bg-kyn-mist border border-kyn-slate-500/5 text-center">
          <p className="text-sm font-medium text-kyn-green-700 mb-4">
            Ready to ground yourself?
          </p>
          <Link 
            href="/library" 
            className="inline-block bg-kyn-green-700 text-white px-8 py-3 rounded-full text-sm font-bold active:scale-95 transition-transform"
          >
            Go to My Library
          </Link>
        </div>
      </Article>

    </div>
  );
}
