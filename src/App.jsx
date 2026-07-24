import { useState } from 'react'
import './App.css'
import pairsLogo from './assets/pairs.svg'
import tinderLogo from './assets/tinder.png'
import withLogo from "./assets/with.svg";
import omiaiLogo from "./assets/omiai.png";
import tappleLogo from "./assets/tapple.png";
import newmatchLogo from "./assets/newmatch.png";
import kimeruLogo from "./assets/kimeru_logo_top.png";
import logoHorizontal from "./assets/kimeru_logo_horizontal.png";
import kimeruLogoMark from "./assets/kimeru_logo_mark.png";
import kimeruLogoTransparent from "./assets/kimeru_logo_transparent.png"
import { ArrowLeft } from 'lucide-react'

const appNames = [
  'Pairs',
  'with',
  'Omiai',
  'Tinder',
  'newmatch',
  'タップル',
]

const questions = [{
    id: 'purpose',
    title: 'Q1. 恋人探しの目的は？',
    choices: [
      {
        label: '真剣に恋人が欲しい',
        scores: {
          Pairs: 3,
          with: 2,
          Omiai: 2,
          Tinder: 0,
          newmatch: 0,
          タップル: 1,
        },
      },
      {
        label: 'まずは気軽に会いたい',
        scores: {
          Pairs: 0,
          with: 1,
          Omiai: 0,
          Tinder: 4,
          newmatch: 2,
          タップル: 3,
        },
      },
      {
        label: '結婚を見据えている',
        scores: {
          Pairs: 2,
          with: 1,
          Omiai: 3,
          Tinder: 0,
          newmatch: 0,
          タップル: 0,
        },
      },
      {
        label: 'まだ決めていない',
        scores: {
          Pairs: 1,
          with: 2,
          Omiai: 1,
          Tinder: 1,
          newmatch: 4,
          タップル: 2,
        },
      },
    ],
  },

{
  id: 'gender',
  title: 'Q2. 性別を教えて。',
  choices: [
    {
      label: '男性',
      scores: {},
    },
    {
      label: '女性',
      scores: {},
    },
    {
      label: '回答しない',
      scores: {},
    },
  ],
},

{
  id: 'age',
  title: 'Q3. 年齢を教えて。',
  choices: [
    {
      label: '18〜24歳',
      scores: {
        Pairs: 1,
        with: 2,
        Omiai: 0,
        Tinder: 3,
        newmatch: 2,
        タップル: 3,
      },
    },
    {
      label: '25〜34歳',
      scores: {
        Pairs: 3,
        with: 3,
        Omiai: 2,
        Tinder: 1,
        newmatch: 1,
        タップル: 2,
      },
    },
    {
      label: '35〜44歳',
      scores: {
        Pairs: 3,
        with: 2,
        Omiai: 3,
        Tinder: 0,
        newmatch: 0,
        タップル: 1,
      },
    },
    {
      label: '45歳以上',
      scores: {
        Pairs: 2,
        with: 1,
        Omiai: 3,
        Tinder: 0,
        newmatch: 0,
        タップル: 0,
      },
    },
  ],
},

  {
    id: 'priority',
    title: 'Q4. 正直、一番重視するのは？',
    choices: [
      {
        label: '顔でしょ。',
        scores: {
          Pairs: 1,
          with: 0,
          Omiai: 0,
          Tinder: 3,
          newmatch: 2,
          タップル: 4,
        },
      },
      {
        label: 'やっぱお金。',
        scores: {
          Pairs: 2,
          with: 1,
          Omiai: 3,
          Tinder: 1,
          newmatch: 0,
          タップル: 0,
        },
      },
      {
        label: '優しさかな。',
        scores: {
          Pairs: 2,
          with: 3,
          Omiai: 2,
          Tinder: 0,
          newmatch: 1,
          タップル: 0,
        },
      },
      {
        label: '相性が一番。',
        scores: {
          Pairs: 2,
          with: 3,
          Omiai: 1,
          Tinder: 0,
          newmatch: 4,
          タップル: 0,
        },
      },
    ],
  },

  {
    id: 'timing',
    title: 'Q5. 出会うならどっち？',
    choices: [
      {
        label: 'すぐ会いたい',
        scores: {
          Pairs: 0,
          with: 0,
          Omiai: 0,
          Tinder: 4,
          newmatch: 2,
          タップル: 3,
        },
      },
      {
        label: '少し話してから',
        scores: {
          Pairs: 2,
          with: 3,
          Omiai: 1,
          Tinder: 0,
          newmatch: 3,
          タップル: 0,
        },
      },
      {
        label: '電話してから',
        scores: {
          Pairs: 3,
          with: 2,
          Omiai: 2,
          Tinder: 0,
          newmatch: 1,
          タップル: 0,
        },
      },
      {
        label: 'メッセージ派',
        scores: {
          Pairs: 2,
          with: 2,
          Omiai: 3,
          Tinder: 0,
          newmatch: 1,
          タップル: 0,
        },
      },
    ],
  },
]

