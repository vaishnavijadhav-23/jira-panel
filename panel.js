document.getElementById("btn").addEventListener("click", async function () {

  const context = await AdaptavistBridgeContext.context;  // ← await this!

  console.log("Context:", context);

  const issueKey = context.issueKey;

  AdaptavistBridge.request({
    url: `/rest/api/2/issue/${issueKey}`,
    type: 'GET'
  })
  .then(issue => {
    document.getElementById("issueInfo").innerText =
      `${issue.key} → ${issue.fields.summary}`;
  })
  .catch(err => {
    console.error("API error:", err);
  });

});
