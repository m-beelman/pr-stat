// Copyright (c) 2023 Koninklijke Philips N.V.

import { measureMemory } from 'vm'
import { IPullRequest } from './Interfaces/PullRequestTypes'
import { IReport, IReportMeasurementEntry, IReportMeasurementInfo, MeasureCallback } from './Interfaces/ReportTypes'

export enum MeasureCategory {
  None,
  StaticMeasures,
  TimeRelatedMeasures,
  StatusCheckRelated,
}

export class MeasurementInfo implements IReportMeasurementInfo {
  public Label
  public PresentationValue
  public Value
  public ConfigurationName
  public DefaultConfigValue

  constructor(
    label: string,
    presentationValue: string | number,
    value: string | number,
    configName: string,
    defaultConfigValue: string | number
  ) {
    this.Label = label
    this.PresentationValue = presentationValue
    this.Value = value
    this.ConfigurationName = configName
    this.DefaultConfigValue = defaultConfigValue
  }
}

export class ReportMeasurementEntry implements IReportMeasurementEntry {
  public Id = ''
  public Info
  public ReportMeasureCallback: MeasureCallback = (pr: IPullRequest) => {
    return ''
  }
  constructor(id = '', info: IReportMeasurementInfo, measureCallback: MeasureCallback = (pr: IPullRequest) => '') {
    this.Id = id
    this.Info = info
    this.ReportMeasureCallback = measureCallback
  }
}

export class Report implements IReport {
  public Id = ''
  public Description = ''
  public Entries: ReportMeasurementEntry[] = []
}
