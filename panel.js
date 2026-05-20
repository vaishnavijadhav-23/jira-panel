// The bridge fills context via postMessage from parent Jira page
// Listen for it directly

window.addEventListener('message', function(event) {
  console.log('postMessage received:', event.data);

  // Once context arrives via message, check if issueKey is now populated
  if (AdaptavistBridgeContext.context && AdaptavistBridgeContext.context.issueKey) {
    var issueKey = AdaptavistBridgeContext.context.issueKey;
    console.log('issueKey now available:', issueKey);
    loadIssue(issueKey);
  }
});

// Also poll as backup
var pollingDone = false;

function pollForContext(retries) {
  if (pollingDone) return;

  var issueKey = AdaptavistBridgeContext.context
    && AdaptavistBridgeContext.context.issueKey;

  if (issueKey) {
    pollingDone = true;
    console.log('Got issueKey from poll:', issueKey);
    loadIssue(issueKey);
    return;
  }

  if (retries > 0) {
    setTimeout(function() {
      pollForContext(retries - 1);
    }, 500);
  } else {
    // Last resort: try extracting from document.referrer
    var referrer = document.referrer || '';
    var match = referrer.match(/\/browse\/([A-Z0-9]+-\d+)/);
    if (match) {
      pollingDone = true;
      console.log('Got issueKey from referrer:', match[1]);
      loadIssue(match[1]);
    } else {
      document.getElementById('issueKey').textContent =
        'Could not load issue context. Please refresh the page.';
    }
  }
}

function loadIssue(issueKey) {
  if (!issueKey) return;
  pollingDone = true;

  document.getElementById('issueKey').textContent = 'Loading ' + issueKey + '...';

  AdaptavistBridge.request({
    url: '/rest/api/2/issue/' + issueKey,
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
      'Assignee: ' + (issue.fields.assignee
        ? issue.fields.assignee.displayName : 'Unassigned');
    document.getElementById('issueReporter').textContent =
      'Reporter: ' + (issue.fields.reporter
        ? issue.fields.reporter.displayName : 'Unknown');
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

// Start both approaches together
window.addEventListener('load', function() {
  console.log('Bridge object:', window.AdaptavistBridge);
  pollForContext(40); // poll for 20 seconds max
});
