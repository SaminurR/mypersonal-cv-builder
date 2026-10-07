import { useState } from "react";
import { useCVStore } from "../../store/cv-store";
import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { Download, Printer, FileImage, FileCode2, Loader2 } from "lucide-react";

export function ExportButtons() {
  const cv = useCVStore((state) => state.cv);
  const [isExporting, setIsExporting] = useState(false);

  const getFilename = () => {
    const name = cv.header.fullName ? cv.header.fullName.replace(/\s+/g, "-") : "My";
    return `${name}-CV`;
  };

  const getTargetNode = () => {
    const node = document.getElementById("cv-preview-page");
    if (!node) throw new Error("CV Preview node not found");
    return node;
  };

  const exportImage = async (type: "png" | "jpeg") => {
    try {
      setIsExporting(true);
      await document.fonts.ready; // Ensure fonts are loaded
      const node = getTargetNode();
      
      const options = {
        pixelRatio: 2, // 2x quality
        backgroundColor: cv.settings.pageBgColor,
      };

      const dataUrl = type === "png"
        ? await toPng(node, options)
        : await toJpeg(node, { ...options, quality: 0.95 });

      const link = document.createElement("a");
      link.download = `${getFilename()}.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(`Export ${type} failed:`, err);
      alert(`Failed to export ${type.toUpperCase()}. Check console for details.`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportPDF = async () => {
    try {
      setIsExporting(true);
      await document.fonts.ready;
      const node = getTargetNode();
      
      // Use 3x pixel ratio for crisp PDF text rendering
      const dataUrl = await toPng(node, { 
        pixelRatio: 3,
        backgroundColor: cv.settings.pageBgColor,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const nodeWidth = node.offsetWidth;
      const nodeHeight = node.offsetHeight;

      // Calculate ratio to fit A4 width
      const imgHeightInMm = (nodeHeight * pdfWidth) / nodeWidth;

      let heightLeft = imgHeightInMm;
      let position = 0;

      // First page
      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, imgHeightInMm);
      heightLeft -= pdfHeight;

      // Subsequent pages if content overflows A4
      while (heightLeft > 0) {
        position = position - pdfHeight; // Shift image up by one page height
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, imgHeightInMm);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${getFilename()}.pdf`);
    } catch (err) {
      console.error("Export PDF failed:", err);
      alert("Failed to export PDF. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => exportImage("png")}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
        title="Download PNG (2x)"
      >
        <FileImage size={16} />
        PNG
      </button>
      
      <button
        onClick={() => exportImage("jpeg")}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
        title="Download JPEG (2x)"
      >
        <FileCode2 size={16} />
        JPEG
      </button>

      <button
        onClick={exportPDF}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        title="Download PDF (Multi-page Image-based)"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        PDF
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        onClick={handlePrint}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50"
        title="Print or Save as Selectable PDF"
      >
        <Printer size={16} />
        Print
      </button>
    </div>
  );
}
