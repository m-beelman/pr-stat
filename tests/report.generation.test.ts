// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from '../src/Interfaces/PullRequestTypes'
import { PullRequest } from '../src/PullRequest.Definitions'
import { Report } from '../src/Report.Definitions'
import { ReportGenerator } from '../src/Report.Generation'
import { DataFromBigPullRequest } from './pr_sample_data'
import { TestReportMeasures, TestReportMetrics } from './report.testmeasures'
import { tsMarkdown } from 'ts-markdown'

let PullRequestJsonModel: unknown
let PullRequestStatModel: IPullRequest

beforeAll(() => {
  PullRequestJsonModel = DataFromBigPullRequest
  PullRequestStatModel = PullRequest.CreateFromJson(PullRequestJsonModel)
})

test('Check if header is generated as expected', () => {
  const generator = new ReportGenerator()
  expect(tsMarkdown([generator.GenerateHeader(PullRequestStatModel)])).toBe('# Pull Request Report for PR #381')
})

test('Check if table is generated as expected', () => {
  const expectedResult =
    '| Label                                                       | Value      |\n| ----------------------------------------------------------- | ---------- |\n| Additions                                                   | 36540      |\n| Deleted                                                     | 13178      |\n| Changed Files                                               | 109        |\n| Commits                                                     | 16         |\n| Reviews                                                     | 51         |\n| Comments                                                    | 8          |\n| PR lead time                                                | 255.9 Days |\n| Time that was spend on the branch before the PR was created | 31.8 Days  |\n| Time that was spend on the branch before the PR was merged  | 287.7 Days |\n| Time to merge after last review                             | 46.6 Min   |'
  const generator = new ReportGenerator()
  const report = new Report()
  report.Entries = TestReportMetrics.concat(TestReportMeasures)
  report.Description = 'Test report'
  report.Id = PullRequestStatModel.id.toString()
  const result = tsMarkdown([generator.GenerateMeasureTable(PullRequestStatModel, report)])
  expect(result).toBe(expectedResult)
})

test('Check if whole report is generated as expected', () => {
  const expectedResult =
    '# Pull Request Report for PR #381\n\n| Label         | Value |\n| ------------- | ----- |\n| Additions     | 36540 |\n| Deleted       | 13178 |\n| Changed Files | 109   |\n| Commits       | 16    |\n| Reviews       | 51    |\n| Comments      | 8     |'
  const generator = new ReportGenerator()
  const report = new Report()
  report.Entries = TestReportMetrics
  report.Description = 'Test report'
  report.Id = PullRequestStatModel.id.toString()
  const result = generator.Generate(PullRequestStatModel, report)
  expect(result).toBe(expectedResult)
})
