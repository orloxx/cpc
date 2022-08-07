# Contributing

Thank you for your interest in contributing to the project. Please follow
these guidelines to ensure your contribution is accepted.

## Pull Request Process

Anyone can propose changes to the project:

1. Fork the repository and create a new branch for the contribution.
2. Make the proposed changes.
3. Rebase your branch with `develop`
4. Run `npm build` to ensure the current changes do not break.
5. Update the README.md file if instructions changed.
6. Create the pull request against the `develop` branch.

## Release Process

Only members of this project can release new versions. Please follow these
steps to create one:

1. Create a new branch from `develop` and name it `release/X.Y.Z`. This project
   adheres to [Semantic Versioning](http://semver.org/).
2. Run `npm build` to ensure the current changes do not break.
3. Increase version in all relevant files. e.g. package.json,
   package-lock.json, and README.md.
4. Update the CHANGELOG.md file to reflect the changes that made the new
   version.
5. Commit the changes.
6. Tag the release using the format `vX.Y.Z` and push everything.
7. Create a pull request to merge `release/X.Y.Z` to the `develop` branch.
8. Create the GitHub release.
9. Publish package to NPM.

## Gitflow

Type of branches depending on the task at hand:

- Feature branches: `feature/<name>`
- Bugfix branches: `bugfix/<name>`
- Hotfix branches: `hotfix/<name>`
- Release branches: `release/<version>`

All branches except `develop` are temporary and should be deleted after they're
merged. There's no need for extra permanent branches like `main`.

If there's no diagram below, open it in [Mermaid's live editor][diagram].

```mermaid
%%{ init: {
    'theme': 'base',
    'gitGraph': { 'mainBranchName': 'develop' }
}}%%
gitGraph
  commit id: "Initial commit"
  branch feature/1
  checkout feature/1
  commit id: "1"
  commit id: "2"
  checkout develop
  branch feature/2
  checkout feature/2
  commit id: "3"
  checkout develop
  branch bugfix/1
  checkout bugfix/1
  commit id: "4"
  commit id: "5"
  checkout develop
  merge feature/1
  merge bugfix/1
  branch release/v1.0.0
  checkout release/v1.0.0
  commit id: "6"
  checkout feature/2
  commit id: "7"
  checkout release/v1.0.0
  commit id: "8" type: HIGHLIGHT tag: "v1.0.0"
  checkout develop
  merge release/v1.0.0
  checkout release/v1.0.0 # it should be checkout v1.0.0 but mermaid does not support it
  branch hotfix
  commit id: "9"
  commit id: "10" type: HIGHLIGHT tag: "v1.0.1"
  checkout develop
  merge hotfix
  checkout feature/2
  commit id: "Spill over"
```

[diagram]: https://mermaid.live/edit#pako:eNqNU8tugzAQ_BVre42SkL459qEkUtRLevTF4AWsGoyMHTWK8u81rxYIET0godnZ2ZlBnCBUHMGHWJi1ZnlCM0JClabCEMF9QmGbCSOYbEAKJSHQLAsTEiEzVuPCq5YSDL-UNQO0K-XV2z1s1WDtNscDSpWPXFmNXlldKN5OKgY2jsT3wHYP7Ordjbi-v34jRR1jv4Qa6h5ojGiUyApcHLz5cr7sKY6MugYeBgau1_E4YE4IP1Eg5pijTzbb9Wbnnk9iWFyOmo2J5P_ORG6Iu1okykpOAvyjNePAvTrJlAlOuMKCZMrRbZ4r7cyaTo2JMq7ZiyjPIx_OW07k86bydY5Nl7_PhZREHVBTgBk0cdzvdiqpFEyCKVIoqYFrhsKsxn__RjeqqCWolWEGXyv9HQtQltOIyQJnLcWpZy9VKR-sFW4TVLnONDs7IzbnTuqdC6M0-LUGMGvU_piF4BttsSW9CRZrljas8w8D3mRC
