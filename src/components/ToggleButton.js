export function ToggleButton() {
  return (
    <label class=" inline-flex cursor-pointer p-4 rounded-base">
      <input type="checkbox" value="" class=" peer" />
      <div
        class="shrink-0 relative w-fit h-5 bg-neutral-quaternary 
      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft 
      dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full 
      rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] 
      after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 
      after:w-4 after:transition-all peer-checked:bg-brand"
      ></div>
    </label>
  );
}
