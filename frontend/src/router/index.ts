import { createRouter, createWebHistory } from 'vue-router';

export interface Route {
	path: string,
	name: string,
	navbar: boolean,

	label?: string,
	icon?: string,
	iconCmp?: any,
	alias?: string[],
	beforeEnter?: (to: any, from: any, next: any) => void,

	component: any
}

export interface RouteChildren extends Route {
  	children: (Route | RouteChildren)[],
}

export const routes: ( Route | RouteChildren)[] = [
	{
		path: '/', name: 'home', label: 'navigation.home', icon: 'pi pi-home', navbar: true,
		component: () => import('../views/Home.vue'),
		alias: ['/home'],  
		children: [],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router