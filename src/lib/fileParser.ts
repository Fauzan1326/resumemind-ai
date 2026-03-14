import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

export type SupportedFileType = "pdf" | "docx" | "image" | "text" | "unknown";

export const getFileType = (file: File): SupportedFileType => {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  if (name.endsWith(".pdf") || type === "application/pdf") return "pdf";
  if (
    name.endsWith(".docx") ||
    type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (name.endsWith(".txt") || name.endsWith(".text") || type.startsWith("text/"))
    return "text";
  if (type.startsWith("image/") || /\.(png|jpg|jpeg|webp|bmp|gif)$/.test(name))
    return "image";
  return "unknown";
};

export const extractTextFromFile = async (
  file: File,
  onProgress?: (msg: string) => void
): Promise<string> => {
  const fileType = getFileType(file);

  switch (fileType) {
    case "pdf":
      onProgress?.("Extracting text from PDF...");
      return extractFromPDF(file);
    case "docx":
      onProgress?.("Extracting text from DOCX...");
      return extractFromDOCX(file);
    case "image":
      onProgress?.("Running OCR on image (this may take a moment)...");
      return extractFromImage(file);
    case "text":
      onProgress?.("Reading text file...");
      return readAsText(file);
    default:
      throw new Error(
        "Unsupported file format. Please upload a PDF, DOCX, image (PNG/JPG), or TXT file."
      );
  }
};

const readAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("Failed to read text file"));
    reader.readAsText(file);
  });

const extractFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .map((item: any) => item.str)
      .filter(Boolean);
    pages.push(strings.join(" "));
  }

  return pages.join("\n\n");
};

const extractFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractFromImage = async (file: File): Promise<string> => {
  const result = await Tesseract.recognize(file, "eng");
  return result.data.text;
};
