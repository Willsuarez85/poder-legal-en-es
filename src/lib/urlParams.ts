// URL parameters capture and preservation utility
export class URLParams {
  private static readonly PARAMS_KEY = 'url_params';
  private static readonly EXPIRY_KEY = 'url_params_expiry';
  private static readonly EXPIRY_DAYS = 30; // Standard attribution window

  // Parameters to capture and preserve
  private static readonly TRACKED_PARAMS = [
    'gclid',    // Google Ads Click ID
    'fbclid',   // Facebook Click ID
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];

  /**
   * Capture URL parameters from current page and store them
   */
  static captureParams(): void {
    if (typeof window === 'undefined') return;

    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const capturedParams: Record<string, string> = {};
      let hasNewParams = false;

      // Check each tracked parameter
      this.TRACKED_PARAMS.forEach(param => {
        const value = urlSearchParams.get(param);
        if (value) {
          capturedParams[param] = value;
          hasNewParams = true;
        }
      });

      // Only update storage if we have new parameters
      if (hasNewParams) {
        // Get existing parameters
        const existingParams = this.getStoredParams();
        
        // Merge with new parameters (new ones take precedence)
        const mergedParams = { ...existingParams, ...capturedParams };
        
        // Store updated parameters
        localStorage.setItem(this.PARAMS_KEY, JSON.stringify(mergedParams));
        localStorage.setItem(this.EXPIRY_KEY, (Date.now() + (this.EXPIRY_DAYS * 24 * 60 * 60 * 1000)).toString());

        if (process.env.NODE_ENV === 'development') {
          console.log('URL Params captured:', capturedParams);
          console.log('All stored params:', mergedParams);
        }
      }
    } catch (error) {
      console.error('Error capturing URL parameters:', error);
    }
  }

  /**
   * Get stored URL parameters (if not expired)
   */
  static getStoredParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    try {
      const expiry = localStorage.getItem(this.EXPIRY_KEY);
      if (!expiry || Date.now() > parseInt(expiry)) {
        // Clean up expired data
        localStorage.removeItem(this.PARAMS_KEY);
        localStorage.removeItem(this.EXPIRY_KEY);
        return {};
      }

      const params = localStorage.getItem(this.PARAMS_KEY);
      return params ? JSON.parse(params) : {};
    } catch (error) {
      console.error('Error reading stored URL parameters:', error);
      return {};
    }
  }

  /**
   * Get specific parameter value
   */
  static getParam(paramName: string): string | null {
    const params = this.getStoredParams();
    return params[paramName] || null;
  }

  /**
   * Get Google Click ID specifically
   */
  static getGCLID(): string | null {
    return this.getParam('gclid');
  }

  /**
   * Get Facebook Click ID specifically  
   */
  static getFBCLID(): string | null {
    return this.getParam('fbclid');
  }

  /**
   * Get all UTM parameters
   */
  static getUTMParams(): Record<string, string> {
    const allParams = this.getStoredParams();
    const utmParams: Record<string, string> = {};
    
    Object.keys(allParams).forEach(key => {
      if (key.startsWith('utm_')) {
        utmParams[key] = allParams[key];
      }
    });

    return utmParams;
  }

  /**
   * Clear all stored parameters
   */
  static clearParams(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.PARAMS_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  /**
   * Debug function to log all current parameters
   */
  static debugParams(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('=== URL Params Debug ===');
      console.log('Current URL:', window.location.href);
      console.log('Stored params:', this.getStoredParams());
      console.log('GCLID:', this.getGCLID());
      console.log('FBCLID:', this.getFBCLID());
      console.log('UTM params:', this.getUTMParams());
      console.log('========================');
    }
  }
}