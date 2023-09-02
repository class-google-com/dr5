const __asset = pc.Asset.prototype;

__asset.ready = function (callback, scope) {
    scope = scope || this;

    if (!this.resource || (this.resource && (this.resource.meshes !== undefined && !this.resource.meshes))) {
        this.once("load", function (asset) {
            callback.call(scope, asset);
        });
    } else {
        callback.call(scope, this);
    }

};

const __registry = pc.AssetRegistry.prototype;

__registry.regexFind = function(exp, type)
{
    const names     = this._names;
    const result    = [];

    for (const name in names)
    {
        if (exp.test(name)) result.push(this._assets[names[name]]);
    }

    if (type)
    {
        return result.filter(asset =>
        {
            if (asset) return asset.type === type;
            else return false;
        });
    }

    return result;
};

const __template = pc.Template.prototype;

__template.instantiate = function(parent)
{
    if (!this._templateRoot) { // at first use, after scripts are loaded
        this._parseTemplate();
    }

    const clone = this._templateRoot.clone();

    if (parent) parent.addChild(clone);

    return clone;
}