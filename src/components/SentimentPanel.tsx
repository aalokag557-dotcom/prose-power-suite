import { Smile, Meh, Frown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SentimentPanelProps {
  analysis: any;
}

const SentimentPanel = ({ analysis }: SentimentPanelProps) => {
  const { sentiment } = analysis;

  const getSentimentIcon = () => {
    if (sentiment.score > 0) return <Smile className="h-8 w-8 text-success" />;
    if (sentiment.score < 0) return <Frown className="h-8 w-8 text-destructive" />;
    return <Meh className="h-8 w-8 text-muted-foreground" />;
  };

  const getSentimentColor = () => {
    if (sentiment.score > 0) return "text-success";
    if (sentiment.score < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Sentiment Analysis</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 rounded-full bg-muted/50">
          {getSentimentIcon()}
        </div>
        <div>
          <div className={`text-3xl font-bold ${getSentimentColor()}`}>
            {sentiment.label}
          </div>
          <div className="text-sm text-muted-foreground">
            Score: {sentiment.score.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Positive</span>
            <span className="font-medium">{sentiment.positive}%</span>
          </div>
          <Progress value={sentiment.positive} className="h-2 bg-muted">
            <div className="h-full bg-success" style={{ width: `${sentiment.positive}%` }} />
          </Progress>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Neutral</span>
            <span className="font-medium">{sentiment.neutral}%</span>
          </div>
          <Progress value={sentiment.neutral} className="h-2 bg-muted">
            <div className="h-full bg-info" style={{ width: `${sentiment.neutral}%` }} />
          </Progress>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Negative</span>
            <span className="font-medium">{sentiment.negative}%</span>
          </div>
          <Progress value={sentiment.negative} className="h-2 bg-muted">
            <div className="h-full bg-destructive" style={{ width: `${sentiment.negative}%` }} />
          </Progress>
        </div>
      </div>
    </div>
  );
};

export default SentimentPanel;
