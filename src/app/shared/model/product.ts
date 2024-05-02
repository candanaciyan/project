export class Product {
    constructor(
        public id: number,
        public name: string,
        public quantity: number,
        public minimum: number,
        public description : string,
        public image: string,
    ) {}
}