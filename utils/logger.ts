/**
 * Centralized Logger for Telemetry and Error Reporting
 * Replaces unstructured console.logs with a scalable service boundary.
 */

type LogLevel = 'info' | 'warn' | 'error';

class Logger {
    private formatMessage(level: LogLevel, message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const dataStr = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
    }

    info(message: string, data?: any) {
        if (import.meta.env.DEV) {
            console.log(this.formatMessage('info', message, data));
        }
    }

    warn(message: string, data?: any) {
        console.warn(this.formatMessage('warn', message, data));
        // TODO: Send to telemetry service (e.g. Sentry/Datadog) in Production
    }

    error(message: string, error?: unknown, data?: any) {
        console.error(this.formatMessage('error', message, data));
        if (error) {
            console.error(error);
        }
        // TODO: Send to telemetry service (e.g. Sentry/Datadog) in Production
        // Example: Sentry.captureException(error, { extra: data });
    }
}

export const logger = new Logger();
