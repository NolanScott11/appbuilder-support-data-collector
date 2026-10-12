import { getContext, setContext } from "svelte";

/** Wizard actions that a page can trigger itself. */
export interface WizardController {
  /**
   * Moves straight to the next page without calling the page's `onNext()`,
   * e.g. when an upload finishes.
   */
  moveToNextPage(): void;
}

const key = Symbol("wizard");

export function setWizard(controller: WizardController): void {
  setContext(key, controller);
}

/** Call during a page component's setup to get the wizard it is shown in. */
export function getWizard(): WizardController {
  return getContext<WizardController>(key);
}
