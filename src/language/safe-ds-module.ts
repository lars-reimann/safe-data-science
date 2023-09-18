import {
    createDefaultModule,
    createDefaultSharedModule,
    DeepPartial,
    DefaultSharedModuleContext,
    inject,
    LangiumServices,
    LangiumSharedServices,
    Module,
    PartialLangiumServices,
} from 'langium';
import { SafeDsGeneratedModule, SafeDsGeneratedSharedModule } from './generated/module.js';
import { SafeDsValidator, registerValidationChecks } from './validation/safe-ds-validator.js';
import { SafeDsFormatter } from './formatting/safe-ds-formatter.js';
import { SafeDsWorkspaceManager } from './builtins/workspaceManager.js';
import {SafeDsScopeComputation} from "./scoping/safe-ds-scope-computation.js";
import {SafeDsScopeProvider} from "./scoping/safe-ds-scope-provider.js";

/**
 * Declaration of custom services - add your own service classes here.
 */
export type SafeDsAddedServices = {
    validation: {
        SafeDsValidator: SafeDsValidator;
    };
};

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type SafeDsServices = LangiumServices & SafeDsAddedServices;

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const SafeDsModule: Module<SafeDsServices, PartialLangiumServices & SafeDsAddedServices> = {
    lsp: {
        Formatter: () => new SafeDsFormatter(),
    },
    references: {
        ScopeComputation: (services) => new SafeDsScopeComputation(services),
        ScopeProvider: (services) => new SafeDsScopeProvider(services),
    },
    validation: {
        SafeDsValidator: () => new SafeDsValidator(),
    },
};

export type SafeDsSharedServices = LangiumSharedServices;

export const SafeDsSharedModule: Module<SafeDsSharedServices, DeepPartial<SafeDsSharedServices>> = {
    workspace: {
        WorkspaceManager: (services) => new SafeDsWorkspaceManager(services),
    },
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @return An object wrapping the shared services and the language-specific services
 */
export const createSafeDsServices = function (context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices;
    SafeDs: SafeDsServices;
} {
    const shared = inject(createDefaultSharedModule(context), SafeDsGeneratedSharedModule, SafeDsSharedModule);
    const SafeDs = inject(createDefaultModule({ shared }), SafeDsGeneratedModule, SafeDsModule);
    shared.ServiceRegistry.register(SafeDs);
    registerValidationChecks(SafeDs);
    return { shared, SafeDs };
};
