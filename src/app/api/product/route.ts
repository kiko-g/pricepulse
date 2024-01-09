import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import { continenteScraper, determineStore } from "@/lib/scraper"

export async function GET(request: NextRequest) {
  try {
    const urlParam = request.nextUrl.searchParams.get("url")
    if (!urlParam) throw new Error("URL parameter is missing")
    const url = decodeURIComponent(urlParam)

    const response = await axios.get(url)
    const html = response.data

    const store = determineStore(url)
    if (!store) throw new Error("Store not supported")

    switch (store.name) {
      case "continente":
        return NextResponse.json(
          {
            storeDetails: store,
            product: continenteScraper(html),
          },
          { status: 200 },
        )
      default:
        throw new Error("Store not supported")
    }
  } catch (error) {
    return NextResponse.json({ message: "Error occurred during scraping", error: error }, { status: 500 })
  }
}
