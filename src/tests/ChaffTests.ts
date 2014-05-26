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

class ChaffTests implements Chaff.ITest<Person>{
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

		describe("Arguments being passed in upon initialisation", () =>{
			it("Should pass the provided args array object into the constructor", () => {
				var person = new Chaff.Mock<Person>(Person).ConstructWith([4, "Adam"]).Create();
				expect(person.Age).toBe(4);
				expect(person.GetName()).toBe("Adam");
			});
		});

        describe("Generic Chaff Tests", () => {
            it("Should return a object with no 'With' call", () => {
                var person = new Chaff.Mock<Person>(Person).Create();
                expect(person).toNotBe(null);
                expect(person).toNotBe(undefined);
                expect(person.Age).toBe(undefined);
                expect(person.GetName()).toBe(undefined);
            })
        })
	}
}

(() => {
    return new ChaffTests();
})();
