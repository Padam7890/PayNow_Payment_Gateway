import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import SidebarHeader from "../../shadeUI/blocks/Dashboard/logo&notification";
import Sidebar from "../../shadeUI/blocks/Dashboard/menuItem";
import MobileMenu from "../../shadeUI/blocks/Dashboard/mobilemenu";
import { menuItems } from "./config/menuItem";
import { profileItems } from "./config/profileItem";
import { SocketProvider } from "../contexts/SocketContent";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const notificationUrl = "notifications"

  return (
    <SocketProvider userId={session?.user?.id}>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden  border-r bg-muted/40 md:block">
        <div className="flex fixed h-full max-h-screen flex-col gap-2">
          <SidebarHeader notificationUrl={notificationUrl} userId={session?.user?.id} logoName = {"PaY Now"} />
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Sidebar menuItems = {menuItems} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <MobileMenu
          menuItems={menuItems}
          profileMenuItems={session ? profileItems : []}
        />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
    </SocketProvider>

  );
}
