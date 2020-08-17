import winston from 'winston';

let rootLogger: winston.Logger = null;

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.metadata({
    fillExcept: ['message', 'level', 'timestamp', 'label'],
  }),
  winston.format.printf((info) => {
    let service = info.metadata.service ?? 'main';
    service = service.padEnd(20, ' ');

    let out = `${info.timestamp} [${service}] ${info.level}: ${info.message}`;
    if (info.metadata.error) {
      out = out + ' ' + info.metadata.error;
      if (info.metadata.error.stack) {
        out = out + ' ' + info.metadata.error.stack;
      }
    }
    return out;
  })
);

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), logFormat),
});

export function getLogger(id?: string): winston.Logger {
  if (!rootLogger) {
    rootLogger = winston.createLogger({
      // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      level: 'debug',
      transports: [consoleTransport],
      exceptionHandlers: [
        consoleTransport,
        // new transports.File({ filename: 'exceptions.log' })
      ],
    });
  }

  if (id) {
    return rootLogger.child({ service: id });
  } else {
    return rootLogger;
  }
}
