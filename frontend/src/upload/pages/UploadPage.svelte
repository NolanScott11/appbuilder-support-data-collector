<script lang="ts">
  import { upload } from "../state.svelte";

  export function canNext(): boolean {
    return upload.accessGranted;
  }

  function getAccess(): void {
    upload.accessGranted = true;
  }
</script>

<div class="mb-5">
  <h2 class="text-lg font-semibold">Get Access</h2>
  <p class="mt-1 text-sm text-base-content/70">
    Confirm the upload location and request access before continuing.
  </p>
</div>

<fieldset class="dy-fieldset">
  <legend class="dy-fieldset-legend">Upload Location</legend>
  <input
    class="dy-input w-full text-base"
    type="url"
    value={upload.uploadUrl}
    readonly
    aria-label="Upload location"
  />
</fieldset>

<section class="mt-5 rounded-box border border-base-300 bg-base-200 p-4">
  <h3 class="text-sm font-semibold">Access Status</h3>
  {#if upload.accessGranted}
    <p class="mt-2 text-sm text-success">
      Mock access granted for this demonstration. No external access request was made.
    </p>
  {:else}
    <p class="mt-2 text-sm text-base-content/70">
      Access has not been granted yet. Use Get Access to continue the mockup flow.
    </p>
    <button class="dy-btn dy-btn-sm dy-btn-primary mt-4" onclick={getAccess}>Get Access</button>
  {/if}
</section>
