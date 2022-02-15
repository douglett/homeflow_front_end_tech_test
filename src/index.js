import './styles.scss';


// api test
// fetch('/api/properties?location=brighton')
// 	.then(response => response.json())
// 	.then((json) => {
// 		console.log(json.result.properties.elements);
// 		document.querySelector('#app').innerHTML = '<p>Check the JS console for some data...</p>';
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		document.querySelector('#app').innerHTML = '<p>Something went wrong. Check the console for details.</p>';
// 	});


// main vue app
let myapp = Vue.createApp({
	mounted() {
		this.search();  // do default search on load
	},
	data() {
		return {
			imgserv: 'http://mr0.homeflow.co.uk/',
			enabled: true,           // app interactivity flag - off if search is being performed
			apierror: false,         // big failure flag
			searchTerm: 'brighton',  // current search
			searchTermTemp: '',      // typing in progress
			selectedIndex: -1,       // currently selected property (index)
			cprop: null,             // currently selected property (object ref)
			properties: [],          // api response
		};
	},
	methods: {
		// format property tag list in various ways
		shortTags(taglist) {
			return taglist.slice(0, 3).join(', ') + (taglist.length > 3 ? ', ...' : '');
		},
		longTags(taglist) {
			return taglist.join(', ');
		},
		// selecting and deselecting properties. allows display of single property view.
		propSelect(index) {
			this.selectedIndex = index;
			this.cprop = this.properties[index];
		},
		propDeselect() {
			this.selectedIndex = -1;
			this.cprop = null;
		},
		// do a new property search
		searchClick() {
			this.searchTerm = this.searchTermTemp;
			this.search();
		},
		search() {
			if (!this.enabled)  return;  // don't do two searches at once.
			console.log("searching", this.searchTermTemp);
			// reset state
			this.enabled = false;
			this.apierror = false;
			this.propDeselect();
			this.properties = [];
			// do search
			fetch('/api/properties?location=' + this.searchTerm)
				.then(response => response.json())
				.then((json) => {
					this.enabled = true;
					this.properties = json.result.properties.elements;
				})
				.catch((err) => {
					this.enabled = true;
					this.apierror = true;
					console.error("api error", err);
				});
		}
	}
});
myapp.mount('#app2');