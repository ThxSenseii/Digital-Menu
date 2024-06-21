function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: username, password: password }),
  })
    .then((token) => {
      console.log("token", token);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-button").addEventListener("click", login);
});

document.addEventListener('DOMContentLoaded', function () {
  const newCategoryButton = document.getElementById('new-category-button');
  const newRowButton = document.getElementById('new-row-button');
  const tabs = document.querySelector('.tabs');
  const tableContainer = document.querySelector('.table-container');

  if (newCategoryButton) {
      newCategoryButton.addEventListener('click', function () {
          const newCategoryInput = document.getElementById('new-category-input');
          const categoryName = newCategoryInput.value.trim();

          if (categoryName) {
              const newTab = document.createElement('div');
              newTab.className = 'tab';
              newTab.textContent = categoryName;
              tabs.appendChild(newTab);
              newCategoryInput.value = '';

              newTab.addEventListener('click', function () {
                  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                  newTab.classList.add('active');
              });
          }
      });
  }

  if (newRowButton) {
      newRowButton.addEventListener('click', function () {
          const newRow = document.createElement('div');
          newRow.className = 'table-row';

          newRow.innerHTML = `
              <div>Producto Nuevo</div>
              <div>Descripción Nueva</div>
              <div>URL Nueva</div>
              <div>Precio Nuevo</div>
              <div>
                  <button class="edit-button">Editar</button>
                  <button class="delete-button">Borrar</button>
              </div>
          `;

          tableContainer.appendChild(newRow);

          newRow.querySelector('.edit-button').addEventListener('click', editRow);
          newRow.querySelector('.delete-button').addEventListener('click', deleteRow);
      });
  }

  function editRow() {
      alert('Edit button clicked');
  }

  function deleteRow() {
      this.closest('.table-row').remove();
  }

  document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', editRow);
  });

  document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', deleteRow);
  });
});
