var dependencies = {};

function resolve(name) {
    var dep = dependencies[name];
    if (!dep) {
        throw new Error('Cannot find: ' + name);
    }
    if (dep.resolved) {
        return dep.resolved;
    }
    for (var i = 0; i < dep.deps.length; i++) {
        var _dep = dep.deps[i];
        dep.resolvedDeps[i] = resolve(_dep);
    }
    dep.resolved = dep.callback.apply(null, dep.resolvedDeps);
    return dep.resolved;

}
var define = function (name, deps, callback) {
    if (!deps) {
        resolve(name);
    } else {
        dependencies[name] = {deps: deps, resolvedDeps: [], callback: callback, resolved: null};
    }
};

module.exports = define;