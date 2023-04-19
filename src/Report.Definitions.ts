// Copyright (c) 2023 Koninklijke Philips N.V.

import { IPullRequest } from "./Interfaces/PullRequestTypes";
import { IReport, IReportMeasurementEntry, MeasureCallback } from "./Interfaces/ReportTypes";

export class ReportMeasurementEntry implements IReportMeasurementEntry
{
    public Id: string = "";
    public Label: string = "";
    public PresentationValue: string | number = "";
    public Value: string | number = "";
    public ConfigurationName: string = "";
    public ReportMeasureCallback: MeasureCallback = (pr: IPullRequest) => { return ""; };
    constructor(id: string = "", label: string = "", presentationValue: string | number = "", value: string | number = "", configurationName: string = "", measureCallback: MeasureCallback = (pr: IPullRequest) => "")
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
    public Id: string = "";
    public Description: string = "";
    public Entries: ReportMeasurementEntry[] = [];
}