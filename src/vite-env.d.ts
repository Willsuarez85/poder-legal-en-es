/// <reference types="vite/client" />

// Meta Pixel global declarations
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}
