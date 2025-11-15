<script lang="ts">
	interface Props {
		providerName: string;
		rating: number;
		logo?: string;
		description?: string;
		affiliateLink?: string;
		ctaText?: string;
	}

	let { providerName, rating, logo, description, affiliateLink, ctaText = 'Részletek' }: Props =
		$props();

	// Generate star rating
	const stars = $derived(
		Array.from({ length: 5 }, (_, i) => ({
			filled: i < Math.floor(rating),
			half: i === Math.floor(rating) && rating % 1 >= 0.5
		}))
	);
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
	<div class="flex items-start gap-4">
		{#if logo}
			<img src={logo} alt={providerName} class="h-16 w-16 rounded object-contain" />
		{/if}
		<div class="flex-1">
			<h3 class="text-xl font-bold text-gray-900">{providerName}</h3>
			<div class="mt-2 flex items-center gap-2">
				<div class="flex gap-1">
					{#each stars as star}
						{#if star.filled}
							<svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						{:else if star.half}
							<svg class="h-5 w-5" viewBox="0 0 20 20">
								<defs>
									<linearGradient id="half-fill">
										<stop offset="50%" stop-color="#FBBF24" />
										<stop offset="50%" stop-color="#E5E7EB" />
									</linearGradient>
								</defs>
								<path
									fill="url(#half-fill)"
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						{:else}
							<svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						{/if}
					{/each}
				</div>
				<span class="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
			</div>
		</div>
	</div>

	{#if description}
		<p class="mt-4 text-gray-600">{description}</p>
	{/if}

	{#if affiliateLink}
		<div class="mt-4">
			<a
				href={affiliateLink}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
			>
				{ctaText}
				<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</a>
		</div>
	{/if}
</div>
