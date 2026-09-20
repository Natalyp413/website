/* ==========================================================================
   Laredo Mobile Media, LLC — landing page behaviour
   No dependencies. Everything degrades gracefully if JS is unavailable.
   ========================================================================== */
(function () {
  'use strict';

  /* ⚠️ Where the quote form sends to. Keep in sync with the mailto: links in index.html. */
  var CONTACT_EMAIL = 'laredomobilemedia@gmail.com';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Seamless marquee ----------
     The CSS loop translates the track by -50%, so it needs exactly two
     identical groups side by side. */
  var track = document.getElementById('marqueeTrack');
  if (track && track.children.length === 1) {
    track.appendChild(track.firstElementChild.cloneNode(true));
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(entry.target.parentElement.children);
        var index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(index, 5) * 80 + 'ms';
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Gallery lightbox ---------- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var box = document.getElementById('lightbox');

  if (shots.length && box) {
    var boxImg = document.getElementById('lightboxImg');
    var boxCap = document.getElementById('lightboxCap');
    var btnClose = document.getElementById('lightboxClose');
    var btnPrev = document.getElementById('lightboxPrev');
    var btnNext = document.getElementById('lightboxNext');
    var current = 0;
    var lastFocused = null;

    var show = function (i) {
      current = (i + shots.length) % shots.length;
      var shot = shots[current];
      var img = shot.querySelector('img');
      boxImg.src = shot.dataset.src || img.src;
      boxImg.alt = img.alt || '';
      boxCap.textContent = shot.dataset.caption || '';
    };

    var open = function (i) {
      lastFocused = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      btnClose.focus();
    };

    var close = function () {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      var finish = function () {
        box.hidden = true;
        boxImg.src = '';
      };
      if (reduceMotion) finish();
      else window.setTimeout(finish, 250);
      if (lastFocused) lastFocused.focus();
    };

    shots.forEach(function (shot, i) {
      shot.addEventListener('click', function () { open(i); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });

    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'Tab') {
        /* keep focus inside the dialog */
        var focusables = [btnClose, btnPrev, btnNext];
        var pos = focusables.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? pos - 1 : pos + 1;
        focusables[(next + focusables.length) % focusables.length].focus();
      }
    });
  }

  /* ---------- Quote form ----------
     Composes a pre-filled email so the page stays fully static.
     See README.md to swap this for Formspree / Netlify Forms. */
  var form = document.getElementById('quoteForm');
  var note = document.getElementById('quoteNote');

  if (form && note) {
    var defaultNote = note.textContent;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var invalid = null;
      form.querySelectorAll('[required]').forEach(function (input) {
        var ok = input.value.trim() !== '';
        input.closest('.field').classList.toggle('is-invalid', !ok);
        if (!ok && !invalid) invalid = input;
      });

      var email = form.elements.email;
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.closest('.field').classList.add('is-invalid');
        if (!invalid) invalid = email;
      }

      if (invalid) {
        note.textContent = 'Please check the highlighted fields.';
        note.className = 'quote__note is-error';
        invalid.focus();
        return;
      }

      var get = function (name) {
        var el = form.elements[name];
        return el && el.value.trim() ? el.value.trim() : '—';
      };

      var body = [
        'Name: ' + get('name'),
        'Company: ' + get('company'),
        'Phone: ' + get('phone'),
        'Email: ' + get('email'),
        'Dates needed: ' + get('dates'),
        'Location: ' + get('location'),
        '',
        'What goes on the screen:',
        get('message')
      ].join('\n');

      var subject = 'LED billboard quote request — ' + get('name');

      note.textContent = 'Opening your email app…';
      note.className = 'quote__note is-ok';

      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.setTimeout(function () {
        note.textContent = defaultNote;
        note.className = 'quote__note';
      }, 6000);
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });
  }
})();
