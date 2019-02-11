export function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function hash3 (num) {
	return `${num}${randomNum(100, 999)}`*1;
}

export function api (url, options) {

	if (!options) {
		options = {}
	}

	options.headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}


	return fetch(`api${url}`, options)
}