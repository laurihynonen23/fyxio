import type { Metadata } from 'next'
import { getService } from '@/lib/serviceData'
import ServicePage from '@/components/ServicePage'
import { notFound } from 'next/navigation'

export function generateMetadata(): Metadata {
  const service = getService('custom-websites')
  if (!service) {
    return {}
  }

  return {
    title: `${service.shortTitle} | Fyxio`,
    description: service.heroDesc,
  }
}

export default function Page() {
  const service = getService('custom-websites')
  if (!service) notFound()
  return <ServicePage service={service} />
}
