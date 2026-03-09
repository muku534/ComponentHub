#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ── Config ────────────────────────────────────────────────────────────
const REPO_OWNER = 'muku534';
const REPO_NAME = 'nativecn-ui';
const BRANCH = 'master';
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;

// ── Types ─────────────────────────────────────────────────────────────
interface RegistryEntry {
    id: string;
    path: string;
    category: string;
    difficulty: string;
    version?: string;
}

interface Registry {
    version: string;
    components: RegistryEntry[];
}

interface ComponentFile {
    name: string;
    content: string;
}

interface ComponentResult {
    files: ComponentFile[];
    dependencies: string[];
}

// ── Fetch helpers ─────────────────────────────────────────────────────
async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
    return res.json() as Promise<T>;
}

async function fetchText(url: string): Promise<string | null> {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.text();
}

async function fetchRegistry(): Promise<Registry> {
    return fetchJSON<Registry>(`${RAW_BASE}/registry/registry.json`);
}

async function fetchComponentData(componentPath: string): Promise<ComponentResult> {
    const basePath = `${RAW_BASE}/registry/${componentPath}`;

    // Fetch metadata
    const metadata = await fetchJSON<{
        id: string;
        name: string;
        dependencies?: { required?: string[]; optional?: string[] };
    }>(`${basePath}/metadata.json`);

    // Derive PascalCase filename: "animated-tab-bar" → "AnimatedTabBar"
    const pascalName = metadata.id
        .split('-')
        .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');

    const files: ComponentFile[] = [];

    for (const ext of ['.tsx', '.jsx', '.ts']) {
        const url = `${basePath}/${pascalName}${ext}`;
        const content = await fetchText(url);
        if (content) {
            files.push({ name: `${pascalName}${ext}`, content });
        }
    }

    if (files.length === 0) {
        throw new Error(
            `No component files found for "${metadata.id}". ` +
            `Looked for ${pascalName}.tsx / .jsx / .ts at ${basePath}`
        );
    }

    // Collect required dependencies (skip internal component refs like "native-haptics")
    const deps = (metadata.dependencies?.required || []).filter(
        (d: string) => !d.startsWith('native-') && d.includes('-')
    );

    return { files, dependencies: deps };
}

function detectPackageManager(): string {
    try {
        execSync('yarn --version', { stdio: 'ignore' });
        if (existsSync('yarn.lock')) return 'yarn';
    } catch { }
    try {
        execSync('pnpm --version', { stdio: 'ignore' });
        if (existsSync('pnpm-lock.yaml')) return 'pnpm';
    } catch { }
    return 'npm';
}

// ── Commands ──────────────────────────────────────────────────────────
const program = new Command();

program
    .name('nativecn-ui')
    .description('Add nativecn-ui components to your React Native project')
    .version('1.0.0');

// ── LIST command ──────────────────────────────────────────────────────
program
    .command('list')
    .description('List all available components')
    .action(async () => {
        const spinner = ora('Fetching component list...').start();
        try {
            const registry = await fetchRegistry();
            spinner.succeed('Available components:\n');

            const grouped: Record<string, RegistryEntry[]> = {};
            for (const comp of registry.components) {
                const cat = comp.category || 'Other';
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(comp);
            }

            for (const [category, comps] of Object.entries(grouped)) {
                console.log(chalk.bold.blue(`  ${category}`));
                for (const comp of comps) {
                    const difficulty = comp.difficulty
                        ? chalk.dim(` (${comp.difficulty})`)
                        : '';
                    console.log(`    ${chalk.green('●')} ${comp.id}${difficulty}`);
                }
                console.log();
            }

            console.log(
                chalk.dim(`  Total: ${registry.components.length} components\n`)
            );
            console.log(
                chalk.dim('  Usage: ') +
                chalk.cyan('npx nativecn-ui add <component-name>') +
                chalk.dim(' [--jsx]')
            );
        } catch (err) {
            spinner.fail('Failed to fetch component list.');
            console.error(chalk.red((err as Error).message));
            process.exit(1);
        }
    });

