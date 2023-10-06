import {useState, useEffect} from 'react'

export function useSessionStorageOrDefault(key:string, defaultValue:any)
{
    let value: any
    const stored = sessionStorage.getItem(key)
    value = !stored ? defaultValue : JSON.parse(stored)
    return value
}

export function useEffectSession(key:string, value:any)
{
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [value])
}