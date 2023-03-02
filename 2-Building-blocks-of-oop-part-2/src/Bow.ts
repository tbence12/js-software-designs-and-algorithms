import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('bow', baseDamage, baseDurability, value, weight);
  };

  public polish(): void {
    const increasedDurability = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE
    if (this.getEffectiveDurability(increasedDurability) <= 1) {
      this.durabilityModifier = increasedDurability;
    }
  }
}
