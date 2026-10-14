<script lang="ts">
  import { upload } from "../state.svelte";

  export function canBack(): boolean {
    return false;
  }

  export function canCancel(): boolean {
    return false;
  }
</script>

<div class="mb-5">
  <h2 class="text-lg font-semibold">Uploading Support Data</h2>
  <p class="mt-1 text-sm text-base-content/70">
    Please wait while your app project data is uploaded
  </p>
</div>

<section class="rounded-box border border-base-300 bg-base-200 p-4">
  <h3 class="mb-3 text-sm font-semibold">Upload Progress</h3>
  <textarea
    class="dy-textarea h-48 w-full font-mono text-sm leading-6"
    readonly
    aria-label="Upload progress log"
  >{`Preparing ${upload.project?.name ?? " project"}...
appDef.json
config/settings.json
project/data/project.db
project/images/icon.png
support/logs/app.log
`}</textarea>
</section>
