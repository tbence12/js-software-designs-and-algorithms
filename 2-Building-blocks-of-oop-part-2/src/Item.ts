import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  public static idCounter ;
  public static resetIdCounter(): void {
    Item.idCounter = 0;
  };

  public readonly name: string;
  public value: number;
  public weight: number;
  private readonly id: number;

  constructor(name: string, value: number, weight: number);
  
  constructor(name: string, value: number, weight: number){
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.id = ++Item.idCounter;
  };

  public abstract use(): void;

  public compareTo(other: Item): number {
    if(this.value > other.value) {
      return 1;
    }
    if(this.value < other.value) {
      return -1;
    }
    else {
      return this.name.localeCompare(other.name)
    }
  };

  public toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
  };

  public getId(): number {
    return this.id;
  };
}
