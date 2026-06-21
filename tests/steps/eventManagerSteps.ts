import{ Given, When , Then,DataTable } from '@cucumber/cucumber';
import {LoginPage} from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import {EventsPage} from '../pages/eventsPage'
import { setDefaultTimeout } from '@cucumber/cucumber';
import { dataTableToMapConverter } from '../hooks/dataTableToMapConverter';

setDefaultTimeout(10 * 1000);


Given('User login to app with username {string} and password {string}', async function (username:string, password:string) {  
   this.loginPage = new LoginPage(this.page);
   await this.loginPage.login(username, password);
});

When('User navigates to the event creation page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigateToEventPage();
});

When('I Create an event with following details:',async function (dataTable:DataTable) {
    
    const configMap = dataTableToMapConverter(dataTable);
  this.eventsPage = new EventsPage(this.page);
  await this.eventsPage.clickOnAddNewEventButton();
  await this.eventsPage.createEvent(configMap);
//   console.log(configMap);
});

Then('Event should be created successfully', async function () {
    await this.eventsPage.verifyEventSuccessMessage();
});

When('I verify that event is listed in the events table',async function () {
    await this.eventsPage.verifyEventInTable();
    // await this.page.screenshot({path:'screenshots/eventInTable.png', fullPage:true});
});

When('I delete the created event',async function(){
    await this.eventsPage.deleteEvent();
})

Then('I verify that event is deleted from the events table',async function () {
    await this.eventsPage.verifyEventDeletion();
});

When('I navigate to Events List page',async function(){
    await this.eventsPage.clickOnAddNewEventButton();
})