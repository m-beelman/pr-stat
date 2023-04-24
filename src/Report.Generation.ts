// for license and copyright look at the repository

import { IPullRequest } from './Interfaces/PullRequestTypes'
import { IReport } from './Interfaces/ReportTypes'
import { tsMarkdown, table, TableEntry, H1Entry, H3Entry } from 'ts-markdown'
import { MeasureCategory, MeasureCategoryTitleMap } from './Report.Definitions'

export class ReportGenerator {
  DescriptionHeaderLabel = 'Description'
  ValueHeaderLabel = 'Value'
  public static GenerateReport(pr: IPullRequest, report: IReport): IReport {
    report.Entries.forEach((entry) => {
      entry.Info.Value = entry.ReportMeasureCallback(pr)
      entry.Info.PresentationValue = entry.Info.Value
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

  public GenerateCategoryTitle(measureCategory: MeasureCategory): H3Entry {
    const title = { h3: `${MeasureCategoryTitleMap.get(measureCategory) || 'No category'}` }
    return title
  }

  public GenerateMeasureTable(pr: IPullRequest, report: IReport): TableEntry {
    report.Entries.forEach((entry) => {
      entry.Info.Value = entry.ReportMeasureCallback(pr)
    })

    const rows = report.Entries.map((entry) => ({
      Description: entry.Info.Description,
      Value: entry.Info.Value,
    }))

    return table({
      columns: [{ name: this.DescriptionHeaderLabel }, { name: this.ValueHeaderLabel }],
      rows: rows,
    })
  }

  public GenerateCategoryTable(pr: IPullRequest, report: IReport, measureCategory: MeasureCategory): TableEntry {
    const categoryEntries = report.Entries.filter((entry) => entry.Info.MeasureCategory === measureCategory)
    categoryEntries.forEach((entry) => {
      entry.Info.Value = entry.ReportMeasureCallback(pr)
    })

    const rows = categoryEntries.map((entry) => ({
      Description: entry.Info.Description,
      Value: entry.Info.Value,
    }))

    return table({
      columns: [{ name: this.DescriptionHeaderLabel }, { name: this.ValueHeaderLabel }],
      rows: rows,
    })
  }
}
