import { getPageContent } from '@/content/server'
import ContactClient from './ContactClient'

export default async function Contact() {
  const enContent = await getPageContent('en', 'contact')
  return <ContactClient enContent={enContent} />
}
