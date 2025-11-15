<script lang="ts">
	interface Props {
		type?: 'info' | 'warning' | 'success' | 'error';
		title?: string;
		children: any;
	}

	let { type = 'info', title, children }: Props = $props();

	const config = $derived({
		info: {
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			icon: 'text-blue-500',
			title: 'text-blue-900',
			text: 'text-blue-800'
		},
		warning: {
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			icon: 'text-yellow-500',
			title: 'text-yellow-900',
			text: 'text-yellow-800'
		},
		success: {
			bg: 'bg-green-50',
			border: 'border-green-200',
			icon: 'text-green-500',
			title: 'text-green-900',
			text: 'text-green-800'
		},
		error: {
			bg: 'bg-red-50',
			border: 'border-red-200',
			icon: 'text-red-500',
			title: 'text-red-900',
			text: 'text-red-800'
		}
	}[type]);

	const icons = {
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		warning:
			'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		error:
			'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
	};
</script>

<div class="rounded-lg border p-4 {config.bg} {config.border}">
	<div class="flex">
		<div class="flex-shrink-0">
			<svg class="h-5 w-5 {config.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[type]} />
			</svg>
		</div>
		<div class="ml-3 flex-1">
			{#if title}
				<h4 class="font-medium {config.title}">{title}</h4>
			{/if}
			<div class="mt-2 text-sm {config.text}">
				{@render children()}
			</div>
		</div>
	</div>
</div>
