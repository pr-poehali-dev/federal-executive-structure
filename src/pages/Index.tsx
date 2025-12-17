import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ExecutiveBody {
  id: string;
  name: string;
  description: string;
  functions: string[];
  type: 'ministry' | 'service' | 'agency';
}

const executiveBodies: ExecutiveBody[] = [
  {
    id: 'gov',
    name: 'Правительство Российской Федерации',
    description: 'Высший исполнительный орган государственной власти РФ',
    functions: [
      'Разработка и исполнение федерального бюджета',
      'Обеспечение проведения единой финансовой, кредитной и денежной политики',
      'Управление федеральной собственностью',
      'Осуществление мер по обеспечению обороны и государственной безопасности'
    ],
    type: 'ministry'
  },
  {
    id: 'minec',
    name: 'Министерство экономического развития РФ',
    description: 'Федеральный орган исполнительной власти, осуществляющий функции по выработке государственной политики в сфере экономики',
    functions: [
      'Стратегическое планирование в РФ',
      'Управление государственным имуществом',
      'Государственная регистрация юридических лиц',
      'Внешнеэкономическая деятельность'
    ],
    type: 'ministry'
  },
  {
    id: 'minfin',
    name: 'Министерство финансов РФ',
    description: 'Федеральный орган исполнительной власти, осуществляющий функции по выработке государственной политики в финансовой сфере',
    functions: [
      'Составление проекта федерального бюджета',
      'Налоговая политика',
      'Валютное регулирование',
      'Государственный долг'
    ],
    type: 'ministry'
  },
  {
    id: 'fns',
    name: 'Федеральная налоговая служба',
    description: 'Федеральный орган исполнительной власти, осуществляющий функции по контролю и надзору за соблюдением налогового законодательства',
    functions: [
      'Контроль за соблюдением налогового законодательства',
      'Учет налогоплательщиков',
      'Возврат и зачет излишне уплаченных налогов',
      'Анализ данных об имущественном положении налогоплательщиков'
    ],
    type: 'service'
  },
  {
    id: 'mintrud',
    name: 'Министерство труда и социальной защиты РФ',
    description: 'Федеральный орган исполнительной власти, осуществляющий функции по выработке государственной политики в сфере труда и занятости',
    functions: [
      'Демографическая политика',
      'Социальное страхование',
      'Условия и охрана труда',
      'Социальное партнерство'
    ],
    type: 'ministry'
  },
  {
    id: 'rosprirodnadzor',
    name: 'Федеральная служба по надзору в сфере природопользования',
    description: 'Федеральный орган исполнительной власти, осуществляющий функции по контролю и надзору в сфере природопользования',
    functions: [
      'Государственный экологический надзор',
      'Охрана и использование особо охраняемых природных территорий',
      'Лицензирование деятельности по обращению с опасными отходами',
      'Контроль за геологическим изучением, использованием недр'
    ],
    type: 'service'
  }
];

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Какой государственный орган осуществляет руководство деятельностью Правительства РФ?',
    options: [
      'Федеральное Собрание РФ',
      'Президент РФ',
      'Генеральная Прокуратура РФ',
      'Конституционный Суд РФ'
    ],
    correctAnswer: 1,
    explanation: 'Согласно Конституции РФ (ст. 110), Правительство РФ возглавляется Председателем Правительства, который назначается Президентом РФ с согласия Государственной Думы. Президент РФ осуществляет общее руководство деятельностью Правительства РФ.'
  }
];

