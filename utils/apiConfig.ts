import { request } from '@playwright/test';

export async function getAPIContext(){
    return await request.newContext({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders:{
            'Content-Type': 'application/json'
        }
    })
}