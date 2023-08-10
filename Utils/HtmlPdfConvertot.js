const { chromium } = require('playwright');

exports.HTMLPDF = async(url, outputFileName) =>{
    if (!url || !outputFileName) {
        throw new Error('Invalid request data');
      }
    
      try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
    
        await page.goto(url); // Load the provided URL
    
        const pdf = await page.pdf({
          path: outputFileName,
          format: 'A4',
          margin: {
            top: '20px',
            bottom: '20px',
            left: '20px',
            right: '20px',
          },
          landscape: true,
        });
    
        await browser.close();

        return "PDF Successfully created"
    }catch(error){
        console.log(error)
    }
}