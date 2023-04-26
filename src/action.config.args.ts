//GENERATED FILE FROM report.config.tests.ts - DO NOT EDIT!!!

import * as core from '@actions/core'

export const config = {
  ShowAdditions: core.getInput('ShowAdditions', { required: false }),
  ShowDeleted: core.getInput('ShowDeleted', { required: false }),
  ShowNumberOfChangedFiles: core.getInput('ShowNumberOfChangedFiles', { required: false }),
  ShowNumberOfCommits: core.getInput('ShowNumberOfCommits', { required: false }),
  ShowNumberOfReviews: core.getInput('ShowNumberOfReviews', { required: false }),
  ShowNumberOfComments: core.getInput('ShowNumberOfComments', { required: false }),
  ShowTimeTotalRuntimeForLastStatusCheckRun: core.getInput('ShowTimeTotalRuntimeForLastStatusCheckRun', { required: false }),
  ShowTimeSpendOnPrForLastStatusCheckRun: core.getInput('ShowTimeSpendOnPrForLastStatusCheckRun', { required: false }),
  ShowPRLeadTime: core.getInput('ShowPRLeadTime', { required: false }),
  ShowTimeSpendOnBranchBeforePrCreated: core.getInput('ShowTimeSpendOnBranchBeforePrCreated', { required: false }),
  ShowTimeSpendOnBranchBeforePrMerged: core.getInput('ShowTimeSpendOnBranchBeforePrMerged', { required: false }),
  ShowTimeToMergeAfterLastReview: core.getInput('ShowTimeToMergeAfterLastReview', { required: false }),
}
