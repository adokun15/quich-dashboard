"use client";
export function ToggleButton({ cn, field_name = "", defaultState = false }) {
  const detectState = function (e) {
    //Bubble request back up!
    const current = e.currentTarget.checked;
    const field = e.target?.dataset?.field_name;
    cn({ field, state: current });
  };

  return (
    <label className="inline-flex cursor-pointer rounded">
      <input
        defaultChecked={defaultState}
        onClick={detectState}
        type="checkbox"
        data-field_name={field_name}
        value=""
        className="sr-only peer"
      />
      <div
        className="
      shrink-0 relative w-9 h-5 bg-gray-200 
      peer-focus:outline-none rounded-xl 
      transition duration-800 ease-in-out shadow-2xl

      after:content-[''] after:absolute after:top-0.5 
      after:start-0.5 after:bg-gray-400 after:rounded-full after:h-4 
      after:w-5 after:transition-all peer-checked:after:bg-gray-100 peer-checked:after:translate-x-full 
    
      rtl:peer-checked:after:-translate-x-full  
      peer-checked:bg-primary z-1 
      "
      ></div>
    </label>
  );
}
