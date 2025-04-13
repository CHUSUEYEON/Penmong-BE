export interface Letter {
  letterId: string;
  letterContent: string; // 내용
  letterColor: number; // 색깔
  letterShape: number; // 모양
  letterFile: number; // 사진
  letterIsReported: boolean; // 신고여부(0이면 신고x, 1이면 신고)
  letterScope: letterScope; // 공개범위
  letterIsPublic: boolean; // 전체 공개인가(0이면 특정 닉네임, 1이면 전체 공개)
  letterCreatedAt: string;
  letterDeletedAt: string;
}

export enum letterScope {
  GLOBAL = 'GLOBAL',
  ROOM = 'ROOM',
}
