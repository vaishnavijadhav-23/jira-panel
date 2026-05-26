setTimeout(function() {
    console.log("Bridge:", window.AdaptavistBridge);
    console.log("BridgeContext:", window.AdaptavistBridgeContext);
    console.log("Context:", window.AdaptavistBridgeContext?.context);
    console.log("IssueKey:", window.AdaptavistBridgeContext?.context?.issueKey);
}, 3000);
