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
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="text-2xl font-bold text-gray-900">HostingManual.net</a>
				<div class="flex gap-6">
					<a href="/" class="text-gray-700 hover:text-primary-600">Home</a>
					<a href="/posts/" class="text-gray-700 hover:text-primary-600">Blog</a>
					<a href="/admin/" class="text-gray-700 hover:text-primary-600">Admin</a>
				</div>
			</div>
		</div>
	</nav>
{/if}

{@render children()}

{#if !isAdmin}
	<footer class="border-t border-gray-200 bg-gray-50 py-8 mt-12">
		<div class="container mx-auto px-4 text-center text-gray-600">
			<p>&copy; {new Date().getFullYear()} HostingManual.net. All rights reserved.</p>
		</div>
	</footer>
{/if}
