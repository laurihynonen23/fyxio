import { getPageContent } from '@/content/server'
import WorkClient from './WorkClient'

export default async function Work() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'work'),
    getPageContent('fi', 'work'),
  ])
  return <WorkClient enContent={enContent} fiContent={fiContent} />
}
