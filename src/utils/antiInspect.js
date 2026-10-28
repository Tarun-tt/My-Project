// PrankLab Anti-Inspect & Security Shield by Tarun Tiwari

let isProtectionEnabled = true;
let inspectListenerCallbacks = [];
let devToolsOpen = false;
let overlayElement = null;

export function setInspectProtection(enabled) {
  isProtectionEnabled = enabled;
  try {
    localStorage.setItem('pranklab-inspect-protection', enabled ? 'true' : 'false');
  } catch (e) {}

  if (!enabled) {
    removeStealthOverlay();
  }
}

export function getInspectProtection() {
  try {
    const saved = localStorage.getItem('pranklab-inspect-protection');
    if (saved !== null) return saved === 'true';
  } catch (e) {}
  return true;
}

export function subscribeInspectAttempt(callback) {
  inspectListenerCallbacks.push(callback);
  return () => {
    inspectListenerCallbacks = inspectListenerCallbacks.filter((cb) => cb !== callback);
  };
}

function notifyAttempt(type) {
  inspectListenerCallbacks.forEach((cb) => {
    try {
      cb(type);
    } catch (e) {}
  });
}

function createStealthOverlay() {
  if (typeof document === 'undefined') return;
  if (overlayElement) return;

  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'hidden';
    root.style.pointerEvents = 'none';
  }

  overlayElement = document.createElement('div');
  overlayElement.id = 'pranklab-stealth-shield';
  overlayElement.style.position = 'fixed';
  overlayElement.style.top = '0';
  overlayElement.style.left = '0';
  overlayElement.style.width = '100vw';
  overlayElement.style.height = '100vh';
  overlayElement.style.backgroundColor = '#0b0f19';
  overlayElement.style.color = '#ffffff';
  overlayElement.style.zIndex = '2147483647';
  overlayElement.style.display = 'flex';
  overlayElement.style.flexDirection = 'column';
  overlayElement.style.alignItems = 'center';
  overlayElement.style.justifyContent = 'center';
  overlayElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  overlayElement.style.padding = '24px';
  overlayElement.style.textAlign = 'center';

  overlayElement.innerHTML = `
    <div style="max-width: 540px; background: rgba(30, 41, 59, 0.85); border: 2px solid #ef4444; border-radius: 24px; padding: 36px 28px; box-shadow: 0 25px 60px rgba(239, 68, 68, 0.35); backdrop-filter: blur(12px);">
      <div style="font-size: 64px; margin-bottom: 12px; animation: bounce 1s infinite alternate;">🕵️‍♂️🚫</div>
      <h1 style="font-size: 26px; font-weight: 900; color: #f87171; margin-bottom: 10px; letter-spacing: -0.5px;">INSPECT BLOCKED BY TARUN TIWARI</h1>
      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px;">
        Whoops! You opened Developer Tools / Inspect! To prevent cheating and protect our classified comedy algorithms, the website content is hidden.
      </p>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; text-align: left; background: #0f172a; padding: 14px 18px; border-radius: 14px; font-size: 13.5px; color: #94a3b8;">
        <div>👉 <strong>Close Inspect / DevTools</strong> to instantly restore the page.</div>
        <div>👉 Or toggle <strong>Developer Options</strong> in the top header if you have admin clearance.</div>
      </div>
      <button id="close-stealth-notice-btn" style="background: linear-gradient(135deg, #ef4444, #f43f5e); border: none; color: white; font-weight: 800; font-size: 14px; padding: 12px 26px; border-radius: 12px; cursor: pointer; transition: transform 0.15s ease;">
        Understood, I'll close Inspect! 🤡
      </button>
    </div>
  `;

  document.body.appendChild(overlayElement);

  const btn = document.getElementById('close-stealth-notice-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      // Gentle reminder
      alert("Please close Developer Tools / Inspect to view the app! 😂");
    });
  }
}

function removeStealthOverlay() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'visible';
    root.style.pointerEvents = 'auto';
  }

  if (overlayElement && overlayElement.parentNode) {
    overlayElement.parentNode.removeChild(overlayElement);
    overlayElement = null;
  }
}

/**
 * Initialize Anti-Inspect listeners across window and document
 */
export function initAntiInspect() {
  if (typeof window === 'undefined') return;

  isProtectionEnabled = getInspectProtection();

  // 1. Block Context Menu (Right Click)
  window.addEventListener('contextmenu', (e) => {
    if (!isProtectionEnabled) return;
    e.preventDefault();
    notifyAttempt('right_click');
    try {
      console.clear();
    } catch (err) {}
  });

  // 2. Block DevTools Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!isProtectionEnabled) return;

    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      notifyAttempt('f12');
      try {
        console.clear();
      } catch (err) {}
      return false;
    }

    // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C or Cmd+Option+I/J/C
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')
    ) {
      e.preventDefault();
      e.stopPropagation();
      notifyAttempt('devtools_keys');
      try {
        console.clear();
      } catch (err) {}
      return false;
    }

    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      notifyAttempt('view_source');
      try {
        console.clear();
      } catch (err) {}
      return false;
    }
  });

  // 3. Clear console periodically and silence messages
  setInterval(() => {
    if (!isProtectionEnabled) return;
    try {
      console.clear();
    } catch (e) {}
  }, 1500);

  // 4. DevTools Detection: Detect dock/undock size variance and elements inspect
  const checkDevTools = () => {
    if (!isProtectionEnabled) {
      if (overlayElement) removeStealthOverlay();
      return;
    }

    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        createStealthOverlay();
        notifyAttempt('devtools_open');
      }
    } else {
      if (devToolsOpen) {
        devToolsOpen = false;
        removeStealthOverlay();
      }
    }
  };

  window.addEventListener('resize', checkDevTools);
  setInterval(checkDevTools, 1000);
}
