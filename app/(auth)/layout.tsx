import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'

export const metadata={
    title: 'The Socio App',
    description: 'A social media app for introverts as well as extorverts made using next js and mongodb',
}

const inter=Inter({subsets: ['latin']})


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en" >
                <body className={`${inter.className} bg-dark-1`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}