// Claude RTL Extension — content.js

function isHebrewDominant(text) {
  const h = (text.match(/[\u05D0-\u05EA\uFB1D-\uFB4E]/g) || []).length;
  const l = (text.match(/[a-zA-Z]/g) || []).length;
  return h > 3 && h >= l;
}

function applyRTL(el) {
  if (el.classList.contains('rtl-claude-msg')) return;
  if (isHebrewDominant(el.innerText || el.textContent || '')) {
    el.classList.add('rtl-claude-msg');
  }
}

function fixEditorParagraphs() {
  document.querySelectorAll('div[contenteditable="true"]').forEach(editor => {
    editor.style.direction = 'rtl';
    editor.style.textAlign = 'right';
    editor.style.unicodeBidi = 'plaintext';
    editor.querySelectorAll('p').forEach(p => {
      p.style.direction = 'rtl';
      p.style.textAlign = 'right';
      p.style.unicodeBidi = 'plaintext';
    });
  });
}

function processAll() {
  document.querySelectorAll('.font-claude-response-body, .font-claude-message').forEach(applyRTL);
  fixEditorParagraphs();
}

processAll();

const observer = new MutationObserver(() => {
  clearTimeout(window._rtlTimer);
  window._rtlTimer = setTimeout(processAll, 300);
});

observer.observe(document.body, { childList: true, subtree: true });
