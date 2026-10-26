/**
 * Makes Paraglide's locale reactive. Paraglide normally keeps the locale in a
 * plain variable, so Svelte can't tell when it changes and $derived values
 * that call m.*() or getLocale() keep their old text. Keeping it in $state
 * instead means anything that reads it updates when setLocale() is called.
 *
 * Import this module before any other code calls getLocale() or m.*().
 */
import {
  baseLocale,
  overwriteGetLocale,
  overwriteSetLocale,
  type Locale,
} from "./paraglide/runtime.js";

let current = $state<Locale>(baseLocale);

overwriteGetLocale(() => current);
overwriteSetLocale((newLocale) => {
  current = newLocale;
  document.documentElement.lang = newLocale;
});
