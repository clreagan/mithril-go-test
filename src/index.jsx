import m from 'mithril';
import { Home } from '../resources/home'

(async () => {

	// This correlates to index.html in /dist/index.html
	let root = document.querySelector('#app');

	// 
	m.route.prefix = '';
	m.route(root, '/', {
		'/': Home

	});
})();
