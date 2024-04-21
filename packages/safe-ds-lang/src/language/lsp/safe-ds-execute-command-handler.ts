import { AbstractExecuteCommandHandler, ExecuteCommandAcceptor } from 'langium/lsp';
import { SafeDsSharedServices } from '../safe-ds-module.js';
import { SafeDsRunner } from '../runtime/safe-ds-runner.js';
import { COMMAND_RUN_PIPELINE, COMMAND_SHOW_IMAGE } from '../constants/commands.js';

/* c8 ignore start */
export class SafeDsExecuteCommandHandler extends AbstractExecuteCommandHandler {
    private readonly runner: SafeDsRunner;

    constructor(sharedServices: SafeDsSharedServices) {
        super();

        const services = sharedServices.ServiceRegistry.getSafeDsServices();
        this.runner = services.runtime.Runner;
    }

    override registerCommands(acceptor: ExecuteCommandAcceptor) {
        acceptor(COMMAND_RUN_PIPELINE, ([documentUri, nodePath]) => this.runner.runPipeline(documentUri, nodePath));
        acceptor(COMMAND_SHOW_IMAGE, ([documentUri, nodePath]) => this.runner.showImage(documentUri, nodePath));
    }
}
/* c8 ignore stop */