const sources = [
  {
    id: 1,
    text: 'Конституция Российской Федерации (принята всенародным голосованием 12.12.1993 с изменениями, одобренными в ходе общероссийского голосования 01.07.2020) // Официальный интернет-портал правовой информации. – URL: http://pravo.gov.ru (дата обращения: 17.12.2025).',
  },
  {
    id: 2,
    text: 'Федеральный конституционный закон от 17.12.1997 № 2-ФКЗ "О Правительстве Российской Федерации" (ред. от 08.12.2020) // Собрание законодательства РФ. – 1997. – № 51. – Ст. 5712.',
  },
  {
    id: 3,
    text: 'Указ Президента РФ от 21.01.2020 № 21 "О структуре федеральных органов исполнительной власти" (ред. от 22.11.2024) // Собрание законодательства РФ. – 2020. – № 4. – Ст. 346.',
  },
  {
    id: 4,
    text: 'Правительство России : официальный сайт. – URL: http://government.ru/ministries/ (дата обращения: 17.12.2025).',
  },
  {
    id: 5,
    text: 'Министерство экономического развития Российской Федерации : официальный сайт. – URL: https://economy.gov.ru (дата обращения: 17.12.2025).',
  },
  {
    id: 6,
    text: 'Министерство финансов Российской Федерации : официальный сайт. – URL: https://minfin.gov.ru (дата обращения: 17.12.2025).',
  }
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const filteredBodies = selectedType === 'all' 
    ? executiveBodies 
    : executiveBodies.filter(body => body.type === selectedType);

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'ministry': return 'Министерство';
      case 'service': return 'Служба';
      case 'agency': return 'Агентство';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'ministry': return 'bg-primary text-primary-foreground';
      case 'service': return 'bg-secondary text-secondary-foreground';
      case 'agency': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Building2" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold text-foreground">
              Структура федеральной исполнительной власти
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Обзор основных органов исполнительной власти Российской Федерации с детальным описанием их функций и полномочий
          </p>
        </header>

        <div className="mb-8 flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedType === 'all' 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-card text-card-foreground hover:bg-muted'
            }`}
          >
            Все органы
          </button>
          <button
            onClick={() => setSelectedType('ministry')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedType === 'ministry' 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-card text-card-foreground hover:bg-muted'
            }`}
          >
            Министерства
          </button>
          <button
            onClick={() => setSelectedType('service')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedType === 'service' 
                ? 'bg-secondary text-secondary-foreground shadow-md' 
                : 'bg-card text-card-foreground hover:bg-muted'
            }`}
          >
            Службы
          </button>
        </div>

        <div className="grid gap-6 mb-16">
          {filteredBodies.map((body, index) => (
            <Card 
              key={body.id} 
              className="hover:shadow-lg transition-shadow animate-fade-in border-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                      <Icon name="Building" size={28} className="text-primary" />
                      {body.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {body.description}
                    </CardDescription>
                  </div>
                  <Badge className={`${getTypeColor(body.type)} whitespace-nowrap`}>
                    {getTypeLabel(body.type)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="functions" className="border-none">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">
                      <span className="flex items-center gap-2">
                        <Icon name="List" size={20} />
                        Основные функции и полномочия
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 mt-4">
                        {body.functions.map((func, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{func}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="HelpCircle" size={32} className="text-primary" />
            <h2 className="text-3xl font-bold">Тестовые задания для самопроверки</h2>
          </div>

          <Card className="border-2 mb-6">
            <CardContent className="pt-6">
              {questions.map((q, index) => (
                <div key={q.id} className="mb-8 last:mb-0">
                  <h3 className="font-semibold text-lg mb-4 flex items-start gap-3">
                    <span className="text-primary flex-shrink-0">{q.id}.</span>
                    <span>{q.question}</span>
                  </h3>
                  <div className="space-y-3 ml-8">
                    {q.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[q.id] === optionIndex;
                      const isCorrect = optionIndex === q.correctAnswer;
                      const showCorrect = showResults && isCorrect;
                      const showIncorrect = showResults && isSelected && !isCorrect;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => !showResults && handleAnswerSelect(q.id, optionIndex)}
                          disabled={showResults}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            showCorrect
                              ? 'bg-green-50 border-green-500 text-green-900'
                              : showIncorrect
                              ? 'bg-red-50 border-red-500 text-red-900'
                              : isSelected
                              ? 'bg-primary/10 border-primary'
                              : 'bg-card border-border hover:border-primary/50'
                          } ${
                            showResults ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              showCorrect
                                ? 'border-green-500 bg-green-500'
                                : showIncorrect
                                ? 'border-red-500 bg-red-500'
                                : isSelected
                                ? 'border-primary bg-primary'
                                : 'border-muted-foreground'
                            }">
                              {(showCorrect || (isSelected && !showResults)) && (
                                <Icon name="Check" size={16} className="text-white" />
                              )}
                              {showIncorrect && (
                                <Icon name="X" size={16} className="text-white" />
                              )}
                            </span>
                            <span className="flex-1">
                              {String.fromCharCode(97 + optionIndex)}) {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {showResults && (
                    <div className="mt-4 ml-8 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Icon name="Info" size={16} className="text-primary" />
                        Пояснение:
                      </p>
                      <p className="text-sm text-muted-foreground">{q.explanation}</p>
                    </div>
                  )}
                  {index < questions.length - 1 && <Separator className="mt-8" />}
                </div>
              ))}

              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                {showResults ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon name="Award" size={24} className="text-primary" />
                      <span className="text-lg font-semibold">
                        Результат: {calculateScore()} из {questions.length} правильных ответов
                      </span>
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Пройти заново
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== questions.length}
                    className="ml-auto px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Проверить ответы
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="BookOpen" size={32} className="text-primary" />
            <h2 className="text-3xl font-bold">Список использованных источников</h2>
          </div>
          
          <Card className="border-2">
            <CardContent className="pt-6">
              <ol className="space-y-6">
                {sources.map((source) => (
                  <li key={source.id} className="flex gap-4 text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground flex-shrink-0">{source.id}.</span>
                    <span className="text-justify">{source.text}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>Образовательный проект. Данные актуальны на 17 декабря 2025 года.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;