import { useState, useCallback } from "react";
import { Upload, FileText, Image, Loader2, X } from "lucide-react";
import { extractTextFromFile, getFileType, type SupportedFileType } from "@/lib/fileParser";

interface FileUploadZoneProps {
  onTextExtracted: (text: string) => void;
  showTextarea?: boolean;
  textareaValue?: string;
  onTextareaChange?: (val: string) => void;
  textareaPlaceholder?: string;
  compact?: boolean;
}

const fileTypeLabels: Record<SupportedFileType, string> = {
  pdf: "PDF",
  docx: "DOCX",
  image: "Image (OCR)",
  text: "Text",
  unknown: "Unknown",
};

const FileUploadZone = ({
  onTextExtracted,
  showTextarea = true,
  textareaValue = "",
  onTextareaChange,
  textareaPlaceholder = "Or paste your resume text here...",
  compact = false,
}: FileUploadZoneProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: SupportedFileType } | null>(null);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      setError("");
      setIsProcessing(true);
      setProgressMsg("Reading file...");
      const fType = getFileType(file);
      setUploadedFile({ name: file.name, type: fType });

      try {
        const text = await extractTextFromFile(file, setProgressMsg);
        if (!text.trim()) {
          setError("No text could be extracted from this file. Try a different format.");
        } else {
          onTextExtracted(text);
        }
      } catch (err: any) {
        setError(err.message || "Failed to process file.");
      } finally {
        setIsProcessing(false);
        setProgressMsg("");
      }
    },
    [onTextExtracted]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearFile = () => {
    setUploadedFile(null);
    setError("");
    onTextExtracted("");
  };

  return (
    <div className="space-y-4">
      <label
        className={`flex flex-col items-center justify-center w-full ${compact ? "h-24" : "h-32"} border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors relative`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="text-xs text-muted-foreground">{progressMsg}</span>
          </div>
        ) : uploadedFile ? (
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">{uploadedFile.name}</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {fileTypeLabels[uploadedFile.type]}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                clearFile();
              }}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Drop or click to upload
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">PDF</span>
              <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">DOCX</span>
              <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">Image</span>
              <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">TXT</span>
            </div>
          </>
        )}
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx,.txt,.text,.png,.jpg,.jpeg,.webp,.bmp"
          onChange={handleInputChange}
        />
      </label>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      {showTextarea && (
        <textarea
          className={`w-full ${compact ? "h-28" : "h-40"} bg-secondary border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50`}
          placeholder={textareaPlaceholder}
          value={textareaValue}
          onChange={(e) => onTextareaChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default FileUploadZone;
