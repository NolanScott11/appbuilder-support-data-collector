<script lang="ts">
  import type { ProjectDataItemId, ProjectDataSelection } from "./projectData";
  import { projectDataItems } from "./projectData";
  import { m } from "../lib/paraglide/messages.js";

  const itemMessages = {
    projectConfiguration: {
      title: () => m.project_configuration_title(),
      description: () => m.project_configuration_description(),
      sensitiveNote: () => m.project_configuration_sensitive_note(),
    },
    projectContent: {
      title: () => m.project_content_title(),
      description: () => m.project_content_description(),
      sensitiveNote: () => m.project_content_sensitive_note(),
    },
  } satisfies Record<
    ProjectDataItemId,
    {
      title: () => string;
      description: () => string;
      sensitiveNote: () => string;
    }
  >;

  interface Props {
    projectName: string;
    selection: ProjectDataSelection;
    onSelectionChange: (id: ProjectDataItemId, selected: boolean) => void;
  }

  let { projectName, selection, onSelectionChange }: Props = $props();
</script>

<fieldset>
  <legend class="sr-only">{m.support_data_legend()}</legend>
  <ul class="space-y-3">
    {#each projectDataItems as item (item.id)}
      <li>
        <div class="flex gap-3 rounded-box border border-base-300 bg-base-200 p-4">
          <input
            class="dy-checkbox dy-checkbox-primary mt-1"
            type="checkbox"
            checked={selection[item.id]}
            aria-label={m.support_data_include_item({ name: itemMessages[item.id].title() })}
            onchange={(event) => onSelectionChange(item.id, event.currentTarget.checked)}
          />
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-2 font-medium">
              {itemMessages[item.id].title()}
              {#if selection[item.id]}
                <span class="dy-badge dy-badge-primary dy-badge-sm">{m.support_data_included()}</span>
              {:else}
                <span class="dy-badge dy-badge-ghost dy-badge-sm">{m.support_data_not_included()}</span>
              {/if}
              <span class="dy-badge dy-badge-outline dy-badge-sm">{m.support_data_requested_by_support()}</span>
            </span>
            <span class="mt-1 block text-sm text-base-content/70">{itemMessages[item.id].description()}</span>
            <code class="mt-2 block break-all text-sm">{item.fileName(projectName)}</code>
            <span class="mt-2 block text-sm text-warning">
              {m.support_data_sensitive_data({ note: itemMessages[item.id].sensitiveNote() })}
            </span>
          </span>
        </div>
      </li>
    {/each}
  </ul>
</fieldset>
