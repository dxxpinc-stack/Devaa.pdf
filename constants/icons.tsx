import React from 'react';

export const MergeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 5.414V14a1 1 0 1 1-2 0V5.414L7.707 8.707a1 1 0 0 1-1.414-1.414l4-4zM5 16a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
  </svg>
);

export const SplitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V3a1 1 0 0 1 1-1zm-2 9H4v-2h6v2zm0 2v7h2v-7h-2zm2-2h7V9h-7v2z" clipRule="evenodd" fillRule="evenodd" />
    <path d="M11 20v-7H4v2h7v5h-2zm2-9h7V9h-7v2z"/>
    <path d="M4.586 5.586a2 2 0 0 1 2.828 0L12 10.172l4.586-4.586a2 2 0 1 1 2.828 2.828L14.828 13l4.586 4.586a2 2 0 1 1-2.828 2.828L12 15.828l-4.586 4.586a2 2 0 1 1-2.828-2.828L9.172 13 4.586 8.414a2 2 0 0 1 0-2.828z" />
  </svg>
);

export const CompressIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 3h8a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2V4a1 1 0 0 1 1-1zm2 6v6h4V9h-4zM6 8v8h12V8H6z" />
    <path d="M10.414 7.586L12 6l1.586 1.586L15 6.172V10h-2V7.414L11.414 9 10 7.586 8.586 9 7.172 7.586 6 9V6.172l1.414-1.414L9 6.172l1.414 1.414zM13.586 16.414L12 18l-1.586-1.586L9 17.828V14h2v2.586l1.586-1.586L14 16.414l1.414-1.414L16.828 16.414 18 15v2.828l-1.414 1.414L15 17.828l-1.414-1.414z" />
  </svg>
);

export const PdfToWordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 5v2h8V7H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z" />
    <path d="M14.5 10H18v2h-3.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM8.5 10H12v2H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
  </svg>
);
// Add more icons as needed...
export const PdfToPowerpointIcon: React.FC<{ className?: string }> = PdfToWordIcon;
export const PdfToExcelIcon: React.FC<{ className?: string }> = PdfToWordIcon;
export const WordToPdfIcon: React.FC<{ className?: string }> = PdfToWordIcon;
export const PowerpointToPdfIcon: React.FC<{ className?: string }> = PdfToWordIcon;
export const ExcelToPdfIcon: React.FC<{ className?: string }> = PdfToWordIcon;
export const EditPdfIcon: React.FC<{ className?: string }> = CompressIcon;
export const PdfToJpgIcon: React.FC<{ className?: string }> = CompressIcon;
export const JpgToPdfIcon: React.FC<{ className?: string }> = CompressIcon;
export const SignPdfIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.707 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.364.243L3.5 21.243a1 1 0 0 1-1.243-1.243l2.293-8.257a1 1 0 0 1 .243-.364l9-9zm-2.121 2.121L5.414 13.586l-1.527 5.527 5.527-1.527L17.586 9.414 13.586 5.414zM16 4.414l4 4L18.414 10l-4-4L16 4.414z" />
  </svg>
);
export const WatermarkIcon: React.FC<{ className?: string }> = SignPdfIcon;
export const RotatePdfIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4a8 8 0 1 0 5.657 13.657A8 8 0 0 0 12 4zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm-3-5a1 1 0 0 1 1-1h4v-2l3 3-3 3v-2H10a1 1 0 0 1-1-1z" />
  </svg>
);
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z" />
    </svg>
);