<script lang="ts">
  import { upload } from "../state.svelte";

  export function canBack(): boolean {
    return false;
  }

  export function canCancel(): boolean {
    return false;
  }
</script>

<p>The support data for <strong>{upload.project?.name}</strong> has been uploaded.</p>
