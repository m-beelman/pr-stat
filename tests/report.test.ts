// Copyright (c) 2023 Koninklijke Philips N.V.

import { PullRequest } from "../src/PullRequest.Definitions";
import { ReportMeasurementEntry } from "../src/Report.Definitions";
import { GetAddedLines, GetChangedFilesCount, GetCommentCount, GetCommitsCount, GetDeletedLines, GetReviewCount } from "../src/Report.Functions";
import { DataFromBigPullRequest } from "./pr_sample_data";

const TestReportMeasures = new Array<ReportMeasurementEntry>()
{
    new ReportMeasurementEntry("additions", "Additions", 0, 0, "ShowAdditions", GetAddedLines),
    new ReportMeasurementEntry("deleted", "Deleted", 0, 0, "ShowDeleted", GetDeletedLines),
    new ReportMeasurementEntry("changedFiles", "Changed Files", 0, 0, "ShowNumberOfChangedFiles", GetChangedFilesCount),
    new ReportMeasurementEntry("commits", "Commits", 0, 0, "ShowNumberOfCommits", GetCommitsCount),
    new ReportMeasurementEntry("reviews", "Reviews", 0, 0, "ShowNumberOfReviews", GetReviewCount),
    new ReportMeasurementEntry("comments", "Comments", 0, 0, "ShowNumberOfComments", GetCommentCount)
};


let PullRequestJsonModel:any;
let PullRequestStatModel:any;

beforeAll(() => {
    PullRequestJsonModel = DataFromBigPullRequest;
    PullRequestStatModel = PullRequest.CreateFromJson(PullRequestJsonModel);
})

test('Check number of added lines', async () => {
    expect(GetAddedLines(PullRequestStatModel)).toBe(DataFromBigPullRequest['additions']);
});

test('Check number of deleted lines', async () => {
    expect(GetDeletedLines(PullRequestStatModel)).toBe(DataFromBigPullRequest['deletions']);
});

test('Check number changed files', async () => {
    expect(GetChangedFilesCount(PullRequestStatModel)).toBe(DataFromBigPullRequest['changedFiles'].length);
});

test('Check number changed files', async () => {
    expect(GetCommitsCount(PullRequestStatModel)).toBe(DataFromBigPullRequest['commits'].length);
});

test('Check number comments', async () => {
    expect(GetCommentCount(PullRequestStatModel)).toBe(DataFromBigPullRequest['comments'].length);
});
