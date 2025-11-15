<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let stats = $state({
		posts: 0,
		pages: 0,
		providers: 0
	});

	onMount(async () => {
		try {
			const [posts, pages, providers] = await Promise.all([
				pb.collection('posts').getList(1, 1),
				pb.collection('pages').getList(1, 1),
				pb.collection('hosting_providers').getList(1, 1)
			]);

			stats = {
				posts: posts.totalItems,
				pages: pages.totalItems,
				providers: providers.totalItems
			};
		} catch (err) {
			console.error('Error loading stats:', err);
		}
	});
</script>

<div>
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

	<div class="grid gap-6 md:grid-cols-3">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Bejegyzések</p>
					<p class="mt-2 text-3xl font-bold text-gray-900">{stats.posts}</p>
				</div>
				<div class="rounded-full bg-primary-100 p-3">
					<svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
			</div>
			<a href="/admin/posts/" class="mt-4 inline-block text-sm text-primary-600 hover:underline">
				Megtekintés →
			</a>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Oldalak</p>
					<p class="mt-2 text-3xl font-bold text-gray-900">{stats.pages}</p>
				</div>
				<div class="rounded-full bg-green-100 p-3">
					<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
				</div>
			</div>
			<a href="/admin/pages/" class="mt-4 inline-block text-sm text-primary-600 hover:underline">
				Megtekintés →
			</a>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Hosting Szolgáltatók</p>
					<p class="mt-2 text-3xl font-bold text-gray-900">{stats.providers}</p>
				</div>
				<div class="rounded-full bg-yellow-100 p-3">
					<svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
						/>
					</svg>
				</div>
			</div>
			<a href="/admin/providers/" class="mt-4 inline-block text-sm text-primary-600 hover:underline">
				Megtekintés →
			</a>
		</div>
	</div>

	<div class="mt-8 rounded-lg bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-bold text-gray-900">Gyors műveletek</h2>
		<div class="grid gap-4 md:grid-cols-3">
			<a
				href="/admin/posts/new/"
				class="block rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-primary-500"
			>
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<p class="mt-2 font-medium text-gray-900">Új bejegyzés</p>
			</a>

			<a
				href="/admin/pages/new/"
				class="block rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-primary-500"
			>
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<p class="mt-2 font-medium text-gray-900">Új oldal</p>
			</a>

			<a
				href="/admin/providers/new/"
				class="block rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-primary-500"
			>
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<p class="mt-2 font-medium text-gray-900">Új szolgáltató</p>
			</a>
		</div>
	</div>
</div>
