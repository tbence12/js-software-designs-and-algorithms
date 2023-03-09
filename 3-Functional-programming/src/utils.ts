import { map } from './fp/array';
import { fromNullable } from './fp/maybe';
import { ClientUser, Point } from './types';

export const distance = (pointA: Point, pointB: Point): number => {
  const horizontalDistance = pointB.x - pointA.x;
  const verticalDistance = pointB.y - pointA.y;

  return parseFloat(
    Math.sqrt(verticalDistance ** 2 + horizontalDistance ** 2).toFixed(3)
  );
};

const convertDemands = (client) => {
  const { demands, ...rest } = client;
  const demandsValue = fromNullable(demands);
  return {
    demands: demandsValue,
    ...rest
  }
}

const mapMockClient = map(convertDemands);

export const transClientResponse = async (fetchClient) => {
  const clientResponse = await fetchClient;
  return new Promise<ClientUser[]>((resolve) => {
    resolve(mapMockClient(clientResponse));
  })
}
