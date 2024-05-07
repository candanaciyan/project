export class Product {
    constructor(
        public id: number,
        public name: string,
        public minimum: number,
        public description : string,
        public image: string,
        public totalAmount: number,
    ) {}
}