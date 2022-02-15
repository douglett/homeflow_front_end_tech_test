import './styles.scss';


// test
fetch('/api/properties?location=brighton')
	.then(response => response.json())
	.then((json) => {
		console.log(json.result.properties.elements);
		document.querySelector('#app').innerHTML = '<p>Check the JS console for some data...</p>';
	})
	.catch((err) => {
		console.error(err);
		document.querySelector('#app').innerHTML = '<p>Something went wrong. Check the console for details.</p>';
	});


// vue
let myapp = Vue.createApp({
	mounted() {
		fetch('/api/properties?location=brighton')
			.then(response => response.json())
			.then((json) => this.properties = json.result.properties.elements,  this.selectedIndex = -1);
	},
	data() {
		return {
			message: 'Hello Vue!',
			imgserv: 'http://mr0.homeflow.co.uk/',
			searchTerm: 'brighton',
			properties: [],
			selectedIndex: -1,
			cprop: null,
		};
	},
	methods: {
		shortTags(taglist) {
			return taglist.slice(0, 3).join(', ') + (taglist.length > 3 ? ', ...' : '');
		},
		longTags(taglist) {
			return taglist.join(', ');
		},
		propSelect(index) {
			this.selectedIndex = index;
			this.cprop = this.properties[index];
		},
		propDeselect() {
			this.selectedIndex = -1;
			this.cprop = null;
		}
	}
});
myapp.mount('#app2');