import { getPageContent } from '@/content/server'
import WorkClient from './WorkClient'

export default async function Work() {
  const enContent = await getPageContent('en', 'work')
  return <WorkClient enContent={enContent} />
}
