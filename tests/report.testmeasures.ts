// Copyright (c) 2023 Koninklijke Philips N.V.

import {
  GetLeadTimeForPullRequest,
  GetTimeSpendOnBranchBeforePRCreated,
  GetTimeSpendOnBranchBeforePRMerged,
  GetTimeToMergeAfterLastReview,
  MillisecondsToReadableDuration,
} from '../src/Report.Calculation'
import { ReportMeasurementEntry } from '../src/Report.Definitions'
import {
  GetAddedLines,
  GetDeletedLines,
  GetChangedFilesCount,
  GetCommitsCount,
  GetReviewCount,
  GetCommentCount,
} from '../src/Report.Functions'

export const TestReportMetrics = new Array<ReportMeasurementEntry>()
TestReportMetrics.push(new ReportMeasurementEntry('additions', 'Additions', 0, 0, 'ShowAdditions', GetAddedLines))
TestReportMetrics.push(new ReportMeasurementEntry('deleted', 'Deleted', 0, 0, 'ShowDeleted', GetDeletedLines))
TestReportMetrics.push(
  new ReportMeasurementEntry('changedFiles', 'Changed Files', 0, 0, 'ShowNumberOfChangedFiles', GetChangedFilesCount)
)
TestReportMetrics.push(new ReportMeasurementEntry('commits', 'Commits', 0, 0, 'ShowNumberOfCommits', GetCommitsCount))
TestReportMetrics.push(new ReportMeasurementEntry('reviews', 'Reviews', 0, 0, 'ShowNumberOfReviews', GetReviewCount))
TestReportMetrics.push(
  new ReportMeasurementEntry('comments', 'Comments', 0, 0, 'ShowNumberOfComments', GetCommentCount)
)

export const TestReportMeasures = new Array<ReportMeasurementEntry>()
TestReportMeasures.push(
  new ReportMeasurementEntry('pr_lead_time', 'PR lead time', 0, 0, 'ShowPRLeadTime', (pr) =>
    MillisecondsToReadableDuration(GetLeadTimeForPullRequest(pr))
  )
)
TestReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_branch_before_pr',
    'Time that was spend on the branch before the PR was created',
    0,
    0,
    'ShowTimeSpendOnBranchBeforePrCreated',
    (pr) => MillisecondsToReadableDuration(GetTimeSpendOnBranchBeforePRCreated(pr))
  )
)
TestReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_branch_before_merge',
    'Time that was spend on the branch before the PR was merged',
    0,
    0,
    'ShowTimeSpendOnBranchBeforePrMerged',
    (pr) => MillisecondsToReadableDuration(GetTimeSpendOnBranchBeforePRMerged(pr))
  )
)
TestReportMeasures.push(
  new ReportMeasurementEntry(
    'pr_time_to_merge_after_last_review',
    'Time to merge after last review',
    0,
    0,
    'ShowTimeToMergeAfterLastReview',
    (pr) => MillisecondsToReadableDuration(GetTimeToMergeAfterLastReview(pr))
  )
)
