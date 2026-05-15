// const context = window.AdaptavistBridgeContext.context || {};
// console.log("Bridge Context:", JSON.stringify(context, null, 2));

// console.log("Context : ",AdaptvistBridgeContext.context)

// if (!context.issueKey) {
//   console.warn("No issueKey found — panel may not be in an issue view.");
// }
AdaptavistBridge.request({
  url: `/rest/api/2/issue/NP-1`,
  type: 'GET'
})
.then(issue => {
  document.getElementById("issueInfo").innerText =
    `${issue.key} (${issue.fields.project.key}) → ${issue.fields.summary}`;
});
