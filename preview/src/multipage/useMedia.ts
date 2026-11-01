import { useSyncExternalStore } from "react";

/** Where the header trades its menus for the phone drawer, as in website.css. */
export const drawerQuery = "(max-width: 1050px)";

type MediaStore = {
  subscribe: (change: () => void) => () => void;
  matches: () => boolean;
};

// One MediaQueryList per query, however many components read it.
const stores = new Map<string, MediaStore>();

function storeFor(query: string) {
  let store = stores.get(query);
  if (!store) {
    const media = window.matchMedia(query);
    store = {
      subscribe: (change) => {
        media.addEventListener("change", change);
        return () => media.removeEventListener("change", change);
      },
      matches: () => media.matches,
    };
    stores.set(query, store);
  }
  return store;
}

/** Whether a media query matches, kept current; the prerender has no screen, so it reads false. */
export function useMedia(query: string) {
  const store = storeFor(query);
  return useSyncExternalStore(store.subscribe, store.matches, () => false);
}
