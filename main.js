let shoppingList = [];
let delList = [];
const addButton = document.querySelector(".add");
addButton.addEventListener("click", addItems);
let updateButton = document.querySelector(".update");
updateButton.addEventListener("click", updateItems);
const table = document.querySelector('table');
table.addEventListener("click", clickButtons);


function createSection() {
  const table = document.querySelector("table");
  const tr = document.createElement("tr");
  const th = document.querySelectorAll("th");
  table.appendChild(tr);
  table.addEventListener("click", clickButtons);

  for (let i = 0; i < th.length; i++) {
    let td = document.createElement("td");
    tr.appendChild(td);
  }

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  tr.cells[1].appendChild(input);

  const editButton = document.createElement("button");
  editButton.setAttribute("type", "button");
  editButton.innerHTML = ("✎");
  editButton.classList.add("edit-button");
  tr.lastChild.appendChild(editButton);

  const delButton = document.createElement("button");
  delButton.setAttribute("type", "button");
  delButton.innerHTML = ("×");
  delButton.classList.add("delete-button");
  tr.lastChild.appendChild(delButton);
}

function clickButtons() {      
	const itemsField = document.querySelector(".items");
    const quantField = document.querySelector(".quant");
    const priceField = document.querySelector(".price");
	let el = event.target.parentNode;
	let el1 = el.parentNode;
	
	if (event.target.classList.contains("delete-button")) {
      el1.parentNode.removeChild(el1);
      delList.push(shoppingList[el1.firstChild.innerHTML - 1]);
      shoppingList.splice(el1.firstChild.innerHTML - 1, 1);
    deleteBody();
    fillingSections();
	} else if (event.target.classList.contains("edit-button")) {   
	  el1.style.backgroundColor = "#abdde5";
      addButton.style.display = "none";
      itemsField.value = shoppingList[el1.firstChild.innerHTML - 1].item;
	  quantField.value = shoppingList[el1.firstChild.innerHTML - 1].quantity;
	  priceField.value = shoppingList[el1.firstChild.innerHTML - 1].price;
	  click = 0;
	  deleteBody();
      fillingSections();               
	} else {
	  return;
	}
	countTotal();
}


function fillSection() {
  const rows = table.lastChild;

  for (let i = 0; i < shoppingList.length; i++) {
    rows.cells[0].innerHTML = i + 1;
    rows.cells[2].innerHTML = shoppingList[i].item;
    rows.cells[3].innerHTML = shoppingList[i].quantity;
    rows.cells[4].innerHTML = shoppingList[i].price;
  } 
  countTotal();
}

function countTotal() {
  let sum = 0;

  for (let i = 0; i < shoppingList.length; i++) {
  	sum += +shoppingList[i].price;
  }
  let total = document.querySelector(".total-cell");
  total.innerHTML = sum;
  return;
}

function addItems() {
  const itemsField = document.querySelector(".items");
  const quantField = document.querySelector(".quant");
  const priceField = document.querySelector(".price");
  var itemNew = {
    item:"",
    quantity: "",
    price: ""
  };

  if (itemsField.value && quantField.value && priceField.value) {
    itemNew.item = itemsField.value;
    itemNew.quantity = quantField.value;
    itemNew.price = priceField.value;
    shoppingList.push(itemNew);createSection();
    fillSection();
    itemsField.value = quantField.value = priceField.value = null;
  } else {
    alert("Please, fill all fields");
  }
}

function fillingSections() {
  let rows = table.rows;
  for (let i = 1; i < shoppingList.length + 1; i++) {
    createSection();
    rows[i].cells[0].innerHTML = i;
    rows[i].cells[2].innerHTML = shoppingList[i - 1].item;
    rows[i].cells[3].innerHTML = shoppingList[i - 1].quantity;
    rows[i].cells[4].innerHTML = shoppingList[i - 1].price;
  }
}

function deleteBody() {
	for (let i = 1; i < shoppingList.length + 1; i++) {
		let el = table.rows[1];
		el.parentNode.removeChild(el);
	}
}