<script lang="ts">
	interface Provider {
		name: string;
		logo?: string;
		rating: number;
		price: string;
		features: { [key: string]: boolean | string };
		link?: string;
	}

	interface Props {
		providers: Provider[];
		featureLabels: { [key: string]: string };
		title?: string;
	}

	let { providers = [], featureLabels = {}, title }: Props = $props();

	const featureKeys = $derived(Object.keys(featureLabels));
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	{#if title}
		<div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
			<h3 class="text-xl font-bold text-gray-900">{title}</h3>
		</div>
	{/if}

	<div class="overflow-x-auto">
		<table class="w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
						Szolgáltató
					</th>
					{#each providers as provider}
						<th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
							<div class="flex flex-col items-center gap-2">
								{#if provider.logo}
									<img src={provider.logo} alt={provider.name} class="h-12 w-auto object-contain" />
								{/if}
								<span>{provider.name}</span>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				<!-- Rating row -->
				<tr>
					<td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Értékelés</td>
					{#each providers as provider}
						<td class="whitespace-nowrap px-6 py-4 text-center">
							<div class="flex items-center justify-center gap-1">
								<span class="text-lg font-bold text-gray-900">{provider.rating.toFixed(1)}</span>
								<svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							</div>
						</td>
					{/each}
				</tr>

				<!-- Price row -->
				<tr class="bg-gray-50">
					<td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Ár</td>
					{#each providers as provider}
						<td class="whitespace-nowrap px-6 py-4 text-center">
							<span class="text-lg font-semibold text-gray-900">{provider.price}</span>
						</td>
					{/each}
				</tr>

				<!-- Feature rows -->
				{#each featureKeys as key, index}
					<tr class={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
						<td class="px-6 py-4 text-sm font-medium text-gray-900">{featureLabels[key]}</td>
						{#each providers as provider}
							<td class="px-6 py-4 text-center">
								{#if typeof provider.features[key] === 'boolean'}
									{#if provider.features[key]}
										<svg class="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/>
										</svg>
									{:else}
										<svg class="mx-auto h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									{/if}
								{:else}
									<span class="text-sm text-gray-700">{provider.features[key]}</span>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}

				<!-- CTA row -->
				<tr>
					<td class="px-6 py-4 text-sm font-medium text-gray-900">
						<!-- Empty cell -->
					</td>
					{#each providers as provider}
						<td class="px-6 py-4 text-center">
							{#if provider.link}
								<a
									href={provider.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
								>
									Részletek
								</a>
							{/if}
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</div>
