import { addCore } from '@pulchritude-cli/core';
import { addUtils } from '@pulchritude-cli/utils';

export const addCli = (a: number, b: number) => {
  return addCore(a, b) + addUtils(a, b);
};
