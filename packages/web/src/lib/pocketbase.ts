import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Client-side PocketBase instance (for browser)
export const pb = new PocketBase(browser ? (import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090') : undefined);

// Server-side PocketBase instance (for SSR)
export const pbServer = new PocketBase('http://127.0.0.1:8090');

// Disable auto cancellation
pb.autoCancellation(false);

// Create a store for the current user
function createUserStore() {
	const { subscribe, set } = writable(pb.authStore.model);

	// Listen to auth store changes
	pb.authStore.onChange((token, model) => {
		set(model);
	});

	return {
		subscribe,
		set,
		// Helper to check if user is authenticated
		get isAuthenticated() {
			return pb.authStore.isValid;
		},
		// Helper to logout
		logout() {
			pb.authStore.clear();
			set(null);
		}
	};
}

export const currentUser = createUserStore();

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

// Helper function to get file URL
export function getFileUrl(record: any, filename: string): string {
	return pb.files.getUrl(record, filename);
}

// Helper function to check if user is admin
export function isAdmin(): boolean {
	const user = pb.authStore.model;
	return user !== null && user !== undefined;
}
