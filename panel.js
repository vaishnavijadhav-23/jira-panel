// The Adaptavist bridge in Jira uses AP (Atlassian Connect) directly
console.log('AP object:', AP);

// Get Jira issue context using AP
AP.context.getContext(function(context) {
  console.log('AP Context:', JSON.stringify(context));

  const issueKey = context.jira && context.jira.issue && context.jira.issue.key;
  const issueId  = context.jira && context.jira.issue && context.jira.issue.id;

  console.log('Issue Key:', issueKey);
  console.log('Issue Id:', issueId);

  if (issueKey) {
    document.getElementById('issueKey').textContent = 'Issue Key: ' + issueKey;

    // Now fetch full issue data
    AP.request({
      url: `/rest/api/3/issue/${issueKey}`,
      type: 'GET',
      success: function(response) {
        const issue = JSON.parse(response);
        console.log('Issue Data:', issue);

        document.getElementById('issueKey').textContent =
          `Issue: ${issue.key}`;
        document.getElementById('issueType').textContent =
          `Type: ${issue.fields.issuetype.name}`;
        document.getElementById('issueSummary').textContent =
          `Summary: ${issue.fields.summary}`;
        document.getElementById('issueStatus').textContent =
          `Status: ${issue.fields.status.name}`;
        document.getElementById('issuePriority').textContent =
          `Priority: ${issue.fields.priority ? issue.fields.priority.name : 'None'}`;
        document.getElementById('issueAssignee').textContent =
          `Assignee: ${issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'}`;
        document.getElementById('issueReporter').textContent =
          `Reporter: ${issue.fields.reporter ? issue.fields.reporter.displayName : 'Unknown'}`;
        document.getElementById('issueCreated').textContent =
          `Created: ${new Date(issue.fields.created).toLocaleDateString()}`;
        document.getElementById('issueUpdated').textContent =
          `Updated: ${new Date(issue.fields.updated).toLocaleDateString()}`;
      },
      error: function(err) {
        console.error('API Error:', err);
        document.getElementById('issueKey').textContent =
          'API Error: ' + JSON.stringify(err);
      }
    });

  } else {
    document.getElementById('issueKey').textContent =
      'No issue key found. AP Context: ' + JSON.stringify(context);
  }
});x
