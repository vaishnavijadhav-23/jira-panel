console.log(AdaptavistBridgeContext.context);

AdaptavistBridge.request({
    url: `/rest/api/2/issue/${AdaptavistBridgeContext.context.issueKey}`,
    type: 'GET'
})
    .then(issue => {
        console.log('issue', issue)
        document.getElementById("issueType").value = `${issue.key} is a ${issue.fields.issuetype.name} in ${issue.fields.status.name}`;
    });
