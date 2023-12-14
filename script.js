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
let currentlyShownObjects = [];
let counter = 1;
let currentPageStart = 0;
let rowCount = 0;

const addNewRow = () => {
  let rowNode = document.getElementById("row-1");
  if (rowNode.querySelector("input").value == "") {
    showError("Enter a Field Name")
    return
  }
  let clonedNode = rowNode.cloneNode(true);
  clonedNode.setAttribute("id", `row-${++counter}`);
  clonedNode.querySelector(".btn-danger").classList.remove("disabled");
  clonedNode.querySelector(".btn-danger").setAttribute("onclick", `deleteRow('row-${counter}');`);
  document.getElementById("forms-container").appendChild(clonedNode);
};

const getRandomNumber = (low, high) => {
  return parseInt(Math.random() * (high - low) + low);
}

const generateObject = () => {
  let tempObject = {};
  let key, value, selectedType;
  let i = 1;
  while (i <= counter) {
    if (document.getElementById(`row-${i}`) == null) {
      i++;
      continue
    }
    key = document.getElementById(`row-${i}`).querySelector("input").value;

    if (key == "") {
      showError("No Field Name");
      return
    }
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

const generateObjectArray = () => {
  //Empty everything previously inside table head, body and objectArray
  document.getElementById("displayTable").querySelector("thead").innerHTML = "";
  document.getElementById("displayTable").querySelector("tbody").innerHTML = "";

  objectArray.length = 0;

  rowCount = parseInt(document.getElementById("noOfElements").value);

  if (isNaN(rowCount)) {
    showError("No of Rows Empty");
    return;
  }
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
  currentPageStart = 0;
  generateTableBody(getNextNRows(objectArray, currentPageStart, 10));

  document.getElementById("tableContainer").classList.remove("d-none");
}

const sortTable = (column, order) => {
  objectArray.sort((a, b) => {
    if (order === "asc") {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });

  generateTableBody(objectArray);
}

const filterTable = () => {
  let substring = document.getElementById("searchBox").value;

  const filteredObjects = objectArray.filter((obj) =>
    Object.values(obj).some((value) =>
      String(value).toLowerCase().includes(substring.toLowerCase())
    )
  );

  generateTableBody(filteredObjects);
}

const generateTableBody = (arr) => {
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

const getNextNRows = (arrayToSlice, startPosition, numberOfRows) => {
  return arrayToSlice.slice(startPosition, startPosition + numberOfRows)
}

const deleteRow = (rowid) => {
  document.getElementById(rowid).remove();
}

const showError = (message) => {
  document.querySelector(".alert").classList.remove("d-none");
  document.querySelector(".alert").querySelector("div").textContent = message;
  setTimeout(() => {
    document.querySelector(".alert").classList.add("d-none");
  }, 1500)
}

const getNextNValues = () => {
  currentPageStart += 10;
  document.getElementById("previousPageButton").classList.remove("disabled");
  generateTableBody(getNextNRows(objectArray, currentPageStart, 10));
  if ((currentPageStart + 10) >= rowCount) {
    document.getElementById("nextPageButton").classList.add("disabled");
  }
}

const getPreviousNValues = () => {
  currentPageStart -= 10;
  document.getElementById("nextPageButton").classList.remove("disabled");
  generateTableBody(getNextNRows(objectArray, currentPageStart, 10));
  if (currentPageStart < 10) {
    currentPageStart = 0;
    document.getElementById("previousPageButton").classList.add("disabled");
  }
}