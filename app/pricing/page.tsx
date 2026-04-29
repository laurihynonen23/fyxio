import { getPageContent } from '@/content/server'
import PricingClient from './PricingClient'

export default async function Pricing() {
  const enContent = await getPageContent('en', 'pricing')
  return <PricingClient enContent={enContent} />
}
