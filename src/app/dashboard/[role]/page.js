"use client"
import Admin from "@/components/Admin";
import Agent from "@/components/Agent";
import Customer from "@/components/Customer";
import Manager from "@/components/Manager";
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

