var ObjectExtensions;
(function (ObjectExtensions) {
    function ensure(object, properties) {
        for (var key in properties) {
            var type = properties[key];
            var value = object[key];
            if (type === null) {
                if (!(key in object))
                    return false;
                continue;
            } else if (type === undefined) {
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
                    } else {
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
    ObjectExtensions.ensure = ensure;

    function isClassConstructor(object) {
        return ("prototype" in object && "constructor" in object.prototype && object.prototype.constructor === object);
    }
})(ObjectExtensions || (ObjectExtensions = {}));
//# sourceMappingURL=ensure.js.map
