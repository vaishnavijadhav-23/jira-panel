try {
  const context = window.AdaptavistBridgeContext.context || {};
    console.log("Bridge Context : ",context);
  const issueKey = context.issueKey;

  if (!issueKey) {
    console.warn("No issueKey found — panel may not be in an issue view.");
  }

  console.log("ISSUE key:", issueKey);

  AdaptavistBridge.request({
    url: `/rest/api/2/issue/${issueKey}`,
    type: 'GET'
  })
  .then(issue => {
    console.log("Issue Data:", issue);
    document.getElementById("issueInfo").innerText =
      `${issue.key} (${issue.fields.project.key}) → ${issue.fields.summary}`;
  })
  .catch(err => {
    console.error("Error fetching issue:", err);
  });
} catch (error) {
  console.error("Error accessing AdaptavistBridgeContext:", error);
}
