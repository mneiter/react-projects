"use client";

import { TaskManager } from "../../components/TaskManager";
// import { useAuthStore } from "@/store/useAuthStore";
// import { useRouter } from "next/navigation";

export default function TasksPage() {
  // const { isLoggedIn, isClient } = useAuthStore();
  // const router = useRouter();

  // // Only check login after client is mounted
  // useEffect(() => {
  //   if (isClient && !isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, [isLoggedIn, isClient, router]);

  // // Don't render anything until we know if we're logged in
  // if (!isClient) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskManager />
    </div>
  );
}
