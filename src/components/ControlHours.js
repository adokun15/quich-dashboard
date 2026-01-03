//Controle House
"use client";
import { useState } from "react";

const initialHours = [
  { day: "Monday", open: "09:00", close: "17:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
  { day: "Thursday", open: "09:00", close: "17:00", closed: false },
  { day: "Friday", open: "09:00", close: "16:00", closed: false },
  { day: "Saturday", open: "", close: "", closed: true },
  { day: "Sunday", open: "", close: "", closed: true },
];

export default function OpeningHours() {
  const [hours, setHours] = useState(initialHours);
  const [editingDay, setEditingDay] = useState(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const updateTime = (index, field, value) => {
    setHours((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const toggleClosed = (index) => {
    setHours((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, closed: !item.closed } : item
      )
    );
  };

  return (
    <div className="w-[340px] rounded-2xl bg-white p-5 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold">Opening hours</h3>

      <div className="space-y-2">
        {hours.map((item, index) => {
          const isToday = item.day === today;
          const isEditing = editingDay === index;

          return (
            <div
              key={item.day}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm
                ${isToday ? "bg-indigo-50 font-medium" : ""}
              `}
            >
              <span>{item.day}</span>

              {!isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    {item.closed ? "Closed" : `${item.open} – ${item.close}`}
                  </span>

                  <button
                    onClick={() => setEditingDay(index)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {!item.closed && (
                    <>
                      <input
                        type="time"
                        value={item.open}
                        onChange={(e) =>
                          updateTime(index, "open", e.target.value)
                        }
                        className="rounded-md border px-2 py-1 text-xs"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={item.close}
                        onChange={(e) =>
                          updateTime(index, "close", e.target.value)
                        }
                        className="rounded-md border px-2 py-1 text-xs"
                      />
                    </>
                  )}

                  <button
                    onClick={() => toggleClosed(index)}
                    className="rounded-md border px-2 py-1 text-xs"
                  >
                    {item.closed ? "Open" : "Close"}
                  </button>

                  <button
                    onClick={() => setEditingDay(null)}
                    className="text-green-600 text-xs font-medium"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  TimeInput } from "@/components/input";
import { Select } from "@/components/select";

export default function ControlHours(){
    return <Card className="space-y-6">
          
          <div className="my-4">
            <p className="font-medium text-4 ">Opening & closing hours</p>
            <Select />
          </div>

          <div className="flex flex-wrap gap-4">
            <article>
              <p>Monday</p>
              <TimeInput />
            </article>

            <article>
              <p>Tuesday</p>
              <TimeInput />
            </article>
            <article>
              <p>Wednesday</p>
              <TimeInput />
            </article>
            <article>
              <p>Thursday</p>
              <TimeInput />
            </article>
            <article>
              <p>Friday</p>
                <TimeInput />
              </article>
              <article>
                <p>Saturday</p>
                <TimeInput />
              </article>
              <article>
                <p>Sunday</p>
                <TimeInput />
              </article>
            </div>
            <button>Save</button>
          </Card>

}*/
