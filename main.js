const addButton = document.querySelector(".add");
const updateButton = document.querySelector(".update");
const table = document.querySelector('table');
const menu = document.querySelector(".menu")
const h = document.querySelector("h1");
const hr = document.querySelector("hr");
const title = document.querySelector(".title");
const itemsField = document.querySelector(".items");
const quantField = document.querySelector(".quant");
const priceField = document.querySelector(".price");
const fields = document.querySelector(".input-section");
const shopping = document.querySelector(".shopping");
const inputButton = document.querySelectorAll(".checkbox");


addButton.addEventListener("click", addItems);
updateButton.addEventListener("click", updateItems);
table.addEventListener("click", clickButtons);
table.addEventListener("click", clickDelete);
menu.addEventListener("click", clickMenuButtons);

shopping.classList.add("hover");


let updateItemIndex = -1;
let shoppingList = [{"item": "Bread", "quantity": "1", "price": "1.99"}, {"item": "Milk", "quantity": "3l", "price": "3.25"}, {"item": "Eggs", "quantity": "10", "price": "2.99"},];
let doneList =[];
let delList = [];
let currentTable = "list";
fillTable(shoppingList);
countTotal(shoppingList);





function createSection() {
  const tr = document.createElement("tr");
  const th = document.querySelectorAll("th");
  table.appendChild(tr);
  tr.classList.add("newTr");

  for (let i = 0; i < th.length; i++) {
    let td = document.createElement("td");
    tr.appendChild(td);
  }

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.classList.add("checkbox");
  tr.cells[1].appendChild(input);
  if (currentTable == "done" || currentTable == "deleted") {
    input.checked = true;
    input.classList.toggle("checkbox");
  }


  if (currentTable == "list") {
    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.innerHTML = ("✎");
    editButton.classList.add("edit-button");
    tr.lastChild.appendChild(editButton);
  }

  const delButton = document.createElement("button");
  delButton.setAttribute("type", "button");
  delButton.innerHTML = ("×");
  if (currentTable == 'done') {
    delButton.classList.add("remove-done");
  } else if (currentTable == 'deleted') {
    delButton.classList.add("remove-del");
  } else {
    delButton.classList.add("delete-button");
  }
  tr.lastChild.appendChild(delButton);
}
function clickMenuButtons(event) {
  if(!event.target.classList.contains("shopping") && !event.target.classList.contains("done") && !event.target.classList.contains("deleted")) {
    return;
  } else if(event.target.classList.contains("shopping")) {
    showShoppingList();
  } else if(event.target.classList.contains("done")) {
    showDoneList();
  } else if(event.target.classList.contains("deleted")) {
    showDeletedList();
  } else {
    return;
  }  

  let elem = event.target;
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; i++) {
    let link = a[i];
      if (link != elem) {
       link.classList.remove("hover");
      }
  }
  elem.classList.add("hover");
}

function showShoppingList() {
  currentTable = 'list'
  h.innerHTML = "Shopping List";
  fields.style.visibility = "";
  title.style.height = "220px";
  deleteBody();
  if (shoppingList.length > 0) {
    fillTable(shoppingList);
    let sShop = JSON.stringify(shoppingList);
    localStorage.setItem("shoppingList", sShop);
  } 
  countTotal(shoppingList);
  return;
}

function showDeletedList() {
  currentTable = 'deleted';
  h.innerHTML = "Deleted Items";
  hr.style.visibility = "hidden";
  fields.style.visibility = "hidden";
  title.style.height = "120px";
  deleteBody();
  if (delList.length > 0) {
    fillTable(delList);
    const editButton = document.querySelectorAll(".edit-button");
    const deleteButton = document.querySelectorAll(".delete-button")
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].style.visibility = "hidden";
      deleteButton[i].classList.remove("delete-button");
      deleteButton[i].classList.add("remove-del");
    }  
  }
  countTotal(delList);
  return;
}

function showDoneList() {
  currentTable = 'done';
  h.innerHTML = "Done Items";
  hr.style.visibility = "hidden";
  fields.style.visibility = "hidden";
  title.style.height = "120px";
  deleteBody();
  if (doneList.length > 0) {
    fillTable(doneList);
    const editButton = document.querySelectorAll(".edit-button");
    const deleteButton = document.querySelectorAll(".delete-button");
    const input = document.querySelectorAll("checkbox")
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].style.visibility = "hidden";
      input.checked;
      deleteButton[i].classList.remove("delete-button")
      deleteButton[i].classList.add("remove-done");
    }
  }
  countTotal(doneList);
  return;
}

function clickDelete(event) {
  let elem = event.target.parentNode.parentNode;
  let index = elem.firstChild.innerHTML - 1;
  if(!event.target.classList.contains("remove-done") && !event.target.classList.contains("remove-del")) {
    return;
  } else if(event.target.classList.contains("remove-done")) {
    elem.parentNode.removeChild(elem);
    doneList.splice(index, 1);
    deleteBody();
    fillTable(doneList);  
    countTotal(doneList);
  } else if(event.target.classList.contains("remove-del")) {
    elem.parentNode.removeChild(elem);
    delList.splice(index, 1);
    deleteBody();
    fillTable(delList);
    countTotal(delList);
  }  else {
    return;
  }
}

