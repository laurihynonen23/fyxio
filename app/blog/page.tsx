import { getPageContent } from '@/content/server'
import BlogClient from './BlogClient'

export default async function Blog() {
  const enContent = await getPageContent('en', 'blog')
  return <BlogClient enContent={enContent} />
}
