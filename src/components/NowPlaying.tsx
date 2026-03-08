"use client";

import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSpotifyCurrentTrack, toggleSpotifyPlayback, skipSpotifyPlayback } from "@/lib/spotify";

interface NowPlayingProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NowPlaying({ isOpen, onClose }: NowPlayingProps) {
    const { data: session } = useSession();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(45);
    const [volume, setVolume] = useState(75);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

    // Dynamic track data state
    const [trackData, setTrackData] = useState({
        title: "Electric Dreams",
        artist: "Neon Architect",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAaLnv46BoDcU9cpurA7tdg87S20zd54z--lACKb-VFE9wwFSTS7SPUBolOH4NngVsRXrH3821zkJg-EUcliFjac4j-LappaMcETPg9N-eRRmWtf5yPPrNK_VFK6BqVEX9nDPp1TNrivKqhVU6p6QF7j0deMLEpzIVP1jP1Yrv6QrbsPA-gbcZ-MAyhi4ENXEWok6tNnrygau0PZNW6UP8EAY0upfONVYOxqNID4VSuU4pkWUaLdfkHEvdB3vIMzVeILpQsZqNTiM"
    });

    // Poll for current Spotify track if logged in
    useEffect(() => {
        const token = (session as any)?.accessToken;
        if (!token) return;

        const fetchTrack = async () => {
            const data = await getSpotifyCurrentTrack(token);
            if (data && data.item) {
                setTrackData({
                    title: data.item.name,
                    artist: data.item.artists[0].name,
                    img: data.item.album.images[0].url
                });
                setIsPlaying(data.is_playing);
                setProgress((data.progress_ms / data.item.duration_ms) * 100);
            }
        };

        fetchTrack();
        const interval = setInterval(fetchTrack, 5000);
        return () => clearInterval(interval);
    }, [session]);

