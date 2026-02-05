# Content Collections Setup

This folder contains markdown content for the Pythia Insights website. To enable these as Astro content collections, follow these steps:

## 1. Configure Content Collections

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Pythia Insights'),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      canonical: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = { guides };
```

## 2. Create Guide Layout

Create `src/layouts/GuideLayout.astro`:

```astro
---
import Layout from './Layout.astro';

const { frontmatter } = Astro.props;
const { title, description, pubDate, author, seo } = frontmatter;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": author
  },
  "datePublished": pubDate,
  "publisher": {
    "@type": "Organization",
    "name": "Pythia Insights"
  }
};
---

<Layout 
  title={seo?.title || title}
  description={seo?.description || description}
  schema={schema}
>
  <article class="guide">
    <div class="container">
      <header class="guide-header">
        <h1>{title}</h1>
        <p class="guide-meta">Published: {new Date(pubDate).toLocaleDateString()}</p>
      </header>
      <div class="guide-content">
        <slot />
      </div>
      <footer class="guide-footer">
        <a href="/contact" class="btn btn-primary">Schedule a Consultation</a>
      </footer>
    </div>
  </article>
</Layout>

<style>
  .guide {
    padding: 4rem 0;
  }
  
  .guide-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .guide-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .guide-meta {
    color: var(--color-gray-600);
  }
  
  .guide-content {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
  
  .guide-content :global(h2) {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  
  .guide-content :global(h3) {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  
  .guide-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
  }
  
  .guide-content :global(th),
  .guide-content :global(td) {
    padding: 0.75rem;
    border: 1px solid var(--color-gray-300);
    text-align: left;
  }
  
  .guide-content :global(th) {
    background: var(--color-gray-100);
    font-weight: 600;
  }
  
  .guide-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-gray-200);
    text-align: center;
  }
</style>
```

## 3. Create Dynamic Route

Create `src/pages/guides/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import GuideLayout from '../../layouts/GuideLayout.astro';

export async function getStaticPaths() {
  const guides = await getCollection('guides');
  return guides.map(guide => ({
    params: { slug: guide.slug },
    props: { guide },
  }));
}

const { guide } = Astro.props;
const { Content } = await guide.render();
---

<GuideLayout frontmatter={guide.data}>
  <Content />
</GuideLayout>
```

## 4. Available Content

### Guides

| File | URL | Status |
|------|-----|--------|
| `guides/fractional-cfo-services.md` | `/guides/fractional-cfo-services` | Ready |

## 5. Adding New Content

1. Create a new `.md` file in the appropriate collection folder
2. Include required frontmatter (see existing files for examples)
3. Write content in markdown
4. Set `draft: false` when ready to publish

## SEO Notes

Each guide includes:
- Frontmatter with title, description, keywords
- Schema.org Article markup
- OpenGraph meta tags (handled by Layout)
- Canonical URL specification

The pillar page `fractional-cfo-services.md` targets:
- Primary: "fractional CFO services"
- Secondary: "fractional CFO", "part-time CFO", "outsourced CFO", "virtual CFO"
