"use client";

import { motion } from "framer-motion";

const cards = [
    {
        id: 1,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwFCAJ3SUKEl7TVEO0Zt3Na4iTm5Xuu9FcesE71MbAK7cNhrtwgRdqEk-QHxZXSBb0A81QAwnSAx2RU07fk9FiWB_aPXIjmUA5DXkaG32vZ4n_OdcsOVrtYfc_YmAfQj3SNW591hD0jT5EOjxF-98F3HLNE73PA7NgW-W8bNjSif03dk2NGM_V8_WW7-3VUvEDkzFu77lNKRf1U6ukiXrZVrEiuBNbBDlXGMKFoue__CSQigEgrQFpzYa6sEjw0Qy21qE1T1f39rQ",
        title: "Monday Mood",
        stat: "2.4k",
        rotate: "rotate-1",
        hoverRotate: "hover:-rotate-1"
    },
    {
        id: 2,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcFfARkVAGl-tAenVPVgyeHhPnZa71SFacoiP2EWmFCNFSLpylwd8VJHf7n6E_KcfLZzKTyGAO_8GNULkGtITwB7rIjSS9bKqD_GaxbEh_d2QASkvwywYrF2U8mhbQESrdO3ht-pgr6YWJbsMEY84yLVDaZn4WbbppeHBVoIsR5CHUheN1lIh_-h-FlNCNzloDWqNlO_yaeYtTgZ3B6wDKd_hNjuOCsK4J8TvXMdNNsAGY8k0PoKyNMu7X9yIwgIfXfyFAllfrCTg",
        title: "Coolest in Town",
        stat: "Curated by @vibes",
        rotate: "-rotate-2",
        hoverRotate: "hover:rotate-1"
    },
    {
        id: 3,
        type: "quote",
        content: "\"If you're not vibing, what are you doing?\"",
        rotate: "rotate-2",
        hoverRotate: "hover:-rotate-1"
    },
    {
        id: 4,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBOP8Hk46H4aUYmJUU6KrMQ1ix-KMhHBmwT3QP4Gvx9D8NYkopN-ncA3375zrNDy8iAClujPxHIhp1pitQGlmZcPMtBWt_5DpLU8Z3p9WWhTGhCYEr3vQFfL1FC_3khK9mz44Q11fKSOzEFeLWkv8DGUxhZdRS4p8nS_H-6Fr5t6A5lQ5uX_QODVc62OWuBj1nb7lxpjkOM7zgBZvqfelVG7C7_xKyjVrxqpD5x6FcLd_jCMnG3CHUvyCuPF2klPCtiP7zzdpmFL0",
        title: "Gimme that!",
        actionBtn: "share",
        rotate: "-rotate-1",
        hoverRotate: "hover:rotate-2"
    },
    {
        id: 5,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-PJU57sMxPLjPMejBTa-7nGj7pRi9hr2HEE3b1D4m9d1YMzvlmYnjGEHvJubk5B8nZO-rPYQchx7iMQy5Ub0ZldBBe2hMQ2pXuZu91_cqxfm8zAc1ksC6IyMjm-4tx3G1kQwQQ14I8IppuuNGnep8J0baHlH6ZlHEP_GIPVEnOatff3qe31teos1W5C4zLS3FG24w4NSRCrdOJnU1UYNiPNvw16Cgv_lYER_9ozq8dQAS8mNtByjEfvSA_a5ftQ0V8TAgWlAIabQ",
        title: "Street Dreams",
        overlay: true,
        rotate: "rotate-1",
        hoverRotate: "hover:-rotate-2"
    },
    {
        id: 6,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiqp3Hj-n3Otau02xJ0pSV75jJU5xj8lEErE9ALNuDOOPv-l8x0utfKRK0E-vWIMRoIVcbZgRze-SXK3FRniZ37SUake-w5wSI8QMFgUj1v29ndK5FKAzjv8vmlQQR2WGVusOE7_TZXut1ow7WszBFmpoSnovO__cJnYT4rskWFdd_pQgUhxxNCYMsYjawcyz2loprxUq-C6wfDwKOFxNiFUk6qBSBPloqqg88l_BagC9prqaH2kvEayRB4B0vuzzrwQWzuFx2jJQ",
        title: "Party Time",
        rotate: "-rotate-1",
        hoverRotate: "hover:rotate-1"
    },
    {
        id: 7,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnMmhuV9evF-EFtrIsfuJ43mZjQGHFVmwdrFnb9yTWkcLiiXvsJ2mLVxUjTxkFf-AvcXIZtSCfEIMk-1Hbic3oQGSwOs4PkvQKFZKyGLbl3lxnE4X958lHkeAqp2iHIxHSB_J9ALvhG-Sy41JX6oWYI3hXDXsxVXi-hsbMwuMKZLqKgR772lTQTb4uOn4taJxEhEyqHaqM8DxY073KSQO4faTKsbz059rMdEipfvy4P8shWAkjBxB74jlLOZ_k5sgfEr4TpcQvtCw",
        title: "Summer Vibes",
        rotate: "rotate-2",
        hoverRotate: "hover:-rotate-1"
    },
    {
        id: 8,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW99zZRZpgPBC2HtX1vSyUz9IQnv_CoC_ZncBq7KOCHV2dUgMwGoFBzc--FS0Emz4jM93KogBQZBOIJlLqOZJlHSy28vxkK1Ld9yrbAYB2ufsnp4H30tvXoX0DtHaTrEYxbloOu1eA94Zhlhcu8ZW1yr3615kPl5ONOpbFngdKdbPFu-yOIAZtUp-zaVPbXsEu6pybCyJxXd5s61Kj42ypX3NHjTnqfWexPmDvp4BHmg_UJPMQ-x8Tu8Wf5wwzAsW23KeM_NDtduI",
        title: "Confused Much?",
        rotate: "rotate-0",
        hoverRotate: "hover:rotate-2"
    }
];

