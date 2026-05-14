console.log("Bridge Context:", AdaptavistBridgeContext.context);

console.log("Project Key : ",AdaptavistBridgeContext.context.projectKey)

AdaptavistBridge.request({
  url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
  type: 'GET'
})
.then(issue => {
  document.getElementById("issueInfo").innerText =
    `${issue.key} is a ${issue.fields.issuetype.name} currently in status "${issue.fields.status.name}"`;
})
.catch(err => {
  console.error("Error fetching issue:", err);
  document.getElementById("issueInfo").innerText = "Unable to load issue details.";
});