const meatFishQuestions = [
  {
    title: "今の気分は？",
    choices: [
      {
        label: "🔥 元気いっぱい",
        meat: 2,
        fish: 0,
      },
      {
        label: "🙂 普通",
        meat: 1,
        fish: 1,
      },
      {
        label: "😮‍💨 疲れた",
        meat: 0,
        fish: 2,
      },
    ],
  },

  {
    title: "今日の満腹度は？",
    choices: [
      {
        label: "🍖 お腹ペコペコ",
        meat: 2,
        fish: 0,
      },
      {
        label: "🍚 普通",
        meat: 1,
        fish: 1,
      },
      {
        label: "🥗 軽めがいい",
        meat: 0,
        fish: 2,
      },
    ],
  },

  {
    title: "今日は…",
    choices: [
      {
        label: "🎉 ご褒美気分",
        meat: 2,
        fish: 0,
      },
      {
        label: "☀️ いつも通り",
        meat: 1,
        fish: 1,
      },
      {
        label: "🌿 ヘルシーにしたい",
        meat: 0,
        fish: 2,
      },
    ],
  },
]

const meatMessages = [
  "細かいことは焼いて忘れよう。",
  "タンパク質は裏切らない。",
  "焼けばだいたい正解。",
  "今日は財布に聞かない。",
  "カロリーとは一旦、距離を置こう。",
  "肉を選んだ自分を信じよう。",
  "今日は本能の勝ち。",
  "ステーキが君を待っている。",
]

const fishMessages = [
  "肉は逃げない。また会える。",
  "今日は海の気分ってことで。",
  "未来の自分がちょっと喜ぶ。",
  "今日は体にポイント加算。",
  "魚もたまには主役。",
  "焼き魚、意外とアリ。",
  "ヘルシーにも全力で。",
  "今日は賢い選択だったかも。",
]

const riceBreadQuestions = [
  {
    title: "⏰ 今、何分ある？",
    choices: [
      { label: "⏰ 5分しかない", rice: 0, bread: 2 },
      { label: "🙂 15分くらい", rice: 1, bread: 1 },
      { label: "🍽️ ゆっくり食べられる", rice: 2, bread: 0 },
    ],
  },
  {
    title: "🚫 洗い物は…",
    choices: [
      { label: "🙅 したくない", rice: 0, bread: 2 },
      { label: "😐 どっちでも", rice: 1, bread: 1 },
      { label: "🍽️ むしろ平気", rice: 2, bread: 0 },
    ],
  },
  {
    title: "🤔 実はもう決まってるんじゃない？",
    subText: "ここで嘘をつくと診断も困ります。",
    choices: [
      { label: "🍚 本当は米が食べたい", rice: 3, bread: 0 },
      { label: "🍞 本当はパンが食べたい", rice: 0, bread: 3 },
      { label: "🤷 だから決められない", rice: 1, bread: 1 },
    ],
  },
]

