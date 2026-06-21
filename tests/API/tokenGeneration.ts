import { expect, APIResponse, APIRequestContext } from "@playwright/test";
import tokenGenJson from '../apiJsons/tokenGeneration.json'

export class TokenGeneration {

    apiResponse?: APIResponse
    apiRequest:APIRequestContext

    constructor(apiRequest:APIRequestContext) {
        this.apiRequest=apiRequest
    }


    async generateToken(userName: string, password: string) :Promise<string>{
        const payload: any = JSON.parse(JSON.stringify(tokenGenJson))
        payload.email = userName
        payload.password = password
        console.log((JSON.stringify(payload))+"\n")
        this.apiResponse = await this.apiRequest.post('/api/auth/login', {
            data: payload
            
        });
        const responseBody = await this.apiResponse.json()
        console.log(responseBody)
        expect(await this.apiResponse.ok()).toBeTruthy();
        console.info(responseBody);
        return responseBody.token

    }
}