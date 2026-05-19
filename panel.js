const context=window.AdaptavistBridgeContext.context;
console.log("Context : ",window.AdaptavistBridge)

console.log("Bridge Context:", AdaptavistBridgeContext.context);

AdaptavistBridge.request({
  url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
  type: 'GET'
})
  
.then(issue => {
  document.getElementById("issueInfo").innerText =
   `${issue.key} is a currently in status`;
})
.catch(err => {
  console.error("Error fetching issue:", err);
  document.getElementById("issueInfo").innerText = "Unable to load issue details.";
});

