import { getLogger } from '@utils/logger';
import winston from 'winston';

enum ErrorType {
  openapi,
  auth,
  'server-error',
  application,
}

export function errorHandler() {
  const logger = getLogger('error-handler');

  return (err, req, res, next) => {
    let statusResponse = null;

    const errorResponse = {
      status: err.status,
      type: null,
      message: err.message || 'Unknown error',
    };

    switch (err.status) {
      case 400:
        statusResponse = 400;
        errorResponse.type = ErrorType[ErrorType.openapi];
        break;
      case 401:
        statusResponse = 401;
        errorResponse.type = ErrorType[ErrorType.auth];
        break;
      case 500:
      default:
        statusResponse = 500;
        errorResponse.type = ErrorType[ErrorType['server-error']];

        // openapi validation error
        if (err.errors) {
          errorResponse.type = 'openapi';
          errorResponse.message =
            'Server response not conforming with the API contract';

          errorResponse['errors'] = err.errors.map((err) => {
            const error = {
              message: `${err.path}: ${err.message}`,
            };
            if (err.errorCode) {
              error['code'] = err.errorCode;
            }
            return error;
          });
        }
        break;
    }

    if (
      errorResponse.type === ErrorType[ErrorType['server-error']] ||
      errorResponse.type === ErrorType[ErrorType.application]
    ) {
      logger.error(
        `Server error: ${statusResponse}: ${JSON.stringify(errorResponse)}`
      );
      console.error(err);
    } else {
      const errorType =
        errorResponse.type.charAt(0).toUpperCase() +
        errorResponse.type.slice(1);
      logger.warn(
        `${errorType} error: ${statusResponse}: ${JSON.stringify(
          errorResponse
        )}`
      );
    }

    res.status(statusResponse).json(errorResponse);
  };
}
