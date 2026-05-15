const context = window.AdaptavistBridgeContext.context || {};
console.log("Bridge Context:", JSON.stringify(context, null, 2));

console.log("Context : ",context)

if (!context.issueKey) {
  console.warn("No issueKey found — panel may not be in an issue view.");
}
