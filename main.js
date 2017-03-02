/*
 * the containers application already has Polymer loaded on it,
 * so we shouldn't load it again.
 */
if (!/^\/containers\/?.*/.test(window.location.pathname)) {
  let polymerImportLink = document.createElement('link');
  polymerImportLink.rel = 'import';
  polymerImportLink.href = chrome.extension.getURL('bower_components/polymer/polymer.html');

  document.head.appendChild(polymerImportLink);
}

let defaultItems = [
  {
    id: 'container-catalog',
    url: '/containers/#/repo/57ea8cf59c624c035f96f3db',
    title: 'Container Catalog',
    text: 'Find the container image for mysql on OpenShift',
    completed: false
  },
  {
    id: 'cve',
    url: '',
    title: 'CVE',
    text: 'CVE - need text',
    completed: false
  },
  {
    id: 'documentation',
    url: '',
    title: 'Documentation',
    text: 'Documentation - need text',
    completed: false
  },
  {
    id: 'labs',
    url: '/labs/registrationassistant',
    title: 'Labs',
    text: 'Find the Registration Assistant Lab',
    completed: false
  },
  {
    id: 'discussions',
    url: '/discussions/644133',
    title: 'Discussions',
    text: 'Find a Discussion about networking RHEL 7 installations',
    completed: false
  },
  {
    id: 'package-search',
    url: '/downloads/content/virt-who/0.18-2.el6/noarch/f21541eb/package',
    title: 'Package Search',
    text: 'Find the virt-who package details page (latest version of RHEL)',
    completed: false
  }
];

function init() {
  window.addEventListener('message', evt => {
    if (evt.source !== window) {
      return;
    }

    if (evt.data.type && (evt.data.type === 'FROM_PAGE')) {
      switch (evt.data.action) {
        case 'reset':
          reset();
          break;
        default:

      }
    }
  });

  chrome.storage.local.get('store', data => {
    let items = (data.store) ? data.store.items : defaultItems;

    for (let item of items) {
      if (window.location.href.indexOf(item.url) > -1 && item.url && !item.completed) {
        item.completed = true;
        chrome.storage.local.set({
          'store': {
            'items': items
          }
        });
      }
    }

    let scavengerHuntApp = document.createElement('sh-app');
    scavengerHuntApp.setAttribute('extension-id', chrome.runtime.id);
    scavengerHuntApp.setAttribute('items', JSON.stringify(items));

    let importLink = document.createElement('link');
    importLink.rel = 'import';
    importLink.href = chrome.extension.getURL('scavengerhunt-app.html');

    document.body.appendChild(importLink);
    document.body.appendChild(scavengerHuntApp);
  });
}

function reset() {
  chrome.storage.local.clear();
  window.location.href = 'https://access.redhat.com';
}

init();
