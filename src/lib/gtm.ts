// Google Tag Manager event tracking utility
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export class GTM {
  private static isEnabled(): boolean {
    return typeof window !== 'undefined' && Array.isArray(window.dataLayer);
  }

  private static pushEvent(eventData: Record<string, any>): void {
    if (!this.isEnabled()) {
      console.warn('GTM: dataLayer not available');
      return;
    }

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('GTM Event:', eventData);
      }
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  }

  // Page view event
  static trackPageView(pagePath?: string): void {
    this.pushEvent({
      event: 'page_view',
      page_path: pagePath || window.location.pathname,
      page_title: document.title
    });
  }

  // Add to cart event
  static trackAddToCart(data: {
    value: number;
    currency: string;
    item_name?: string;
    item_id?: string;
  }): void {
    this.pushEvent({
      event: 'add_to_cart',
      value: data.value,
      currency: data.currency,
      item_name: data.item_name,
      item_id: data.item_id
    });
  }

  // Purchase success event
  static trackPurchase(data: {
    value: number;
    currency: string;
    transaction_id?: string;
    items?: any[];
  }): void {
    this.pushEvent({
      event: 'purchase_success',
      value: data.value,
      currency: data.currency,
      transaction_id: data.transaction_id,
      items: data.items
    });
  }

  // Signup/Lead success event
  static trackSignup(data?: {
    method?: string;
    value?: number;
    currency?: string;
  }): void {
    this.pushEvent({
      event: 'signup_success',
      method: data?.method || 'form',
      value: data?.value,
      currency: data?.currency
    });
  }

  // Generic custom event
  static trackCustomEvent(eventName: string, data: Record<string, any> = {}): void {
    this.pushEvent({
      event: eventName,
      ...data
    });
  }
}