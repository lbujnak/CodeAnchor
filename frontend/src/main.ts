// ---------------- Imports ----------------

// Library imports
import '@primeuix/styles';
import Ripple from 'primevue/ripple';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/material';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { definePreset } from '@primeuix/themes';

// Local imports
import './assets/style.css';
import App from './App.vue';
import router from './router';

import en from './locales/en.json';
import sk from './locales/sk.json';

// ---------------- PrimeVue ----------------
const app = createApp(App);

const OceanAura = definePreset(Aura, {
	semantic: {
		colorScheme: {
			light: {
				primary: {
					0:   '#D8ECFA', 50:  '#B9DBF5', 100: '#95C6EF', 200: '#6FB0E7', 300: '#4C9BDF',
					400: '#2D87D5', 500: '#0E73C9', 600: '#0B64B0', 700: '#085694', 800: '#064674',
					900: '#043657', 950: '#03263C'
				},
				surface: {
					0: '#E6F4FB', 50:  '#CBE6F7', 100: '#AED6F3', 200: '#90C6ED', 300: '#70B5E6', 
					400: '#4FA4DE', 500: '#2D93D6', 600: '#157DC0', 700: '#0E6BA4', 800: '#095687', 
					900: '#064369', 950: '#042E4A'
				}
			},
			dark: {
				primary: {
					0: '#042E4A', 50:  '#064369', 100: '#095687', 200: '#0E6BA4', 300: '#157DC0', 
					400: '#2D93D6', 500: '#4FA4DE', 600: '#70B5E6', 700: '#90C6ED', 800: '#AED6F3', 
					900: '#CBE6F7', 950: '#E6F4FB'
				},
				surface: {
					0:   '#D8ECFA', 50:  '#B9DBF5', 100: '#95C6EF', 200: '#6FB0E7', 300: '#4C9BDF',
					400: '#2D87D5', 500: '#0E73C9', 600: '#0B64B0', 700: '#085694', 800: '#064674',
					900: '#043657', 950: '#03263C'
				},
			}
		}
	}
});

app.use(PrimeVue, {
	ripple: true,
	theme: {
		preset: OceanAura,
		options: {
			darkModeSelector: '.dark',
			cssLayer: { name: 'primevue', order: 'theme, base, primevue' }
		}
	},
});

app.directive('ripple', Ripple);
app.use(ToastService);
app.use(ConfirmationService);

// -------------- ostatné pluginy -----------
const pinia = createPinia().use(piniaPluginPersistedstate);
const i18n = createI18n({ legacy: false, locale: 'sk', messages: { en, sk } });

app.use(pinia);
app.use(i18n);
app.use(router);

// -------- light/dark podľa systému -------
const mq = window.matchMedia('(prefers-color-scheme: dark)');
function sync (isDark: boolean) {
	document.documentElement.classList.toggle('dark', isDark);
	if(isDark) localStorage.theme = "dark";
	else localStorage.theme = "light";
}

sync(mq.matches);
mq.addEventListener('change', e => sync(e.matches));

app.mount('#app');