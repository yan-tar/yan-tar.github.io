"use strict";


let	delComma = function(str){
	if(!((str.endsWith(',')) || (str.endsWith(',', str.length-1))) ) 
		return str;

	return str.slice(0, str.lastIndexOf(','));	
}


var makeNames = function(personArr){
	let person = {};
	if(document.getElementById('orderfio').checked) {
		person.sName = personArr[0].toLowerCase();
		person.fName = personArr[1].toLowerCase();
		person.tName = personArr[2].toLowerCase();
	}	
	if(document.getElementById('orderiof').checked) {
		person.sName = personArr[2].toLowerCase();
		person.fName = personArr[0].toLowerCase();
		person.tName = personArr[1].toLowerCase();
	}
	if(document.getElementById('orderif').checked) {
		person.sName = personArr[1].toLowerCase();
		person.fName = personArr[0].toLowerCase();
		person.tName = '';
	}	
	if(document.getElementById('orderfi').checked) {
		person.sName = personArr[0].toLowerCase();
		person.fName = personArr[1].toLowerCase();
		person.tName = '';
	}
	person.fInitial= person.fName.charAt(0);
	if(person.tName.length > 0)	person.tInitial = person.tName.charAt(0);
	let nameVar = '';

		if(document.getElementById('famnameotch').checked) {
			if(person.tName.length > 0) {
					nameVar += person.sName +" "+person.fName +" "+ person.tName + ", ";
				}
			else {
					//if famnameotch is checked then famname is unchecked, 
					//but we need this variant if we have only name and family name
					nameVar += person.sName +" "+person.fName + ", ";
				}
			}
		if( document.getElementById('nameotchfam').checked && person.tName.length > 0) {
			nameVar += person.fName +" "+ person.tName +" " + person.sName + ", ";
			}
		document.getElementById('namefam').checked ? nameVar += person.fName +" "+ person.sName + ", " : nameVar = nameVar;
		document.getElementById('famname').checked ? nameVar += person.sName + " "+  person.fName + ", " : nameVar = nameVar;
		if(document.getElementById('nofam').checked && person.tName.length > 0) {
			nameVar += person.fInitial +" "+ person.tInitial +" " + person.sName + ", ";
		}
		if(document.getElementById('famno').checked && person.tName.length > 0) {
			nameVar += person.sName + " " + person.fInitial +" "+ person.tInitial +", ";
		}
		document.getElementById('nfam').checked ? nameVar += person.fInitial +" "+ person.sName + ", " : nameVar = nameVar;
		document.getElementById('famn').checked ? nameVar += person.sName +" "+ person.fInitial + ", " : nameVar = nameVar;

	return nameVar;
}

var splitPersons = function(){
	let persons = document.getElementById('text_from').value.split(', ');
	let str = '';
	for(let i = 0; i < persons.length; i++) {
		str += makeNames(persons[i].split(' '));
	}
	document.getElementById('text_to_span').innerHTML = str;
}

var joinFields = function(){
	var field1 = delComma(document.getElementById('text_from').value);
	var field2 = delComma(document.getElementById('text_from2').value);
	var probel;
	document.getElementById('collocations').checked ? probel = true : probel = false; 
	
	var strings1 = field1.split(', ');
	var strings2 = field2.split(', ');
	var newString = [];
	for (var i = 0; i < strings1.length; i++) {
		for (var z = 0; z < strings2.length; z++)
			{			
				if(probel) {
					newString.push(strings1[i] + " " +strings2[z]);
				}
				else {
					newString.push(strings1[i] + strings2[z]);
				}
			};
	  };
	var vsego2 = newString.length;
	document.getElementById('text_to_span').innerHTML = newString.join(", ");
	document.getElementById('vsego2').innerHTML = vsego2;
}

var textToSmall = function () {
		let textFrom = document.getElementById('text_from')
    textFrom.value = textFrom.value.toLowerCase();
	return false;
};


//выделение текста в диве text_to
document.getElementById('text_to').addEventListener('click', function() { 
    if (window.getSelection) {
        let range = document.createRange();
        range.selectNode(document.getElementById('text_to_span'));
		let selection = window.getSelection();
	    selection.removeAllRanges();
			selection.addRange(range);
		}
});
	
	
function selectText(n){
	if (window.getSelection) {
    let range = document.createRange();
    range.selectNode(n);
		let selection = window.getSelection();
	  selection.removeAllRanges();
		selection.addRange(range);
		}
}



var textReset = function(){
	document.getElementById('text_from').value ="";
	return false;
}

