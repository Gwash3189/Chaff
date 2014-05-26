module Chaff {
    export interface ITest<Subject> {
        Mock: Chaff.Mock<Subject>;
    }
    export class Mock<T> {
        private CreatedType:T;
        private Args:Array<any>;

        constructor(private ConstructorFunction:any) {}

        public With(mutator:(obj:T)=>void):Mock<T> {
            mutator(this.MakeSubject());
            return this;
        }

        public ConstructWith(Args: Array<any>):Mock<T>{
            this.Args = Args;
            return this;
        }

        public Private(mutator:(obj:any)=>void):Mock<T> {
            mutator(this.MakeSubject());
            return this;
        }

        public Create():T {
            return this.MakeSubject();
        }

        public MakeSubject():T {
            if (!this.CreatedType) {
                this.CreatedType = this.MakeType(this.Args || []);
            }
            return this.CreatedType
        }

        private MakeType(Args?:Array<any>):T {
            var holder = new this.ConstructorFunction();
            this.ConstructorFunction.apply(holder, Args);
            return holder;
        }
    }
}



