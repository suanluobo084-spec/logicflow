export interface Issue {
  type: 'Critical' | 'Minor' | 'Suggestion';
  description: string;
}

export interface AnalysisResult {
  isLogical: boolean;
  verdict: string;
  detailedAnalysis: string;
  scores: {
    logic: number;
    clarity: number;
    impact: number;
    flow: number;
  };
  issues: Issue[];
  refinedText: string;
  refinementReasoning: string;
}