export function Gallery() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24 z-10 relative bg-background-light dark:bg-background-dark">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white">The Feed</h2>
                    <p className="text-slate-500 dark:text-slate-400">Freshly picked vibes for your scrolling pleasure.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex gap-2"
                >
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold cursor-pointer hover:bg-primary hover:text-white transition-colors">Trending</span>
                    <span className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-full text-sm font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">New</span>
                </motion.div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {cards.map((card, idx) => {
                    return (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: (idx % 2 === 0 ? [0, -2, 2, -1, 0] : [0, 2, -2, 1, 0]),
                                transition: {
                                    rotate: { duration: 0.4, ease: "easeInOut" },
                                    scale: { type: "spring", stiffness: 400, damping: 10 }
                                }
                            }}
                            className={`break-inside-avoid group relative rounded-xl overflow-hidden shadow-xl transition-all bg-white dark:bg-slate-800 ${card.rotate} ${card.hoverRotate} cursor-pointer hover:z-20`}
                        >
                            {card.type === "quote" ? (
                                <div className="bg-primary/10 p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                                    <span className="material-symbols-outlined text-4xl text-primary">format_quote</span>
                                    <h3 className="text-2xl font-black text-primary leading-tight">{card.content}</h3>
                                </div>
                            ) : (
                                <>
                                    <img className="w-full object-cover" src={card.img} alt={card.title} />

                                    {card.overlay ? (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <p className="text-white font-bold">{card.title}</p>
                                        </div>
                                    ) : (
                                        <div className="p-4 flex justify-between items-center bg-white dark:bg-slate-800">
                                            <div>
                                                {card.title === "Summer Vibes" ? (
                                                    <span className="text-xs uppercase tracking-widest text-primary font-bold">{card.title}</span>
                                                ) : (
                                                    <p className="font-bold text-slate-800 dark:text-slate-200">{card.title}</p>
                                                )}

                                                {card.stat && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {card.stat === "2.4k" && (
                                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                                <span className="material-symbols-outlined text-[12px] text-primary group-hover:text-white transition-colors">favorite</span>
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-medium text-slate-500">{card.stat}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {card.actionBtn && (
                                                <button className="text-primary hover:scale-110 transition-transform">
                                                    <span className="material-symbols-outlined">{card.actionBtn}</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
