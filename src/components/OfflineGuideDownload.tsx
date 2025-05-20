
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineGuideDownloadProps {
  variant?: 'default' | 'subtle' | 'minimal';
  className?: string;
}

const OfflineGuideDownload: React.FC<OfflineGuideDownloadProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // Create a download link for the guide
    const link = document.createElement("a");
    link.href = "/documents/whisper-field-guide.zip";
    link.download = "Whisper_Field_Guide.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "The Whisper Field Guide is being downloaded to your device.",
    });
  };
  
  if (variant === 'minimal') {
    return (
      <button
        onClick={handleDownload}
        className={`text-sm text-gray-500 hover:text-[var(--color-accent)] underline ${className}`}
      >
        Download Offline Guide
      </button>
    );
  }
  
  if (variant === 'subtle') {
    return (
      <button 
        onClick={handleDownload}
        className={`flex items-center gap-2 text-gray-600 hover:text-[var(--color-accent)] py-2 px-3 rounded-md hover:bg-black/10 transition-colors ${className}`}
      >
        <Download className="w-4 h-4" />
        <span>Whisper Field Guide</span>
      </button>
    );
  }
  
  return (
    <Button
      onClick={handleDownload}
      className={`bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2 ${className}`}
    >
      <Download className="w-5 h-5" />
      <span>Download Whisper Field Guide</span>
    </Button>
  );
};

export default OfflineGuideDownload;
