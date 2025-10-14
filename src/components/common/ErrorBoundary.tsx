import type { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Oups ! Une erreur est survenue
          </h2>
          <p className="mb-4 text-gray-600">
            Nous nous excusons pour la gêne occasionnée. Veuillez réessayer plus tard.
          </p>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Recharger la page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 max-w-lg overflow-auto rounded bg-gray-100 p-4 text-left">
              <summary className="cursor-pointer font-medium text-gray-700">
                Détails de l'erreur (développement)
              </summary>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-red-600">
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
