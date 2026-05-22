function waitForContext(callback, retries, interval) {
    retries = retries === undefined ? 30 : retries;
    interval = interval === undefined ? 300 : interval;

    var ctx = window.AdaptavistBridgeContext;
    console.log("Checking context... retries left:", retries, ctx);

    if (ctx && ctx.context && ctx.context.issueKey) {
        console.log("Context ready:", ctx);
        callback(ctx.context.issueKey);
    } else if (retries > 0) {
        setTimeout(function() {
            waitForContext(callback, retries - 1, interval);
        }, interval);
    } else {
        console.error("Context never became available");
        document.getElementById("status").innerText = "Context unavailable.";
    }
}

waitForContext(function(issueKey) {
    console.log("Using issueKey:", issueKey);

    AdaptavistBridge.request({
        url: "/rest/api/2/issue/" + issueKey + "?fields=summary,status,assignee",
        type: "GET"
    })
    .then(function(issue) {
        console.log("Raw issue response:", JSON.stringify(issue));

        if (issue.errorMessages && issue.errorMessages.length > 0) {
            console.error("Jira API error:", issue.errorMessages);
            document.getElementById("status").innerText = issue.errorMessages[0];
            return;
        }

        if (!issue.fields) {
            console.error("No fields in response:", issue);
            document.getElementById("status").innerText = "Unexpected response format.";
            return;
        }

        var issueSummary = issue.fields.summary;
        var jiraBaseUrl = issue.self.split("/rest/api")[0];

        document.getElementById("status").innerText =
            "Issue: " + issue.key + " - " + issueSummary;

        document.getElementById("searchConfluence").disabled = false;

        document.getElementById("searchConfluence").addEventListener("click", function() {
            var searchUrl = jiraBaseUrl + "/wiki/search?text=" + encodeURIComponent(issueSummary);
            window.open(searchUrl, "_blank");
        });
    })
    .catch(function(error) {
        console.error("API Error:", error);
        document.getElementById("status").innerText = "Unable to fetch issue details.";
    });
});
