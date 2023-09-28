import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function DELETE(req) {
    if (!cookies().get("Cloud") || cookies.get("ZscalerAuthToken")) {
        console.error("Authentication failed. Cloud Required")
        return NextResponse.json({ message: "Authentication failed. Cloud Required" }, { status: 401 })
    }

    const cloud = cookies().get("Cloud").value
    const authCookie = cookies().get("ZscalerAuthToken").value

    try {
        const response = await fetch(`https://${cloud}/api/v1/authenticatedSession`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": authCookie
            }
        })
        const text = await response.text()
        console.log(text)

        if (response.ok) {
            cookies().delete("ZscalerAuthToken")
            cookies().delete("Cloud")
            return NextResponse.json({ message: "Logged off successfully" }, { status: 200 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to logoff" }, { status: 400 })
    }

    return NextResponse.json({ message: "Failed to logoff" }, { status: 400 })
}