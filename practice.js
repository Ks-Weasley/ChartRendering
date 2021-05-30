console.log(pubsub);


var myArray = [];
console.log("Hello world!");

const sub1 = pubsub.subscribe('hello/world', function(text) {
	console.log(text);
});

pubsub.publish('hello/world', ['Initiating']);

for(let i=0; i<10; i++){
	pubsub.publish("hello/world", [i+" try"]);
}
console.log("done");
