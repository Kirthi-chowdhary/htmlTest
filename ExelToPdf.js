const fs = require('fs');
const path = require('path')
const ExcelJS = require('exceljs');
const puppeteer = require('puppeteer');

// Load the XLSX file
async function loadExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  return workbook;
}

// Convert Excel data to HTML
function convertExcelToHtml(sheet) {
  let html = '<table>';

  sheet.eachRow((row) => {
    html += '<tr>';
    row.eachCell((cell) => {
      html += `<td>${cell.value}</td>`;
    });
    html += '</tr>';
  });

  html += '</table>';
  return html;
}

// Generate PDF from HTML using Puppeteer
async function generatePdfFromHtml(html, outputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  await page.pdf({ path: outputFilePath, format: 'A4' });

  await browser.close();
}

// Main function
async function convertExcelToPdf(inputFilePath, outputFilePath) {
  try {
    const workbook = await loadExcelFile(inputFilePath);
    const sheet = workbook.worksheets[0];
    const html = convertExcelToHtml(sheet);

    await generatePdfFromHtml(html, outputFilePath);
    console.log('PDF generated successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the conversion function
const inputFilePath = path.join('../../Downloads/Test.xlsx'); // Change this to your input file path
const outputFilePath = 'output.pdf'; // Change this to your desired output file path
convertExcelToPdf(inputFilePath, outputFilePath);
