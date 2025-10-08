import { Copy, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  analysis: any;
}

const TextEditor = ({ text, setText, analysis }: TextEditorProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
    toast.success("Text cleared!");
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analyzed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Text downloaded!");
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Text Editor</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!text}
            className="rounded-full"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            disabled={!text}
            className="rounded-full"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClear}
            disabled={!text}
            className="rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here to analyze..."
        className="min-h-[400px] resize-none font-mono text-sm"
      />

      {analysis && (
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{analysis.wordCount} words</span>
          <span>•</span>
          <span>{analysis.charCount} characters</span>
          <span>•</span>
          <span>{analysis.readingTime} min read</span>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
