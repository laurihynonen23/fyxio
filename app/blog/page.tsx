import { getPageContent } from '@/content/server'
import BlogClient from './BlogClient'

export default async function Blog() {
  const [enContent, fiContent] = await Promise.all([
    getPageContent('en', 'blog'),
    getPageContent('fi', 'blog'),
  ])
  return <BlogClient enContent={enContent} fiContent={fiContent} />
}
