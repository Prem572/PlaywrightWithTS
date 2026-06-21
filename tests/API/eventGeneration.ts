import { APIRequestContext, expect, APIResponse } from "@playwright/test"
import { readFileSync } from "fs"
import { json } from "stream/consumers"


export class EventGeneration {

    apiRequest: APIRequestContext
    apiResponse?: APIResponse
    constructor(apiRequest: APIRequestContext) {
        this.apiRequest = apiRequest
    }

    async addEvent(dataTable:Map<string,any>,token:string):Promise<string> {

        // const jsonObject : Record<string,any> ={}
        // jsonObject.title =  dataTable.get("title") + Date.now()
        // jsonObject.totalSeats = parseInt(dataTable.get('totalSeats'))

        const eventName = dataTable.get("title") + Date.now()
        const eventPayload = {
            title: eventName,
            totalSeats: parseInt(dataTable.get('price')),
            price: parseInt(dataTable.get('totalSeats')),
            eventDate: dataTable.get('eventDate'),
            description: dataTable.get('description'),
            category: dataTable.get('category'),
            venue: dataTable.get('venue'),
            city: dataTable.get('city')
        }
        
        console.info(eventPayload +"\n"+token)
        this.apiResponse = await this.apiRequest.post('/api/events',{
            data: eventPayload,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        console.info(JSON.stringify(await this.apiResponse.json()))
        expect(await this.apiResponse?.ok()).toBeTruthy();
        return eventName;

    }

}