interface PdfLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (language: 'en' | 'fr') => void;
}

export function PdfLanguageModal({ isOpen, onClose, onLanguageSelect }: PdfLanguageModalProps) {

  if (!isOpen) return null;

  const handleLanguageSelect = (language: 'en' | 'fr') => {
    onLanguageSelect(language);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-primary/30 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Choose CV Language
        </h2>
        <p className="text-foreground/70 mb-6">
          Select the language for your PDF CV export.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleLanguageSelect('en')}
            className="w-full py-3 px-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <span className="text-lg">🇬🇧</span>
            <span className="font-medium">English</span>
          </button>
          
          <button
            onClick={() => handleLanguageSelect('fr')}
            className="w-full py-3 px-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <span className="text-lg">🇫🇷</span>
            <span className="font-medium">Français</span>
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-primary/20">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 text-foreground/70 hover:text-foreground transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}