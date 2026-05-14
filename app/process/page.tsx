import { getPageContent } from '@/content/server'
import ProcessClient from './ProcessClient'

export default async function Process() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'process'),
    getPageContent('fi', 'process'),
  ])
  return <ProcessClient enContent={enContent} fiContent={fiContent} />
}
