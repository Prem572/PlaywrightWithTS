import {Locator, Page, expect} from '@playwright/test';

export class HomePage{
    page:Page;
    eventPageLink:Locator;

    constructor(page:Page){
        this.page = page;
        this.eventPageLink = page.getByTestId('nav-events')
    }

    async navigateToEventPage(){
        await this.eventPageLink.click();
    }
}