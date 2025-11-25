import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    isLogical: {
      type: Type.BOOLEAN,
      description: "Whether the overall logic flow is sound without major fallacies.",
    },
    verdict: {
      type: Type.STRING,
      description: "A short, one-sentence summary of the logical quality (e.g., 'Logically sound but could be more concise').",
    },
    detailedAnalysis: {
      type: Type.STRING,
      description: "A comprehensive breakdown of the logical flow (Context -> Problem -> Solution -> Methodology -> Results).",
    },
    scores: {
      type: Type.OBJECT,
      properties: {
        logic: { type: Type.INTEGER, description: "Score 0-100 for logical coherence." },
        clarity: { type: Type.INTEGER, description: "Score 0-100 for clarity of expression." },
        impact: { type: Type.INTEGER, description: "Score 0-100 for academic impact/persuasiveness." },
        flow: { type: Type.INTEGER, description: "Score 0-100 for transition smoothness." },
      },
      required: ["logic", "clarity", "impact", "flow"],
    },
    issues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["Critical", "Minor", "Suggestion"] },
          description: { type: Type.STRING, description: "Description of the logical or stylistic issue." },
        },
        required: ["type", "description"],
      },
    },
    refinedText: {
      type: Type.STRING,
      description: "A professionally rewritten version of the text that fixes logic gaps and improves flow.",
    },
    refinementReasoning: {
      type: Type.STRING,
      description: "Explanation of why the changes were made in the refined text.",
    },
  },
  required: ["isLogical", "verdict", "detailedAnalysis", "scores", "issues", "refinedText", "refinementReasoning"],
};

export const analyzeTextLogic = async (text: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Act as a strict, world-class academic editor and logician for an aerospace engineering journal.
      Analyze the following text for logical coherence, causal relationships, and structural integrity.
      
      The user is asking: "Is there a problem with the logical relationship in this paragraph?"

      Specific checks:
      1. Does the Problem clearly follow from the Context?
      2. Does the Solution directly address the Problem?
      3. Is the Methodology (e.g., FEA, Neural Network, Genetic Algorithm) introduced in a logical order?
      4. Do the Results validate the proposed Solution?
      5. Are there any "leaps" in logic where a connection is missing?
      
      Text to analyze:
      """
      ${text}
      """
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert at fixing academic abstracts. You focus on 'Context -> Gap -> Method -> Result' flow.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
