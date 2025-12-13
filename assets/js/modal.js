// assets/js/modal.js
export function ensureModal() {
  let modal = document.getElementById("tgModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "tgModal";
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999; display: none;
    background: rgba(0,0,0,.55); padding: 16px;
  `;
  modal.innerHTML = `
    <div id="tgModalCard" role="dialog" aria-modal="true"
      style="max-width: 520px; margin: 10vh auto; border-radius: 16px; background: #0b1220; color: #eaf0ff;
      padding: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.5); border: 1px solid rgba(255,255,255,.08)">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <div id="tgModalTitle" style="font-weight:700; font-size:16px; line-height:1.2;">Title</div>
          <div id="tgModalSubtitle" style="opacity:.75; margin-top:4px; font-size:12px;">Subtitle</div>
        </div>
        <button id="tgModalClose" aria-label="Close"
          style="background: transparent; border: 1px solid rgba(255,255,255,.16); color:#eaf0ff;
          border-radius: 10px; padding: 6px 10px; cursor:pointer;">✕</button>
      </div>
      <div id="tgModalBody" style="margin-top:12px; font-size:13px; line-height:1.5;"></div>

      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:16px;">
        <button id="tgModalSecondary"
          style="background: transparent; border: 1px solid rgba(255,255,255,.16); color:#eaf0ff;
          border-radius: 12px; padding: 10px 12px; cursor:pointer;">Close</button>
        <a id="tgModalPrimary" href="#"
          style="text-decoration:none; background: #3b82f6; color:#071021; font-weight:700;
          border-radius: 12px; padding: 10px 12px; display:inline-block;">Continue</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => (modal.style.display = "none");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  modal.querySelector("#tgModalClose").addEventListener("click", close);
  modal.querySelector("#tgModalSecondary").addEventListener("click", close);

  return modal;
}

export function openModal({ title, subtitle, bodyHtml, primaryLabel, primaryHref }) {
  const modal = ensureModal();
  modal.querySelector("#tgModalTitle").textContent = title || "Coming soon";
  modal.querySelector("#tgModalSubtitle").textContent = subtitle || "";
  modal.querySelector("#tgModalBody").innerHTML = bodyHtml || "";

  const primary = modal.querySelector("#tgModalPrimary");
  primary.textContent = primaryLabel || "OK";
  primary.href = primaryHref || "#";

  modal.style.display = "block";
}
