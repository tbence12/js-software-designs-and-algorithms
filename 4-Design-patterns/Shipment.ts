import { AirEastShipper, ChicagoSprintShipper, PacificParcelShipper, Shipper } from "./Shipper";

export type ShipmentState = {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
}

export class Shipment {
  private static shipment: Shipment;
  private static nextShipmentID = 1;
  private static state: ShipmentState;
  private rateCentsPerOunce = 39;
  private lengthOfZipCode = 5;
  
  private constructor() {}

  public static getInstance(state: ShipmentState): Shipment {
    if (!Shipment.shipment) {
      Shipment.shipment = new Shipment();
    } 

    Shipment.shipment.setState(state);

    return Shipment.shipment;
  }

  public static getShipmentID(): number {
    return Shipment.nextShipmentID++;
  }

  private setState(state: ShipmentState): void {
    const {shipmentID, fromZipCode, toZipCode} = state;
    const zipCodeLength = this.lengthOfZipCode;

    if(fromZipCode.length !== zipCodeLength || toZipCode.length !== zipCodeLength) {
      throw new Error(`The ZipCode must contain ${zipCodeLength} characters`);
    }

    if(shipmentID === 0) {
      state.shipmentID = Shipment.getShipmentID();
    }

    Shipment.state = state;
  }

  private getShipper(zipCode: string): Shipper {
    const zipCodeFirstChar = zipCode.charAt(0);

    if(zipCodeFirstChar <= '9' && zipCodeFirstChar >= '7') {
      return new PacificParcelShipper();
    }

    if(zipCodeFirstChar <= '6' && zipCodeFirstChar >= '4') {
      return new ChicagoSprintShipper();
    }

    return new AirEastShipper();
  }

  public ship(): string {
    const {shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode} = Shipment.state;
    const shipper: Shipper = this.getShipper(fromZipCode);
    return `[SHIPMENT INFO] - ID: ${shipmentID} | FROM: ${fromZipCode}, ${fromAddress} --> TO: ${toZipCode}, ${toAddress} | COST: ${shipper.getCost(weight)} cents`;
  }
}
