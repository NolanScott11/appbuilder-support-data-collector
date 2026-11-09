<script lang="ts">
  import ProjectDataSelection from "../../components/ProjectDataSelection.svelte";
  import type { ProjectDataItemId } from "../../components/projectData";
  import { m } from "../../lib/paraglide/messages.js";
  import { upload } from "../state.svelte";

  function setSelected(id: ProjectDataItemId, selected: boolean): void {
    upload.selectedProjectData[id] = selected;
  }
</script>

<div class="mb-5">
  <h2 class="text-lg font-semibold">{m.support_data_heading()}</h2>
  <p class="mt-1 text-sm text-base-content/70">{m.support_data_description()}</p>
</div>

{#if upload.project}
  <ProjectDataSelection
    projectName={upload.project.name}
    selection={upload.selectedProjectData}
    onSelectionChange={setSelected}
  />
{/if}

<p class="mt-4 text-sm text-base-content/70">
  {m.support_data_footer()}
</p>
