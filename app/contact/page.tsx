import { getPageContent } from '@/content/server'
import ContactClient from './ContactClient'

export default async function Contact() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'contact'),
    getPageContent('fi', 'contact'),
  ])
  return <ContactClient enContent={enContent} fiContent={fiContent} />
}
