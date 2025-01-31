//! ClientHooks.debug.js
//
var scriptLoader = scriptLoader || {
    delayedLoads: [],
    load: function (name, requires, script) {
        window._loadedScripts = window._loadedScripts || {};
        // Check for loaded scripts, if not all loaded then register delayed Load
        if (requires == null || requires.length == 0 || scriptLoader.areLoaded(requires)) {
            scriptLoader.runScript(name, script);
        }
        else {
            // Register an onload check
            scriptLoader.delayedLoads.push({ name: name, requires: requires, script: script });
        }
    },
    runScript: function (name, script) {      
        script.call(window);
        window._loadedScripts[name] = true;
        scriptLoader.onScriptLoaded(name);
    },
    onScriptLoaded: function (name) {
        // Check for any registered delayed Loads
        scriptLoader.delayedLoads.forEach(function (script) {
            if (script.loaded == null && scriptLoader.areLoaded(script.requires)) {
                script.loaded = true;
                scriptLoader.runScript(script.name, script.script);
            }
        });
    },
    areLoaded: function (requires) {
        var allLoaded = true;
        for (var i = 0; i < requires.length; i++) {
			var isLoaded = (window._loadedScripts[requires[i]] != null);
            allLoaded = allLoaded && isLoaded;
            if (!allLoaded)
                break;
        }
        return allLoaded;
    }
};
 
scriptLoader.load("clienthooks", ["mscorlib","xrm"], function () {


Type.registerNamespace('NetworkView.ClientHooks.Ribbon');

////////////////////////////////////////////////////////////////////////////////
// NetworkView.ClientHooks.Ribbon.AccountRibbon

NetworkView.ClientHooks.Ribbon.AccountRibbon = function NetworkView_ClientHooks_Ribbon_AccountRibbon() {
}
NetworkView.ClientHooks.Ribbon.AccountRibbon.openNetworkView = function NetworkView_ClientHooks_Ribbon_AccountRibbon$openNetworkView() {
    var data = String.format('id={0}', Xrm.Page.data.entity.getId());
    data = encodeURIComponent(data);
    Xrm.Utility.openWebResource('dev1_/html/NetworkView.htm', data, 1024, 768);
}


NetworkView.ClientHooks.Ribbon.AccountRibbon.registerClass('NetworkView.ClientHooks.Ribbon.AccountRibbon');
});
