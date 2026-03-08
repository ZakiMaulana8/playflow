"use client";

export function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900/50 py-16 px-6 mt-20 relative z-10 w-full pb-32">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">PlayFlow</h2>
                </div>

                <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <a className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
                    <a className="hover:text-primary transition-colors cursor-pointer">Terms</a>
                    <a className="hover:text-primary transition-colors cursor-pointer">Contact</a>
                </div>

                <div className="flex gap-4">
                    <a className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer group hover:scale-110 group-active:scale-95">
                        <span className="material-symbols-outlined group-hover:animate-bounce">share</span>
                    </a>
                    <a className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer group hover:scale-110 group-active:scale-95">
                        <span className="material-symbols-outlined group-hover:animate-bounce">alternate_email</span>
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} PlayFlow Gallery. Keep on vibing.
            </div>
        </footer>
    );
}
