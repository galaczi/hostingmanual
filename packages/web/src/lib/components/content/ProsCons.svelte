<script lang="ts">
	interface Props {
		pros: string[];
		cons: string[];
		title?: string;
	}

	let { pros = [], cons = [], title }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	{#if title}
		<h3 class="mb-4 text-xl font-bold text-gray-900">{title}</h3>
	{/if}

	<div class="grid gap-6 md:grid-cols-2">
		<!-- Pros -->
		<div>
			<h4 class="mb-3 flex items-center text-lg font-semibold text-green-700">
				<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				Előnyök
			</h4>
			<ul class="space-y-2">
				{#each pros as pro}
					<li class="flex items-start">
						<svg class="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-gray-700">{pro}</span>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Cons -->
		<div>
			<h4 class="mb-3 flex items-center text-lg font-semibold text-red-700">
				<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clip-rule="evenodd"
					/>
				</svg>
				Hátrányok
			</h4>
			<ul class="space-y-2">
				{#each cons as con}
					<li class="flex items-start">
						<svg class="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-gray-700">{con}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
