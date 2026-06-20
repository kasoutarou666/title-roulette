export interface WordSet {
  en: string;
  ja: string;
}

export const CATEGORY_A: WordSet[] = [
  { en: "Legendary", ja: "伝説の" },
  { en: "Cursed", ja: "呪われた" },
  { en: "Almighty", ja: "全能の" },
  { en: "Suspicious", ja: "怪しい" },
  { en: "Invisible", ja: "見えない" },
  { en: "Chaotic", ja: "混沌の" },
  { en: "Sleepy", ja: "眠れる" },
  { en: "Ancient", ja: "古代の" },
  { en: "Corrupted", ja: "腐敗した" },
  { en: "Discount", ja: "割引の" },
  { en: "Temporary", ja: "仮の" },
  { en: "Overworked", ja: "過労の" },
  { en: "Mysterious", ja: "謎の" },
  { en: "Digital", ja: "デジタルの" },
  { en: "Broke", ja: "破産した" },
  { en: "Unstoppable", ja: "止まらない" },
  { en: "Lost", ja: "迷える" },
  { en: "Forbidden", ja: "禁断の" },
  { en: "Retired", ja: "引退した" },
  { en: "Ultimate", ja: "究極の" },
];

export const CATEGORY_B: WordSet[] = [
  { en: "Politician", ja: "議員" },
  { en: "Salaryman", ja: "社畜" },
  { en: "Ninja", ja: "忍者" },
  { en: "Philosopher", ja: "哲学者" },
  { en: "Chef", ja: "料理人" },
  { en: "Astronaut", ja: "宇宙飛行士" },
  { en: "Samurai", ja: "侍" },
  { en: "Influencer", ja: "インフルエンサー" },
  { en: "Wizard", ja: "魔法使い" },
  { en: "Hermit", ja: "仙人" },
  { en: "Detective", ja: "探偵" },
  { en: "Wanderer", ja: "流れ者" },
  { en: "Overlord", ja: "覇者" },
  { en: "Otaku", ja: "オタク" },
  { en: "Ghost", ja: "幽霊" },
  { en: "Billionaire", ja: "億万長者" },
  { en: "Rebel", ja: "反逆者" },
  { en: "Oracle", ja: "予言者" },
  { en: "Ronin", ja: "浪人" },
  { en: "Goblin", ja: "ゴブリン" },
];

export const CATEGORY_C: WordSet[] = [
  { en: "Broke", ja: "無一文" },
  { en: "Nocturnal", ja: "夜行性" },
  { en: "Undercover", ja: "潜入中" },
  { en: "Undefeated", ja: "無敗" },
  { en: "Unchained", ja: "解き放たれ済み" },
  { en: "Overqualified", ja: "能力過剰" },
  { en: "Underpaid", ja: "薄給" },
  { en: "Immortal", ja: "不死身" },
  { en: "Caffeinated", ja: "カフェイン中毒" },
  { en: "Overpowered", ja: "最強すぎ" },
  { en: "Glitched", ja: "バグり中" },
  { en: "Haunted", ja: "呪われ中" },
  { en: "Enlightened", ja: "悟り済み" },
  { en: "Wanted", ja: "指名手配中" },
  { en: "Unbothered", ja: "動じず" },
  { en: "Overloaded", ja: "過負荷" },
  { en: "Reckless", ja: "無謀" },
  { en: "Ascended", ja: "昇天済み" },
  { en: "Invisible", ja: "透明" },
  { en: "Legendary", ja: "最強すぎ" },
];

export function getTitle(year: number, month: number, day: number) {
  const seed = year * 10000 + month * 100 + day;
  const a = CATEGORY_A[seed % CATEGORY_A.length];
  const b = CATEGORY_B[(seed * 31) % CATEGORY_B.length];
  const c = CATEGORY_C[(seed * 97) % CATEGORY_C.length];
  return { a, b, c };
}
