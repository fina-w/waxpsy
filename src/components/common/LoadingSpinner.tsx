interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-transparent`}
        role="status"
      >
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  );
};

export const LoadingPage = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);
