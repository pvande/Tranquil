Tranquil['grid'] = Tranquil.buildPanel((60).seconds(), function(obj, data) {
  var container = this;
  data = data || obj;

  requireAllJavascript(listify(data.javascript), function() {
    // Load all required stylesheets.
    // TODO: Reload stylesheets if changed.
    listify(data.stylesheet).forEach(requireStylesheet);

    // If nothing has changed since we were last updated, we have no work to do.
    var newLayoutJSON = JSON.stringify(listify(data.layout));
    var oldLayoutJSON = container.getAttribute('data-json');
    if (oldLayoutJSON == newLayoutJSON) { return }

    // Get a copy of both the previous layout and the current one.
    var oldGrid = JSON.parse(oldLayoutJSON) || [];
    var newGrid = JSON.parse(newLayoutJSON) || [];

    // Coerce both layouts to a list of arrays.
    oldGrid = oldGrid.map(listify);
    newGrid = newGrid.map(listify);

    // Create the table for the layout, if it doesn't exist.
    // Yes, we use a table for layout here.  No, we don't like it, but the
    // CSS3 flexbox model has proven completely unusable, as the height and
    // width of the "cells" are too "soft" -- you cannot derive a percentage
    // value from them.
    var table = container.children[0];
    if (!table) {
      table = document.createElement('table');
      container.appendChild(table);
    }

    // Walk the set of changes, and apply the appropriate actions to the DOM.
    walkDiff(oldGrid, newGrid, {
      // Data Storage
      'rows': Array.prototype.slice.call(table.children, 0),

      // Actions
      'keep': function() { this.rows.shift() },
      'insert': function(contents) {
        // Create a new `tr` element, augmented with the appropriate containers.
        var row = document.createElement('tr');
        row.innerHTML = '<td><div class="flex"></div></td>';
        table.insertBefore(row, this.rows[0]);
        this.rows.unshift(row);

        // Populate the appropriate instance variables.
        this._fetchRow();

        // Create new cells for everything in the new row.
        contents.forEach(this._createCell.bind(this));
      },
      'change': function(target, source) {
        this._fetchRow();

        var actions = {
          // Data Storage
          'cells': Array.prototype.slice.call(this.container.children, 0),

          // Actions
          'keep': function() { this.cells.shift() },
          'insert': function(obj) { this._createCell(obj) },
          'change': function(obj) { this.delete(), this.insert(obj) },
          'delete': function() {
            var cell = this.cells.shift();
            this._teardownCell(cell);
            cell.parentNode.removeChild(cell);
          },
        };
        actions.__proto__ = this;
        walkDiff(source, target, actions);
      },
      'delete': function() {
        this._fetchRow();
        this.cells.forEach(this._teardownCell);
        this.tr.parentNode.removeChild(this.tr);
      },

      // Helper Functions
      '_fetchRow': function() {
        this.tr = this.rows.shift();
        this.container = this.tr.firstChild.firstChild;
        this.cells = Array.prototype.slice.call(this.container.children, 0);
      },

      '_createCell': function(obj) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        cell.classList.add(obj.type);
        this.container.insertBefore(cell, this.cells[0]);

        loadType(
          obj.type,
          function() { Tranquil[obj.type].call(cell, obj) },
          function() { node.innerHTML = "No such type -- '" + obj.type + "'!" }
        )
      },
      
      '_teardownCell': function(cell) {
        var intervalID = cell.getAttribute('data-interval-id');
        if (intervalID) clearInterval(intervalID);
      },
    });

    // Save the new layout string.
    container.setAttribute('data-json', newLayoutJSON);
  });
});

Tranquil['grid'].stylesheet = '/stylesheets/layout/grid.css';
