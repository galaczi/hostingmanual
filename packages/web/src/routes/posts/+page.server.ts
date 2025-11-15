import { pb, type Post } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const category = url.searchParams.get('category') || '';
		const perPage = 12;

		// Build filter with security - only published posts
		let filter = 'published = true';

		if (category) {
			filter = pb.filter(filter + ' && category = {:category}', { category });
		}

		const posts = await pb.collection('posts').getList<Post>(page, perPage, {
			filter,
			sort: '-published_at,-created',
			expand: 'hosting_provider'
		});

		// Get categories for filter
		const categories = ['review', 'comparison', 'guide', 'news', 'tutorial'];

		return {
			posts: posts.items,
			totalPages: posts.totalPages,
			currentPage: page,
			categories,
			selectedCategory: category
		};
	} catch (err: any) {
		console.error('Error loading posts:', err);
		throw error(500, 'Hiba történt a bejegyzések betöltése során');
	}
};
