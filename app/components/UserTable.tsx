"use client"

import { users } from "@/app/db/schema";

export default function UserTable({ title, userList , action}: { title: string, userList: typeof users.$inferSelect[], action: (id: number) => Promise<void> }) {

    return (    

        <div>
            <h1 className="text-3xl font-bold text-black dark:text-white text-center">{title}</h1>
            <div className="w-1/2 mx-auto">
                <table className="w-full table-auto">
                    <thead className="border-b border-slate-200 bg-slate-100 text-sm font-medium text-slate-600 dark:bg-slate-100   ">
                        <tr>
                            <th className="p-3 text-start font-medium">
                                ID
                            </th>
                            <th className="p-3 text-start font-medium">
                                First Name
                            </th>
                            <th className="p-3 text-start font-medium">
                                Last Name
                            </th>
                            <th className="p-3 text-start font-medium">
                                Employed
                            </th>
                            <th className="p-3 text-start font-medium">
                                Date
                            </th>
                            <th className="p-3 text-start font-medium">
                                Active
                            </th>
                            <th className="p-3 text-start font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className=" text-slate-800 dark:text-white">
                        {userList.map((user) => (
                            <tr key={user.id} className="border-b border-slate-200 last:border-0">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.firstname}</td>
                                <td className="p-3">{user.lastname}</td>
                                <td className="p-3">{user.employed}</td>
                                <td className="p-3" suppressHydrationWarning>{user.updatedAt?.toLocaleString()}</td>
                                <td className={`p-3 transition-colors duration-300 ${user.active ? "text-green-500" : "text-red-500"}`}>{user.active ? "Yes" : "No"}</td>
                                <td className="p-3">
                                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-indigo-600 hover:cursor-pointer"
                                            onClick={() => action(user.id)}>
                                        &#128259; {user.active ? "active" : "inactive"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )   
}