var dependencies = {};

function resolve(name) {
    var dep = dependencies[name];
    if (!dep) {
        throw new Error('Cannot find: ' + name);
    }
    if (dep.resolved) {
        return dep.resolved;
    }
    var resolvedDeps=[];
    for (var i = 0; i < dep.deps.length; i++) {
        var _dep = dep.deps[i];
        resolvedDeps[i] = resolve(_dep);
    }
    dep.resolved = dep.callback.apply(null, resolvedDeps);
    return dep.resolved;

}
var define = function (name, deps, callback) {
    if (!deps) {
        resolve(name);
    } else {
        dependencies[name] = {deps: deps, callback: callback, resolved: null};
    }
};


var root = this;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = define;
}
root.define = define;
