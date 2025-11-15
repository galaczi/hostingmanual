<script lang="ts">
	import { pb, currentUser, type Post, type HostingProvider } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TiptapEditor from '$lib/components/editor/TiptapEditor.svelte';

	const postId = $derived($page.params.id);
	const isNew = $derived(postId === 'new');

	let post = $state<Partial<Post>>({
		title: '',
		slug: '',
		content: { type: 'doc', content: [] },
		excerpt: '',
		category: 'review',
		published: false,
		author: $currentUser?.id || ''
	});

	let providers = $state<HostingProvider[]>([]);
	let loading = $state(!isNew);
	let saving = $state(false);

	onMount(async () => {
		try {
			// Load hosting providers
			const providersResult = await pb.collection('hosting_providers').getList<HostingProvider>(1, 100, {
				filter: 'active = true',
				sort: 'name'
			});
			providers = providersResult.items;

			// Load post if editing
			if (!isNew) {
				const result = await pb.collection('posts').getOne<Post>(postId);
				post = result;
			}
		} catch (err) {
			console.error('Error loading data:', err);
		} finally {
			loading = false;
		}
	});

	function generateSlug(title: string) {
		return title
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	}

	function handleTitleChange() {
		if (isNew && post.title) {
			post.slug = generateSlug(post.title);
		}
	}

	async function handleSave() {
		if (!post.title || !post.slug) {
			alert('A cím és a slug kötelező!');
			return;
		}

		saving = true;

		try {
			const data = {
				...post,
				author: $currentUser?.id
			};

			if (isNew) {
				const created = await pb.collection('posts').create(data);
				goto(`/admin/posts/${created.id}/`);
			} else {
				await pb.collection('posts').update(postId, data);
				alert('Sikeresen mentve!');
			}
		} catch (err: any) {
			console.error('Error saving post:', err);
			alert(err.message || 'Hiba történt a mentés során');
		} finally {
			saving = false;
		}
	}
</script>

<div>
	<div class="mb-6">
		<a href="/admin/posts/" class="text-sm text-gray-600 hover:underline">← Vissza a bejegyzésekhez</a>
	</div>

	<h1 class="mb-8 text-3xl font-bold text-gray-900">
		{isNew ? 'Új bejegyzés' : 'Bejegyzés szerkesztése'}
	</h1>

	{#if loading}
		<div class="text-center py-12">
			<p class="text-gray-600">Betöltés...</p>
		</div>
	{:else}
		<form onsubmit={(e) => { e.preventDefault(); handleSave(); }}>
			<div class="grid gap-6 lg:grid-cols-3">
				<!-- Main content -->
				<div class="lg:col-span-2 space-y-6">
					<div class="rounded-lg bg-white p-6 shadow-sm">
						<div class="mb-4">
							<label for="title" class="mb-2 block text-sm font-medium text-gray-700">
								Cím *
							</label>
							<input
								type="text"
								id="title"
								bind:value={post.title}
								oninput={handleTitleChange}
								required
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>

						<div class="mb-4">
							<label for="slug" class="mb-2 block text-sm font-medium text-gray-700">
								Slug *
							</label>
							<input
								type="text"
								id="slug"
								bind:value={post.slug}
								required
								pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							<p class="mt-1 text-xs text-gray-500">Csak kisbetű, szám és kötőjel</p>
						</div>

						<div class="mb-6">
							<label for="excerpt" class="mb-2 block text-sm font-medium text-gray-700">
								Kivonat
							</label>
							<textarea
								id="excerpt"
								bind:value={post.excerpt}
								rows="3"
								maxlength="500"
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							></textarea>
						</div>

						<div>
							<label class="mb-2 block text-sm font-medium text-gray-700">
								Tartalom
							</label>
							<TiptapEditor
								content={post.content}
								onUpdate={(content) => { post.content = content; }}
							/>
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<div class="rounded-lg bg-white p-6 shadow-sm">
						<h3 class="mb-4 font-medium text-gray-900">Publikálás</h3>

						<div class="mb-4">
							<label class="flex items-center">
								<input
									type="checkbox"
									bind:checked={post.published}
									class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
								/>
								<span class="ml-2 text-sm text-gray-700">Publikálva</span>
							</label>
						</div>

						<button
							type="submit"
							disabled={saving}
							class="w-full rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition hover:bg-primary-700 disabled:opacity-50"
						>
							{saving ? 'Mentés...' : 'Mentés'}
						</button>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-sm">
						<h3 class="mb-4 font-medium text-gray-900">Beállítások</h3>

						<div class="mb-4">
							<label for="category" class="mb-2 block text-sm font-medium text-gray-700">
								Kategória *
							</label>
							<select
								id="category"
								bind:value={post.category}
								required
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="review">Review</option>
								<option value="comparison">Összehasonlítás</option>
								<option value="guide">Útmutató</option>
								<option value="news">Hírek</option>
								<option value="tutorial">Tutorial</option>
							</select>
						</div>

						<div class="mb-4">
							<label for="provider" class="mb-2 block text-sm font-medium text-gray-700">
								Hosting szolgáltató
							</label>
							<select
								id="provider"
								bind:value={post.hosting_provider}
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="">-- Válassz --</option>
								{#each providers as provider}
									<option value={provider.id}>{provider.name}</option>
								{/each}
							</select>
						</div>

						<div class="mb-4">
							<label for="rating" class="mb-2 block text-sm font-medium text-gray-700">
								Értékelés (0-5)
							</label>
							<input
								type="number"
								id="rating"
								bind:value={post.rating}
								min="0"
								max="5"
								step="0.1"
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-sm">
						<h3 class="mb-4 font-medium text-gray-900">SEO</h3>

						<div class="mb-4">
							<label for="meta_title" class="mb-2 block text-sm font-medium text-gray-700">
								Meta cím
							</label>
							<input
								type="text"
								id="meta_title"
								bind:value={post.meta_title}
								maxlength="60"
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							<p class="mt-1 text-xs text-gray-500">Max 60 karakter</p>
						</div>

						<div>
							<label for="meta_description" class="mb-2 block text-sm font-medium text-gray-700">
								Meta leírás
							</label>
							<textarea
								id="meta_description"
								bind:value={post.meta_description}
								rows="3"
								maxlength="160"
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							></textarea>
							<p class="mt-1 text-xs text-gray-500">Max 160 karakter</p>
						</div>
					</div>
				</div>
			</div>
		</form>
	{/if}
</div>
