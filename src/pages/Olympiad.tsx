import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface OlympiadResult {
  score: number;
  maxScore: number;
  percentage: number;
  answers: number[];
  timeSpent: string;
  certificateEligible: boolean;
}

// Вопросы для олимпиады по математике (3 класс)
const mathQuestions: Question[] = [
  {
    id: 1,
    question: "Сколько будет 47 + 28?",
    options: ["73", "75", "77", "79"],
    correct: 1,
    explanation: "47 + 28 = 75. Складываем единицы: 7 + 8 = 15 (пишем 5, запоминаем 1). Складываем десятки: 4 + 2 + 1 = 7.",
    points: 3
  },
  {
    id: 2,
    question: "В корзине было 36 яблок. Съели 18 яблок. Сколько яблок осталось?",
    options: ["16", "18", "20", "22"],
    correct: 1,
    explanation: "36 - 18 = 18. Чтобы вычесть 18 из 36, можно разложить: 36 - 10 - 8 = 26 - 8 = 18.",
    points: 3
  },
  {
    id: 3,
    question: "Сколько сантиметров в 2 метрах?",
    options: ["20 см", "100 см", "200 см", "2000 см"],
    correct: 2,
    explanation: "В 1 метре 100 сантиметров, значит в 2 метрах: 2 × 100 = 200 сантиметров.",
    points: 2
  },
  {
    id: 4,
    question: "Какое число пропущено в последовательности: 15, 20, 25, ?, 35",
    options: ["28", "30", "32", "33"],
    correct: 1,
    explanation: "Это арифметическая прогрессия с шагом 5: 15, 20, 25, 30, 35.",
    points: 4
  },
  {
    id: 5,
    question: "У Маши 3 коробки, в каждой по 8 карандашей. Сколько всего карандашей?",
    options: ["21", "24", "26", "28"],
    correct: 1,
    explanation: "3 × 8 = 24 карандаша. Умножаем количество коробок на количество карандашей в каждой коробке.",
    points: 3
  },
  {
    id: 6,
    question: "Периметр квадрата со стороной 7 см равен:",
    options: ["21 см", "28 см", "35 см", "49 см"],
    correct: 1,
    explanation: "Периметр квадрата = 4 × сторона = 4 × 7 = 28 см.",
    points: 4
  },
  {
    id: 7,
    question: "64 ÷ 8 = ?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    explanation: "64 ÷ 8 = 8. Можно проверить: 8 × 8 = 64.",
    points: 3
  },
  {
    id: 8,
    question: "Какое из чисел больше: 156 или 165?",
    options: ["156", "165", "Они равны", "Нельзя определить"],
    correct: 1,
    explanation: "165 > 156. Сравниваем разряды: сотни одинаковые (1), десятки: 6 > 5, значит 165 больше.",
    points: 2
  },
  {
    id: 9,
    question: "В классе 12 мальчиков и 16 девочек. На сколько девочек больше, чем мальчиков?",
    options: ["2", "4", "6", "8"],
    correct: 1,
    explanation: "16 - 12 = 4. Девочек больше на 4 человека.",
    points: 3
  },
  {
    id: 10,
    question: "Сколько минут в 2 часах?",
    options: ["80 минут", "100 минут", "120 минут", "140 минут"],
    correct: 2,
    explanation: "В 1 часе 60 минут, значит в 2 часах: 2 × 60 = 120 минут.",
    points: 2
  }
];

