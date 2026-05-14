console.log("Bridge Context:", AdaptavistBridgeContext.context);
try{
  const context = AdaptavistBridgeContext.context;

console.log("Issue Key:", context.issueKey || "Not available");
console.log("Project Key:", context.projectKey || "Not available");
console.log("Location:", context.location || "Not available");


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

}catch(error){
  console.error("Error in fetching the AdaptavistBridgeContext : ",error)
}
