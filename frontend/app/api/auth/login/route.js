import { NextResponse } from "next/server";
import { obfuscateApiKey } from "@/app/utils/obfuscateApiKey";
import { cookies } from 'next/headers'

export async function POST(req) {
    const data = await req.json();
    const { username, password, apiKey, timestamp, url } = data;

    const response = await fetch(url, {
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
        const auth = response.headers.get('set-cookie')
        const cookie_object = auth.split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
        }, {});

        cookies().set("ZscalerAuthToken", cookie_object["JSESSIONID"], {
            maxAge: cookie_object["Max-Age"],
            Expires: cookie_object["Expires"],
        })
    } else {
        return NextResponse.json({ message: "Authentication failed." }, { status: 401 })
    }

    return NextResponse.json({ message: "success" }, { status: 200 })
}