import { useState } from "react";
import Icon from "@/components/ui/icon";
import { posts, type Post, type Category } from "@/data/posts";

type Page = "blog" | "post" | "about" | "support";
type Filter = "все" | Category;

const FILTERS: Filter[] = ["все", "с нуля", "основы", "практика", "продвинутое"];

const CATEGORY_COLOR: Record<Category, string> = {
  "с нуля": "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  "основы": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "практика": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "продвинутое": "text-rose-400 bg-rose-400/10 border-rose-400/30",
};

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="glass-card border border-white/10 rounded-2xl p-6 text-left hover:border-purple-500/40 hover:scale-[1.02] transition-all group w-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-3xl">{post.emoji}</span>
        <span className={`text-xs font-montserrat font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLOR[post.category]}`}>
          {post.category}
        </span>
      </div>
      <h3 className="font-montserrat font-bold text-white text-base mb-2 leading-snug group-hover:text-purple-300 transition-colors">
        {post.title}
      </h3>
      <p className="font-golos text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-1 text-white/30 text-xs font-golos">
        <Icon name="Clock" size={12} />
        <span>{post.readTime} мин</span>
      </div>
    </button>
  );
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3);
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto my-4 text-sm font-mono text-green-300 leading-relaxed">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="font-montserrat font-bold text-white text-xl mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="font-montserrat font-semibold text-purple-300 text-base mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={key++} className="font-golos font-semibold text-white text-base my-2">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ") || line.startsWith("— ")) {
      elements.push(<li key={key++} className="font-golos text-white/70 text-base ml-4 my-1 list-disc">{line.slice(2)}</li>);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-1" />);
    } else {
      // Inline bold and code
      const parsed = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
      elements.push(
        <p key={key++} className="font-golos text-white/70 text-base leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: parsed }} />
      );
    }
    i++;
  }
  return elements;
}

function PostPage({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white font-montserrat text-sm mb-8 transition-colors">
        <Icon name="ArrowLeft" size={16} /> Все статьи
      </button>
      <div className="mb-6">
        <span className={`text-xs font-montserrat font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLOR[post.category]}`}>
          {post.category}
        </span>
      </div>
      <div className="text-5xl mb-4">{post.emoji}</div>
      <h1 className="font-montserrat font-black text-white text-2xl sm:text-3xl leading-tight mb-3">{post.title}</h1>
      <div className="flex items-center gap-2 text-white/30 text-sm font-golos mb-8">
        <Icon name="Clock" size={14} />
        <span>{post.readTime} минут чтения</span>
      </div>
      <div className="glass-card border border-white/10 rounded-2xl p-6 sm:p-8">
        {renderContent(post.content)}
      </div>

      <div className="mt-10 glass-card border border-white/10 rounded-2xl p-6 text-center">
        <p className="font-golos text-white/40 text-sm mb-3">Понравилась статья? Поддержи блог</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a href="tel:+79855127706" className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105">
            💳 Т-Банк +7 985 512-77-06
          </a>
          <a href="tel:+79776277844" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105">
            🏦 Сбербанк +7 977 627-78-44
          </a>
        </div>
      </div>
    </div>
  );
}

function BlogPage({ onOpenPost }: { onOpenPost: (post: Post) => void }) {
  const [filter, setFilter] = useState<Filter>("все");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = filter === "все" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="text-center py-14 px-4">
        <div className="inline-block mb-5">
          <span className="font-montserrat text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-4 py-2">
            📚 Блог о программировании
          </span>
        </div>
        <h1 className="font-montserrat font-black text-4xl sm:text-6xl text-white mb-4">
          Учись <span className="gradient-text">кодить</span>
        </h1>
        <p className="font-golos text-white/50 text-lg max-w-xl mx-auto">
          30 статей от полного нуля до уверенного разработчика. Без воды, по делу.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl mb-8 p-px"
        style={{ background: "linear-gradient(135deg, #a855f7, #00e5ff, #f72585)" }}>
        <div className="relative rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center gap-4"
          style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)" }}>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 text-center sm:text-left">
            <span className="text-3xl animate-float">💜</span>
            <div>
              <p className="font-montserrat font-bold text-white text-sm">Блог существует на ваши донаты</p>
              <p className="font-golos text-white/50 text-xs">Поддержи развитие — это займёт 1 минуту</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="tel:+79855127706"
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-bold text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap">
              💳 Т-Банк
            </a>
            <a href="tel:+79776277844"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white font-montserrat font-bold text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap">
              🏦 Сбербанк
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по статьям..."
            className="w-full glass-card border border-white/10 rounded-xl pl-9 pr-4 py-2.5 font-golos text-white text-sm bg-transparent placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-montserrat font-semibold text-xs px-3 py-2 rounded-xl transition-all ${
                filter === f
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  : "glass-card border border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="text-white/30 font-golos text-sm mb-4">{filtered.length} статей</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => onOpenPost(post)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-golos text-white/40">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="text-center py-14 px-4">
        <div className="text-5xl mb-5">👋</div>
        <h1 className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-4">
          О <span className="gradient-text">проекте</span>
        </h1>
        <p className="font-golos text-white/50 text-lg leading-relaxed">
          Этот блог — моя попытка сделать обучение программированию честным, простым и бесплатным.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { emoji: "🎯", title: "Зачем этот блог?", text: "Я сам проходил путь с нуля и знаю, как много мусора в интернете. Здесь только то, что реально нужно знать — без воды, без платных продолжений, без хайпа." },
          { emoji: "📖", title: "Как устроены статьи?", text: "30 статей разбиты на 4 уровня: с нуля, основы, практика, продвинутое. Читай по порядку или прыгай туда, что нужно. Каждая статья — самостоятельная единица." },
          { emoji: "✍️", title: "Новые статьи", text: "Блог живой. Новые статьи появляются регулярно. Если есть тема которую хочешь увидеть — напиши в поддержку." },
        ].map((item) => (
          <div key={item.title} className="glass-card border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-purple-500/30 transition-all">
            <div className="text-2xl shrink-0">{item.emoji}</div>
            <div>
              <h3 className="font-montserrat font-bold text-white text-base mb-2">{item.title}</h3>
              <p className="font-golos text-white/55 text-sm leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card border border-white/10 rounded-2xl p-6 mt-6 text-center">
        <p className="font-golos text-white/30 text-sm">Блог существует на ваши донаты</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-3">
          <a href="tel:+79855127706" className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105">
            💳 Т-Банк +7 985 512-77-06
          </a>
          <a href="tel:+79776277844" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-montserrat font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:scale-105">
            🏦 Сбербанк +7 977 627-78-44
          </a>
        </div>
      </div>
    </div>
  );
}

