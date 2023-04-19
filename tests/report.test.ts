// Copyright (c) 2023 Koninklijke Philips N.V.

import { PullRequest } from "../src/PullRequest.Definitions";
import { GetAddedLines, GetChangedFilesCount, GetCommentCount, GetCommitsCount, GetDeletedLines } from "../src/Report.Functions";
import { DataFromBigPullRequest } from "./pr_sample_data";

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

