/**
 * Offscreen document used by the Manifest V3 service worker.
 *
 * Manifest V3 does not allow the service worker to play media, so the muted
 * video that keeps the operating system awake is played here instead.
 *
 * The desired state is read from `chrome.storage.local`, so the document
 * behaves correctly no matter when it is created.
 */

const video = document.getElementById('keep-awake');

const setSource = () => {
  if (video.dataset.source) return;
  const url = chrome.runtime.getURL('video/muted-blank.mp4');
  video.dataset.source = url;
  video.src = url;
};

const play = () => {
  setSource();
  video.muted = true;
  const result = video.play();
  if (result && typeof result.catch === 'function') {
    result.catch((error) => console.error('Unable to play the keep awake video', error));
  }
};

const pause = () => {
  video.pause();
};

const apply = (enabled) => {
  if (enabled) play();
  else pause();
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.preventSleepConnected) {
    apply(Boolean(changes.preventSleepConnected.newValue));
  }
});

chrome.storage.local.get(['preventSleepConnected'], ({ preventSleepConnected }) => {
  apply(Boolean(preventSleepConnected));
});
