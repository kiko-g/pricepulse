import * as cheerio from 'cheerio'
import type { Product, StoreDetails, Units } from '@/types'

export function determineStore(url: string): StoreDetails | undefined {
  const urlObj = new URL(url)
  const host = urlObj.hostname

  const storeMap: { [key: string]: StoreDetails } = {
    'www.continente.pt': {
      name: 'continente',
      language: 'pt',
      currency: '€',
    },
  }

  return storeMap[host]
}

export function continenteScraper(html: string): Product {
  const currency = '€'
  const $ = cheerio.load(html)

  const name = $('h1').first().text().trim()
  const brand = $('.ct-pdp--brand').first().text().trim()
  const discount = parseInt(
    $('.ct-product-tile-badge-value--pvpr').first().text().trim(),
  )
  const single = $('.ct-pdp--unit').first().text().trim()
  const units = $('.pwc-m-unit').first().text().trim().replace('/', '') as Units
  const ptFloatRegex = /[\d]+(?:,\d+)?/
  const price = parseFloat(
    $('.sales.pwc-tile--price-primary span').first().attr('content') || '',
  )
  const priceRecommendedStr = $('.pwc-discount-amount')
    .first()
    .text()
    .match(ptFloatRegex)?.[0]
    .replace(',', '.')
  const priceRecommended = parseFloat(priceRecommendedStr || '')
  const priceDisplay = price + currency + ' / ' + units
  const priceRecommendedDisplay = priceRecommended + currency + ' / ' + units
  const imgUrl = $('img.ct-product-image').first().attr('src') || ''

  const product: Product = {
    name,
    brand,
    discount,
    single,
    units,
    price,
    priceRecommended,
    priceDisplay,
    priceRecommendedDisplay,
    imgUrl,
  }

  return product
}
