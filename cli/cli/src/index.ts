import { addCore } from '@pulchritude-cli/core';
import { addUtils } from '@pulchritude-cli/utils';
import { RUN } from './run';

export const addCli = (a: number, b: number) => {
  return addCore(a, b) + addUtils(a, b);
};

export { RUN };
