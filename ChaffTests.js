var Chaff;
(function (Chaff) {
    var Mock = (function () {
        function Mock(Type, Args) {
            this.Type = Type;
            if (Args) {
                this.MakeType(Args);
            }
        }
        Mock.prototype.With = function (mutator) {
            if (!this.CreatedType) {
                this.MakeType();
            }
            mutator(this.CreatedType);
            return this;
        };
        Mock.prototype.Private = function (mutator) {
            if (!this.CreatedType) {
                var t = new this.Type();
                this.CreatedType = t;
            }
            mutator(this.CreatedType);
            return this;
        };
        Mock.prototype.Create = function () {
            return this.CreatedType;
        };

        Mock.prototype.MakeType = function (Args) {
            var holder = new this.Type();
            this.Type.apply(holder, Args);
            this.CreatedType = holder;
        };
        return Mock;
    })();
    Chaff.Mock = Mock;
})(Chaff || (Chaff = {}));
///<reference path="Chaff.ts" />

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

        describe("Arguments being passed in upon initalisation", function () {
            it("Should pass the provided args array literal into the constructor", function () {
                var person = new Chaff.Mock(Person, [4, "Adam"]).Create();
                expect(person.Age).toBe(4);
                expect(person.GetName()).toBe("Adam");
            });

            it("Should pass the provided args array object into the constructor", function () {
                var person = new Chaff.Mock(Person, new Array(4, "Adam")).Create();
                expect(person.Age).toBe(4);
                expect(person.GetName()).toBe("Adam");
            });
        });
    }
    return ChaffTests;
})();

var a = new ChaffTests();
