function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getMenuData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuSheet = ss.getSheetByName('Menu');
  var categoriasSheet = ss.getSheetByName('Categorias');

  var menuData = menuSheet.getDataRange().getValues();
  var categoriasData = categoriasSheet.getDataRange().getValues();

  return {menu: menuData, categorias: categoriasData};
}
