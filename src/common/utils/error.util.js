// src/common/utils/error.util.js
import path from 'path';
import { fileURLToPath } from 'url';

export const throwError = (
    status = 500,
    message = 'Internal Server Error',
) => {
    const err = new Error(message);
    err.status = status;

    Error.captureStackTrace(err, throwError);

    throw err;
};

export const getErrorLocation = (stack) => {
    if (typeof stack !== 'string') return null;

    const stackLines = stack.split('\n');

    if (stackLines.length < 2) return null;

    // Extract the file path and line number from the second line of stack trace.
    // Matches either: (filePath:line:col) or at filePath:line:col
    const match =
        stackLines[1].match(/\((.*):(\d+):(\d+)\)/) ||
        stackLines[1].match(/at (.*):(\d+):(\d+)/);

    if (!match) return null;

    let [_, filePath, line] = match;

    try {
        // If path is a file URL (file://), convert it to a proper file system path
        if (filePath.startsWith('file://')) {
            filePath = fileURLToPath(filePath);
        }

        // Get relative path to current working directory (project root)
        const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

        return { file: relativePath, line };
    } catch {
        // If conversion fails, return raw values for debugging
        return { file: filePath, line };
    }
}
