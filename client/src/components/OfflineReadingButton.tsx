import { useEffect, useState } from "react";
import { Download, Check, Loader2, WifiOff } from "lucide-react";

/**
 * Lets readers save the full Theory of Everything for offline reading.
 *
 * Messages the service worker (sw.js, CACHE_TOE) to download the ~4MB document
 * and its search index into a dedicated, persistent cache. Once saved, the SW
 * serves /toe-full.html cache-first so the Read page works with no connection.
 */

type State = "checking" | "idle" | "saving" | "saved" | "error" | "unsupported";

function messageSW<T>(message: object): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!("serviceWorker" in navigator)) {
      reject(new Error("no-sw"));
      return;
    }
    navigator.serviceWorker.ready
      .then((registration) => {
        const target = navigator.serviceWorker.controller ?? registration.active;
        if (!target) {
          reject(new Error("no-controller"));
          return;
        }
        const channel = new MessageChannel();
        channel.port1.onmessage = (e) => resolve(e.data as T);
        target.postMessage(message, [channel.port2]);
      })
      .catch(reject);
  });
}

export function OfflineReadingButton() {
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      setState("unsupported");
      return;
    }
    let active = true;
    messageSW<{ cached: boolean }>({ type: "CHECK_TOE_CACHE" })
      .then((res) => {
        if (active) setState(res.cached ? "saved" : "idle");
      })
      .catch(() => {
        if (active) setState("idle");
      });
    return () => {
      active = false;
    };
  }, []);

  const save = () => {
    setState("saving");
    messageSW<{ success: boolean }>({ type: "CACHE_TOE" })
      .then((res) => setState(res.success ? "saved" : "error"))
      .catch(() => setState("error"));
  };

  if (state === "unsupported" || state === "checking") return null;

  if (state === "saved") {
    return (
      <span className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 font-medium">
        <Check className="w-5 h-5" />
        Available offline
      </span>
    );
  }

  return (
    <button
      onClick={save}
      disabled={state === "saving"}
      className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/30 rounded-xl text-violet-300 font-medium transition-all disabled:opacity-70 disabled:cursor-wait"
      aria-label="Save the Theory of Everything for offline reading"
    >
      {state === "saving" ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Saving for offline…
        </>
      ) : state === "error" ? (
        <>
          <WifiOff className="w-5 h-5" />
          Retry offline save
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Save for offline reading
        </>
      )}
    </button>
  );
}
