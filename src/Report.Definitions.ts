// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from "./Interfaces/PullRequestTypes";
import { IReport, IReportMeasurementEntry, MeasureCallback } from "./Interfaces/ReportTypes";

export class ReportMeasurementEntry implements IReportMeasurementEntry
{
    public Id = "";
    public Label = "";
    public PresentationValue: string | number = "";
    public Value: string | number = "";
    public ConfigurationName = "";
    public ReportMeasureCallback: MeasureCallback = (pr: IPullRequest) => { return ""; };
    constructor(id = "", label = "", presentationValue: string | number = "", value: string | number = "", configurationName = "", measureCallback: MeasureCallback = (pr: IPullRequest) => "")
    {
        this.Id = id;
        this.Label = label;
        this.PresentationValue = presentationValue;
        this.Value = value;
        this.ConfigurationName = configurationName;
        this.ReportMeasureCallback = measureCallback;
    }
}

export class Report implements IReport
{
    public Id = "";
    public Description = "";
    public Entries: ReportMeasurementEntry[] = [];
}