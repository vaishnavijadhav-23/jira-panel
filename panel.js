document.getElementById("btn").addEventListener("click", async () => {

    try {

        // Get runtime context
        const context = await AdaptavistBridge.getContext();

        console.log("Full Context:", context);

        // Get issue key safely
        const issueKey = context.extension.issue.key;

        document.getElementById("issueKey").innerText =
            "Current Issue: " + issueKey;

        // Fetch issue dynamically
        const issue = await AdaptavistBridge.request({
            url: `/rest/api/2/issue/${issueKey}`,
            type: 'GET'
        });

        console.log("Issue:", issue);

        document.getElementById("result").innerHTML = `
            <div class="card">
                <h3>${issue.key}</h3>
                <p><b>Summary:</b> ${issue.fields.summary}</p>
                <p><b>Status:</b> ${issue.fields.status.name}</p>
                <p><b>Type:</b> ${issue.fields.issuetype.name}</p>
            </div>
        `;

    } catch (error) {

        console.error("Error:", error);

    }
});
