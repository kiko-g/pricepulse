export type ErrorData = {
  message: string
  error: any
}

type Store = "continente"
type Currency = "€"
type Language = "pt"
export type StoreDetails = {
  name: Store
  language: Language
  currency: Currency
}

export type Units = "kg" | "g" | "l" | "ml" | "un"
export type Product = {
  name: string
  brand: string
  discount: number
  single: string
  units: Units
  price: number
  priceRecommended: number
  priceDisplay: string
  priceRecommendedDisplay: string
  imgUrl: string
}

export type ProductResponse = {
  product: Product
  storeDetails: StoreDetails
}
