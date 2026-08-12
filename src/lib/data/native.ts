export type NativeType = "member" | "associate" | "general";
export type NativeLabel = "회원" | "준회원" | "일반";

/**
 * URL Native → 한글 라벨
 * @param nativeType member | associate | general
 */
export function getNativeLabel(nativeType: NativeType): NativeLabel {
  const map: Record<NativeType, NativeLabel> = {
    member: "회원",
    associate: "준회원",
    general: "일반",
  };

  return map[nativeType];
}
