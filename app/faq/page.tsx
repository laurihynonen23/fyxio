import { getPageContent } from '@/content/server'
import FAQClient from './FAQClient'

export default async function FAQ() {
  const enContent = await getPageContent('en', 'faq')
  return <FAQClient enContent={enContent} />
}
