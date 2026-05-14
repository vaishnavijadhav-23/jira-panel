try {
  const context = AdaptavistBridgeContext.context || {};
  console.log("Bridge Context:", JSON.stringify(context, null, 2));

  if (context.issueKey) {
    console.log("Issue Key:", context.issueKey);
  } else {
    console.warn("No issueKey found — panel may not be in an issue view.");
  }
} catch (error) {
  console.error("Error accessing AdaptavistBridgeContext:", error);
}
