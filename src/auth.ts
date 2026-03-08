import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "user-read-currently-playing user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
