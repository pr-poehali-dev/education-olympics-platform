import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationForm {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  grade: string;
  parentEmail: string;
  agreeTerms: boolean;
  agreeNews: boolean;
}

const grades = [
  { value: "preschool", label: "Дошкольная группа" },
  { value: "grade1", label: "1 класс" },
  { value: "grade2", label: "2 класс" },
  { value: "grade3", label: "3 класс" },
  { value: "grade4", label: "4 класс" }
];

export default function Register() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    grade: "",
    parentEmail: "",
    agreeTerms: false,
    agreeNews: false
  });

  const [errors, setErrors] = useState<Partial<RegistrationForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationForm> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Имя обязательно для заполнения";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Фамилия обязательна для заполнения";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный формат email";
    }

    if (!formData.grade) {
      newErrors.grade = "Выберите класс";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Необходимо согласие с условиями";
    }

    // Валидация email родителя для дошкольников и младших классов
    if ((formData.grade === "preschool" || formData.grade === "grade1") && !formData.parentEmail.trim()) {
      newErrors.parentEmail = "Email родителя обязателен для этого возраста";
    } else if (formData.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Некорректный формат email родителя";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      toast({
        title: "Регистрация успешна! 🎉",
        description: "На ваш email отправлено письмо с подтверждением. Проверьте почту и перейдите по ссылке.",
      });
      
      // В реальном приложении здесь был бы переход на страницу подтверждения
      setIsSubmitting(false);
    }, 2000);
  };

  const updateField = (field: keyof RegistrationForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Убираем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-white to-sunshine py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-tangerine/30 mb-6">
            <Icon name="UserPlus" className="h-5 w-5 text-tangerine mr-2" />
            <span className="text-darkBlue font-medium">Присоединяйтесь к олимпиадам</span>
          </div>
          <h1 className="text-4xl font-bold text-darkBlue mb-4 font-heading">Регистрация участника</h1>
          <p className="text-xl text-darkBlue/80">Создайте аккаунт для участия в олимпиадах и получения сертификатов</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading text-darkBlue">Данные участника</CardTitle>
            <CardDescription>
              Все поля обязательны для заполнения. Мы используем эти данные для персонализации сертификатов.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ФИО */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Иванов"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Иван"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    type="text"
                    placeholder="Иванович"
                    value={formData.middleName}
                    onChange={(e) => updateField("middleName", e.target.value)}
                  />
                </div>
              </div>

              {/* Email участника */}
              <div>
                <Label htmlFor="email">Email участника *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                <p className="text-sm text-darkBlue/60 mt-1">
                  На этот email будут приходить результаты олимпиад и сертификаты
                </p>
              </div>

              {/* Класс */}
              <div>
                <Label htmlFor="grade">Класс обучения *</Label>
                <Select value={formData.grade} onValueChange={(value) => updateField("grade", value)}>
                  <SelectTrigger className={errors.grade ? "border-red-500" : ""}>
                    <SelectValue placeholder="Выберите класс" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && <p className="text-sm text-red-600 mt-1">{errors.grade}</p>}
              </div>

              {/* Email родителя (условно) */}
              {(formData.grade === "preschool" || formData.grade === "grade1" || formData.grade === "grade2") && (
                <div>
                  <Label htmlFor="parentEmail">Email родителя {(formData.grade === "preschool" || formData.grade === "grade1") && "*"}</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={(e) => updateField("parentEmail", e.target.value)}
                    className={errors.parentEmail ? "border-red-500" : ""}
                  />
                  {errors.parentEmail && <p className="text-sm text-red-600 mt-1">{errors.parentEmail}</p>}
                  <p className="text-sm text-darkBlue/60 mt-1">
                    Родитель будет получать копии результатов и уведомления
                  </p>
                </div>
              )}

              {/* Согласия */}
              <div className="space-y-4 p-4 bg-sunshine/10 rounded-lg border border-tangerine/20">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => updateField("agreeTerms", checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-relaxed cursor-pointer">
                    Я соглашаюсь с{" "}
                    <a href="#terms" className="text-tangerine hover:text-warmOrange underline">
                      пользовательским соглашением
                    </a>{" "}
                    и{" "}
                    <a href="#privacy" className="text-tangerine hover:text-warmOrange underline">
                      политикой конфиденциальности
                    </a>
                    *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeNews"
                    checked={formData.agreeNews}
                    onCheckedChange={(checked) => updateField("agreeNews", checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeNews" className="text-sm leading-relaxed cursor-pointer">
                    Я хочу получать уведомления о новых олимпиадах и образовательных материалах
                  </Label>
                </div>
              </div>

              {/* Кнопка регистрации */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-tangerine to-warmOrange hover:from-warmOrange hover:to-tangerine text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                    Создаем аккаунт...
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" className="mr-2 h-5 w-5" />
                    Зарегистрироваться
                  </>
                )}
              </Button>

              {/* Ссылка на вход */}
              <div className="text-center pt-4 border-t border-tangerine/20">
                <p className="text-darkBlue/60">
                  Уже есть аккаунт?{" "}
                  <a href="/login" className="text-tangerine hover:text-warmOrange font-medium underline">
                    Войти в систему
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Дополнительная информация */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Icon name="Shield" className="h-5 w-5 text-tangerine" />
                Безопасность данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-darkBlue/80">
                Мы защищаем персональные данные участников в соответствии с требованиями ФЗ-152.
                Данные используются только для выдачи сертификатов и связи с участниками.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Icon name="Mail" className="h-5 w-5 text-tangerine" />
                Подтверждение email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-darkBlue/80">
                После регистрации на указанный email придет письмо с ссылкой для подтверждения.
                Обязательно проверьте папку "Спам".
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}