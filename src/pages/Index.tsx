import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/TextEditor";
import StatsPanel from "@/components/StatsPanel";
import FrequencyAnalysis from "@/components/FrequencyAnalysis";
import ReadabilityPanel from "@/components/ReadabilityPanel";
import SentimentPanel from "@/components/SentimentPanel";
import WordCloudPanel from "@/components/WordCloudPanel";
import { analyzeText } from "@/utils/textAnalysis";

const Index = () => {
  const [text, setText] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (text.trim()) {
      const result = analyzeText(text);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [text]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Text Analyzer Pro
              </h1>
              <p className="text-xs text-muted-foreground">Advanced text analysis toolkit</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Text Editor */}
          <div className="animate-slide-up">
            <TextEditor text={text} setText={setText} analysis={analysis} />
          </div>

          {/* Analysis Panels */}
          <div className="space-y-6 animate-fade-in">
            {analysis ? (
              <>
                <StatsPanel analysis={analysis} />
                <FrequencyAnalysis analysis={analysis} />
                <ReadabilityPanel analysis={analysis} />
                <SentimentPanel analysis={analysis} />
                <WordCloudPanel analysis={analysis} />
              </>
            ) : (
              <div className="bg-card rounded-2xl p-12 text-center border border-border/50 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Analyzing</h3>
                <p className="text-muted-foreground">
                  Type or paste your text to see detailed analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
