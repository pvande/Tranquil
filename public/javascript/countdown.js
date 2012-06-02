Tranquil['countdown'] = Tranquil.buildPanel((3).hour(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['countdown'].template;
  this.innerHTML = Milk.render("{{>content}}", data, obj.template);
});

Tranquil['countdown'].template = {
  event: '{{title}}',
  progressive: 'will happen in',
  time: '{{daysFromNow}} days',
  content: '<span class="event">{{>event}}</span>' +
           ' {{>progressive}} ' +
           '<span class="time">{{>time}}</span>',
};