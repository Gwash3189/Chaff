#Chaff *(n)*: worthless things; rubbish.#


Quick, Test Framework Agnostic Easy Object Mocking in Typescript.



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
			if(this.Bob.Age != 5 && this.Bob.Name !== "Chaff"){
			  console.error("Not Older or named Chaff!");
			} else {
			  Console.log("Older and named Chaff!");
			}
			
	}
}
//Run the test
var Test = new PersonTest();
```

That's all there is to it. 

Happy Testing!
