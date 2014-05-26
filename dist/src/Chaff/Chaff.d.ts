declare module Chaff {
    interface ITest<Subject> {
        Mock: Mock<Subject>;
    }
    class Mock<T> {
        private ConstructorFunction;
        private CreatedType;
        private Args;
        constructor(ConstructorFunction: any);
        public With(mutator: (obj: T) => void): Mock<T>;
        public ConstructWith(Args: any[]): Mock<T>;
        public Private(mutator: (obj: any) => void): Mock<T>;
        public Create(): T;
        public MakeSubject(): T;
        private MakeType(Args?);
    }
}
