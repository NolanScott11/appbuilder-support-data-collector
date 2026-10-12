<script lang="ts">
  import { Window } from "@wailsio/runtime";
  import Wizard from "./wizard/Wizard.svelte";
  import { pages } from "./upload/pages";

  function close(): void {
    Window.Close();
  }
</script>

<Wizard {pages} onfinish={close} oncancel={close} />
