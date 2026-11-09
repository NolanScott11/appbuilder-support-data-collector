export type ProjectDataItemId = "projectConfiguration" | "projectContent";

export type ProjectDataSelection = Record<ProjectDataItemId, boolean>;

export interface ProjectDataItem {
  id: ProjectDataItemId;
  fileName(projectName: string): string;
}

/** MVP project data categories requested for support investigations. */
export const projectDataItems: ProjectDataItem[] = [
  {
    id: "projectConfiguration",
    fileName: (projectName) => `${projectName}.appDef`,
  },
  {
    id: "projectContent",
    fileName: () => "project_data/",
  },
];

export function getSelectedProjectDataItems(
  selection: ProjectDataSelection,
): ProjectDataItem[] {
  return projectDataItems.filter((item) => selection[item.id]);
}
