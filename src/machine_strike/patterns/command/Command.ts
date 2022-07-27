interface Command {
    execute(): void;
    undo(): void;
    redo(): void;
}

export default Command;