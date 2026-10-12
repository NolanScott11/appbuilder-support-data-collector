<!--
  First page: shows the project that will be uploaded and asks where to send it.
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { Dialogs } from "@wailsio/runtime";
  import { ProjectService } from "../../../bindings/github.com/sillsdev/appbuilder-support-data-collector";
  import { upload } from "../state.svelte";
  import { formatBytes, formatDateTime } from "../format";

  const UPLOAD_URL_PLACEHOLDER = "https://support.example.org/upload";

  let loading = $state(false);
  let error = $state("");

  async function loadProject(folder: string): Promise<void> {
    loading = true;
    error = "";
    try {
      upload.project = await ProjectService.GetProjectInfo(folder);
    } catch (e) {
      upload.project = undefined;
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  }

  async function chooseFolder(): Promise<void> {
    const folder = await Dialogs.OpenFile({
      Title: "Choose the project folder",
      CanChooseDirectories: true,
      CanChooseFiles: false,
    });
    if (folder) {
      await loadProject(folder);
    }
  }

  onMount(async () => {
    // Load the project passed on the command line, unless it was loaded
    // when this page was shown before.
    if (!upload.project) {
      const folder = await ProjectService.GetStartupFolder();
      if (folder) {
        await loadProject(folder);
      }
    }
  });

  export function canNext(): boolean {
    return upload.project !== undefined && upload.uploadUrl.trim() !== "";
  }
</script>

<p class="mb-3">Upload support data for this project?</p>

<div class="rounded-box border border-base-300 bg-base-200 p-4 text-sm">
  {#if upload.project}
    <dl class="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-1">
      <dt class="text-base-content/70">Project Name</dt>
      <dd>{upload.project.name}</dd>
      <dt class="text-base-content/70">Folder</dt>
      <dd class="break-all">{upload.project.folder}</dd>
      <dt class="text-base-content/70">Last Modified</dt>
      <dd>{formatDateTime(upload.project.lastModified)}</dd>
      <dt class="text-base-content/70">Folder Size</dt>
      <dd>{formatBytes(upload.project.folderSize)}</dd>
    </dl>
  {:else if loading}
    <span class="dy-loading dy-loading-spinner dy-loading-sm"></span>
  {:else}
    <div class="flex items-center justify-between gap-4">
      <p class={error ? "text-error" : ""}>{error || "No project folder was given."}</p>
      <button class="dy-btn dy-btn-sm" onclick={chooseFolder}>Choose Folder…</button>
    </div>
  {/if}
</div>

<fieldset class="dy-fieldset mt-4">
  <legend class="dy-fieldset-legend">Upload Location</legend>
  <!-- Kept at 16px: WKWebView zooms on focus for inputs smaller than that. -->
  <input
    class="dy-input w-full text-base"
    type="url"
    bind:value={upload.uploadUrl}
    placeholder={UPLOAD_URL_PLACEHOLDER}
    autocomplete="off"
  />
</fieldset>
