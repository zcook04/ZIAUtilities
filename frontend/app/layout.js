import './globals.scss'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const poppings = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppings.className} suppressHydrationWarning >
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
