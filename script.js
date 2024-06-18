function fetchMenuData() {
  google.script.run.withSuccessHandler(renderMenu).getMenuData();
}

function renderMenu(data) {
  var menuData = data.menu;
  var categoriasData = data.categorias;

  var categories = categoriasData.map(cat => cat[0]);
  var menuItems = menuData.slice(1).map(item => ({
    name: item[1],
    description: item[2],
    url: item[5],
    priceMedium: parsePrice(item[3]),
    priceFull: parsePrice(item[4]),
    category: item[0]
  }));

  var categorySelect = document.getElementById('category-select');
  var contentContainer = document.getElementById('content');

  categories.forEach(category => {
    var option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.onchange = () => showCategory(categorySelect.value, menuItems);

  var searchInput = document.getElementById('search');
  searchInput.oninput = () => searchMenu(searchInput.value, menuItems);

  showCategory('', menuItems);
}
function showCategory(category, menuItems) {
  var contentContainer = document.getElementById('content');
  contentContainer.innerHTML = '';

  var filteredItems = category ? menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase()) : menuItems;

  var lastCategory = '';
  filteredItems.forEach(item => {
    if (!category && item.category !== lastCategory) {
      var categoryTitleElement = document.createElement('h2');
      categoryTitleElement.textContent = item.category;
      categoryTitleElement.style.width = '100%';
      categoryTitleElement.style.textAlign = 'center';
      categoryTitleElement.style.padding = '20px';
      categoryTitleElement.style.color = '#edcf47';
      categoryTitleElement.style.fontSize = '50px';
      contentContainer.appendChild(categoryTitleElement);
      lastCategory = item.category;
    }

    var itemElement = document.createElement('div');
    itemElement.className = 'menu-item';
    itemElement.innerHTML = `
  ${item.url ? `<img src="${item.url}" alt="${item.name}">` : '<div class="placeholder">FOTO PLATO</div>'}
  <div class="info">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    ${getPriceHTML(item)}
  </div>
`;
    contentContainer.appendChild(itemElement);
  });

  var selectedCategoryElement = document.getElementById('selected-category');
  selectedCategoryElement.textContent = category ? `Platos de la categoría: ${category}` : 'Todos los platos';
}


function getPriceHTML(item) {
  let priceMediumHTML = item.priceMedium ? `<p class="price"><strong>${getMediumPriceLabel(item.category)}:</strong> <span class="price-value">${item.priceMedium.toFixed(2)}€</span></p>` : '';
  let priceFullHTML = item.priceFull ? `<p class="price"><strong>${getFullPriceLabel(item.category)}:</strong> <span class="price-value">${item.priceFull.toFixed(2)}€</span></p>` : '';

  return priceMediumHTML + priceFullHTML;
}

function getMediumPriceLabel(category) {
  switch (category) {
    case "Arepas":
      return "Asadas";
    case "Bocadillos":
      return "Pulgas";
    default:
      return "1/2 Ración";
  }
}

function getFullPriceLabel(category) {
  switch (category) {
    case "Arepas":
      return "Fritas";
    case "Bocadillos":
      return "Bocadillos/Sandwiches";
    default:
      return "Ración";
  }
}

function parsePrice(price) {
  let parsedPrice = parseFloat(price);
  return isNaN(parsedPrice) ? null : parsedPrice;
}

function searchMenu(query, menuItems) {
  var contentContainer = document.getElementById('content');
  contentContainer.innerHTML = '';

  var filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  filteredItems.forEach(item => {
    var itemElement = document.createElement('div');
    itemElement.className = 'menu-item';
    itemElement.innerHTML = `
      ${item.url ? `<img src="${item.url}" alt="${item.name}">` : '<div class="placeholder">FOTO PLATO</div>'}
      <div class="info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        ${getPriceHTML(item)}
      </div>
    `;
    contentContainer.appendChild(itemElement);
  });
}
document.addEventListener('DOMContentLoaded', fetchMenuData);