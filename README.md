#Chaff *(n)*: worthless things; rubbish.#


A small (500 byte), test framework agnostic, object mocking library.

##Where##

Should work in all ES3 browsers. 
Tested with latest Chrome & Firefox. 

##Why##

Ultimately, Chaff's job is to provide an easy, nice looking way to create mock objects for Testing.

##How##

###Typescript###

Chaff is written in Typescript, and was created to be used with Typescript (This does not mean you can't use it in JavaScript though!). 

Chaff offers an easy to use interface with (nearly) complete type safety. 

####Simple Example####

```Typescript
</// reference path="Chaff.ts" />

// class to test
class Person{    
    constructor(public Age: number){}
	Older(){
		this.Age ++;
	}
}

//Test Class
class PersonTest implements Chaff.ITestable<PersonTest,Person>{
  // define a new Mock of type person. 
  // We must also pass in the 'type' of object we are testing. In this case 'Person' is the type. 
	public Mock = new Chaff.Mock<Person>(Person);
	public Bob: Person;
	constructor() {			
		this.Bob = this.Mock
		//complete type safety from within 'with' calls. 
			.With(x => x.Age = 4)
		//all Chaff / Mock calls must end in a .Create()
			.Create();
			this.Bob.Older(); // Age ++
			if(this.Bob.Age != 5){
			  console.error("Not Older!");
			} else {
			  Console.log("Older!");
			}
			
	}
}
//Run the test
var Test = new PersonTest();
```

####Private Properties####

In the case that you have private properties that must be set, Chaff can do that to. Although, this is where we lose out type safety. 

```Typescript
</// reference path="Chaff.ts" />

// class to test
class Person{	
  private Name: string
	constructor(public Age: number, name: string){
		this.name = name;
	}
	Older(){
		this.Age ++;
	}
	GetName():string{
		return this.Name;
	}
}

//Test Class
class PersonTest implements Chaff.ITestable<PersonTest,Person>{
  
	public Mock = new Chaff.Mock<Person>(Person);
	public Bob: Person;
	constructor() {			
		this.Bob = this.Mock
			.With(x => x.Age = 4)
			.Private(x => x.Name = "Chaff"); // With .Private calls, receive an object of type any. 
			.Create();                      // Becuase of this, we lose all type safety as well as intelisense. 
			
			//Test
			
			this.Bob.Older(); // Age === 5
			if(this.Bob.Age != 5 && this.Bob.GetName() !== "Chaff"){
			  console.error("Not Older or named Chaff!");
			} else {
			  Console.log("Older and named Chaff!");
			}
			
	}
}
//Run the test
var Test = new PersonTest();
```
####Initialisation Values####

If you have values that must be available in the constructor upon object initalisation, then you can provide these values when your Mock object is created. 


```Typescript
</// reference path="Chaff.ts" />

// class to test
class Person{	
  private Name: string
	constructor(public Age: number, name: string){
		this.name = name;
	}
	Older(){
		this.Age ++;
	}
	GetName():string{
		return this.Name;
	}
}

//Test Class
class PersonTest implements Chaff.ITestable<PersonTest,Person>{
    // provide them in the form of an array.
    // make sure to provide them in the same order in which they appear 
    // in the objects  constructor function. 
	public Mock = new Chaff.Mock<Person>(Person, new Array<any>(4,"Chaff"));
	public Bob: Person;
	constructor() {			
		this.Bob = this.Mock
			.Create(); 

			//Test
			
			this.Bob.Older(); // Age === 5
			if(this.Bob.Age != 5 && this.Bob.GetName() !== "Chaff"){
			  console.error("Not Older or named Chaff!");
			} else {
			  Console.log("Older and named Chaff!");
			}
			
	}
}
//Run the test
var Test = new PersonTest();
```
###JavaScript###
####Example####
```javascript
var Person = function(Age, Name){
    this.Age = Age;
    this.Name = Name;
}

var PersonTest = function(){
    this.Mock = new Chaff.Mock(Person, [undefined, "Chaff"]);
    
    var mockPerson = this.Mock
        // No use for Private as there is not Private in Javascript.
        .With(function(person){
            person.Age = 4;
        })
        .Create(); //returns a new person object with an age of 4. 
        
    if(mockPerson.Age !== 4 && mockperson.Name !=== "Chaff"){
        console.error("Not 4 and not Chaff");
    } else {
        console.log("4 and Chaff!");
    }
}
```

### Testing ###

To run any tests, simply install [Testem](https://github.com/airportyh/testem "Testem"). Navigate to the ```/src/tests``` directory and run ```testem```. 

For better or further examples, please see src/tests/ChaffTests.ts. 

Happy Testing!
