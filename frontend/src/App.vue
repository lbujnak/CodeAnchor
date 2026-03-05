<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import Toast from 'primevue/toast';

	const i18n = useI18n();
	i18n.locale.value = localStorage.getItem('language') || 'sk';
</script>

<template>
	<div class="p-2 min-h-screen">
		<Navbar/>
		<RouterView/>
	</div>
	<Toast/>
</template>