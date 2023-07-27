function Person(name) {

	const ami = Object.create(Person.prototype);
	// ami.name = "Tonmoy";
	return ami;

}

Person.prototype = {
	eat() {
		console.log("I am eating");
	}
};

const res = Person("Tonmoy");
console.dir(res);