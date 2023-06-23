const { Given, When, Then } = require('cucumber');
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

process.env['webdriver.chrome.driver'] = 'C:\\Users\\QA-User103\\Desktop\\traductor\\node_modules\\chromedriver\\lib\\chromedriver\\chromedriver.exe';

let driver;

Given('que abro el navegador Google Chrome', async function () {
  driver = new Builder().forBrowser('chrome').build();
});

Given('accedo a las Google Apps', async function () {
  await driver.get('https://www.google.com/');
  // await driver.findElement(By.css('a[data-pid="23"]')).click(); 
  await driver.findElement (By.className('gb_h')).click();
});

When('hago clic en el icono del Traductor', async function () {
  await driver.findElement(By.css('a[title="Traductor"]')).click(); 
});

When('selecciono el idioma {string} en el campo de origen', async function (idioma) {
  await driver.findElement(By.className('VfPpkd-YVzG2b')).click(); 

});
When('ingreso la palabra {string} en el campo de texto', async function (palabra) {
  await driver.findElement(By.css('#source')).sendKeys(palabra);
});

When('hago clic en el botón de traducción', async function () {
  await driver.findElement(By.css('#gt-submit')).click();
});

Then('se muestra la traducción en la pantalla', async function () {
  await driver.wait(until.elementLocated(By.css('#gt-res-dir-ctr > div > div > div > div > span')), 5000);
  const translation = await driver.findElement(By.css('#gt-res-dir-ctr > div > div > div > div > span')).getText();
  console.log('Traducción:', translation);
});

Then('se almacena la traducción en el archivo {string}', async function (filename) {
  const translationElement = await driver.findElement(By.css('#gt-res-dir-ctr > div > div > div > div > span'));
  const translation = await translationElement.getText();
  fs.writeFileSync(filename, translation);
});

