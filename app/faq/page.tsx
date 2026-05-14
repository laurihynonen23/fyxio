import { getPageContent } from '@/content/server'
import FAQClient from './FAQClient'

export default async function FAQ() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'faq'),
    getPageContent('fi', 'faq'),
  ])
  return <FAQClient enContent={enContent} fiContent={fiContent} />
}
