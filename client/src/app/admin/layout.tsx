"use client";
import AdminSidebar from "@/components/shared/sidebars/AdminSidebar";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
  const user = useUserStore((s) => s.user);
  const router = useRouter();
    useEffect(() => {
        if (!user || user.userType !== "seller") {
            // Redirect to login if not authenticated
            router.push("/");
        }
    }, [user]);
    return (
        <div className="flex w-full">
            <AdminSidebar />
            {children}
        </div>
    )
}

export default Layout