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
