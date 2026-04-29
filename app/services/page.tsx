import { getPageContent } from '@/content/server'
import ServicesClient from './ServicesClient'

export default async function Services() {
  const enContent = await getPageContent('en', 'services')
  return <ServicesClient enContent={enContent} />
}
