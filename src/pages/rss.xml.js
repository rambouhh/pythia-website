import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    // Filter out drafts in production
    return import.meta.env.PROD ? !data.draft : true;
  });
  
  // Sort by date, newest first
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return rss({
    title: 'Pythia Insights Blog',
    description: 'Insights on fractional CFO services, FP&A, bookkeeping, and financial strategy for growing businesses.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      author: post.data.author || 'Pythia Insights',
    })),
    customData: `<language>en-us</language>
<copyright>© ${new Date().getFullYear()} Pythia Insights. All rights reserved.</copyright>
<managingEditor>hello@pythiainsights.com (Pythia Insights)</managingEditor>
<webMaster>hello@pythiainsights.com (Pythia Insights)</webMaster>`,
  });
}
