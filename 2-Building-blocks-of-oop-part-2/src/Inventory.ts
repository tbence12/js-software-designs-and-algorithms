import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  public addItem(item: Item): void {
    this.items.push(item);
  };

  public sort(): void;
  public sort(comparator: ItemComparator): void;

  public sort(comparator?: ItemComparator): void {
    if(this.items.length > 1) {
      if( comparator ) {
        this.items.sort(comparator.compare);
      } else {
        this.items.sort((a,b) => a.value -b.value);
      }
    }
  };

  public toString(): string {
    return this.items.join(', ');
  };
}
