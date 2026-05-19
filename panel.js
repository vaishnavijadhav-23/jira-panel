window.addEventListener('load', function () {

  // Wait until AdaptavistBridge is fully ready
  function waitForBridge(retries) {
    if (retries <= 0) {
      document.getElementById('issueKey').textContent =
        'Bridge failed to load after multiple retries.';
      return;
    }

    if (
      typeof window.AdaptavistBridge !== 'undefined' &&
      typeof window.AdaptavistBridgeContext !== 'undefined'
    ) {
      console.log('Bridge ready!');
      console.log('Context:', JSON.stringify(window.AdaptavistBridgeContext.context));
      startApp();
    } else {
      console.log('Bridge not ready, retrying... ' + retries);
      setTimeout(function () {
        waitForBridge(retries - 1);
      }, 500);
    }
  }

  function startApp() {
    const context = window.AdaptavistBridgeContext.context;
    console.log('Raw context:', context);

    // Log every property
    for (var key in context) {
      console.log(key + ' = ' + context[key]);
    }

    const identifier =
      context.entityKey ||
      context.contentId ||
      context.pageId ||
      context.spaceId;

    if (!identifier) {
      document.getElementById('issueKey').textContent =
        'Context loaded but empty. Keys: ' + Object.keys(context).join(', ');
      return;
    }

    // Make API request using bridge
    window.AdaptavistBridge.request({
      url: `/rest/api/3/issue/${identifier}`,
      type: 'GET'
    })
    .then(function (data) {
      console.log('Response:', data);

      document.getElementById('issueKey').textContent =
        'Issue: ' + (data.key || identifier);
      document.getElementById('issueSummary').textContent =
        'Summary: ' + (data.fields ? data.fields.summary : '-');
      document.getElementById('issueStatus').textContent =
        'Status: ' + (data.fields ? data.fields.status.name : '-');
      document.getElementById('issueType').textContent =
        'Type: ' + (data.fields ? data.fields.issuetype.name : '-');
      document.getElementById('issuePriority').textContent =
        'Priority: ' + (data.fields && data.fields.priority ? data.fields.priority.name : 'None');
      document.getElementById('issueAssignee').textContent =
        'Assignee: ' + (data.fields && data.fields.assignee ? data.fields.assignee.displayName : 'Unassigned');
      document.getElementById('issueReporter').textContent =
        'Reporter: ' + (data.fields && data.fields.reporter ? data.fields.reporter.displayName : 'Unknown');
      document.getElementById('issueCreated').textContent =
        'Created: ' + (data.fields ? new Date(data.fields.created).toLocaleDateString() : '-');
      document.getElementById('issueUpdated').textContent =
        'Updated: ' + (data.fields ? new Date(data.fields.updated).toLocaleDateString() : '-');
    })
    .catch(function (err) {
      console.error('Request error:', err);
      document.getElementById('issueKey').textContent =
        'Request failed: ' + JSON.stringify(err);
    });
  }

  waitForBridge(20);
});
