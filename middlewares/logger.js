/* eslint-disable implicit-arrow-linebreak */
import { createLogger, transports, format } from 'winston';

const { combine, timestamp, printf } = format;

const customFormat = format.combine(
  timestamp(),
  printf(
    (info) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      `${info.level}: ${[info.timestamp]} ${info.message}`
  )
);

const fileTransports = [
  new transports.File({ filename: 'error.log', level: 'error' }),
  new transports.File({ filename: 'combined.log' }),
];

const consoleTransports = new transports.Console();

const exceptionTransports = [
  new transports.File({ filename: 'exceptions.log' }),
];

const rejectionTransports = [
  new transports.File({ filename: 'rejections.log' }),
];

const logger = createLogger({
  format: customFormat,
  transports: fileTransports,
  exceptionHandlers: exceptionTransports,
  rejectionHandlers: rejectionTransports,
});

const isDevEnv = process.env.NODE_ENV !== 'production';

if (isDevEnv) {
  logger.add(consoleTransports);
}

const getRequestLogFormatter = () =>
  combine(
    timestamp(),
    printf((info) => {
      const { req } = info.message;
      return `${info.level}: ${info.timestamp} ${req.method} ${req.hostname}${
        req.port || ''
      }${req.originalUrl} body:${JSON.stringify(
        req.body
      )} params:${JSON.stringify(req.params)}`;
    })
  );

const createRequestLogger = () => {
  const requestFormat = getRequestLogFormatter();
  const requestLogger = createLogger({
    format: requestFormat,
    transports: fileTransports,
  });
  if (isDevEnv) {
    requestLogger.add(consoleTransports);
  }
  return (req, res, next) => {
    requestLogger.info({ req, res });
    next();
  };
};

const getErrorFormat = () =>
  combine(
    timestamp(),
    printf((info) => {
      const { req, err } = info.message;
      return `${info.level}: ${info.timestamp} ${req.method} ${req.hostname}${
        req.port || ''
      }${req.originalUrl} body:${JSON.stringify(
        req.body
      )} params:${JSON.stringify(req.params)} error-message:${
        err.message
      } error:${JSON.stringify(err)}`;
    })
  );

const createErrorLogger = () => {
  const errLogger = createLogger({
    level: 'error',
    format: getErrorFormat(),
    transports: fileTransports,
  });
  if (isDevEnv) {
    errLogger.add(consoleTransports);
  }
  return (err, req, res, next) => {
    errLogger.error({ err, req, res });
    next();
  };
};
export const logRequest = createRequestLogger();
export const logError = createErrorLogger();
export { logger };
