let shoppingList = {
	number: [],
	items: [],
	price: [],
	quantity: []
}

let tBody = document.querySelector('table');
function createSection() {
	var tr = document.createElement('tr');
	tBody.appendChild(tr);
	for (var i = 0; i < 6; i++) {
		var td = document.createElement('td');
		tr.appendChild(td);
	}
	// create new TR in the table

	let input = document.createElement('input');
	input.setAttribute('type', "checkbox");
	tr.cells[1].appendChild(input);
	// create input with "checkbox" type in TR

	let editButton = document.createElement('button');
	editButton.setAttribute('type', "button");
	editButton.innerHTML = ('✎');
	editButton.classList.add('edit-button');
	tr.lastChild.appendChild(editButton);
	// create at last cell the button for editing items

	let delButton = document.createElement('button');
	delButton.setAttribute('type', "button");
	delButton.innerHTML = ('×');
	delButton.classList.add('delete-button');
	tr.lastChild.appendChild(delButton);	
	// create at last cell the button for deleting items
}

let delButts = document.querySelectorAll('.delete-button');
function deleteRow(){
		var el = this.parentNode;
		var el1 = el.parentNode;
		el1.parentNode.removeChild(el1);
	}

	for (var i = 0; i < delButts.length; i++) {
		let delButt = delButts[i];
		delButt.addEventListener('click', deleteRow);
	}
function fillingSections() {
	let rows = table.rows;
	for (let i = 0; i < shoppingList.items.length; i++) {
		rows[i].cells[0].innerHTML = i;
		rows[i].cells[2].innerHTML = shoppingList.items[i];
		rows[i].cells[3].innerHTML = shoppingList.quantity[i];
		rows[i].cells[4].innerHTML = shoppingList.price[i];
	}
}

let addButton = document.querySelector('.add');
function addItems() {
	let itemsField = document.querySelector('.items');
	shoppingList.items.push(itemsField.value);
	let quantField = document.querySelector('.quant');
	shoppingList.quantity.push(quantField.value);
	let priceField = document.querySelector('.price');
	shoppingList.price.push(priceField.value);
	alert(itemsField.value + " " + quantField.value + " " + priceField.value)
	createSection();
	fillingSections();
	
}
addButton.addEventListener('click', addItems);
