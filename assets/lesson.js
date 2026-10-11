/* InfoTown — shared lesson behaviour
   1. Route/layer toggles:   <div class="controls" data-target="sceneId"><button data-mode="both|x">
   2. Clickable explainers:  <button class="fld" data-k="key"> + <script type="application/json" id="fields">
   3. Reduced motion:        pauses SMIL animation in every svg.scene */
(function () {
  // 1. Toggles
  document.querySelectorAll('.controls[data-target]').forEach(function (group) {
    var scene = document.getElementById(group.dataset.target);
    if (!scene) return;
    var buttons = [].slice.call(group.querySelectorAll('button[data-mode]'));
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.dataset.mode;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        scene.querySelectorAll('.layer[data-layer]').forEach(function (l) {
          var on = mode === 'both' || l.dataset.layer.split(' ').indexOf(mode) > -1;
          l.style.opacity = on ? '' : '0.12';
        });
      });
    });
  });

  // 2. Explainers
  var dataEl = document.getElementById('fields');
  if (dataEl) {
    var F = {};
    try { F = JSON.parse(dataEl.textContent); } catch (e) {}
    var fields = [].slice.call(document.querySelectorAll('.fld[data-k]'));
    var out = { q: 'x-q', plain: 'x-plain', on: 'x-on', im: 'x-im', why: 'x-why' };
    var show = function (k) {
      var d = F[k]; if (!d) return;
      Object.keys(out).forEach(function (p) {
        var el = document.getElementById(out[p]);
        if (el && d[p] != null) el.textContent = d[p];
      });
      fields.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === k)); });
      document.querySelectorAll('[data-hl]').forEach(function (el) { el.classList.toggle('hl', el.dataset.hl === k); });
    };
    fields.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.k); }); });
    document.querySelectorAll('[data-hl]').forEach(function (el) {
      el.addEventListener('click', function () { show(el.dataset.hl); });
    });
    var start = fields.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || fields[0];
    if (start) show(start.dataset.k);
  }

  // 3. Reduced motion
  var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var scenes = [].slice.call(document.querySelectorAll('svg.scene'));
  var motion = function () {
    scenes.forEach(function (s) {
      try {
        if (mq && mq.matches) { s.pauseAnimations(); s.setCurrentTime(2.4); }
        else { s.unpauseAnimations(); }
      } catch (e) {}
    });
  };
  motion();
  if (mq && mq.addEventListener) mq.addEventListener('change', motion);
})();
