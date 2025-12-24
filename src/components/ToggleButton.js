"use client";
export function ToggleButton({ cn, defaultState = false }) {
  const detectState = function (ev) {
    //Bubble request back up!
    const current = e.currentTarget.checked;
    cn(current);
  };

  return (
    <label class=" inline-flex cursor-pointer rounded-base">
      <input
        defaultChecked={defaultState}
        onClick={detectState}
        type="checkbox"
        value=""
        class="sr-only peer"
      />
      <div
        class="
      shrink-0 relative w-7 h-5 bg-primary700 
      peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary 
      dark:peer-focus:ring-primary rounded-full 
      
      after:content-[''] after:absolute after:top-0.5 
      after:start-0.5 after:bg-background after:rounded-full after:h-4 
      after:w-4 after:transition-all peer-checked:after:translate-x-full 
    
      rtl:peer-checked:after:-translate-x-full  
      peer-checked:bg-primary peer-checked:peer-focus:ring-offset-1
      "
      ></div>
    </label>
  );
}
