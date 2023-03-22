import { ShipmentType } from "./Shipment";

type ShipmentPrize = {
  [ShipmentType.Letter]: number,
  [ShipmentType.Package]: number,
  [ShipmentType.Oversized]: number,
}

export abstract class Shipper {
  protected shipmentType: ShipmentType;
  private shipmentPrize: ShipmentPrize;

  constructor(shipmentType: ShipmentType, shipmentPrize: ShipmentPrize) {
    this.shipmentType = shipmentType;
    this.shipmentPrize = shipmentPrize;
  }

  public getInstance(): Shipper {
    return this;
  };

  public getCost(weight: number) {
    return weight * this.getDollarsPerOunceRate();
  };

  public getDollarsPerOunceRate(): number {
    return this.shipmentPrize[this.shipmentType];
  }
}

export class AirEastShipper extends Shipper {
  private static shipmentPrize: ShipmentPrize = {
    "Letter": 0.39,
    "Package": 0.25,
    "Oversized": 10.25,
  }

  constructor(shipmentType: ShipmentType) {
    super(shipmentType, AirEastShipper.shipmentPrize);
  }
}

export class ChicagoSprintShipper extends Shipper {
  private static shipmentPrize: ShipmentPrize = {
    "Letter": 0.42,
    "Package": 0.20,
    "Oversized": 0,
  }

  constructor(shipmentType: ShipmentType) {
    super(shipmentType, ChicagoSprintShipper.shipmentPrize);
  }
}

export class PacificParcelShipper extends Shipper {
  private static shipmentPrize: ShipmentPrize = {
    "Letter": 0.51,
    "Package": 0.19,
    "Oversized": 0.21,
  }

  constructor(shipmentType: ShipmentType) {
    super(shipmentType, PacificParcelShipper.shipmentPrize);
  }
}
