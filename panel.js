// Step 1: Try to get issueKey from parent window URL
// Jira URL format: https://yoursite.atlassian.net/browse/PROJECT-123
function getIssueKeyFromURL() {
  try {
    // Try parent window URL (script runs in iframe)
    const parentURL = window.parent.location.href;
    const match = parentURL.match(/\/browse\/([A-Z]+-\d+)/);
    if (match) return match[1];
  } catch (e) {
    console.log('Cannot access parent URL:', e);
  }

  try {
    // Try current window URL as fallback
    const currentURL = window.location.href;
    const match = currentURL.match(/\/browse\/([A-Z]+-\d+)/);
    if (match) return match[1];
  } catch (e) {
    console.log('Cannot access current URL:', e);
  }

  // Try document referrer
  try {
    const referrer = document.referrer;
    const match = referrer.match(/\/browse\/([A-Z]+-\d+)/);
    if (match) return match[1];
  } catch (e) {
    console.log('Cannot access referrer:', e);
  }

  return null;
}

// Step 2: Also try context (might work sometimes)
function getIssueKey() {
  const ctxKey = AdaptavistBridgeContext.context.issueKey
    || AdaptavistBridgeContext.context.entityKey;

  if (ctxKey) {
    console.log('Got key from context:', ctxKey);
    return ctxKey;
  }

  const urlKey = getIssueKeyFromURL();
  if (urlKey) {
    console.log('Got key from URL:', urlKey);
    return urlKey;
  }

  return null;
}

// Step 3: Load data
function loadIssue() {
  const issueKey = getIssueKey();

  if (!issueKey) {
    document.getElementById('issueKey').textContent =
      'Cannot find issue key. Make sure you are on a Jira issue page.';
    return;
  }

  document.getElementById('issueKey').textContent = 'Loading ' + issueKey + '...';

  AdaptavistBridge.request({
    url: `/rest/api/2/issue/${issueKey}`,
    type: 'GET'
  })
  .then(function(issue) {
    console.log('Issue loaded:', issue);

    document.getElementById('issueKey').textContent =
      'Issue: ' + issue.key;
    document.getElementById('issueType').textContent =
      'Type: ' + issue.fields.issuetype.name;
    document.getElementById('issueSummary').textContent =
      'Summary: ' + issue.fields.summary;
    document.getElementById('issueStatus').textContent =
      'Status: ' + issue.fields.status.name;
    document.getElementById('issuePriority').textContent =
      'Priority: ' + (issue.fields.priority ? issue.fields.priority.name : 'None');
    document.getElementById('issueAssignee').textContent =
      'Assignee: ' + (issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned');
    document.getElementById('issueReporter').textContent =
      'Reporter: ' + (issue.fields.reporter ? issue.fields.reporter.displayName : 'Unknown');
    document.getElementById('issueProject').textContent =
      'Project: ' + issue.fields.project.name;
    document.getElementById('issueCreated').textContent =
      'Created: ' + new Date(issue.fields.created).toLocaleDateString();
    document.getElementById('issueUpdated').textContent =
      'Updated: ' + new Date(issue.fields.updated).toLocaleDateString();
  })
  .catch(function(err) {
    console.error('API Error:', err);
    document.getElementById('issueKey').textContent =
      'API Error: ' + JSON.stringify(err);
  });
}

// Wait for page to fully load then run
window.addEventListener('load', function() {
  console.log('Bridge context:', AdaptavistBridgeContext.context);
  loadIssue();
});
