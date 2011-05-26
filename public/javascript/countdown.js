Tranquil['countdown'] = Tranquil.buildPanel(1000 * 60 * 60, function(obj, data) {
  this.innerHTML = Milk.render(obj.template, data);
});
