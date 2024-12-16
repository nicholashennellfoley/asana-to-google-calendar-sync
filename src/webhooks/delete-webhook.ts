import { Asana } from "./shared-utils.ts";

let webhooksApiInstance = new Asana.WebhooksApi();

export const deleteWebhook = async (webhookGid) => {
  try {
    webhooksApiInstance.deleteWebhook(webhookGid);
    console.log(`Webhook ${webhookGid} deleted.`);
  } catch (error) {
    console.error(
      "Error deleting webhook:",
      error.response ? error.response.data : error.message
    );
  }
};
