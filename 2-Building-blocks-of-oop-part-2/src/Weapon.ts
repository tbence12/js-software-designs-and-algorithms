import { Item } from "./Item";

export abstract class Weapon extends Item {
  public static MODIFIER_CHANGE_RATE: number = 0.05;

  protected baseDamage: number;
  protected damageModifier: number;
  private baseDurability: number;
  protected durabilityModifier: number;

  private isBroken: boolean = false;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number);

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.damageModifier = 0;
    this.baseDurability = baseDurability;
    this.durabilityModifier = 0;
  };

  public use(): string {
    if(this.isBroken) {
      return `You can't use the ${this.name}, it is broken.`
    }
    this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
    if(this.getEffectiveDurability() === 0) {
      this.isBroken = true;
    }

    const text = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;

    return this.isBroken ? text + `\nThe ${this.name} breaks.` : text;
  };

  public abstract polish(): void;

  public toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability()*100).toFixed(2)}%`
  };

  public getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  };

  public getEffectiveDurability(): number;
  public getEffectiveDurability(durabilityModifier: number): number;
  
  public getEffectiveDurability(durabilityModifier?: number): number {
    let result: number;

    if(durabilityModifier) {
      result = this.baseDurability + durabilityModifier;
    } else {
      result = this.baseDurability + this.durabilityModifier;
    }

    return result > 0 ? result : 0;
  };
}
