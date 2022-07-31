# Contributing

Thank you for your interest in contributing to the project. Please follow
these guidelines to ensure your contribution is accepted.

## Pull Request Process

Anyone can propose changes to the project:

1. Fork the repository and create a new branch for the contribution.
2. Make the proposed changes.
3. Rebase your branch with `main`
4. Run `npm build` to ensure the current changes do not break.
5. Update the README.md file if instructions changed.
6. Create the pull request against the `main` branch.

## Release Process

Only members of this project can release new versions. Please follow these
steps to create one:

1. Create a new branch from `main` and name it `release/X.Y.Z`. This project
   adheres to [Semantic Versioning](http://semver.org/).
2. Update the CHANGELOG.md file to reflect the changes that made the new
   version.
3. Run `npm build` to ensure the current changes do not break.
4. Increase version in all relevant files. e.g. package.json,
   package-lock.json, and README.md.
5. Commit the changes.
6. Tag the release using the format `vX.Y.Z` and push everything. At this point
   the pipeline will build the release and publish it to NPM automatically.
7. Create a pull request to merge `release/X.Y.Z` to the `main` branch.
8. Create the GitHub release.

## Gitflow

Type of branches depending on the task at hand:

- Feature branches: `feature/<name>`
- Bugfix branches: `bugfix/<name>`
- Hotfix branches: `hotfix/<name>`
- Release branches: `release/<version>`

All branches except `main` are temporary and should be deleted after they're
merged. There's no need for extra permanent branches like `develop`.

If there's no diagram below, open it in [Mermaid's live editor][diagram].

```mermaid
%%{init: {'theme':'base'} }%%
gitGraph
  commit id: "Initial commit"
  branch feature/1
  checkout feature/1
  commit id: "1"
  commit id: "2"
  checkout main
  branch feature/2
  checkout feature/2
  commit id: "3"
  checkout main
  branch bugfix/1
  checkout bugfix/1
  commit id: "4"
  commit id: "5"
  checkout main
  merge feature/1
  merge bugfix/1
  branch release/v1.0.0
  checkout release/v1.0.0
  commit id: "6"
  checkout feature/2
  commit id: "7"
  checkout release/v1.0.0
  commit id: "8" type: HIGHLIGHT tag: "v1.0.0"
  checkout main
  merge release/v1.0.0
  checkout release/v1.0.0 # it should be checkout v1.0.0 but mermaid does not support it
  branch hotfix
  commit id: "9"
  commit id: "10" type: HIGHLIGHT tag: "v1.0.1"
  checkout main
  merge hotfix
  checkout feature/2
  commit id: "Spill over"
```

[diagram]: https://mermaid.live/edit#pako:eNqNU8tuwjAQ_BVre0VA6DvXtgIkbvToi5MsidXEjpw1KkL8ex0wbRIC6SGX2dmZnYm8h1gnCCGkkuZGlBlXjMW6KCQxmYSMw1JJkiL3IIeaEBmh4oxtUJA1OAmOSxnGX9pSB21KBaftFjbz2Hm7EFL1WMx6LWYXcve35SKbbuR35-AW2BR76Ln38YpBgSbFdvYT1FT3VxjMUVQ42Qbj6XjakusZNd2fOu7Xi3juMAeEXzgw2pUYssVyvli575ORSOuR37gV-9-B2B1zllWmbZ6wCP9ofhzV0micesISjRVT2tFtWWrjLqVGh5kmV-tFjteeXxZMB8IFN8M1nIZrX5cyz5neouEAI_BZ3Pva11QOlGGBHGpq5GrhMDrhv8_PjfYcjCZB-HZUXokI8xrfiLzCA1cHJ2zLxBE-EknaQHicjEBY0uudiiEkY_FMepciNaLwrMMPN2JPUQ
