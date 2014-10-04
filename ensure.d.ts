declare module ObjectExtensions {
    function ensure(object: {
        [key: string]: any;
    }, properties: {
        [key: string]: any;
    }): boolean;
}
