import type React from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ onClose, title, description, content, footer }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Title */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            {title && <div className="mb-2">{title}</div>}
            {description && <div className="text-sm text-gray-600">{description}</div>}
          </div>
        )}

        {/* Content */}
        {content && <div className="px-6 py-4 flex-1 overflow-y-auto">{content}</div>}

        {/* Footer */}
        {footer && <div className="px-6 py-4 border-t border-gray-200">{footer}</div>}
      </div>
    </div>
  );
};
