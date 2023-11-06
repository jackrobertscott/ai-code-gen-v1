import ts from "typescript"

export function isValidTypeScript(code: string): boolean {
  // Create a TypeScript SourceFile
  const sourceFile = ts.createSourceFile(
    "file.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  )

  // Create a CompilerHost that returns the SourceFile for the specified file name
  const host: ts.CompilerHost = {
    ...ts.createCompilerHost({}),
    getSourceFile: (fileName: string) =>
      fileName === "file.ts" ? sourceFile : undefined,
  }

  // Create a TypeScript Program
  const program = ts.createProgram(["file.ts"], {}, host)

  // Get the TypeScript diagnostics
  const diagnostics = ts.getPreEmitDiagnostics(program)

  // Check for diagnostics errors
  console.log(diagnostics)
  return diagnostics.every((diagnostic) => {
    return diagnostic.category !== ts.DiagnosticCategory.Error
  })
}
