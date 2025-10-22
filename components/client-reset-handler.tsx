'use client'

import { useResetOnLoad } from '@/hooks/use-reset-on-load'

export default function ClientResetHandler() {
  useResetOnLoad()
  return null
}