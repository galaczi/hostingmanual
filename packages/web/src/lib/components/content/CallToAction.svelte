<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		buttonText: string;
		buttonLink: string;
		variant?: 'primary' | 'secondary';
	}

	let { title, description, buttonText, buttonLink, variant = 'primary' }: Props = $props();
</script>

<div
	class="rounded-lg p-8 shadow-sm {variant === 'primary'
		? 'bg-primary-600 text-white'
		: 'bg-gray-100 text-gray-900'}"
>
	<div class="mx-auto max-w-3xl text-center">
		<h3 class="text-2xl font-bold">{title}</h3>
		{#if description}
			<p class="mt-4 text-lg {variant === 'primary' ? 'text-primary-100' : 'text-gray-600'}">
				{description}
			</p>
		{/if}
		<div class="mt-6">
			<a
				href={buttonLink}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center rounded-lg px-6 py-3 font-medium transition {variant ===
				'primary'
					? 'bg-white text-primary-600 hover:bg-gray-100'
					: 'bg-primary-600 text-white hover:bg-primary-700'}"
			>
				{buttonText}
				<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>
