"use server"
import React from 'react'

export async function alertDiscord(message:string){
    await fetch(process.env.DISCORD_WEBHOOK!,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            content:message,
        }),
    });
    
}