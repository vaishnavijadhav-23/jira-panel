// Log context exactly as docs show
console.log('Context:', AdaptavistBridgeContext.context);

const context = AdaptavistBridgeContext.context;

// entityKey is the main identifier from the docs
const entityKey = context.entityKey;
const contentId = context.contentId;
const pageId    = context.pageId;

console.log('entityKey:', entityKey);
console.log('contentId:', contentId);
console.log('pageId:', pageId);

// Use contentId or pageId to get page/issue data
const identifier = contentId || pageId || entityKey;

if (identifier) {
  AdaptavistBridge.request({
    url: `/api/v2/pages/${identifier}`,   // Confluence API as per docs
    type: 'GET'
  })
  .then(data => {
    console.log('Data:', data);

    document.getElementById('issueKey').textContent =
      `Content ID: ${data.id}`;
    document.getElementById('issueSummary').textContent =
      `Title: ${data.title}`;
    document.getElementById('issueStatus').textContent =
      `Status: ${data.status}`;
    document.getElementById('issueType').textContent =
      `Type: ${context.contentType}`;
    document.getElementById('issueCreated').textContent =
      `Version: ${context.contentVersion}`;
    document.getElementById('issueUpdated').textContent =
      `Location: ${context.location}`;
  })
  .catch(err => {
    console.error('Error:', err);
    document.getElementById('issueKey').textContent =
      'Error: ' + JSON.stringify(err);
  });

} else {
  // Show raw context for debugging
  document.getElementById('issueKey').textContent =
    'Context empty. Raw: ' + JSON.stringify(context);
}
