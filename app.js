const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const html = ` <li class="list-item">
          <span>${todo}</span>
          <i class="fa fa-trash delete" aria-hidden="true"></i>
        </li>`;
  list.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // it removes the white spaces from the text
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

//To delete a list we use event delegation, this ensures that we dont lose efficiency of the webpage by adding event listeners to each trashcan individually.

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterTodos = (term) => {
  //we want to check if that term exists in the list, but list.children returns a HTML collection and we cannot use any array methods on it so we convert it to an array
  //console.log(Array.from(list.children));
  //Array.from(list.children).filter((todo) => {
  // console.log(todo.textContent);
  // return true;
  //return !todo.textContent.includes(term);
  //});
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
