try {
console.log(AdaptavistBridgeContext.context.issueKey);

AdaptavistBridge.request({
    url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
    type: 'GET'
}).then(issue => {
    console.log('Issue Data:', issue);
});
} catch (error) {
  console.error("Error accessing AdaptavistBridgeContext:", error);
}
