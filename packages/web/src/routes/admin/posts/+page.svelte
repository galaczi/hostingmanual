<script lang="ts">
	import { pb, type Post } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let posts = $state<Post[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const result = await pb.collection('posts').getList<Post>(1, 50, {
				sort: '-created',
				expand: 'author,hosting_provider'
			});
			posts = result.items;
		} catch (err) {
			console.error('Error loading posts:', err);
		} finally {
			loading = false;
		}
	});

	async function deletePost(id: string) {
		if (!confirm('Biztosan törölni szeretnéd ezt a bejegyzést?')) return;

		try {
			await pb.collection('posts').delete(id);
			posts = posts.filter((p) => p.id !== id);
		} catch (err) {
			console.error('Error deleting post:', err);
			alert('Hiba történt a törlés során');
		}
	}
</script>

<div>
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900">Bejegyzések</h1>
		<a
			href="/admin/posts/new/"
			class="rounded-lg bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700"
		>
			Új bejegyzés
		</a>
	</div>

	{#if loading}
		<div class="text-center py-12">
			<p class="text-gray-600">Betöltés...</p>
		</div>
	{:else if posts.length === 0}
		<div class="rounded-lg bg-white p-12 text-center shadow-sm">
			<p class="text-gray-600">Még nincsenek bejegyzések</p>
			<a
				href="/admin/posts/new/"
				class="mt-4 inline-block text-primary-600 hover:underline"
			>
				Hozz létre egyet →
			</a>
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg bg-white shadow-sm">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Cím
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Kategória
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Állapot
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Létrehozva
						</th>
						<th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
							Műveletek
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each posts as post}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4">
								<div class="font-medium text-gray-900">{post.title}</div>
								<div class="text-sm text-gray-500">{post.slug}</div>
							</td>
							<td class="px-6 py-4 text-sm text-gray-900">{post.category}</td>
							<td class="px-6 py-4">
								{#if post.published}
									<span class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
										Publikálva
									</span>
								{:else}
									<span class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
										Piszkozat
									</span>
								{/if}
							</td>
							<td class="px-6 py-4 text-sm text-gray-500">
								{new Date(post.created).toLocaleDateString('hu-HU')}
							</td>
							<td class="px-6 py-4 text-right text-sm font-medium">
								<a
									href="/admin/posts/{post.id}/"
									class="mr-4 text-primary-600 hover:underline"
								>
									Szerkesztés
								</a>
								<button
									onclick={() => deletePost(post.id)}
									class="text-red-600 hover:underline"
								>
									Törlés
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
