<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.posts);
	const totalPages = $derived(data.totalPages);
	const currentPage = $derived(data.currentPage);
	const categories = $derived(data.categories);
	const selectedCategory = $derived(data.selectedCategory);

	const categoryLabels: Record<string, string> = {
		review: 'Értékelések',
		comparison: 'Összehasonlítások',
		guide: 'Útmutatók',
		news: 'Hírek',
		tutorial: 'Tutorialok'
	};
</script>

<MetaTags
	title="Blog - Hosting Értékelések és Útmutatók | HostingManual.net"
	description="Olvasd el részletes hosting értékeléseinket, összehasonlításainkat és útmutatóinkat. Minden, amit a web hostingról tudni kell."
	canonical="https://hostingmanual.net/posts/"
	openGraph={{
		type: 'website',
		url: 'https://hostingmanual.net/posts/',
		title: 'Blog - HostingManual.net',
		description: 'Részletes hosting értékelések, összehasonlítások és útmutatók.'
	}}
/>

<div class="bg-gray-50 py-12">
	<div class="container mx-auto px-4">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Hosting Blog</h1>
		<p class="text-lg text-gray-600">
			Értékelések, összehasonlítások és útmutatók a web hosting világából
		</p>
	</div>
</div>

<div class="container mx-auto px-4 py-12">
	<!-- Category filter -->
	<div class="mb-8 flex flex-wrap gap-2">
		<a
			href="/posts/"
			class="rounded-lg px-4 py-2 text-sm font-medium transition {selectedCategory === ''
				? 'bg-primary-600 text-white'
				: 'bg-white text-gray-700 hover:bg-gray-100'}"
		>
			Összes
		</a>
		{#each categories as category}
			<a
				href="/posts/?category={category}"
				class="rounded-lg px-4 py-2 text-sm font-medium transition {selectedCategory === category
					? 'bg-primary-600 text-white'
					: 'bg-white text-gray-700 hover:bg-gray-100'}"
			>
				{categoryLabels[category]}
			</a>
		{/each}
	</div>

	<!-- Posts grid -->
	{#if posts.length === 0}
		<div class="rounded-lg bg-white p-12 text-center shadow-sm">
			<p class="text-gray-600">Nincsenek bejegyzések ebben a kategóriában</p>
			<a href="/posts/" class="mt-4 inline-block text-primary-600 hover:underline">
				Vissza az összes bejegyzéshez →
			</a>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<article
					class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
				>
					{#if post.featured_image}
						<a href="/posts/{post.slug}/">
							<img
								src={post.featured_image}
								alt={post.title}
								class="h-48 w-full object-cover transition hover:opacity-90"
							/>
						</a>
					{/if}
					<div class="flex flex-1 flex-col p-6">
						<div class="mb-2 flex items-center gap-2">
							<span
								class="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700"
							>
								{categoryLabels[post.category]}
							</span>
							{#if post.rating}
								<div class="flex items-center gap-1">
									<svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
										/>
									</svg>
									<span class="text-sm font-medium text-gray-700">{post.rating.toFixed(1)}</span>
								</div>
							{/if}
						</div>

						<h2 class="mb-2 text-xl font-bold text-gray-900">
							<a href="/posts/{post.slug}/" class="hover:text-primary-600">
								{post.title}
							</a>
						</h2>

						{#if post.excerpt}
							<p class="mb-4 flex-1 text-gray-600">{post.excerpt}</p>
						{/if}

						<div class="flex items-center justify-between">
							<time
								datetime={post.published_at || post.created}
								class="text-sm text-gray-500"
							>
								{new Date(post.published_at || post.created).toLocaleDateString('hu-HU')}
							</time>

							<a
								href="/posts/{post.slug}/"
								class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
							>
								Tovább
								<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-12 flex justify-center gap-2">
				{#if currentPage > 1}
					<a
						href="/posts/?page={currentPage - 1}{selectedCategory ? `&category=${selectedCategory}` : ''}"
						class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Előző
					</a>
				{/if}

				{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
					<a
						href="/posts/?page={page}{selectedCategory ? `&category=${selectedCategory}` : ''}"
						class="rounded-lg px-4 py-2 text-sm font-medium transition {page === currentPage
							? 'bg-primary-600 text-white'
							: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}"
					>
						{page}
					</a>
				{/each}

				{#if currentPage < totalPages}
					<a
						href="/posts/?page={currentPage + 1}{selectedCategory ? `&category=${selectedCategory}` : ''}"
						class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Következő
					</a>
				{/if}
			</div>
		{/if}
	{/if}
</div>
