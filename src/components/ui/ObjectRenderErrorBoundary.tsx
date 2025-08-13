import React, { Component, ErrorInfo, ReactNode } from 'react';
import { safeText } from '@/lib/safeText';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ObjectRenderErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if this is the specific "Objects are not valid as a React child" error
    if (error.message.includes('Objects are not valid as a React child')) {
      console.error('ObjectRenderErrorBoundary caught object rendering error:', error);
      return { hasError: true, error };
    }
    
    // Let other errors bubble up
    throw error;
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error.message.includes('Objects are not valid as a React child')) {
      console.error('Object rendering error details:', {
        error: error.message,
        componentStack: errorInfo.componentStack,
        errorStack: error.stack
      });
      
      // Try to identify the problematic object
      const match = error.message.match(/found: object with keys \{([^}]+)\}/);
      if (match) {
        console.error('Problematic object keys:', match[1]);
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/10">
          <p className="text-sm text-destructive">
            Error: Se detectó un objeto no válido para renderizar. 
            Por favor reporta este error.
          </p>
          <details className="mt-2">
            <summary className="text-xs cursor-pointer">Detalles técnicos</summary>
            <pre className="text-xs mt-1 overflow-auto">
              {this.state.error?.message}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component to wrap any component that might render objects
export const withObjectSafety = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => (
    <ObjectRenderErrorBoundary>
      <WrappedComponent {...props} />
    </ObjectRenderErrorBoundary>
  );
};

// Safe text renderer component for direct use in JSX
export const SafeText: React.FC<{ value: any; fallback?: string }> = ({ 
  value, 
  fallback = '' 
}) => {
  try {
    const safeValue = safeText(value) || fallback;
    return <>{safeValue}</>;
  } catch (error) {
    console.error('SafeText component error:', error, 'Value:', value);
    return <>{fallback}</>;
  }
};