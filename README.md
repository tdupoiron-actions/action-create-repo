# GitHub Action: Create Repository

This GitHub Action allows you to programmatically create a new GitHub repository in an organization.

## Features

- Creates a new repository in a specified organization
- Configurable repository visibility (private/public)
- Returns useful information about the created repository

## Usage

To use this action in your workflow, add the following step:

```yaml
- name: Create GitHub Repository
  uses: tdupoiron-actions/action-create-repo@main
  with:
    # Required inputs
    repo-owner: 'your-org-name'      # The organization where the repository will be created
    repo-name: 'your-repo-name'      # The name of the repository to create
    github-token: ${{ secrets.GITHUB_TOKEN }}  # GitHub token with repo creation permissions
    
    # Optional inputs
    repo-visibility: 'private'       # Repository visibility (private/public), defaults to private
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `repo-owner` | The organization where the repository will be created | Yes | - |
| `repo-name` | The name of the repository to create | Yes | - |
| `github-token` | GitHub token with permissions to create repositories | Yes | - |
| `repo-visibility` | The visibility of the repository (private/public) | No | private |

## Outputs

| Output | Description |
|--------|-------------|
| `repo-full-name` | The full name of the created repository (owner/name) |
| `repo-url` | The URL of the created repository |
| `repo-id` | The ID of the created repository |
| `status` | The status of the operation (success/failure) |
| `error` | Error message if the operation failed |

## Example Workflow

```yaml
name: Create New Repository
on:
  workflow_dispatch:
    inputs:
      repo-name:
        description: 'Name for the new repository'
        required: true

jobs:
  create-repo:
    runs-on: ubuntu-latest
    steps:
      - name: Create Repository
        uses: tdupoiron-actions/action-create-repo@main
        with:
          repo-owner: 'my-organization'
          repo-name: ${{ github.event.inputs.repo-name }}
          github-token: ${{ secrets.ORG_ADMIN_TOKEN }}
        id: create-repo
      
      - name: Check Result
        run: |
          echo "Repository created: ${{ steps.create-repo.outputs.repo-url }}"
```

## Permissions

This action requires a GitHub token with permissions to create repositories in the specified organization. The default `GITHUB_TOKEN` may not have sufficient permissions, so you might need to use a Personal Access Token (PAT) or organization token with the appropriate scopes:

- `repo` - Full control of repositories
- `admin:org` - For organization repository creation

## License

This project is licensed under the MIT License.