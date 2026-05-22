console.log("Fragment Loaded");
console.log("Context:", window.AdaptavistBridgeContext);


document.getElementById("btn").addEventListener("click", () => {

    const issueKey = AdaptavistBridgeContext.context.issueKey;

    document.getElementById("issueKey").innerText =
        "Current Issue: " + issueKey;

    AdaptavistBridge.request({
        url: `/rest/api/2/issue/${issueKey}`,
        type: 'GET'
    })
    .then(issue => {
        alert(
          `${issue.key} : ${issue.fields.summary}`
        );
    });
});
