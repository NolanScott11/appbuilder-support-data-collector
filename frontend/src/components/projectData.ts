export type ProjectDataItemId =
  | "projectConfiguration"
  | "projectContent"
  | "mediaResources"
  | "customFiles"
  | "firebaseConfiguration"
  | "analyticsConfiguration"
  | "iosSigning"
  | "androidSigning"
  | "buildDiagnostics";

export type ProjectDataSelection = Record<ProjectDataItemId, boolean>;

export interface ProjectDataItem {
  id: ProjectDataItemId;
  title: string;
  description: string;
  sensitiveNote?: string;
  excluded?: boolean;
  fileName(projectName: string): string;
}

/** MVP project data categories requested for support investigations. */
export const projectDataItems: ProjectDataItem[] = [
  {
    id: "projectConfiguration",
    title: "Project configuration",
    description: "The App Builder project definition.",
    sensitiveNote: "May contain service configuration or integration details.",
    fileName: (projectName) => `${projectName}.appDef`,
  },
  {
    id: "projectContent",
    title: "Project content",
    description: "The files in the project's content folder.",
    sensitiveNote: "May contain unpublished or otherwise sensitive project content.",
    fileName: () => "project_data/",
  },
  {
    id: "mediaResources",
    title: "Media and other project resources",
    description: "Images, audio, video, and other resources referenced by the project.",
    fileName: () => "project_media/",
  },
  {
    id: "customFiles",
    title: "Custom files and extensions",
    description: "Custom scripts, styles, templates, and other project-specific files and extensions.",
    fileName: () => "custom_files/",
  },
  {
    id: "firebaseConfiguration",
    title: "Firebase configuration",
    description: "Firebase configuration files for applicable platforms.",
    sensitiveNote: "May contain Firebase service configuration.",
    fileName: () => "firebase/",
  },
  {
    id: "analyticsConfiguration",
    title: "Analytics configuration",
    description: "Analytics service configuration and API keys, where applicable.",
    sensitiveNote: "May contain analytics API keys or service configuration.",
    fileName: () => "analytics/",
  },
  {
    id: "iosSigning",
    title: "iOS signing configuration",
    description: "Provisioning profiles and other relevant iOS signing files.",
    sensitiveNote: "May contain iOS signing credentials.",
    fileName: () => "ios_signing/",
  },
  {
    id: "androidSigning",
    title: "Android signing credentials",
    description: "Android keystores and passwords are not collected.",
    excluded: true,
    fileName: () => "Not collected",
  },
  {
    id: "buildDiagnostics",
    title: "Build and diagnostic information",
    description: "Build logs, error output, tool versions, and other diagnostic data.",
    fileName: () => "build_diagnostics/",
  },
];

export function getSelectedProjectDataItems(
  selection: ProjectDataSelection,
): ProjectDataItem[] {
  return projectDataItems.filter((item) => !item.excluded && selection[item.id]);
}
