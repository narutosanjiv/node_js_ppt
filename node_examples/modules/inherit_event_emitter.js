var EventEmitter = require('events').EventEmitter;
//we can leave EventEmitter's prototype untouched while utilizing its API 

function Dog(name) {
  this.name = name;
}

// we inherit from EventEmitter so we can use the methods it provides, such as
// EventEmitter#on() and EventEmitter#emit()

Dog.prototype.__proto__ = EventEmitter.prototype;

var simon = new Dog('simon');


simon.on('bark', function(){
  console.log(this.name + ' barked');
});

setInterval(function(){
  simon.emit('bark');
}, 500);

