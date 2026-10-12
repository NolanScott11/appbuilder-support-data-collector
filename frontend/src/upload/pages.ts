import type { WizardPageDef } from "../wizard/types";
import ProjectPage from "./pages/ProjectPage.svelte";
import UploadPage from "./pages/UploadPage.svelte";
import CompletePage from "./pages/CompletePage.svelte";

/** The pages of the upload wizard, in order. */
export const pages: WizardPageDef[] = [
  {
    id: "project",
    title: "Project",
    subtitle: "Check the project and where its support data will be sent",
    component: ProjectPage,
  },
  {
    id: "upload",
    title: "Upload",
    subtitle: "Send the project's support data to the support system",
    component: UploadPage,
  },
  {
    id: "complete",
    title: "Upload Complete",
    subtitle: "The support data has been sent",
    component: CompletePage,
  },
];
