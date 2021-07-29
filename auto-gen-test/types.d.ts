export interface TTestNow {
  genJestSource (sourceFilePath: string): void;
  genTestFile (path: string): void;
  getTestFileName (sourceFilePath: string): string;
  getTestSource (method: string, classFile: string, isClass: boolean): void;
}