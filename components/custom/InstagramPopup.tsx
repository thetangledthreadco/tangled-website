"use client";

import { useEffect, useRef, useState } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "ttc_ig_popup_seen";
const INSTAGRAM_HANDLE = "the.tangled.thread.co";
const INSTAGRAM_DEEP_LINK = `instagram://user?username=${INSTAGRAM_HANDLE}`;
const INSTAGRAM_WEB_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// While the form box is in the viewport, fire if this many milliseconds go by
// with no click/key/input inside the form box. Any of those events resets it.
const IDLE_TRIGGER_MS = 10_000;

// The form box has to be in view for at least this long before we consider it
// "visited" — prevents a quick scroll past the form on the way to the footer
// from triggering the "visited then scrolled away" rule.
const VISIT_DWELL_MS = 3_000;

// The popup is armed/disarmed by the visibility of this element — the white
// form box in app/custom/page.tsx.
const FORM_BOX_ID = "order-form-box";

// Any element with this data attribute (or inside one) signals "the user is
// committing to checkout; never interrupt them." Currently the cart's
// "Place order →" button and the review step's "Submit Order" button.
const ORDER_COMMIT_ATTR = "data-order-commit";

const DEEP_LINK_FALLBACK_MS = 1500;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isMobileUserAgent(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// On mobile: try the Instagram app first via its custom URL scheme, and if the
// page is still visible after a short window (meaning no app grabbed us), fall
// back to the web URL. On desktop: just open the web URL in a new tab.
function openInstagram() {
  if (!isMobileUserAgent()) {
    window.open(INSTAGRAM_WEB_URL, "_blank", "noopener,noreferrer");
    return;
  }

  let appOpened = false;
  const onVisibility = () => {
    if (document.hidden) appOpened = true;
  };
  document.addEventListener("visibilitychange", onVisibility);

  // Kick off the deep link.
  window.location.href = INSTAGRAM_DEEP_LINK;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibility);
    if (!appOpened && !document.hidden) {
      window.location.href = INSTAGRAM_WEB_URL;
    }
  }, DEEP_LINK_FALLBACK_MS);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function InstagramPopup() {
  const [open, setOpen] = useState(false);
  // `entered` drives the mount transition — we flip it one frame after mount
  // so the initial classes animate in from their "hidden" state.
  const [entered, setEntered] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trigger logic — two independent fire conditions, one hard kill switch.
  //
  //  Fire (A): Form in viewport, no click/key/input inside it for 10s.
  //  Fire (B): Form was in view ≥ 3s (dwell confirms "visited") and then
  //            scrolled out. Brief scroll-pasts don't count.
  //  Kill switch: Any click on a [data-order-commit] element — the cart's
  //            "Place order" button and the review step's "Submit Order"
  //            button — permanently tears the whole thing down.
  //
  // Never shows if sessionStorage already has the "seen" flag.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // sessionStorage can throw in private modes — proceed without it.
    }

    const formBox = document.getElementById(FORM_BOX_ID);
    if (!formBox) return;

    let fired = false;
    let suppressed = false;
    let formInView = false;
    let visited = false;
    let idleTimerId: number | null = null;
    let dwellTimerId: number | null = null;

    const trigger = () => {
      if (fired || suppressed) return;
      fired = true;
      teardown();
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setOpen(true);
    };

    const clearIdle = () => {
      if (idleTimerId !== null) {
        window.clearTimeout(idleTimerId);
        idleTimerId = null;
      }
    };

    const clearDwell = () => {
      if (dwellTimerId !== null) {
        window.clearTimeout(dwellTimerId);
        dwellTimerId = null;
      }
    };

    // (Re)start the 10s idle countdown. No-op if the form isn't in view or
    // the popup is otherwise dead.
    const armIdle = () => {
      clearIdle();
      if (suppressed || fired || !formInView) return;
      idleTimerId = window.setTimeout(trigger, IDLE_TRIGGER_MS);
    };

    const onFormEnter = () => {
      if (formInView) return;
      formInView = true;
      // Start the idle clock.
      armIdle();
      // And the "visited" dwell clock — only counts as visited if they stay.
      clearDwell();
      if (!visited) {
        dwellTimerId = window.setTimeout(() => {
          visited = true;
        }, VISIT_DWELL_MS);
      }
    };

    const onFormLeave = () => {
      if (!formInView) return;
      formInView = false;
      clearIdle();
      clearDwell();
      // Fire (B): visited the form, then left. A quick scroll past (dwell
      // timer never completed) doesn't count.
      if (visited) trigger();
    };

    // Any interaction inside the form box resets the idle timer. Covers:
    //   click   — selecting item types, pressing Next/Back, etc.
    //   keydown — tabbing, typing
    //   input   — text fields
    //   change  — selects, file inputs
    const onFormInteraction = () => {
      if (!formInView) return;
      armIdle();
    };

    // Delegated click handler for the hard kill switch. Captures so it runs
    // before any other handlers have a chance to race us into firing.
    const onCommitClick = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest(`[${ORDER_COMMIT_ATTR}]`)) {
        suppressed = true;
        teardown();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onFormEnter();
          else onFormLeave();
        }
      },
      { threshold: 0 }
    );
    io.observe(formBox);

    formBox.addEventListener("click", onFormInteraction);
    formBox.addEventListener("keydown", onFormInteraction);
    formBox.addEventListener("input", onFormInteraction);
    formBox.addEventListener("change", onFormInteraction);
    document.addEventListener("click", onCommitClick, true);

    const teardown = () => {
      clearIdle();
      clearDwell();
      io.disconnect();
      formBox.removeEventListener("click", onFormInteraction);
      formBox.removeEventListener("keydown", onFormInteraction);
      formBox.removeEventListener("input", onFormInteraction);
      formBox.removeEventListener("change", onFormInteraction);
      document.removeEventListener("click", onCommitClick, true);
    };

    return teardown;
  }, []);

  // Fade/slide in on open, Escape to close, restore focus on unmount.
  useEffect(() => {
    if (!open) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      setEntered(true);
      closeButtonRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      prevActive?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const handleViewDesigns = () => {
    openInstagram();
    setOpen(false);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`
        fixed inset-0 z-[60] flex items-end sm:items-center justify-center
        bg-brown/30 backdrop-blur-[2px]
        px-0 sm:px-6
        transition-opacity duration-300 ease-out
        ${entered ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ig-popup-title"
        aria-describedby="ig-popup-body"
        className={`
          relative w-full sm:max-w-md
          bg-warm-white border border-border
          rounded-t-2xl sm:rounded-2xl
          shadow-xl
          px-7 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10
          transition-all duration-300 ease-out
          ${entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
        `}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 text-muted hover:text-brown transition-colors cursor-pointer rounded"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-3">
          Instagram
        </p>
        <h2
          id="ig-popup-title"
          className="font-serif text-2xl sm:text-3xl text-brown font-light mb-3"
        >
          Not sure yet?
        </h2>
        <p
          id="ig-popup-body"
          className="font-sans text-sm text-muted leading-relaxed mb-6"
        >
          Follow along on Instagram for design inspo and real custom orders.
        </p>

        <button
          type="button"
          onClick={handleViewDesigns}
          className="
            w-full inline-flex items-center justify-center
            px-6 py-3 bg-rose text-warm-white
            font-sans font-medium text-sm tracking-wide
            rounded hover:bg-rose-dark transition-colors cursor-pointer
          "
        >
          View designs
        </button>
      </div>
    </div>
  );
}
