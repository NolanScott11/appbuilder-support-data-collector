<!--
  Multi-page wizard: a title band at the top, the current page in the middle
  and Back / Next / Cancel buttons at the bottom.

  See types.ts for how pages are described and how a page component can
  control the buttons.
-->
<script lang="ts">
  import { setWizard } from "./context";
  import type { WizardPageDef, WizardPageHooks } from "./types";

  interface Props {
    pages: WizardPageDef[];
    /** Called when Next is clicked on the last page. */
    onfinish: () => void;
    /** Called when Cancel is clicked and the page allows it. */
    oncancel: () => void;
  }

  let { pages, onfinish, oncancel }: Props = $props();

  /** Index of the nearest page from `start` (inclusive) moving by `step` that is shown, or -1. */
  function findShownPage(start: number, step: 1 | -1): number {
    for (let i = start; i >= 0 && i < pages.length; i += step) {
      if (pages[i].isShown?.() ?? true) {
        return i;
      }
    }
    return -1;
  }

  let index = $state(findShownPage(0, 1));
  let page = $derived(pages[index]);

  // The current page component's exported functions.
  let hooks: WizardPageHooks | undefined = $state();

  // True while an async onNext() is running.
  let busy = $state(false);

  let previousIndex = $derived(findShownPage(index - 1, -1));
  let nextIndex = $derived(findShownPage(index + 1, 1));
  let isLastPage = $derived(nextIndex === -1);

  let canBack = $derived(!busy && previousIndex !== -1 && (hooks?.canBack?.() ?? true));
  let canNext = $derived(!busy && (hooks?.canNext?.() ?? true));
  let canCancel = $derived(hooks?.canCancel?.() ?? true);
  let nextCaption = $derived(hooks?.nextCaption?.() ?? (isLastPage ? "Finish" : "Next"));

  function goNext(): void {
    if (isLastPage) {
      onfinish();
    } else {
      index = nextIndex;
    }
  }

  async function onNextClick(): Promise<void> {
    busy = true;
    try {
      if ((await hooks?.onNext?.()) ?? true) {
        goNext();
      }
    } finally {
      busy = false;
    }
  }

  function onBackClick(): void {
    if (hooks?.onBack?.() ?? true) {
      index = previousIndex;
    }
  }

  function onCancelClick(): void {
    if (hooks?.onCancel?.() ?? true) {
      oncancel();
    }
  }

  setWizard({ moveToNextPage: goNext });
</script>

<div class="flex h-dvh flex-col bg-base-100">
  <header class="border-b border-base-300 bg-base-200 px-4 py-3">
    <h1 class="font-semibold">{page.title}</h1>
    {#if page.subtitle}
      <p class="text-sm text-base-content/70">{page.subtitle}</p>
    {/if}
  </header>

  <main class="flex-1 overflow-y-auto px-6 py-5">
    <!-- Changing the component recreates the page, so its setup code runs each time it is shown. -->
    <page.component bind:this={hooks} />
  </main>

  <footer class="flex justify-end gap-2 px-4 py-3">
    <button class="dy-btn dy-btn-sm" disabled={!canBack} onclick={onBackClick}>Back</button>
    <button class="dy-btn dy-btn-sm dy-btn-primary" disabled={!canNext} onclick={onNextClick}>
      {#if busy}<span class="dy-loading dy-loading-spinner dy-loading-xs"></span>{/if}
      {nextCaption}
    </button>
    <button class="dy-btn dy-btn-sm" disabled={!canCancel} onclick={onCancelClick}>Cancel</button>
  </footer>
</div>
