import { Inter } from 'next/font/google'
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <ToastContainer />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}

