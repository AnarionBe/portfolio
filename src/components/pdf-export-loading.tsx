interface PdfExportLoadingProps {
  isVisible: boolean;
}

export function PdfExportLoading({ isVisible }: PdfExportLoadingProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-primary/30 rounded-lg shadow-xl max-w-sm w-full p-6 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Generating PDF...
        </h3>
        <p className="text-foreground/70 text-center">
          Please wait while we create your professional CV.
        </p>
      </div>
    </div>
  );
}