// Step 1: Log full context to see what's available
console.log('Full Context:', JSON.stringify(AdaptavistBridgeContext.context));

const context = AdaptavistBridgeContext.context;

// Step 2: Display raw context on screen for debugging
document.getElementById('spaceName').textContent =
  'Context: ' + JSON.stringify(context);

// Step 3: Only call API if we have a valid key
const spaceKey = context.entityKey || context.spaceKey || context.projectKey;

if (spaceKey) {
  AdaptavistBridge.request({
    url: `/rest/api/3/project/${spaceKey}`,  // Jira Cloud API (not /wiki/)
    type: 'GET'
  })
  .then(project => {
    console.log('Project data:', project);
    document.getElementById('spaceName').textContent =
      `Project: ${project.name} (Key: ${project.key})`;
  })
  .catch(err => {
    console.error('Error:', err);
    document.getElementById('spaceName').textContent = 'Error: ' + err;
  });
} else {
  document.getElementById('spaceName').textContent =
    'No key found in context. Check console for full context object.';
}
