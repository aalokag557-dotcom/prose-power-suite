import { Cloud } from "lucide-react";

interface WordCloudPanelProps {
  analysis: any;
}

const WordCloudPanel = ({ analysis }: WordCloudPanelProps) => {
  const words = analysis.wordFrequency.slice(0, 20);
  const maxCount = words[0]?.count || 1;

  const getFontSize = (count: number) => {
    const size = (count / maxCount) * 32 + 12;
    return `${size}px`;
  };

  const getRandomColor = (index: number) => {
    const colors = [
      "text-primary",
      "text-secondary",
      "text-accent",
      "text-info",
      "text-success",
      "text-warning",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Word Cloud</h2>
      </div>

      <div className="p-6 rounded-xl bg-muted/30 border border-border/30 min-h-[300px] flex flex-wrap items-center justify-center gap-4">
        {words.map((word, index) => (
          <span
            key={index}
            className={`font-bold ${getRandomColor(index)} hover:scale-110 transition-transform cursor-default inline-block`}
            style={{ fontSize: getFontSize(word.count) }}
          >
            {word.word}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground text-center">
        Size represents word frequency in the text
      </div>
    </div>
  );
};

export default WordCloudPanel;