const convenienceQuestions = [
  {
    title: "⏰ 今どれくらいお腹すいてる？",
    choices: [
      { label: "😵 今すぐ食べたい", convenience: 2, cooking: 0 },
      { label: "🙂 まあ普通", convenience: 1, cooking: 1 },
      { label: "🍵 まだ少し大丈夫", convenience: 0, cooking: 2 },
    ],
  },
  {
    title: "🧑‍🍳 料理する元気は？",
    choices: [
      { label: "😴 今日は無理", convenience: 2, cooking: 0 },
      { label: "🤷 どっちでも", convenience: 1, cooking: 1 },
      { label: "💪 作る気ある", convenience: 0, cooking: 2 },
    ],
  },
  {
    title: "💰 お財布は？",
    subText: "見栄より残高。",
    choices: [
      { label: "💸 節約したい", convenience: 0, cooking: 3 },
      { label: "💳 気にしない", convenience: 3, cooking: 0 },
      { label: "🤔 その時の気分", convenience: 1, cooking: 1 },
    ],
  },
]

const convenienceMessages = [
  "今日は文明に頼ろう。",
  "レジまで歩けば勝ち。",
  "ホットスナックが呼んでる。",
  "時間を買う日もある。",
  "今日はラクしていい。",
  "新商品チェックの日。",
  "電子レンジに任せよう。",
  "迷ったらおにぎり。",
]

const cookingMessages = [
  "未来の自分が喜ぶ。",
  "冷蔵庫を信じよう。",
  "節約ポイント獲得。",
  "意外と作れば早い。",
  "今日のシェフは君。",
  "冷蔵庫の食材を救出。",
  "一口目の達成感は格別。",
  "作ったご飯はうまい。",
]

const riceMessages = [
  "白米は裏切らない。",
  "結局これが落ち着く。",
  "炊飯器が君を待ってる。",
  "日本人のDNAがそう言ってる。",
  "今日くらい茶碗を持とう。",
  "おかわりは禁止してません。",
  "米粒一つ残さずいこう。",
  "ご飯のお供も喜んでる。",
]

const breadMessages = [
  "今日の主役は小麦。",
  "パンの香りは正義。",
  "焼きたてなら勝ち。",
  "バターが待ってる。",
  "パン屋に呼ばれてる気がする。",
  "サンドイッチも立派なご飯。",
  "クロワッサンが本気を出してる。",
  "今日はパン派でいこう。",
]

const randomFoodItems = [
  { emoji: "🍜", name: "ラーメン", message: "今日は麺に任せよう。" },
  { emoji: "🍛", name: "カレー", message: "迷った日はカレーで正解。" },
  { emoji: "🍣", name: "寿司", message: "今日は少しだけ贅沢。" },
  { emoji: "🥩", name: "焼肉", message: "細かいことは焼いて忘れよう。" },
  { emoji: "🍔", name: "ハンバーガー", message: "片手で食べられる正義。" },
  { emoji: "🍕", name: "ピザ", message: "丸いものはだいたい平和。" },
  { emoji: "🍝", name: "パスタ", message: "今日はちょっと気取っていこう。" },
  { emoji: "🍙", name: "おにぎり", message: "結局これが落ち着く。" },
  { emoji: "🍜", name: "うどん", message: "やさしさをすすろう。" },
  { emoji: "🥟", name: "餃子", message: "焼けばテンションも上がる。" },
  { emoji: "🍗", name: "唐揚げ", message: "揚げ物は気分も上げる。" },
  { emoji: "🍳", name: "オムライス", message: "今日は黄色い幸せ。" },
]

