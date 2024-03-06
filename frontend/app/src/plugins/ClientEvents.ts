import Emittery from "emittery";

export enum ClientEvent {
    OnNewMessagesLoaded = "OnNewMessagesLoaded",
    OnRouteLoad = "OnRouteLoad"
}

export const ClientEvents = new Emittery<{
    OnNewMessagesLoaded: never;
    OnRouteLoad: boolean;
}>();
