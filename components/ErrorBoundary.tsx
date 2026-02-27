import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gold/20 max-w-md w-full">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-8">
              We encountered an unexpected issue. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-bold"
            >
              <RefreshCcw size={18} />
              Reload Application
            </button>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 p-4 bg-gray-100 rounded text-left overflow-auto max-h-40 text-xs text-red-800 font-mono">
                {this.state.error.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}