import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ComparisonViewProps {
  original: string;
  refined: string;
  reasoning: string;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ original, refined, reasoning }) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Original Text</h3>
          <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{original}</p>
        </div>

        {/* Refined */}
        <div className="bg-slate-800 p-6 rounded-xl border border-violet-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={64} className="text-violet-400" />
            </div>
          <h3 className="text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <ArrowRight size={16} /> Refined Version
          </h3>
          <p className="text-slate-100 leading-relaxed text-sm whitespace-pre-wrap font-medium">{refined}</p>
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-violet-500">
        <h4 className="text-violet-300 font-medium mb-1 text-sm">Why this change?</h4>
        <p className="text-slate-400 text-sm italic">{reasoning}</p>
      </div>
    </div>
  );
};

export default ComparisonView;
