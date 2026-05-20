// Poll until context has issueKey populated
function waitForContext(callback, retries) {
  retries = retries || 30;

  var issueKey = AdaptavistBridgeContext.context
    && AdaptavistBridgeContext.context.issueKey;

  if (issueKey) {
    console.log('issueKey ready:', issueKey);
    callback(issueKey);
  } else if (retries > 0) {
    setTimeout(function () {
      waitForContext(callback, retries - 1);
    }, 300);
  } else {
    document.getElementById('issueKey').textContent =
      'Timed out waiting for issue context.';
  }
}

function loadIssue(issueKey) {
  document.getElementById('issueKey').textContent = 'Loading ' + issueKey + '...';

  AdaptavistBridge.request({
    url: '/rest/api/2/issue/' + issueKey,
    type: 'GET'
  })
  .then(function (issue) {
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
  .catch(function (err) {
    console.error('API Error:', err);
    document.getElementById('issueKey').textContent =
      'API Error: ' + JSON.stringify(err);
  });
}

// Start polling as soon as page loads
window.addEventListener('load', function () {
  waitForContext(loadIssue);
});
