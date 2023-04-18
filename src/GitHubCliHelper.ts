// Copyright (c) 2023 Koninklijke Philips N.V.

// use util to make exec a promise
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const gh_cli_arguments = `--json "additions,assignees,author,baseRefName,body,changedFiles,closed,closedAt,comments,commits,createdAt,deletions,files,headRefName,headRefOid,headRepository,headRepositoryOwner,id,isCrossRepository,isDraft,labels,latestReviews,maintainerCanModify,mergeCommit,mergeStateStatus,mergeable,mergedAt,mergedBy,milestone,number,potentialMergeCommit,projectCards,projectItems,reactionGroups,reviewDecision,reviewRequests,reviews,state,statusCheckRollup,title,updatedAt,url"`

// Check if we are running as a GitHub Action for a Pull Request
const GetGitHubEnvRepoUrl = ():string | undefined=> {
  // check if we are running as a GitHub Action for a Pull Request
  if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
    // get the repository url from the GitHub Action environment
    return process.env.GITHUB_REPOSITORY
  }
}

const GitHubEnvRepoUrl = GetGitHubEnvRepoUrl();

export const GetPullRequestData = async (pullRequestNumber: number, repo:string='') => {
  let pullRequestData = undefined  
  let repoName = ''
  if (repo !== '')
  {
    repoName = `--repo ${repo}`
  }

  const ghCliCommand = `gh pr view ${pullRequestNumber} ${gh_cli_arguments} ${repoName}`
  const { stdout, stderr } = await exec(ghCliCommand);
  if (stdout === ``){
    throw new Error(`No data returned from GitHub CLI. Command: ${ghCliCommand} \n Stderr: ${stderr}`)
  }
  pullRequestData = stdout
  return JSON.parse(pullRequestData)
}
