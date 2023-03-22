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
  fromZipCode: '42684',
  toAddress: 'B Street 1.',
  toZipCode: '12345'
}

const stateFromClient3: ShipmentState = {
  shipmentID: 5,
  weight: 74,
  fromAddress: 'A Street 15.',
  fromZipCode: '93254',
  toAddress: 'B Street 51.',
  toZipCode: '12345'
}

const stateFromClient4: ShipmentState = {
  shipmentID: 0,
  weight: 21,
  fromAddress: 'A Street 11.',
  fromZipCode: 'abdef',
  toAddress: 'B Street 11.',
  toZipCode: '12345'
}

const shipment = Shipment.getInstance(stateFromClient);
console.log(shipment.ship());
const shipment2 = Shipment.getInstance(stateFromClient2);
console.log(shipment2.ship());
const shipment3 = Shipment.getInstance(stateFromClient3);
console.log(shipment3.ship());
const shipment4 = Shipment.getInstance(stateFromClient4);
console.log(shipment4.ship());
