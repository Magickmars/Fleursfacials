// Subtle animated noise overlay (safe for sandbox/cross-origin)
(function() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  function genNoise() {
    if (!ctx) return;
    let imageData = ctx.createImageData(width, height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let shade = Math.floor(Math.random() * 32 + 112);
      data[i] = shade;
      data[i+1] = shade;
      data[i+2] = shade;
      data[i+3] = 16;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(genNoise);
  }
  genNoise();
})();

// AOS animations (check for AOS)
if (window.AOS && typeof AOS.init === "function") {
  AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
}

// Smooth scroll to anchor if URL contains a hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 300); // delay helps AOS & layout settle before scrolling
    }
  }
});



// Ripple effect for CTA (robust, prevents double span, supports multiple buttons)
function enableCTARipple() {
  document.querySelectorAll(".cta-btn").forEach(btn => {
    btn.addEventListener("click", function(e){
      // Remove any old ripple
      let oldRipple = this.querySelector(".cta-ripple");
      if (oldRipple) oldRipple.remove();
      // Create new ripple
      let ripple = document.createElement("span");
      ripple.className = "cta-ripple";
      this.appendChild(ripple);
      let size = Math.max(this.offsetWidth, this.offsetHeight);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.offsetX - size/2) + "px";
      ripple.style.top = (e.offsetY - size/2) + "px";
      // Remove ripple after animation
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
// Ensure ripple works even if CTA is added after DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enableCTARipple);
} else {
  enableCTARipple();
}