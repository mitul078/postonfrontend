"use client"
import Admin from "@/components/admin/Admin";
import Agent from "@/components/agent/Agent";
import Customer from "@/components/customer/Customer";
import Manager from "@/components/manager/Manager";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRolePage({ params }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading]);

    if (loading || !user) return null;
    const rolePanel = () => {
        switch (user.role) {
            case 'admin': return <Admin />;
            case 'manager': return <Manager />
            case 'customer': return <Customer />
            case 'agent': return <Agent />
        }
    }

    return (
        <>
            {rolePanel()}
        </>
    )
}

