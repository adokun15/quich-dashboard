//Temporary alert modal
"use client";
export default function ToasterMessage() {
  return (
    <div className="relative w-full h-full ">
      <div
        className="fixed top-4 bg-white shadow px-2 w-[18rem] py-2  rounded 
      right-4  "
      >
        <h3 className="text-base font-medium">Toaster title</h3>
        <p className="text-muted text-balance w-full pl-1">
          Toaster asdada adasd a adiaidja in aidniasn ian ida d adia dinadiandia
          ndnsdiadin message
        </p>
      </div>
    </div>
  );
}
