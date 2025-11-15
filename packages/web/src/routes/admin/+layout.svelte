<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	// Redirect to login if not authenticated
	$effect(() => {
		if (!$currentUser && $page.url.pathname !== '/admin/login/') {
			goto('/admin/login/');
		}
	});

	function handleLogout() {
		pb.authStore.clear();
		goto('/admin/login/');
	}

	const navItems = [
		{ href: '/admin/', label: 'Dashboard' },
		{ href: '/admin/posts/', label: 'Bejegyzések' },
		{ href: '/admin/pages/', label: 'Oldalak' },
		{ href: '/admin/providers/', label: 'Szolgáltatók' }
	];
</script>

{#if $page.url.pathname === '/admin/login/'}
	{@render children()}
{:else if $currentUser}
	<div class="flex min-h-screen bg-gray-100">
		<!-- Sidebar -->
		<aside class="w-64 bg-white shadow-md">
			<div class="p-6">
				<h1 class="text-2xl font-bold text-gray-900">HostingManual</h1>
				<p class="text-sm text-gray-600">CMS Admin</p>
			</div>

			<nav class="px-4">
				{#each navItems as item}
					<a
						href={item.href}
						class="mb-2 block rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 {$page.url
							.pathname === item.href
							? 'bg-primary-100 text-primary-700 font-medium'
							: ''}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="absolute bottom-0 w-64 border-t border-gray-200 p-4">
				<div class="mb-2 text-sm text-gray-600">
					Bejelentkezve: {$currentUser?.email}
				</div>
				<button
					onclick={handleLogout}
					class="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
				>
					Kijelentkezés
				</button>
			</div>
		</aside>

		<!-- Main content -->
		<main class="flex-1 p-8">
			<div class="container mx-auto">
				{@render children()}
			</div>
		</main>
	</div>
{/if}
