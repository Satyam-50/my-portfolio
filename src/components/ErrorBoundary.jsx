import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[color:var(--surface-base)] text-[var(--text-primary)]">
          <div className="glass-card mx-4 max-w-lg p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="mb-6 text-[var(--text-muted)]">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="cta-btn cta-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