export default function Olympiad() {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(mathQuestions.length).fill(-1));
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<OlympiadResult | null>(null);
  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 минут в секундах

  // Таймер
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleComplete(); // Автоматическое завершение при истечении времени
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer(-1);

    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete(newAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleComplete = (finalAnswers = answers) => {
    if (isCompleted) return;
    
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeSpentStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    let score = 0;
    const maxScore = mathQuestions.reduce((sum, q) => sum + q.points, 0);

    finalAnswers.forEach((answer, index) => {
      if (answer === mathQuestions[index].correct) {
        score += mathQuestions[index].points;
      }
    });

    const percentage = Math.round((score / maxScore) * 100);
    const certificateEligible = percentage >= 70;

    const olympiadResult: OlympiadResult = {
      score,
      maxScore,
      percentage,
      answers: finalAnswers,
      timeSpent: timeSpentStr,
      certificateEligible
    };

    setResult(olympiadResult);
    setIsCompleted(true);
    setShowResults(true);

    toast({
      title: "Олимпиада завершена! 🎉",
      description: `Ваш результат: ${score}/${maxScore} баллов (${percentage}%)`,
    });
  };

  const progress = ((currentQuestion + 1) / mathQuestions.length) * 100;
  const answeredCount = answers.filter(a => a !== -1).length;

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach via-white to-sunshine py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок результатов */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-tangerine/30 mb-6">
              <Icon name="Trophy" className="h-5 w-5 text-tangerine mr-2" />
              <span className="text-darkBlue font-medium">Результаты олимпиады</span>
            </div>
            <h1 className="text-4xl font-bold text-darkBlue mb-4 font-heading">Олимпиада завершена!</h1>
            <p className="text-xl text-darkBlue/80">Математика • 3 класс</p>
          </div>

          {/* Основной результат */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
            <CardHeader className="text-center">
              <div className={`mx-auto mb-4 p-6 rounded-full w-fit ${
                result.percentage >= 90 ? "bg-green-500" : 
                result.percentage >= 80 ? "bg-blue-500" : 
                result.percentage >= 70 ? "bg-yellow-500" : "bg-red-500"
              }`}>
                <Icon name="Award" className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-heading">
                {result.score}/{result.maxScore} баллов
              </CardTitle>
              <CardDescription className="text-xl">
                {result.percentage}% • Время: {result.timeSpent}
              </CardDescription>
              <Badge variant="outline" className={`mt-4 text-lg px-4 py-2 ${
                result.percentage >= 90 ? "border-green-500 text-green-700" : 
                result.percentage >= 80 ? "border-blue-500 text-blue-700" : 
                result.percentage >= 70 ? "border-yellow-500 text-yellow-700" : "border-red-500 text-red-700"
              }`}>
                {result.percentage >= 90 ? "Отлично!" : 
                 result.percentage >= 80 ? "Хорошо!" : 
                 result.percentage >= 70 ? "Удовлетворительно" : "Требует улучшения"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Progress value={result.percentage} className="h-4" />
                {result.certificateEligible && (
                  <div className="bg-gradient-to-r from-sunshine/20 to-tangerine/20 border border-tangerine/30 rounded-lg p-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Icon name="Award" className="h-6 w-6 text-tangerine" />
                      <h3 className="text-xl font-semibold text-darkBlue font-heading">Поздравляем!</h3>
                    </div>
                    <p className="text-darkBlue/80 mb-4">
                      Вы успешно прошли олимпиаду и заработали сертификат участника!
                    </p>
                    <Button className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine">
                      <Icon name="Download" className="mr-2 h-5 w-5" />
                      Скачать сертификат
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Детальные результаты */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="font-heading">Разбор вопросов</CardTitle>
              <CardDescription>Правильные ответы и объяснения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mathQuestions.map((question, index) => {
                  const userAnswer = result.answers[index];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={question.id} className={`p-4 rounded-lg border ${
                      isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}>
                          <Icon 
                            name={isCorrect ? "Check" : "X"} 
                            className="h-4 w-4 text-white" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-darkBlue mb-2">
                            Вопрос {index + 1}: {question.question}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded border text-sm ${
                                  optionIndex === question.correct
                                    ? "border-green-500 bg-green-100 text-green-800"
                                    : optionIndex === userAnswer && !isCorrect
                                    ? "border-red-500 bg-red-100 text-red-800"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                              >
                                {option}
                                {optionIndex === question.correct && (
                                  <Icon name="Check" className="inline ml-2 h-3 w-3" />
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <Icon name="X" className="inline ml-2 h-3 w-3" />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <p className="text-sm text-blue-800">
                              <Icon name="Info" className="inline mr-2 h-4 w-4" />
                              {question.explanation}
                            </p>
                          </div>
                          <div className="mt-2 text-right">
                            <Badge variant="outline">
                              {isCorrect ? `+${question.points}` : "0"} из {question.points} баллов
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Действия */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine"
                onClick={() => window.location.href = '/dashboard'}
              >
                <Icon name="User" className="mr-2 h-5 w-5" />
                Перейти в профиль
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
                onClick={() => window.location.href = '/'}
              >
                <Icon name="Home" className="mr-2 h-5 w-5" />
                На главную
              </Button>
            </div>
            <p className="text-sm text-darkBlue/60">
              Результат автоматически сохранен в вашем профиле
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-white to-sunshine py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-tangerine/30 mb-6">
            <Icon name="Calculator" className="h-5 w-5 text-tangerine mr-2" />
            <span className="text-darkBlue font-medium">Олимпиада по математике</span>
          </div>
          <h1 className="text-4xl font-bold text-darkBlue mb-4 font-heading">Математика • 3 класс</h1>
          <div className="flex items-center justify-center gap-6 text-darkBlue/80">
            <span>Вопросов: {mathQuestions.length}</span>
            <span>Время: {formatTime(timeLeft)}</span>
            <span>Ответов дано: {answeredCount}/{mathQuestions.length}</span>
          </div>
        </div>

        {/* Прогресс */}
        <Card className="bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-darkBlue/60">Прогресс олимпиады</span>
              <span className="text-sm font-medium">
                Вопрос {currentQuestion + 1} из {mathQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Вопрос */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-heading">
                Вопрос {currentQuestion + 1}
              </CardTitle>
              <Badge variant="outline" className="bg-sunshine/20 text-darkBlue">
                {mathQuestions[currentQuestion].points} {mathQuestions[currentQuestion].points === 1 ? 'балл' : mathQuestions[currentQuestion].points < 5 ? 'балла' : 'баллов'}
              </Badge>
            </div>
            <CardDescription className="text-lg">
              {mathQuestions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              className="space-y-4"
            >
              {mathQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-tangerine/20 hover:bg-sunshine/10 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 text-lg cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Кнопки навигации */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
              >
                <Icon name="ChevronLeft" className="mr-2 h-4 w-4" />
                Назад
              </Button>

              <div className="flex gap-3">
                {currentQuestion === mathQuestions.length - 1 ? (
                  <Button
                    onClick={() => handleComplete()}
                    disabled={selectedAnswer === -1}
                    className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine"
                    size="lg"
                  >
                    <Icon name="CheckCircle" className="mr-2 h-5 w-5" />
                    Завершить олимпиаду
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === -1}
                    className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine"
                  >
                    Далее
                    <Icon name="ChevronRight" className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Подсказка */}
            {selectedAnswer === -1 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Icon name="Info" className="h-4 w-4" />
                  <span className="text-sm">Выберите один из вариантов ответа, чтобы продолжить</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Боковая навигация по вопросам */}
        <Card className="bg-white/90 backdrop-blur-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-heading">Навигация по вопросам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {mathQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  className={`h-10 w-10 ${
                    currentQuestion === index
                      ? "bg-gradient-to-r from-tangerine to-warmOrange"
                      : answers[index] !== -1
                      ? "border-green-500 text-green-700 bg-green-50"
                      : "border-tangerine/30"
                  }`}
                  onClick={() => {
                    setCurrentQuestion(index);
                    setSelectedAnswer(answers[index]);
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-darkBlue/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border-2 border-tangerine/30"></div>
                <span>Не отвечен</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-100 border-2 border-green-500"></div>
                <span>Отвечен</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-r from-tangerine to-warmOrange"></div>
                <span>Текущий</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}