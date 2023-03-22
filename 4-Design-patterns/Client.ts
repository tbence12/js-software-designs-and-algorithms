import { Shipment, ShipmentState } from "./Shipment";

const stateFromClient: ShipmentState = {
  shipmentID: 0,
  weight: 10,
  fromAddress: 'A Street 2.',
  fromZipCode: '25345',
  toAddress: 'B Street 4.',
  toZipCode: '12345'
}

const stateFromClient2: ShipmentState = {
  shipmentID: 0,
  weight: 16,
  fromAddress: 'A Street 5.',
  fromZipCode: '25345',
  toAddress: 'B Street 1.',
  toZipCode: '12345'
}

const shipment = Shipment.getInstance(stateFromClient);
console.log(shipment.ship());
const shipment2 = Shipment.getInstance(stateFromClient2);
console.log(shipment2.ship());
