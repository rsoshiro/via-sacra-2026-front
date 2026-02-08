import { useState, useEffect, useRef } from 'react';
import type { ViaSacraData } from './types';

type Theme = 'light' | 'dark';

const Icons = {
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  
  Dirigente: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.25 4.5h1.5v3h3v1.5h-3v10.5h-1.5V9h-3V7.5h3v-3z" /></svg>,
  Todos: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.375h-14.25v-.375zM16.5 19.125a5.625 5.625 0 0111.25 0v.375h-11.25v-.375z" /></svg>,
  Leitor: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.237 8.237 0 0118 18.75c1.277 0 2.456.29 3.5.808a.75.75 0 001-.707V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" /></svg>,
  Canto: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M13.5 4.062a.75.75 0 01.512.71v12.648a3.75 3.75 0 11-1.5-3v-8.31l6-1.2v2.122a.75.75 0 01-1.5 0V5.151l-4.5.9v10.659a3.75 3.75 0 11-1.5-3V4.772a.75.75 0 01.988-.71z" /></svg>,
};

function App() {
  const [data, setData] = useState<ViaSacraData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1); 
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light'); 
  const [fontSize, setFontSize] = useState(1.15);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/via_sacra.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentIndex]);

  if (loading || !data) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin h-10 w-10 border-4 border-paroquia-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < data.secoes.length) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > -1) setCurrentIndex(prev => prev - 1);
  };

  const handleTapNavigation = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"], input')) return;
    const x = e.clientX;
    const width = window.innerWidth;
    const edgeRatio = 0.15;
    if (x < width * edgeRatio && currentIndex > -1) {
      handlePrev();
    } else if (x > width * (1 - edgeRatio) && currentIndex < data.secoes.length) {
      handleNext();
    }
  };

  const themeStyles = {
    light: {
      bg: 'bg-white', text: 'text-slate-900', header: 'bg-white border-slate-100',
      btnActive: 'bg-paroquia-purple text-white', btnInactive: 'bg-slate-100 text-slate-500',
      cardTodos: 'bg-paroquia-purple/10 border-paroquia-purple text-paroquia-dark',
      cardCanto: 'bg-paroquia-teal/5 border-paroquia-teal/30 text-paroquia-teal',
      cardOther: 'bg-slate-50 border-slate-200 text-slate-800'
    },
    dark: {
      bg: 'bg-[#1a052d]', text: 'text-slate-300', header: 'bg-[#120320] border-white/5',
      btnActive: 'bg-[#E040FB] text-white', btnInactive: 'bg-white/5 text-white/40',
      cardTodos: 'bg-[#8E24AA]/30 border-[#E040FB] text-white',
      cardCanto: 'bg-[#009688]/20 border-[#009688] text-[#009688]',
      cardOther: 'bg-white/5 border-white/10 text-slate-300'
    }
  };

  const s = themeStyles[theme];

  const currentSection = currentIndex >= 0 && currentIndex < data.secoes.length ? data.secoes[currentIndex] : null;
  const isCapa = currentIndex === -1;
  const isFinal = currentIndex === data.secoes.length;

  return (
    <div className={`flex flex-col h-[100dvh] overflow-hidden ${s.bg} ${s.text} transition-colors duration-300 font-sans`}>
      
      {/* Header */}
      <header className={`z-20 shrink-0 border-b ${s.header} shadow-sm px-4 py-3`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg active:bg-black/10 shrink-0">
              <Icons.Menu />
            </button>
            <h1 className="text-sm font-serif font-bold truncate max-w-[120px] xs:max-w-[180px]">
              {isCapa ? data.metadata.titulo : isFinal ? "Encerramento" : currentSection?.titulo}
            </h1>
          </div>

          {/* NOVO LOGO DISCRETO NO HEADER — fundo roxo para o logo translúcido */}
          <div className={`flex items-center justify-center px-2.5 py-1.5 rounded-lg shrink-0 ${theme === 'dark' ? 'bg-[#2a0a45]' : 'bg-paroquia-purple/55'}`}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/logo_paroquia.webp`} 
              alt="Logo" 
              className="h-9 w-auto object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                el.onerror = null;
                el.src = `${import.meta.env.BASE_URL}assets/images/logo-paroquia.png`;
                el.style.display = '';
              }}
            />
          </div>
          
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-lg p-1 shrink-0 ml-1">
            <button onClick={() => setFontSize(f => Math.max(0.8, f - 0.1))} className="px-3 py-1 text-xs font-bold border-r border-black/10 dark:border-white/10">A-</button>
            <button onClick={() => setFontSize(f => Math.min(2, f + 0.1))} className="px-3 py-1 text-xs font-bold">A+</button>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          {(['light', 'dark'] as Theme[]).map(t => (
            <button key={t} onClick={() => setTheme(t)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] font-bold uppercase transition-all ${theme === t ? s.btnActive : s.btnInactive}`}>
              {t === 'light' ? <Icons.Sun /> : <Icons.Moon />}
              <span className="ml-1">{t === 'light' ? 'Dia' : 'Noite'}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth" onClick={handleTapNavigation}>
        
        {/* CONTEÚDO DA CAPA */}
        {isCapa && (
          <div className="flex flex-col items-center justify-center min-h-full p-6 text-center">
            <div className="w-full max-w-sm">
              <img 
                src={`${import.meta.env.BASE_URL}${data.metadata.capa_path}`} 
                alt="Capa Via Sacra" 
                className="w-full h-auto rounded-2xl shadow-2xl mb-12 border-4 border-white/10 block mx-auto"
              />
              <p className="text-paroquia-teal font-bold tracking-[0.3em] mb-12 uppercase text-sm">
                {data.metadata.ano} • {data.metadata.periodo}
              </p>
              
              <button 
                onClick={() => setCurrentIndex(0)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl active:scale-95 transition-all
                  ${theme === 'dark' ? 'bg-[#E040FB]' : 'bg-[#8E24AA]'} text-white mb-10`}
              >
                Começar Oração
              </button>
            </div>
          </div>
        )}

        {/* CONTEÚDO DAS ESTAÇÕES E ORAÇÕES */}
        {currentSection && (
          <div className={`max-w-2xl mx-auto px-4 ${currentSection.imagem ? 'pt-4' : 'pt-8'} pb-40`}>
            {currentSection.imagem && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 bg-black/5">
                <img 
                  src={`${import.meta.env.BASE_URL}${currentSection.imagem}`} 
                  className="w-full h-auto max-h-[65vh] object-contain block mx-auto" 
                  loading="lazy" 
                />
              </div>
            )}

            {!currentSection.imagem && (
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-serif font-black leading-tight mb-2 uppercase tracking-tight">{currentSection.titulo}</h2>
                {currentSection.subtitulo && (
                   <p className="text-lg font-bold opacity-80 tracking-tight leading-snug">{currentSection.subtitulo}</p>
                )}
                <div className="h-1 w-12 bg-paroquia-teal mx-auto mt-4"></div>
              </div>
            )}

            <div className="space-y-6">
              {currentSection.conteudo.map((item, idx) => {
                const q = item.quem.toLowerCase();
                const isTodos = q.includes('todos') || q.includes('assembleia');
                const isCanto = q.includes('canto') || q.includes('música');
                const isDirigente = q.includes('dirigente') || q.includes('presidente');

                let cardStyle = s.cardOther;
                let Icon = Icons.Leitor;
                if (isTodos) { cardStyle = s.cardTodos; Icon = Icons.Todos; }
                else if (isCanto) { cardStyle = s.cardCanto; Icon = Icons.Canto; }
                else if (isDirigente) Icon = Icons.Dirigente;

                return (
                  <div key={idx} className={`relative rounded-2xl border-l-[6px] p-5 transition-all ${cardStyle} shadow-sm`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`${isTodos ? 'text-paroquia-purple' : 'opacity-50'}`}><Icon /></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isTodos ? 'text-paroquia-purple' : 'opacity-60'}`}>
                        {item.quem}
                      </span>
                    </div>
                    <p className={`font-serif leading-relaxed ${isTodos ? 'font-bold' : ''}`} style={{ fontSize: `${fontSize}rem`, lineHeight: '1.6' }}>
                      {item.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTEÚDO FINAL */}
        {isFinal && (
          <div className="flex flex-col items-center justify-center min-h-full p-8 text-center bg-paroquia-dark/5">
            <div className="w-full max-w-sm py-12">
              <img 
                src={`${import.meta.env.BASE_URL}${data.metadata.logo_path}`} 
                alt="Logo Paróquia" 
                className="w-full h-auto max-h-[40vh] object-contain mb-12 block mx-auto drop-shadow-2xl"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-black uppercase tracking-tight">Obrigado por Rezar Conosco</h3>
                <div className="h-1 w-16 bg-paroquia-teal mx-auto mb-6"></div>
                <p className="font-bold text-lg opacity-90">{data.metadata.paroquia}</p>
                <p className="text-sm opacity-50 uppercase tracking-[0.3em]">{data.metadata.local} • {data.metadata.ano}</p>
              </div>
              
              <button 
                onClick={() => setCurrentIndex(-1)}
                className={`mt-12 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs border-2 border-current opacity-40 hover:opacity-100 transition-all`}
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Navegação Inferior */}
      {!isFinal && (
        <nav className={`z-30 shrink-0 p-4 pb-safe flex gap-3 ${s.header} border-t shadow-[0_-10px_30px_rgba(0,0,0,0.1)]`}>
          <button 
            onClick={handlePrev}
            className={`h-16 w-1/3 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 border-2 cursor-pointer
              ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
          >
            <Icons.ChevronLeft />
            <span className="text-[9px] font-black uppercase mt-1">Voltar</span>
          </button>

          <button 
            onClick={handleNext}
            className={`h-16 w-2/3 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl cursor-pointer
              ${theme === 'dark' ? 'bg-[#E040FB] shadow-[#E040FB]/20' : 'bg-[#8E24AA] shadow-[#8E24AA]/30'} text-white`}
          >
            <span className="text-lg">{isCapa ? "Iniciar" : "Próxima"}</span>
            <Icons.ChevronRight />
          </button>
        </nav>
      )}

      {/* Sidebar Índice */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${s.bg} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`p-6 border-b ${s.header} flex justify-between items-center`}>
          <h2 className="font-serif font-bold text-xl uppercase tracking-tighter">Índice</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-3 rounded-full active:bg-black/10"><Icons.Close /></button>
        </div>
        <div className="flex-1 overflow-y-auto pt-4 px-4 pb-safe-sidebar space-y-2">
          <button onClick={() => { setCurrentIndex(-1); setSidebarOpen(false); }} className={`w-full text-left p-4 rounded-xl font-bold text-sm ${isCapa ? 'bg-[#8E24AA] text-white' : 'opacity-70'}`}>CAPA</button>
          {data.secoes.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => { setCurrentIndex(idx); setSidebarOpen(false); }}
              className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all
                ${currentIndex === idx ? 'bg-[#8E24AA] text-white shadow-md' : 'active:bg-black/5 opacity-70 border border-current/10'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] border ${currentIndex === idx ? 'bg-white/20 border-white/40' : 'border-current/30'}`}>
                {idx + 1}
              </span>
              <span className="font-bold text-xs truncate uppercase tracking-tight">{section.titulo}</span>
            </button>
          ))}
          <button onClick={() => { setCurrentIndex(data.secoes.length); setSidebarOpen(false); }} className={`w-full text-left p-4 rounded-xl font-bold text-sm ${isFinal ? 'bg-[#8E24AA] text-white' : 'opacity-70'}`}>ENCERRAMENTO</button>
        </div>
      </aside>
    </div>
  );
}

export default App;
