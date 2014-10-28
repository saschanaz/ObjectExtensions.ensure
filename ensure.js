var ObjectExtensions;
(function (ObjectExtensions) {
    function ensure(object, type) {
        if (type == null)
            throw new Error("Existence check for the input object itself is not supported.");
        if (object == null)
            return false;

        switch (typeof type) {
            case "string":
                return (typeof object === type);
            case "function":
                return (object instanceof type);
            case "object":
                if (isClassConstructor(type))
                    return (object instanceof type);
                if (Array.isArray(type)) {
                    for (var i = 0; i < type.length; i++) {
                        if (ObjectExtensions.ensure(object, type[i]))
                            return true;
                    }
                    return false;
                } else {
                    for (var key in type) {
                        var proptype = type[key];

                        // null: just ensure existence
                        if (proptype === null) {
                            if (!(key in object))
                                return false;
                            continue;
                        } else if (proptype === undefined) {
                            if (key in object)
                                return false;
                            continue;
                        } else if (!ObjectExtensions.ensure(object[key], proptype))
                            return false;
                    }
                    return true;
                }
            default:
                throw new Error("A type indicator property should be either string, class constuctor, or nested indicator object.");
        }
    }
    ObjectExtensions.ensure = ensure;

    function isClassConstructor(object) {
        return ("prototype" in object && "constructor" in object.prototype && object.prototype.constructor === object);
    }
})(ObjectExtensions || (ObjectExtensions = {}));
//# sourceMappingURL=ensure.js.map