const resultData = {
  Pairs: {
    logo: pairsLogo,
  emoji: '👫',
  type: 'じっくりタイプ',
  description: "相手をじっくり知ってから\n恋を始めたいあなたへ。",
  reasons: [
    '真剣な恋人探しがしやすい',
    '利用者数が多く出会いやすい',
    '価値観重視で相手を選べる',
  ],
  },
  with: {
  logo: withLogo,
  emoji: "🤝",
  type: '打ち解け重視タイプ',
  description: "相性や価値観を大切にしながら\n恋をしたいあなたへ。",
  reasons: [
    '価値観の合う相手を探しやすい',
    '会話のきっかけを作りやすい',
    '内面を重視して出会える',
  ],
},
 Omiai: {
  logo: omiaiLogo,
  emoji: "❤️",
  type: '本気恋愛タイプ',
  description: '遊びじゃなく\n本気の恋をしたいタイプ。',
  reasons: [
    '結婚を見据えた恋愛がしやすい',
    '真剣度の高い会員が多い',
    '安心して恋活できる',
  ],
},
  Tinder: {
  logo: tinderLogo,
  emoji: "🔥",
  type: '行動派タイプ',
  description: "「まず会ってみたい」\n行動派のあなたに。",
  reasons: [
    '気軽に出会いを探せる',
    'すぐ会いたい人が多い',
    '世界中の人とマッチできる',
  ],
},
 newmatch: {
  logo: newmatchLogo,
  emoji: '🎉',
  type: '気軽派タイプ',
  description: "肩の力を抜いて\n自然な出会いを楽しみたいあなたへ。",
  reasons: [
    '新しいサービスでライバルが少ない',
    '気軽な恋活から始められる',
    '同世代と出会いやすい',
  ],
},
  タップル: {
    logo: tappleLogo,
  emoji: '☕️',
  type: 'デート好きタイプ',
  description: "デートから自然に\n仲良くなりたいあなたへ。",
  reasons: [
    'デート相手を探しやすい',
    '趣味から出会える',
    '気軽な恋愛向き',
  ],
},
};
const affiliateLinks = {
  Pairs: {
    男性: 'https://example.com/pairs-men',
    女性: 'https://example.com/pairs-women',
    共通: 'https://example.com/pairs',
  },
  with: {
    男性: 'https://example.com/with-men',
    女性: 'https://example.com/with-women',
    共通: 'https://example.com/with',
  },
  Omiai: {
    男性: 'https://example.com/omiai-men',
    女性: 'https://example.com/omiai-women',
    共通: 'https://example.com/omiai',
  },
  Tinder: {
    男性: 'https://example.com/tinder-men',
    女性: 'https://example.com/tinder-women',
    共通: 'https://example.com/tinder',
  },
  newmatch: {
    男性: 'https://example.com/newmatch-men',
    女性: 'https://example.com/newmatch-women',
    共通: 'https://example.com/newmatch',
  },
  タップル: {
    男性: 'https://example.com/tapple-men',
    女性: 'https://example.com/tapple-women',
    共通: 'https://example.com/tapple',
  },
}
function Logo({ position = "center" }) {
  return (
    <div className={`logo ${position}`}>
      <img
        src={kimeruLogo}
        alt="決める。"
        className="logo-image"
      />
    </div>
  );
}

function createEmptyScores() {
  return Object.fromEntries(appNames.map((appName) => [appName, 0]))
}

function calculateResult(answers) {
  const scores = createEmptyScores()

  answers.forEach((answer) => {
    if (!answer?.scores) return

    appNames.forEach((appName) => {
      scores[appName] += answer.scores[appName] ?? 0
    })
  })

  const winner = appNames.reduce((bestApp, currentApp) => {
    return scores[currentApp] > scores[bestApp]
      ? currentApp
      : bestApp
  })

  return {
    winner,
    scores,
  }
}

