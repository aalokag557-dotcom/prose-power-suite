import { BookOpen, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReadabilityPanelProps {
  analysis: any;
}

const ReadabilityPanel = ({ analysis }: ReadabilityPanelProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-info";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Readability Analysis</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Flesch Reading Ease</span>
            <span className={`text-2xl font-bold ${getScoreColor(analysis.readability.score)}`}>
              {analysis.readability.score}
            </span>
          </div>
          <Progress value={analysis.readability.score} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {getScoreLabel(analysis.readability.score)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-info" />
              <span className="text-sm text-muted-foreground">Grade Level</span>
            </div>
            <div className="text-xl font-bold">{analysis.readability.gradeLevel}</div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <div className="text-sm text-muted-foreground mb-2">Complex Words</div>
            <div className="text-xl font-bold">{analysis.readability.complexWords}</div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <div className="text-sm text-muted-foreground mb-2">Word Errors</div>
            <div className={`text-xl font-bold ${analysis.readability.wordErrors > 0 ? 'text-destructive' : 'text-success'}`}>
              {analysis.readability.wordErrors}
            </div>
          </div>
        </div>
        
        {analysis.readability.wordErrors > 0 && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
            <div className="text-sm font-medium text-destructive mb-2">Potential Error Words:</div>
            <div className="flex flex-wrap gap-2">
              {analysis.readability.errorWords.slice(0, 10).map((word: string, index: number) => (
                <span key={index} className="px-2 py-1 rounded-md bg-destructive/20 text-destructive text-xs font-mono">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadabilityPanel;
