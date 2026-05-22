console.log("Context:", AdaptavistBridgeContext.context);

AdaptavistBridge.request({
    url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
    type: 'GET'
})
.then(issue => {
    console.log("Issue response:", issue);

    if (issue.errorMessages) {
        document.getElementById("status").innerText = issue.errorMessages[0];
        return;
    }

    var issueSummary = issue.fields.summary;
    var jiraBaseUrl = issue.self.split("/rest/api")[0];

    document.getElementById("status").innerText =
        "Issue: " + issue.key + " - " + issueSummary;

    document.getElementById("searchConfluence").disabled = false;

    document.getElementById("searchConfluence").addEventListener("click", function() {
        var searchUrl = jiraBaseUrl + "/wiki/search?text=" +
            encodeURIComponent(issueSummary);
        window.open(searchUrl, "_blank");
    });
})
.catch(error => {
    console.error("API Error:", error);
    document.getElementById("status").innerText = "Unable to fetch issue details.";
});
