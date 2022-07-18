import StringToJs from "./StringToJs";
import xml2js, { parseString } from "xml2js"

class XmlToJs implements StringToJs {
    constructor() {
        // External lib xml2js
    }

    convert(data: string): object {
        let machines = {};
        parseString(data, { explicitArray: false },
            function (err, result) {
                machines = result;
            });

        return machines;
    }
}

export default XmlToJs