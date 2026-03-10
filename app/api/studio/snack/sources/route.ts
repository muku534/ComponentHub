import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Maps local RN packages to their Expo Snack-compatible equivalents
const SNACK_DEPENDENCY_MAP: Record<string, string> = {
    'react-native-linear-gradient': 'expo-linear-gradient',
    'react-native-reanimated': 'react-native-reanimated',
    'react-native-reanimated-carousel': 'react-native-reanimated-carousel',
    'react-native-gesture-handler': 'react-native-gesture-handler',
    'react-native-svg': 'react-native-svg',
    'react-native-safe-area-context': 'react-native-safe-area-context',
    'expo-haptics': 'expo-haptics',
    'moti': 'moti',
    'lucide-react-native': 'lucide-react-native',
    '@react-native-community/slider': '@react-native-community/slider',
    'expo-blur': 'expo-blur',
};

// Special import rewrites: some packages change from default to named exports
// Format: [regex pattern, replacement string]
const IMPORT_REWRITES: Array<[RegExp, string]> = [
    // `import LinearGradient from 'react-native-linear-gradient'`  →  `import { LinearGradient } from 'expo-linear-gradient'`
    [
        /import\s+LinearGradient\s+from\s+['"]react-native-linear-gradient['"]/g,
        "import { LinearGradient } from 'expo-linear-gradient'"
    ],
];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const componentNames: string[] = body.components || [];

        const sources: Record<string, string> = {};
        const detectedDeps: Set<string> = new Set();

        // Always include these base deps
        detectedDeps.add('react-native-safe-area-context');
        detectedDeps.add('react-native-gesture-handler');

        for (const compName of componentNames) {
            try {
                // In Vercel, process.cwd() points to the root of the project, but complex 
                // recursive readdirSync can sometimes crash or timeout in serverless functions.
                // We'll search the first-level subdirectories of registry/components directly.
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
                    let contents = fs.readFileSync(compPath, 'utf8');

                    // Step 1: Apply special import rewrites first (handles default → named export changes)
                    for (const [pattern, replacement] of IMPORT_REWRITES) {
                        contents = contents.replace(pattern, replacement);
                    }

                    // Step 2: Detect dependencies and do simple package name swaps for remaining references
                    for (const [localPkg, snackPkg] of Object.entries(SNACK_DEPENDENCY_MAP)) {
                        if (contents.includes(localPkg) || contents.includes(snackPkg)) {
                            detectedDeps.add(snackPkg);

                            // Swap any remaining references to the local package name
                            if (localPkg !== snackPkg && contents.includes(localPkg)) {
                                contents = contents.replace(
                                    new RegExp(escapeRegex(localPkg), 'g'),
                                    snackPkg
                                );
                            }
                        }
                    }

                    sources[compName] = contents;
                }
            } catch (err) {
                console.error(`Error reading component ${compName}:`, err);
            }
        }

        return NextResponse.json({
            sources,
            dependencies: Array.from(detectedDeps),
        });
    } catch (err: any) {
        console.error(err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
