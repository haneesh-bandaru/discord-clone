import { db } from "@/lib/db";
import { intialprofile } from "@/lib/intial-profile";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/intial-modal";

const SetupPage = async () => {
  const profile = await intialprofile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
