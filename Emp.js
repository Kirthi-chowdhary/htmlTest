const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Replace 'http://example.com' with the URL of the HTML page you want to convert
  await page.goto('https://www.geeksforgeeks.org/introduction-to-express/');

  // Adjust the dimensions of the PDF page if needed
  const pdf = await page.pdf({
    path: 'result2.pdf', // Change the output file name and path as desired
    format: 'A4',      // Page format, e.g., 'A4', 'Letter', etc.
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px',
    },
    landscape: true
  });

  await browser.close();
})();
