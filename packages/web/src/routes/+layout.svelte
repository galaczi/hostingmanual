<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';

	let { children } = $props();

	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

{#if !isAdmin}
	<MetaTags
		title="HostingManual.net - Web Hosting Reviews and Guides"
		description="Comprehensive web hosting reviews, comparisons and guides. Find the best hosting provider for your needs."
		canonical="https://hostingmanual.net{$page.url.pathname}"
		openGraph={{
			type: 'website',
			url: `https://hostingmanual.net${$page.url.pathname}`,
			title: 'HostingManual.net - Web Hosting Reviews',
			description: 'Comprehensive web hosting reviews, comparisons and guides.',
			siteName: 'HostingManual.net'
		}}
		twitter={{
			cardType: 'summary_large_image',
			title: 'HostingManual.net',
			description: 'Comprehensive web hosting reviews and guides.'
		}}
	/>
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !isAdmin}
	<nav class="border-b border-gray-200 bg-white">
		<div class="container mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<a href="/" class="flex items-center gap-2 font-semibold text-gray-900">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
					</svg>
					<span>HostingManual</span>
				</a>

				<div class="flex items-center gap-8">
					<a
						href="/"
						class="text-sm font-medium transition-colors {$page.url.pathname === '/'
							? 'text-gray-900'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						Home
					</a>
					<a
						href="/posts/"
						class="text-sm font-medium transition-colors {$page.url.pathname.startsWith('/posts')
							? 'text-gray-900'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						Reviews
					</a>
					<a
						href="/admin/"
						class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
					>
						Admin
					</a>
				</div>
			</div>
		</div>
	</nav>
{/if}

{@render children()}

{#if !isAdmin}
	<footer class="border-t border-gray-200 bg-white px-4 py-16">
		<div class="container mx-auto max-w-6xl">
			<div class="grid gap-12 md:grid-cols-4">
				<!-- Brand -->
				<div class="md:col-span-2">
					<div class="mb-3 flex items-center gap-2 font-semibold text-gray-900">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
						</svg>
						<span>HostingManual</span>
					</div>
					<p class="max-w-sm text-sm text-muted">
						Expert hosting reviews and comparisons. Make informed decisions with real testing data.
					</p>
				</div>

				<!-- Links -->
				<div>
					<h3 class="mb-3 text-sm font-semibold text-gray-900">Navigation</h3>
					<ul class="space-y-2 text-sm">
						<li>
							<a href="/" class="text-muted hover:text-gray-900 transition-colors">Home</a>
						</li>
						<li>
							<a href="/posts/" class="text-muted hover:text-gray-900 transition-colors">Reviews</a>
						</li>
						<li>
							<a href="/admin/" class="text-muted hover:text-gray-900 transition-colors">Admin</a>
						</li>
					</ul>
				</div>

				<!-- Legal -->
				<div>
					<h3 class="mb-3 text-sm font-semibold text-gray-900">Legal</h3>
					<ul class="space-y-2 text-sm">
						<li>
							<a href="/privacy/" class="text-muted hover:text-gray-900 transition-colors">Privacy</a>
						</li>
						<li>
							<a href="/terms/" class="text-muted hover:text-gray-900 transition-colors">Terms</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-muted">
				<p>&copy; {new Date().getFullYear()} HostingManual.net. All rights reserved.</p>
			</div>
		</div>
	</footer>
{/if}
