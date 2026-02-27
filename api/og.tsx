import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // Dynamic params: ?title=... &subtitle=...
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Find Sehri & Suhoor Spots Near You';

        const hasSubtitle = searchParams.has('subtitle');
        const subtitle = hasSubtitle
            ? searchParams.get('subtitle')?.slice(0, 150)
            : 'Community Verified Ramadan Directory 2026';

        const count = searchParams.get('count') || '40+';

        // The visually striking HTML/CSS payload for the edge rendering
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#022c22', // primary-dark
                        backgroundImage: 'linear-gradient(to bottom right, #022c22, #064e3b)',
                        fontFamily: 'sans-serif',
                        padding: '80px',
                        position: 'relative',
                    }}
                >
                    {/* Subtle Background Elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            left: '-100px',
                            width: '400px',
                            height: '400px',
                            background: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-100px',
                            right: '-100px',
                            width: '500px',
                            height: '500px',
                            background: 'rgba(212, 175, 55, 0.15)',
                            borderRadius: '50%',
                            filter: 'blur(100px)',
                        }}
                    />

                    {/* Header/Logo Area */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '60px',
                        }}
                    >
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: '#D4AF37', // gold
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '20px',
                                boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#022c22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontSize: 48,
                                fontWeight: 800,
                                color: '#ecfdf5', // cream
                                letterSpacing: '-1px',
                            }}
                        >
                            Sehri Finder
                        </span>
                    </div>

                    {/* Main Content Area */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: 'auto',
                            maxWidth: '900px',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(212, 175, 55, 0.15)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                padding: '12px 24px',
                                borderRadius: '100px',
                                color: '#D4AF37',
                                fontSize: 24,
                                fontWeight: 600,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '40px',
                                display: 'flex',
                            }}
                        >
                            Ramadan 2026 Live Updates
                        </div>

                        <h1
                            style={{
                                fontSize: 84,
                                fontWeight: 900,
                                color: 'white',
                                lineHeight: 1.1,
                                marginBottom: '30px',
                                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {title}
                        </h1>

                        <p
                            style={{
                                fontSize: 36,
                                color: '#a7f3d0',
                                lineHeight: 1.4,
                                maxWidth: '800px',
                                display: 'block'
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* Footer Badge Area */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: '40px',
                            paddingTop: '40px',
                            borderTop: '1px solid rgba(236, 253, 245, 0.1)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', color: '#ecfdf5', fontSize: 24 }}>
                            🔥 <span style={{ marginLeft: 12, fontWeight: 700 }}>{count} Verified Locations</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#D4AF37', fontSize: 24, fontWeight: 700 }}>
                            sehrifinder.com
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error(e);
        return new Response('Failed to generate OG image', { status: 500 });
    }
}
