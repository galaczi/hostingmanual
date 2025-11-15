import PocketBase from 'pocketbase';

// Server-side PocketBase instance (for SSR only)
export const pb = new PocketBase('http://127.0.0.1:8090');

// Type definitions for collections
export interface Page {
	id: string;
	title: string;
	slug: string;
	content: any; // JSON content from Tiptap
	excerpt?: string;
	featured_image?: string;
	meta_title?: string;
	meta_description?: string;
	published: boolean;
	published_at?: string;
	author: string;
	created: string;
	updated: string;
}

export interface HostingProvider {
	id: string;
	name: string;
	slug: string;
	logo?: string;
	website?: string;
	affiliate_link?: string;
	description?: string;
	overall_rating?: number;
	pricing_start?: number;
	pricing_currency?: string;
	features?: any; // JSON array
	pros?: any; // JSON array
	cons?: any; // JSON array
	active: boolean;
	created: string;
	updated: string;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	content: any; // JSON content from Tiptap
	excerpt?: string;
	featured_image?: string;
	category: 'review' | 'comparison' | 'guide' | 'news' | 'tutorial';
	tags?: any; // JSON array
	hosting_provider?: string;
	rating?: number;
	meta_title?: string;
	meta_description?: string;
	published: boolean;
	published_at?: string;
	author: string;
	created: string;
	updated: string;
}

export interface ComponentTemplate {
	id: string;
	name: string;
	type:
		| 'rating_card'
		| 'comparison_table'
		| 'pros_cons'
		| 'feature_list'
		| 'pricing_table'
		| 'call_to_action'
		| 'testimonial'
		| 'alert'
		| 'code_block'
		| 'faq';
	description?: string;
	default_data: any; // JSON
	schema: any; // JSON schema
	active: boolean;
	created: string;
	updated: string;
}

export interface Media {
	id: string;
	title: string;
	file: string;
	alt_text?: string;
	caption?: string;
	type: 'image' | 'icon' | 'logo' | 'screenshot';
	uploaded_by: string;
	created: string;
	updated: string;
}

export interface SiteSetting {
	id: string;
	key: string;
	value: any; // JSON
	description?: string;
	created: string;
	updated: string;
}
