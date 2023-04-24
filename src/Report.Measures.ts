// Copyright (c) 2023 Koninklijke Philips N.V.

import {
  MillisecondsToReadableDuration,
  GetLeadTimeForPullRequest,
  GetTimeSpendOnBranchBeforePRCreated,
  GetTimeSpendOnBranchBeforePRMerged,
  GetTimeToMergeAfterLastReview,
} from './Report.Calculation'
import { ReportMeasurementEntry } from './Report.Definitions'
import {
  GetAddedLines,
  GetDeletedLines,
  GetChangedFilesCount,
  GetCommitsCount,
  GetReviewCount,
  GetCommentCount,
} from './Report.Functions'

export const ReportMetrics = new Array<ReportMeasurementEntry>()
ReportMetrics.push(new ReportMeasurementEntry('additions', 'Additions', 0, 0, 'ShowAdditions', GetAddedLines))
ReportMetrics.push(new ReportMeasurementEntry('deleted', 'Deleted', 0, 0, 'ShowDeleted', GetDeletedLines))
ReportMetrics.push(
  new ReportMeasurementEntry('changedFiles', 'Changed Files', 0, 0, 'ShowNumberOfChangedFiles', GetChangedFilesCount)
)
ReportMetrics.push(new ReportMeasurementEntry('commits', 'Commits', 0, 0, 'ShowNumberOfCommits', GetCommitsCount))
ReportMetrics.push(new ReportMeasurementEntry('reviews', 'Reviews', 0, 0, 'ShowNumberOfReviews', GetReviewCount))
ReportMetrics.push(new ReportMeasurementEntry('comments', 'Comments', 0, 0, 'ShowNumberOfComments', GetCommentCount))

export const ReportMeasures = new Array<ReportMeasurementEntry>()
ReportMeasures.push(
  new ReportMeasurementEntry('pr_lead_time', 'PR lead time', 0, 0, 'ShowPRLeadTime', (pr) =>
    MillisecondsToReadableDuration(GetLeadTimeForPullRequest(pr))
  )
)
ReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_branch_before_pr',
    'Time that was spend on the branch before the PR was created',
    0,
    0,
    'ShowTimeSpendOnBranchBeforePrCreated',
    (pr) => MillisecondsToReadableDuration(GetTimeSpendOnBranchBeforePRCreated(pr))
  )
)
ReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_branch_before_merge',
    'Time that was spend on the branch before the PR was merged',
    0,
    0,
    'ShowTimeSpendOnBranchBeforePrMerged',
    (pr) => MillisecondsToReadableDuration(GetTimeSpendOnBranchBeforePRMerged(pr))
  )
)
ReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_to_merge_after_last_review',
    'Time to merge after last review',
    0,
    0,
    'ShowTimeToMergeAfterLastReview',
    (pr) => MillisecondsToReadableDuration(GetTimeToMergeAfterLastReview(pr))
  )
)
