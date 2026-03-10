import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData() as any;
        const code = formData.get('code') as string;
        const componentsStr = formData.get('components') as string;
        const isEmbedded = formData.get('embedded') === 'true';

        if (!code) {
            return new NextResponse('Missing code', { status: 400 });
        }

        const componentNames = componentsStr ? componentsStr.split(',').map((s: string) => s.trim()) : [];
        const files: Record<string, { type: 'CODE'; contents: string }> = {
            'App.tsx': { type: 'CODE', contents: code },
        };

        const dependencies = new Set<string>();

        // Optional standard deps that most need
        dependencies.add('react-native-safe-area-context');
        dependencies.add('lucide-react-native');

        for (const compName of componentNames) {
            try {
                // Safely search first-level subdirectories of registry/components directly
                const registryDir = path.join(process.cwd(), 'registry', 'components');
                let compPath = '';

                if (fs.existsSync(registryDir)) {
                    const categories = fs.readdirSync(registryDir, { withFileTypes: true });
                    for (const category of categories) {
                        if (category.isDirectory()) {
                            const possiblePath = path.join(registryDir, category.name, `${compName}.tsx`);
                            if (fs.existsSync(possiblePath)) {
                                compPath = possiblePath;
                                break;
                            }
                        }
                    }
                }

                if (compPath) {
                    const contents = fs.readFileSync(compPath, 'utf8');
                    files[`${compName}.tsx`] = { type: 'CODE', contents };

                    if (contents.includes('react-native-reanimated')) dependencies.add('react-native-reanimated');
                    if (contents.includes('react-native-linear-gradient')) dependencies.add('expo-linear-gradient');
                    if (contents.includes('react-native-svg')) dependencies.add('react-native-svg');
                    if (contents.includes('expo-haptics')) dependencies.add('expo-haptics');
                    if (contents.includes('moti')) dependencies.add('moti');
                }
            } catch (err) {
                console.error(`Error reading component ${compName}:`, err);
            }
        }

        // For NON-embedded (new tab), use form POST to full Snack IDE
        if (!isEmbedded) {
            const html = `
                <!DOCTYPE html>
                <html>
                    <head><title>Opening Snack...</title></head>
                    <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#000;color:#fff;margin:0;">
                        <p>Preparing Live Preview... Please wait.</p>
                        <form id="snack-form" action="https://snack.expo.dev" method="POST">
                            <input type="hidden" name="platform" value="web" />
                            <input type="hidden" name="name" value="Nativecn Studio Preview" />
                            <input type="hidden" name="dependencies" value="${Array.from(dependencies).join(',')}" />
                            <input type="hidden" name="files" value="${escapeHtml(JSON.stringify(files))}" />
                        </form>
                        <script>document.getElementById('snack-form').submit();</script>
                    </body>
                </html>
            `;
            return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
        }

        // For EMBEDDED (in-platform Live Test), use embed.js which properly supports preview-only mode
        const filesEncoded = encodeURIComponent(JSON.stringify(files));
        const depsEncoded = encodeURIComponent(Array.from(dependencies).join(','));

        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Live Preview</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        html, body { width: 100%; height: 100%; overflow: hidden; background: #1a1a2e; }
                        /* The embed.js script creates a div > iframe structure. 
                           We force it to fill the entire viewport so the emulator fills our phone mockup. */
                        div[data-snack-id], div[data-snack-name] {
                            width: 100% !important;
                            height: 100% !important;
                        }
                        div[data-snack-id] iframe, div[data-snack-name] iframe {
                            width: 100% !important;
                            height: 100% !important;
                            border: none !important;
                        }
                        .loading-overlay {
                            position: fixed;
                            inset: 0;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            background: #1a1a2e;
                            gap: 12px;
                            z-index: 100;
                            transition: opacity 0.5s ease;
                        }
                        .loading-overlay.hidden { opacity: 0; pointer-events: none; }
                        .spinner {
                            width: 28px; height: 28px;
                            border: 3px solid rgba(255,255,255,0.1);
                            border-top-color: rgba(99,102,241,0.8);
                            border-radius: 50%;
                            animation: spin 0.8s linear infinite;
                        }
                        @keyframes spin { to { transform: rotate(360deg); } }
                        .loading-text {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            font-size: 11px;
                            color: rgba(255,255,255,0.4);
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                        }
                    </style>
                </head>
                <body>
                    <div class="loading-overlay" id="loader">
                        <div class="spinner"></div>
                        <span class="loading-text">Starting Emulator...</span>
                    </div>

                    <div
                        data-snack-name="Nativecn Studio Preview"
                        data-snack-files="${escapeHtml(JSON.stringify(files))}"
                        data-snack-dependencies="${Array.from(dependencies).join(',')}"
                        data-snack-platform="web"
                        data-snack-preview="true"
                        data-snack-theme="dark"
                        data-snack-loading="lazy"
                        style="width:100%;height:100%;overflow:hidden;"
                    ></div>

                    <script async src="https://snack.expo.dev/embed.js"></script>
                    <script>
                        // Hide the loading overlay once the iframe loads
                        const checkIframe = setInterval(() => {
                            const iframe = document.querySelector('iframe');
                            if (iframe) {
                                iframe.addEventListener('load', () => {
                                    document.getElementById('loader').classList.add('hidden');
                                });
                                // Fallback: hide after 6 seconds regardless
                                setTimeout(() => {
                                    document.getElementById('loader').classList.add('hidden');
                                }, 6000);
                                clearInterval(checkIframe);
                            }
                        }, 300);
                    </script>
                </body>
            </html>
        `;

        return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });

    } catch (err: any) {
        console.error(err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
