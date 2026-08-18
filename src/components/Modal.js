//Create a modal!
"use client";
/*

*/

export default function Modal({ children, show }) {
  return (
    <main className={`relative ${show ? "block" : "hidden"}`}>
      {/* OverLAY */}
      <div className="z-20 fixed w-full h-full blur-2xl bg-[rgba(0,00,0,0.4)]" />

      {/* children */}
      <div className="z-50 fixed w-full flex flex-col justify-center">
        <div>{children}</div>
      </div>
    </main>
  );
}
