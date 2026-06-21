import {expect,APIRequestContext,request} from '@playwright/test';
import {DataTable, Given,Then,When} from '@cucumber/cucumber';
import { TokenGeneration } from '../API/tokenGeneration';
import { EventGeneration } from '../API/eventGeneration';
import { EventsPage } from '../pages/eventsPage';

import { dataTableToMapConverter } from '../hooks/dataTableToMapConverter';

Given('User Generate APi token for {string} and Password {string}',async function (userName:string, password:string) {
    this.tokenGen = new TokenGeneration(this.apiRequest);
    this.tokenValue = await this.tokenGen.generateToken(userName,password);
    
});


When('I Create an event using API with following details:',async function(dataTable:DataTable){
    
    const configMap = dataTableToMapConverter(dataTable);
    this.eventGenerator = new EventGeneration(this.apiRequest)
    const eventName = await this.eventGenerator.addEvent(configMap,this.tokenValue)
     this.eventsPage = new EventsPage(this.page);
     this.eventsPage.setEventName(eventName)
});


