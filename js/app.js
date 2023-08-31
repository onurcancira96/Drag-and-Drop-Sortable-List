const sortableList = document.querySelector(".sortable-list");
let items = sortableList.querySelectorAll(".item");
let islenmisData = [];
let siraHesapla = [];
fetch("./json/animeCharacters.json")
  .then((res) => res.json())
  .then((data) => {
    ekleme(data);
    return (islenmisData = data);
  });

const ekleme = (islenmisData) => {
  let products = islenmisData.kages.slice().sort(() => Math.random() - 0.5);
  products.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.setAttribute("id", value.id);
    newDiv.setAttribute("draggable", true);
    newDiv.innerHTML = ` <div class="details">
                                <img src="${value.url}" alt="">
                                <span>${value.name}</span>
                              </div>
                              <i class="uil uil-draggabledots"></i>`;
    sortableList.appendChild(newDiv);
  });

  let items = sortableList.querySelectorAll(".item");
  console.log(items);
  items.forEach((item) => {
    item.style.opacity = 1;

    item.addEventListener("dragstart", () => {
      setTimeout(() => {
        item.style.opacity = 0;
      });
      setTimeout(() => item.classList.add("dragging"), 0);
    });
    item.addEventListener("dragend", () => {
      item.style.opacity = 1;
      item.classList.remove("dragging");
      siraHesapla = [];
      for (let i = 0; i < document.querySelectorAll(".item").length; i++) {
        siraHesapla.push(document.querySelectorAll(".item")[i].id);
      }
      if (
        siraHesapla.every(
          (value, index, array) => !index || value >= array[index - 1]
        ) == true
      ) {
        sortableList.classList.add("dogru");
      }
    });
  });
  const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = sortableList.querySelector(".dragging");
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    let nextSibling = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    sortableList.insertBefore(draggingItem, nextSibling);
  };
  sortableList.addEventListener("dragover", initSortableList);
};
