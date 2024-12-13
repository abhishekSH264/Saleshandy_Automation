describe('Database Connection Test', () => {
  it('Fetch data from MySQL database', () => {
    const query = 'SELECT * FROM plan LIMIT 10 OFFSET 20'; // SQL query
    const params = []; // No parameters needed for this query

    // Use the `cy.task` to query the database
    cy.task('queryDatabase', { query, params }).then((result) => {
      // Log the result to the Cypress Test Runner
      cy.log('Query Result:', JSON.stringify(result, null, 2));

      // Use a custom task to log in the terminal
      cy.task('log', `Query Result: ${JSON.stringify(result, null, 2)}`);

      // Log the result to the browser console (for debugging)
      console.log('Query Result:', result);

      // Validate the result
      expect(result).to.have.length.greaterThan(0);
    });
  });
});

  