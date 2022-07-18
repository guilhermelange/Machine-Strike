import StringToJs from "./StringToJs";

class JsonToJs implements StringToJs {
    constructor() {
        // Lib built-in. JSON
    }

    convert(data: string): object {
        return JSON.parse(data);
    }
}

export default JsonToJs