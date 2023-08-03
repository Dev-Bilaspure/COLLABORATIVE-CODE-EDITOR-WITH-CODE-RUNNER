export interface handleRoomDataChangeFunction {
  ({
    newLanguage,
    newInput,
    newOutput,
    newCode,
  }: {
    newLanguage?: string;
    newInput?: string;
    newOutput?: string;
    newCode?: string;
  }): void;
}