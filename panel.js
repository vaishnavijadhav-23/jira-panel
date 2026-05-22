 console.log("Context:", window.AdaptavistBridgeContext);
   
    AdaptavistBridge.request({
        url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
        type: 'GET'
    })
    .then(issue => {
       baseurl=issue.self;
        jiraBaseUrl = issue.self.split("/rest/api")[0];
        issuekey=issue.key;
        issuesummary=issue.fields.summary;
        console.log("Issue response:", issue);
        console.log("BaseUrl : ",jiraBaseUrl)
    })
    .catch(error => {
        console.error("API Error:", error);
        document.getElementById("status").innerText =
            "Unable to fetch issue details.";
    });
    
