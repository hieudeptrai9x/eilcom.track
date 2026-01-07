
import React, { useState } from 'react';
import { Upload, Camera, FileSearch, Sparkles, Loader2, X } from 'lucide-react';
import { geminiService } from '../services/gemini';

export const ImageAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      // Remove data:image/jpeg;base64, prefix
      const base64Data = image.split(',')[1];
      const result = await geminiService.analyzeImage(base64Data, "Analyze this luxury product image or shipping document. Identify the brand, product type, and estimate its condition or value if possible. If it is a shipping label, extract the tracking code and carrier name.");
      setAnalysis(result || "No analysis available.");
    } catch (error) {
      console.error('Vision analysis error:', error);
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">AI Vision Analyzer</h1>
        <p className="text-gray-500">Upload product photos or shipping labels for instant AI insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-all hover:border-black/20 group">
            {image ? (
              <>
                <img src={image} alt="Preview" className="w-full h-full object-contain p-4" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-black transition" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900">Click to upload</p>
                  <p className="text-xs text-gray-400">JPG, PNG or WEBP</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
          </div>
          
          <button
            onClick={analyzeImage}
            disabled={!image || isAnalyzing}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 disabled:bg-gray-200 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
          >
            {isAnalyzing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isAnalyzing ? 'Analyzing with Gemini...' : 'Analyze Photo'}
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <FileSearch className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-bold text-gray-900">Analysis Results</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto min-h-[300px]">
            {analysis ? (
              <div className="prose prose-sm prose-slate max-w-none">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{analysis}</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-30">
                <Bot className="w-12 h-12" />
                <p className="text-xs font-medium">Analysis will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Bot: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
