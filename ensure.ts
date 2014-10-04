module ObjectExtensions {
    export function ensure(object: any, type: any) {
        if (type == null)
            throw new Error("Existence check for the input object itself is not supported.");

        switch (typeof type) {
            case "string":
                return (typeof object === type);
            case "function":
                return (object instanceof type);
            case "object":
                if (isClassConstructor(type))
                    return (object instanceof type);
                else {
                    // property check
                    for (var key in type) {
                        var proptype = type[key];

                        // null: just ensure existence
                        if (proptype === null) {
                            if (!(key in object))
                                return false;
                            continue;
                        }
                        // undefined: just ensure nonexistence
                        else if (proptype === undefined) {
                            if (key in object)
                                return false;
                            continue;
                        }
                        else if (!ObjectExtensions.ensure(object[key], proptype))
                            return false;
                    }
                    return true;
                }
            default:
                throw new Error("A type indicator property should be either string, class constuctor, or nested indicator object.");
        }
    }

    function isClassConstructor(object: any) {
        return ("prototype" in object && "constructor" in object.prototype && object.prototype.constructor === object);
    }
}