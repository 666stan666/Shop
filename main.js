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

addButton.addEventListener("click", addItems);
updateButton.addEventListener("click", updateItems);
table.addEventListener("click", clickButtons);
table.addEventListener("click", clickDelete);
menu.addEventListener("click", clickMenuButtons);

shopping.classList.add("hover");

let updateItemIndex = -1;
let shoppingList = [];
let doneList =[];
let delList = [];


function createSection() {
  const tr = document.createElement("tr");
  const th = document.querySelectorAll("th");
  table.appendChild(tr);
  tr.classList.add('newTr');

  for (let i = 0; i < th.length; i++) {
    let td = document.createElement("td");
    tr.appendChild(td);
  }

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.classList.add("checkbox");
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
  } else if (event.target.classList.contains("edit-button")) {
        for (let i = 0; i < table.rows.length; i++) {
          const row = table.rows[i];
            if (row != el1) {
              row.style.backgroundColor = '';
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
      el.parentNode.removeChild(el);
      doneList.push(shoppingList[index]);
      shoppingList.splice(index, 1);  
      deleteBody();
      fillTable(shoppingList);
    } else {
      return;
    }
  countTotal(shoppingList);
}

function clickDelete() {
  let elem = event.target.parentNode;
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
  } else {
    return;
  }
}

function showShoppingList() {
  h.innerHTML = "Shopping List";
  fields.style.visibility = "";
  title.style.height = "220px";
  deleteBody();
  if (shoppingList.length > 0) {
    fillTable(shoppingList);
  } else {
  alert("Shopping list is empty");
  }
  countTotal(shoppingList);
  return;
}

function showDeletedList() {
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
  } else {
    alert('List "Deleted" is empty');
  }
  countTotal(delList);
  return;
}

function showDoneList() {
  h.innerHTML = "Done Items";
  hr.style.visibility = "hidden";
  fields.style.visibility = "hidden";
  title.style.height = "120px";
  deleteBody();
  if (doneList.length > 0) {
    fillTable(doneList);
    const editButton = document.querySelectorAll(".edit-button");
    const deleteButton = document.querySelectorAll(".delete-button")
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].style.visibility = "hidden";
      deleteButton[i].classList.remove("delete-button")
      deleteButton[i].classList.add("remove-done");
    }
  } else {
    alert('"Done list items" is empty');
  }
  countTotal(doneList);
  return;
}

function fillSection(arr) {
  const rows = table.lastChild;
  for (let i = 0; i < arr.length; i++) {
    rows.cells[0].innerHTML = i + 1;
    rows.cells[2].innerHTML = arr[i].item;
    rows.cells[3].innerHTML = arr[i].quantity;
    rows.cells[4].innerHTML = arr[i].price;
  } 
  countTotal(shoppingList);
}

function countTotal(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
  	sum += +arr[i].price;
  }
  let total = document.querySelector(".total-cell");
  total.innerHTML = sum;
}

function addItems() {
  var itemNew = {
    "item":"",
    "quantity": "",
    "price": ""
  };

  if (itemsField.value && quantField.value && priceField.value) {
    itemNew.item = itemsField.value;
    itemNew.quantity = quantField.value;
    itemNew.price = priceField.value;
    shoppingList.push(itemNew);
    createSection();
    fillSection(shoppingList);
    itemsField.value = quantField.value = priceField.value = null;
  } else {
    alert("Please, fill all fields");
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