function SupportPage() {
  return (
    <div className="animate-fade-in max-w-xl mx-auto">
      <div className="text-center py-14 px-4">
        <div className="text-5xl mb-5 animate-float">💜</div>
        <h1 className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-4">
          Поддержи <span className="neon-text-pink">блог</span>
        </h1>
        <p className="font-golos text-white/50 text-base leading-relaxed">
          Блог бесплатный. Но сервера, время и кофе стоят денег. Если статьи помогли — буду рад любой поддержке.
        </p>
      </div>

      <div className="space-y-4">
        <div className="glass-card border-2 neon-border-cyan rounded-2xl p-8 text-center hover:scale-105 transition-all">
          <div className="text-4xl mb-3 animate-float">💳</div>
          <h2 className="font-montserrat font-black text-white text-xl mb-1">Т-Банк</h2>
          <p className="font-golos text-white/40 text-sm mb-4">Перевод по номеру телефона</p>
          <div className="glass-card border border-cyan-400/30 rounded-xl p-3 mb-4">
            <p className="font-montserrat font-bold text-cyan-400 text-lg tracking-widest">+7 985 512-77-06</p>
          </div>
          <a href="tel:+79855127706" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-montserrat font-bold py-3 rounded-xl transition-all">
            Перевести
          </a>
        </div>

        <div
          className="glass-card border-2 rounded-2xl p-8 text-center hover:scale-105 transition-all"
          style={{ borderColor: "#22c55e", boxShadow: "0 0 15px rgba(34,197,94,0.3)" }}
        >
          <div className="text-4xl mb-3 animate-float delay-200">🏦</div>
          <h2 className="font-montserrat font-black text-white text-xl mb-1">Сбербанк</h2>
          <p className="font-golos text-white/40 text-sm mb-4">Перевод по номеру телефона</p>
          <div className="glass-card border border-green-400/30 rounded-xl p-3 mb-4">
            <p className="font-montserrat font-bold text-green-400 text-lg tracking-widest">+7 977 627-78-44</p>
          </div>
          <a href="tel:+79776277844" className="block w-full bg-green-500 hover:bg-green-400 text-white font-montserrat font-bold py-3 rounded-xl transition-all">
            Перевести
          </a>
        </div>
      </div>

      <p className="text-center font-golos text-white/20 text-sm mt-8">Спасибо, что читаешь 💜</p>
    </div>
  );
}

const NAV = [
  { id: "blog" as Page, label: "Статьи", icon: "BookOpen" },
  { id: "about" as Page, label: "О проекте", icon: "Info" },
  { id: "support" as Page, label: "Поддержать", icon: "Heart" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("blog");
  const [openPost, setOpenPost] = useState<Post | null>(null);

  const handleNav = (p: Page) => {
    setPage(p);
    setOpenPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen mesh-bg">
      <nav className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => handleNav("blog")} className="font-montserrat font-black text-lg gradient-text">
            &lt;/CodeBlog&gt;
          </button>
          <div className="flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`font-montserrat font-semibold text-sm px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  page === item.id && !openPost
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        {openPost ? (
          <PostPage post={openPost} onBack={() => { setOpenPost(null); window.scrollTo({ top: 0 }); }} />
        ) : page === "blog" ? (
          <BlogPage onOpenPost={(p) => { setOpenPost(p); window.scrollTo({ top: 0 }); }} />
        ) : page === "about" ? (
          <AboutPage />
        ) : (
          <SupportPage />
        )}
      </main>

      <footer className="border-t border-white/10 py-6 text-center">
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-2">
          <a href="tel:+79855127706" className="font-montserrat font-semibold text-yellow-400 hover:text-yellow-300 text-xs transition-colors">
            💳 Т-Банк: +7 985 512-77-06
          </a>
          <span className="text-white/20 hidden sm:inline">•</span>
          <a href="tel:+79776277844" className="font-montserrat font-semibold text-green-400 hover:text-green-300 text-xs transition-colors">
            🏦 Сбербанк: +7 977 627-78-44
          </a>
        </div>
        <p className="font-golos text-white/15 text-xs">© 2026 CodeBlog</p>
      </footer>
    </div>
  );
}