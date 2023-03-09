import { map } from './fp/array';
import { fromNullable } from './fp/maybe';
import { mockClient, mockExecutor } from './mocks';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchExecutor = () => sleep(500)
  .then(() => mockExecutor);

const convertDemands = (client) => {
  const { demands, ...rest } = client;
  const demandsValue = fromNullable(demands);
  return {
    demands: demandsValue,
    ...rest
  }
}

const mapMockClient = map(convertDemands);

export const fetchClient = () => sleep(700)
  .then(() => mapMockClient(mockClient));
