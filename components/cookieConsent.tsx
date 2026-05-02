'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('cookie-consent', 'dismissed');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between gap-4 z-50">
      <p className="text-sm flex-1">
        We gebruiken cookies om uw ervaring te verbeteren. Door de website te gebruiken, gaat u akkoord met ons cookiebeleid.
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors"
        >
          Accepteren
        </button>
        <button
          onClick={handleDismiss}
          className="p-2 hover:bg-gray-800 rounded transition-colors"
          aria-label="Sluiten"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
