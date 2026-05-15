// const context = window.AdaptavistBridgeContext.context || {};
// console.log("Bridge Context:", JSON.stringify(context, null, 2));

// console.log("Context : ",AdaptvistBridgeContext.context)

// if (!context.issueKey) {
//   console.warn("No issueKey found — panel may not be in an issue view.");
// }

const context=AdaptavistBridgeContex.location;
console.log("Context : ",context)

console.log("Bridge Context:", AdaptavistBridgeContext.context);

AdaptavistBridge.request({
  url: `/rest/api/2/issue/NP-1`,
  type: 'GET'
})
.then(issue => {
  // Correct property: issue.fields.issuetype.name
  document.getElementById("issueInfo").innerText =
    `${issue.key} is a ${issue.fields.issuetype.name} currently in status "${issue.fields.status.name}"`;
})
.catch(err => {
  console.error("Error fetching issue:", err);
  document.getElementById("issueInfo").innerText = "Unable to load issue details.";
});

