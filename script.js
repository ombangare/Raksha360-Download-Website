// Raksha360 Download Website - Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  const officialHash = 'bd2b74d3beeb62873952010102240a5efca91eb61485d04aca06c75348e29865';

  // Copy SHA-256 Checksum
  const copyBtn = document.getElementById('copyHashBtn');
  const copyToast = document.getElementById('copyToast');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(officialHash);
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied to clipboard!
        `;
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => copyToast.classList.remove('show'), 3000);
        }
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Hash
          `;
        }, 2500);
      } catch (err) {
        console.error('Failed to copy hash: ', err);
      }
    });
  }

  // Client-Side In-Browser SHA-256 APK Checksum Verifier
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('apkFileInput');
  const verifyProgress = document.getElementById('verifyProgress');
  const verifyResult = document.getElementById('verifyResult');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileVerification(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileVerification(e.target.files[0]);
      }
    });
  }

  async function handleFileVerification(file) {
    if (!verifyResult || !verifyProgress) return;

    verifyProgress.style.display = 'block';
    verifyResult.innerHTML = '';
    verifyResult.className = 'verify-result-card';

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();

      verifyProgress.style.display = 'none';

      const isMatch = computedHash === officialHash.toLowerCase();

      if (isMatch) {
        verifyResult.className = 'verify-result-card verify-success';
        verifyResult.innerHTML = `
          <div class="result-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="result-text">
            <strong>Authentic Release Verified (Match confirmed!)</strong>
            <p>Calculated SHA-256 matches the official signed Raksha360 release build exactly.</p>
            <span class="hash-code">${computedHash}</span>
          </div>
        `;
      } else {
        verifyResult.className = 'verify-result-card verify-mismatch';
        verifyResult.innerHTML = `
          <div class="result-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div class="result-text">
            <strong>Checksum Mismatch Warning</strong>
            <p>The calculated hash does not match the official release build. Please re-download the APK from the official link.</p>
            <span class="hash-code">Calculated: ${computedHash}</span>
            <span class="hash-code">Expected:   ${officialHash}</span>
          </div>
        `;
      }
    } catch (err) {
      verifyProgress.style.display = 'none';
      verifyResult.className = 'verify-result-card verify-mismatch';
      verifyResult.innerHTML = `<p>Error computing checksum: ${err.message}</p>`;
    }
  }

  // Download Click Feedback
  const dlButtons = document.querySelectorAll('.btn-download');
  dlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Initiating Raksha360 v1.0 release APK download.');
    });
  });
});
