/**
 * Template Parser Utility
 * Handles variable extraction, replacement, and line spacing for network configurations
 */

/**
 * Extract all unique variable names from configuration text
 * Uses Jinja2-style syntax: {{ variableName }}
 * Returns variables in order of first appearance
 */
export function extractVariables(config: string): string[] {
  const regex = /\{\{\s*(\w+)\s*\}\}/g;
  const found: string[] = [];
  const seen = new Set<string>();

  let match;
  while ((match = regex.exec(config)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      found.push(varName);
    }
  }

  return found;
}

/**
 * Replace all variables in configuration with provided values
 * Returns processed output and list of undefined variables
 */
export function replaceVariables(
  config: string,
  variables: Record<string, string>
): { output: string; undefinedVars: string[] } {
  const undefinedVars: string[] = [];
  const regex = /\{\{\s*(\w+)\s*\}\}/g;

  const output = config.replace(regex, (match, varName) => {
    if (varName in variables && variables[varName] !== '') {
      return variables[varName];
    } else {
      if (!undefinedVars.includes(varName)) {
        undefinedVars.push(varName);
      }
      return match; // Keep original placeholder
    }
  });

  return { output, undefinedVars };
}

/**
 * Insert blank lines at specified intervals
 * Example: spacing=5 inserts blank line after every 5 lines
 */
export function applyLineSpacing(text: string, spacing: number): string {
  if (spacing <= 0 || !text) {
    return text;
  }

  const lines = text.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);

    // Insert blank line after every 'spacing' lines
    // Don't add trailing blank line at the end
    if ((i + 1) % spacing === 0 && i < lines.length - 1) {
      result.push('');
    }
  }

  return result.join('\n');
}
