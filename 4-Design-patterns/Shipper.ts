export abstract class Shipper {
  protected rateCentsPerOunce: number;

  constructor(rateCentsPerOunce: number) {
    this.rateCentsPerOunce = rateCentsPerOunce;
  }

  public getInstance(): Shipper {
    return this;
  };

  public getCost(weight: number) {
    return weight * this.rateCentsPerOunce;
  };
}

export class AirEastShipper extends Shipper {
  constructor() {
    super(39);
  }
}

export class ChicagoSprintShipper extends Shipper {
  constructor() {
    super(42);
  }
}

export class PacificParcelShipper extends Shipper {
  constructor() {
    super(51);
  }
}
