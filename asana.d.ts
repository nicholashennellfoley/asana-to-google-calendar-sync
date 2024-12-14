// Started off by https://github.com/goodwin64

declare module 'asana' {
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
        id: string;
        name: string;
      }
    };
  }
  