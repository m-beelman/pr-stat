// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from "./PullRequestTypes";

export type MeasureCallback = (pr: IPullRequest) => string | number;

export interface IReportMeasurementEntry {
    Id: string;
    Label: string;
    PresentationValue: string | number;
    Value: string | number;
    ConfigurationName: string;
    ReportMeasureCallback: MeasureCallback;
}

export interface IReport {
    Id: string;
    Description: string;
    Entries: IReportMeasurementEntry[];
}