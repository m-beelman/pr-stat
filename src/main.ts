import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  await run({
    ShowAdditions: core.getInput('ShowAdditions', { required: false }),
    ShowDeleted: core.getInput('ShowDeleted', { required: false }),
    ShowNumberOfChangedFiles: core.getInput('ShowNumberOfChangedFiles', { required: false }),
    ShowNumberOfCommits: core.getInput('ShowNumberOfCommits', { required: false }),
    ShowNumberOfReviews: core.getInput('ShowNumberOfReviews', { required: false }),
    ShowNumberOfComments: core.getInput('ShowNumberOfComments', { required: false }),
    ShowPRLeadTime: core.getInput('ShowPRLeadTime', { required: false }),
    ShowTimeSpendOnBranchBeforePrCreated: core.getInput('ShowTimeSpendOnBranchBeforePrCreated', { required: false }),
    ShowTimeSpendOnBranchBeforePrMerged: core.getInput('ShowTimeSpendOnBranchBeforePrMerged', { required: false }),
    ShowTimeToMergeAfterLastReview: core.getInput('ShowTimeToMergeAfterLastReview', { required: false }),
  })
}

main().catch((e) => core.setFailed(e instanceof Error ? e : String(e)))
