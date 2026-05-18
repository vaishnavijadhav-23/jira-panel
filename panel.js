const context=window.AdaptavistBridgeContext;
console.log("Context : ",context)

console.log("Bridge Context:", AdaptavistBridgeContext.context);

AdaptavistBridge.request({
  url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
  type: 'GET'
})
  
.then(issue => {
  // Correct property: issue.fields.issuetype.name
  document.getElementById("issueInfo").innerText =
`${issue.key} is a currently in status"`;
})
.catch(err => {
  console.error("Error fetching issue:", err);
  document.getElementById("issueInfo").innerText = "Unable to load issue details.";
});