function App() {
  const [page, setPage] = useState('home')
  const Header = ({ setPage }) => (
  <header className="home-header">
    <img
      src={logoHorizontal}
      alt="決める。"
      className="home-logo"
      onClick={() => {
  setFoodQuestionIndex(0)
  setFoodSelectedChoice(null)
  setFoodAnswers([])
  setFoodResult(null)
  setPage("home")
}}
      style={{ cursor: "pointer" }}
    />

    <nav className="home-nav">
      <button onClick={() => setPage("diagnosis-list")}>
        診断
      </button>

      <button>記事</button>
      <button>お気に入り</button>
      <button className="menu-button">☰</button>
    </nav>
  </header>
);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [answers, setAnswers] = useState([])
  const [diagnosis, setDiagnosis] = useState(null)

  const [foodQuestionIndex, setFoodQuestionIndex] = useState(0)

const [foodSelectedChoice, setFoodSelectedChoice] =
  useState(null)

const [foodAnswers, setFoodAnswers] = useState([])

const [foodResult, setFoodResult] =
  useState(null)

  const [foodMessage, setFoodMessage] = useState("")

const [randomFoodResult, setRandomFoodResult] = useState(null)

  const currentQuestion = questions[questionIndex]

  const currentQuestions =
  page === "meat-fish"
    ? meatFishQuestions
    : riceBreadQuestions

const currentFoodQuestions =
  page === "meat-fish"
    ? meatFishQuestions
    : page === "rice-bread"
    ? riceBreadQuestions
    : convenienceQuestions

const currentFoodQuestion =
  currentFoodQuestions[foodQuestionIndex]

  const winnerData = diagnosis
  ? resultData[diagnosis.winner]
  : null
  const handleNextQuestion = (choice) => {
    if (!choice) return

    const updatedAnswers = [...answers]
    updatedAnswers[questionIndex] = choice
    setAnswers(updatedAnswers)

    const isLastQuestion =
      questionIndex === questions.length - 1

    if (isLastQuestion) {
      const result = calculateResult(updatedAnswers)
      setDiagnosis(result)
      setPage('result')
      return
    }

    setQuestionIndex((current) => current + 1)
    setSelectedChoice(null)
  }

  const handlePreviousQuestion = () => {
  if (questionIndex === 0) return

  const previousIndex = questionIndex - 1

  setQuestionIndex(previousIndex)
  setSelectedChoice(answers[previousIndex] ?? null)
}

const handlePreviousFoodQuestion = () => {
  if (foodQuestionIndex === 0) return

  const previousIndex = foodQuestionIndex - 1

  setFoodQuestionIndex(previousIndex)
  setSelectedFoodChoice(foodAnswers[previousIndex] ?? null)
}

   const handleFoodChoice = (choice) => {
  const updatedAnswers = [...foodAnswers, choice]
  setFoodAnswers(updatedAnswers)

  const isLastQuestion =
    foodQuestionIndex === currentFoodQuestions.length - 1

  if (isLastQuestion) {
    if (page === "meat-fish") {
      const meatScore = updatedAnswers.reduce(
        (total, answer) => total + answer.meat,
        0
      )

      const fishScore = updatedAnswers.reduce(
        (total, answer) => total + answer.fish,
        0
      )

      let result

      if (meatScore > fishScore) {
        result = "meat"
      } else if (fishScore > meatScore) {
        result = "fish"
      } else {
        result = Math.random() < 0.5 ? "meat" : "fish"
      }

     const messages =
  result === "meat"
    ? meatMessages
    : fishMessages

const randomMessage =
  messages[Math.floor(Math.random() * messages.length)]

setFoodMessage(randomMessage)
setFoodResult(result)
setPage("meat-fish-result")
return
    }

    if (page === "rice-bread") {
  const riceScore = updatedAnswers.reduce(
    (total, answer) => total + answer.rice,
    0
  )

  const breadScore = updatedAnswers.reduce(
    (total, answer) => total + answer.bread,
    0
  )

  let result

  if (riceScore > breadScore) {
    result = "rice"
  } else if (breadScore > riceScore) {
    result = "bread"
  } else {
    result = Math.random() < 0.5 ? "rice" : "bread"
  }

  const messages =
    result === "rice"
      ? riceMessages
      : breadMessages

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)]

  setFoodMessage(randomMessage)
  setFoodResult(result)
  setPage("rice-bread-result")
  return
}
if (page === "conveni-home") {
  const convenienceScore = updatedAnswers.reduce(
    (total, answer) => total + answer.convenience,
    0
  )

  const cookingScore = updatedAnswers.reduce(
    (total, answer) => total + answer.cooking,
    0
  )

  let result

  if (convenienceScore > cookingScore) {
    result = "convenience"
  } else if (cookingScore > convenienceScore) {
    result = "cooking"
  } else {
    result = Math.random() < 0.5 ? "convenience" : "cooking"
  }

  const messages =
    result === "convenience"
      ? convenienceMessages
      : cookingMessages

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)]

  setFoodMessage(randomMessage)
  setFoodResult(result)
  setPage("conveni-home-result")
  return
}
  }

  setFoodQuestionIndex((current) => current + 1)
}

