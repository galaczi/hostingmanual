<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const featuredPosts = $derived(data.featuredPosts);
</script>

<!-- Hero section -->
<section class="relative bg-white px-4 py-24 md:py-32">
	<div class="container mx-auto max-w-5xl">
		<div class="text-center">
			<h1 class="mb-6 text-balance">
				Expert Web Hosting<br />Reviews & Comparisons
			</h1>

			<p class="mx-auto mb-12 max-w-2xl text-xl text-muted text-balance">
				Make informed decisions with our in-depth, unbiased hosting provider reviews.
				Real testing, real results.
			</p>

			<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="/posts/" class="btn-primary">
					Browse Reviews
				</a>
				<a href="#latest" class="btn-secondary">
					Latest Articles
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Stats/Social Proof -->
<section class="border-y border-gray-200 bg-gray-50 px-4 py-12">
	<div class="container mx-auto max-w-5xl">
		<div class="grid grid-cols-3 gap-8 text-center">
			<div>
				<div class="mb-1 text-3xl font-semibold">50+</div>
				<div class="text-sm text-muted">Providers Reviewed</div>
			</div>
			<div>
				<div class="mb-1 text-3xl font-semibold">100%</div>
				<div class="text-sm text-muted">Unbiased Testing</div>
			</div>
			<div>
				<div class="mb-1 text-3xl font-semibold">24/7</div>
				<div class="text-sm text-muted">Uptime Monitoring</div>
			</div>
		</div>
	</div>
</section>

<!-- Featured posts -->
<section id="latest" class="bg-white px-4 py-24">
	<div class="container mx-auto max-w-6xl">
		<div class="mb-16 flex items-end justify-between">
			<div>
				<h2 class="mb-2">Latest Reviews</h2>
				<p class="text-lg text-muted">Fresh insights from real-world testing</p>
			</div>
			<a href="/posts/" class="hidden text-sm font-medium text-gray-900 hover:text-accent sm:block">
				View all →
			</a>
		</div>

		{#if featuredPosts.length === 0}
			<div class="card p-16 text-center">
				<p class="text-muted">No articles yet. Check back soon!</p>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredPosts as post}
					<article class="card-hover group">
						{#if post.featured_image}
							<div class="overflow-hidden rounded-t-xl">
								<img
									src={post.featured_image}
									alt={post.title}
									class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
						{/if}
						<div class="p-6">
							<div class="mb-3 flex items-center gap-3 text-sm">
								<span class="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
									{post.category}
								</span>
								{#if post.rating}
									<div class="flex items-center gap-1">
										<svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
											<path
												d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
											/>
										</svg>
										<span class="font-semibold text-gray-900">{post.rating.toFixed(1)}</span>
									</div>
								{/if}
							</div>

							<h3 class="mb-2 font-semibold text-gray-900 group-hover:text-accent transition-colors">
								<a href="/posts/{post.slug}/" class="text-balance">
									{post.title}
								</a>
							</h3>

							{#if post.excerpt}
								<p class="mb-4 text-sm text-muted line-clamp-2">{post.excerpt}</p>
							{/if}

							<a
								href="/posts/{post.slug}/"
								class="inline-flex items-center text-sm font-medium text-gray-900 hover:text-accent transition-colors"
							>
								Read review
								<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- How We Test -->
<section class="border-t border-gray-200 bg-gray-50 px-4 py-24">
	<div class="container mx-auto max-w-5xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4">Our Testing Process</h2>
			<p class="text-lg text-muted">Transparent methodology, real results</p>
		</div>

		<div class="grid gap-12 md:grid-cols-3">
			<div>
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Real Testing</h3>
				<p class="text-muted">
					Every host is tested with actual websites and workloads over extended periods.
				</p>
			</div>

			<div>
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Performance Data</h3>
				<p class="text-muted">
					Detailed metrics on speed, uptime, and reliability from our monitoring tools.
				</p>
			</div>

			<div>
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold">Value Analysis</h3>
				<p class="text-muted">
					Honest pricing breakdowns with feature comparisons to help you decide.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-white px-4 py-24">
	<div class="container mx-auto max-w-3xl text-center">
		<h2 class="mb-4">Find Your Perfect Host</h2>
		<p class="mb-10 text-xl text-muted text-balance">
			Browse our comprehensive reviews and make an informed decision
		</p>
		<a href="/posts/" class="btn-primary">
			View All Reviews
		</a>
	</div>
</section>
