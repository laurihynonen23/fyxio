import { getPageContent } from '@/content/server'
import ServicesClient from './ServicesClient'

export default async function Services() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'services'),
    getPageContent('fi', 'services'),
  ])
  return <ServicesClient enContent={enContent} fiContent={fiContent} />
}
