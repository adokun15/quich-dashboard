import Card from "@/components/card";
import { TextInput } from "@/components/input";

export default function WhatsappCommunity() {
  return (
    <Card className="p-6 w-full">
      {/* Header */}
      <div className="space-y-1">
        <p className="font-semibold text-base text-gray-900">
          WhatsApp Community
        </p>
        <p className="text-sm text-gray-500">
          Add a community link so customers can interact with you
        </p>
      </div>

      <div className="mt-4 max-w-full flex gap-x-3 ">
        <input className="" placeholder="Store Community" />
      </div>
    </Card>
  );
}
