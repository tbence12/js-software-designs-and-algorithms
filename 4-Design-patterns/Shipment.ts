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

  public ship(): string {
    const {shipmentID, weight, fromAddress, fromZipCode, toAddress, toZipCode} = Shipment.state;
    return `[SHIPMENT INFO] - ID: ${shipmentID} | FROM: ${fromZipCode}, ${fromAddress} --> TO: ${toZipCode}, ${toAddress} | COST: ${weight * this.rateCentsPerOunce} cents`;
  }
}
