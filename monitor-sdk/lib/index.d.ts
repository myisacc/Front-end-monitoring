interface DefaultOptions {
    appId: string;
    uuId: string;
    requestUrl: string;
    ErrorTracker: boolean;
    DOMTracker: boolean;
    HashTracker: boolean;
    HistoryTracker: boolean;
}
interface Options extends Partial<DefaultOptions> {
    appId: string;
    uuId: string;
    requestUrl: string;
}

declare function ErrorCatcher(message: string, error: any): void;

declare function init(options: Options): void;

export { ErrorCatcher, init };
