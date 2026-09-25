/**
 * ModelSlot — the interactive 3D Voyager model, loaded on demand.
 *
 * Three.js is the largest download on the site (~0.25 MB compressed). On
 * wide screens the model loads automatically; on phones, tablets or with
 * the browser's data-saver setting it waits until the visitor asks for it.
 * Must be rendered inside <ClientOnly> (uses window).
 */

import { Suspense, lazy, useState } from 'react';
import { useI18n } from '../i18n/context';

const Voyager3D = lazy(() => import('./Voyager3D'));

function autoLoad(): boolean {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !saveData && window.matchMedia('(min-width: 1024px)').matches;
}

export default function ModelSlot() {
  const { locale } = useI18n();
  const [show, setShow] = useState(autoLoad);

  if (show) {
    return (
      <Suspense fallback={null}>
        <Voyager3D />
      </Suspense>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="max-w-xs text-sm text-slate-300">
        {locale === 'zh-TW'
          ? '可旋轉的航海家太空船 3D 模型（約 0.25 MB 下載）。'
          : locale === 'es'
            ? 'Un modelo 3D giratorio de la nave Voyager (unos 0,25 MB de descarga).'
            : 'A rotatable 3D model of the Voyager spacecraft (about 0.25 MB to download).'}
      </p>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="min-h-[44px] rounded-xl border border-cyan-500/50 bg-space-900/80 px-5 text-sm font-semibold text-cyan-200 hover:border-cyan-300 hover:text-white"
      >
        {locale === 'zh-TW' ? '載入 3D 模型' : locale === 'es' ? 'Cargar el modelo 3D' : 'Load 3D model'}
      </button>
    </div>
  );
}
