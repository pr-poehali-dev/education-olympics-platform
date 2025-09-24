import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const subjects = [
  { name: "Математика", icon: "Calculator", color: "bg-sunshine text-darkBlue" },
  { name: "Русский язык", icon: "BookOpen", color: "bg-tangerine text-white" },
  { name: "Английский язык", icon: "Languages", color: "bg-warmOrange text-white" },
  { name: "Чтение", icon: "Book", color: "bg-secondary text-secondary-foreground" },
  { name: "ПДД", icon: "Car", color: "bg-primary text-primary-foreground" },
  { name: "Информатика", icon: "Monitor", color: "bg-accent text-accent-foreground" },
  { name: "Логика", icon: "Brain", color: "bg-sunshine text-darkBlue" },
  { name: "Окружающий мир", icon: "Globe", color: "bg-tangerine text-white" },
  { name: "Метапредметная", icon: "Sparkles", color: "bg-warmOrange text-white" }
];

const grades = [
  { name: "Дошкольная группа", key: "preschool", icon: "Baby", description: "Для самых маленьких участников" },
  { name: "1 класс", key: "grade1", icon: "Star", description: "Первый шаг в мир знаний" },
  { name: "2 класс", key: "grade2", icon: "Trophy", description: "Развиваем таланты дальше" },
  { name: "3 класс", key: "grade3", icon: "Award", description: "Углубляем знания" },
  { name: "4 класс", key: "grade4", icon: "Crown", description: "Мастера олимпиад" }
];

const sampleQuiz = {
  question: "Сколько будет 2 + 3?",
  options: ["4", "5", "6", "7"],
  correct: 1
};

