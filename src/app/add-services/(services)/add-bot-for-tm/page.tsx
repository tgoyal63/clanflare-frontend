
import AddBotToServer from "@/components/shared/AddBotToServer";

export default function Page() {
  return (
    <div className="grid h-full place-items-center">
      <AddBotToServer redirectLoaction="/add-services/add-bot-for-tm/select-roles" />
    </div>
  );
}
