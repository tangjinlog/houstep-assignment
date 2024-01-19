import React, { Component } from 'react';
import { AuthError, UnknownError } from './Errors';

type ErrorBoundaryProps = {
	children?: React.ReactNode;
};
type ErrorBoundaryState = {
	shouldHandleError: boolean;
	shouldRethrow: boolean;
	error: Error | null;
};

export class ApiErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state = {
		shouldHandleError: false,
		shouldRethrow: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		if (error.message === 'Error that cannot be handled here') {
			return {
				shouldHandleError: false,
				shouldRethrow: true,
				error,
			};
		}
		return {
			shouldHandleError: true,
			shouldRethrow: false,
			error,
		};
	}
	onClickRetry() {
		this.setState({ shouldHandleError: false });
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.errorLogging(error, errorInfo);
	}

	errorLogging(error: Error, errorInfo: React.ErrorInfo) {
		console.log(`error: ${error}, info: ${JSON.stringify(errorInfo)}`);
	}

	render() {
		const error = this.state.error;
		const statusCode = error && error['response']['status'];

		if (this.state.shouldRethrow) {
			throw this.state.error;
		}
		if (!this.state.shouldHandleError) {
			return this.props.children;
		}
		if (statusCode === 403) {
			return <AuthError />;
		}

		return <UnknownError onClickRetry={() => this.onClickRetry()} />;
	}
}

export class GlobalErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state = {
		shouldHandleError: false,
		shouldRethrow: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		return {
			shouldHandleError: true,
			shouldRethrow: false,
		};
	}

	onClickRetry() {
		this.setState({ shouldHandleError: false });
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.errorLogging(error, errorInfo);
	}
	errorLogging(error: Error, errorInfo: React.ErrorInfo) {
		console.log(`error: ${error}, info: ${JSON.stringify(errorInfo)}`);
	}
	render() {
		if (!this.state.shouldHandleError) {
			return this.props.children;
		}

		return <UnknownError onClickRetry={() => this.onClickRetry()} />;
	}
}
