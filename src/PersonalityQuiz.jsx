import "./PersonalityResult.css";
import html2canvas from "html2canvas";
import { personalityResults } from "./personalityResultData";
import { ArrowLeft } from "lucide-react";
import { calculatePersonalityStats } from "./personalityStats";
import {
  personalityQuestions,
  personalityTypeNames,
} from "./personalityQuizData";
import { useState, useEffect } from "react";
export default function PersonalityQuiz({ onFinishedChange }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(Array(8).fill(0));
const [selectedOption, setSelectedOption] = useState(null);
const [isTransitioning, setIsTransitioning] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
const [answerHistory, setAnswerHistory] = useState([]);
const [resultRating, setResultRating] = useState(null);
useEffect(() => {
  if (resultRating === null) return;

  const timer = setTimeout(() => {
    setResultRating("done");
  }, 2000);

  return () => clearTimeout(timer);
}, [resultRating]);
  const [finished, setFinished] = useState(false);

  const question = personalityQuestions[currentQuestion];
  const progress =
  ((currentQuestion + 1) / personalityQuestions.length) * 100;

 const handleAnswer = (answerScores, optionIndex) => {
  if (isTransitioning) return;

  setSelectedOption(optionIndex);
  setIsTransitioning(true);

  setTimeout(() => {
    const newScores = scores.map(
      (score, index) => score + answerScores[index]
    );

    console.log("今回の配点:", answerScores);
console.log("加算後のスコア:", newScores);

    setScoreHistory((history) => [...history, answerScores]);
    setAnswerHistory((history) => [...history, optionIndex]);
    setScores(newScores);

    const isLastQuestion =
      currentQuestion === personalityQuestions.length - 1;

    if (isLastQuestion) {
  setFinished(true);
  onFinishedChange?.(true);
      setSelectedOption(null);
      setIsTransitioning(false);
      return;
    }

    setCurrentQuestion((current) => current + 1);
    setSelectedOption(null);
    setIsTransitioning(false);
  }, 180);
};

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return;

    const previousScores = scoreHistory[scoreHistory.length - 1];

    if (previousScores) {
      setScores((currentScores) =>
        currentScores.map(
          (score, index) => score - previousScores[index]
        )
      );
    }

    setScoreHistory((history) => history.slice(0, -1));

setAnswerHistory((history) => history.slice(0, -1));

    setCurrentQuestion((current) => current - 1);

    setSelectedOption(null);
setIsTransitioning(false);
  };

  const handleSaveResultImage = async () => {
  const resultElement = document.getElementById(
    "personality-result-capture"
  );

  if (!resultElement) {
    return;
  }

  try {
    const canvas = await html2canvas(resultElement, {
  backgroundColor: null,
  scale: 3,
  useCORS: true,
});

    const imageUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "陽キャ陰キャ診断結果.png";
    downloadLink.click();
  } catch (error) {
    console.error("結果画像の保存に失敗しました。", error);
  }
};

 if (finished) {
  const maxScore = Math.max(...scores);
  const resultIndex = scores.indexOf(maxScore);

  console.log("最終スコア:", scores);
console.log("最大スコア:", maxScore);
console.log("結果番号:", resultIndex);

const result = personalityResults[resultIndex];

const personalityStats = calculatePersonalityStats(answerHistory);

const resultThemes = [
  { color: "#FF8A32", accent: "#FFE4A8" },
  { color: "#F4B83F", accent: "#FFF0B8" },
  { color: "#72BFA1", accent: "#D9F5E8" },
  { color: "#E78DA8", accent: "#FFE0EA" },
  { color: "#9B8CD8", accent: "#E8DEFF" },
  { color: "#6489BE", accent: "#D9E8FF" },
  { color: "#7A9BBD", accent: "#E0ECF5" },
  { color: "#63738F", accent: "#DCE3F0" },
];

const theme = resultThemes[resultIndex];

  return (
   <section className="personality-result-page page-fade">
    <p className="personality-result-heading">
  あなたのキャラタイプ
</p>
<div
  id="personality-result-capture"
  className="personality-result-hero"
  style={{ backgroundColor: result.backgroundColor }}
>


  <h1 className="personality-result-type">
    {result.type}
  </h1>

  <p className="personality-result-subtitle">
    {result.subtitle}
  </p>

 <img
  src={result.image}
  alt={result.type}
  className={`personality-result-image personality-character-${result.id}`}
/>


</div>

      <div className="personality-result-content">
      <section className="personality-result-section personality-feature-section">
  <h2 className="personality-section-title">
    🌟 君の特徴
  </h2>

  <div className="personality-feature-list">
    {result.featureSections.map((feature) => (
      <div
        key={feature.title}
        className="personality-feature-item"
      >
        <h3 className="personality-feature-title">
          <span aria-hidden="true">{feature.icon}</span>
          {feature.title}
        </h3>

        <p className="personality-feature-text">
          {feature.text}
        </p>
      </div>
    ))}
  </div>

  <p className="personality-feature-message">
    {result.featureMessage}
  </p>
</section>


<section className="personality-result-section personality-stats-section">
  <h2>📊 君の裏ステータス</h2>

  <div className="personality-stats-card">
    {personalityStats.map((stat) => (
      <div className="personality-stat-item" key={stat.id}>
        <h3 className="personality-stat-title">
          {stat.emoji} {stat.name}
        </h3>

        <p className="personality-stat-description">
          {stat.description}
        </p>

        <div className="personality-stat-labels">
          <span>{stat.left}</span>
          <span>{stat.right}</span>
        </div>

        <div className="personality-stat-track">
          <div
            className="personality-stat-fill"
            style={{
              width: `${stat.value}%`,
              backgroundColor: stat.color,
            }}
          />
        </div>

        <p className="personality-stat-value">
          {stat.value}%
        </p>
      </div>
    ))}
  </div>
</section>

        <section className="personality-result-section">
          <h2>💪 君の強み</h2>

          
<ul>
  {result.strengths.map((strength, index) => (
    <li key={index}>
      {typeof strength === "string" ? (
        strength
      ) : (
        <div className="personality-strength-content">
          <strong className="personality-strength-title">
            {strength.title}
          </strong>
          <p className="personality-strength-description">
            {strength.text}
          </p>
        </div>
      )}
    </li>
  ))}
</ul>

        </section>

        <section className="personality-result-section">
          <h2>⚠️ 気をつけたいこと</h2>

          <ul>
            
{result.cautions.map((caution, index) => (
  <li key={index}>
    {typeof caution === "string" ? (
      caution
    ) : (
      <div className="personality-strength-content">
        <strong className="personality-strength-title">
          {caution.title}
        </strong>
        <p className="personality-strength-description">
          {caution.text}
        </p>
      </div>
    )}
  </li>
))}

          </ul>
        </section>

        <section className="personality-result-section">
          <h2>❤️ 恋愛傾向</h2>

          <div
  className="personality-result-description love-text"
  dangerouslySetInnerHTML={{ __html: result.love }}
/>

        </section>

       
<section className="personality-result-section personality-manual-section">
  <h2>📖 取り扱い説明書</h2>

  <div className="personality-manual-list">
    {result.manual?.map((item) => (
      <div className="personality-manual-item" key={item.title}>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    ))}
  </div>
</section>


        

     <section
  className={`personality-result-ending personality-character-${result.id}`}
>
          <h2>{result.ending.title}</h2>

          <p>{result.ending.message}</p>

          <strong>{result.ending.quote}</strong>
        </section>

<div className="personality-result-rating">
  {resultRating === null ? (
    <>
      <p>今回の診断結果はどのくらい当たってた？</p>

      <div className="personality-rating-options">
        {["🙁", "😐", "🙂", "😄"].map((face, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setResultRating(index + 1)}
            aria-label={`4段階中${index + 1}`}
          >
            {face}
          </button>
        ))}
      </div>
    </>
) : resultRating === "done" ? null : (
  <p className="personality-rating-thanks">
    回答ありがとう！✨
  </p>
)}
</div>


  

      </div>
    </section>
  );
}

  return (
  <section
    key={currentQuestion}
    className="question-page page-fade"
  >
        {currentQuestion > 0 && (
          <button
            type="button"
            className="back-icon-button"
            onClick={handlePreviousQuestion}
            aria-label="前の質問へ戻る"
          >
            <ArrowLeft size={22} strokeWidth={2.2} />
          </button>
        )}

        <p className="question-number">
          Q{currentQuestion + 1} / {personalityQuestions.length}
        </p>

<div className="personality-progress">
  <div
    className="personality-progress-bar"
    style={{ width: `${progress}%` }}
  />
</div>

        <h2 className="question-title">
          {question.question}
        </h2>

        <div className="question-options">
          {question.options.map((option, index) => (
            <button
  key={`${question.id}-${index}`}
  type="button"
  className={`question-option ${
    selectedOption === index ? "selected" : ""
  }`}
  onClick={() => handleAnswer(option.scores, index)}
  disabled={isTransitioning}
>
  {option.text}
</button>
          ))}
        </div>
      </section>
  );
}