var INTERVAL = 500; // ms

AddGaScript();
var counter = 1;
window.setInterval(function(){
  ClearAds();
  counter++;
}, INTERVAL);

function AppendScriptToHead(script) {
  var head = document.getElementsByTagName('head')[0];
  var e = document.createElement('script');
  e.setAttribute('type','text/javascript');
  e.innerHTML = script;
  head.appendChild(e);
}

function AddGaScript() {
  // Override title to prevent gathering personal information there.
  AppendScriptToHead(
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','_clearfbads_ga');\n" +
    "_clearfbads_ga('create', 'UA-52118595-1');\n" +
    "_clearfbads_ga('set', 'page', '/' + window.location.hostname + window.location.pathname);\n" +
    "_clearfbads_ga('set', 'title', window.location.hostname);\n" +
    "_clearfbads_ga('send', 'pageview');\n"
  );
}

function SendEvent() {
  AppendScriptToHead(
    "_clearfbads_ga('send', 'event', 'auto', 'clear', window.location.hostname + window.location.pathname);\n" +
    "_clearfbads_ga('send', 'timing', 'auto', 'clear', " + counter * INTERVAL + ", window.location.hostname + window.location.pathname);\n"
  );
}

function ClearAds() {
  var result = false;

  // Remove side bar Ads.
  var element = document.getElementById("pagelet_ego_pane");
  if (element != null) {
    element.parentNode.removeChild(element);
    result = true;
  }

  // Remove side bar Ads.
  element = document.getElementById("pagelet_side_ads");
  if (element != null) {
    element.parentNode.removeChild(element);
    result = true;
  }

  // Remove stream Ads on homepage.
  // We assume that there is an anchor with class "uiStreamSponsoredLink" in a sponsor post,
  // and there is an attribute data-dedupekey in every div block of a post.
  var elements = document.getElementsByClassName("uiStreamSponsoredLink");
  for (var i = elements.length - 1; i >= 0; i--) {
    var e = elements[i];
    while (typeof e.hasAttribute == "function" &&
           !e.hasAttribute("data-dedupekey")) {
      e = e.parentNode;
      if (!e)
        break;
    }
    if (typeof e.hasAttribute == "function" &&
        e.hasAttribute("data-dedupekey")) {
      e.parentNode.removeChild(e);
      result = true;
    }
  }

  if (result) {
    SendEvent();
  }
}
