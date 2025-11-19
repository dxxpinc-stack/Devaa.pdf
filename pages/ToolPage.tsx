
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';
import Toast, { ToastType } from '../components/Toast';
import Popup from '../components/Popup';

// Declare global types for the CDN libraries
declare global {
  interface Window {
    PDFLib: any;
    JSZip: any;
    pdfjsLib: any;
    jspdf: any;
  }
}

interface ToolPageProps {
  tool: Tool;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing...');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const [toast, setToast] = useState<{ id: number; message: string; type: ToastType } | null>(null);
  const [popupInfo, setPopupInfo] = useState<{ title: string; message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Reset state when tool changes
  useEffect(() => {
    setFiles([]);
    setResultUrl(null);
    setLoadingMessage('Processing...');
    setToast(null);
    setPopupInfo(null);
    setDownloadFileName('');
    
    // Update Page Title
    document.title = `${tool.title} - Ziva.pdf`;
    
    return () => {
        // Optional cleanup
    }
  }, [tool.id, tool.title]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ id: Date.now(), message, type });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
      setResultUrl(null);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
      setResultUrl(null);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleStartOver = () => {
    setFiles([]);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
    setResultUrl(null);
    setDownloadFileName('');
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // --- Tool Implementations ---

  const processMergePdf = async () => {
    if (files.length < 2) {
      showToast("Please select at least 2 PDF files to merge.", "error");
      return null;
    }
    
    const { PDFDocument } = window.PDFLib;
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const fileArrayBuffer = await readFileAsArrayBuffer(file);
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page: any) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const processSplitPdf = async () => {
    const { PDFDocument } = window.PDFLib;
    const JSZip = window.JSZip;
    const zip = new JSZip();

    // Only process the first file for splitting in this simple UI
    const file = files[0];
    const fileArrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);
    const numberOfPages = pdfDoc.getPageCount();

    for (let i = 0; i < numberOfPages; i++) {
      const subDocument = await PDFDocument.create();
      const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
      subDocument.addPage(copiedPage);
      const pdfBytes = await subDocument.save();
      zip.file(`page-${i + 1}.pdf`, pdfBytes);
      setLoadingMessage(`Splitting page ${i + 1} of ${numberOfPages}...`);
    }

    const content = await zip.generateAsync({ type: "blob" });
    return URL.createObjectURL(content);
  };

