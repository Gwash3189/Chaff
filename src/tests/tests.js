var Chaff;
(function (Chaff) {
    var Mock = (function () {
        function Mock(ConstructorFunction) {
            this.ConstructorFunction = ConstructorFunction;
        }
        Mock.prototype.With = function (mutator) {
            mutator(this.MakeSubject());
            return this;
        };

        Mock.prototype.ConstructWith = function (Args) {
            this.Args = Args;
            return this;
        };

        Mock.prototype.Private = function (mutator) {
            mutator(this.MakeSubject());
            return this;
        };

        Mock.prototype.Create = function () {
            return this.MakeSubject();
        };

        Mock.prototype.MakeSubject = function () {
            if (!this.CreatedType) {
                this.CreatedType = this.MakeType(this.Args || []);
            }
            return this.CreatedType;
        };

        Mock.prototype.MakeType = function (Args) {
            var holder = new this.ConstructorFunction();
            this.ConstructorFunction.apply(holder, Args);
            return holder;
        };
        return Mock;
    })();
    Chaff.Mock = Mock;
})(Chaff || (Chaff = {}));

var Person = (function () {
    function Person(Age, name) {
        this.Age = Age;
        this.Name = name;
    }
    Person.prototype.Older = function () {
        return this.Age++;
    };
    Person.prototype.GetName = function () {
        return this.Name;
    };
    return Person;
})();

var ChaffTests = (function () {
    function ChaffTests() {
        var _this = this;
        this.Mock = new Chaff.Mock(Person);
        describe("Public Properties Tests", function () {
            it("Should Assign 4 to a Persons Age", function () {
                var person = _this.Mock.With(function (x) {
                    return x.Age = 4;
                }).Create();
                expect(person.Age).toBe(4);
            });
        });

        describe("Private Properties Tests", function () {
            it("Should Assign 'Adam' to a Persons Name", function () {
                var person = _this.Mock.Private(function (x) {
                    return x.Name = "Adam";
                }).Create();
                expect(person.GetName()).toBe("Adam");
            });
        });

        describe("Arguments being passed in upon initialisation", function () {
            it("Should pass the provided args array object into the constructor", function () {
                var person = new Chaff.Mock(Person).ConstructWith([4, "Adam"]).Create();
                expect(person.Age).toBe(4);
                expect(person.GetName()).toBe("Adam");
            });
        });

        describe("Generic Chaff Tests", function () {
            it("Should return a object with no 'With' call", function () {
                var person = new Chaff.Mock(Person).Create();
                expect(person).toNotBe(null);
                expect(person).toNotBe(undefined);
                expect(person.Age).toBe(undefined);
                expect(person.GetName()).toBe(undefined);
            });
        });
    }
    return ChaffTests;
})();

(function () {
    return new ChaffTests();
})();
