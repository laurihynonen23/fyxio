import { getPageContent } from '@/content/server'
import AboutClient from './AboutClient'

export default async function About() {
  const enContent = await getPageContent('en', 'about')
  return <AboutClient enContent={enContent} />
}
