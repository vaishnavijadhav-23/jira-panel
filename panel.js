// Log full context to see what's available
console.log('Full Context:', JSON.stringify(AdaptavistBridgeContext.context));

const context = AdaptavistBridgeContext.context;

// Get issueId or issueKey from context
const issueId = context.issueId || context.contentId || context.pageId;
const issueKey = context.issueKey || context.entityKey;

console.log('Issue ID:', issueId);
console.log('Issue Key:', issueKey);

// Fetch Issue data using issueKey or issueId
const identifier = issueKey || issueId;

if (identifier) {
  AdaptavistBridge.request({
    url: `/rest/api/3/issue/${identifier}`,
    type: 'GET'
  })
  .then(issue => {
    console.log('Issue data:', issue);

    // Display issue details
    document.getElementById('issueKey').textContent =
      `Issue: ${issue.key}`;

    document.getElementById('issueSummary').textContent =
      `Summary: ${issue.fields.summary}`;

    document.getElementById('issueStatus').textContent =
      `Status: ${issue.fields.status.name}`;

    document.getElementById('issueAssignee').textContent =
      `Assignee: ${issue.fields.assignee
        ? issue.fields.assignee.displayName
        : 'Unassigned'}`;

    document.getElementById('issuePriority').textContent =
      `Priority: ${issue.fields.priority
        ? issue.fields.priority.name
        : 'None'}`;

    document.getElementById('issueReporter').textContent =
      `Reporter: ${issue.fields.reporter
        ? issue.fields.reporter.displayName
        : 'Unknown'}`;

    document.getElementById('issueType').textContent =
      `Type: ${issue.fields.issuetype.name}`;

    document.getElementById('issueCreated').textContent =
      `Created: ${new Date(issue.fields.created).toLocaleDateString()}`;

    document.getElementById('issueUpdated').textContent =
      `Updated: ${new Date(issue.fields.updated).toLocaleDateString()}`;
  })
  .catch(err => {
    console.error('Error fetching issue:', err);
    document.getElementById('issueKey').textContent =
      'Error loading issue data: ' + JSON.stringify(err);
  });

} else {
  console.warn('No issue identifier found in context');
  document.getElementById('issueKey').textContent =
    'No issue ID/Key found. Context: ' + JSON.stringify(context);
}
