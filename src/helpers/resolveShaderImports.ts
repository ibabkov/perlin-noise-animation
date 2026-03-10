/**
 * Simple shader import resolver that handles #include "filename" directives.
 * This works by recursively replacing include statements with the content from a provided registry.
 */
export function resolveShaderImports(source: string, registry: Record<string, string>, visited = new Set<string>()): string {
	return source.replace(/#include "(.+)"/g, (_, name) => {
		if (visited.has(name)) {
			return `// Circular include detected: ${name}`;
		}

		const content = registry[name];
		if (content === undefined) {
			console.warn(`Shader include not found in registry: ${name}`);

			return `// Include not found: ${name}`;
		}

		const newVisited = new Set(visited);
		newVisited.add(name);

		return resolveShaderImports(content, registry, newVisited);
	});
}
