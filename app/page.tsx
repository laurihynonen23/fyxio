import { getPageContent } from '@/content/server'
import HomeClient from './HomeClient'

export default async function Home() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'home'),
    getPageContent('fi', 'home'),
  ])
  return <HomeClient enContent={enContent} fiContent={fiContent} />
}
