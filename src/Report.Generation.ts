// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from './Interfaces/PullRequestTypes'
import { IReport } from './Interfaces/ReportTypes'
import { tsMarkdown, table, TableEntry, H1Entry } from 'ts-markdown'

export class ReportGenerator {
  public static GenerateReport(pr: IPullRequest, report: IReport): IReport {
    report.Entries.forEach((entry) => {
      entry.Value = entry.ReportMeasureCallback(pr)
      entry.PresentationValue = entry.Value
    })
    return report
  }

  public Generate(pr: IPullRequest, report: IReport): string {
    const header = this.GenerateHeader(pr)
    const table = this.GenerateMeasureTable(pr, report)
    return tsMarkdown([header, table])
  }

  public GenerateHeader(pr: IPullRequest): H1Entry {
    const title = { h1: `Pull Request Report for PR #${pr.id}` }
    return title
  }

  public GenerateMeasureTable(pr: IPullRequest, report: IReport): TableEntry {
    report.Entries.forEach((entry) => {
      entry.Value = entry.ReportMeasureCallback(pr)
    })

    const rows = report.Entries.map((entry) => ({
      Label: entry.Label,
      Value: entry.Value,
    }))

    return table({
      columns: [{ name: 'Label' }, { name: 'Value' }],
      rows: rows,
    })
  }
}
