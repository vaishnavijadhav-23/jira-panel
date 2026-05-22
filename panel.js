 console.log("Context:", window.AdaptavistBridgeContext);
   
    AdaptavistBridge.request({
        url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
        type: 'GET'
    })
    .then(issue => {
        document.getElementById("status").innerText =
            "issue key : ${issue.key}";
        console.log("Issue response:", issue);
    })
    .catch(error => {
        console.error("API Error:", error);
        document.getElementById("status").innerText =
            "Unable to fetch issue details.";
    });
    