// ── ADD command ───────────────────────────────────────────────────────
program
    .command('add')
    .description('Add component(s) to your project')
    .argument('[components...]', 'component IDs to add')
    .option('-a, --all', 'add all components', false)
    .option('--jsx', 'prefer .jsx files over .tsx', false)
    .option('--overwrite', 'overwrite existing files', false)
    .option(
        '-p, --path <path>',
        'target directory for components',
        'components'
    )
    .action(async (componentIds: string[], opts) => {
        try {
            // 1. Fetch registry
            const registrySpinner = ora('Fetching registry...').start();
            const registry = await fetchRegistry();
            registrySpinner.succeed('Registry loaded.');

            const allIds = registry.components.map((c) => c.id);

            // 2. Determine which components to add
            let selected: string[] = opts.all ? allIds : componentIds;

            if (!selected.length) {
                const { chosen } = await prompts({
                    type: 'multiselect',
                    name: 'chosen',
                    message: 'Which components would you like to add?',
                    hint: 'Space to select. A to toggle all. Enter to submit.',
                    instructions: false,
                    choices: registry.components.map((c) => ({
                        title: `${c.id} ${chalk.dim(`(${c.category})`)}`,
                        value: c.id,
                    })),
                });
                selected = chosen;
            }

            if (!selected || selected.length === 0) {
                console.log(chalk.yellow('\nNo components selected. Exiting.'));
                process.exit(0);
            }

            // Validate component IDs
            const invalid = selected.filter((id) => !allIds.includes(id));
            if (invalid.length) {
                console.log(
                    chalk.red(`\nUnknown component(s): ${invalid.join(', ')}`)
                );
                console.log(
                    chalk.dim('Run ') +
                    chalk.cyan('npx nativecn-ui list') +
                    chalk.dim(' to see available components.')
                );
                process.exit(1);
            }

            // 3. Download and write files
            const cwd = process.cwd();
            const targetDir = path.resolve(cwd, opts.path);

            console.log();
            const spinner = ora().start();
            let successCount = 0;

            const allDeps = new Set<string>();

            for (const id of selected) {
                spinner.text = `Downloading ${chalk.cyan(id)}...`;

                const entry = registry.components.find((c) => c.id === id)!;
                const result = await fetchComponentData(entry.path);

                // Collect dependencies
                result.dependencies.forEach((d) => allDeps.add(d));

                // Pick the right file: prefer .tsx, or .jsx if --jsx flag
                let fileToWrite: ComponentFile;
                if (opts.jsx) {
                    fileToWrite =
                        result.files.find((f) => f.name.endsWith('.jsx')) ||
                        result.files[0];
                } else {
                    fileToWrite =
                        result.files.find(
                            (f) =>
                                f.name.endsWith('.tsx') ||
                                f.name.endsWith('.ts')
                        ) || result.files[0];
                }

                // Create target directory
                const componentDir = path.resolve(targetDir, id);
                if (!existsSync(componentDir)) {
                    await fs.mkdir(componentDir, { recursive: true });
                }

                const filePath = path.resolve(componentDir, fileToWrite.name);

                // Check for existing file
                if (existsSync(filePath) && !opts.overwrite) {
                    spinner.stop();
                    const { overwrite } = await prompts({
                        type: 'confirm',
                        name: 'overwrite',
                        message: `${fileToWrite.name} already exists in ${id}/. Overwrite?`,
                        initial: false,
                    });

                    if (!overwrite) {
                        console.log(chalk.dim(`  Skipped ${id}`));
                        spinner.start();
                        continue;
                    }
                    spinner.start();
                }

                await fs.writeFile(filePath, fileToWrite.content, 'utf8');
                successCount++;
            }

            spinner.succeed(
                `Added ${chalk.green(successCount)} component${successCount !== 1 ? 's' : ''} to ${chalk.cyan(opts.path + '/')}`
            );

            // Show import example
            if (selected.length > 0) {
                const exId = selected[0];
                const pascal = exId
                    .split('-')
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join('');
                console.log(
                    chalk.dim('\n  Import: ') +
                    chalk.cyan(
                        `import { ${pascal} } from './${opts.path}/${exId}/${pascal}';`
                    )
                );
            }

            // Ask to install dependencies if any
            if (allDeps.size > 0) {
                const depList = Array.from(allDeps);
                console.log(
                    `\n  ${chalk.yellow('⚠')}  Required packages:\n`
                );
                depList.forEach((dep) => {
                    console.log(`     ${chalk.cyan('•')} ${dep}`);
                });

                const { install } = await prompts({
                    type: 'confirm',
                    name: 'install',
                    message: 'Would you like to install these packages?',
                    initial: true,
                });

                if (install) {
                    const pm = detectPackageManager();
                    const cmd = pm === 'npm' ? 'install' : 'add';
                    const installSpinner = ora(`Installing with ${pm}...`).start();
                    try {
                        execSync(`${pm} ${cmd} ${depList.join(' ')}`, {
                            stdio: 'pipe',
                            cwd,
                        });
                        installSpinner.succeed('Dependencies installed!');
                    } catch {
                        installSpinner.fail('Failed to install. Run manually:');
                        console.log(
                            chalk.cyan(`  ${pm} ${cmd} ${depList.join(' ')}`)
                        );
                    }
                }
            }
            console.log();
        } catch (err) {
            console.error(chalk.red((err as Error).message));
            process.exit(1);
        }
    });

program.parse(process.argv);
