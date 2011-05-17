function buildLayout(layout) {
  if (!layout) { return }

  var table = document.createElement('table');
  table.id = 'layout';

  layout.forEach(function(row) {
    if (row.constructor != Array) { row = [row] }

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var divRow = document.createElement('div');
    td.className = 'table';
    divRow.className = 'row';

    tr.appendChild(td);
    td.appendChild(divRow);

    row.forEach(function(cell) {
      var div = document.createElement('div');
      div.className = 'cell';

      div.innerHTML = JSON.stringify(cell);

      if ('height' in cell) { tr.style.height = cell.height }
      divRow.appendChild(div);
    });

    table.appendChild(tr);
  });

  document.body.replaceChild(table, document.getElementById('layout'));
}
