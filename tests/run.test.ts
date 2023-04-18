import { GetPullRequestData } from '../src/GitHubCliHelper'
import fs from 'fs'
import { DataFromBigPullRequest } from './pr_sample_data'
import { PullRequest } from '../src/PullRequest.Definitions'



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

test('Check if DataFromBigPullRequest is parsed correctly and reflected by the object model', async () => {
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
})