const handleRandomFood = () => {
  const randomIndex = Math.floor(
    Math.random() * randomFoodItems.length
  )

  setRandomFoodResult(randomFoodItems[randomIndex])
  setPage("random-food-result")
}

  const handleRestart = () => {
    setQuestionIndex(0)
    setSelectedChoice(null)
    setAnswers([])
    setDiagnosis(null)
    setPage('intro')
  }

  const handleStartDiagnosis = () => {
  setQuestionIndex(0)
  setSelectedChoice(null)
  setAnswers([])
  setDiagnosis(null)
  setPage('intro')
}

if (page === 'home') {
  return (
    <main className="home-page">
      
      <Header setPage={setPage} />

      <section className="home-hero">
        <img
  src={kimeruLogoMark}
  alt="決める。"
  className="intro-main-logo"
/>
        <h1>
  迷ったら
  <br />
  <span>
    決める
    <span className="home-accent">。</span>
  </span>
</h1>

        <p>
  情報を増やさない。<span className="home-accent">答えを出す。</span>
</p>

        <button
          type="button"
          className="home-start-button"
          onClick={() => setPage('diagnosis-list')}
        >
          診断をはじめる
        </button>
      </section>
<section className="about-section">
  <div className="about-text">
    <h2>決める。とは？</h2>

    <div className="about-line"></div>

    <p>
      選択肢が多すぎて、
      <br />
      何を選べばいいか分からない。
      <br />
      そんな迷いに、
      <br />
      いくつかの質問から答えを出します。
    </p>

    <p className="about-bottom">
      情報を増やさない。
      <br />
      あなたの次の一歩を
      <span>決める。</span>
    </p>
  </div>
</section>

<section className="future-categories-section">
  <p className="future-categories-label">
    COMING NEXT
  </p>


  <div className="future-categories-grid">
    <div className="future-category-card">
      恋愛
    </div>

    <div className="future-category-card">
      仕事
    </div>

    <div className="future-category-card">
      お金
    </div>

    <div className="future-category-card">
      暮らし
    </div>

    <div className="future-category-card">
      今日のごはん
    </div>

    <div className="future-category-card">
      その他
    </div>
  </div>

  <p className="future-categories-message">
    次は、何を決めよう。
  </p>
</section>
    </main>
  )
}

