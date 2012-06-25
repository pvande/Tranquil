Tranquil['static'] = function(obj) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['static'].template;
  this.innerHTML = Milk.render("{{>content}}", obj, obj.template);
};

Tranquil['static'].javascript = '/javascript/vendor/milk.min.js';

Tranquil['static'].parameters = [
  { name: 'content', type: 'text' },
];

Tranquil['static'].template = {
  content: 'Override <tt>template.content</tt> to hide this message.',
};