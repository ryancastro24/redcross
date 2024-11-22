'use client'

import { useEffect } from 'react'

export default function Loader({color}) {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import('ldrs')
      ring.register()
    }
    getLoader()
  }, [])
  return <l-ring
  size="20"
  stroke="5"
  bg-opacity="0"
  speed="2" 
  color={`${color || 'white'}`} 
></l-ring>
}


