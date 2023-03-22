import { Shipment, ShipmentDecorator, ShipmentInfoType, ShipmentState } from "./Shipment";

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
  weight: 174,
  fromAddress: 'A Street 15.',
  fromZipCode: '93254',
  toAddress: 'B Street 51.',
  toZipCode: '12345'
}

const stateFromClient4: ShipmentState = {
  shipmentID: 0,
  weight: 200,
  fromAddress: 'A Street 11.',
  fromZipCode: '5bdef',
  toAddress: 'B Street 11.',
  toZipCode: '12345'
}

const shipmentInfo: ShipmentInfoType = {
  'Fragile': true,
  'Do Not Leave': false,
  'Return Receipt Requested': false
}

const shipmentInfo2: ShipmentInfoType = {
  'Fragile': false,
  'Do Not Leave': true,
  'Return Receipt Requested': true
}

const shipmentInfo3: ShipmentInfoType = {
  'Fragile': true,
  'Do Not Leave': true,
  'Return Receipt Requested': true
}

const shipment = Shipment.getInstance(stateFromClient);
const shipmentDecorator = new ShipmentDecorator(shipment, shipmentInfo);
console.log(shipmentDecorator.ship());
const shipment2 = Shipment.getInstance(stateFromClient2);
const shipmentDecorator2 = new ShipmentDecorator(shipment2, shipmentInfo2);
console.log(shipmentDecorator2.ship());
const shipment3 = Shipment.getInstance(stateFromClient3);
const shipmentDecorator3 = new ShipmentDecorator(shipment3, shipmentInfo3);
console.log(shipmentDecorator3.ship());
const shipment4 = Shipment.getInstance(stateFromClient4);
const shipmentDecorator4 = new ShipmentDecorator(shipment4, shipmentInfo);
console.log(shipmentDecorator4.ship());
