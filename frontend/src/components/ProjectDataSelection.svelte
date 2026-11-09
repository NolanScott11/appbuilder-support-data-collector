<script lang="ts">
  import type { ProjectDataItemId, ProjectDataSelection } from "./projectData";
  import { projectDataItems } from "./projectData";
  import { m } from "../lib/paraglide/messages.js";
  import TopicAppIcon from "../lib/icons/TopicAppIcon.svelte";
  import TopicContentsIcon from "../lib/icons/TopicContentsIcon.svelte";
  import TopicImageIcon from "../lib/icons/TopicImageIcon.svelte";
  import TopicFormattingIcon from "../lib/icons/TopicFormattingIcon.svelte";
  import TopicFirebaseIcon from "../lib/icons/TopicFirebaseIcon.svelte";
  import TopicAnalyticsIcon from "../lib/icons/TopicAnalyticsIcon.svelte";
  import TopicIosIcon from "../lib/icons/TopicIosIcon.svelte";
  import TopicAndroidIcon from "../lib/icons/TopicAndroidIcon.svelte";
  import TopicDocumentsIcon from "../lib/icons/TopicDocumentsIcon.svelte";

  interface Props {
    projectName: string;
    selection: ProjectDataSelection;
    onSelectionChange: (id: ProjectDataItemId, selected: boolean) => void;
  }

  let { projectName, selection, onSelectionChange }: Props = $props();

  function itemTitle(id: ProjectDataItemId): string {
    switch (id) {
      case "projectConfiguration": return m.project_data_configuration_title();
      case "projectContent": return m.project_data_content_title();
      case "mediaResources": return m.project_data_media_title();
      case "customFiles": return m.project_data_custom_title();
      case "firebaseConfiguration": return m.project_data_firebase_title();
      case "analyticsConfiguration": return m.project_data_analytics_title();
      case "iosSigning": return m.project_data_ios_title();
      case "androidSigning": return m.project_data_android_title();
      case "buildDiagnostics": return m.project_data_build_title();
    }
  }

  function itemDescription(id: ProjectDataItemId): string {
    switch (id) {
      case "projectConfiguration": return m.project_data_configuration_description();
      case "projectContent": return m.project_data_content_description();
      case "mediaResources": return m.project_data_media_description();
      case "customFiles": return m.project_data_custom_description();
      case "firebaseConfiguration": return m.project_data_firebase_description();
      case "analyticsConfiguration": return m.project_data_analytics_description();
      case "iosSigning": return m.project_data_ios_description();
      case "androidSigning": return m.project_data_android_description();
      case "buildDiagnostics": return m.project_data_build_description();
    }
  }

  function sensitiveNote(id: ProjectDataItemId): string {
    switch (id) {
      case "projectConfiguration": return m.project_data_configuration_sensitive_note();
      case "projectContent": return m.project_data_content_sensitive_note();
      case "mediaResources": return "";
      case "customFiles": return "";
      case "firebaseConfiguration": return m.project_data_firebase_sensitive_note();
      case "analyticsConfiguration": return m.project_data_analytics_sensitive_note();
      case "iosSigning": return m.project_data_ios_sensitive_note();
      case "androidSigning": return "";
      case "buildDiagnostics": return "";
    }
  }
</script>

<fieldset>
  <legend class="sr-only">{m.project_data_legend()}</legend>
  <ul class="space-y-3">
    {#each projectDataItems as item (item.id)}
      <li>
        <div class="flex gap-3 rounded-box border border-base-300 bg-base-200 p-4">
          <input
            class="dy-checkbox dy-checkbox-primary mt-1"
            type="checkbox"
            checked={selection[item.id]}
            disabled={item.excluded}
            aria-label={m.project_data_include_aria({ name: itemTitle(item.id) })}
            onchange={(event) => onSelectionChange(item.id, event.currentTarget.checked)}
          />
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-2 font-medium">
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center text-base-content/70 [&>svg]:h-8 [&>svg]:w-8"
                aria-hidden="true"
              >
                {#if item.id === "projectConfiguration"}
                  <TopicAppIcon />
                {:else if item.id === "projectContent"}
                  <TopicContentsIcon />
                {:else if item.id === "mediaResources"}
                  <TopicImageIcon />
                {:else if item.id === "customFiles"}
                  <TopicFormattingIcon />
                {:else if item.id === "firebaseConfiguration"}
                  <TopicFirebaseIcon />
                {:else if item.id === "analyticsConfiguration"}
                  <TopicAnalyticsIcon />
                {:else if item.id === "iosSigning"}
                  <TopicIosIcon />
                {:else if item.id === "androidSigning"}
                  <TopicAndroidIcon />
                {:else}
                  <TopicDocumentsIcon />
                {/if}
              </span>
              {itemTitle(item.id)}
              {#if item.excluded}
                <span class="dy-badge dy-badge-ghost dy-badge-sm">{m.project_data_excluded()}</span>
              {:else if selection[item.id]}
                <span class="dy-badge dy-badge-primary dy-badge-sm">{m.project_data_included()}</span>
              {:else}
                <span class="dy-badge dy-badge-ghost dy-badge-sm">{m.project_data_not_included()}</span>
              {/if}
              {#if !item.excluded}
                <span class="dy-badge dy-badge-outline dy-badge-sm">{m.project_data_requested_by_support()}</span>
              {/if}
            </span>
            <span class="mt-1 block text-sm text-base-content/70">{itemDescription(item.id)}</span>
            <code class="mt-2 block break-all text-sm">{item.fileName(projectName)}</code>
            {#if sensitiveNote(item.id)}
              <span class="mt-2 block text-sm text-warning">
                {m.project_data_sensitive_prefix()} {sensitiveNote(item.id)}
              </span>
            {/if}
          </span>
        </div>
      </li>
    {/each}
  </ul>
</fieldset>
