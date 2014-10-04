var ObjectExtensions;
(function (ObjectExtensions) {
    function ensure(object, properties) {
        for (var key in properties) {
            var value = properties[key];
            switch (typeof value) {
                case "string":
                    if (typeof object[key] !== value)
                        return false;
                    break;
                case "function":
                    if (!(object[key] instanceof value))
                        return false;
                    break;
                case "object":
                    if (!ObjectExtensions.ensure(object[key], value))
                        return false;
                    break;
                default:
                    throw new Error("A type indicator property should be either string, class constuctor, or nested indicator object.");
            }
        }
        return true;
    }
    ObjectExtensions.ensure = ensure;
})(ObjectExtensions || (ObjectExtensions = {}));
//# sourceMappingURL=ensure.js.map
