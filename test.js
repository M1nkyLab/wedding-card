const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};
// Mock requestAnimationFrame
window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);

try {
  // Inject mock supabase
  window.supabase = { createClient: () => ({ from: () => ({ select: () => ({ order: async () => ({ data: [], error: null }) }) }) }) };
  dom.window.eval(js);
  
  // Trigger DOMContentLoaded
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  
  // Try to click button
  const btn = dom.window.document.getElementById('btn-open');
  if (btn) {
    btn.click();
    console.log("Button clicked! Cover classes:", dom.window.document.getElementById('cover').className);
    console.log("Body classes:", dom.window.document.body.className);
  } else {
    console.log("Button not found!");
  }
} catch(e) {
  console.error("CRASH:", e);
}
