# Pull Request Report Action [![Pull Request Report Action](https://github.com/m-beelman/pr-stat/actions/workflows/ts.yaml/badge.svg)](https://github.com/m-beelman/pr-stat/actions/workflows/ts.yaml)

This action is based on a template for TypeScript actions. [int128/typescript-action](https://github.com/int128/typescript-action/)

## Features

- Reading and generate some basic PR measures from every merged PR
- Provide these measures as a comment on the merged PR
- Provide the raw measures as a hidden JSON data in comment

More features are planned for the future. If you have any suggestions, please
open an issue or create a PR.

## Getting Started

Like all other actions in GitHub, these are referenced in your workflow files
and run on GitHub runners or self-hosted GitHub runners. As an example, let's
create a workflow file that is triggered by closing a PR.

Create a workflow file in your repository at e.g.
`.github/workflows/pr-report.yaml` with the following content:

```yaml
name: Add Pull Request Report to PR when closed

on:
  pull_request:
    # only run when PR is closed
    types: [closed]

jobs:
  add-pr-report-as-comment:
    runs-on: ubuntu-latest
    name: Generate report and add it as comment to the PR
    steps:
      - name: Checkout
        uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab # v3.5.2
      - name: Generate PR report
        uses: m-beelman/pr-stat@cb6a35da9978ac6d08bbe4f707f5663105596857 # v0.14.0
        with:
          ShowNumberOfChangedFiles: 'no'
          ShowTimeToMergeAfterLastReview: 'no'
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

**Note**
The referenced actions are pinned to a specific commit. This is to ensure that
the action is not changed without you knowing. You can find the latest commit
for each action in the Release notes of the action. Use dependabot to keep your
actions up to date. Dependabot will take care of updating the commit hash for
you. See [Dependabot for GitHub Actions](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/keeping-your-actions-up-to-date-with-dependabot).

### Configuration

At the moment, the configuration of the action is limited to the individual
metrics. In the example above we see that we do not want to see the two metrics
`ShowNumberOfChangedFiles` and `ShowTimeToMergeAfterLastReview` in the pull
request report.

With more features, the configuration options will also increase.

The overview of all metrics and their default values can be found in the
[metrics documentation](./config.md).
