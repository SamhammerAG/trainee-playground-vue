import "vue-router";

declare module "vue-router" {
    export declare interface RouteMeta {
        requiredRole: string;
        apiClient: "dispatcher" | "admin";
    }
}
