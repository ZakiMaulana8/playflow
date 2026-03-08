"use client";

import { motion, Variants } from "framer-motion";

export function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 mesh-gradient">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="text-center max-w-4xl mx-auto space-y-6 z-10"
            >
                <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
                    PlayFlow <span className="text-primary italic">Gallery</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                    Curated chaos & good vibes only. Your daily dose of visual rhythm.
                </motion.p>

                <motion.div variants={itemVariants} className="pt-8 relative inline-block">
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            scale: { type: "spring", stiffness: 400, damping: 10 },
                            rotate: { duration: 0.4, ease: "easeInOut" }
                        }}
                        className="group relative inline-flex items-center justify-center bg-primary text-white text-lg font-bold px-10 py-5 rounded-full shadow-2xl shadow-primary/40"
                    >
                        <span>Start Exploring</span>
                        <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 z-10"
            >
                <motion.span
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="material-symbols-outlined text-3xl block"
                >
                    expand_more
                </motion.span>
            </motion.div>
        </section>
    );
}
