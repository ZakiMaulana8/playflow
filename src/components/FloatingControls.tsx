"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";
import { NowPlaying } from "./NowPlaying";

export function FloatingControls() {
    const [gravityMode, setGravityMode] = useState(false);
    const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                className="fixed bottom-8 right-8 z-50 hidden md:block"
            >
                <button
                    onClick={() => setIsNowPlayingOpen(true)}
                    className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full pl-4 pr-6 py-3 shadow-2xl hover:scale-105 transition-transform group"
                >
                    <div className="relative flex items-center justify-center w-8 h-8">
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                        <span className="material-symbols-outlined text-primary group-hover:animate-pulse">equalizer</span>
                    </div>

                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Now Playing</span>
                        <span className="text-sm font-bold">Lo-Fi Beats to Flow</span>
                    </div>
                </button>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                className="fixed bottom-8 left-8 z-50 hidden md:block"
            >
                <button
                    onClick={() => setGravityMode(!gravityMode)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-3 rounded-full shadow-xl border transition-all hover:scale-105 active:scale-95 group",
                        gravityMode
                            ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(238,91,43,0.5)]"
                            : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 animate-[float-gentle_3s_ease-in-out_infinite]"
                    )}
                >
                    <span className={clsx("material-symbols-outlined transition-colors", gravityMode ? "text-white" : "text-primary group-hover:text-primary")}>
                        blur_on
                    </span>
                    <span className="text-sm font-bold">Gravity Mode</span>
                </button>
            </motion.div>
            <NowPlaying isOpen={isNowPlayingOpen} onClose={() => setIsNowPlayingOpen(false)} />
        </>
    );
}
