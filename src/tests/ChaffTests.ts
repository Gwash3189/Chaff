///<reference path="./../Chaff/Chaff.ts" />
declare var describe;
declare var it;
declare var expect;

class Person {
	private Name: string;
	constructor(public Age: number, name: string) {
		this.Name = name;
	}
	public Older(): number {
	    return this.Age++;
	}
	public GetName():string{
		return this.Name;
	}	
}

class ChaffTests implements Chaff.ITestable<ChaffTests, Person>{
	public Mock = new Chaff.Mock<Person>(Person);

	constructor() {
		describe("Public Properties Tests", () => {
			it("Should Assign 4 to a Persons Age", () => {
				var person = this.Mock.With(x => x.Age = 4).Create();
				expect(person.Age).toBe(4);
			});
		});

		describe("Private Properties Tests", () => {
			it("Should Assign 'Adam' to a Persons Name", () => {
				var person = this.Mock.Private(x => x.Name = "Adam").Create();
				expect(person.GetName()).toBe("Adam");
			});
		});

		describe("Arguments being passed in upon initalisation", () =>{
			it("Should pass the provided args array object into the constructor", () => {
				var person = new Chaff.Mock<Person>(Person,new Array<any>(4,"Adam")).Create();
				expect(person.Age).toBe(4);
				expect(person.GetName()).toBe("Adam");
			});
		});
	}
}

var a = new ChaffTests();