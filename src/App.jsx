import React, { useState, useEffect } from 'react';
import { 
  Leaf, Wallet, ShoppingBag, User, Bell, QrCode, Camera, Bike, 
  Users, History, MapPin, Bus, Globe, Settings, Square, Play, 
  Navigation, BarChart3, Link as LinkIcon, Hash, CheckCircle2, Copy, Zap
} from 'lucide-react';

// --- KONFIGURACIJA PODATAKA ---
const generateMockHash = () => "0x" + Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const MOCK_WALLET_ADDRESS = "GB72PLQA5Y4...K9J2M"; 

const translations = {
  en: {
    greeting: "Hi", value: "value", level: "Level", nextLevel: "{xp} XP to next level.",
    dailyChallenge: "Daily Challenge", challengeDesc: "Car-free day - save CO2!",
    accept: "Accept Challenge", quickActions: "Quick Actions", scan: "Scan",
    report: "Report", start: "Start", stop: "Stop", invite: "Invite",
    walletTotal: "Total Balance", history: "Transaction History", marketTitle: "City Market",
    marketDesc: "Redeem your merits for rewards in", buy: "Buy", profile: "Profile",
    settings: "Settings", language: "Language", location: "Location", gpsSetting: "GPS Tracking",
    gpsOn: "Enabled", gpsOff: "Disabled", globalMap: "Global Presence", score: "Score",
    rank: "Rank", maxSupply: "Max Supply", circulating: "Circulating", walletAddr: "Pi Wallet Address",
    networkStatus: "Network Status", blockHeight: "Ledger Index", txHash: "Tx Hash",
    confirmed: "Confirmed", scpReady: "Pi Mainnet Online",
    nav: { act: "Act", wallet: "Wallet", market: "Market", profile: "Profile" },
    rewards: { parking: "1h Parking", bus: "Public Transport (30 min)", cinema: "Cinema Ticket", donation: "Animal Shelter Donation" },
    transactions: { glass: "Glass Recycling", bike: "Bike to Work", partner: "Partner Discount", scan: "QR Scan", ride: "Eco Ride", buy: "Purchase" }
  },
  hr: {
    greeting: "Bok", value: "vrijednosti", level: "Razina", nextLevel: "Još {xp} XP do nove razine.",
    dailyChallenge: "Dnevni Izazov", challengeDesc: "Dan bez automobila - uštedi CO2!",
    accept: "Prihvati Izazov", quickActions: "Brze Akcije", scan: "Skeniraj",
    report: "Prijavi", start: "Kreni", stop: "Zaustavi", invite: "Pozovi",
    walletTotal: "Ukupno stanje", history: "Povijest transakcija", marketTitle: "Gradska Tržnica",
    marketDesc: "Zamijeni svoje zasluge za nagrade u", buy: "Kupi", profile: "Profil",
    settings: "Postavke", language: "Jezik", location: "Lokacija", gpsSetting: "GPS Praćenje",
    gpsOn: "Uključeno", gpsOff: "Isključeno", globalMap: "Globalna prisutnost", score: "Bodovi",
    rank: "Rang", maxSupply: "Max Zaliha", circulating: "U optjecaju", walletAddr: "Pi Novčanik",
    networkStatus: "Status Mreže", blockHeight: "Ledger Index", txHash: "Tx Hash",
    confirmed: "Potvrđeno", scpReady: "Pi Mainnet Online",
    nav: { act: "Djeluj", wallet: "Novčanik", market: "Tržnica", profile: "Profil" },
    rewards: { parking: "1h Parking", bus: "Javni prijevoz (30 min)", cinema: "Kino Ulaznica", donation: "Donacija za Azil" },
    transactions: { glass: "Recikliranje stakla", bike: "Biciklom na posao", partner: "Partner popust", scan: "QR Skeniranje", ride: "Eko Vožnja", buy: "Kupnja" }
  },
  de: { // Njemački
    greeting: "Hallo", value: "Wert", level: "Stufe", nextLevel: "{xp} XP bis zum nächsten Level.",
    dailyChallenge: "Tägliche Herausforderung", challengeDesc: "Autofreier Tag - spare CO2!",
    accept: "Herausforderung annehmen", quickActions: "Schnelle Aktionen", scan: "Scannen",
    report: "Melden", start: "Starten", stop: "Stoppen", invite: "Einladen",
    walletTotal: "Gesamtsaldo", history: "Transaktionsverlauf", marketTitle: "Stadtmarkt",
    marketDesc: "Tausche deine Verdienste für Belohnungen in", buy: "Kaufen", profile: "Profil",
    settings: "Einstellungen", language: "Sprache", location: "Standort", gpsSetting: "GPS-Tracking",
    gpsOn: "Aktiviert", gpsOff: "Deaktiviert", globalMap: "Globale Präsenz", score: "Punkte",
    rank: "Rang", maxSupply: "Max Versorgung", circulating: "Im Umlauf", walletAddr: "Pi Wallet Adresse",
    networkStatus: "Netzwerkstatus", blockHeight: "Ledger Index", txHash: "Tx Hash",
    confirmed: "Bestätigt", scpReady: "Pi Mainnet Online",
    nav: { act: "Handeln", wallet: "Wallet", market: "Markt", profile: "Profil" },
    rewards: { parking: "1h Parken", bus: "Öffentlicher Verkehr (30 min)", cinema: "Kino Ticket", donation: "Spende für Tierheim" },
    transactions: { glass: "Glasrecycling", bike: "Fahrrad zur Arbeit", partner: "Partner-Rabatt", scan: "QR-Scan", ride: "Eco-Fahrt", buy: "Kauf" }
  },
  fr: { // Francuski
    greeting: "Salut", value: "valeur", level: "Niveau", nextLevel: "{xp} XP au prochain niveau.",
    dailyChallenge: "Défi quotidien", challengeDesc: "Journée sans voiture - économise du CO2 !",
    accept: "Accepter le défi", quickActions: "Actions rapides", scan: "Scanner",
    report: "Signaler", start: "Démarrer", stop: "Arrêter", invite: "Inviter",
    walletTotal: "Solde total", history: "Historique des transactions", marketTitle: "Marché de la ville",
    marketDesc: "Échange tes mérites contre des récompenses dans", buy: "Acheter", profile: "Profil",
    settings: "Paramètres", language: "Langue", location: "Emplacement", gpsSetting: "Suivi GPS",
    gpsOn: "Activé", gpsOff: "Désactivé", globalMap: "Présence globale", score: "Score",
    rank: "Rang", maxSupply: "Fourniture maximale", circulating: "En circulation", walletAddr: "Adresse Pi Wallet",
    networkStatus: "Statut du réseau", blockHeight: "Index du grand livre", txHash: "Tx Hash",
    confirmed: "Confirmé", scpReady: "Pi Mainnet en ligne",
    nav: { act: "Agir", wallet: "Portefeuille", market: "Marché", profile: "Profil" },
    rewards: { parking: "1h Parking", bus: "Transport public (30 min)", cinema: "Ticket de cinéma", donation: "Don pour refuge animalier" },
    transactions: { glass: "Recyclage du verre", bike: "Vélo au travail", partner: "Remise partenaire", scan: "Scan QR", ride: "Trajet éco", buy: "Achat" }
  },
  es: { // Španjolski
    greeting: "Hola", value: "valor", level: "Nivel", nextLevel: "{xp} XP al siguiente nivel.",
    dailyChallenge: "Desafío diario", challengeDesc: "Día sin coche - ahorra CO2!",
    accept: "Aceptar desafío", quickActions: "Acciones rápidas", scan: "Escanear",
    report: "Reportar", start: "Iniciar", stop: "Detener", invite: "Invitar",
    walletTotal: "Saldo total", history: "Historial de transacciones", marketTitle: "Mercado de la ciudad",
    marketDesc: "Canjea tus méritos por recompensas en", buy: "Comprar", profile: "Perfil",
    settings: "Configuraciones", language: "Idioma", location: "Ubicación", gpsSetting: "Seguimiento GPS",
    gpsOn: "Habilitado", gpsOff: "Deshabilitado", globalMap: "Presencia global", score: "Puntuación",
    rank: "Rango", maxSupply: "Suministro máximo", circulating: "En circulación", walletAddr: "Dirección Pi Wallet",
    networkStatus: "Estado de la red", blockHeight: "Índice del libro mayor", txHash: "Tx Hash",
    confirmed: "Confirmado", scpReady: "Pi Mainnet en línea",
    nav: { act: "Actuar", wallet: "Billetera", market: "Mercado", profile: "Perfil" },
    rewards: { parking: "1h Estacionamiento", bus: "Transporte público (30 min)", cinema: "Entrada de cine", donation: "Donación para refugio de animales" },
    transactions: { glass: "Reciclaje de vidrio", bike: "Bicicleta al trabajo", partner: "Descuento socio", scan: "Escaneo QR", ride: "Viaje eco", buy: "Compra" }
  },
  ru: { // Ruski
    greeting: "Привет", value: "значение", level: "Уровень", nextLevel: "{xp} XP до следующего уровня.",
    dailyChallenge: "Ежедневное задание", challengeDesc: "День без автомобиля - сэкономь CO2!",
    accept: "Принять вызов", quickActions: "Быстрые действия", scan: "Сканировать",
    report: "Сообщить", start: "Начать", stop: "Остановить", invite: "Пригласить",
    walletTotal: "Общий баланс", history: "История транзакций", marketTitle: "Городской рынок",
    marketDesc: "Обменяй свои заслуги на награды в", buy: "Купить", profile: "Профиль",
    settings: "Настройки", language: "Язык", location: "Местоположение", gpsSetting: "Отслеживание GPS",
    gpsOn: "Включено", gpsOff: "Выключено", globalMap: "Глобальное присутствие", score: "Очки",
    rank: "Ранг", maxSupply: "Макс. запас", circulating: "В обращении", walletAddr: "Адрес Pi Wallet",
    networkStatus: "Статус сети", blockHeight: "Индекс реестра", txHash: "Tx Hash",
    confirmed: "Подтверждено", scpReady: "Pi Mainnet онлайн",
    nav: { act: "Действовать", wallet: "Кошелек", market: "Рынок", profile: "Профиль" },
    rewards: { parking: "1ч Парковка", bus: "Общественный транспорт (30 мин)", cinema: "Билет в кино", donation: "Пожертвование в приют" },
    transactions: { glass: "Переработка стекла", bike: "Велосипед на работу", partner: "Скидка партнера", scan: "Сканирование QR", ride: "Эко-поездка", buy: "Покупка" }
  },
  pt: { // Portugalski
    greeting: "Olá", value: "valor", level: "Nível", nextLevel: "{xp} XP para o próximo nível.",
    dailyChallenge: "Desafio diário", challengeDesc: "Dia sem carro - economize CO2!",
    accept: "Aceitar desafio", quickActions: "Ações rápidas", scan: "Digitalizar",
    report: "Relatar", start: "Iniciar", stop: "Parar", invite: "Convidar",
    walletTotal: "Saldo total", history: "Histórico de transações", marketTitle: "Mercado da cidade",
    marketDesc: "Troque seus méritos por recompensas em", buy: "Comprar", profile: "Perfil",
    settings: "Configurações", language: "Idioma", location: "Localização", gpsSetting: "Rastreamento GPS",
    gpsOn: "Ativado", gpsOff: "Desativado", globalMap: "Presença global", score: "Pontuação",
    rank: "Classificação", maxSupply: "Fornecimento máximo", circulating: "Em circulação", walletAddr: "Endereço Pi Wallet",
    networkStatus: "Status da rede", blockHeight: "Índice do livro-razão", txHash: "Tx Hash",
    confirmed: "Confirmado", scpReady: "Pi Mainnet online",
    nav: { act: "Agir", wallet: "Carteira", market: "Mercado", profile: "Perfil" },
    rewards: { parking: "1h Estacionamento", bus: "Transporte público (30 min)", cinema: "Ingresso de cinema", donation: "Doação para abrigo de animais" },
    transactions: { glass: "Reciclagem de vidro", bike: "Bicicleta para o trabalho", partner: "Desconto parceiro", scan: "Digitalização QR", ride: "Viagem eco", buy: "Compra" }
  },
  zh: { // Kineski (pojednostavljeni)
    greeting: "你好", value: "价值", level: "级别", nextLevel: "到下一个级别还需 {xp} XP。",
    dailyChallenge: "每日挑战", challengeDesc: "无车日 - 节省 CO2！",
    accept: "接受挑战", quickActions: "快速行动", scan: "扫描",
    report: "报告", start: "开始", stop: "停止", invite: "邀请",
    walletTotal: "总余额", history: "交易历史", marketTitle: "城市市场",
    marketDesc: "在以下地点兑换你的功绩以获得奖励", buy: "购买", profile: "个人资料",
    settings: "设置", language: "语言", location: "位置", gpsSetting: "GPS 跟踪",
    gpsOn: "启用", gpsOff: "禁用", globalMap: "全球存在", score: "分数",
    rank: "排名", maxSupply: "最大供应", circulating: "流通中", walletAddr: "Pi 钱包地址",
    networkStatus: "网络状态", blockHeight: "账本索引", txHash: "Tx Hash",
    confirmed: "已确认", scpReady: "Pi 主网在线",
    nav: { act: "行动", wallet: "钱包", market: "市场", profile: "个人资料" },
    rewards: { parking: "1小时停车", bus: "公共交通 (30 分钟)", cinema: "电影票", donation: "动物收容所捐赠" },
    transactions: { glass: "玻璃回收", bike: "骑自行车上班", partner: "合作伙伴折扣", scan: "QR 扫描", ride: "生态骑行", buy: "购买" }
  },
};

