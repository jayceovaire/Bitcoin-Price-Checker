import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Layout from '../components/layouts.tsx'
import {Handlers, PageProps} from '$fresh/server.ts'

export interface Price {
    time: Time
    disclaimer: string
    chartName: string
    bpi: Bpi
}

export interface Time {
    updated: string
    updatedISO: string
    updateduk: string
}

export interface Bpi {
    USD: Usd
    GBP: Gbp
    EUR: Eur
}

export interface Usd {
    code: string
    symbol: string
    rate: string
    description: string
    rate_float: number
}

export interface Gbp {
    code: string
    symbol: string
    rate: string
    description: string
    rate_float: number
}

export interface Eur {
    code: string
    symbol: string
    rate: string
    description: string
    rate_float: number
}

const url: string = "https://api.coindesk.com/v1/bpi/currentprice.json"

export const  handler: Handlers<Price | null> = {
    async GET(_,ctx){
        const resp = await fetch(url)
        if(resp.status === 200){
            const price: Price = await resp.json()
            return ctx.render(price)
}
        return ctx.render(null)
    }
}


export default function Index({data}: PageProps<Price|null>) {
    if(!data){
        return <h1>Data is not available</h1>
    }
    
    return (
        <>
        <div class={'w-screen h-screen bg-gray-900'}>
        <Layout>
            <div class={'flex justify-center p-8 mx-auto max-wscreen-md'}>
                <img src={"../bitcoin-color-icon.png"}
                    height="100px"
                    width="200px"
                    alt="the fresh logo: a sliced lemon dripping with juice"
                />
            </div>
            <h1 class={'my-10 text(center 3xl white'}>Bitcoin Price Checker</h1>
            <p class={'my-10 text(center 2xl white'}>
                USD: ${data.bpi.USD.rate}
                </p>
            <p class={'my-10 text(center 2xl white'}>
                EUR: ${data.bpi.EUR.rate}
                </p>
            <p class={'my-10 text(center 2xl white'}>
                GBP: ${data.bpi.GBP.rate}
            </p>
            
            
        </Layout>
        </div>
        </>
        );
}