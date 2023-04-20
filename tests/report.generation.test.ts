// Copyright (c) 2023 Koninklijke Philips N.V.

import { PullRequest } from "../src/PullRequest.Definitions";
import { Report } from "../src/Report.Definitions";
import { ReportGenerator } from "../src/Report.Generation"
import { DataFromBigPullRequest } from "./pr_sample_data";
import { TestReportMeasures } from "./report.testmeasures";
import { tsMarkdown} from "ts-markdown";


let PullRequestJsonModel:any;
let PullRequestStatModel:any;

beforeAll(() => {
    PullRequestJsonModel = DataFromBigPullRequest;
    PullRequestStatModel = PullRequest.CreateFromJson(PullRequestJsonModel);
});


test('Check if header is generated as expected', async ()=>{
    const generator = new ReportGenerator();
    expect(tsMarkdown([generator.GenerateHeader(PullRequestStatModel)])).toBe("# Pull Request Report for PR #381");
});

test('Check if table is generated as expected', async ()=>{
    const expectedResult = "| Label         | Value |\n| ------------- | ----- |\n| Additions     | 36540 |\n| Deleted       | 13178 |\n| Changed Files |       |\n| Commits       | 16    |\n| Reviews       | 51    |\n| Comments      | 8     |"
    const generator = new ReportGenerator();
    const report = new Report();
    report.Entries = TestReportMeasures;
    report.Description = "Test report";	
    report.Id = PullRequestStatModel.id;
    const result = tsMarkdown([generator.GenerateMeasureTable(PullRequestStatModel, report)]);

    expect(result).toBe(expectedResult);

});

test('Check if whole report is generated as expected', async ()=>{
    const expectedResult = "# Pull Request Report for PR #381\n\n| Label         | Value |\n| ------------- | ----- |\n| Additions     | 36540 |\n| Deleted       | 13178 |\n| Changed Files |       |\n| Commits       | 16    |\n| Reviews       | 51    |\n| Comments      | 8     |";
    const generator = new ReportGenerator();
    const report = new Report();
    report.Entries = TestReportMeasures;
    report.Description = "Test report";	
    report.Id = PullRequestStatModel.id;

    const result = generator.Generate(PullRequestStatModel, report);

    expect(result).toBe(expectedResult);
});

