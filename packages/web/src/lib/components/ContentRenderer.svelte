<script lang="ts">
	import RatingCard from './content/RatingCard.svelte';
	import ProsCons from './content/ProsCons.svelte';
	import ComparisonTable from './content/ComparisonTable.svelte';
	import PricingTable from './content/PricingTable.svelte';
	import CallToAction from './content/CallToAction.svelte';
	import Alert from './content/Alert.svelte';

	interface Props {
		content: any;
	}

	let { content }: Props = $props();

	// Parse Tiptap JSON content
	function renderNode(node: any): any {
		if (!node) return null;

		// Handle text nodes
		if (node.type === 'text') {
			let text = node.text;

			// Apply marks (bold, italic, etc.)
			if (node.marks) {
				for (const mark of node.marks) {
					if (mark.type === 'bold') {
						text = { type: 'bold', text };
					} else if (mark.type === 'italic') {
						text = { type: 'italic', text };
					} else if (mark.type === 'code') {
						text = { type: 'code', text };
					} else if (mark.type === 'link') {
						text = { type: 'link', text, href: mark.attrs.href };
					}
				}
			}

			return text;
		}

		// Handle block nodes
		return {
			type: node.type,
			attrs: node.attrs,
			content: node.content ? node.content.map(renderNode) : []
		};
	}

	const parsedContent = $derived(
		content?.content ? content.content.map(renderNode) : []
	);

	// Render text with marks
	function renderText(text: any): any {
		if (typeof text === 'string') {
			return text;
		}
		if (text.type === 'bold') {
			return { tag: 'strong', content: renderText(text.text) };
		}
		if (text.type === 'italic') {
			return { tag: 'em', content: renderText(text.text) };
		}
		if (text.type === 'code') {
			return { tag: 'code', content: renderText(text.text) };
		}
		if (text.type === 'link') {
			return { tag: 'a', href: text.href, content: renderText(text.text) };
		}
		return text;
	}
</script>

<div class="prose prose-lg max-w-none">
	{#each parsedContent as node}
		{#if node.type === 'heading'}
			{#if node.attrs.level === 1}
				<h1>
					{#each node.content as child}
						{@const rendered = renderText(child)}
						{#if typeof rendered === 'string'}
							{rendered}
						{:else if rendered.tag === 'strong'}
							<strong>{rendered.content}</strong>
						{:else if rendered.tag === 'em'}
							<em>{rendered.content}</em>
						{:else if rendered.tag === 'code'}
							<code>{rendered.content}</code>
						{:else if rendered.tag === 'a'}
							<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
						{/if}
					{/each}
				</h1>
			{:else if node.attrs.level === 2}
				<h2>
					{#each node.content as child}
						{@const rendered = renderText(child)}
						{#if typeof rendered === 'string'}
							{rendered}
						{:else if rendered.tag === 'strong'}
							<strong>{rendered.content}</strong>
						{:else if rendered.tag === 'em'}
							<em>{rendered.content}</em>
						{:else if rendered.tag === 'code'}
							<code>{rendered.content}</code>
						{:else if rendered.tag === 'a'}
							<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
						{/if}
					{/each}
				</h2>
			{:else if node.attrs.level === 3}
				<h3>
					{#each node.content as child}
						{@const rendered = renderText(child)}
						{#if typeof rendered === 'string'}
							{rendered}
						{:else if rendered.tag === 'strong'}
							<strong>{rendered.content}</strong>
						{:else if rendered.tag === 'em'}
							<em>{rendered.content}</em>
						{:else if rendered.tag === 'code'}
							<code>{rendered.content}</code>
						{:else if rendered.tag === 'a'}
							<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
						{/if}
					{/each}
				</h3>
			{/if}
		{:else if node.type === 'paragraph'}
			<p>
				{#each node.content as child}
					{@const rendered = renderText(child)}
					{#if typeof rendered === 'string'}
						{rendered}
					{:else if rendered.tag === 'strong'}
						<strong>{rendered.content}</strong>
					{:else if rendered.tag === 'em'}
						<em>{rendered.content}</em>
					{:else if rendered.tag === 'code'}
						<code>{rendered.content}</code>
					{:else if rendered.tag === 'a'}
						<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
					{/if}
				{/each}
			</p>
		{:else if node.type === 'bulletList'}
			<ul>
				{#each node.content as item}
					<li>
						{#each item.content as paragraph}
							{#each paragraph.content as child}
								{@const rendered = renderText(child)}
								{#if typeof rendered === 'string'}
									{rendered}
								{:else if rendered.tag === 'strong'}
									<strong>{rendered.content}</strong>
								{:else if rendered.tag === 'em'}
									<em>{rendered.content}</em>
								{:else if rendered.tag === 'code'}
									<code>{rendered.content}</code>
								{:else if rendered.tag === 'a'}
									<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
								{/if}
							{/each}
						{/each}
					</li>
				{/each}
			</ul>
		{:else if node.type === 'orderedList'}
			<ol>
				{#each node.content as item}
					<li>
						{#each item.content as paragraph}
							{#each paragraph.content as child}
								{@const rendered = renderText(child)}
								{#if typeof rendered === 'string'}
									{rendered}
								{:else if rendered.tag === 'strong'}
									<strong>{rendered.content}</strong>
								{:else if rendered.tag === 'em'}
									<em>{rendered.content}</em>
								{:else if rendered.tag === 'code'}
									<code>{rendered.content}</code>
								{:else if rendered.tag === 'a'}
									<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
								{/if}
							{/each}
						{/each}
					</li>
				{/each}
			</ol>
		{:else if node.type === 'codeBlock'}
			<pre><code>{#each node.content as child}{child}{/each}</code></pre>
		{:else if node.type === 'image'}
			<img src={node.attrs.src} alt={node.attrs.alt || ''} />
		{:else if node.type === 'ratingCard'}
			<RatingCard
				providerName={node.attrs.providerName}
				rating={node.attrs.rating}
				logo={node.attrs.logo}
				description={node.attrs.description}
				affiliateLink={node.attrs.affiliateLink}
				ctaText={node.attrs.ctaText}
			/>
		{:else if node.type === 'prosCons'}
			<ProsCons pros={node.attrs.pros} cons={node.attrs.cons} title={node.attrs.title} />
		{:else if node.type === 'comparisonTable'}
			<ComparisonTable
				providers={node.attrs.providers}
				featureLabels={node.attrs.featureLabels}
				title={node.attrs.title}
			/>
		{:else if node.type === 'pricingTable'}
			<PricingTable plans={node.attrs.plans} title={node.attrs.title} />
		{:else if node.type === 'callToAction'}
			<CallToAction
				title={node.attrs.title}
				description={node.attrs.description}
				buttonText={node.attrs.buttonText}
				buttonLink={node.attrs.buttonLink}
				variant={node.attrs.variant}
			/>
		{:else if node.type === 'alert'}
			<Alert type={node.attrs.type} title={node.attrs.title}>
				{#each node.content as child}
					{@const rendered = renderText(child)}
					{#if typeof rendered === 'string'}
						{rendered}
					{:else if rendered.tag === 'strong'}
						<strong>{rendered.content}</strong>
					{:else if rendered.tag === 'em'}
						<em>{rendered.content}</em>
					{:else if rendered.tag === 'code'}
						<code>{rendered.content}</code>
					{:else if rendered.tag === 'a'}
						<a href={rendered.href} target="_blank" rel="noopener noreferrer">{rendered.content}</a>
					{/if}
				{/each}
			</Alert>
		{/if}
	{/each}
</div>
