export class Shelf {
    constructor(
        public id: number,
        public capacity: number,
        public count: number,
        public image: string,
        public productId: number,
        public productName: string,
    ) {}
}