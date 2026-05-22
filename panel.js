console.log("Fragment Loaded");

console.log("Context:", window.AdaptavistBridgeContext);

document.getElementById("btn").addEventListener("click", () => {

    const issueKey = AdaptavistBridgeContext.context.issueKey;

    document.getElementById("issueKey").innerText =
        "Current Issue: " + issueKey;

    AdaptavistBridge.request({
        url: `/rest/api/2/issue/DEV-1`,
        type: 'GET'
    })
    .then(issue => {

        console.log("Issue:", issue);

        document.getElementById("result").innerHTML = `
            <div class="card">
                <h3>${issue.key}</h3>
                <p><b>Summary:</b> ${issue.fields.summary}</p>
                <p><b>Status:</b> ${issue.fields.status.name}</p>
                <p><b>Type:</b> ${issue.fields.issuetype.name}</p>
            </div>
        `;
    })
    .catch(error => {

        console.error("Error:", error);

        document.getElementById("result").innerHTML = `
            <p class="error">Failed to load issue</p>
        `;
    });
});
