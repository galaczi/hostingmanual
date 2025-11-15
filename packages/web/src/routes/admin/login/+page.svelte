<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			await pb.collection('users').authWithPassword(email, password);
			goto('/admin/');
		} catch (err: any) {
			error = err.message || 'Sikertelen bejelentkezés';
		} finally {
			loading = false;
		}
	}

	// Redirect if already logged in
	$effect(() => {
		if ($currentUser) {
			goto('/admin/');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<div class="w-full max-w-md">
		<div class="rounded-lg bg-white px-8 py-10 shadow-md">
			<h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Admin bejelentkezés</h1>

			{#if error}
				<div class="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
					{error}
				</div>
			{/if}

			<form onsubmit={handleLogin}>
				<div class="mb-4">
					<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
						Email cím
					</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
					/>
				</div>

				<div class="mb-6">
					<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
						Jelszó
					</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white transition hover:bg-primary-700 disabled:opacity-50"
				>
					{loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
				</button>
			</form>
		</div>
	</div>
</div>
