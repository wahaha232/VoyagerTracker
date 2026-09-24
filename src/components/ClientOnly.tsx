/**
 * ClientOnly — renders children only after mount in the browser.
 *
 * Used for WebGL/canvas widgets and anything that depends on the visitor's
 * clock or local storage, so the build-time prerendered HTML stays
 * deterministic and never contains misleading "frozen" values.
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export default function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
