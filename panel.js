// Log the current context to console for debugging
console.log('Context:', AdaptavistBridgeContext.context);

const context = AdaptavistBridgeContext.context;

// Fetch Space info using spaceId from context
AdaptavistBridge.request({
  url: `/wiki/api/v2/spaces/${context.spaceId}`,
  type: 'GET'
})
.then(space => {
  console.log('Space data:', space);
  document.getElementById('spaceName').textContent =
    `Space: ${space.name} (Key: ${space.key})`;
})
.catch(err => {
  console.error('Error fetching space:', err);
});

// Fetch Page info using pageId from context (if available)
if (context.pageId) {
  AdaptavistBridge.request({
    url: `/wiki/api/v2/pages/${context.pageId}`,
    type: 'GET'
  })
  .then(page => {
    console.log('Page data:', page);
    document.getElementById('pageInfo').textContent =
      `Page: ${page.title} (Version: ${context.pageVersion})`;
  })
  .catch(err => {
    console.error('Error fetching page:', err);
  });
}
