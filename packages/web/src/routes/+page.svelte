<script lang="ts">
	import { pb, type Post } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let featuredPosts = $state<Post[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const result = await pb.collection('posts').getList<Post>(1, 6, {
				filter: 'published = true',
				sort: '-published_at,-created',
				expand: 'hosting_provider'
			});
			featuredPosts = result.items;
		} catch (err) {
			console.error('Error loading posts:', err);
		} finally {
			loading = false;
		}
	});
</script>

<!-- Hero section -->
<div class="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
	<div class="container mx-auto px-4 py-20">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="mb-6 text-5xl font-bold">Web Hosting Reviews and Guides</h1>
			<p class="mb-8 text-xl text-primary-100">
				In-depth analysis, comparisons and expert opinions on the best hosting providers.
			</p>
			<a
				href="/posts/"
				class="inline-block rounded-lg bg-white px-8 py-3 font-medium text-primary-600 transition hover:bg-gray-100"
			>
				Browse Articles
			</a>
		</div>
	</div>
</div>

<!-- Featured posts -->
<div class="container mx-auto px-4 py-16">
	<h2 class="mb-8 text-3xl font-bold text-gray-900">Latest Posts</h2>

	{#if loading}
		<div class="text-center py-12">
			<p class="text-gray-600">Loading...</p>
		</div>
	{:else if featuredPosts.length === 0}
		<div class="rounded-lg bg-gray-100 p-12 text-center">
			<p class="text-gray-600">Coming soon - first articles on the way!</p>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredPosts as post}
				<article class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
					{#if post.featured_image}
						<img
							src={post.featured_image}
							alt={post.title}
							class="h-48 w-full object-cover"
						/>
					{/if}
					<div class="flex flex-1 flex-col p-6">
						<div class="mb-2 flex items-center gap-2">
							<span class="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
								{post.category}
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

						<h3 class="mb-2 text-xl font-bold text-gray-900">
							<a href="/posts/{post.slug}/" class="hover:text-primary-600">
								{post.title}
							</a>
						</h3>

						{#if post.excerpt}
							<p class="mb-4 flex-1 text-gray-600">{post.excerpt}</p>
						{/if}

						<a
							href="/posts/{post.slug}/"
							class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline"
						>
							Read More
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
				</article>
			{/each}
		</div>
	{/if}
</div>

<!-- CTA Section -->
<div class="bg-gray-50 py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Find Your Perfect Hosting</h2>
			<p class="mb-8 text-lg text-gray-600">
				Detailed comparisons and expert reviews to help you make the right decision
			</p>
			<a
				href="/posts/"
				class="inline-block rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition hover:bg-primary-700"
			>
				View Reviews
			</a>
		</div>
	</div>
</div>
