module Chaff {
    export interface ITestable<SpecClass,Subject>{
		Mock: Mocker.Mock<Subject>;
	}
	export class Mock<T>{	
		private CreatedType: T;
		constructor(private Type: any){}
		public With(mutator: (obj:T)=>void): Mock<T>{
			var t = new this.Type();
			this.CreatedType = t;
			mutator(t);
			return this;
		}
		public Private(mutator: (obj: any)=>void): Mock<T>{
			if(!this.CreatedType){
				var t = new this.Type();
				this.CreatedType = t;
			}
			mutator(t);
			return this;
		}
		public Create(): T{
			return this.CreatedType
		}
	}	
}

