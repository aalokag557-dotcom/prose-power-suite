import { BarChart3 } from "lucide-react";

interface FrequencyAnalysisProps {
  analysis: any;
}

const FrequencyAnalysis = ({ analysis }: FrequencyAnalysisProps) => {
  const topWords = analysis.wordFrequency.slice(0, 10);
  const maxCount = topWords[0]?.count || 1;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Keyword Frequency</h2>
      </div>

      <div className="space-y-3">
        {topWords.map((word, index) => {
          const percentage = (word.count / maxCount) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{word.word}</span>
                <span className="text-muted-foreground">
                  {word.count} times ({word.density}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/30">
        <div className="text-sm text-muted-foreground mb-1">Unique Words</div>
        <div className="text-2xl font-bold">{analysis.uniqueWordCount}</div>
      </div>
    </div>
  );
};

export default FrequencyAnalysis;
