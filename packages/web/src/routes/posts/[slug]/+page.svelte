<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import ContentRenderer from '$lib/components/ContentRenderer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
	const metaTitle = $derived(post.meta_title || post.title);
	const metaDescription = $derived(post.meta_description || post.excerpt || '');
</script>

<MetaTags
	title={metaTitle}
	description={metaDescription}
	canonical="https://hostingmanual.net/posts/{post.slug}/"
	openGraph={{
		type: 'article',
		url: `https://hostingmanual.net/posts/${post.slug}/`,
		title: metaTitle,
		description: metaDescription,
		article: {
			publishedTime: post.published_at || post.created,
			modifiedTime: post.updated,
			authors: [],
			tags: post.tags || []
		},
		images: post.featured_image
			? [
					{
						url: post.featured_image,
						alt: post.title
					}
				]
			: []
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: metaTitle,
		description: metaDescription,
		image: post.featured_image
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: metaDescription,
		image: post.featured_image || '',
		datePublished: post.published_at || post.created,
		dateModified: post.updated,
		author: {
			'@type': 'Person',
			name: 'HostingManual'
		},
		publisher: {
			'@type': 'Organization',
			name: 'HostingManual.net',
			logo: {
				'@type': 'ImageObject',
				url: 'https://hostingmanual.net/logo.png'
			}
		}
	}}
/>

<article class="container mx-auto px-4 py-8">
	<!-- Breadcrumbs -->
	<nav class="mb-8 text-sm text-gray-600">
		<a href="/" class="hover:text-primary-600">Főoldal</a>
		<span class="mx-2">/</span>
		<a href="/posts/" class="hover:text-primary-600">Bejegyzések</a>
		<span class="mx-2">/</span>
		<span class="text-gray-900">{post.title}</span>
	</nav>

	<!-- Article header -->
	<header class="mb-8">
		<div class="mb-4 flex flex-wrap items-center gap-4">
			<span
				class="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
			>
				{post.category}
			</span>
			{#if post.rating}
				<div class="flex items-center gap-1">
					<svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/>
					</svg>
					<span class="font-medium text-gray-900">{post.rating.toFixed(1)}</span>
				</div>
			{/if}
		</div>

		<h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{post.title}</h1>

		{#if post.excerpt}
			<p class="mb-6 text-xl text-gray-600">{post.excerpt}</p>
		{/if}

		<div class="flex items-center gap-4 text-sm text-gray-600">
			<time datetime={post.published_at || post.created}>
				{new Date(post.published_at || post.created).toLocaleDateString('hu-HU', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
	</header>

	<!-- Featured image -->
	{#if post.featured_image}
		<div class="mb-12">
			<img
				src={post.featured_image}
				alt={post.title}
				class="w-full rounded-lg shadow-lg"
			/>
		</div>
	{/if}

	<!-- Article content -->
	<div class="mx-auto max-w-4xl">
		<ContentRenderer content={post.content} />
	</div>

	<!-- Article footer -->
	<footer class="mt-12 border-t border-gray-200 pt-8">
		{#if post.tags && post.tags.length > 0}
			<div class="mb-6">
				<h3 class="mb-3 text-sm font-medium text-gray-900">Címkék:</h3>
				<div class="flex flex-wrap gap-2">
					{#each post.tags as tag}
						<span
							class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>
		{/if}

		<div class="text-center">
			<a
				href="/posts/"
				class="inline-flex items-center text-primary-600 hover:underline"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Vissza a bejegyzésekhez
			</a>
		</div>
	</footer>
</article>
