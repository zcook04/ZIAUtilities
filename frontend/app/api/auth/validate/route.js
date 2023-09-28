import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req) {

    const cloud = cookies().get("Cloud")
    const authToken = cookies().get("ZscalerAuthToken")

    if (!cloud || !authToken) {
        console.error("Authentication failed. Cloud Required")
        return NextResponse.json({ message: "Authentication failed. Cloud and AuthToken Required" }, { status: 401 })
    }
    return NextResponse.json({ message: "Valid Session" }, { status: 200 })
}