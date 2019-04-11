/* REQUIREMENT SECTION */

// External APIs
const express = require('express');
const winston = require('winston'); // logging framework
const bodyParser = require('body-parser');
const path = require('path'); // simplifies file paths, core module, so doesn't need to be npm installed
const fs = require('fs');

const app = express();

// Internal APIs
const Queue = require('./queue');
const checkFilesize = require('./check-filesize-process');

const levels = {
    SEVERE: 0,
    IMPORTANT: 1,
    INFORMATION: 2
}

const myFormat = winston.format.printf((log) => {
    return `${log.severity}: ${JSON.stringify(log, null, 4)}\n--------------\n`;
});

const logger = winston.createLogger({
    level: 'UNKNOWN',
    levels: levels,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({
                  filename: 'reports.log',
                  maxsize: 10000,
                  format: myFormat,
              }),
      new winston.transports.Console({
                  format: myFormat,
              }),
    ]
  });

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/csp-report'}));
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
    // `__dirname` is the directory in which the currently executing script resides
        // using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data.js', (req, res) => {
    const object = logCache.toArray();

    res.send(`var logList = ${JSON.stringify(object)};`);
});


let unique = 1;

function createLog(report) {
    let id = unique;
    unique++;

    const violatedDirective = report["violated-directive"];

    //id, date, severity

    let severity = 'INFORMATION';
    if (violatedDirective == 'style-src') {
        severity = "IMPORTANT";
    } else if (violatedDirective == 'script-src') {
        severity = "SEVERE";
    }

    const newLog = {
        id:         id,
        severity:   severity,
        reportType: violatedDirective,
        timestamp:  new Date().getTime() / 1000,
    };

    return newLog;

}

// A cache storing the most recent 1000 events
const logCache = new Queue();

// adds a log object to the queue, oldest logs are removed and saved to file
// after queue size exceeds 1000
function queueLog(log) {

    logCache.add(log);
    while (logCache.length() > 1000) {
        const oldestLog = logCache.remove();
        //console.error('Saving old logs to a file not implemented yet!!');
        logWriteStream.write(`LOG ENTRY: ${JSON.stringify(oldestLog, null, 4)}\n--------------\n`);

    }

}

// Handles SIGINT (generated by Ctrl-C or can be manually sent using kill)
process.on('SIGINT', () => {
    console.log('Received SIGINT. Flushing logs to log file.');
    while (logCache.length() > 0) {
        const oldestLog = logCache.remove();
        logger.log(oldestLog.severity, oldestLog);
    }
    logger.end();
    logger.on('finish', () => {
        console.log('Exiting.');
        process.exit(0);
    });

});

// route
// handles post requests to any url
app.post('/*', (req, res) => {

    // this is sent by the browser formatted as a standard CSP report
    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Violation_report_syntax
    // you can also violate CSP in your browser and watch the network dev tools

    // OR ... console.log(req.body);

    checkFilesize();
    
    const report = req.body["csp-report"];

    const log = createLog(report);

    queueLog(log);

    // Ends the response process
    res.end();
});

