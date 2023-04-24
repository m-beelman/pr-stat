import * as core from '@actions/core'
import * as github from '@actions/github'
import { GetPullRequestData } from './GitHubCliHelper'

type Inputs = {
  name: string
}

// eslint-disable-next-line @typescript-eslint/require-await
export const run = async (inputs: Inputs): Promise<number> => {
  
  // take care that action is running only in PR context
  if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
    core.setFailed('Action is running outside of PR context')
    return 0
  }

  // get PR number
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const cliPullRequestData = await GetPullRequestData(github.context.issue.number)
  core.info(JSON.stringify(cliPullRequestData))

//  core.info(`my name is ${inputs.name}`)
  return 12
}