  const processJpgToPdf = async () => {
    const { PDFDocument } = window.PDFLib;
    const doc = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setLoadingMessage(`Processing image ${i+1}/${files.length}...`);
        const buffer = await readFileAsArrayBuffer(file);
        
        let image;
        try {
            if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
                image = await doc.embedJpg(buffer);
            } else if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
                image = await doc.embedPng(buffer);
            } else {
                 // Try as JPG fallback
                 image = await doc.embedJpg(buffer);
            }
        } catch (e) {
            console.warn(`Could not embed image ${file.name}`, e);
            continue;
        }

        const page = doc.addPage();
        const { width, height } = image.scale(1);
        
        // Scale image to fit page, preserving aspect ratio
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        
        // Calculate scale factor to fit within margins (e.g., 20px margin)
        const margin = 20;
        const availWidth = pageWidth - (margin * 2);
        const availHeight = pageHeight - (margin * 2);
        
        const scaleFactor = Math.min(availWidth / width, availHeight / height);
        
        const drawWidth = width * scaleFactor;
        const drawHeight = height * scaleFactor;
        
        page.drawImage(image, {
            x: (pageWidth - drawWidth) / 2,
            y: (pageHeight - drawHeight) / 2,
            width: drawWidth,
            height: drawHeight,
        });
    }

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const processPdfToJpg = async () => {
      const JSZip = window.JSZip;
      const zip = new JSZip();
      const file = files[0];
      
      const arrayBuffer = await readFileAsArrayBuffer(file);
      // PDF.js often prefers Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const pdf = await window.pdfjsLib.getDocument(uint8Array).promise;
      const totalPages = pdf.numPages;

      for (let i = 1; i <= totalPages; i++) {
          setLoadingMessage(`Rendering page ${i} of ${totalPages}...`);
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // High quality
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Fix for transparent backgrounds becoming black in JPEG
          context.fillStyle = '#FFFFFF'; 
          context.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: context, viewport: viewport }).promise;

          // Convert canvas to blob
          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
          if (blob) {
              zip.file(`page-${i}.jpg`, blob);
          }
      }

      const content = await zip.generateAsync({ type: "blob" });
      return URL.createObjectURL(content);
  };

  const processRotatePdf = async () => {
      const { PDFDocument, degrees } = window.PDFLib;
      const file = files[0];
      const buffer = await readFileAsArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page: any) => {
          const rotation = page.getRotation();
          const angle = rotation.angle ?? 0;
          page.setRotation(degrees(angle + 90));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
  };

  const processWatermark = async () => {
      const { PDFDocument, rgb, degrees } = window.PDFLib;
      const file = files[0];
      const buffer = await readFileAsArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page: any) => {
          const { width, height } = page.getSize();
          page.drawText('Ziva.pdf', {
              x: width / 2 - 100,
              y: height / 2,
              size: 50,
              color: rgb(0.85, 0.14, 0.14), // Brand redish
              opacity: 0.2,
              rotate: degrees(45),
          });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
  };

  const processSimulation = async () => {
      return new Promise<void>((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
              progress += 10;
              setLoadingMessage(`Analyze Document... ${progress}%`);
              if (progress >= 100) {
                  clearInterval(interval);
                  resolve();
              }
          }, 200);
      });
  };

  const generateSmartFilename = () => {
      if (files.length === 0) return 'ziva_document.pdf';

      const firstFile = files[0];
      const originalName = firstFile.name;
      const nameWithoutExt = originalName.includes('.') ? originalName.substring(0, originalName.lastIndexOf('.')) : originalName;
      
      switch(tool.id) {
        case 'merge-pdf':
            return `${nameWithoutExt}_merged.pdf`;
        case 'split-pdf':
            return `${nameWithoutExt}_split.zip`;
        case 'compress-pdf':
            return `${nameWithoutExt}_compressed.pdf`;
        case 'pdf-to-word':
            return `${nameWithoutExt}.docx`;
        case 'pdf-to-powerpoint':
            return `${nameWithoutExt}.pptx`;
        case 'pdf-to-excel':
            return `${nameWithoutExt}.xlsx`;
        case 'word-to-pdf':
            return `${nameWithoutExt}.pdf`;
        case 'powerpoint-to-pdf':
            return `${nameWithoutExt}.pdf`;
        case 'excel-to-pdf':
            return `${nameWithoutExt}.pdf`;
        case 'edit-pdf':
            return `${nameWithoutExt}_edited.pdf`;
        case 'pdf-to-jpg':
            return `${nameWithoutExt}_images.zip`;
        case 'jpg-to-pdf':
            return files.length > 1 ? 'combined_images.pdf' : `${nameWithoutExt}_converted.pdf`;
        case 'sign-pdf':
            return `${nameWithoutExt}_signed.pdf`;
        case 'watermark':
            return `${nameWithoutExt}_watermarked.pdf`;
        case 'rotate-pdf':
            return `${nameWithoutExt}_rotated.pdf`;
        default:
            return tool.outputFilename || `ziva_${originalName}`;
      }
  };

  const handleAction = async () => {
    if (files.length === 0) return;
    setIsLoading(true);
    setResultUrl(null);
    setLoadingMessage('Initializing...');

    try {
      let url: string | null | undefined = null;

      // Define tools that require backend processing or full UI editors
      const complexTools = [
          'pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 
          'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf',
          'edit-pdf', 'sign-pdf'
      ];

      if (complexTools.includes(tool.id)) {
          await processSimulation();
          
          let message = `The ${tool.title} tool requires our advanced cloud processing engine.`;
          if (tool.id === 'sign-pdf' || tool.id === 'edit-pdf') {
              message = "This feature requires our interactive document editor which is currently being updated.";
          } else {
              message = "High-fidelity document conversion requires server-side processing which is disabled in this demo.";
          }

          setPopupInfo({
              title: "Advanced Feature",
              message: message,
              type: 'info'
          });
          setIsLoading(false);
          return;
      }

      switch (tool.id) {
        case 'merge-pdf':
          setLoadingMessage('Merging files...');
          url = await processMergePdf();
          break;
        case 'split-pdf':
          setLoadingMessage('Splitting PDF...');
          url = await processSplitPdf();
          break;
        case 'jpg-to-pdf':
          setLoadingMessage('Converting images...');
          url = await processJpgToPdf();
          break;
        case 'pdf-to-jpg':
            setLoadingMessage('Extracting images...');
            url = await processPdfToJpg();
            break;
        case 'rotate-pdf':
            setLoadingMessage('Rotating pages...');
            url = await processRotatePdf();
            break;
        case 'watermark':
            setLoadingMessage('Applying watermark...');
            url = await processWatermark();
            break;
        case 'compress-pdf':
            setLoadingMessage('Compressing file...');
            // Simulation of compression using load/save which can optimize PDF structure
            const { PDFDocument } = window.PDFLib;
            const b = await readFileAsArrayBuffer(files[0]);
            const d = await PDFDocument.load(b);
            const bytes = await d.save(); 
            url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
            break;
        default:
            break;
      }

      if (url) {
        setResultUrl(url);
        setDownloadFileName(generateSmartFilename());
        showToast("Success! Your file is ready.", "success");
      } else {
          showToast("Could not process file.", "error");
      }

    } catch (error: any) {
      console.error("Process Error:", error);
      showToast("An error occurred while processing the file. Please try a valid PDF.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const actionButtonText = tool.title;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {popupInfo && <Popup title={popupInfo.title} message={popupInfo.message} type={popupInfo.type} onClose={() => setPopupInfo(null)} />}
      
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className={`inline-block p-4 rounded-full ${tool.color.replace('/10', '/20')} transition-all duration-300 hover:scale-110`}>
          <tool.Icon className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold text-charcoal-text mt-4">{tool.title}</h1>
        <p className="mt-2 text-lg text-gray-700">{tool.description}</p>
        <div className="mt-6">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-brand-red transition-colors">
                &larr; Back to all tools
            </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        {isLoading ? (
            <div className="bg-white p-12 rounded-xl shadow-md text-center animate-pulse">
                <div className="flex justify-center mb-6">
                    <svg className="animate-spin h-12 w-12 text-brand-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{loadingMessage}</h3>
                <p className="text-gray-500 mt-2">Please wait while we process your documents.</p>
            </div>
        ) : resultUrl ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center animate-fade-in-up border-t-4 border-green-500">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce-small">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your file is ready!</h3>
            <p className="text-gray-600 mb-8">Click the button below to download your processed file.</p>
            <a
              href={resultUrl}
              download={downloadFileName}
              className="inline-block px-16 py-4 text-xl font-bold text-white bg-brand-red rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Download File
            </a>
            <div className="mt-2 text-xs text-gray-400">
                Saved as: {downloadFileName}
            </div>
            <button 
              onClick={handleStartOver}
              className="mt-8 block w-full text-sm text-brand-red hover:underline font-medium"
            >
              Convert more files
            </button>
          </div>
        ) : (
          <>
            {files.length === 0 ? (
              <div 
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`relative border-4 border-dashed rounded-xl p-12 text-center transition-all duration-300 group ${isDragging ? 'border-brand-red bg-brand-red/10 scale-105' : 'border-gray-300 bg-white hover:border-brand-red/50'}`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                  multiple
                  accept={tool.accept || "*/*"}
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                     <svg className={`w-16 h-16 text-brand-red mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <p className="text-2xl font-bold text-brand-red">Select files</p>
                    <p className="mt-2 text-gray-500">or drop files here</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in-up">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold text-gray-800">Selected Files ({files.length})</h3>
                    <button onClick={() => setFiles([])} className="text-sm text-red-500 hover:text-red-700 font-medium">Clear All</button>
                </div>
                
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100 hover:border-brand-red/30 transition-colors">
                      <div className="flex items-center overflow-hidden">
                        <div className="flex-shrink-0 h-8 w-8 bg-red-100 text-brand-red rounded flex items-center justify-center mr-3">
                             <span className="text-xs font-bold">{file.name.split('.').pop()?.toUpperCase()}</span>
                        </div>
                        <span className="text-gray-700 font-medium truncate">{file.name}</span>
                      </div>
                      <span className="text-gray-500 text-xs bg-gray-200 px-2 py-1 rounded-full ml-2 flex-shrink-0">{Math.round(file.size / 1024)} KB</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                     <label className="cursor-pointer text-sm font-medium text-brand-red hover:text-brand-red/80">
                        + Add more files
                        <input type="file" onChange={handleFileChange} multiple accept={tool.accept || "*/*"} className="hidden" />
                    </label>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleAction}
                disabled={files.length === 0 || isLoading}
                className="w-full md:w-auto px-16 py-4 text-xl font-bold text-white bg-brand-red rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all duration-300"
              >
                {isLoading ? 'Processing...' : `${actionButtonText} (${files.length})`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ToolPage;
