import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req) {
    if (!cookies().get("Cloud") || !cookies().get("ZscalerAuthToken")) {
        console.error("Authentication failed. Cloud Required")
        return NextResponse.json({ message: "Authentication failed. Cloud and AuthToken Required" }, { status: 401 })
    }

    const cloud = cookies().get("Cloud").value
    const authCookie = cookies().get("ZscalerAuthToken").value
    const JESSIONID = authCookie.split(";")[0].split("=")[1]

    try {
        const response = await fetch(`https://${cloud}/api/v1/firewallFilteringRules`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Cookie": authCookie,
            }
        })

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json({ message: "Fetched firewall rules successfully", data }, { status: 200 })
        }

        return NextResponse.json({ message: "Failed to fetch firewall rules" }, { status: 400 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to fetch firewall rules" }, { status: 400 })
    }
}