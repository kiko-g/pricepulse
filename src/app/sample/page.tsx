'use client'

import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import type { Product, ProductResponse, StoreDetails } from '@/types'
import {
  BoltIcon,
  EllipsisHorizontalCircleIcon,
  GlobeAltIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { Layout } from '@/components/Layout'
import { Menu, Transition } from '@headlessui/react'

const exampleUrls = {
  continente:
    'https://www.continente.pt/produto/cereais-fitness-chocolate-preto-e-banana-fitness-7629683.html',
}

export default function Sample() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [productUrl, setProductUrl] = useState<string>('')
  const [product, setProduct] = useState<Product | null>(null)
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null)

  function findProduct() {
    setIsLoading(true)
    setProduct(null)
    setStoreDetails(null)

    fetch(`/api/product?url=${productUrl}`)
      .then((res) => res.json())
      .then((data: ProductResponse) => {
        setIsLoading(false)
        setProduct(data.product)
        setStoreDetails(data.storeDetails)
      })
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center space-y-4 py-8">
        <FindProduct
          findProduct={findProduct}
          productUrlHook={[productUrl, setProductUrl]}
        />
        {isLoading && <ProductSkeleton />}
        {product !== null && storeDetails !== null && (
          <ProductCard product={product} storeDetails={storeDetails} />
        )}
      </div>
    </Layout>
  )
}

function FindProduct({
  productUrlHook,
  findProduct,
}: {
  productUrlHook: [string, React.Dispatch<React.SetStateAction<string>>]
  findProduct: () => void
}) {
  const [productUrl, setProductUrl] = productUrlHook

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg border bg-gray-50 px-6 py-6">
      <div className="relative">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Product URL
        </h3>
        <div className="mt-0.5 text-sm text-gray-500">
          <p>Enter the URL of the product from the website.</p>
        </div>

        <div className="absolute right-0 top-0 hidden md:block">
          <Menu>
            <Menu.Button className="rounded-full transition hover:opacity-80 dark:bg-gray-800 dark:hover:bg-gray-700">
              <EllipsisHorizontalCircleIcon className="h-6 w-6 text-gray-700" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="flex flex-col gap-2 px-2 py-2">
                  <div className="px-1">
                    <p className="border-b pb-1 text-sm font-bold">Stores</p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <div className="group flex w-full items-center gap-x-1.5 px-1">
                        <span className="flex-1 text-sm text-gray-900">
                          Continente
                        </span>
                        <button
                          onClick={() => setProductUrl(exampleUrls.continente)}
                          className="flex items-center justify-start gap-1 rounded bg-gray-100 px-1 py-1 text-left text-sm transition hover:bg-gray-200 dark:bg-white/5 hover:dark:bg-white/10"
                        >
                          <BoltIcon className="h-4 w-4" />
                        </button>
                        <a
                          href="www.continente.pt"
                          target="_blank"
                          className="flex items-center justify-start gap-1 rounded bg-gray-100 px-1 py-1 text-left text-sm transition hover:bg-gray-200 dark:bg-white/5 hover:dark:bg-white/10"
                        >
                          <GlobeAltIcon className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <form className="flex flex-col items-center gap-2.5 md:flex-row">
        <div className="relative h-full w-full self-stretch">
          <label htmlFor="email" className="sr-only">
            Product URL
          </label>
          <input
            type="text"
            value={productUrl}
            onKeyDown={(e) => e.key === 'Enter' && findProduct()}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="www.continente.pt"
            className="block h-full w-full flex-1 self-stretch rounded border-0 py-2 pr-8 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 md:pr-10"
          />

          {productUrl !== '' && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3"
              onClick={() => setProductUrl('')}
            >
              <TrashIcon
                className="h-5 w-5 text-gray-700 transition hover:opacity-70"
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={findProduct}
          className="inline-flex h-full w-full flex-1 items-center justify-center self-stretch rounded bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-500 md:w-auto"
        >
          Find
        </button>
      </form>
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-lg border bg-gray-50 px-6 py-6">
      <div className="flex gap-4">
        <div className="h-full w-full rounded-lg bg-gray-300 md:h-64 md:w-64"></div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-6 w-full rounded bg-gray-300 md:w-96" />
            <div className="h-4 w-2/3 rounded bg-gray-300 md:w-48" />
            <div className="h-4 w-1/2 rounded bg-gray-300 md:w-24" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-1/5 rounded bg-gray-300 md:w-24" />
            <div className="h-4 w-1/4 rounded bg-gray-300 md:w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  storeDetails,
}: {
  product: Product
  storeDetails: StoreDetails
}) {
  return (
    <div className="w-full rounded-lg border bg-gray-50 px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <Image
          width={400}
          height={400}
          alt={product.name}
          src={product.imgUrl}
          className="rounded-lg border bg-white p-4"
          objectFit="cover"
        />

        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full flex-1 items-start gap-2">
            <div className="flex flex-1 flex-col">
              <h4 className="text-lg font-semibold leading-6 text-gray-900">
                {product.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {product.brand}
              </p>
              <p className="mt-0 text-sm text-gray-400">{product.single}</p>
            </div>

            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-sm font-medium tracking-tighter text-white">
                <span className="px-2 py-2">-{product.discount}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Price</p>
              <div>
                <span className="text-lg font-bold text-gray-700">
                  {product.price}
                  {storeDetails.currency}/{product.units}
                </span>
                <p className="mr-2 text-base font-medium text-red-600 line-through">
                  {product.priceRecommended}
                  {storeDetails.currency}/{product.units}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
