module ObjectExtensions {
    export function ensure(object: { [key: string]: any }, properties: { [key: string]: any }) {
        for (var key in properties) {
            var type = properties[key];
            var value = object[key];

            // null: just ensure existence
            if (type === null) {
                if (!(key in object))
                    return false;
                continue;
            }
            // undefined: just ensure nonexistence
            else if (type === undefined) {
                if (key in object)
                    return false;
                continue;
            }

            switch (typeof type) {
                case "string":
                    if (typeof value !== type)
                        return false;
                    break;
                case "function":
                    if (!(value instanceof type))
                        return false;
                    break;
                case "object":
                    if (isClassConstructor(type)) {
                        if (!(value instanceof type))
                            return false;
                    }
                    else {
                        if (!ObjectExtensions.ensure(value, type))
                            return false;
                    }
                    break;
                default:
                    throw new Error("A type indicator property should be either string, class constuctor, or nested indicator object.");
            }
        }
        return true;
    }

    function isClassConstructor(object: any) {
        return ("prototype" in object && "constructor" in object.prototype && object.prototype.constructor === object);
    }
}
