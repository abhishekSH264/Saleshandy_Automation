const { defineConfig } = require("cypress");
const mysql = require('mysql2/promise');
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    // overwrite: true,
    html: true,
    json: true,
    charts: true,
    printLogsToConsole: "always", // Always print logs to the terminal
    printLogsToFile: "always",    // Include logs in the HTML report
    outputRoot: "cypress/logs",   // Save log files
    outputTarget: {
      "cypress/logs/output.log": "txt",
      "cypress/reports/output.json": "json",
    },
  },
  e2e: {
    baseUrl: "https://pyxis.lifeisgoodforlearner.com", //Disable this one before pushing the code to Git

    //baseUrl: "https://my.saleshandy.com/", //Enable this one before pushing code to Git
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      installLogsPrinter(on); // Ensure logs are captured

      on('task', {
        // Custom task for database queries
        async queryDatabase({ query, params }) {
          const connection = await mysql.createConnection({
            host: 'mysql-reader.saleshandy.pyxis',
            port: 3306,
            user: 'dev_admin',
            password: 'Reset@123',
            database: 'pyxis',
          });

          try {
            const [rows] = await connection.execute(query, params);
            await connection.end();
            return rows;
          } catch (error) {
            await connection.end();
            throw error;
          }
        },

        // Log task to print messages to the terminal
        log(message) {
          console.log(message); // Log to terminal
          return null;
        },
      });

      return config;      
    },
  },
});

