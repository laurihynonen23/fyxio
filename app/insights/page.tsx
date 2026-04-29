import { getPageContent } from '@/content/server'
import InsightsClient from './InsightsClient'

export default async function Insights() {
  const enContent = await getPageContent('en', 'insights')
  return <InsightsClient enContent={enContent} />
}
