import React, { FC, createContext, useState, useEffect } from 'react'

export type Asset = {
  id: number
  keyColor: string
  src: string
}

type Values = {
  asset: Asset | null
  isLoading: boolean
}

const defaultValues: Values = {
  asset: null,
  isLoading: false
}

export const AssetContext = createContext(defaultValues)

export const AssetProvider: FC = ({ children }) => {
  const [asset, setAsset] = useState(defaultValues.asset)
  const [isLoading, setIsLoading] = useState(defaultValues.isLoading)

  useEffect(() => {
    fetch('/list.json')
      .then(res => res.json())
      .then((assets: Asset[]) => {
        setAsset(assets[0])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <AssetContext.Provider value={{ asset, isLoading }}>
      {children}
    </AssetContext.Provider>
  )
}