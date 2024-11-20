'use client'

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers";
import { useEffect } from "react";
import { useStores } from "@/store/context";
import { useRouter } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userStore, authStore } = useStores()
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const oldRefreshToken = await authStore.getRefreshToken()
        if (oldRefreshToken) {
          const result = await authStore.refreshAccessToken(oldRefreshToken)
          if (result.status === 'success') {
            const { accessToken, refreshToken } = result.data
            authStore.saveTokens(accessToken, refreshToken)
            const user = localStorage.getItem('user')
            if (user === null || user === "") return
            userStore.tempSaveUserData(JSON.parse(user))
            router.push('/board')
          }
        } 
        router.push('/auth/login')
      } catch (e) {
        console.log(e)
      }
    }
    loadUser()
  }, [])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

