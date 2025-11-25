import React, { useState } from 'react';
import { analyzeTextLogic } from './services/geminiService';
import { AnalysisResult } from './types';
import MetricsChart from './components/MetricsChart';
import ComparisonView from './components/ComparisonView';
import { 
  BookOpen, 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Search,
  FileText
} from 'lucide-react';

// Pre-filling with the user's specific text for immediate convenience
const DEFAULT_TEXT = `In aerospace engineering, precise deformation control of composite shell structures is critical for ensuring structural performance and operational stability. However, the nonlinear electromechanical coupling of piezoelectric actuators poses significant challenges in accurately determining the required actuation voltages for a desired deformation response.

To address this issue, this work investigates an intelligent composite curved shell integrated with multiple MFC actuators and proposes a radial basis function (RBF) neural network–based voltage prediction strategy. First, a finite element model of the piezoelectric composite shell is constructed to generate representative training data and provide numerical validation. The network performance is quantified using the root mean square error and the coefficient of determination (R²), based on which the baseline RBF architecture is configured.

To avoid local minima and further improve prediction accuracy, a genetic algorithm (GA) is used to optimize the RBF spread parameter, yielding an optimal value of 106.4. The GA-enhanced RBF model is validated through both simulation and physical experiments. The results demonstrate that the proposed method reduces the maximum displacement and total deformation by more than 94% and 92%, respectively, confirming its effectiveness and reliability in achieving precise deformation control of piezoelectric composite shells.`;

const App: React.FC = () => {
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeTextLogic(inputText);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze text. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-violet-600 p-2 rounded-lg">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                LogicFlow
              </h1>
              <p className="text-xs text-slate-400">Scientific Logic Analyzer</p>
            </div>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
          >
            Powered by Gemini 2.5
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <h2 className="font-semibold text-slate-300 flex items-center gap-2">
                  <FileText size={18} /> Source Abstract
                </h2>
                <span className="text-xs text-slate-500">{inputText.length} chars</span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 w-full bg-slate-950 p-6 text-slate-300 placeholder-slate-600 resize-none focus:outline-none text-sm leading-relaxed"
                placeholder="Paste your abstract or research paragraph here..."
                spellCheck={false}
              />
              <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !inputText}
                  className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    loading 
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/20'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} /> Analyzing Logic...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} /> Analyze Logic Structure
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Analysis Results */}
          <div className="lg:col-span-7">
            {!result && !loading && !error && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                <Search size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">Ready to analyze</p>
                <p className="text-sm">Paste your text and verify its logical flow.</p>
              </div>
            )}

            {error && (
               <div className="h-full flex items-center justify-center text-red-400 bg-red-950/20 border border-red-900/50 rounded-2xl p-6">
                <AlertTriangle className="mr-2" /> {error}
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-5 rounded-xl border ${result.isLogical ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-amber-950/20 border-amber-900/50'} flex flex-col justify-between`}>
                        <div className="flex items-start justify-between">
                            <h3 className="text-slate-400 text-sm font-medium">Logic Verdict</h3>
                            {result.isLogical ? <CheckCircle className="text-emerald-500" size={20}/> : <AlertTriangle className="text-amber-500" size={20}/>}
                        </div>
                        <p className={`text-lg font-bold leading-tight mt-2 ${result.isLogical ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {result.verdict}
                        </p>
                    </div>

                    <div className="md:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-4 flex items-center">
                        <div className="w-1/3">
                             <MetricsChart scores={result.scores} />
                        </div>
                        <div className="w-2/3 pl-4 border-l border-slate-800">
                             <h4 className="text-slate-300 font-medium mb-2 text-sm">Key Issues Found</h4>
                             {result.issues.length === 0 ? (
                                <p className="text-emerald-500 text-sm">No major issues found. Excellent work.</p>
                             ) : (
                                <ul className="space-y-2">
                                    {result.issues.slice(0, 3).map((issue, idx) => (
                                        <li key={idx} className="text-xs flex gap-2">
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold h-fit ${
                                                issue.type === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                                                issue.type === 'Minor' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {issue.type}
                                            </span>
                                            <span className="text-slate-400">{issue.description}</span>
                                        </li>
                                    ))}
                                </ul>
                             )}
                        </div>
                    </div>
                </div>

                {/* Main Analysis Text */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <BookOpen size={16} className="text-indigo-400"/> Detailed Logic Breakdown
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                        {result.detailedAnalysis}
                    </p>
                </div>

                {/* Comparison */}
                <ComparisonView 
                    original={inputText}
                    refined={result.refinedText}
                    reasoning={result.refinementReasoning}
                />

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
