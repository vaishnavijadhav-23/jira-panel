function getContextFromUrl() {
    var params = new URLSearchParams(window.location.search);
    console.log("Full URL:", window.location.href);
    console.log("All URL params:", Object.fromEntries(params));
    return {
        issueKey: params.get("issueKey") || params.get("issue.key") || params.get("context.issueKey"),
        projectKey: params.get("projectKey") || params.get("project.key")
    };
}

var ctx = getContextFromUrl();
console.log("Context from URL:", ctx);

if (!ctx.issueKey) {
    document.getElementById("status").innerText = "No issue key in URL.";
} else {
    AdaptavistBridge.request({
        url: "/rest/api/2/issue/" + ctx.issueKey + "?fields=summary,status,assignee",
        type: "GET"
    })
    .then(function(issue) {
        console.log("Raw issue response:", JSON.stringify(issue));

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
            var searchUrl = jiraBaseUrl + "/wiki/search?text=" + encodeURIComponent(issueSummary);
            window.open(searchUrl, "_blank");
        });
    })
    .catch(function(error) {
        console.error("API Error:", error);
        document.getElementById("status").innerText = "Unable to fetch issue details.";
    });
}
