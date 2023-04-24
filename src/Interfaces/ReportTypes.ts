// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from './PullRequestTypes'

export type MeasureCallback = (pr: IPullRequest) => string | number

export interface IReportMeasurementInfo {
  Label: string
  PresentationValue: string | number
  Value: string | number
  ConfigurationName: string
  DefaultConfigValue: string | number
}

export interface IReportMeasurementEntry {
  Id: string
  Info: IReportMeasurementInfo
  ReportMeasureCallback: MeasureCallback
}

export interface IReport {
  Id: string
  Description: string
  Entries: IReportMeasurementEntry[]
}

export interface EventWithTime {
  type: string
  date: Date
  time: number
  event_instance: unknown
}
