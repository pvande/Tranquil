function buildLayout(layout) {
  if (!layout) { return }

  var table = document.createElement('table');
  table.id = 'layout';

  layout.forEach(buildLayoutRow(table));
  document.body.replaceChild(table, document.getElementById('layout'));
}

function buildLayoutRow(table) {
  return function(row) {
    if (row.constructor != Array) { row = [row] }

    var tr = document.createElement('tr');
    var divTable = document.createElement('div');
    var div = document.createElement('div');
    divTable.className = 'table';
    div.className = 'row';

    divTable.appendChild(div);
    tr.appendChild(divTable);

    row.forEach(buildLayoutCell(div, tr));
    table.appendChild(tr);
  }
}

function buildLayoutCell(row, tr) {
  return function(cell) {
    var td = document.createElement('div');
    td.className = 'cell';
    td.innerText = JSON.stringify(cell);
    if ('height' in cell) { tr.style.height = cell.height }
    row.appendChild(td);
  }
}
