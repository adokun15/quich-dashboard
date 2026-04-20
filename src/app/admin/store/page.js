import ManageStore from "@/components/ManageStore";
/*
What i notice while editing?
- max stock by a single user;
- conditions: Cart must be more than 5k ?

*/

//Fetch Store Settings Here;

//Client;
export default async function Store() {
  return (
    <main className="relative max-w-4xl mx-auto space-y-3">
      <ManageStore />
    </main>
  );
}
