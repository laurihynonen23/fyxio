import { getPageContent } from '@/content/server'
import HomeClient from './HomeClient'

export default async function Home() {
  const enContent = await getPageContent('en', 'home')
  return <HomeClient enContent={enContent} />
}
