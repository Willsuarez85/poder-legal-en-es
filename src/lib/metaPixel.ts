// Meta Pixel utility functions
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

export interface MetaPixelEventData {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
  num_items?: number;
  search_string?: string;
  status?: string;
}

export class MetaPixel {
  private static isInitialized(): boolean {
    return typeof window !== 'undefined' && typeof window.fbq === 'function';
  }

  private static logEvent(event: string, data?: MetaPixelEventData) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Meta Pixel] ${event}:`, data);
    }
  }

  /**
   * Track a page view
   */
  static trackPageView() {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('PageView');
    window.fbq('track', 'PageView');
  }

  /**
   * Track a purchase event
   */
  static trackPurchase(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('Purchase', data);
    window.fbq('track', 'Purchase', {
      value: data.value,
      currency: data.currency || 'USD',
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      content_name: data.content_name,
      content_category: data.content_category,
      num_items: data.num_items
    });
  }

  /**
   * Track when items are added to cart
   */
  static trackAddToCart(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('AddToCart', data);
    window.fbq('track', 'AddToCart', {
      value: data.value,
      currency: data.currency || 'USD',
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      content_name: data.content_name,
      content_category: data.content_category
    });
  }

  /**
   * Track when checkout is initiated
   */
  static trackInitiateCheckout(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('InitiateCheckout', data);
    window.fbq('track', 'InitiateCheckout', {
      value: data.value,
      currency: data.currency || 'USD',
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      content_name: data.content_name,
      content_category: data.content_category,
      num_items: data.num_items
    });
  }

  /**
   * Track lead generation
   */
  static trackLead(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('Lead', data);
    window.fbq('track', 'Lead', {
      value: data.value,
      currency: data.currency || 'USD',
      content_name: data.content_name,
      content_category: data.content_category,
      status: data.status
    });
  }

  /**
   * Track custom events
   */
  static trackCustom(eventName: string, data?: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent(eventName, data);
    window.fbq('track', eventName, data);
  }

  /**
   * Track when user views a product
   */
  static trackViewContent(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('ViewContent', data);
    window.fbq('track', 'ViewContent', {
      value: data.value,
      currency: data.currency || 'USD',
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      content_name: data.content_name,
      content_category: data.content_category
    });
  }

  /**
   * Track search events
   */
  static trackSearch(data: MetaPixelEventData) {
    if (!this.isInitialized()) {
      console.warn('Meta Pixel not initialized');
      return;
    }

    this.logEvent('Search', data);
    window.fbq('track', 'Search', {
      search_string: data.search_string,
      content_category: data.content_category
    });
  }
}
