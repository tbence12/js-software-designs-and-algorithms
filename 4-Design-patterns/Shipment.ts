import { AirEastShipper, ChicagoSprintShipper, PacificParcelShipper, Shipper } from "./Shipper";

export type ShipmentState = {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
}

export enum ShipmentType {
  Letter = 'Letter',
  Package = 'Package',
  Oversized = 'Oversized'
}

export class Shipment {
  private static shipment: Shipment;
  private static nextShipmentID = 1;
  private static state: ShipmentState;
  private static type: ShipmentType;
  
  private constructor() {}

  public static getInstance(state: ShipmentState): Shipment {
    if (!Shipment.shipment) {
      Shipment.shipment = new Shipment();
    } 

    Shipment.shipment.setState(state);
    Shipment.shipment.setType(state.weight);

    return Shipment.shipment;
  }

  public static getShipmentID(): number {
    return Shipment.nextShipmentID++;
  }

  private setState(state: ShipmentState): void {
    const {shipmentID, fromZipCode, toZipCode} = state;
    const zipCodeLength = 5;

    if(fromZipCode.length !== zipCodeLength || toZipCode.length !== zipCodeLength) {
      throw new Error(`The ZipCode must contain ${zipCodeLength} characters`);
    }

    if(shipmentID === 0) {
      state.shipmentID = Shipment.getShipmentID();
    }

    Shipment.state = state;
  }

  private setType(weight: number): void {
    if(weight <= 15) {
      Shipment.type = ShipmentType.Letter;
    } 
    else if(weight <= 160) {
      Shipment.type = ShipmentType.Package;
    }
    else {
      Shipment.type = ShipmentType.Oversized;
    }
  }

  private getShipper(zipCode: string): Shipper {
    const zipCodeFirstChar = zipCode.charAt(0);

    if(zipCodeFirstChar <= '9' && zipCodeFirstChar >= '7') {
      return new PacificParcelShipper(Shipment.type);
    }

    if(zipCodeFirstChar <= '6' && zipCodeFirstChar >= '4') {
      return new ChicagoSprintShipper(Shipment.type);
    }

    return new AirEastShipper(Shipment.type);
  }

  public ship(): string {
    const {shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode} = Shipment.state;
    const shipper: Shipper = this.getShipper(fromZipCode);
    return `[SHIPMENT INFO] - ID: ${shipmentID} | FROM: ${fromZipCode}, ${fromAddress} --> TO: ${toZipCode}, ${toAddress} | COST: ${shipper.getCost(weight).toFixed(1)} dollars`;
  }
}
