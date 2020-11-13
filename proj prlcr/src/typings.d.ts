/* SystemJS module definition */
declare var module: NodeModule;
declare var google;
interface StripeCheckoutStatic {
    configure: any;
}
interface StripeCheckoutHandler {
    close: any;
    open: any;
}
interface NodeModule {
    id: string;
}