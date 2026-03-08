"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navigation() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 z-50 w-[90%] max-w-[600px]"
        >
            <div className="glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-primary/5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                    <span className="font-bold tracking-tight hidden sm:block">PlayFlow</span>
                </div>

                <div className="flex items-center gap-6">
                    <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Home</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Gallery</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Playlist</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">About</a>
                </div>

                <div className="flex gap-2">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            <span className="material-symbols-outlined text-sm">
                                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                    )}
                    <button className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-sm">search</span>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
