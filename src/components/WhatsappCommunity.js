import Card from "@/components/card";
import { TextInput } from "@/components/input";

export default function WhatsappCommunity() {
  return (
    <Card className="p-6 max-w-md">
      {/* Header */}
      <div className="space-y-1">
        <p className="font-semibold text-base text-gray-900">
          WhatsApp Community
        </p>
        <p className="text-sm text-gray-500">
          Add a community link so customers can interact with you
        </p>
      </div>

      {/* Input */}
      <div className="mt-4">
        <TextInput
          placeholder="https://chat.whatsapp.com/..."
          className="w-full"
        />
      </div>

      {/* Action */}
      <div className="mt-5 flex justify-end">
        <button
          className="
            inline-flex items-center justify-center
            rounded-lg px-4 py-2
            text-sm font-medium
            bg-black text-white
            hover:bg-gray-800
            focus:outline-none focus:ring-2 focus:ring-black/20
            disabled:opacity-50
          "
        >
          Save
        </button>
      </div>
    </Card>
  );
}
