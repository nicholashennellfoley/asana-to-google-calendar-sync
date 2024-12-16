import { createWebhook } from "./create-webhook.ts";
import { deleteWebhook } from "./delete-webhook.ts";
import { getWebhooks } from "./get-webhooks.ts";

const workspaceGid = process.env.ASANA_WORKSPACE_GID;
const webhookTargetUri = `${process.env.WEBHOOK_TARGET_BASE_URI}/receiveWebhook`;
const webhookResourceGid = process.env.ASANA_PROJECT_GID;
const webhookFilters = [
  { resource_type: "task", action: "changed", fields: ["due_at", "start_at"] },
  { resource_type: "task", action: "added" },
  { resource_type: "task", action: "removed" },
  { resource_type: "task", action: "deleted" },
  { resource_type: "task", action: "undeleted" },
];

const run = async () => {
  const command: string = process.argv[2];
  switch (command) {
    case "create-webhook":
      await createWebhook(webhookResourceGid, webhookTargetUri, webhookFilters);
      break;
    case "delete-webhook":
      const webhookGid: string = process.argv[3];
      if (webhookGid) {
        await deleteWebhook(process.argv[3]);
        break;
      } else {
        console.log(
          "Invalid command. Usage: npm run dev delete-webhook [webhookGid]"
        );
        break;
      }
    case "get-webhooks":
      await getWebhooks(workspaceGid);
      break;
    default:
      console.log(
        "Invalid command. Usage: npm run dev [create-webhook|delete-webhook [webhookGid]|get-webhooks]"
      );
  }
};

await run();
