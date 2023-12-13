let gender = [
  "lesbian",
  "gay",
  "bisexual",
  "transgender",
  "queer",
  "intersex",
  "asexual",
];
let names = [
  "Benni",
  "Serina",
  "Aymad",
  "Wilie",
  "Carina",
  "Risa",
  "Broderic",
  "Dalenna",
  "Nealon",
  "Maureen",
  "Adair",
  "Wilfred",
];
let objectArray = [];
let counter = 1;
const addNewRow = () => {
  let rowNode = document.getElementById("row-1");
  let clonedNode = rowNode.cloneNode(true);
  clonedNode.setAttribute("id", `row-${++counter}`);
  document.getElementById("forms-container").appendChild(clonedNode);
};

function getRandomNumber(low, high) {
  return parseInt(Math.random() * (high - low) + low);
}

function generateObject() {
  let tempObject = {};
  let key, value, selectedType;
  let i = 1;
  while (i <= counter) {
    key = document.getElementById(`row-${i}`).querySelector("input").value;
    selectedType = document
      .getElementById(`row-${i}`)
      .querySelector("select").value;
    switch (selectedType) {
      case "number":
        value = getRandomNumber(0, 100);
        break;
      case "name":
        value = names[getRandomNumber(0, 11)];
        break;
      case "gender":
        value = gender[getRandomNumber(0, 6)];
        break;
      default:
        break;
    }
    i++;
    tempObject[key] = value;
  }
  return tempObject;
}

function generateObjectArray() {
  //Empty everything previously inside table head, body and objectArray
  document.getElementById("displayTable").querySelector("thead").innerHTML = "";
  document.getElementById("displayTable").querySelector("tbody").innerHTML = "";

  objectArray.length = 0;

  let rowCount = parseInt(document.getElementById("noOfElements").value);

  for (index = 0; index < rowCount; index++) {
    objectArray = [...objectArray, generateObject()];
  }

  let temp = Object.keys(objectArray[0]);

  temp.forEach((key) => {
    let headerNode = document.createElement("th");
    headerNode.setAttribute("class", "p-3");
    headerNode.textContent = key;
    document
      .getElementById("displayTable")
      .querySelector("thead")
      .append(headerNode);

    const sortAscButton = document.createElement("i");
    sortAscButton.setAttribute("class", "bi bi-caret-up-fill p-0 ms-2");
    sortAscButton.setAttribute("onclick", `sortTable("${key}","asc")`);

    const sortDescButton = document.createElement("i");
    sortDescButton.setAttribute("class", "bi bi-caret-down-fill p-0");
    sortDescButton.setAttribute("onclick", `sortTable("${key}", "desc")`);

    headerNode.append(sortAscButton);
    headerNode.append(sortDescButton);
  });

  generateTableBody(objectArray);

  document.getElementById("tableContainer").classList.remove("d-none");
}

function sortTable(column, order) {
  objectArray.sort((a, b) => {
    if (order === "asc") {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });

  generateTableBody(objectArray);
}

function filterTable() {
  let substring = document.getElementById("searchBox").value;

  const filteredObjects = objectArray.filter((obj) =>
    Object.values(obj).some((value) =>
      String(value).toLowerCase().includes(substring.toLowerCase())
    )
  );

  generateTableBody(filteredObjects);
}

function generateTableBody(arr) {
  document.getElementById("displayTable").querySelector("tbody").innerHTML = "";

  arr.forEach((item) => {
    const row = document
      .getElementById("displayTable")
      .querySelector("tbody")
      .insertRow();
    Object.values(item).forEach((value) => {
      const cell = row.insertCell();
      cell.textContent = value;
    });
  });
}
