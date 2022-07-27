import Command from "./Command";

class CommandInvoker {
    private immediate = [] as Command[];
    private all = [] as Command[];
    private undolist = [] as Command[];

    public add(command: Command) {
        this.immediate.push(command);
    }

    public execute(...args: any[]) {
        if (args.length == 1) {
            const command = args[0] as Command
            command.execute();
            this.all.push(command);
        } else {
            for (const command of this.immediate) {
                command.execute();
                this.all.push(command)
            }
            this.immediate.length = 0;
        }
    }

    public undo() {
        const command = this.all.pop() as Command;
        command?.undo();
        this.undolist.push(command);
    }

    public redo() {
        const command = this.undolist.pop() as Command;
        command?.redo();
        this.all.push(command);
    }
}

export default CommandInvoker;