export default function Index() {
  const [selectedGrade, setSelectedGrade] = useState("grade1");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setShowQuiz(false);
      setSelectedAnswer(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-white to-sunshine">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-warmOrange/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-tangerine to-warmOrange p-3 rounded-full">
                <Icon name="GraduationCap" className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-darkBlue font-heading">За скобками</h1>
                <p className="text-warmOrange font-medium">Образовательные олимпиады</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#olympiads" className="text-darkBlue hover:text-tangerine transition-colors">Олимпиады</a>
              <a href="#about" className="text-darkBlue hover:text-tangerine transition-colors">О нас</a>
              <a href="#faq" className="text-darkBlue hover:text-tangerine transition-colors">FAQ</a>
              <a href="#contacts" className="text-darkBlue hover:text-tangerine transition-colors">Контакты</a>
              <Button 
                className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine"
                onClick={() => window.location.href = '/dashboard'}
              >
                Войти
              </Button>
            </nav>
            <Button size="icon" className="md:hidden bg-tangerine">
              <Icon name="Menu" className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-tangerine/30 mb-8">
            <Icon name="Sparkles" className="h-5 w-5 text-tangerine mr-2" />
            <span className="text-darkBlue font-medium">Интерактивные олимпиады для детей</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-darkBlue mb-6 font-heading">
            Развиваем таланты
            <br />
            <span className="bg-gradient-to-r from-tangerine to-warmOrange bg-clip-text text-transparent">
              через олимпиады
            </span>
          </h2>
          <p className="text-xl text-darkBlue/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Образовательный проект "За скобками" предлагает интерактивные олимпиады 
            для учеников 1-4 классов и дошкольников с автоматической выдачей сертификатов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine text-lg px-8 py-4"
              onClick={() => setShowQuiz(true)}
            >
              <Icon name="Play" className="mr-2 h-5 w-5" />
              Попробовать олимпиаду
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-tangerine text-tangerine hover:bg-tangerine hover:text-white text-lg px-8 py-4"
              onClick={() => window.location.href = '/register'}
            >
              <Icon name="UserPlus" className="mr-2 h-5 w-5" />
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading text-darkBlue">Пробная олимпиада</CardTitle>
              <CardDescription>Математика • 1 класс</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-darkBlue">{sampleQuiz.question}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sampleQuiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className={`h-12 text-lg ${
                          selectedAnswer === index
                            ? showResult
                              ? index === sampleQuiz.correct
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                              : "bg-tangerine hover:bg-warmOrange"
                            : "border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {showResult && (
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-sunshine/20 to-tangerine/20 border border-tangerine/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Icon 
                          name={selectedAnswer === sampleQuiz.correct ? "CheckCircle" : "XCircle"} 
                          className={`h-6 w-6 ${selectedAnswer === sampleQuiz.correct ? "text-green-600" : "text-red-600"}`} 
                        />
                        <span className="font-semibold text-darkBlue">
                          {selectedAnswer === sampleQuiz.correct ? "Правильно!" : "Неправильно"}
                        </span>
                      </div>
                      <p className="text-sm text-darkBlue/80">
                        {selectedAnswer === sampleQuiz.correct 
                          ? "Отличная работа! В настоящей олимпиаде вас ждет сертификат." 
                          : `Правильный ответ: ${sampleQuiz.options[sampleQuiz.correct]}`
                        }
                      </p>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
                  onClick={() => {
                    setShowQuiz(false);
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }}
                >
                  Закрыть
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Olympiads Section */}
      <section id="olympiads" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darkBlue mb-4 font-heading">Олимпиады по классам</h2>
            <p className="text-xl text-darkBlue/80">Выберите класс и предмет для участия</p>
          </div>

          <Tabs value={selectedGrade} onValueChange={setSelectedGrade} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/80 backdrop-blur-sm">
              {grades.map((grade) => (
                <TabsTrigger 
                  key={grade.key} 
                  value={grade.key}
                  className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-tangerine data-[state=active]:to-warmOrange data-[state=active]:text-white"
                >
                  <Icon name={grade.icon} className="h-5 w-5" />
                  <span className="font-medium">{grade.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {grades.map((grade) => (
              <TabsContent key={grade.key} value={grade.key}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-darkBlue mb-2 font-heading">{grade.name}</h3>
                  <p className="text-darkBlue/80">{grade.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-full ${subject.color}`}>
                            <Icon name={subject.icon} className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary" className="bg-sunshine/20 text-darkBlue">
                            Доступно
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-heading">{subject.name}</CardTitle>
                        <CardDescription>
                          Интерактивные задания для {grade.name.toLowerCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-darkBlue/60">
                            <span>Вопросов: 15-20</span>
                            <span>Время: 30 мин</span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine">
                            <Icon name="Play" className="mr-2 h-4 w-4" />
                            Начать олимпиаду
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-darkBlue mb-4 font-heading">Почему выбирают нас</h2>
            <p className="text-xl text-darkBlue/80">Преимущества платформы "За скобками"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Award",
                title: "Автоматические сертификаты",
                description: "Получайте сертификаты сразу после завершения олимпиады"
              },
              {
                icon: "BarChart",
                title: "Детальная статистика",
                description: "Отслеживайте прогресс и результаты каждого участника"
              },
              {
                icon: "Users",
                title: "Для всех возрастов",
                description: "От дошкольников до 4 класса - программы для каждого"
              },
              {
                icon: "Zap",
                title: "Интерактивность",
                description: "Увлекательные задания с мгновенной обратной связью"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-tangerine to-warmOrange rounded-full w-fit">
                    <Icon name={feature.icon} className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-heading">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkBlue text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-tangerine to-warmOrange p-2 rounded-full">
                  <Icon name="GraduationCap" className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold font-heading">За скобками</span>
              </div>
              <p className="text-white/80">
                Образовательная платформа для развития талантов через интерактивные олимпиады
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-heading">Олимпиады</h3>
              <ul className="space-y-2 text-white/80">
                <li>Математика</li>
                <li>Русский язык</li>
                <li>Английский язык</li>
                <li>Окружающий мир</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-heading">Информация</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-tangerine transition-colors">О проекте</a></li>
                <li><a href="#faq" className="hover:text-tangerine transition-colors">FAQ</a></li>
                <li><a href="#contacts" className="hover:text-tangerine transition-colors">Контакты</a></li>
                <li><a href="#materials" className="hover:text-tangerine transition-colors">Материалы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-heading">Контакты</h3>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@zaskobkami.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (800) 123-45-67
                </p>
                <div className="flex space-x-4 mt-4">
                  <Icon name="Instagram" className="h-6 w-6 text-white/60 hover:text-tangerine cursor-pointer transition-colors" />
                  <Icon name="Facebook" className="h-6 w-6 text-white/60 hover:text-tangerine cursor-pointer transition-colors" />
                  <Icon name="Youtube" className="h-6 w-6 text-white/60 hover:text-tangerine cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 За скобками. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}