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
  const [loading, setLoading] = useState(false)

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
      setLoading("true")
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
        setLoading(false)
        router.push("/tools/dashboard")
      } else {
        console.log(response)
        setLoading(false)
        toast.error("Authentication failed.")
      }

    } catch (error) {
      console.error(error)
      setLoading(false)
      toast.error("An error occurred during authentication.")
    } finally {
      setLoading(false)
    }

  }

  return (
    <main className={styles.main} suppressHydrationWarning>

      {!loading && <section className={styles.loginWrapper}>
        <h1>Authenticate To ZIA</h1>
        <select value={cloud} onChange={(e) => setCloud(e.target.value)}>
          <option>Select Your Cloud</option>
          {baseUrls.map(url => <option key={url}>{url}</option>)}
        </select>
        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" name="apiKey" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <div className={styles.button} onClick={submitHandler}>Authenticate</div>)
      </section>}

      {loading && <section className={styles.loginWrapper}><span className={styles.loadingText}>Loading, Please Wait...</span></section>}
    </main>
  )
}
