console.log("Context:", window.AdaptavistBridgeContext);

    const issueKey = AdaptavistBridgeContext.context.issueKey;

    AdaptavistBridge.request({
        url: `/rest/api/2/issue/${issueKey}`,
        type: 'GET'
    })
    .then(issue => {
        const issueSummary = issue.fields.summary;

        document.getElementById("status").innerText =
            `Issue: ${issue.key} — ${issueSummary}`;

        document.getElementById("searchConfluence").disabled = false;

        document.getElementById("searchConfluence").addEventListener("click", () => {
            const searchUrl = `${jiraBaseUrl}/wiki/search?text=${encodeURIComponent(issueSummary)}`;
            window.open(searchUrl, "_blank");
        });
    })
    .catch(error => {
        console.error("API Error:", error);
        document.getElementById("status").innerText =
            "Unable to fetch issue details.";
    });
