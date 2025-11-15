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
<div class="relative overflow-hidden bg-white">
	<!-- Gradient mesh background -->
	<div class="absolute inset-0 bg-[image:var(--gradient-mesh)]"></div>

	<!-- Animated orbs -->
	<div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
	<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>

	<div class="container relative mx-auto px-4 py-24 md:py-32">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Badge -->
			<div class="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-gray-700">
				<span class="flex h-2 w-2">
					<span class="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
				</span>
				Expert hosting reviews & comparisons
			</div>

			<h1 class="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl text-balance">
				Find Your Perfect
				<span class="gradient-text">Web Hosting</span>
			</h1>

			<p class="mb-10 text-xl text-gray-600 md:text-2xl text-balance">
				In-depth analysis, honest comparisons and expert opinions<br class="hidden md:block" />
				to help you make the right choice.
			</p>

			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a
					href="/posts/"
					class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105"
				>
					<span class="relative z-10">Browse Reviews</span>
					<svg class="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
					<div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
				</a>

				<a
					href="#features"
					class="glass group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-gray-700 transition-all hover:shadow-xl hover:scale-105"
				>
					Learn More
					<svg class="h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Features Section -->
<div id="features" class="bg-gradient-to-b from-white to-gray-50 py-24">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Why Trust Our Reviews?</h2>
			<p class="text-lg text-gray-600">
				We provide honest, in-depth analysis based on real testing and experience
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="group glass rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-2xl">
				<div class="mb-4 inline-flex rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-3 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Verified Testing</h3>
				<p class="text-gray-600">
					Every hosting provider is personally tested with real websites and workloads
				</p>
			</div>

			<div class="group glass rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-2xl">
				<div class="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Performance Metrics</h3>
				<p class="text-gray-600">
					Detailed speed tests, uptime monitoring, and real-world performance data
				</p>
			</div>

			<div class="group glass rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-2xl">
				<div class="mb-4 inline-flex rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-3 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Value Analysis</h3>
				<p class="text-gray-600">
					Transparent pricing breakdowns and feature comparisons to maximize value
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Featured posts -->
<div class="bg-gray-50 py-24">
	<div class="container mx-auto px-4">
		<div class="mb-16 flex items-end justify-between">
			<div>
				<h2 class="mb-2 text-4xl font-bold text-gray-900">Latest Reviews</h2>
				<p class="text-lg text-gray-600">Fresh insights and updated comparisons</p>
			</div>
			<a href="/posts/" class="group inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
				<span class="font-semibold">View all</span>
				<svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>

		{#if loading}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _}
					<div class="glass animate-pulse rounded-2xl p-6">
						<div class="mb-4 h-48 rounded-xl bg-gray-200"></div>
						<div class="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
						<div class="h-4 w-1/2 rounded bg-gray-200"></div>
					</div>
				{/each}
			</div>
		{:else if featuredPosts.length === 0}
			<div class="glass rounded-2xl p-16 text-center">
				<div class="mx-auto mb-4 inline-flex rounded-full bg-indigo-100 p-4">
					<svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Coming Soon</h3>
				<p class="text-gray-600">First articles on the way!</p>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredPosts as post}
					<article class="group glass rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
						{#if post.featured_image}
							<div class="relative overflow-hidden">
								<img
									src={post.featured_image}
									alt={post.title}
									class="h-48 w-full object-cover transition-transform group-hover:scale-110"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
							</div>
						{/if}
						<div class="p-6">
							<div class="mb-3 flex items-center gap-2">
								<span class="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
									{post.category}
								</span>
								{#if post.rating}
									<div class="flex items-center gap-1">
										<svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
											<path
												d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
											/>
										</svg>
										<span class="text-sm font-semibold text-gray-900">{post.rating.toFixed(1)}</span>
									</div>
								{/if}
							</div>

							<h3 class="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
								<a href="/posts/{post.slug}/" class="text-balance">
									{post.title}
								</a>
							</h3>

							{#if post.excerpt}
								<p class="mb-4 text-gray-600 line-clamp-2">{post.excerpt}</p>
							{/if}

							<a
								href="/posts/{post.slug}/"
								class="group/link inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
							>
								<span>Read More</span>
								<svg class="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- CTA Section -->
<div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24">
	<!-- Animated background -->
	<div class="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30"></div>
	<div class="absolute inset-0 bg-grid-white/10"></div>

	<div class="container relative mx-auto px-4">
		<div class="mx-auto max-w-3xl text-center text-white">
			<h2 class="mb-4 text-4xl font-bold md:text-5xl text-balance">
				Ready to Find Your Perfect Hosting?
			</h2>
			<p class="mb-10 text-xl text-indigo-100 text-balance">
				Join thousands of users who found their ideal hosting provider through our expert reviews
			</p>

			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a
					href="/posts/"
					class="glass-dark group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white transition-all hover:scale-105"
				>
					<span>Explore Reviews</span>
					<svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>

				<a
					href="/admin/"
					class="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
				>
					Admin
				</a>
			</div>
		</div>
	</div>
</div>
