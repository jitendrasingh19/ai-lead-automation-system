# Example n8n workflow to receive quote requests

1) Add a **Webhook** node in n8n
   - HTTP Method: POST
   - Path: `/webhook/your-webhook-id` (use the path from `N8N_WEBHOOK`)

2) (Optional) Add a **Set** node to map incoming JSON fields for easier use
   - Map fields like `firstName`, `lastName`, `email`, `companyName`, `phone`, `jobTitle`, `companySize`, `budgetRange`, `timeline`, `requirements`, `page`, `userAgent`, `submittedAt`

3) Add a **Google Sheets / Airtable / HTTP Request** node to store or forward data
   - Example: HTTP Request to send to Slack or CRM

Example minimal flow (pseudo-JSON)

{
  "nodes": [
    { "name": "Webhook", "type": "n8n-nodes-base.webhook" },
    { "name": "Set", "type": "n8n-nodes-base.set" },
    { "name": "GoogleSheets", "type": "n8n-nodes-base.googleSheets" }
  ]
}

Notes:
- Use the full URL you put into `N8N_WEBHOOK` in `.env.local`.
- If you set `N8N_API_KEY` on the server, the proxy adds `x-api-key` header to requests.
- Test by submitting the form in your app and watching the Webhook node in n8n.
