export declare function getPublicMethodNames(...components: UE.Component[]): string[];
export declare function getComponentFnProxy(component: UE.Component, ref: string): {
    methods: Record<string, () => unknown>;
};
export declare const wrapperInstall: (component: UE.UnpluginComponent) => UE.Component;
