import { useState, useEffect } from 'react';

export function useRoute() {
  const [route, setRoute] = useState(() => (window.location.hash || "#/").slice(2) || "");
  useEffect(() => {
    const onHash = () => setRoute((window.location.hash || "#/").slice(2) || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function navigate(path) {
  window.location.hash = "#/" + path;
  window.scrollTo({ top: 0, behavior: "instant" });
}
