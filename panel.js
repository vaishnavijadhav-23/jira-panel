document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        console.log("Context after DOM ready:", window.AdaptavistBridgeContext);

        var ctx = window.AdaptavistBridgeContext;

        if (!ctx || !ctx.context || !ctx.context.issueKey) {
            document.getElementById("status").innerText = "Context unavailable.";
            console.error("Still no context:", ctx);
            return;
        }

        var issueKey = ctx.context.issueKey;
        console.log("Using issueKey:", issueKey);

        AdaptavistBridge.request({
            url: "/rest/api/2/issue/" + issueKey + "?fields=summary,status,assignee",
            type: "GET"
        })
        .then(function(issue) {
            console.log("Raw issue response:", JSON.stringify(issue));

            if (issue.errorMessages) {
                document.getElementById("status").innerText = issue.errorMessages[0];
                return;
            }

            if (!issue.fields) {
                document.getElementById("status").innerText = "Unexpected response.";
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

    }, 500);
});
