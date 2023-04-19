import { GetPullRequestData } from '../src/GitHubCliHelper'
import fs from 'fs'
import { DataFromBigPullRequest } from './pr_sample_data'
import { PullRequest } from '../src/PullRequest.Definitions'
import { IPullRequestComment, IPullRequestCommit, IPullRequestReview, IStatusCheck } from '../src/Interfaces/PullRequestTypes'



// This method can be used to update the sample data
const UpdateSampleData = async () => {
  const prData = await GetPullRequestData(381, 'aertslab/SCope')
  // write json to file
  fs.writeFileSync('prDatams.json', JSON.stringify(prData, null, 2))
}

test('Gather PR-Data for unknown Repo', async () => {
  let exceptionRaised = false;
 try {
    const jsonData = await GetPullRequestData(381, 'aertslab437598493-qn/SCope-154d7884f5')
    const data = PullRequest.CreateFromJson(jsonData);
    console.log(data);
  }
  catch(e) {
    exceptionRaised = true
  }
  expect(exceptionRaised).toBeTruthy();
})

test('Transfer to internal object model', async () => { 
  const data = 
  PullRequest.CreateFromJson(DataFromBigPullRequest);
  console.log(data);
})

test('Check if DataFromBigPullRequest is parsed correctly and reflected by the object model consistently', async () => {
  // parse data from DataFromBigPullRequest
  const data = PullRequest.CreateFromJson(DataFromBigPullRequest);
  // check if the data is parsed correctly
  expect(data.id).toBe(DataFromBigPullRequest['number']);
  expect(data.title).toBe(DataFromBigPullRequest['title']);
  expect(data.createdAt).toBe(DataFromBigPullRequest['createdAt']);
  expect(data.updatedAt).toBe(DataFromBigPullRequest['updatedAt']);
  expect(data.closedAt).toBe(DataFromBigPullRequest['closedAt']);
  expect(data.mergedAt).toBe(DataFromBigPullRequest['mergedAt']);
  expect(data.body).toBe(DataFromBigPullRequest['body']);
  expect(data.author).toBe(DataFromBigPullRequest['author']);
  expect(data.state).toBe(DataFromBigPullRequest['state']);
  expect(data.mergeable).toBe(DataFromBigPullRequest['mergeable']);
  expect(data.mergeStateStatus).toBe(DataFromBigPullRequest['mergeStateStatus']);
  expect(data.isDraft).toBe(DataFromBigPullRequest['isDraft']);
  expect(data.baseRefName).toBe(DataFromBigPullRequest['baseRefName']);
  expect(data.headRefName).toBe(DataFromBigPullRequest['headRefName']);
  expect(data.headRefOid).toBe(DataFromBigPullRequest['headRefOid']);
  expect(data.headRepository).toBe(DataFromBigPullRequest['headRepository']);
  expect(data.headRepositoryOwner).toBe(DataFromBigPullRequest['headRepositoryOwner']);


  expect(data.commits.length).toBe(DataFromBigPullRequest['commits'].length);
  expect(data.reviews.length).toBe(DataFromBigPullRequest['reviews'].length);
  expect(data.comments.length).toBe(DataFromBigPullRequest['comments'].length);
  expect(data.statusChecks.length).toBe(DataFromBigPullRequest['statusCheckRollup'].length);
  CheckCommits(data.commits, 1);
  CheckReviews(data.reviews, 0);
  CheckComments(data.comments, 1);
  CheckStatusChecks(data.statusChecks, 1);

});

test('Check what happens if I try to access a unknown key', async () => {
  const data = PullRequest.CreateFromJson({});
});

const printString = (str: any) => {
  console.log(str['forname']);
}

const CheckStatusChecks = (checks: IStatusCheck[], index: number) => {
  expect(checks.length).toBe(DataFromBigPullRequest['statusCheckRollup'].length);
  
  const statusCheck = checks[index];
  const statusCheckFromSampleData = DataFromBigPullRequest['statusCheckRollup'][index];
  expect(statusCheck.completedAt).toBe(statusCheckFromSampleData['completedAt']);
  expect(statusCheck.conclusion).toBe(statusCheckFromSampleData['conclusion']);
  expect(statusCheck.name).toBe(statusCheckFromSampleData['name']);
  expect(statusCheck.startedAt).toBe(statusCheckFromSampleData['startedAt']);
  expect(statusCheck.status).toBe(statusCheckFromSampleData['status']);
  expect(statusCheck.workflowName).toBe(statusCheckFromSampleData['workflowName']);

}

const CheckComments = (comments: IPullRequestComment[], index:number) => {
  expect(comments.length).toBe(DataFromBigPullRequest['comments'].length);

  const comment = comments[index];
  const commentFromSampleData = DataFromBigPullRequest['comments'][index];
  expect(comment.authorAssociation).toBe(commentFromSampleData['authorAssociation']);
  expect(comment.authorLogin).toBe(commentFromSampleData['author']['login']);
  expect(comment.body).toBe(commentFromSampleData['body'])
  expect(comment.createdAt).toBe(commentFromSampleData['createdAt']);
  expect(comment.id).toBe(commentFromSampleData['id']);
  expect(comment.url).toBe(commentFromSampleData['url']);
  expect(comment.viewerDidAuthor).toBe(commentFromSampleData['viewerDidAuthor']=='true');
}

const CheckCommits = (commits: IPullRequestCommit[], index:number) => {
  expect(commits.length).toBe(DataFromBigPullRequest['commits'].length);
  
  const commit = commits[index];
  const commitFromSampleData = DataFromBigPullRequest['commits'][index];
  const authorIndex = 0;
  expect(commit.commitId).toBe(commitFromSampleData['oid']);
  expect(commit.commitHeader).toBe(commitFromSampleData['messageHeadline']);
  expect(commit.commitBody).toBe(commitFromSampleData['messageBody']);
  expect(commit.authors[authorIndex].email).toBe(commitFromSampleData['authors'][authorIndex]['email']);
  expect(commit.authors[authorIndex].name).toBe(commitFromSampleData['authors'][authorIndex]['name']);
  expect(commit.authors[authorIndex].login).toBe(commitFromSampleData['authors'][authorIndex]['login']);
  expect(commit.authors[authorIndex].id).toBe(commitFromSampleData['authors'][authorIndex]['id']);
}

const CheckReviews = (reviews: IPullRequestReview[], index:number) => {
  expect(reviews.length).toBe(DataFromBigPullRequest['reviews'].length);
  
  const review = reviews[index];
  const reviewFromSampleData = DataFromBigPullRequest['reviews'][0];
  expect(review.authorLogin).toBe(reviewFromSampleData['author']['login']);
  expect(review.body).toBe(reviewFromSampleData['body']);
  expect(review.state).toBe(reviewFromSampleData['state']);
  expect(review.submittedAt).toBe(reviewFromSampleData['submittedAt']);
}
