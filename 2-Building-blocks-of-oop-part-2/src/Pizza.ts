import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  public readonly numberOfSlices: number;
  private numberOfEatenSlices: number;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled?: boolean) {
    super('pizza', value, weight, isSpoiled);
    this.numberOfSlices = numberOfSlices;
    this.numberOfEatenSlices = 0;
    if(numberOfSlices === 0) {
      this.isConsumed = true;
    }
  };

  public use(): string {
    if(!this.isConsumed && (this.numberOfEatenSlices < this.numberOfSlices)) {
      this.numberOfEatenSlices += 1;
      if(this.numberOfEatenSlices === this.numberOfSlices) {
        this.isConsumed = true;
      }
      return `You consumed a slice of the ${this.name}.`
    }

    return super.use();
  };

  public getNumberOfEatenSlices(): number {
    return this.numberOfEatenSlices;
  }
}
