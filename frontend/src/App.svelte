<script lang="ts">
  import Wizard from "./wizard/Wizard.svelte";
  import { pages } from "./upload/pages";

  async function close(): Promise<void> {
    const { Window } = await import("@wailsio/runtime");
    Window.Close();
  }
</script>

<Wizard {pages} onfinish={close} oncancel={close} />
