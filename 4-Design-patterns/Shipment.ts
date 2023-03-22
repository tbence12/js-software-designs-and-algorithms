import { AirEastShipper, ChicagoSprintShipper, PacificParcelShipper, Shipper } from "./Shipper";

interface ShipmentI {
  ship(): string;
}

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

export class Shipment implements ShipmentI {
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
    return `Shipment with the ID ${shipmentID} will be picked up from ${fromAddress} ${fromZipCode} and shipped to ${toAddress} ${toZipCode} \nCost = ${shipper.getCost(weight).toFixed(1)} dollars`;
  }
}

enum ShipmentInfo {
  Fragile = 'Fragile',
  Do_Not_Leave = 'Do Not Leave',
  Return_Receipt_Requested = 'Return Receipt Requested'
}

export type ShipmentInfoType = {
  [ShipmentInfo.Fragile]: boolean;
  [ShipmentInfo.Do_Not_Leave]: boolean;
  [ShipmentInfo.Return_Receipt_Requested]: boolean;
}

export class ShipmentDecorator implements ShipmentI {
  private wrappee: Shipment;
  private shipmentInfo: ShipmentInfoType;

  constructor(shipment: Shipment, shipmentInfo: ShipmentInfoType) {
    this.wrappee = shipment;
    this.shipmentInfo = shipmentInfo;
  }

  public ship(): string {
    const fragileText = this.shipmentInfo[ShipmentInfo.Fragile] ? `\n**MARK FRAGILE**` : '';
    const doNotLeaveText = this.shipmentInfo[ShipmentInfo.Do_Not_Leave] ?  `\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**` : '';
    const returnReceiptRequestedText = this.shipmentInfo[ShipmentInfo.Return_Receipt_Requested] ? `\n**MARK RETURN RECEIPT REQUESTED**` : '';

    return `${this.wrappee.ship()}${fragileText}${doNotLeaveText}${returnReceiptRequestedText}`
  }
}