    // Handle progress animation locally for smoothness
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && progress < 100) {
            interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 0.1, 100));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, progress]);

    const handlePlayPause = async () => {
        const token = (session as any)?.accessToken;
        if (token) {
            await toggleSpotifyPlayback(token, !isPlaying);
        }
        setIsPlaying(!isPlaying);
    };

    const handleSkip = async (next: boolean) => {
        const token = (session as any)?.accessToken;
        if (token) {
            await skipSpotifyPlayback(token, next);
        }
    };

    const formatTime = (percent: number, totalSeconds: number) => {
        const currentSeconds = Math.floor((percent / 100) * totalSeconds);
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md p-0 md:p-8"
                >
                    {/* Expanded Player Container */}
                    <motion.div
                        initial={{ y: "100%", opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: "100%", opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="glass-panel w-full max-w-4xl h-[95vh] md:h-auto md:max-h-[85vh] md:rounded-3xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.7)] relative bg-slate-950/80 border border-white/10"
                    >
                        {/* Header / Drag Handle */}
                        <div className="w-full flex flex-col items-center pt-4 pb-2 cursor-pointer" onClick={onClose}>
                            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-4"></div>
                            <header className="w-full px-8 flex items-center justify-between">
                                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                                    <span className="material-symbols-outlined text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all">expand_more</span>
                                </button>
                                <h2 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] font-space-grotesk">Now Playing</h2>

                                {session ? (
                                    <button onClick={() => signOut()} className="text-[10px] font-black text-white/40 hover:text-primary uppercase tracking-widest transition-colors">Logout</button>
                                ) : (
                                    <button onClick={() => signIn("spotify")} className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                        Connect <span className="material-symbols-outlined text-sm">login</span>
                                    </button>
                                )}
                            </header>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12 scrollbar-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">

                                {/* Left Column: Visuals */}
                                <div className="flex flex-col items-center justify-center space-y-10">
                                    {/* Vinyl & Cover Container */}
                                    <div className="relative group perspective-1000 p-8">
                                        {/* Vinyl Record */}
                                        <motion.div
                                            animate={{
                                                rotate: isPlaying ? 360 : 0
                                            }}
                                            transition={{
                                                rotate: {
                                                    duration: isPlaying ? 10 : 2,
                                                    repeat: isPlaying ? Infinity : 0,
                                                    ease: isPlaying ? "linear" : "easeOut"
                                                }
                                            }}
                                            className="vinyl-record absolute top-8 left-20 w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center border-[8px] border-[#121212] z-0 shadow-2xl"
                                        >
                                            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,_#1a1a1a_20%,_#000_21%,_#1a1a1a_23%,_#000_25%,_#1a1a1a_27%,_#000_29%,_#1a1a1a_31%,_#000_33%)] opacity-80"></div>
                                            <div className="absolute w-24 h-24 rounded-full border border-white/5 flex items-center justify-center bg-black/40">
                                                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#ee5b2b]"></div>
                                            </div>
                                        </motion.div>

                                        {/* Main Album Cover */}
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotateY: 10 }}
                                            onClick={handlePlayPause}
                                            className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden bg-primary/20 bg-cover transform-style-3d cursor-pointer active:scale-95 transition-transform duration-300 ring-1 ring-white/10"
                                            style={{ backgroundImage: `url('${trackData.img}')` }}
                                        >
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        </motion.div>
                                    </div>

                                    {/* Track Info */}
                                    <div className="text-center md:text-left w-full mt-4">
                                        <motion.h1
                                            key={trackData.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter"
                                        >
                                            {trackData.title}
                                        </motion.h1>
                                        <motion.p
                                            key={trackData.artist}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-primary text-lg md:text-xl font-bold opacity-90 tracking-wide"
                                        >
                                            {trackData.artist}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* Right Column: Controls & Queue */}
                                <div className="flex flex-col space-y-12">
                                    {/* Waveform Visualization */}
                                    <div className="flex items-end justify-between h-20 gap-1 px-2">
                                        {[40, 60, 80, 100, 70, 40, 80, 100, 60, 40, 90, 50, 80, 100, 40, 60, 30, 70, 40, 80].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                animate={isPlaying ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] } : { height: "10%" }}
                                                transition={{ repeat: Infinity, duration: 0.6 + Math.random(), ease: "easeInOut" }}
                                                className={clsx(
                                                    "waveform-bar w-1.5 rounded-full transition-colors duration-500",
                                                    isPlaying ? (h >= 90 ? "bg-primary" : "bg-primary/40") : "bg-white/10"
                                                )}
                                            ></motion.div>
                                        ))}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-4">
                                        <div
                                            className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden group cursor-pointer"
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - rect.left;
                                                setProgress((x / rect.width) * 100);
                                            }}
                                        >
                                            <motion.div
                                                animate={{ width: `${progress}%` }}
                                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(238,91,43,0.5)]"
                                            ></motion.div>
                                            <motion.div
                                                animate={{ left: `${progress}%` }}
                                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform -translate-x-1/2 pointer-events-none border-2 border-primary"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-black text-white/30 uppercase tracking-[0.2em] font-space-grotesk">
                                            <span>{formatTime(progress, 235)}</span>
                                            <span>3:55</span>
                                        </div>
                                    </div>

                                    {/* Main Controls */}
                                    <div className="flex items-center justify-between px-2">
                                        <button
                                            onClick={() => setIsShuffle(!isShuffle)}
                                            className={clsx(
                                                "p-3 rounded-full transition-all duration-300",
                                                isShuffle ? "bg-primary/20 text-primary" : "text-white/30 hover:text-white"
                                            )}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isShuffle ? "'FILL' 1" : "" }}>shuffle</span>
                                        </button>

                                        <div className="flex items-center gap-6 md:gap-10">
                                            <button onClick={() => handleSkip(false)} className="text-white/80 hover:text-primary transition-all active:scale-75 group">
                                                <span className="material-symbols-outlined text-4xl block group-hover:-translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
                                            </button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handlePlayPause}
                                                className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(238,91,43,0.4)] relative group overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                <span className="material-symbols-outlined text-6xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {isPlaying ? "pause" : "play_arrow"}
                                                </span>
                                            </motion.button>

                                            <button onClick={() => handleSkip(true)} className="text-white/80 hover:text-primary transition-all active:scale-75 group">
                                                <span className="material-symbols-outlined text-4xl block group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off')}
                                            className={clsx(
                                                "p-3 rounded-full transition-all duration-300 relative",
                                                repeatMode !== 'off' ? "bg-primary/20 text-primary" : "text-white/30 hover:text-white"
                                            )}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: repeatMode !== 'off' ? "'FILL' 1" : "" }}>
                                                {repeatMode === 'one' ? 'repeat_one' : 'repeat'}
                                            </span>
                                            {repeatMode !== 'off' && (
                                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                                            )}
                                        </button>
                                    </div>

                                    {/* Queue */}
                                    <div className="pt-8 border-t border-white/5 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] font-space-grotesk">Up Next</h3>
                                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDci74QSwTUx9iXfnyoXg_O-MhTboC0AvzEC9BJjg1DcokBI-rBCqPKwDa88CXmFVWP8fxqd85btDXimVTRklcVGLMmCu12XS67F6Czg7iNkO6ZcFQ77awEDouUeWUat2R7-r7i8PHHU7kuTieIQwHipUqD1w6PFL6mxCS76ZVouDzaBxLmt8bKPQqjuvv33BdpBiGP8eE3PLNM2mCF32Mb7zCsMRnRBHCU4A78-RhN9r5du4ohiXLpvoid-BmFkNlKDwoFC4JdWzU", title: "Digital Horizon", artist: "Synth Voyager" },
                                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2cHegjzIQi3atLfttPcO0vT7l4tucetHgZ9aGgh6z-gQ8XbsltdpqSb6nt15fYpltz3EzOz9Z4Z6Lpptmhua1GnmQJytwsIOK9P5K4GWtATops8zF1RX18NDh4vxJxcsYoaeFgqXCMU8dedVNJh-qs3P1BDAkSETkPzSneZ4mJDXojqYoPrW8bQLKGho7lW8Uukbt5w_3cS6Xwa4BS2nstwT9-2G5Rqnu_AEDvFVNsYRQZivNF4rjhh4zdG3SNktL3n4Ll0xJoXU", title: "Midnight Protocol", artist: "Data Stream" },
                                            ].map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                                                    className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl transition-all"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-lg bg-cover bg-center shadow-lg group-hover:scale-105 transition-transform" style={{ backgroundImage: `url('${item.img}')` }}></div>
                                                        <div>
                                                            <p className="text-white text-sm font-bold group-hover:text-primary transition-colors">{item.title}</p>
                                                            <p className="text-white/40 text-[11px] font-medium tracking-wide uppercase">{item.artist}</p>
                                                        </div>
                                                    </div>
                                                    <span className="material-symbols-outlined text-white/10 group-hover:text-white/40 transition-colors">play_arrow</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra Footer Actions */}
                        <div className="px-8 py-8 flex items-center justify-between border-t border-white/5 bg-white/[0.02] backdrop-blur-3xl mt-auto">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <span className="material-symbols-outlined text-primary group-hover:animate-bounce">devices</span>
                                <div className="hidden sm:block">
                                    <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-0.5">Connected to</p>
                                    <p className="text-white text-xs font-bold leading-none">Living Room Echo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <button className="text-white/40 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-xl">volume_down</span>
                                </button>
                                <div
                                    className="w-32 md:w-48 h-1.5 bg-white/5 rounded-full overflow-hidden flex cursor-pointer group relative"
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        setVolume((x / rect.width) * 100);
                                    }}
                                >
                                    <motion.div
                                        animate={{ width: `${volume}%` }}
                                        className="h-full bg-white/60 group-hover:bg-primary transition-colors duration-300"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ left: `${volume}%` }}
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform -translate-x-1/2 pointer-events-none"
                                    ></motion.div>
                                </div>
                                <button className="text-white/40 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-xl">volume_up</span>
                                </button>
                            </div>

                            <button className="text-white/40 hover:text-primary transition-colors hidden sm:flex">
                                <span className="material-symbols-outlined">playlist_play</span>
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
