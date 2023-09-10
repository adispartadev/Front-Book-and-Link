import '../app/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })


export default function Layout({ children }) {
    return (
        <div >
            <Head>
                <title>Book and Link</title>
                <meta name='description' content='SSO Coding Test' />
            </Head>
            {children}
        </div>
    )
}