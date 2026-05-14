try {
console.log(AdaptavistBridgeContext.context.issueKey);
const issueKey = AdaptavistBridgeContext.context.issueKey;
console.log("ISSUE key : ",issueKey)
AdaptavistBridge.request({
    url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
    type: 'GET'
}).then(issue => {
    console.log('Issue Data:', issue);
});
} catch (error) {
  console.error("Error accessing AdaptavistBridgeContext:", error);
}
