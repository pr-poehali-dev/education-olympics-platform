import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useState } from "react";

// Типы данных
interface OlympiadResult {
  id: string;
  subject: string;
  grade: string;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
  certificateUrl?: string;
  timeSpent: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  grade: string;
  registeredAt: string;
  totalOlympiads: number;
  certificates: number;
  averageScore: number;
}

// Моковые данные пользователя
const mockUser: UserProfile = {
  firstName: "Анна",
  lastName: "Петрова", 
  middleName: "Ивановна",
  email: "anna.petrova@example.com",
  grade: "3 класс",
  registeredAt: "2024-01-15",
  totalOlympiads: 7,
  certificates: 5,
  averageScore: 87
};

const mockResults: OlympiadResult[] = [
  {
    id: "1",
    subject: "Математика",
    grade: "3 класс",
    score: 18,
    maxScore: 20,
    percentage: 90,
    completedAt: "2024-09-20",
    certificateUrl: "#cert-1",
    timeSpent: "25 мин"
  },
  {
    id: "2", 
    subject: "Русский язык",
    grade: "3 класс",
    score: 16,
    maxScore: 20,
    percentage: 80,
    completedAt: "2024-09-18",
    certificateUrl: "#cert-2",
    timeSpent: "28 мин"
  },
  {
    id: "3",
    subject: "Окружающий мир",
    grade: "3 класс", 
    score: 19,
    maxScore: 20,
    percentage: 95,
    completedAt: "2024-09-15",
    certificateUrl: "#cert-3",
    timeSpent: "22 мин"
  },
  {
    id: "4",
    subject: "Логика",
    grade: "3 класс",
    score: 14,
    maxScore: 20,
    percentage: 70,
    completedAt: "2024-09-12",
    timeSpent: "30 мин"
  }
];

const getScoreColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 80) return "text-blue-600";
  if (percentage >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBadgeVariant = (percentage: number) => {
  if (percentage >= 90) return "default";
  if (percentage >= 80) return "secondary";
  return "outline";
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "results" | "profile">("overview");

  const initials = `${mockUser.firstName[0]}${mockUser.lastName[0]}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-white to-sunshine">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-warmOrange/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-tangerine to-warmOrange p-2 rounded-full">
                <Icon name="GraduationCap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-darkBlue font-heading">За скобками</h1>
                <p className="text-sm text-warmOrange">Личный кабинет</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-tangerine text-tangerine">
                <Icon name="Home" className="mr-2 h-4 w-4" />
                На главную
              </Button>
              <Button variant="outline" size="sm" className="border-tangerine text-tangerine">
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветствие */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16 bg-gradient-to-r from-tangerine to-warmOrange">
              <AvatarFallback className="text-white text-xl font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-darkBlue font-heading">
                Привет, {mockUser.firstName}! 👋
              </h1>
              <p className="text-darkBlue/80">
                {mockUser.grade} • Участник с {new Date(mockUser.registeredAt).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </div>

        {/* Навигационные вкладки */}
        <div className="flex space-x-1 mb-8 bg-white/80 backdrop-blur-sm rounded-lg p-1">
          {[
            { key: "overview", label: "Обзор", icon: "BarChart3" },
            { key: "results", label: "Результаты", icon: "Trophy" },
            { key: "profile", label: "Профиль", icon: "User" }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-tangerine to-warmOrange text-white"
                  : "text-darkBlue hover:text-tangerine"
              }`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              <Icon name={tab.icon} className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Содержимое вкладок */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Олимпиад пройдено</CardTitle>
                  <Icon name="BookOpen" className="h-4 w-4 text-tangerine" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-darkBlue">{mockUser.totalOlympiads}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Сертификатов получено</CardTitle>
                  <Icon name="Award" className="h-4 w-4 text-tangerine" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-darkBlue">{mockUser.certificates}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
                  <Icon name="Target" className="h-4 w-4 text-tangerine" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-darkBlue">{mockUser.averageScore}%</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Уровень</CardTitle>
                  <Icon name="Star" className="h-4 w-4 text-tangerine" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-darkBlue">Эксперт</div>
                </CardContent>
              </Card>
            </div>

            {/* Последние результаты */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading">Последние результаты</CardTitle>
                <CardDescription>Ваши недавние олимпиады и достижения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 rounded-lg border border-tangerine/20 bg-gradient-to-r from-sunshine/10 to-tangerine/10">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-tangerine to-warmOrange p-2 rounded-full">
                          <Icon name="Trophy" className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-darkBlue">{result.subject}</h4>
                          <p className="text-sm text-darkBlue/60">
                            {new Date(result.completedAt).toLocaleDateString('ru-RU')} • {result.timeSpent}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(result.percentage)}`}>
                            {result.score}/{result.maxScore}
                          </div>
                          <div className="text-sm text-darkBlue/60">{result.percentage}%</div>
                        </div>
                        {result.certificateUrl && (
                          <Button size="sm" variant="outline" className="border-tangerine text-tangerine">
                            <Icon name="Download" className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    className="border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
                    onClick={() => setActiveTab("results")}
                  >
                    Посмотреть все результаты
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading">Все результаты олимпиад</CardTitle>
                <CardDescription>История участия в олимпиадах и полученные баллы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults.map((result) => (
                    <div key={result.id} className="p-6 rounded-lg border border-tangerine/20 bg-gradient-to-r from-white to-sunshine/5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-darkBlue font-heading">{result.subject}</h3>
                          <p className="text-darkBlue/60">{result.grade}</p>
                        </div>
                        <Badge variant={getScoreBadgeVariant(result.percentage)}>
                          {result.percentage >= 90 ? "Отлично" : 
                           result.percentage >= 80 ? "Хорошо" : 
                           result.percentage >= 70 ? "Удовлетворительно" : "Требует улучшения"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-darkBlue/60">Дата прохождения</p>
                          <p className="font-medium">{new Date(result.completedAt).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-darkBlue/60">Время выполнения</p>
                          <p className="font-medium">{result.timeSpent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-darkBlue/60">Результат</p>
                          <p className={`font-bold text-lg ${getScoreColor(result.percentage)}`}>
                            {result.score}/{result.maxScore} ({result.percentage}%)
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-darkBlue/60">Сертификат</p>
                          {result.certificateUrl ? (
                            <Button size="sm" className="bg-gradient-to-r from-tangerine to-warmOrange">
                              <Icon name="Download" className="mr-2 h-4 w-4" />
                              Скачать
                            </Button>
                          ) : (
                            <p className="text-sm text-darkBlue/60">Недоступен</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс выполнения</span>
                          <span>{result.percentage}%</span>
                        </div>
                        <Progress value={result.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading">Личная информация</CardTitle>
                <CardDescription>Управление данными профиля</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-tangerine/20">
                  <Avatar className="h-20 w-20 bg-gradient-to-r from-tangerine to-warmOrange">
                    <AvatarFallback className="text-white text-2xl font-bold">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-darkBlue font-heading">
                      {mockUser.lastName} {mockUser.firstName} {mockUser.middleName}
                    </h3>
                    <p className="text-darkBlue/80">{mockUser.grade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-darkBlue/60">Email</Label>
                    <p className="text-lg text-darkBlue mt-1">{mockUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-darkBlue/60">Класс обучения</Label>
                    <p className="text-lg text-darkBlue mt-1">{mockUser.grade}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-darkBlue/60">Дата регистрации</Label>
                    <p className="text-lg text-darkBlue mt-1">
                      {new Date(mockUser.registeredAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-darkBlue/60">Статус</Label>
                    <Badge className="mt-1 bg-green-100 text-green-800">Активный участник</Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex space-x-3">
                  <Button className="bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine">
                    <Icon name="Edit" className="mr-2 h-4 w-4" />
                    Редактировать профиль
                  </Button>
                  <Button variant="outline" className="border-tangerine text-tangerine hover:bg-tangerine hover:text-white">
                    <Icon name="Key" className="mr-2 h-4 w-4" />
                    Сменить пароль
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Настройки уведомлений */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading">Настройки уведомлений</CardTitle>
                <CardDescription>Управление email-уведомлениями</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Новые олимпиады", description: "Уведомления о появлении новых олимпиад", enabled: true },
                  { title: "Результаты олимпиад", description: "Уведомления о готовности результатов", enabled: true },
                  { title: "Сертификаты", description: "Уведомления о выдаче сертификатов", enabled: true },
                  { title: "Образовательные материалы", description: "Новости и полезные материалы", enabled: false }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-tangerine/20">
                    <div>
                      <h4 className="font-medium text-darkBlue">{setting.title}</h4>
                      <p className="text-sm text-darkBlue/60">{setting.description}</p>
                    </div>
                    <Button
                      variant={setting.enabled ? "default" : "outline"}
                      size="sm"
                      className={setting.enabled ? "bg-green-500 hover:bg-green-600" : "border-gray-300"}
                    >
                      {setting.enabled ? "Включено" : "Выключено"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}