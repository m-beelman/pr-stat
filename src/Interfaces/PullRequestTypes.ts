// Copyright (c) 2023 Koninklijke Philips N.V.

export interface IFileChangeSummary {
    additions: number;
    deletions: number;
    commits: number;
    changedFilesList: string[];
}

export interface IPullRequestReview {
    authorLogin: string;
    state: string;
    submittedAt: string;
    body: string;
}

export interface IPullRequestComment {
    authorLogin: string;
    createdAt: string;
    body: string;
}

export interface ICommitAuthor {
    email: string;
    name: string;
    login: string;
    id: string;
}

export interface IPullRequestCommit {
    authors: ICommitAuthor[];
    committer: string;
    authorDate: string;
    commitDate: string;
    commitHeader: string;
    commitBody: string;
    commitId: string;
}

export interface IStatusCheck {
    workflowName: string;
    startedAt: string;
    completedAt: string;
    conclusion: string;
    status: string;
    name: string;
}


export interface IPullRequest {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    closedAt: string;
    mergedAt: string;
    body: string;
    author: string;
    state: string;
    mergeable: string;
    mergeStateStatus: string;
    isDraft: boolean;
    baseRefName: string;
    headRefName: string;
    headRefOid: string;
    headRepository: string;
    headRepositoryOwner: string;
    commits: IPullRequestCommit[];
    reviews: IPullRequestReview[];
    comments: IPullRequestComment[];
    statusChecks: IStatusCheck[];
    fileChangeSummary: IFileChangeSummary;
}

