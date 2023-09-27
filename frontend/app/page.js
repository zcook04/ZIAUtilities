'use client'

import styles from './page.module.scss'
import react, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Home() {
  const baseUrls = [
    "zsapi.zscalerbeta.net",
    "zsapi.zscalerone.net",
    "zsapi.zscalertwo.net",
    "zsapi.zscalerthree.net",
    "zsapi.zscaler.net",
    "zsapi.zscloud.net"
  ]

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [cloud, setCloud] = useState('')
  const router = useRouter()

  const submitHandler = async () => {
    if (cloud === '') {
      toast.warning('Cloud Service is required.')
      return
    }
    if (username === '' || password === '') {
      toast.warning("Username and Password is required.")
      return
    }
    if (apiKey === '') {
      toast.warning("API Key is required.")
      return
    }

    try {
      const timestamp = Date.now().toString()
      const body = JSON.stringify({
        username,
        password,
        apiKey,
        timestamp,
        cloud
      })

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })

      if (response.ok) {
        router.push("/tools/dashboard")
      } else {
        console.log(response)
        toast.error("Authentication failed.")
      }

    } catch (error) {
      console.error(error)
      toast.error("An error occurred during authentication.")
    }

  }

  return (
    <main className={styles.main} suppressHydrationWarning>
      <section className={styles.loginWrapper}>
        <h1>Authenticate To ZIA</h1>
        <select value={cloud} onChange={(e) => setCloud(e.target.value)}>
          <option>Select Your Cloud</option>
          {baseUrls.map(url => <option key={url}>{url}</option>)}
        </select>
        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" name="apiKey" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <div className={styles.button} onClick={submitHandler}>Authenticate</div>

      </section>
    </main>
  )
}
