
import { personalityQuestions } from "./personalityQuizData";

// 各質問の選択肢に対応するスコア（左側0〜右側100）
const statRules = [
  {
    id: "disguise",
    name: "陽キャ擬態力",
    emoji: "🎭",
    
description: "周りに合わせて明るく振る舞う？",

    left: "自然体",
    right: "擬態の達人",
    color: "#9670b5",
    questions: {
      4: [0, 100, 30, 0],
      7: [30, 50, 20, 60, 0],
      15: [0, 30, 80, 100],
      21: [10, 30, 60, 80],
    },
  },
  {
    id: "solo",
    name: "一人最高度",
    emoji: "🌙",
    
description: "みんなといるより一人が好き？",

    left: "みんな大好き",
    right: "一人が天国",
    color: "#449bbd",
    questions: {
      2: [0, 25, 75, 100],
      8: [0, 25, 75, 90, 100],
      19: [0, 30, 70, 100],
      24: [0, 40, 90, 80],
    },
  },
  {
    id: "impulse",
    name: "ノリの瞬発力",
    emoji: "⚡",

description: "急な誘いや盛り上がりに乗れる？",

    left: "慎重に様子見",
    right: "即ノリの天才",
    color: "#e7ad3d",
    questions: {
      3: [100, 90, 30, 0],
      5: [100, 75, 30, 0],
      7: [100, 65, 20, 10, 0],
      9: [100, 75, 35, 0],
    },
  },
  {
    id: "awareness",
    name: "空気読みすぎ度",
    emoji: "👀",

description: "周りの空気をどれだけ気にする？",

    left: "我が道を行く",
    right: "察しすぎ職人",
    color: "#3aa784",
    questions: {
      4: [15, 100, 75, 40],
      10: [10, 70, 100, 40],
      12: [0, 30, 75, 90, 80],
      13: [0, 40, 85, 65],
    },
  },
  {
    id: "otaku",
    name: "オタク気質",
    emoji: "🎨",

description: "好きなことにどれだけ没頭する？",

    left: "広く浅く",
    right: "沼の住人",
    color: "#e47c89",
    questions: {
      8: [10, 20, 40, 100, 50],
      17: [10, 30, 40, 100],
      20: [20, 30, 40, 100],
      23: [100, 80, 40, 10],
    },
  },
];

// 回答履歴から5つの裏ステータスを計算
export function calculatePersonalityStats(answerHistory) {
  return statRules.map((stat) => {
    let total = 0;
    let count = 0;

    Object.entries(stat.questions).forEach(([questionId, values]) => {
      const questionIndex = personalityQuestions.findIndex(
        (question) => question.id === Number(questionId)
      );

      if (questionIndex === -1) return;

      const selectedIndex = answerHistory[questionIndex];
      const value = values[selectedIndex];

      if (typeof value !== "number") return;

      total += value;
      count += 1;
    });

    return {
      id: stat.id,
      name: stat.name,
      emoji: stat.emoji,
      description: stat.description,
      left: stat.left,
      right: stat.right,
      color: stat.color,
      value: count > 0 ? Math.round(total / count) : 0,
    };
  });
}
