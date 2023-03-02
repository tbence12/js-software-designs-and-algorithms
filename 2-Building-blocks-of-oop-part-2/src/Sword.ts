import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('sword', baseDamage, baseDurability, value, weight);
  };

  public polish(): void {
    if (this.damageModifier < 0.25 && this.baseDamage <= 100) {
      const increasedDamage = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;
      if(increasedDamage <= 0.25) {
        this.damageModifier = increasedDamage;
      }
    }
  }
}
