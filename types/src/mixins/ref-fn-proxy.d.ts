export default function (refKey: string, methodNames?: string[], includePrivate?: boolean): {
    methods: Record<string, () => unknown>;
};
export declare function pluginMethodsProxyMixin(instanceKey: string, methodNames?: string[]): {
    methods: Record<string, () => unknown>;
};
