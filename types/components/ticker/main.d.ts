export interface Props {
    duration?: number;
    interval?: number;
}
declare const _default: import("vue").DefineComponent<{
    duration: {
        type: NumberConstructor;
        default: number;
    };
    interval: {
        type: NumberConstructor;
        default: number;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "on-timeout"[], "on-timeout", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    duration: number;
    interval: number;
} & {}>, {
    duration: number;
    interval: number;
}>;
export default _default;
