// Log everything available on the bridge objects
console.log("Bridge object:", AdaptavistBridge);
console.log("BridgeContext object:", AdaptavistBridgeContext);

// Try all known ways to get context
async function debugContext() {
  try {
    const ctx1 = await AdaptavistBridgeContext.context;
    console.log("context (await):", ctx1);
  } catch(e) {
    console.log("context await failed:", e);
  }

  try {
    const ctx2 = await AdaptavistBridgeContext.getContext();
    console.log("getContext():", ctx2);
  } catch(e) {
    console.log("getContext failed:", e);
  }

  try {
    const ctx3 = await AP.context.getContext();
    console.log("AP.context.getContext():", ctx3);
  } catch(e) {
    console.log("AP.context failed:", e);
  }
}

// Run on load AND on button click
debugContext();

document.getElementById("btn").addEventListener("click", async function () {
  await debugContext();
});
