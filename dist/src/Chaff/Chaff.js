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
