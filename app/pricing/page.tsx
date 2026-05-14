import { getPageContent } from '@/content/server'
import PricingClient from './PricingClient'

export default async function Pricing() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'pricing'),
    getPageContent('fi', 'pricing'),
  ])
  return <PricingClient enContent={enContent} fiContent={fiContent} />
}