const locations = [
  { country: "Croatia", city: "Zagreb", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Split", currency: "EUR", region: "eu" },
  { country: "Germany", city: "Berlin", currency: "EUR", region: "eu" },
  { country: "USA", city: "New York", currency: "USD", region: "na" },
  // Novi gradovi
  { country: "China", city: "Peking", currency: "CNY", region: "as" },
  { country: "Japan", city: "Tokio", currency: "JPY", region: "as" },
  { country: "USA", city: "LA", currency: "USD", region: "na" }, // Los Angeles
  { country: "France", city: "Pariz", currency: "EUR", region: "eu" },
  { country: "Czech Republic", city: "Prag", currency: "CZK", region: "eu" },
  { country: "Russia", city: "Moskva", currency: "RUB", region: "eu" },
  { country: "USA", city: "Miami", currency: "USD", region: "na" },
  { country: "Spain", city: "Barcelona", currency: "EUR", region: "eu" },
  { country: "Australia", city: "Adelaide", currency: "AUD", region: "as" },
  { country: "Australia", city: "Melburn", currency: "AUD", region: "as" },
  { country: "Croatia", city: "Rijeka", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Osijek", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Dubrovnik", currency: "EUR", region: "eu" },
];

const WorldMap = ({ selectedRegion }) => {
  const paths = {
    na: "M 50,60 L 120,50 L 160,90 L 130,160 L 80,140 Z", 
    eu: "M 230,60 L 300,50 L 320,90 L 280,100 L 240,90 Z", 
    as: "M 310,50 L 450,50 L 480,130 L 390,160 L 330,100 Z", 
  };
  const getColor = (regionKey) => selectedRegion === regionKey ? "#F59E0B" : "#E5E7EB"; 
  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
      <svg viewBox="0 0 500 300" className="w-full h-auto">
        <rect x="0" y="0" width="500" height="300" fill="#F9FAFB" rx="10" />
        <path d={paths.na} fill={getColor('na')} className="transition-colors duration-500" />
        <path d={paths.eu} fill={getColor('eu')} className="transition-colors duration-500" />
        <path d={paths.as} fill={getColor('as')} className="transition-colors duration-500" />
      </svg>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [merits, setMerits] = useState(1250);
  const [notification, setNotification] = useState(null);
  const [level, setLevel] = useState({ name: 'Eco Novice', progress: 75, max: 100 });
  const [lang, setLang] = useState('en'); // Sada default engleski
  const [currentLocation, setCurrentLocation] = useState(locations[0]); 
  const [isTracking, setIsTracking] = useState(false);
  const [gpsPermission, setGpsPermission] = useState(true);
  const [blockHeight, setBlockHeight] = useState(18243921);

  const t = translations[lang] || translations['en'];

  const [transactions, setTransactions] = useState([
    { id: 1, titleKey: 'glass', amount: 50, type: 'plus', date: '10:23', hash: generateMockHash() },
    { id: 2, titleKey: 'bike', amount: 120, type: 'plus', date: '08:45', hash: generateMockHash() },
  ]);

  const rewards = [
    { id: 1, titleKey: 'parking', suffix: `(${currentLocation.city})`, cost: 300, icon: <MapPin size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, titleKey: 'bus', cost: 200, icon: <Bus size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, titleKey: 'cinema', cost: 800, icon: <ShoppingBag size={20} />, color: 'bg-purple-100 text-purple-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setBlockHeight(prev => prev + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScan = () => {
    showNotification(`✅ +50 Merits! (${t.scan})`);
    setMerits(prev => prev + 50);
    setTransactions(prev => [{ id: Date.now(), titleKey: 'scan', amount: 50, type: 'plus', date: 'Now', hash: generateMockHash() }, ...prev]);
  };

  const toggleTracking = () => {
    if (!gpsPermission) return showNotification("⚠️ GPS is disabled!");
    setIsTracking(!isTracking);
    showNotification(isTracking ? "⏹️ Tracking Stopped" : "📍 GPS Tracking Started");
  };

  const HomeView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <p className="text-emerald-100 text-sm mb-1">{t.greeting}, Ivan 👋</p>
          <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
            <MapPin size={10} /><span>{currentLocation.city}</span>
          </div>
        </div>
        <div className="flex items-baseline space-x-2 mt-2 relative z-10">
          <h1 className="text-5xl font-bold">{merits}</h1><span className="text-emerald-200 font-medium">M</span>
        </div>
        <div className="mt-6 relative z-10">
          <div className="flex justify-between text-xs mb-2"><span>{t.level}: {level.name}</span><span>{level.progress}/{level.max} XP</span></div>
          <div className="w-full bg-black/20 rounded-full h-2"><div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: `${(level.progress / level.max) * 100}%` }}></div></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Bike size={20} /></div>
            <div><h3 className="font-bold text-gray-800">{t.dailyChallenge}</h3><p className="text-xs text-gray-500">{t.challengeDesc}</p></div>
          </div>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">+150 M</span>
        </div>
        <button onClick={toggleTracking} className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 ${isTracking ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'}`}>
          {isTracking ? <><Square size={16} className="mr-1" /> {t.stop}</> : <><Play size={16} className="mr-1" /> {t.accept}</>}
        </button>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-4 px-1">{t.quickActions}</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleScan} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50"><QrCode size={24} className="text-blue-600"/><span className="text-sm">{t.scan}</span></button>
          <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50"><Camera size={24} className="text-red-600"/><span className="text-sm">{t.report}</span></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20 relative overflow-hidden select-none">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-xl z-50 flex items-center space-x-2">
           <CheckCircle2 size={16} className="text-emerald-400" /><span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-y-auto overflow-x-hidden">
        <div className="p-4 pt-12">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'wallet' && <div className="p-4 text-center">Wallet View Placeholder</div>}
          {activeTab === 'market' && <div className="p-4 text-center">Market View Placeholder</div>}
          {activeTab === 'profile' && <div className="p-4 text-center">Profile View Placeholder</div>}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-40 max-w-md mx-auto rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center">
             {['home', 'wallet', 'market', 'profile'].map(tab => (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center space-y-1 ${activeTab === tab ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}>
                 {tab === 'home' && <Zap size={24} />}
                 {tab === 'wallet' && <Wallet size={24} />}
                 {tab === 'market' && <ShoppingBag size={24} />}
                 {tab === 'profile' && <User size={24} />}
                 <span className="text-[10px] font-medium capitalize">{tab}</span>
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}