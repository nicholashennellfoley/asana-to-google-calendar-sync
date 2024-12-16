// Started off by https://github.com/goodwin64

declare module "asana" {
  export class ApiClient {
    static instance: ApiClient;
    authentications: {
      token: {
        accessToken: string;
      };
    };
  }

  export class TasksApi {
    createTask(body: CreateTaskBody, opts?: any): Promise<CreateTaskResult>;
  }

  export type CreateTaskBody = {
    data: {
      name: string;
      projects: string[];
    };
  };

  export type CreateTaskResult = {
    data: {
      gid: string;
      name: string;
    };
  };

  export class WebhooksApi {
    createWebhook(body: CreateWebhookBody, opts?: any): Promise<CreateWebhookResult>;
    deleteWebhook(opts?: any): Promise<DeleteWebhookResult>;
    getWebhooks(workspace: string, opts?: any): Promise<GetWebhooksResult>;
  }

  export type CreateWebhookBody = {
    data: {
      resource: string;
      target: string;
      filters?: WebhookFilters[];
    };
  };

  export type WebhookFilters = {
    resource_type?: string;
    resource_subtype?: string;
    action?: string;
    fields?: string[];
  };

  export type CreateWebhookResult = {
    data: {
      gid: string;
      target: string;
      x_hook_secret: string;
    };
  };

  export type DeleteWebhookResult = {
    data: {};
  }

  export type GetWebhooksResult = {
    data: Array<GetWebhooksResultDataArray>; 
  }

  export type GetWebhooksResultDataArray = {
    gid: string,
    active: boolean,
    resource: object,
    target: string,
    created_at: string,
    last_failure_at?: string,
    last_failure_content?: string,
    last_success_at?: string
    delivery_retry_count?: number,
    next_attempt_after?: string,
    failure_deletion_timestamp?: string,
    filters?: WebhookFilters,
    next_page?: object
  }
}
