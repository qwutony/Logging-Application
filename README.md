# Logging-Application

This is a logging application for violations of content security policies. You can start the application by using:

```shell
node app.js
```

**Classification of severity**
This application classifies security violations as severe, important and unknown. 

Currently, the severe category only includes violations of the 'script-src' policy, where arbitrary scripts from a different source may be executed on the web application.

The important category only has the 'style-src' policy, which specifies the valid source of stylesheets (CSS). 

For other report-types, the unknown category is used.

The application uses the severe category for issues that are determined to be really problematic, and should be addressed immediately. Important is used where the issue is not urgent, but needs to be manually looked into to determine and fix the issue. Unknown category means that the content security policy is not programmed into the application, and so independent evaluation is necessary.