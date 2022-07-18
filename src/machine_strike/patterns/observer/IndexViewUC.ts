import IndexViewObserver from "./IndexViewObserver";

interface IndexViewUC {
    startGame(data: any): void | never;

    addObserver(obs: IndexViewObserver) : void;

    removeObserver(obs: IndexViewObserver) : void;
}

export default IndexViewUC