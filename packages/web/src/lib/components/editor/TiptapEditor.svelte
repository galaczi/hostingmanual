<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import { Node } from '@tiptap/core';

	interface Props {
		content: any;
		onUpdate?: (content: any) => void;
		editable?: boolean;
	}

	let { content = { type: 'doc', content: [] }, onUpdate, editable = true }: Props = $props();

	let element: HTMLElement;
	let editor: Editor;

	// Custom node extensions for our components
	const RatingCardNode = Node.create({
		name: 'ratingCard',
		group: 'block',
		atom: true,
		addAttributes() {
			return {
				providerName: { default: '' },
				rating: { default: 0 },
				logo: { default: '' },
				description: { default: '' },
				affiliateLink: { default: '' },
				ctaText: { default: 'Részletek' }
			};
		},
		parseHTML() {
			return [{ tag: 'rating-card' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['rating-card', HTMLAttributes];
		}
	});

	const ProsConsNode = Node.create({
		name: 'prosCons',
		group: 'block',
		atom: true,
		addAttributes() {
			return {
				pros: { default: [] },
				cons: { default: [] },
				title: { default: '' }
			};
		},
		parseHTML() {
			return [{ tag: 'pros-cons' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['pros-cons', HTMLAttributes];
		}
	});

	const ComparisonTableNode = Node.create({
		name: 'comparisonTable',
		group: 'block',
		atom: true,
		addAttributes() {
			return {
				providers: { default: [] },
				featureLabels: { default: {} },
				title: { default: '' }
			};
		},
		parseHTML() {
			return [{ tag: 'comparison-table' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['comparison-table', HTMLAttributes];
		}
	});

	const PricingTableNode = Node.create({
		name: 'pricingTable',
		group: 'block',
		atom: true,
		addAttributes() {
			return {
				plans: { default: [] },
				title: { default: '' }
			};
		},
		parseHTML() {
			return [{ tag: 'pricing-table' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['pricing-table', HTMLAttributes];
		}
	});

	const CallToActionNode = Node.create({
		name: 'callToAction',
		group: 'block',
		atom: true,
		addAttributes() {
			return {
				title: { default: '' },
				description: { default: '' },
				buttonText: { default: '' },
				buttonLink: { default: '' },
				variant: { default: 'primary' }
			};
		},
		parseHTML() {
			return [{ tag: 'call-to-action' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['call-to-action', HTMLAttributes];
		}
	});

	const AlertNode = Node.create({
		name: 'alert',
		group: 'block',
		content: 'inline*',
		addAttributes() {
			return {
				type: { default: 'info' },
				title: { default: '' }
			};
		},
		parseHTML() {
			return [{ tag: 'alert' }];
		},
		renderHTML({ HTMLAttributes }) {
			return ['alert', HTMLAttributes, 0];
		}
	});

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Image,
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-primary-600 hover:underline'
					}
				}),
				RatingCardNode,
				ProsConsNode,
				ComparisonTableNode,
				PricingTableNode,
				CallToActionNode,
				AlertNode
			],
			content: content,
			editable: editable,
			onUpdate: ({ editor }) => {
				if (onUpdate) {
					onUpdate(editor.getJSON());
				}
			},
			editorProps: {
				attributes: {
					class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	// Toolbar actions
	function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	function toggleCode() {
		editor?.chain().focus().toggleCode().run();
	}

	function setHeading(level: 1 | 2 | 3) {
		editor?.chain().focus().toggleHeading({ level }).run();
	}

	function toggleBulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}

	function toggleOrderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}

	function addLink() {
		const url = prompt('Enter URL:');
		if (url) {
			editor?.chain().focus().setLink({ href: url }).run();
		}
	}

	function addImage() {
		const url = prompt('Enter image URL:');
		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	}

	function insertRatingCard() {
		editor?.chain().focus().insertContent({
			type: 'ratingCard',
			attrs: {
				providerName: 'Szolgáltató neve',
				rating: 4.5,
				description: 'Rövid leírás',
				affiliateLink: '',
				ctaText: 'Részletek'
			}
		}).run();
	}

	function insertProsCons() {
		editor?.chain().focus().insertContent({
			type: 'prosCons',
			attrs: {
				title: 'Előnyök és hátrányok',
				pros: ['Előny 1', 'Előny 2', 'Előny 3'],
				cons: ['Hátrány 1', 'Hátrány 2']
			}
		}).run();
	}

	function insertCallToAction() {
		editor?.chain().focus().insertContent({
			type: 'callToAction',
			attrs: {
				title: 'Kezdj most!',
				description: 'Válaszd a legjobb hosting megoldást',
				buttonText: 'Tovább',
				buttonLink: '',
				variant: 'primary'
			}
		}).run();
	}

	function insertAlert() {
		editor?.chain().focus().insertContent({
			type: 'alert',
			attrs: {
				type: 'info',
				title: 'Fontos információ'
			},
			content: [{ type: 'text', text: 'Az értesítés szövege ide kerül...' }]
		}).run();
	}
</script>

{#if editable}
	<div class="rounded-lg border border-gray-300 bg-white">
		<!-- Toolbar -->
		<div class="flex flex-wrap gap-1 border-b border-gray-300 bg-gray-50 p-2">
			<!-- Text formatting -->
			<button
				onclick={toggleBold}
				class="rounded p-2 hover:bg-gray-200"
				title="Bold"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
				</svg>
			</button>
			<button
				onclick={toggleItalic}
				class="rounded p-2 hover:bg-gray-200"
				title="Italic"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m6 4l-8 8-4-4" />
				</svg>
			</button>
			<button
				onclick={toggleCode}
				class="rounded p-2 hover:bg-gray-200"
				title="Code"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m6 4l-8 8-4-4" />
				</svg>
			</button>

			<div class="mx-2 w-px bg-gray-300"></div>

			<!-- Headings -->
			<button
				onclick={() => setHeading(1)}
				class="rounded px-3 py-2 font-bold hover:bg-gray-200"
				title="Heading 1"
				type="button"
			>
				H1
			</button>
			<button
				onclick={() => setHeading(2)}
				class="rounded px-3 py-2 font-bold hover:bg-gray-200"
				title="Heading 2"
				type="button"
			>
				H2
			</button>
			<button
				onclick={() => setHeading(3)}
				class="rounded px-3 py-2 font-bold hover:bg-gray-200"
				title="Heading 3"
				type="button"
			>
				H3
			</button>

			<div class="mx-2 w-px bg-gray-300"></div>

			<!-- Lists -->
			<button
				onclick={toggleBulletList}
				class="rounded p-2 hover:bg-gray-200"
				title="Bullet list"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<button
				onclick={toggleOrderedList}
				class="rounded p-2 hover:bg-gray-200"
				title="Ordered list"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
				</svg>
			</button>

			<div class="mx-2 w-px bg-gray-300"></div>

			<!-- Media -->
			<button
				onclick={addLink}
				class="rounded p-2 hover:bg-gray-200"
				title="Add link"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
			</button>
			<button
				onclick={addImage}
				class="rounded p-2 hover:bg-gray-200"
				title="Add image"
				type="button"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</button>

			<div class="mx-2 w-px bg-gray-300"></div>

			<!-- Custom components -->
			<button
				onclick={insertRatingCard}
				class="rounded bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200"
				title="Insert rating card"
				type="button"
			>
				Rating Card
			</button>
			<button
				onclick={insertProsCons}
				class="rounded bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200"
				title="Insert pros/cons"
				type="button"
			>
				Pros/Cons
			</button>
			<button
				onclick={insertCallToAction}
				class="rounded bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200"
				title="Insert CTA"
				type="button"
			>
				CTA
			</button>
			<button
				onclick={insertAlert}
				class="rounded bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200"
				title="Insert alert"
				type="button"
			>
				Alert
			</button>
		</div>

		<!-- Editor -->
		<div bind:this={element} class="min-h-[400px]"></div>
	</div>
{:else}
	<div bind:this={element} class="prose prose-lg max-w-none"></div>
{/if}
