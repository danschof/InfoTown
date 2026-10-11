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

/* Information World: zoom into your town, then go to Lesson 1 */
(function () {
  var svg = document.getElementById('worldmap');
  var link = document.getElementById('zoom');
  var you = document.getElementById('t-you');
  if (!svg || !link) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(e) {
    if (e) e.preventDefault();
    var href = link.getAttribute('href');
    if (reduce) { location.href = href; return; }
    var from = [0, 0, 1200, 660], to = [440, 230, 320, 176], t0 = null, dur = 1100;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), k = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      var v = from.map(function (f, i) { return f + (to[i] - f) * k; });
      svg.setAttribute('viewBox', v.join(' '));
      if (p < 1) requestAnimationFrame(step); else location.href = href;
    }
    requestAnimationFrame(step);
  }
  link.addEventListener('click', go);
  if (you) you.addEventListener('click', go);
})();

/* 4. Builder: reveal a scene step by step (Lesson 5: mobilise the site) */
(function () {
  var MSG = [
    'The towns are there. The project site is an empty plot. Your job: mobilise it.',
    'Site Office built, with the site cabins and the site apps next door. Empty, for now.',
    'Design line, client line and home line connected. Every town can reach the Site Office.',
    'Site apps plugged into the Site Office through the Underground. Out of sight, and automatic.',
    'Signposts up. Everyone knows where each kind of work goes.',
    'Gate set up: access given, and taken away again when people leave. Rex signs in.',
    'Every line tested, end to end. Mobilised! Information can flow from day one.'
  ];
  var NEXT = ['Start: build the Site Office →', 'Next: connect the towns →', 'Next: plug in the site apps →', 'Next: put up the signposts →', 'Next: set up the gate →', 'Next: test everything →', 'Done. Start again ↺'];
  document.querySelectorAll('.builder[data-target]').forEach(function (b) {
    var scene = document.getElementById(b.dataset.target); if (!scene) return;
    var parts = [].slice.call(scene.querySelectorAll('[data-step]'));
    var lis = [].slice.call(b.querySelectorAll('.bsteps li'));
    var next = b.querySelector('.bnext'), reset = b.querySelector('.breset'), msg = b.querySelector('.bmsg');
    var n = 0, max = lis.length;
    function show() {
      parts.forEach(function (p) { var on = +p.dataset.step <= n; p.classList.toggle('bhide', !on); });
      lis.forEach(function (li, k) { li.className = k < n ? 'done' : (k === n ? 'now' : ''); });
      msg.textContent = MSG[n] || ''; next.textContent = NEXT[n] || 'Next →';
      reset.hidden = n === 0 || n === max;
    }
    next.addEventListener('click', function () { n = n >= max ? 0 : n + 1; show(); });
    reset.addEventListener('click', function () { n = 0; show(); });
    show();
  });
})();
