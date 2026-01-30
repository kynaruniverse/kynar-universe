'use client';

interface LibraryCardProps {
  title: string;
  world: 'home' | 'lifestyle' | 'tools';
  format: string;
  downloadUrl: string;
  openUrl?: string; // For PWAs or Notion templates
}

export default function LibraryCard({ title, world, format, downloadUrl, openUrl }: LibraryCardProps) {
  const accentColors = {
    home: 'bg-kyn-green-500',
    lifestyle: 'bg-kyn-caramel-500',
    tools: 'bg-kyn-slate-500',
  };

  return (
    <div className="bg-white border border-kyn-slate-500/10 rounded-[28px] p-6 flex flex-col gap-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${accentColors[world]}`} />
            <span className="text-[10px] uppercase tracking-widest text-kyn-slate-500 font-bold">
              {world}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-kyn-green-700">{title}</h3>
          <p className="text-xs text-kyn-slate-500 uppercase tracking-tighter italic">{format}</p>
        </div>
      </div>

      <div className="flex gap-3">
        {openUrl && (
          <a 
            href={openUrl} 
            className="flex-1 bg-kyn-green-700 text-white text-center py-3 rounded-xl text-sm font-medium active:scale-95 transition-transform"
          >
            Open Tool
          </a>
        )}
        <a 
          href={downloadUrl} 
          className={`flex-1 border border-kyn-slate-500/20 text-kyn-green-700 text-center py-3 rounded-xl text-sm font-medium active:scale-95 transition-transform ${!openUrl ? 'w-full' : ''}`}
        >
          Download
        </a>
      </div>
    </div>
  );
}
