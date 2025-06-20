import { revalidatePath } from "next/cache";
import UserTable from "../components/UserTable";
import { getUsers, switchUserActiveStatus } from "../lib/models";

export const revalidate = 0;

export default async function Admin() {
  async function handleSwitch(id: number) {
    "use server";
    await switchUserActiveStatus(id);
    revalidatePath(window.location.pathname);
  }

  const users = await getUsers();

  return (
    <>
      <UserTable title="Users" userList={users} action={handleSwitch} />
    </>
  );
}
