import { Inter } from "next/font/google"
import clsx from "clsx"

import { type Metadata } from "next"
import { Providers } from "@/app/providers"
import { Layout } from "@/components/Layout"

import "@/styles/tailwind.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    template: "%s - Pocket",
    default: "Pocket - Invest at the perfect time.",
  },
  description: `By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx("h-full bg-gray-50 antialiased dark:bg-neutral-800", inter.variable)}>
      <body className="flex h-full flex-col">
        <Providers>
          <div className="flex min-h-full flex-col">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
