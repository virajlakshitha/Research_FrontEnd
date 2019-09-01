import { Laptop } from './laptop';

export class passingObject{


    laptopPoint:number;
    laptop:Laptop;

    constructor(laptopPoint:number,laptop:Laptop){
        this.laptopPoint = laptopPoint;
        this.laptop = laptop;
    }
}