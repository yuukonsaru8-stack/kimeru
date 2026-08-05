import html2canvas from "html2canvas";
import { personalityResults } from "./personalityResultData";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  personalityQuestions,
  personalityTypeNames,
} from "./personalityQuizData";

export default function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(Array(8).fill(0));
const [selectedOption, setSelectedOption] = useState(null);
const [isTransitioning, setIsTransitioning] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
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

    setScoreHistory((history) => [...history, answerScores]);
    setScores(newScores);

    const isLastQuestion =
      currentQuestion === personalityQuestions.length - 1;

    if (isLastQuestion) {
      setFinished(true);
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
  backgroundColor: "#fffaf5",
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

  const result =
    personalityResults[resultIndex] ?? personalityResults[0];

  return (
    <section
  className="personality-result-page page-fade"
>
      <div
  id="personality-result-capture"
  className="personality-result-hero"
>
        <p className="personality-result-label">
          診断結果
        </p>

        <h1 className="personality-result-type">
          {result.type}
        </h1>

        <p className="personality-result-subtitle">
          {result.subtitle}
        </p>

        <img
          src={result.image}
          alt={result.type}
          className="personality-result-image"
        />

        <p className="personality-result-summary">
          {result.summary}
        </p>
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

        <section className="personality-result-section">
          <h2>💪 君の強み</h2>

          <ul>
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
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

        <section className="personality-result-section">
          <h2>🎯 君に向いていること</h2>

          <ul>
            {result.jobs.map((job) => (
              <li key={job}>{job}</li>
            ))}
          </ul>
        </section>

        <section className="personality-result-section">
          <h2>⚠️ 気をつけたいこと</h2>

          <ul>
            {result.cautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </section>

        <section className="personality-result-ending">
          <h2>{result.ending.title}</h2>

          <p>{result.ending.message}</p>

          <strong>{result.ending.quote}</strong>
        </section>

        <button
          type="button"
          className="food-restart-button personality-restart-button"
          onClick={() => {
            setCurrentQuestion(0);
            setScores(Array(8).fill(0));
            setScoreHistory([]);
            setSelectedOption(null);
            setIsTransitioning(false);
            setFinished(false);
          }}
        >
          もう一度診断する
        </button>

        <button
  type="button"
  className="save-image-button personality-save-button"
  onClick={handleSaveResultImage}
>
  結果を画像で保存
</button>

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