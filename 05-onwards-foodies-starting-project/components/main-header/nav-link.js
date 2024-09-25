'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
    const [isMounted, setIsMounted] = useState(false);
    const path = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // ou um estado de carregamento, se preferir
    }

    return (
        <li>
            <Link
                href={href}
                className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
            >
                {children}
            </Link>
        </li>
    );
}
