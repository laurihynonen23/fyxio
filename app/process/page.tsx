import { getPageContent } from '@/content/server'
import ProcessClient from './ProcessClient'

export default async function Process() {
  const enContent = await getPageContent('en', 'process')
  return <ProcessClient enContent={enContent} />
}
