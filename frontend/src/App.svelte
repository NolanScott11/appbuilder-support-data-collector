<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Events, WML } from "@wailsio/runtime";
  import { GreetService } from "../bindings/github.com/sillsdev/appbuilder-support-data-collector";

  const wailsVersion = __WAILS_VERSION__;

  let name: string = $state("");
  let time: string = $state("Listening for Time event...");

  // The framework word in the heading ("Wails + Svelte") crossfades to the
  // name the user entered when they press Greet.
  let titleName: string = $state("Svelte");

  // The reply from Go, shown in an auto-dismissing toast.
  let toastMessage: string = $state("");
  let toastTimer: ReturnType<typeof setTimeout>;

  onMount(() => {
    Events.On("time", (v: any) => {
      // On a narrow screen the full RFC1123 stamp is too wide for the footer, so
      // show just the clock time there (matching Tailwind's `sm` breakpoint).
      const full = v.data;
      const compact = (full.match(/\d{1,2}:\d{2}:\d{2}/) || [full])[0];
      time = window.matchMedia("(width < 40rem)").matches ? compact : full;
    });
    // Wire up data-wml-openURL links (logos + footer "Docs" link).
    WML.Reload();
  });

  function showToast(message: string): void {
    toastMessage = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastMessage = ""), 4000);
  }

  const doGreet = (): void => {
    let n = name || "anonymous";
    titleName = n;
    GreetService.Greet(n).then(showToast).catch(console.error);
  };
</script>

<div
  class="flex min-h-dvh flex-col pt-10 pr-10 pl-10 sm:pl-16"
>
  <main
    class="flex w-full max-w-[540px] flex-1 flex-col items-center justify-center text-center max-sm:mx-auto sm:items-start sm:text-left"
  >
    <header class="mb-10 flex items-center gap-4">
      <span
        class="inline-flex cursor-pointer transition hover:-translate-y-0.5 hover:drop-shadow-lg [--wails-draggable:no-drag]"
        data-wml-openURL="https://v3.wails.io"
      >
        <img src="/wails.png" class="h-16 w-auto" alt="Wails logo" />
      </span>
      <span
        class="inline-flex cursor-pointer transition hover:-translate-y-0.5 hover:drop-shadow-lg [--wails-draggable:no-drag]"
        data-wml-openURL="https://svelte.dev"
      >
        <img src="/svelte.svg" class="h-13 w-auto" alt="Svelte logo" />
      </span>
    </header>

    <h1
      class="mb-4 text-[clamp(2.5rem,7.5vw,3.7rem)] leading-[1.05] font-extrabold tracking-tight break-words"
    >
      <span
        class="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent max-sm:block"
        >Wails +</span
      >
      <!-- Old and new names share one grid cell so they crossfade in place. -->
      <span class="inline-grid">
        {#key titleName}
          <span
            class="col-start-1 row-start-1"
            in:fly={{ y: "0.3em", duration: 600 }}
            out:fly={{ y: "-0.3em", duration: 600 }}>{titleName}</span
          >
        {/key}
      </span>
    </h1>
    <p
      class="mb-16 max-w-lg text-[clamp(1.05rem,2.9vw,1.2rem)] leading-relaxed text-base-content/70"
    >
      Build beautiful cross-platform apps with Go and Svelte.
    </p>

    <div class="dy-join w-[86%] sm:w-[62%]">
      <label class="dy-input dy-join-item grow">
        <svg
          class="h-5 w-5 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle
            cx="12"
            cy="7"
            r="4"
          /></svg
        >
        <!-- Kept at 16px: WKWebView zooms on focus for inputs smaller than that. -->
        <input
          aria-label="input"
          class="grow text-base"
          bind:value={name}
          type="text"
          placeholder="Your name"
          autocomplete="off"
        />
      </label>
      <button
        aria-label="greet-btn"
        class="dy-btn dy-btn-primary dy-join-item"
        onclick={doGreet}
        >Greet
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ><line x1="5" y1="12" x2="19" y2="12" /><polyline
            points="12 5 19 12 12 19"
          /></svg
        >
      </button>
    </div>
  </main>

  <footer
    class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-1 border-t border-base-300 py-3 pr-2 text-[11px] text-base-content/70 sm:text-[12.5px]"
  >
    <span class="justify-self-start whitespace-nowrap">{wailsVersion}</span>
    <span class="inline-flex items-center gap-1.5 justify-self-center">
      <svg
        class="h-3.5 w-3.5 sm:h-5 sm:w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        ><circle cx="12" cy="12" r="10" /><polyline
          points="12 6 12 12 16 14"
        /></svg
      >
      <span>{time}</span>
    </span>
    <a
      class="dy-link dy-link-hover inline-flex items-center gap-1 justify-self-end whitespace-nowrap hover:text-base-content"
      data-wml-openURL="https://v3.wails.io"
      aria-label="Wails documentation"
      >Docs
      <svg
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        ><line x1="7" y1="17" x2="17" y2="7" /><polyline
          points="7 7 17 7 17 17"
        /></svg
      >
    </a>
  </footer>
</div>

<div class="dy-toast dy-toast-top dy-toast-end z-20" role="status" aria-live="polite">
  {#if toastMessage}
    <div
      class="dy-alert flex max-w-[min(86vw,420px)] flex-col items-start gap-0.5 shadow-xl"
      transition:fly={{ y: -16, duration: 300 }}
    >
      <span
        class="text-[10.5px] font-bold tracking-widest text-base-content/60 uppercase"
        >From Go</span
      >
      <span aria-label="result">{toastMessage}</span>
    </div>
  {/if}
</div>
