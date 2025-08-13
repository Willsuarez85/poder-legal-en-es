/**
 * Helper function to safely convert any value to a string for React rendering
 * Prevents "Objects are not valid as a React child" errors
 */
export const safeText = (value: any, depth: number = 0): string => {
  // Prevent infinite recursion
  if (depth > 5) {
    console.warn('safeText: Maximum depth reached, returning fallback');
    return '[Complex Object]';
  }
  
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    return value.map(item => safeText(item, depth + 1)).join(', ');
  }
  
  if (typeof value === 'object') {
    try {
      // Handle specific object structures that cause the error
      if (value.hasOwnProperty('not_for') && value.hasOwnProperty('purpose')) {
        console.log('safeText: Processing not_for/purpose object:', value);
        const purpose = safeText(value.purpose, depth + 1);
        const notFor = safeText(value.not_for, depth + 1);
        const result = purpose || notFor || '[Purpose/Not For Object]';
        console.log('safeText: Converted not_for/purpose to:', result);
        return result;
      }
      
      // Handle translation objects (common pattern in this app)
      if (value.es || value.en) {
        return safeText(value.es || value.en, depth + 1);
      }
      
      // Handle objects with common text properties
      if (value.text) {
        return safeText(value.text, depth + 1);
      }
      
      if (value.name) {
        return safeText(value.name, depth + 1);
      }
      
      if (value.title) {
        return safeText(value.title, depth + 1);
      }
      
      // For other objects, try to extract meaningful text from values
      const values = Object.values(value).filter(v => v != null);
      if (values.length === 0) return '';
      
      const textValues = values
        .map(v => safeText(v, depth + 1))
        .filter(text => text && text.trim() !== '')
        .slice(0, 3); // Limit to first 3 meaningful values
      
      return textValues.join(' - ') || JSON.stringify(value).substring(0, 50) + '...';
    } catch (error) {
      console.error('safeText: Error processing object:', error, value);
      // Last resort: try to stringify the object
      try {
        return JSON.stringify(value).substring(0, 50) + '...';
      } catch (stringifyError) {
        console.error('safeText: Could not stringify object:', stringifyError);
        return '[Unparseable Object]';
      }
    }
  }
  
  // Fallback for any other types
  try {
    return String(value);
  } catch (error) {
    console.error('safeText: Could not convert value to string:', error, value);
    return '[Error Converting Value]';
  }
};

/**
 * Helper specifically for product names - handles common translation patterns
 */
export const getProductName = (name: any): string => {
  return safeText(name) || "Producto";
};

/**
 * Helper specifically for product descriptions - handles common translation patterns
 */
export const getProductDescription = (description: any): string => {
  return safeText(description);
};