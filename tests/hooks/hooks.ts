import { Before, After } from '@cucumber/cucumber';
import { chromium,request,APIRequest, _baseTest } from '@playwright/test';

 const env = process.env.ENV || 'QA'; 
  
  // 2. Select the URL based on user choice
  

After(async function() {
  if (this.browser) {
    await this.browser.close();
  }
      
  
});

Before(async function() {
  const urlMap: { [key: string]: string } = {
    API: process.env.API_URL || 'https://api.eventhub.rahulshettyacademy.com',
    UI: process.env.UI_URL || 'https://eventhub.rahulshettyacademy.com'
  };

  this.baseUrl = urlMap[env] || urlMap.UI;
  const browser = await chromium.launch({ headless: false });
  this.browser = browser;
  this.page = await browser.newPage();
  await this.page.goto(this.baseUrl+ "/login");

  this.apiRequest = await request.newContext({baseURL:urlMap.API})
});