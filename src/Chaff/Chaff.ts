module Chaff {
    export interface ITestable<SpecClass,Subject> {
        Mock: Chaff.Mock<Subject>;
    }
    export class Mock<T> {
        private CreatedType:T;
        private Args:Array<any>;

        constructor(private Type:any, Args?:Array<any>) {
            if (Args) {
                this.Args = Args;
            }
        }

        public With(mutator:(obj:T)=>void):Mock<T> {
            mutator(this.MakeSubject());
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
            var holder = new this.Type();
            this.Type.apply(holder, Args);
            return holder;
        }
    }
}



