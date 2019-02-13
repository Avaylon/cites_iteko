export function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function hash3 (num) {
	return `${num}${randomNum(1000, 9999)}`*1;
}


// добавление возможности замены токена
const api = (function () {

	let more_options = {}

	return function (url, options) {

		if (url === 'add') {
			more_options = {...more_options, ...options}

			return false;
		}

		if (!options) {
			options = {}
		}

		options.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		// to do: be normal
		for (let key in more_options) {
			let value = more_options[key]

			if (!!options[key]) {
				for (let key2 in value) {
					let value2 = value[key2]
					options[key][key2] = value2

				}
				continue;
			}

			options[key] = value	
		}




		return fetch(`api${url}`, {...options, ...more_options } )
	}
})()


export {api}