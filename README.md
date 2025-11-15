# HostingManual.net - CMS & Website

A modern, SEO-optimized web hosting review site built with SvelteKit 2, Svelte 5, TailwindCSS 4, and PocketBase.

## Features

### CMS Features
- **Rich Content Editor**: Tiptap-based editor with custom components
- **Custom Components**:
  - Rating cards for hosting providers
  - Pros/Cons lists
  - Comparison tables
  - Pricing tables
  - Call-to-action blocks
  - Alert boxes
- **Content Management**:
  - Posts/Articles with categories (reviews, comparisons, guides, news, tutorials)
  - Static pages
  - Hosting provider profiles
  - Media library
  - Site settings

### Frontend Features
- **Server-Side Rendering**: All public pages use SSR for optimal SEO
- **SEO Optimized**:
  - Meta tags with svelte-meta-tags
  - JSON-LD structured data
  - OpenGraph and Twitter cards
  - Semantic HTML
- **Responsive Design**: Mobile-first, fully responsive layout
- **TailwindCSS 4**: Modern utility-first CSS framework

### Security
- Superuser-only CMS access
- Secure filtering with `pb.filter()` on server-side
- Published/draft system for content

## Tech Stack

- **Frontend**: SvelteKit 2, Svelte 5 (runes mode)
- **Styling**: TailwindCSS 4 with forms and typography plugins
- **Backend**: PocketBase
- **Editor**: Tiptap
- **SEO**: svelte-meta-tags

## Project Structure

```
packages/web/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── content/           # Reusable content components
│   │   │   │   ├── RatingCard.svelte
│   │   │   │   ├── ProsCons.svelte
│   │   │   │   ├── ComparisonTable.svelte
│   │   │   │   ├── PricingTable.svelte
│   │   │   │   ├── CallToAction.svelte
│   │   │   │   └── Alert.svelte
│   │   │   ├── editor/            # CMS editor components
│   │   │   │   └── TiptapEditor.svelte
│   │   │   └── ContentRenderer.svelte
│   │   └── pocketbase.ts          # PocketBase client & types
│   └── routes/
│       ├── +layout.svelte         # Main layout with nav & footer
│       ├── +page.svelte           # Homepage
│       ├── posts/                 # Blog/posts
│       │   ├── +page.server.ts
│       │   ├── +page.svelte
│       │   └── [slug]/
│       │       ├── +page.server.ts
│       │       └── +page.svelte
│       └── admin/                 # CMS admin area
│           ├── +layout.svelte
│           ├── +page.svelte       # Dashboard
│           ├── login/
│           │   └── +page.svelte
│           └── posts/
│               ├── +page.svelte   # Posts list
│               └── [id]/
│                   └── +page.svelte  # Post editor
│
pocketbase/
└── pb_migrations/
    └── 1700000000_initial_schema.js
```

## PocketBase Collections

### Collections Overview

1. **posts** - Blog posts and reviews
   - Fields: title, slug, content (JSON), excerpt, featured_image, category, tags, rating, SEO fields
   - Relations: hosting_provider, author

2. **pages** - Static pages
   - Fields: title, slug, content (JSON), excerpt, featured_image, SEO fields
   - Relations: author

3. **hosting_providers** - Hosting company profiles
   - Fields: name, slug, logo, website, affiliate_link, description, rating, pricing, features, pros, cons

4. **component_templates** - Reusable editor components
   - Fields: name, type, description, default_data (JSON), schema (JSON)

5. **media** - Media library
   - Fields: title, file, alt_text, caption, type

6. **site_settings** - Global site settings
   - Fields: key, value (JSON), description

## Getting Started

### Prerequisites

- Node.js 18+
- PocketBase binary

### Installation

1. **Install dependencies**:
   ```bash
   cd packages/web
   npm install
   ```

2. **Set up PocketBase**:
   - Download PocketBase from https://pocketbase.io/
   - Place the binary in `pocketbase/` directory
   - Run migrations:
     ```bash
     cd pocketbase
     ./pocketbase serve
     ```
   - Create your first admin user at http://127.0.0.1:8090/_/

3. **Run development server**:
   ```bash
   cd packages/web
   npm run dev
   ```

4. **Access the site**:
   - Frontend: http://localhost:5173
   - Admin: http://localhost:5173/admin
   - PocketBase Admin: http://127.0.0.1:8090/_/

## Usage

### Creating Content

1. Login to `/admin/login/` with your PocketBase admin credentials
2. Navigate to "Posts" to create blog posts/reviews
3. Use the Tiptap editor to add content
4. Insert custom components using the toolbar buttons
5. Set SEO metadata in the sidebar
6. Publish when ready

### Custom Components

The editor includes these custom components:

- **Rating Card**: Display hosting provider with rating and CTA
- **Pros/Cons**: Two-column list of advantages and disadvantages
- **Comparison Table**: Side-by-side provider comparison
- **Pricing Table**: Pricing plans with features
- **Call to Action**: Highlighted CTA block
- **Alert**: Info/warning/success/error messages

### Content Types

- **review**: Hosting provider reviews
- **comparison**: Head-to-head comparisons
- **guide**: How-to guides and tutorials
- **news**: Industry news and updates
- **tutorial**: Step-by-step tutorials

## Development

### Adding New Components

1. Create component in `src/lib/components/content/`
2. Add Tiptap extension in `TiptapEditor.svelte`
3. Add rendering logic in `ContentRenderer.svelte`
4. Update component_templates collection in PocketBase

### Customizing Theme

Edit `tailwind.config.js` to customize colors, spacing, etc. The primary color palette can be adjusted in the `theme.extend.colors.primary` section.

## Deployment

### Building for Production

```bash
cd packages/web
npm run build
```

### Environment Variables

Configure your PocketBase URL if different from default:

```env
PUBLIC_POCKETBASE_URL=https://your-pb-instance.com
```

## Contributing

This is a private project for HostingManual.net.

## License

Proprietary - All rights reserved.
