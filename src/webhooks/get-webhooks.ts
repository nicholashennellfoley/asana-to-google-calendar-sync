import { Asana } from "./shared-utils.ts";

let webhooksApiInstance = new Asana.WebhooksApi();

export const getWebhooks = async (workspaceGid: string) => {
  let opts = {
    opt_fields: "active,created_at,delivery_retry_count,failure_deletion_timestamp,filters,filters.action,filters.fields,filters.resource_subtype,last_failure_at,last_failure_content,last_success_at,next_attempt_after,offset,path,resource,resource.name,target,uri",
  };

  try {
    const response = await webhooksApiInstance.getWebhooks(workspaceGid, opts);
    console.log("%o", response.data);
  } catch (error) {
    console.error(
      "Error getting webhooks:",
      error.response ? error.response.data : error.message
    );
  }
};
