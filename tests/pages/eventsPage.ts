import {Page,expect,Locator} from '@playwright/test';

export class EventsPage {

    page:Page;
    eventPageHeader:Locator;
    addNewEventButton:Locator;
    eventTitleInput:Locator;
    categoryDropdown:Locator;
    cityInput:Locator;
    venueInput:Locator;
    dateTimeInput:Locator;
    priceInput:Locator
    totalSeats:Locator;
    addEventSubmitButton:Locator;
    eventSuccessMessage:Locator;
    eventTableRow:Locator;
    eventName:string="";

    constructor(page:Page) {
        this.page = page;
        this.eventPageHeader = page.getByRole('heading', { name: 'Upcoming Events' });
        this.addNewEventButton = page.getByRole('button', { name: 'Add New Event' });
        this.eventTitleInput = page.locator('#event-title-input');
        this.categoryDropdown = page.locator('#category');
        this.cityInput = page.locator('#city');
        this.venueInput = page.locator('#venue');
        this.dateTimeInput = page.locator('[id*="event-date"]');
        this.priceInput = page.getByLabel('Price ($)');
        this.totalSeats = page.locator('#total-seats');
        this.addEventSubmitButton = page.locator('text=Add Event');
        this.eventSuccessMessage = page.locator('text=Event created!');
        this.eventTableRow = page.locator('table tr')
        
    }

    async setEventName(eventName:string){
        this.eventName=eventName;

    }

    async createEvent(data:Map<string,string>) {
        this.eventName = data.get('EventName')+Date.now().toString() || '';
        const time : string = data.get('EventDate') +"T" + '10:30';
        console.log("Event Name is"+this.eventName +" and time is "+time);
        await this.eventTitleInput.fill(this.eventName);
        await this.categoryDropdown.selectOption(data.get('Category') || '');
        await this.cityInput.fill(data.get('City') || '');
        await this.venueInput.fill(data.get('Venue') || '');
        await this.dateTimeInput.fill(time);
        await this.priceInput.fill(data.get('Price') || '');
        await this.totalSeats.fill(data.get('Seats') || '');
        await this.addEventSubmitButton.click();
    }

    async clickOnAddNewEventButton(){
        await this.addNewEventButton.click();
    }
    async verifyEventSuccessMessage(){
        await expect(this.eventSuccessMessage).toBeVisible();
    }
    
    async verifyEventInTable(){
        console.info('Searching for event '+this.eventName)
        await expect(this.eventTableRow.filter({ hasText: this.eventName })).toBeVisible();
    }

    async deleteEvent(){
        await this.eventTableRow.filter({ hasText: this.eventName }).getByRole('button',{name:'Delete'}).click();
        await this.page.getByRole('button', { name: 'Delete event' }).click();
        await expect(this.page.locator('text=Event deleted')).toBeVisible();
    }

    async verifyEventDeletion(){
        console.info("Deleting the event "+ this.eventName)
        await expect(this.eventTableRow.filter({ hasText: this.eventName })).not.toBeVisible();
    }
}