if (page === 'diagnosis-list') {
  return (
    <main className="diagnosis-list-page">
      <Header setPage={setPage} />

      <section className="diagnosis-list-content">
        <p className="diagnosis-list-label">DIAGNOSIS</p>
        <h1>診断を選ぶ。</h1>
        <p className="diagnosis-list-description">
          今のあなたに必要な答えを、
          <br />
          ここから選ぼう。
        </p>

        <article className="diagnosis-card">
          <div className="diagnosis-card-icon">♡</div>

          <div className="diagnosis-card-body">
            <p className="diagnosis-card-status">公開中</p>
            <h2>マッチングアプリ診断</h2>
            <p>
              5つの質問から、
              <br />
              あなたに合うアプリを決めます。
            </p>
          </div>

          <button
            type="button"
            className="diagnosis-card-button"
            onClick={handleStartDiagnosis}
          >
            診断する
          </button>
        </article>

<article className="diagnosis-card food-diagnosis-card">
  <div className="diagnosis-card-icon">🍚</div>

  <div className="diagnosis-card-body">
    <p className="diagnosis-card-status">公開中</p>

    <h2>今日のごはん</h2>

    <p>
      肉か魚、米かパン。
      <br />
      今日の迷いを決めます。
    </p>
  </div>

  <button
    type="button"
    className="diagnosis-card-button"
    onClick={() => setPage('food-list')}
  >
    選ぶ
  </button>
</article>

        <section className="coming-soon">
          <p className="coming-soon-label">COMING SOON</p>

          <div className="coming-soon-grid">
            <div className="coming-soon-card">
              <span>仕事</span>
              <p>転職診断</p>
            </div>

            <div className="coming-soon-card">
              <span>副業</span>
              <p>副業診断</p>
            </div>

            <div className="coming-soon-card">
              <span>暮らし</span>
              <p>引っ越し診断</p>
            </div>

            <div className="coming-soon-card">
              <span>お金</span>
              <p>クレジットカード診断</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

if (page === 'food-list') {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section className="food-hero">
        <div className="food-icon">🍚</div>

        <h1>今日のごはん</h1>

        <p>
          今日は何を決める？
        </p>
      </section>

      <section className="food-menu page-fade">

        <button
  className="food-card"
  onClick={() => setPage("meat-fish")}
>
  <span className="food-card-icon">🥩</span>

  <div className="food-card-text">
    <h3>肉か魚</h3>
    <p>今日はどっち？</p>
  </div>

  <span className="food-card-arrow">›</span>
</button>

        <button
  className="food-card"
  onClick={() => {
  setFoodQuestionIndex(0)
  setFoodAnswers([])
  setFoodResult(null)
  setFoodMessage("")
  setPage("rice-bread")
}}
>
  <span className="food-card-icon">🍞</span>

  <div className="food-card-text">
    <h3>米かパン</h3>
    <p>今日はどっち？</p>
  </div>

  <span className="food-card-arrow">›</span>
</button>

        <button
  className="food-card"
  onClick={() => setPage("conveni-home")}
>
  <span className="food-card-icon">🏪</span>

  <div className="food-card-text">
    <h3>コンビニか自炊か</h3>
    <p>今日はどっち？</p>
  </div>

  <span className="food-card-arrow">›</span>
</button>


        <div className="food-random-area">

  <p className="food-random-label">
    迷ったらこれ。
  </p>

  <button
    className="food-random"
    onClick={handleRandomFood}
  >
    🎲 とりあえず決めて
  </button>

</div>

      </section>
    </main>
  )
}

if (
  page === "meat-fish" ||
  page === "rice-bread" ||
  page === "conveni-home"
) {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section
  key={foodQuestionIndex}
  className="question-page page-fade"
>
  {foodQuestionIndex > 0 && (
  <button
    type="button"
    className="back-icon-button"
    onClick={handlePreviousFoodQuestion}
    aria-label="前の質問へ戻る"
  >
    <ArrowLeft size={22} strokeWidth={2.2} />
  </button>
)}
        <p className="question-number">
          Q{foodQuestionIndex + 1}
        </p>

        <h2 className="question-title">
          {currentFoodQuestion.title}
        </h2>

{currentFoodQuestion.subText && (
  <p className="question-subtext">
    {currentFoodQuestion.subText}
  </p>
)}

        <div className="question-options">
          {currentFoodQuestion.choices.map((choice, index) => (
            <button
  key={index}
  className="question-option"
  onClick={() => handleFoodChoice(choice)}
>
  {choice.label}
</button>
          ))}
        </div>
      </section>
    </main>
  )
}

if (page === "random-food-result" && randomFoodResult) {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section className="food-result-page page-fade">
        <div className="food-result-emoji">
          {randomFoodResult.emoji}
        </div>

        <h1 className="food-result-title">
          今日は
          <br />
          {randomFoodResult.name}
        </h1>

        <p className="food-result-text">
          {randomFoodResult.message}
        </p>

        <button
          className="food-restart-button"
          onClick={handleRandomFood}
        >
          もう一度決める
        </button>
      </section>
    </main>
  )
}

 if (page === "meat-fish-result") {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section className="food-result-page page-fade">
        <div className="food-result-emoji">
          {foodResult === "meat" ? "🥩" : "🐟"}
        </div>

        <h1 className="food-result-title">
          {foodResult === "meat"
            ? "今日は肉"
            : "今日は魚"}
        </h1>

        <p className="food-result-text">
          {foodMessage}
        </p>

        <button
          className="food-restart-button"
          onClick={() => {
            setFoodQuestionIndex(0)
            setFoodAnswers([])
            setFoodResult(null)
            setFoodMessage("")
            setPage("meat-fish")
          }}
        >
          もう一度決める
        </button>
      </section>
    </main>
  )
}

if (page === "conveni-home-result") {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section className="food-result-page page-fade">
        <div className="food-result-emoji">
          {foodResult === "convenience" ? "🏪" : "🍳"}
        </div>

        <h1 className="food-result-title">
  {foodResult === "convenience" ? (
    <>
      今日は
      <br />
      コンビニ
    </>
  ) : (
    "今日は自炊"
  )}
</h1>

        <p className="food-result-text">
          {foodMessage}
        </p>

        <button
          className="food-restart-button"
          onClick={() => {
            setFoodQuestionIndex(0)
            setFoodAnswers([])
            setFoodResult(null)
            setFoodMessage("")
            setPage("conveni-home")
          }}
        >
          もう一度決める
        </button>
      </section>
    </main>
  )
}

