import {
  Asana,
  fs,
  path,
  fileURLToPath,
  getXHookSecret,
} from "./shared-utils.ts";
import { deleteWebhook } from "./delete-webhook.ts";

let webhooksApiInstance = new Asana.WebhooksApi();

export const createWebhook = async (
  resourceGid: string,
  targetUri: string,
  filters: Asana.WebhookFilters[]
) => {
  let body: Asana.CreateWebhookBody = {
    data: {
      resource: resourceGid,
      target: targetUri,
      filters: filters,
    },
  };

  try {
    const response = await webhooksApiInstance.createWebhook(body);

    const xHookSecret = response["X-Hook-Secret"];
    const storedSecret = getXHookSecret();

    // Compare the secrets. This check is not solely for detecting mutations in the stored secret.
    // Rather, it ensures that the original secret was valid and corresponds to what Asana expects.
    if (xHookSecret !== storedSecret) {
      console.error(
        `X-Hook-Secrets do not match! Potential security issue. Deleting webhook with GID ${response.data.gid}.`
      );
      // Delete the webhook if the secrets don't match
      await deleteWebhook(response.data.gid);
      return;
    }

    console.log("Webhook created successfully!");
    console.log(
      `The GID of the newly-created webhook is: ${response.data.gid}.`
    );
    console.log(
      `The X-Hook-Secret from Asana's '201 Created' response is: ${xHookSecret}.`
    );
  } catch (error) {
    console.error(
      "Error creating webhook:",
      error.response ? error.response.data : error.message
    );
  }
};