function clickButtons(event) {     
  let el = event.target.parentNode;
  let el1 = el.parentNode;
  let index = el1.firstChild.innerHTML - 1;
  if (!event.target.classList.contains("delete-button") && !event.target.classList.contains("edit-button") 
  	&& !event.target.classList.contains("checkbox")) {
    return;	
  } else if (event.target.classList.contains("delete-button")) {
    el1.parentNode.removeChild(el1);
    delList.push(shoppingList[index]);
    shoppingList.splice(index, 1);
    deleteBody();
    fillTable(shoppingList);
    itemsField.value = quantField.value = priceField.value = null;
    updateButton.style.display = "none";
    addButton.style.display = 'inline';
	} else if (event.target.classList.contains("edit-button")) {
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      if (row != el1) {
        row.style.backgroundColor = '';
      } else {
        row.cells[1].children[0].checked = true;
      }
    }
      el1.style.backgroundColor = "#abdde5";
      updateButton.style.display = 'inline';
      addButton.style.display = "none";
      updateItemIndex = index;
      itemsField.value = shoppingList[index].item;
	    quantField.value = shoppingList[index].quantity;
      priceField.value = shoppingList[index].price;
    } else if(event.target.classList.contains("checkbox")) {
      event.target.checked = true;
      el1.parentNode.removeChild(el1);
      doneList.push(shoppingList[index]);
      shoppingList.splice(index, 1);	
      deleteBody();
      fillTable(shoppingList);
      updateButton.style.display = "none";
      addButton.style.display = 'inline';
    } else {
      return;
    }
	countTotal(shoppingList);
}

function fillSection(arr) {
  const rows = table.lastChild;
  for (let i = 0; i < arr.length; i++) {
    if(typeof +arr[i].price !== "number") {
      throw new TypeError("The entered price is not a number", "main.js", 196);
      return;
    } else {
      rows.cells[0].innerHTML = i + 1;
      rows.cells[2].innerHTML = arr[i].item;
      rows.cells[3].innerHTML = arr[i].quantity;
      rows.cells[4].innerHTML = arr[i].price;
    }
  }  
  countTotal(shoppingList);
}

function countTotal(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += +arr[i].price;
  }
  let total = document.querySelector(".total-cell");
  total.innerHTML = sum.toFixed(2);
}

function addItems() {
  var itemNew = {
    "item":"",
    "quantity": "",
    "price": ""
  };
  if (isNumeric(priceField.value))  {
    itemNew.item = itemsField.value;
    itemNew.quantity = quantField.value;
    itemNew.price = priceField.value;
    shoppingList.push(itemNew);
    createSection();
    fillSection(shoppingList);
    itemsField.value = quantField.value = priceField.value = null;
  } else if (!itemsField.value || !quantField.value ||!priceField.value) {
    alert("Some fields not filled");
  } else {
    alert("Price value is not a number");
  }
}

function fillTable(arr) {
  let rows = table.rows;
  for (let i = 1; i < arr.length + 1; i++) {
    createSection();
    rows[i].cells[0].innerHTML = i;
    rows[i].cells[2].innerHTML = arr[i - 1].item;
    rows[i].cells[3].innerHTML = arr[i - 1].quantity;
    rows[i].cells[4].innerHTML = arr[i - 1].price;
  }
}

function deleteBody() {
  const el = document.querySelectorAll(".newTr");
  for (var i = 0; i < el.length; i++) {
  	el[i].remove();
  }
}

function updateItems() {
  if (!shoppingList[updateItemIndex] && updateItemIndex >= 0) {
    updateButton.style.display = "none";
    addButton.style.display = "";
    return;
  };

  const itemsField = document.querySelector(".items");
  const quantField = document.querySelector(".quant");
  const priceField = document.querySelector(".price");

  shoppingList[updateItemIndex] = {
    item: itemsField.value,
    quantity: quantField.value,
    price: priceField.value,
  };

  deleteBody();
  fillTable(shoppingList);
  countTotal(shoppingList);
  this.style.display = "none";
  addButton.style.display = "";
  itemsField.value = quantField.value = priceField.value = null;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let sShop = JSON.stringify(shoppingList);
localStorage.setItem("shoppingList", sShop);
let sDel = JSON.stringify(delList);
localStorage.setItem("delList", sDel);
let sDone = JSON.stringify(doneList)
localStorage.setItem("doneList", sDone);

let restoreShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
let restoreDelList = JSON.parse(localStorage.getItem("delList"));
let restoreDoneList = JSON.parse(localStorage.getItem("doneList"));
console.log(sShop);
console.log(restoreShoppingList);
