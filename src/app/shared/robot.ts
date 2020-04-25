export class Robot {

    _id: String;
    name: String;
    type: String;
    price: Number;

    constructor(name: String, type: String = "assembly", price: Number) {
        this.name = name;
        this.type = type;
        this.price = price;
    }
}
