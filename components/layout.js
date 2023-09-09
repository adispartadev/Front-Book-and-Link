import '../app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({ children }) {
    return (
        <div >
            {children}
        </div>
    )
}