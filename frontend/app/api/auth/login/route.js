import { NextResponse } from "next/server";
import { obfuscateApiKey } from "@/app/utils/obfuscateApiKey";
import { cookies } from 'next/headers'

export async function POST(req) {
    const data = await req.json();
    const { username, password, apiKey, timestamp, cloud } = data;

    const response = await fetch(`https://${cloud}/api/v1/authenticatedSession`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            apiKey: obfuscateApiKey(timestamp, apiKey),
            timestamp
        })
    })

    if (response.headers.has('set-cookie')) {
        const cookie_object = response.headers.get('set-cookie').split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
        }, {});

        cookies().set("Cloud", cloud, {
            maxAge: cookie_object["Max-Age"],
            Expires: cookie_object["Expires"],
        })

        cookies().set("ZscalerAuthToken", response.headers.get('set-cookie'), {
            maxAge: cookie_object["Max-Age"],
            Expires: cookie_object["Expires"],
        })

    } else {
        return NextResponse.json({ message: "Authentication failed." }, { status: 401 })
    }

    return NextResponse.json({ message: "success" }, { status: 200 })
}