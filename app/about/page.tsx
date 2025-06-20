import { getDevelopers, getManagers } from "../lib/models";
import UserTable from "../components/UserTable";
import { switchUserActiveStatus } from "@/app/lib/models";
import { users } from "../db/schema";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function About() {
  async function handleSwitch(id: number) {
    "use server";
    await switchUserActiveStatus(id);
    revalidatePath("/about");
  }

  const managers: (typeof users.$inferSelect)[] = await getManagers();
  const developers: (typeof users.$inferSelect)[] = await getDevelopers();

  return (
    <>
      <UserTable title="Managers" userList={managers} action={handleSwitch} />
      <UserTable
        title="Developers"
        userList={developers}
        action={handleSwitch}
      />
    </>
  );
}