//разбивает строку 
function toSplit(n){	
	var split = ', ';
	document.getElementById('emptysplit').checked == true ? split = ' ' : split = ', ';
	if(typeof n != "object"){ n = n.split(split);}
	return n;
}

//сортирует по алфавиту, если нужна сортировка
function toSort(n){
	let n = toSplit(n);
	if (document.getElementById('tosort').checked == true) 	{ n.sort();	}
	return n;
}

//оставляет только уникальные слова
function unique() {
	var text_from = document.getElementById('text_from').value;
	var words = toSort(text_from);
	var trash = {};
	var obj = {};
	
	document.getElementById('vsego1').innerHTML = words.length;
	  for (var i = 0; i < words.length; i++) {
			var str = words[i];
			if (!(str in obj)) {
			  obj[str] = true; // запомнить строку в виде свойства объекта 
			}
			else {
				str in trash ? trash[str] = trash[str]+1 : trash[str] = 1;
			}
			
	  }
	//надо бы превратить обратно в строку
	var newstr = Object.keys(obj).join(", ");
	var newtrash = Object.keys(trash).join(", ");

    document.getElementById('text_to_span').innerHTML = newstr;
    document.getElementById('trash').innerHTML = newtrash;
	document.getElementById('vsego2').innerHTML = Object.keys(obj).length;
	return false;
}

function showFrom2(){
	var newfield = document.getElementById('newfield');
	newfield.style.display=="block"? 
		newfield.style.display = "none" : newfield.style.display = "block";
}



//IFEE

(function(){
	// close and opens tabs with stopwords
	var tab = document.querySelectorAll('.stop-tab');
	Array.from(tab).forEach(el => {
		let tabHead = el.querySelector('h3, h2');
		tabHead.addEventListener('click', function(event){
			el.classList.toggle('stop-tab--active');
		});
	});

	//select stopwords
	var stopWords = document.querySelectorAll('.stopwords');
	Array.from(stopWords).forEach(p => {
	    p.addEventListener('click', function(event) {
	    	selectText(this);
	    });
	});

	//fio interface
	let fio = document.querySelector('#fio');
	let fioHelp = document.querySelector('.fio-help');
	fio.addEventListener('mouseover', function(){
		//protect from not intended mouseovers
		let fioswitch = true;
		fio.addEventListener('mouseleave', function(){ 
			fioswitch = false; 
			console.log('false');
		});
		//show fio-interface
		setTimeout(function() { 
			if(fioswitch) {
				fioHelp.style.display = 'block'; }
			}, 1000);
	});
	fio.addEventListener('click', splitPersons);	
	document.querySelector('#fio2').addEventListener('click', splitPersons);
	//close fio-interface
	document.querySelector('.fio-close').addEventListener('click', function(){
		fioHelp.style.display = 'none';
	});

	//complex logic for fio-checkboxes
	document.getElementById('famname').addEventListener('change', function(){
		if(this.checked) {
			document.getElementById('famnameotch').checked = false;
		}
	});	
	document.getElementById('famnameotch').addEventListener('change', function(){
		if(this.checked) {
			document.getElementById('famname').checked = false;
		}
	});
	document.getElementById('orderfi').onchange = function(){
		if (this.checked) {
			document.getElementById('famnameotch').checked = false;
			document.getElementById('nameotchfam').checked = false;			
			document.getElementById('nofam').checked = false;
			document.getElementById('famno').checked = false;
			document.getElementById('famname').checked = true;
		}
	}
	document.getElementById('orderif').onchange = function(){
		if (this.checked) {
			document.getElementById('famnameotch').checked = false;
			document.getElementById('nameotchfam').checked = false;			
			document.getElementById('nofam').checked = false;
			document.getElementById('famno').checked = false;
			document.getElementById('famname').checked = true;
		}
	}
	document.getElementById('orderiof').onchange = function(){
		if (this.checked) {
			document.getElementById('famnameotch').checked = true;
			document.getElementById('nameotchfam').checked = true;			
			document.getElementById('nofam').checked = true;
			document.getElementById('famno').checked = true;
			document.getElementById('famname').checked = false;
		}
	}
	document.getElementById('orderfio').onchange = function(){
		if (this.checked) {
			document.getElementById('famnameotch').checked = true;
			document.getElementById('nameotchfam').checked = true;			
			document.getElementById('nofam').checked = true;
			document.getElementById('famno').checked = true;
			document.getElementById('famname').checked = false;
		}
	}
}());
// var info;
// $('body').mousemove(function(e){
//   if (info !==e.target){
//   	console.log(e.target);
//     info =e.target;
//   }
// });
