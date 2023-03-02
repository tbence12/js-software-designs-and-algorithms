import { Item } from "./Item";

export abstract class Consumable extends Item {
  public isConsumed: boolean;
  public isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
    super(name, value, weight);
    this.isConsumed = false;
    this.isSpoiled = isSpoiled;
  };

  public use(): string {
   if(this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    } else {
      const text = `You consumed the ${this.name}.`
      return !this.isSpoiled ? text : `${text}\nYou feel sick.`
    }
  };
}
