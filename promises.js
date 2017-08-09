//Переходим к примеру

//хочу выиграть в лотерею
const willGift = new Promise(
	(resolve, reject) => {	
		let win = Math.random().toFixed(1);
		if (win > 0.5)
			resolve("Ты выиграл");
		else
			reject("Очень жаль, ты проиграл (");
	}
);

const writeOnFb = function() {
	return new Promise(
		(resolve, reject) => resolve("Друзья, я выиграл"));
};

const buyTicket = function(){
	console.log("Покупаю билет");
	willGift
		.then(writeOnFb)
		.then(result => console.log(result))
		.catch(error => console.log(error));
	console.log("Бью баклуши неделю");
}
buyTicket();
//подробнее на developer.mozilla.org