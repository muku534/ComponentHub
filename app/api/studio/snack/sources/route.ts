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
                const registryDir = path.join(process.cwd(), 'registry', 'components');

                let compPath = '';
                const findFile = (dir: string, targetName: string) => {
                    const entries = fs.readdirSync(dir, { withFileTypes: true });
                    for (const entry of entries) {
                        if (entry.isDirectory()) {
                            findFile(path.join(dir, entry.name), targetName);
                        } else if (entry.isFile() && entry.name === `${targetName}.tsx`) {
                            compPath = path.join(dir, entry.name);
                        }
                    }
                };

                findFile(registryDir, compName);

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
