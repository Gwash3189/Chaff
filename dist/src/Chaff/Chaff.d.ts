declare module Chaff {
    interface ITestable<SpecClass, Subject> {
        Mock: Mock<Subject>;
    }
    class Mock<T> {
        private Type;
        private CreatedType;
        constructor(Type: any, Args?: any[]);
        public With(mutator: (obj: T) => void): Mock<T>;
        public Private(mutator: (obj: any) => void): Mock<T>;
        public Create(): T;
        private MakeType(Args?);
    }
}
