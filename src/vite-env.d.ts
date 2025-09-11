/// <reference types="vite/client" />

// Meta Pixel and GTM global declarations
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
    dataLayer: any[];
  }
}
