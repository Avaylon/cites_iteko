export const api = (function () {

	return function (url, options) {

		options.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};


		return fetch(`api${url}`, options )
	
	}
})();


export const hash = (num) => ( `${num}${ Math.round(Math.random() * (9999 - 1000) + 1000) }`*1 );
