import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "about" | "support";

const SupportBanner = () => (
  <div className="support-banner rounded-2xl p-5 my-8 flex flex-col sm:flex-row items-center gap-4">
    <div className="text-3xl animate-float">💜</div>
    <div className="flex-1 text-center sm:text-left">
      <p className="font-montserrat font-semibold text-white text-sm mb-1">Поддержи проект</p>
      <p className="text-white/60 text-xs">Каждый рубль помогает развитию</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-2">
      <a
        href="tel:+79855127706"
        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
      >
        <span>💳</span> Т-Банк +7 985 512-77-06
      </a>
      <a
        href="tel:+79776277844"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
      >
        <span>🏦</span> Сбербанк +7 977 627-78-44
      </a>
    </div>
  </div>
);

const HomePage = () => (
  <div className="animate-fade-in">
    <div className="relative text-center py-20 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-float delay-300" />
      </div>
      <div className="relative z-10">
        <div className="inline-block mb-6">
          <span className="font-montserrat text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-4 py-2">
            ✨ Добро пожаловать
          </span>
        </div>
        <h1 className="font-montserrat font-black text-5xl sm:text-7xl leading-tight mb-6">
          <span className="gradient-text">Наш проект</span>
          <br />
          <span className="text-white">живёт и</span>
          <br />
          <span className="neon-text-cyan">развивается</span>
        </h1>
        <p className="font-golos text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Мы создаём что-то настоящее. Что-то, что остаётся. Поддержи нас и стань частью истории.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="shimmer-btn text-white font-montserrat font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 hover:shadow-2xl">
            Узнать больше →
          </button>
          <button className="glass-card text-white/80 hover:text-white font-montserrat font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 border border-white/10">
            О проекте
          </button>
        </div>
      </div>
    </div>

    <SupportBanner />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
      {[
        { icon: "Zap", label: "Быстро", desc: "Результат виден сразу", delay: "delay-100" },
        { icon: "Heart", label: "С душой", desc: "Каждая деталь важна", delay: "delay-200" },
        { icon: "Star", label: "Качество", desc: "Никаких компромиссов", delay: "delay-300" },
      ].map((item) => (
        <div
          key={item.label}
          className={`glass-card border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-all cursor-default animate-slide-up ${item.delay} opacity-0`}
          style={{ animationFillMode: "forwards" }}
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
            <Icon name={item.icon} size={24} className="text-purple-400" />
          </div>
          <h3 className="font-montserrat font-bold text-white text-lg mb-2">{item.label}</h3>
          <p className="font-golos text-white/50 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="glass-card border border-white/10 rounded-3xl p-8 my-4 text-center">
      <p className="text-5xl mb-4 animate-float">🚀</p>
      <h2 className="font-montserrat font-black text-white text-2xl sm:text-3xl mb-3">
        Вместе мы сделаем больше
      </h2>
      <p className="font-golos text-white/50 text-base max-w-xl mx-auto">
        Ваша поддержка — это не просто деньги. Это вера в то, что мы делаем правильное дело.
      </p>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="animate-fade-in">
    <div className="text-center py-16 px-4">
      <div className="inline-block mb-6">
        <span className="font-montserrat text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-4 py-2">
          📖 О нас
        </span>
      </div>
      <h1 className="font-montserrat font-black text-4xl sm:text-6xl text-white mb-6">
        Кто мы <span className="gradient-text-pink">такие?</span>
      </h1>
      <p className="font-golos text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
        Мы — небольшая команда людей, которые верят в свой проект. Начинали с нуля, продолжаем с душой.
      </p>
    </div>

    <SupportBanner />

    <div className="space-y-4 py-4">
      {[
        {
          emoji: "🎯",
          title: "Наша миссия",
          text: "Создавать вещи, которые приносят реальную пользу людям. Мы не гонимся за модой — мы строим что-то настоящее и долговечное.",
          delay: "delay-100",
        },
        {
          emoji: "💡",
          title: "Как всё начиналось",
          text: "Проект родился из простой идеи: сделать что-то своё. Без корпораций, без инвесторов — просто люди и их желание создавать.",
          delay: "delay-200",
        },
        {
          emoji: "🌟",
          title: "Куда мы движемся",
          text: "Планов много. Ресурсов — пока не очень. Именно поэтому поддержка каждого из вас так важна для нашего роста и развития.",
          delay: "delay-300",
        },
      ].map((item) => (
        <div
          key={item.title}
          className={`glass-card border border-white/10 rounded-2xl p-6 flex gap-5 hover:border-purple-500/40 transition-all animate-slide-up ${item.delay} opacity-0`}
          style={{ animationFillMode: "forwards" }}
        >
          <div className="text-3xl mt-1 shrink-0">{item.emoji}</div>
          <div>
            <h3 className="font-montserrat font-bold text-white text-lg mb-2">{item.title}</h3>
            <p className="font-golos text-white/55 text-base leading-relaxed">{item.text}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="glass-card border border-white/10 rounded-3xl p-8 my-8 text-center">
      <h2 className="font-montserrat font-black text-white text-2xl mb-6">
        Статистика проекта
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: "100%", label: "Открытость" },
          { num: "∞", label: "Идей" },
          { num: "1", label: "Команда" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-montserrat font-black text-3xl sm:text-4xl gradient-text">{stat.num}</div>
            <div className="font-golos text-white/40 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SupportPage = () => (
  <div className="animate-fade-in">
    <div className="text-center py-16 px-4">
      <div className="inline-block mb-6">
        <span className="font-montserrat text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-4 py-2">
          💜 Поддержка
        </span>
      </div>
      <h1 className="font-montserrat font-black text-4xl sm:text-6xl text-white mb-6">
        Помоги проекту <span className="neon-text-pink">жить</span>
      </h1>
      <p className="font-golos text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
        Мы не берём рекламу. Мы не продаём данные. Мы живём только благодаря вашей поддержке.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
      <div className="glass-card border-2 rounded-3xl p-8 text-center hover:scale-105 transition-all neon-border-cyan">
        <div className="text-5xl mb-4 animate-float">💳</div>
        <h2 className="font-montserrat font-black text-white text-2xl mb-2">Т-Банк</h2>
        <p className="font-golos text-white/50 text-sm mb-6">Перевод по номеру телефона</p>
        <div className="glass-card border border-cyan-400/30 rounded-2xl p-4 mb-6">
          <p className="font-montserrat font-bold text-cyan-400 text-xl tracking-widest">
            +7 985 512-77-06
          </p>
        </div>
        <a
          href="tel:+79855127706"
          className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30"
        >
          Позвонить / Перевести
        </a>
      </div>

      <div
        className="glass-card border-2 rounded-3xl p-8 text-center hover:scale-105 transition-all"
        style={{ borderColor: "#22c55e", boxShadow: "0 0 15px rgba(34,197,94,0.4), inset 0 0 15px rgba(34,197,94,0.05)" }}
      >
        <div className="text-5xl mb-4 animate-float delay-200">🏦</div>
        <h2 className="font-montserrat font-black text-white text-2xl mb-2">Сбербанк</h2>
        <p className="font-golos text-white/50 text-sm mb-6">Перевод по номеру телефона</p>
        <div className="glass-card border border-green-400/30 rounded-2xl p-4 mb-6">
          <p className="font-montserrat font-bold text-green-400 text-xl tracking-widest">
            +7 977 627-78-44
          </p>
        </div>
        <a
          href="tel:+79776277844"
          className="block w-full bg-green-500 hover:bg-green-400 text-white font-montserrat font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-green-500/30"
        >
          Позвонить / Перевести
        </a>
      </div>
    </div>

    <div className="glass-card border border-white/10 rounded-3xl p-8 my-6 text-center">
      <div className="text-4xl mb-4">🙏</div>
      <h2 className="font-montserrat font-black text-white text-2xl mb-3">
        Как помогает ваш взнос?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-left">
        {[
          { icon: "Server", label: "Серверы", desc: "Оплата хостинга и инфраструктуры" },
          { icon: "Code", label: "Разработка", desc: "Время на создание новых функций" },
          { icon: "Coffee", label: "Мотивация", desc: "Кофе и вдохновение для команды 😄" },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
            <Icon name={item.icon} size={20} className="text-purple-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-montserrat font-semibold text-white text-sm">{item.label}</p>
              <p className="font-golos text-white/45 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="text-center py-6">
      <p className="font-golos text-white/30 text-sm">
        Любая сумма имеет значение. Спасибо, что вы с нами 💜
      </p>
    </div>
  </div>
);

const navItems = [
  { id: "home" as Page, label: "Главная", icon: "Home" },
  { id: "about" as Page, label: "О проекте", icon: "Info" },
  { id: "support" as Page, label: "Поддержка", icon: "Heart" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen mesh-bg">
      <nav className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-montserrat font-black text-xl gradient-text">
            ⚡ Проект
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`font-montserrat font-semibold text-sm px-3 sm:px-4 py-2 rounded-xl transition-all ${
                  page === item.id
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">
                  <Icon name={item.icon} size={18} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        {page === "home" && <HomePage />}
        {page === "about" && <AboutPage />}
        {page === "support" && <SupportPage />}
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-golos text-white/30 text-sm mb-3">Поддержи проект — это просто</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <a href="tel:+79855127706" className="font-montserrat font-semibold text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
            💳 Т-Банк: +7 985 512-77-06
          </a>
          <span className="text-white/20 hidden sm:inline">•</span>
          <a href="tel:+79776277844" className="font-montserrat font-semibold text-green-400 hover:text-green-300 text-sm transition-colors">
            🏦 Сбербанк: +7 977 627-78-44
          </a>
        </div>
        <p className="font-golos text-white/15 text-xs mt-4">© 2026 Проект. Все права защищены.</p>
      </footer>
    </div>
  );
}