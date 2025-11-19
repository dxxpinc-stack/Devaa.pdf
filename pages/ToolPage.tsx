import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolPageProps {
  tool: Tool;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
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
      setFiles(Array.from(e.dataTransfer.files));
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
  };

  const handleAction = async () => {
    if (files.length === 0) return;
    setIsLoading(true);
    setResultUrl(null);

    switch (tool.id) {
      case 'jpg-to-pdf':
        try {
          const { jsPDF } = (window as any).jspdf;
          const doc = new jsPDF();

          const readFileAsDataURL = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const dataUrl = await readFileAsDataURL(file);

            const img = new Image();
            await new Promise<void>(resolve => {
                img.onload = () => resolve();
                img.src = dataUrl;
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
            const width = img.width * ratio;
            const height = img.height * ratio;
            const fileType = file.type.split('/')[1].toUpperCase();

            if (i > 0) doc.addPage();
            doc.addImage(dataUrl, fileType, (pdfWidth - width) / 2, (pdfHeight - height) / 2, width, height);
          }

          const url = doc.output('bloburl');
          setResultUrl(url.toString());

        } catch (error) {
          console.error("Error converting images to PDF:", error);
          alert("An error occurred while converting images to PDF. Please ensure you are uploading valid image files.");
        }
        break;
      default:
        console.log(`Performing action: ${tool.title} on files:`, files.map(f => f.name));
        alert(`This is a UI clone. The "${tool.title}" functionality is not implemented yet.`);
    }
    setIsLoading(false);
  };

  const actionButtonText = tool.title.includes(' ') ? tool.title.split(' ').join(' ') : tool.title;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`inline-block p-4 rounded-full ${tool.color.replace('/10', '/20')}`}>
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
        {resultUrl ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your file is ready!</h3>
            <p className="text-gray-600 mb-8">Click the button below to download your converted file.</p>
            <a
              href={resultUrl}
              download={tool.outputFilename || 'download.pdf'}
              className="inline-block px-16 py-4 text-xl font-bold text-white bg-brand-red rounded-lg shadow-lg hover:opacity-90 transition-colors duration-300"
            >
              Download File
            </a>
            <button 
              onClick={handleStartOver}
              className="mt-6 block w-full text-sm text-brand-red hover:underline"
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
                className={`relative border-4 border-dashed rounded-xl p-12 text-center transition-colors duration-300 ${isDragging ? 'border-brand-red bg-brand-red/10' : 'border-gray-300 bg-white'}`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  multiple
                  accept={tool.accept || "*/*"}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                     <svg className="w-16 h-16 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <p className="mt-4 text-2xl font-bold text-brand-red">Select files</p>
                    <p className="mt-2 text-gray-500">or drop files here</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Files</h3>
                <ul className="space-y-3">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-700 font-medium truncate">{file.name}</span>
                      <span className="text-gray-500 text-sm">{Math.round(file.size / 1024)} KB</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setFiles([])}
                  className="mt-4 text-sm text-brand-red hover:underline"
                >
                  Clear selection
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleAction}
                disabled={files.length === 0 || isLoading}
                className="px-16 py-4 text-xl font-bold text-white bg-brand-red rounded-lg shadow-lg hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isLoading ? 'Processing...' : actionButtonText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ToolPage;