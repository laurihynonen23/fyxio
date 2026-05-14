import { getPageContent } from '@/content/server'
import InsightsClient from './InsightsClient'

export default async function Insights() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'insights'),
    getPageContent('fi', 'insights'),
  ])
  return <InsightsClient enContent={enContent} fiContent={fiContent} />
}
