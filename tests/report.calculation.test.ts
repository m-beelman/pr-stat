// Copyright (c) 2023 Koninklijke Philips N.V.
import { IPullRequest } from '../src/Interfaces/PullRequestTypes'
import { PullRequest } from '../src/PullRequest.Definitions'
import {
  GenerateEventTimeline,
  GetLeadTimeForPullRequest,
  GetTimeSpendOnBranchBeforePRCreated,
  GetTimeSpendOnBranchBeforePRMerged,
  GetTimeToMergeAfterLastReview,
  MillisecondsToReadableDuration,
} from '../src/Report.Calculation'
import { DataFromBigPullRequest } from './pr_sample_data'

let PullRequestJsonModel: unknown
let PullRequestStatModel: IPullRequest

beforeAll(() => {
  PullRequestJsonModel = DataFromBigPullRequest
  PullRequestStatModel = PullRequest.CreateFromJson(PullRequestJsonModel)
})

test('Check calculation of Pull Request lead time', () => {
  const leadTime = GetLeadTimeForPullRequest(PullRequestStatModel)
  expect(leadTime).toBe(22110891000)
})

test('Check event timeline generation', () => {
  const eventTimeline = GenerateEventTimeline(PullRequestStatModel)
  expect(eventTimeline.length).toBeGreaterThan(0)
})

test('Check calculation of "Time spend on branch before PR is created"', () => {
  const timeSpend = GetTimeSpendOnBranchBeforePRCreated(PullRequestStatModel)
  expect(timeSpend).toBeGreaterThan(0)
  console.log(MillisecondsToReadableDuration(timeSpend))
})

test('Check calculation of "Time spend on branch before PR is merged"', () => {
  const timeSpend = GetTimeSpendOnBranchBeforePRMerged(PullRequestStatModel)
  expect(timeSpend).toBeGreaterThan(0)
  console.log(MillisecondsToReadableDuration(timeSpend))
})

test('Check calculation of "Time to merge after the last review"', () => {
  const timeSpend = GetTimeToMergeAfterLastReview(PullRequestStatModel)
  expect(timeSpend).toBeGreaterThan(0)
  console.log(MillisecondsToReadableDuration(timeSpend))
})
