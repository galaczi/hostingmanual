import { pb, type Post } from '$lib/server/pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		// Use pb.filter for security - only get published posts
		const posts = await pb.collection('posts').getList<Post>(1, 1, {
			filter: pb.filter('slug = {:slug} && published = true', { slug: params.slug }),
			expand: 'hosting_provider,author'
		});

		if (posts.items.length === 0) {
			throw error(404, 'A bejegyzés nem található');
		}

		return {
			post: posts.items[0]
		};
	} catch (err: any) {
		if (err.status === 404) {
			throw err;
		}
		console.error('Error loading post:', err);
		throw error(500, 'Hiba történt a bejegyzés betöltése során');
	}
};
