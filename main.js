let scavengerHuntApp = document.createElement('sh-app');
let importLink = document.createElement('link');
importLink.rel = 'import';
importLink.href = chrome.extension.getURL('scavengerhunt-app.html');

document.body.appendChild(importLink);
document.body.appendChild(scavengerHuntApp);
