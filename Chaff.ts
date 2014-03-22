module Chaff {
    export interface ITestable<SpecClass,Subject>{
		Mock: Chaff.Mock<Subject>;
	}
	export class Mock<T>{	
		private CreatedType: T;
		constructor(private Type: any, Args? : Array<any>){
			if(Args){
				this.MakeType(Args)
			}
		}
		public With(mutator: (obj:T)=>void): Mock<T>{
			if(!this.CreatedType){
				this.MakeType();
			}
            mutator(this.CreatedType);
            return this;
		}
		public Private(mutator: (obj: any)=>void): Mock<T>{
			if (!this.CreatedType) {
                var t = new this.Type();
                this.CreatedType = t;
            }
            mutator(this.CreatedType);
            return this;
		}
		public Create(): T{
			return this.CreatedType
		}

		private MakeType(Args? : Array<any>){
			var holder = new this.Type();
            this.Type.apply(holder, Args);
            this.CreatedType = holder;
		}
	}	
}



