<script lang="ts">
  // TODO: Zip the project folder and upload it to upload.uploadUrl, showing a
  // <progress class="dy-progress"> bar while it runs. While uploading:
  //   - export canBack() and canNext() returning false
  //   - export onCancel() to stop the upload
  //   - call getWizard().moveToNextPage() (from ../../wizard/context) when it finishes
  import { upload } from "../state.svelte";
</script>

<p>
  Ready to upload <strong>{upload.project?.name}</strong> to
  <span class="break-all">{upload.uploadUrl}</span>.
</p>
<p class="mt-2 text-sm text-base-content/60">Uploading is not implemented yet.</p>
