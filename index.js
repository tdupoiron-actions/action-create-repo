import { Octokit } from "octokit";
import * as core from '@actions/core';

const main = async () => {
    try {
        // Get inputs from action inputs
        const repo_owner = core.getInput('repo-owner', { required: true });
        const repo_name = core.getInput('repo-name', { required: true });
        const repo_visibility = core.getInput('repo-visibility') || 'private';
        const github_token = core.getInput('github-token', { required: true });

        // Initialize Octokit
        const octokit = new Octokit({
            auth: github_token
        });

        // Create repository
        const response = await octokit.rest.repos.createInOrg({
            org: repo_owner,
            name: repo_name,
            visibility: repo_visibility,
            auto_init: true
        });

        // Prepare successful response
        const output = {
            repo_full_name: response.data.full_name,
            repo_url: response.data.html_url,
            repo_id: response.data.id,
            status: 'success',
            error: null
        };

        // Set action outputs
        core.setOutput('repo-full-name', output.repo_full_name);
        core.setOutput('repo-url', output.repo_url);
        core.setOutput('repo-id', output.repo_id);
        core.setOutput('status', output.status);
        core.setOutput('error', output.error);

    } catch (error) {
        // Set error outputs
        core.setOutput('repo-full-name', '');
        core.setOutput('repo-url', '');
        core.setOutput('repo-id', '');
        core.setOutput('status', 'failure');
        core.setOutput('error', error.message);
        core.setFailed(error.message);
    }
};

main();
