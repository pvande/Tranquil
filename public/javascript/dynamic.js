Tranquil['dynamic'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = {
    content: 'Override <tt>template.content</tt> to hide this message.',
  };
  this.innerHTML = Milk.render("{{>content}}", data, obj.template);
});
