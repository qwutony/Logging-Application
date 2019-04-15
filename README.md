# Logging-Application

This is a logging application for violation of content security policies.

This application requires another web application to send security reports to the logging application, which will then allow it to parse and transform the reports into a simple and easily-readable format.

Currently, the application can detect style-src and script-src, but is capable of adding more policies to tailor to your own needs.

This is a work in progress, and it is currently have minimal features.

**Installation Instructions**

To make a copy of the application on *nix, use:

```shell
git clone https://github.com/qwutony/Logging-Application.git
```

Afterwards, enter the folder and depending on whether you wish to use the application in development or production mode, do:

```shell
npm install --production # for production

# OR

npm install --save-dev # for development
```

For developers: to run a series of tests to ensure that the application is working as intended, after installing all the dependencies, do:

```shell
npm test
```

You can start the application by using:

```shell
node app.js
```

and navigating to localhost:3000.

**Third-party dependencies**

The logging application currently has three dependencies -- *body-parser* and *express* for data-to-object parsing and routing, and *winston* as a logging framework. 

The developers also require *jest*, which is a testing framework for Javascript. 

These dependencies are in addition to *node*, which acts as the server.

For more information see the links below:

```
Node: https://nodejs.org/en/about/

Body-parser: https://www.npmjs.com/package/body-parser
Express.js: https://expressjs.com/en/guide/routing.html
Winston: https://www.npmjs.com/package/winston

Jest: https://jestjs.io/
```

**Classification of severity**

This application classifies security violations as severe, important and unknown. 

Currently, the severe category only includes violations of the 'script-src' policy, where arbitrary scripts from a different source may be executed on the web application.

The important category only has the 'style-src' policy, which specifies the valid source of stylesheets (CSS). 

For other report-types, the unknown category is used.

The application uses the severe category for issues that are determined to be really problematic, and should be addressed immediately. Important is used where the issue is not urgent, but needs to be manually looked into to determine and fix the issue. Unknown category means that the content security policy is not programmed into the application, and so independent evaluation is necessary.