if (page === "rice-bread-result") {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section className="food-result-page page-fade">
        <div className="food-result-icon">
          {foodResult === "rice" ? "🍚" : "🍞"}
        </div>

        <h1 className="food-result-title">
          {foodResult === "rice"
            ? "今日は米"
            : "今日はパン"}
        </h1>

        <p className="food-result-text">
  {foodMessage}
</p>

        <button
  className="food-restart-button"
          onClick={() => {
            setFoodQuestionIndex(0)
            setFoodAnswers([])
            setFoodResult(null)
            setPage("rice-bread")
          }}
        >
          もう一度決める
        </button>
      </section>
    </main>
  )
}

  if (page === 'intro') {
  return (
    <main className="app-page intro-page">
      <Header setPage={setPage} />

      <section className="intro-hero">
        <img
  src={kimeruLogoTransparent}
  alt="決める。"
  className="intro-main-logo"
/>

        <h1>
          <span>マッチングアプリを</span>
          <span>決める。</span>
        </h1>

        <div className="intro-hero-copy">
          <p>あなたに合うアプリを</p>
          <p>一緒に決めよう。</p>
        </div>

        <div className="intro-points">
          <p>✓ 5つの質問</p>
          <p>✓ 約1分で完了</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setQuestionIndex(0)
            setSelectedChoice(null)
            setAnswers([])
            setDiagnosis(null)
            setPage('questions')
          }}
        >
          決めてみる。
        </button>
      </section>
    </main>
  )
}

 if (page === 'questions') {
  return (
    <main className="food-page">
      <Header setPage={setPage} />

      <section
        key={questionIndex}
        className="question-page page-fade"
      >
        {questionIndex > 0 && (
  <button
    type="button"
    className="back-icon-button"
    onClick={handlePreviousQuestion}
    aria-label="前の質問に戻る"
  >
    <ArrowLeft size={22} strokeWidth={2.2} />
  </button>
)}
        <p className="question-number">
          質問 {questionIndex + 1} / {questions.length}
        </p>

        <h2 className="question-title">
          {currentQuestion.title}
        </h2>

        <div className="question-options">
          {currentQuestion.choices.map((choice) => (
            <button
              key={choice.label}
              className="question-option"
              onClick={() => {
                setSelectedChoice(choice)

                setTimeout(() => {
                  handleNextQuestion(choice)
                }, 180)
              }}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
  if (page === 'result' && diagnosis) {

  const gender =
    answers.find(
      (answer, index) => questions[index].id === 'gender',
    )?.label ?? '回答しない'


const linkType =
  gender === '男性' || gender === '女性'
    ? gender
    : '共通'

const affiliateUrl =
  affiliateLinks[diagnosis.winner][linkType]
  return (
    <main className="app-page result-page">
      <Header setPage={setPage} />

      <section className="diagnosis-result">
        <h1 className="result-type">
          {winnerData.emoji}
          {winnerData.type}
        </h1>

        <p className="result-description">
          {winnerData.description}
        </p>

        <p className="result-heading">君に合うのは</p>
{winnerData.logo && (
  <img
    src={winnerData.logo}
    alt={`${diagnosis.winner}のロゴ`}
    className={`app-logo app-logo-${diagnosis.winner}`}
  />
)}
        

  
        {winnerData.reasons && (
          <div className="reason-card">
            <h3>おすすめな理由</h3>

            <ul>
              {winnerData.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="primary-button result-button"
          onClick={() => {
  window.open(
    affiliateUrl,
    '_blank',
    'noopener,noreferrer',
  )
}}
        >
          {diagnosis.winner}を始める。
        </button>

        <button
          className="restart-button"
          onClick={handleRestart}
        >
          もう一度診断する
        </button>
      </section>
    </main>
  )
}
 return null
}

export default App