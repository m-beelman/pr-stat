// Copyright (c) 2023 Koninklijke Philips N.V.

import { 
    type IPullRequest,
    type IFileChangeSummary, 
    type IPullRequestComment, 
    type IPullRequestCommit, 
    type IPullRequestReview, 
    type IStatusCheck,
    ICommitAuthor,
    } from "./Interfaces/PullRequestTypes";

export class FileChangeSummary implements IFileChangeSummary {
    public additions: number = 0;
    public deletions: number = 0;
    public commits: number = 0;
    public changedFilesList: string[] = [];
    public static CreateFromJson(json: any): IFileChangeSummary {
        const summary = new FileChangeSummary();
        summary.additions = json['additions'];
        summary.deletions = json['deletions'];
        summary.commits = json['commits'].length;
        summary.changedFilesList = json['changedFiles'];
        return summary;
    }
}

export class PullRequestReview implements IPullRequestReview {
    public authorLogin: string = "";
    public state: string = "";
    public submittedAt: string = "";
    public body: string = "";
    public static CreateFromJson(json: any): IPullRequestReview {
        const review = new PullRequestReview();
        review.authorLogin = json['author']['login'];
        review.state = json['state'];
        review.submittedAt = json['submittedAt'];
        review.body = json['body'];
        return review;
    }
}

export class PullRequestComment implements IPullRequestComment {
    public authorLogin: string = "";
    public createdAt: string = "";
    public body: string = "";
    public authorAssociation: string = "";
    public id: string = "";
    public url: string = "";
    public viewerDidAuthor: boolean = false;

    public static CreateFromJson(json: any): IPullRequestComment {
        const comment = new PullRequestComment();
        comment.authorLogin = json['author']['login'];
        comment.createdAt = json['createdAt'];
        comment.body = json['body'];
        comment.authorAssociation = json['authorAssociation'];
        comment.id = json['id'];
        comment.url = json['url'];
        comment.viewerDidAuthor = json['viewerDidAuthor'];
        return comment;
    }
}

function ParseArrayOfType<T>(array: any[],cb:(wa: any) => T): T[] {
    if (!array) {
        return new Array<T>();
    }
    
    const parsedArray: T[] = [];
    for (const item of array) {
        parsedArray.push(cb(item));
    }
    return parsedArray;
}

export class CommitAuthor implements ICommitAuthor
{
    public email: string = "";
    public name: string = "";
    public login: string = "";
    public id: string = "";
    public static CreateFromJson(json: any): ICommitAuthor {
        const author = new CommitAuthor();
        author.email = json['email'];
        author.name = json['name'];
        author.login = json['login'];
        author.id = json['id'];
        return author
    }
}

export class PullRequestCommit implements IPullRequestCommit{
    public authors: ICommitAuthor[] = [];
    public committer: string = "";
    public authorDate: string = "";
    public commitDate: string = "";
    public commitHeader: string = "";
    public commitBody: string = "";
    public commitId: string = "";
    public static CreateFromJson(json: any): IPullRequestCommit {
        const commit = new PullRequestCommit();
        commit.authorDate = json['authoredDate'];
        commit.authors = ParseArrayOfType<ICommitAuthor>(json['authors'],CommitAuthor.CreateFromJson);
        commit.commitDate = json['committedDate'];
        commit.commitHeader = json['messageHeadline'];
        commit.commitBody = json['messageBody'];
        commit.commitId = json['oid'];

        return commit
    }

}

export class StatusCheck implements IStatusCheck {
    public workflowName: string = "";
    public startedAt: string = "";
    public completedAt: string = "";
    public conclusion: string = "";
    public status: string = "";
    public name: string = "";
    public detailsUrl: string = "";    
    public static CreateFromJson(json: any): IStatusCheck {
        const statusCheck = new StatusCheck();
        statusCheck.workflowName = json['workflowName'];
        statusCheck.startedAt = json['startedAt'];
        statusCheck.completedAt = json['completedAt'];
        statusCheck.conclusion = json['conclusion'];
        statusCheck.status = json['status'];
        statusCheck.name = json['name'];
        return statusCheck;
    }
}

export class PullRequest implements IPullRequest {
    public id: number = 0;
    public title: string = "";
    public createdAt: string = "";
    public updatedAt: string = "";
    public closedAt: string = "";
    public mergedAt: string = "";
    public body: string = "";
    public author: string = "";
    public state: string = "";
    public mergeable: string = "";
    public mergeStateStatus: string = "";
    public isDraft: boolean = false;
    public baseRefName: string = "";
    public headRefName: string = "";
    public headRefOid: string = "";
    public headRepository: string = "";
    public headRepositoryOwner: string = "";
    public commits: IPullRequestCommit[] = [];
    public reviews: IPullRequestReview[] = [];
    public comments: IPullRequestComment[] = [];
    public statusChecks: IStatusCheck[] = [];
    public fileChangeSummary: IFileChangeSummary = new FileChangeSummary();

    public static CreateFromJson(cliPullRequest: any): IPullRequest {
        const pr = new PullRequest();
        pr.id = cliPullRequest['number'];
        pr.title = cliPullRequest['title'];
        pr.createdAt = cliPullRequest['createdAt'];
        pr.updatedAt = cliPullRequest['updatedAt'];
        pr.closedAt = cliPullRequest['closedAt'];
        pr.mergedAt = cliPullRequest['mergedAt'];
        pr.body = cliPullRequest['body'];
        pr.author = cliPullRequest['author'];
        pr.state = cliPullRequest['state'];
        pr.mergeable = cliPullRequest['mergeable'];
        pr.mergeStateStatus = cliPullRequest['mergeStateStatus'];
        pr.isDraft = cliPullRequest['isDraft'];
        pr.baseRefName = cliPullRequest['baseRefName'];
        pr.headRefName = cliPullRequest['headRefName'];
        pr.headRefOid = cliPullRequest['headRefOid'];
        pr.headRepository = cliPullRequest['headRepository'];
        pr.headRepositoryOwner = cliPullRequest['headRepositoryOwner'];
        
        pr.commits = ParseArrayOfType<IPullRequestCommit>(cliPullRequest['commits'], (commit) => PullRequestCommit.CreateFromJson(commit));
        pr.reviews = ParseArrayOfType<IPullRequestReview>(cliPullRequest['reviews'], (review) => PullRequestReview.CreateFromJson(review));
        pr.comments = ParseArrayOfType<IPullRequestComment>(cliPullRequest['comments'], (comment) => PullRequestComment.CreateFromJson(comment));
        pr.statusChecks = ParseArrayOfType<IStatusCheck>(cliPullRequest['statusCheckRollup'], (statusCheck) => StatusCheck.CreateFromJson(statusCheck));
        pr.fileChangeSummary = FileChangeSummary.CreateFromJson(cliPullRequest);
        return pr;
    }
}

