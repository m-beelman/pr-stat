import * as core from '@actions/core'

type Inputs = {
  name: string
}

// eslint-disable-next-line @typescript-eslint/require-await
export const run = async (inputs: Inputs): Promise<number> => {
  core.info(`my name is ${inputs.name}`)
  return 12
}
