import { pb, type Post } from '$lib/server/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const posts = await pb.collection('posts').getList<Post>(1, 6, {
			filter: pb.filter('published = true'),
			sort: '-published_at,-created',
			expand: 'hosting_provider'
		});

		return {
			featuredPosts: posts.items
		};
	} catch (err) {
		console.error('Error loading posts:', err);
		return {
			featuredPosts: []
		};
	}
};
