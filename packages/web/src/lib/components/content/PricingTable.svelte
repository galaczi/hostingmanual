<script lang="ts">
	interface PricingPlan {
		name: string;
		price: string;
		period: string;
		features: string[];
		highlighted?: boolean;
		link?: string;
		buttonText?: string;
	}

	interface Props {
		plans: PricingPlan[];
		title?: string;
	}

	let { plans = [], title }: Props = $props();
</script>

<div class="py-8">
	{#if title}
		<h3 class="mb-8 text-center text-2xl font-bold text-gray-900">{title}</h3>
	{/if}

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each plans as plan}
			<div
				class="flex flex-col rounded-lg border shadow-sm transition hover:shadow-md {plan.highlighted
					? 'border-primary-500 ring-2 ring-primary-500'
					: 'border-gray-200'}"
			>
				{#if plan.highlighted}
					<div class="rounded-t-lg bg-primary-600 px-6 py-2 text-center text-sm font-medium text-white">
						Ajánlott
					</div>
				{/if}

				<div class="flex flex-1 flex-col p-6">
					<h4 class="text-xl font-bold text-gray-900">{plan.name}</h4>

					<div class="mt-4 flex items-baseline gap-1">
						<span class="text-4xl font-extrabold text-gray-900">{plan.price}</span>
						<span class="text-gray-500">/ {plan.period}</span>
					</div>

					<ul class="mt-6 flex-1 space-y-3">
						{#each plan.features as feature}
							<li class="flex items-start">
								<svg class="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="text-gray-700">{feature}</span>
							</li>
						{/each}
					</ul>

					{#if plan.link}
						<div class="mt-6">
							<a
								href={plan.link}
								target="_blank"
								rel="noopener noreferrer"
								class="block w-full rounded-lg px-4 py-3 text-center text-sm font-medium transition {plan.highlighted
									? 'bg-primary-600 text-white hover:bg-primary-700'
									: 'bg-gray-100 text-gray-900 hover:bg-gray-200'}"
							>
								{plan.buttonText || 'Kiválasztás'}
							</a>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
