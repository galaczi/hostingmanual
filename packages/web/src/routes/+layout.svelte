<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';

	let { children } = $props();

	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
	let scrollY = $state(0);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				scrollY = window.scrollY;
			};
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	const navClasses = $derived(
		scrollY > 20
			? 'glass shadow-lg'
			: 'bg-transparent'
	);
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
	<nav class="fixed top-0 z-50 w-full transition-all duration-300 {navClasses}">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="group flex items-center gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
						</svg>
					</div>
					<span class="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
						HostingManual
					</span>
				</a>

				<div class="flex items-center gap-1">
					<a
						href="/"
						class="rounded-lg px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600 {$page.url.pathname === '/' ? 'text-indigo-600' : ''}"
					>
						Home
					</a>
					<a
						href="/posts/"
						class="rounded-lg px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600 {$page.url.pathname.startsWith('/posts') ? 'text-indigo-600' : ''}"
					>
						Blog
					</a>
					<a
						href="/admin/"
						class="ml-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 font-medium text-white shadow-md shadow-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
					>
						Admin
					</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Spacer for fixed nav -->
	<div class="h-20"></div>
{/if}

{@render children()}

{#if !isAdmin}
	<footer class="border-t border-gray-200 bg-gray-50 py-16">
		<div class="container mx-auto px-4">
			<div class="grid gap-12 md:grid-cols-3">
				<!-- Brand -->
				<div>
					<div class="mb-4 flex items-center gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
							</svg>
						</div>
						<span class="text-xl font-bold text-gray-900">HostingManual</span>
					</div>
					<p class="text-gray-600">
						Expert hosting reviews and comparisons to help you find the perfect web hosting provider.
					</p>
				</div>

				<!-- Links -->
				<div>
					<h3 class="mb-4 font-semibold text-gray-900">Quick Links</h3>
					<ul class="space-y-2">
						<li>
							<a href="/" class="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
						</li>
						<li>
							<a href="/posts/" class="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a>
						</li>
						<li>
							<a href="/admin/" class="text-gray-600 hover:text-indigo-600 transition-colors">Admin</a>
						</li>
					</ul>
				</div>

				<!-- Newsletter -->
				<div>
					<h3 class="mb-4 font-semibold text-gray-900">Stay Updated</h3>
					<p class="mb-4 text-sm text-gray-600">
						Get the latest hosting reviews and tips delivered to your inbox.
					</p>
					<div class="flex gap-2">
						<input
							type="email"
							placeholder="Your email"
							class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						<button class="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/50">
							Subscribe
						</button>
					</div>
				</div>
			</div>

			<div class="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
				<p>&copy; {new Date().getFullYear()} HostingManual.net. All rights reserved.</p>
			</div>
		</div>
	</footer>
{/if}
