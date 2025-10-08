import { FileText, Type, AlignLeft, List, Clock, Mic } from "lucide-react";

interface StatsPanelProps {
  analysis: any;
}

const StatsPanel = ({ analysis }: StatsPanelProps) => {
  const stats = [
    {
      label: "Words",
      value: analysis.wordCount,
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Characters",
      value: analysis.charCount,
      icon: Type,
      color: "text-secondary",
    },
    {
      label: "Sentences",
      value: analysis.sentenceCount,
      icon: AlignLeft,
      color: "text-accent",
    },
    {
      label: "Paragraphs",
      value: analysis.paragraphCount,
      icon: List,
      color: "text-info",
    },
    {
      label: "Reading Time",
      value: `${analysis.readingTime} min`,
      icon: Clock,
      color: "text-success",
    },
    {
      label: "Speaking Time",
      value: `${analysis.speakingTime} min`,
      icon: Mic,
      color: "text-warning",
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Text Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`${stat.color} p-2 rounded-lg bg-background`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/30">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Avg. Word Length</div>
            <div className="font-semibold">{analysis.avgWordLength} chars</div>
          </div>
          <div>
            <div className="text-muted-foreground">Avg. Sentence Length</div>
            <div className="font-semibold">{analysis.avgSentenceLength} words</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
