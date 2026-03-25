// Konfigurasi API Groq
const GROQ_API_KEY = "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";
// Initialized Dummy Data
const dummyAdmin = { email: "admin@econusantara.id", password: "admin123", role: "admin", name: "Admin Utama" };
const initialUsers = [
    dummyAdmin,
    { email: "user@test.com", password: "password", role: "user", name: "Relawan Alam", points: 150, treesAdopted: 3 }
];

const translations = {
    id: {
        "nav_home": "Home",
        "nav_map": "Peta",
        "nav_donate": "Donasi",
        "nav_edu": "Edukasi",
        "nav_market": "Eco Market",
        "nav_trans": "Transparansi",
        "nav_events": "Events",
        "nav_login": "Login",
        "nav_register": "Daftar",
        "nav_dashboard": "Dashboard",
        "nav_community": "Komunitas",
        "nav_rewards": "Rewards",
        "nav_settings": "Settings",
        "nav_logout": "Logout",
        "nav_mitra": "Mitra Hijau",
        "btn_donate": "Donasi Sekarang",
        "nav_manage_users": "Manajemen User",
        "nav _monitoring": "Monitoring Relawan",
        "admin_status": "Sistem Aktif",
        "admin_panel": "Admin Panel",
        "admin_role": "Administrator",
        "admin_logout": "Keluar",
        "admin_lang_switch": "Ganti Bahasa (EN)",
        "admin_public": "Lihat Web Publik",
        "admin_monitoring": "Monitoring Relawan",
        "admin_menu_label": "Menu Utama"
    },
    en: {
        "nav_home": "Home",
        "nav_map": "Map",
        "nav_donate": "Donate",
        "nav_edu": "Education",
        "nav_market": "Eco Market",
        "nav_trans": "Transparency",
        "nav_events": "Events",
        "nav_login": "Login",
        "nav_register": "Register",
        "nav_dashboard": "Dashboard",
        "nav_community": "Community",
        "nav_rewards": "Rewards",
        "nav_settings": "Settings",
        "nav_logout": "Logout",
        "nav_mitra": "Green Partner",
        "btn_donate": "Donate Now",
        "nav_manage_users": "User Management",
        "nav _monitoring": "Volunteer Monitoring",
        "admin_status": "System Active",
        "admin_panel": "Admin Panel",
        "admin_role": "Administrator",
        "admin_logout": "Logout",
        "admin_lang_switch": "Switch Language (ID)",
        "admin_public": "View Public Site",
        "admin_monitoring": "Volunteer Monitoring",
        "admin_menu_label": "Main Menu"
    }
};

// Initialize localStorage if empty
function initStorage() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem("newsletters")) {
        localStorage.setItem("newsletters", JSON.stringify([]));
    }
    if (!localStorage.getItem("lang")) {
        localStorage.setItem("lang", "id");
    }
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
}

// Check logged in state
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Protect route (redirect to login if not authenticated)
function protectRoute() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

// Protect admin route
function protectAdminRoute() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = "login.html";
    }
}

// ── Search index: all searchable pages ──
const NAV_SEARCH_INDEX = [
    { href: 'index.html',        label: 'Home / Beranda',    keywords: ['home', 'beranda', 'utama'] },
    { href: 'peta.html',         label: 'Peta Penanaman',    keywords: ['peta', 'map', 'lokasi', 'tanam'] },
    { href: 'donasi.html',       label: 'Donasi / Donate',   keywords: ['donasi', 'donate', 'sumbang'] },
    { href: 'edukasi.html',      label: 'Edukasi & Panduan', keywords: ['edukasi', 'education', 'belajar', 'panduan'] },
    { href: 'marketplace.html',  label: 'Eco Market',        keywords: ['marketplace', 'toko', 'shop', 'market'] },
    { href: 'transparansi.html', label: 'Transparansi Laporan', keywords: ['transparansi', 'transparency', 'laporan'] },
    { href: 'events.html',       label: 'Volunteer & Events', keywords: ['events', 'acara', 'kegiatan', 'volunteer'] },
    { href: 'dashboard.html',    label: 'Dashboard',         keywords: ['dashboard', 'profil', 'akun'] },
    { href: 'komunitas.html',    label: 'Komunitas / Forum', keywords: ['komunitas', 'community', 'forum'] },
    { href: 'rewards.html',      label: 'Redeem Rewards',    keywords: ['rewards', 'reward', 'poin', 'tukar'] },
    { href: 'kontak.html',       label: 'Kontak Kami',       keywords: ['kontak', 'contact', 'hubungi', 'bantuan'] },
    { href: 'about.html',        label: 'Tentang Kami',      keywords: ['about', 'tentang', 'misi', 'visi'] },
    { href: 'settings.html',     label: 'Pengaturan / Settings', keywords: ['settings', 'pengaturan', 'setting'] },
    { href: 'mitra.html',        label: 'Kemitraan UMKM',     keywords: ['mitra', 'umkm', 'gabung', 'jual', 'partner'] },
];

function navSearch(query) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    return NAV_SEARCH_INDEX.filter(p =>
        p.label.toLowerCase().includes(q) ||
        p.keywords.some(k => k.includes(q))
    ).slice(0, 6);
}

function renderNavbar() {
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    const user = getCurrentUser();
    const lang = localStorage.getItem("lang") || "id";
    const t = translations[lang];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navLinks = [
        { href: 'index.html',        label: t.nav_home },
        { href: 'peta.html',         label: t.nav_map },
        { href: 'donasi.html',       label: t.nav_donate },
        { href: 'edukasi.html',      label: t.nav_edu },
        { href: 'marketplace.html',  label: t.nav_market },
        { href: 'transparansi.html', label: t.nav_trans },
        { href: 'events.html',       label: t.nav_events },
        
    ];

    if (user && user.role !== 'admin') {
        navLinks.push(
            { href: 'dashboard.html', label: t.nav_dashboard },
            { href: 'komunitas.html', label: t.nav_community },
            { href: 'settings.html',  label: t.nav_settings }
        );
    }

    const desktopLinks = navLinks.map(({ href, label }) => {
        const active = currentPage === href;
        return `<a href="${href}" class="whitespace-nowrap px-2.5 py-1.5 text-[13px] font-medium transition-all ${
            active ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-700'
        }">${label}</a>`;
    }).join('');

    const initials = user ? (user.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '';
    
    const userActions = user ? `
        <div class="flex items-center gap-3">
            <button onclick="toggleLang()" class="text-[11px] font-bold text-gray-500 hover:text-green-600 border border-gray-200 px-2 py-1 rounded transition-colors uppercase cursor-pointer">
                ${lang}
            </button>
            <div class="h-6 w-px bg-gray-200"></div>
            <div class="flex items-center gap-3 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-100 group">
                <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                    ${initials}
                </div>
                <button onclick="logout()" class="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider cursor-pointer">
                    ${t.nav_logout}
                </button>
            </div>
        </div>
    ` : `
        <div class="flex items-center gap-3">
            <button onclick="toggleLang()" class="text-[11px] font-bold text-gray-500 hover:text-green-600 border border-gray-200 px-2 py-1 rounded transition-colors uppercase cursor-pointer">
                ${lang}
            </button>
            <a href="login.html" class="text-xs font-bold text-gray-600 hover:text-green-600 uppercase tracking-widest transition-colors">LOGIN</a>
        </div>
    `;

    navContainer.innerHTML = `
      <nav class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
            <div class="max-w-[1600px] mx-auto px-4">
                <div class="flex items-center h-16 justify-between gap-4">
                    <div class="flex items-center flex-shrink-0">
                        <a href="index.html" class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <i data-lucide="leaf" class="w-4 h-4 text-white"></i>
                            </div>
                            <span class="font-bold text-lg text-green-800 tracking-tight">EcoNusantara</span>
                        </a>
                    </div>

                    <div class="hidden xl:flex items-center gap-1 overflow-x-auto scrollbar-hide">
                        ${desktopLinks}
                    </div>

                    <div class="flex items-center gap-3 flex-shrink-0">
                        <div class="hidden md:flex relative items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-200 focus-within:border-green-400 w-48 lg:w-64">
                            <i data-lucide="search" class="w-4 h-4 text-gray-400"></i>
                            <input id="nav-search-input-desktop" type="text" placeholder="Cari..." autocomplete="off" class="bg-transparent text-sm ml-2 outline-none w-full text-gray-700">
                            <div id="nav-search-dropdown-desktop" class="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[150] py-1"></div>
                        </div>
                        
                        <div class="hidden sm:block">
                            ${userActions}
                        </div>

                        <button onclick="toggleMobileMenu()" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden">
                            <i data-lucide="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="drawer-overlay" class="hidden fixed inset-0 bg-black/40 z-[110]" onclick="closeMobileMenu()"></div>
            <div id="mobile-drawer" class="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[120] transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
                <div class="bg-[#166534] p-4 flex items-center justify-between text-white">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><i data-lucide="leaf" class="w-4 h-4 text-white"></i></div>
                        <span class="font-bold text-sm">EcoNusantara</span>
                    </div>
                    <button onclick="closeMobileMenu()" class="p-1 hover:bg-white/10 rounded-md"><i data-lucide="x" class="w-5 h-5 text-white"></i></button>
                </div>

                <div class="p-4 border-b border-gray-100">
                    <div class="relative flex items-center bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
                        <i data-lucide="search" class="w-4 h-4 text-gray-400"></i>
                        <input id="nav-search-input-mobile" type="text" placeholder="Cari menu..." autocomplete="off" class="bg-transparent text-sm ml-2 outline-none w-full text-gray-700">
                    </div>
                    <div id="nav-search-results-mobile" class="hidden mt-2 bg-white rounded-lg border border-gray-100 shadow-lg overflow-hidden py-1 max-h-60 overflow-y-auto"></div>
                </div>

                <div class="flex-1 overflow-y-auto py-2">
                    ${navLinks.map(link => `
                        <a href="${link.href}" class="flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-gray-50 text-gray-600 hover:bg-gray-50">
                            ${link.label}
                        </a>`).join('')}
                </div>
                
                <div class="p-4 border-t border-gray-100 space-y-3">
                    ${user ? `
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">${initials}</div>
                            <div class="flex flex-col"><span class="text-sm font-bold text-gray-800">${user.name}</span></div>
                        </div>
                        <button onclick="logout()" class="w-full flex items-center justify-center gap-2 py-2 border border-red-100 rounded-xl text-red-500 font-bold text-sm">Logout</button>
                    ` : `<a href="login.html" class="w-full flex items-center justify-center py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm">Masuk</a>`}
                    
                    <button onclick="toggleLang()" class="w-full text-xs font-bold text-gray-400 uppercase py-2">
                        GANTI BAHASA (${lang === 'id' ? 'EN' : 'ID'})
                    </button>
                </div>
            </div>
        </nav>
    `;

    lucide.createIcons();

    // --- LOGIKA PENCARIAN (DESKTOP & MOBILE) ---
    const setupSearch = (inputId, dropdownId) => {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        if (!input || !dropdown) return;

        input.addEventListener('input', () => {
            const query = input.value;
            const results = navSearch(query);
            if (results.length > 0 && query.length >= 2) {
                dropdown.innerHTML = results.map(r => `
                    <a href="${r.href}" class="flex items-center justify-between px-4 py-3 hover:bg-green-50 transition-colors group border-b border-gray-50 last:border-0">
                        <div class="flex items-center gap-3">
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-green-500 opacity-0 group-hover:opacity-100 transition-all"></i>
                            <span class="text-sm font-semibold text-gray-800">${r.label}</span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">${r.href}</span>
                    </a>
                `).join('');
                dropdown.classList.remove('hidden');
                lucide.createIcons();
            } else {
                dropdown.classList.add('hidden');
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const results = navSearch(input.value);
                if (results.length > 0) window.location.href = results[0].href;
            }
        });
    };

    setupSearch('nav-search-input-desktop', 'nav-search-dropdown-desktop');
    setupSearch('nav-search-input-mobile', 'nav-search-results-mobile');

    // Klik di luar area search untuk menutup hasil
    document.addEventListener('click', (e) => {
        const deskIn = document.getElementById('nav-search-input-desktop');
        const deskDrop = document.getElementById('nav-search-dropdown-desktop');
        if (deskIn && !deskIn.contains(e.target)) deskDrop.classList.add('hidden');
    });
}

function toggleNavSearch() {
    const panel = document.getElementById('nav-search-panel');
    const input = document.getElementById('nav-search-input');
    if (!panel) return;
    const isHidden = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (isHidden && input) input.focus();
    else {
        const dd = document.getElementById('nav-search-dropdown');
        if (dd) dd.classList.add('hidden');
    }
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer || !overlay) return;

    // Pastikan class yang digunakan sesuai dengan CSS transition di renderNavbar
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Mencegah scrolling saat menu buka
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer) return;
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer) return;
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
}

function initNavSearch() {
    const input = document.getElementById('nav-search-input');
    const dropdown = document.getElementById('nav-search-dropdown');
    if (!input || !dropdown) return;
    input.addEventListener('input', () => {
        const results = navSearch(input.value);
        if (!results.length) { dropdown.classList.add('hidden'); return; }
        dropdown.innerHTML = results.map(r =>
            `<a href="${r.href}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 transition-colors duration-100 group">
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-green-500 flex-shrink-0"></i>
                <span class="text-sm font-medium text-gray-700 group-hover:text-green-700 flex-1">${r.label}</span>
                <span class="text-[11px] text-gray-400">${r.href}</span>
             </a>`
        ).join('');
        dropdown.classList.remove('hidden');
        lucide.createIcons();
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { const r = navSearch(input.value); if (r.length) window.location.href = r[0].href; }
        if (e.key === 'Escape') { dropdown.classList.add('hidden'); toggleNavSearch(); }
    });
    document.addEventListener('click', e => {
        const panel = document.getElementById('nav-search-panel');
        if (panel && !panel.contains(e.target) && !document.getElementById('search-toggle')?.contains(e.target)) {
            dropdown.classList.add('hidden');
            panel.classList.add('hidden');
        }
    });
}

function initNavSearchMobile() {
    const input = document.getElementById('nav-search-input-mobile');
    const dropdown = document.getElementById('nav-search-dropdown-mobile');
    if (!input || !dropdown) return;
    input.addEventListener('input', () => {
        const results = navSearch(input.value);
        if (!results.length) { dropdown.classList.add('hidden'); return; }
        dropdown.innerHTML = results.map(r =>
            `<a href="${r.href}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 transition-colors duration-100">
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-green-500 flex-shrink-0"></i>
                <span class="text-sm font-medium text-gray-700 flex-1">${r.label}</span>
             </a>`
        ).join('');
        dropdown.classList.remove('hidden');
        lucide.createIcons();
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { const r = navSearch(input.value); if (r.length) window.location.href = r[0].href; }
    });
}

// Render Footer
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    footerContainer.innerHTML = `
        <footer class="bg-green-900 text-white pt-12 pb-8 font-sans">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div class="space-y-4">
                         <div class="flex items-center flex-shrink-0">
                        <a href="index.html" class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <i data-lucide="leaf" class="w-4 h-4 text-white"></i>
                            </div>
                            <span class="font-bold text-lg text-white-800 tracking-tight">EcoNusantara</span>
                        </a>
                    </div>
                        <p class="text-green-200 text-sm leading-relaxed">
                            Tanam Pohon Hari Ini, Selamatkan Masa Depan Indonesia. Mari pulihkan paru-paru dunia bersama secara nyata dan transparan.
                        </p>
                    </div>

                    <div>
                        <h4 class="font-bold text-lg mb-6 border-b border-green-800 pb-2">Navigasi</h4>
                        <ul class="space-y-3 text-sm text-green-200">
                            <li><a href="about.html" class="hover:text-white hover:underline transition-all">Tentang Kami</a></li>
                            <li><a href="peta.html" class="hover:text-white hover:underline transition-all">Peta Penanaman</a></li>
                            <li><a href="transparansi.html" class="hover:text-white hover:underline transition-all">Transparansi Laporan</a></li>
                            <li><a href="events.html" class="hover:text-white hover:underline transition-all">Volunteer & Events</a></li>
                            
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-bold text-lg mb-6 border-b border-green-800 pb-2">Dukungan</h4>
                        <ul class="space-y-3 text-sm text-green-200">
                            <li><a href="edukasi.html" class="hover:text-white hover:underline transition-all">Edukasi & Panduan</a></li>
                            <li><a href="kontak.html" class="hover:text-white hover:underline transition-all">Hubungi Kami</a></li>
                            <li><a href="komunitas.html" class="hover:text-white hover:underline transition-all">Grup Komunitas</a></li>
                            <li><a href="rewards.html" class="hover:text-white hover:underline transition-all">Tukar Eco-Rewards</a></li>
                             <li><a href="mitra.html" class="hover:text-white hover:underline transition-all">Mitra Hijau</a></li>
                        </ul>
                    </div>

                    <div class="space-y-6">
                        <h4 class="font-bold text-lg mb-6 border-b border-green-800 pb-2">Sosial</h4>
                        <div class="flex flex-wrap gap-4">
                            <a href="https://www.facebook.com/profile.php?id=dummy_eco_nusantara" target="_blank" 
                            class="bg-green-800 p-3 rounded-xl hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-sm border border-green-700 flex items-center justify-center w-14 h-12">
                                <img src="https://noisy-black-yilqnrhzij.edgeone.app/facebook-logo-facebook-social-media-icon-free-png-removebg-preview.png" 
                                    alt="Facebook" 
                                    class="w-9 h-9 object-contain">
                            </a>
                            <a href="https://www.instagram.com/eco_nusantara_dummy" target="_blank" 
                            class="bg-green-800 p-3 rounded-xl hover:bg-pink-600 hover:scale-110 transition-all duration-300 shadow-sm border border-green-700 flex items-center justify-center w-14 h-12">
                                <img src="https://excessive-brown-hrtu9pkke1.edgeone.app/_89649395_instagram_logo_976-removebg-preview.png" 
                                    alt="Instagram" 
                                    class="w-9 h-9 object-contain">
                            </a>
                            <a href="https://twitter.com/eco_nusa_dummy" target="_blank" 
                            class="bg-green-800 p-3 rounded-xl hover:bg-sky-500 hover:scale-110 transition-all duration-300 shadow-sm border border-green-700 flex items-center justify-center w-14 h-12">
                                <img src="https://near-coffee-vktpg2demy.edgeone.app/twitter-logo-removebg-preview.png" 
                                    alt="Twitter" 
                                    class="w-9 h-9 object-contain"> 
                            </a>
                            <a href="komunitas.html" 
                            class="bg-green-800 p-3 rounded-xl hover:bg-emerald-500 hover:scale-110 transition-all duration-300 shadow-sm border border-green-700 flex items-center justify-center w-14 h-12">
                                <img src="https://plastic-moccasin-oulifc5sf4.edgeone.app/WhatsApp.svg-removebg-preview.png" 
                                    alt="WhatsApp" 
                                    class="w-9 h-9 object-contain">
                            </a>
                        </div>
                        <p class="text-xs text-green-400 font-medium leading-relaxed italic">
                            Ikuti perjalanan hijau kami melalui kanal sosial media.
                        </p>
                    </div>
                </div>
               <div class="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p class="text-green-300 text-sm">&copy; 2026 Eco Nusantara. Hak Cipta Dilindungi.</p>
                    <div class="mt-4 md:mt-0 flex items-center space-x-6 opacity-80 filter grayscale hover:grayscale-0 transition-all duration-300">
                        <a href="https://www.kehutanan.go.id/" target="_blank" rel="noopener noreferrer" class="flex items-center hover:opacity-100 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Lambang_Kementerian_Lingkungan_Hidup_dan_Kehutanan.png" 
                                alt="Logo KLHK" class="h-8 w-auto mr-2">
                            <span class="text-[10px] font-bold font-serif italic leading-none text-white">Mitra<br>KLHK</span>
                        </a>
                        <div class="h-8 border-l border-green-700 ml-2 mr-4"></div>
                        <a href="https://www.wwf.id/" target="_blank" rel="noopener noreferrer" class="flex items-center hover:opacity-100 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/24/WWF_logo.svg/1200px-WWF_logo.svg.png" 
                                alt="Logo WWF" class="h-8 w-auto mr-2">
                            <span class="text-[10px] font-bold font-serif italic leading-none text-white">WWF<br>Partner</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('nl-email').value;
    let subs = JSON.parse(localStorage.getItem('newsletters') || '[]');
    if(!subs.includes(email)) subs.push(email);
    localStorage.setItem('newsletters', JSON.stringify(subs));
    document.getElementById('nl-email').value = '';
    if(typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Terima kasih! Anda akan menerima update kami.',
            confirmButtonColor: '#166534'
        });
    } else {
        alert("Terima kasih! Anda akan menerima update kami.");
    }
}

// Data Pertanyaan Kuis
const ecoQuizData = [
    {
        q: "Manakah jenis pohon yang mampu menyerap karbon 4 kali lebih banyak dari hutan biasa?",
        options: ["Pohon Jati", "Pohon Mangrove", "Pohon Mahoni"],
        correct: 1
    },
    {
        q: "Apa nama fenomena pemanasan suhu bumi secara global?",
        options: ["Efek Rumah Kaca", "Fotosintesis", "Abrasi"],
        correct: 0
    },
    {
        q: "Hutan hujan tropis terbesar di Indonesia terletak di pulau?",
        options: ["Jawa", "Bali", "Papua"],
        correct: 2
    },
    {
        q: "Sampah plastik membutuhkan waktu berapa lama untuk terurai secara alami?",
        options: ["10 Tahun", "100 - 500 Tahun", "1 Minggu"],
        correct: 1
    },
    {
        q: "Apa manfaat utama menanam pohon di daerah pesisir pantai?",
        options: ["Mencegah Abrasi", "Membuat Hujan", "Menambah Pasir"],
        correct: 0
    }
];

let currentQuizIndex = 0;
let earnedPoints = 0;

function loadQuiz() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');
    const tempPointsEl = document.getElementById('temp-points');
    if (!questionEl) return;
    const currentData = ecoQuizData[currentQuizIndex];
    questionEl.innerText = currentData.q;
    progressEl.innerText = currentQuizIndex + 1;
    tempPointsEl.innerText = earnedPoints;
    optionsEl.innerHTML = '';
    currentData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "quiz-opt border border-white/30 py-3 rounded-xl hover:bg-white/20 transition";
        btn.onclick = () => checkChainAnswer(index, currentData.correct);
        optionsEl.appendChild(btn);
    });
}

function checkChainAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        earnedPoints += 20;
        Swal.fire({ icon: 'success', title: 'Benar!', text: '+20 Eco Points', timer: 1000, showConfirmButton: false }).then(() => nextQuestion());
    } else {
        Swal.fire({ icon: 'error', title: 'Salah!', text: 'Tetap semangat, lanjut ke pertanyaan berikutnya!', timer: 1000, showConfirmButton: false }).then(() => nextQuestion());
    }
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < ecoQuizData.length) {
        loadQuiz();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const quizContainer = document.getElementById('quiz-content');
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.role !== 'admin') {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].points = (users[userIndex].points || 0) + earnedPoints;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
    }
    quizContainer.innerHTML = `
        <div class="text-center py-6">
            <i data-lucide="award" class="w-16 h-16 mx-auto text-yellow-400 mb-4"></i>
            <h3 class="text-2xl font-bold mb-2">Kuis Selesai!</h3>
            <p class="text-lg">Total Poin yang Kamu Dapatkan:</p>
            <p class="text-4xl font-black text-yellow-300 mt-2">${earnedPoints}</p>
            <button onclick="location.reload()" class="mt-6 bg-white text-green-800 px-6 py-2 rounded-full font-bold">Main Lagi Esok Hari</button>
        </div>
    `;
    lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
});

// Global Chatbot
// --- ECOBOT LOGIC (SUDAH TERINTEGRASI GROQ AI) ---
function renderChatbot() {
    const body = document.querySelector('body');
    if (document.getElementById('ecobot-modal')) return;

    const html = `
        <button id="ecobot-btn" onclick="toggleEcoBot()" class="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50">
            <i data-lucide="bot" class="w-6 h-6"></i>
        </button>
        <div id="ecobot-modal" class="hidden fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[480px] border border-emerald-100">
            <div class="bg-emerald-700 p-4 text-white flex justify-between items-center">
                <div class="flex items-center gap-3"><i data-lucide="bot"></i><strong>EcoBot AI</strong></div>
                <button onclick="toggleEcoBot()"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>
            <div id="ecobot-chat-area" class="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 text-sm">
                <div class="bg-emerald-50 p-3 rounded-xl self-start max-w-[85%]">Halo! Saya EcoBot. Mau tanya tentang reboisasi atau penebangan hutan? 🌱</div>
            </div>
            <div class="p-4 border-t flex gap-2">
                <input id="ecobot-input" type="text" placeholder="Ketik pesan..." class="flex-1 px-4 py-2 border rounded-full outline-none focus:border-green-500" onkeypress="if(event.key === 'Enter') sendEcoBotMsg()">
                <button onclick="sendEcoBotMsg()" class="bg-green-600 text-white p-2 rounded-full"><i data-lucide="send" class="w-5 h-5"></i></button>
            </div>
        </div>`;
    body.insertAdjacentHTML('beforeend', html);
    if (window.lucide) lucide.createIcons();
}

function toggleEcoBot() {
    const modal = document.getElementById('ecobot-modal');
    modal.classList.toggle('hidden');
}

// INI FUNGSI GROQ YANG DIGABUNGKAN (Michael Julio)
async function sendEcoBotMsg() {
    const input = document.getElementById('ecobot-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatArea = document.getElementById('ecobot-chat-area');

    // 1. Tampilkan pesan user
    chatArea.innerHTML += `<div class="bg-green-100 text-green-900 rounded-xl p-3 max-w-[85%] self-end ml-auto mb-2 text-right shadow-sm">${msg}</div>`;
    input.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;

    // 2. Indikator Berpikir
    const typingId = "typing-" + Date.now();
    chatArea.innerHTML += `<div id="${typingId}" class="bg-gray-100 text-gray-500 italic p-3 rounded-xl max-w-[85%] mb-2 animate-pulse">EcoBot sedang berpikir...</div>`;
    chatArea.scrollTop = chatArea.scrollHeight;

    try {
        // 3. Panggil API Groq
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Kamu adalah EcoBot, pakar lingkungan EcoNusantara yang ahli dalam isu penebangan pohon (deforestasi) dan reboisasi di Indonesia. Jawablah dengan ramah dan informatif." },
                    { role: "user", content: msg }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        // 4. Tampilkan jawaban AI
        document.getElementById(typingId).remove();
        chatArea.innerHTML += `<div class="bg-emerald-50 text-emerald-900 border border-emerald-100 p-3 rounded-xl self-start max-w-[85%] mb-2 shadow-sm">
            <p class="font-bold text-[10px] text-emerald-600 mb-1 uppercase">Ecobot AI</p>
            ${reply.replace(/\n/g, '<br>')}
        </div>`;
    } catch (error) {
        document.getElementById(typingId).innerHTML = "Maaf, EcoBot sedang gangguan. Coba lagi nanti! 🌱";
    }
    chatArea.scrollTop = chatArea.scrollHeight;
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initStorage();
    renderNavbar();
    renderFooter();
    renderChatbot();
});

// Authentication
function logout() {
    localStorage.removeItem("currentUser");
    if(typeof Swal !== 'undefined') {
        Swal.fire({ icon: 'info', title: 'Logout Berhasil', showConfirmButton: false, timer: 1500 }).then(() => {
            window.location.href = "index.html";
        });
    } else {
        window.location.href = "index.html";
    }
}

// Hero Background Slider
(function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let currentIndex = 0;
    let intervalId = null;
    const AUTO_DELAY = 5000;

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => {
            if (i === index) slide.classList.add('active');
            else slide.classList.remove('active');
        });
        currentIndex = index;
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    function startAutoSlide() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, AUTO_DELAY);
    }

    function stopAutoSlide() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
        nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    }

    const heroSection = document.querySelector('section.relative.h-\\[90vh\\]');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
        heroSection.addEventListener('touchstart', stopAutoSlide);
        heroSection.addEventListener('touchend', startAutoSlide);
    }

    let touchStartX = 0;
    let touchEndX = 0;
    if (heroSection) {
        heroSection.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) prevSlide(); else nextSlide();
                stopAutoSlide(); startAutoSlide();
            }
        });
    }

    showSlide(0);
    startAutoSlide();
})();

// Artikel Lengkap
const fullArticles = {
    mangrove: {
        title: "Benteng Hijau Pesisir: Peran Vital Mangrove bagi Kehidupan",
        source: "https://dlh.bulelengkab.go.id/informasi/detail/artikel/60-pentingnya-hutan-mangrove-bagi-lingkungan-hidup",
        sourceName: "DLH Buleleng",
        content: `Bayangkan sebuah benteng alami yang tidak hanya melindungi kita dari amukan tsunami dan abrasi, tetapi juga menjadi 'paru-paru' luar biasa bagi bumi. Itulah hutan mangrove. <br><br>Secara biologis, akar-akarnya yang kokoh adalah rumah aman bagi berbagai spesies ikan, burung, hingga primata. Namun kehebatan aslinya ada pada kemampuannya menyerap emisi karbon (CO2) hingga 4 kali lebih banyak dibandingkan hutan tropis biasa. Melestarikan mangrove bukan sekadar menanam pohon, tapi sedang membangun masa depan pesisir yang lebih aman bagi generasi mendatang.`,
        img: "https://dlh.bulelengkab.go.id/uploads/konten/60-pentingnya-hutan-mangrove-bagi-lingkungan-hidup.jpg"
    },
    kompos: {
        title: "Emas Hitam dari Dapur: Ubah Sampah Jadi Berkah",
        source: "https://keslan.kemkes.go.id/view_artikel/1977/yuk-membuat-kompos-sederhana-di-rumah",
        sourceName: "Kemenkes RI",
        content: `Tahukah kamu bahwa sisa makanan di dapurmu bisa berubah menjadi pupuk organik kaya nutrisi? Membuat kompos adalah langkah kecil dengan dampak raksasa bagi lingkungan. <br><br>Melalui proses penguraian alami oleh mikroorganisme, kamu bisa menghasilkan 'emas hitam' yang menyuburkan tanah tanpa bahan kimia berbahaya. Dengan memilah sampah organik, Michael sudah membantu mengurangi tumpukan gas metana di TPA yang merusak atmosfer. Ayo, mulai kelola sampah organikmu hari ini untuk bumi yang lebih sehat!`,
        img: "https://jubelio-store.s3.ap-southeast-1.amazonaws.com/sustaination/2021/05/13175631/apa-itu-kompos-2.jpeg"
    },
    deforestasi: {
        title: "Nadi Hijau Borneo: Menyelamatkan Jantung Kalimantan",
        source: "https://wwf.panda.org/discover/knowledge_hub/where_we_work/borneo_forests/borneo_deforestation/",
        sourceName: "WWF International",
        content: `Kalimantan adalah rumah bagi salah satu hutan hujan paling beragam di dunia, namun kini sedang menghadapi krisis besar akibat deforestasi. Setiap pohon yang tumbang berarti hilangnya habitat bagi orangutan dan gajah Kalimantan yang terancam punah. <br><br>Dampaknya nyata: suhu lokal meningkat tajam dan risiko banjir bandang menghantui warga karena hilangnya serapan air alami. Bersama mitra lokal, kita berjuang membangun koridor kehidupan dan memulihkan kembali 'Paru-paru Dunia' agar Borneo tetap lestari.`,
        img: "https://b3411452.smushcdn.com/3411452/wp-content/uploads/2024/12/1e70f34c3f5b48a4b305db53358169d0-e1734524502599.webp?lossy=2&strip=1&webp=1"
    },
    air_laut: { 
        title: "Saat Daratan Mulai Tenggelam: Krisis Pesisir Utara Jawa",
        source: "https://s3pendidikandasar.fip.unesa.ac.id/post/ancaman-kenaikan-air-laut-di-pesisir-utara-jawa",
        sourceName: "Unesa",
        content: `Bagi warga pesisir utara Jawa, banjir rob bukan lagi sekadar tamu tahunan, melainkan ancaman permanen yang menenggelamkan pemukiman. Kombinasi kenaikan air laut global dan penurunan muka tanah membuat daratan perlahan menghilang. <br><br>Jika tidak bergerak sekarang, kota-kota besar di sepanjang Pantura terancam tenggelam secara permanen. Solusi berbasis alam seperti penanaman mangrove skala masif adalah kunci utama untuk meredam laju abrasi dan memberikan perlindungan bagi jutaan penduduk di pesisir.`,
        img: "https://cdn0-production-images-kly.akamaized.net/MCnm_BhepiyoHtsNiMv16vXNpl0=/500x0/smart/filters:quality(75):strip_icc()/kly-media-production/medias/5330794/original/033603200_1756367822-3.jpg"
    }
};

function showFullArticle(slug) {
    const article = fullArticles[slug];
    if(!article) return;
    Swal.fire({
        title: `<span class="font-serif text-2xl text-green-900">${article.title}</span>`,
        html: `<div class="text-left"><img src="${article.img}" class="w-full h-48 object-cover rounded-xl mb-6"><div class="text-gray-700 leading-relaxed">${article.content}</div></div>`,
        width: '600px',
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#166534',
        padding: '2rem',
        showCloseButton: true
    });
}

function showFullArticle(slug) {
    const article = fullArticles[slug];
    if(!article) return;

    Swal.fire({
        title: `<span class="font-serif text-2xl text-green-900">${article.title}</span>`,
        html: `
            <div class="text-left">
                <img src="${article.img}" class="w-full h-48 object-cover rounded-xl mb-4 shadow-sm">
                <div class="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">${article.content}</div>
                
                <div class="pt-4 border-t border-gray-100">
                    <p class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Referensi Sumber Resmi:</p>
                    <a href="${article.source}" target="_blank" class="text-[11px] text-green-600 hover:text-green-800 break-all flex items-center gap-1 transition-colors">
                        <i data-lucide="external-link" class="w-3 h-3"></i> ${article.sourceName} - Pelajari Selengkapnya
                    </a>
                </div>
            </div>
        `,
        width: '600px',
        confirmButtonText: 'Selesai Membaca',
        confirmButtonColor: '#166534',
        padding: '2rem',
        showCloseButton: true,
        didOpen: () => {
            if (window.lucide) lucide.createIcons();
        }
    });
}

function filterEdu(category, btnElement) {
    const cards = document.querySelectorAll('.edu-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // 1. Atur tampilan tombol aktif
    buttons.forEach(btn => {
        btn.classList.remove('bg-green-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-600');
    });
    btnElement.classList.remove('bg-white', 'text-gray-600');
    btnElement.classList.add('bg-green-600', 'text-white');

    // 2. Logika menyembunyikan/menampilkan kartu
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block'; // Tampilkan
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0'; // Animasi fade out
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}


async function downloadAuditReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const primaryGreen = "#166534";

    doc.setFillColor(primaryGreen);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("LAPORAN AUDIT TRANSPARANSI", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Eco Nusantara - Kuartal I 2026", 105, 30, { align: "center" });

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(16);
    doc.text("Ringkasan Keuangan", 20, 60);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Dana Terkumpul:", 20, 80);
    doc.setFont("helvetica", "bold");
    doc.text("Rp 1.250.000.000", 190, 80, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text("Dana Disalurkan:", 20, 90);
    doc.setFont("helvetica", "bold");
    doc.text("Rp 980.000.000", 190, 90, { align: "right" });

    doc.setFontSize(16);
    doc.text("Alokasi Penggunaan Dana", 20, 110);
    doc.line(20, 115, 190, 115);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("- Pembelian & Perawatan Bibit (60%)", 25, 125);
    doc.text("- Operasional & Logistik Lapangan (25%)", 25, 135);
    doc.text("- Edukasi & Pengembangan Komunitas (15%)", 25, 145);

    const today = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text(`Laporan ini diunduh secara otomatis pada: ${today}`, 105, 280, { align: "center" });
    doc.text("Verified by Eco Nusantara Audit Team", 105, 285, { align: "center" });

    Swal.fire({ title: 'Menyiapkan Dokumen...', timer: 1000, didOpen: () => { Swal.showLoading(); } }).then(() => {
        doc.save("Laporan_Audit_EcoNusantara_Q1_2026.pdf");
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Laporan audit telah diunduh.', confirmButtonColor: primaryGreen });
    });
}

function showFieldProgress(area) {
    const fieldUpdates = {
        kalimantan: {
            title: "Laporan Lapangan: Restorasi Gambut Kalimantan",
            desc: `<div class="space-y-4 text-sm text-gray-700"><p><b>Status Proyek:</b> Tahap Pemeliharaan (Bulan ke-3)</p><p><b>Update Terkini:</b> Tim relawan lokal baru saja menyelesaikan penyiangan gulma di area 5 hektar pertama. Sebanyak 2.000 bibit Mahoni menunjukkan pertumbuhan sehat dengan tinggi rata-rata 50cm.</p><ul class="list-disc ml-5 space-y-1"><li><b>Survival Rate:</b> 92% (Sangat Baik)</li><li><b>Tenaga Kerja:</b> Melibatkan 15 warga desa sekitar.</li><li><b>Kendala:</b> Curah hujan tinggi, namun drainase gambut berfungsi baik.</li></ul><p class="text-xs italic text-green-600 font-bold">Terima kasih atas dukungan donatur Eco Nusantara!</p></div>`,
            img: "https://www.smart-tbk.com/wp-content/uploads/2025/02/Our-peat-conservation-area-in-Ketapang.jpg"
        },
        jawa_barat: {
            title: "Laporan Lapangan: Sabuk Hijau Mangrove Jawa Barat",
            desc: `<div class="space-y-4 text-sm text-gray-700"><p><b>Status Proyek:</b> Penanaman Tahap II (Ongoing)</p><p><b>Update Terkini:</b> 3.000 bibit mangrove jenis Rhizophora telah berhasil ditanam di pesisir Muara Gembong.</p><ul class="list-disc ml-5 space-y-1"><li><b>Dampak Abrasi:</b> Berkurang hingga 30% di titik penanaman.</li><li><b>Ekosistem:</b> Mulai terlihat kembalinya populasi kepiting bakau.</li></ul><p class="text-xs italic text-blue-600 font-bold">Aksi Anda adalah benteng alami bagi warga pesisir.</p></div>`,
            img: "https://s7d1.scene7.com/is/image/wbcollab/mangrove_green_belt-489?qlt=90&fmt=webp&resMode=sharp2"
        }
    };
    const data = fieldUpdates[area];
    if(!data) return;
    Swal.fire({
        title: `<span class="font-serif text-2xl text-green-900">${data.title}</span>`,
        html: `<div class="text-left"><img src="${data.img}" class="w-full h-56 object-cover rounded-2xl mb-6 shadow-lg border border-gray-100">${data.desc}</div>`,
        width: '650px',
        confirmButtonText: 'Selesai Membaca',
        confirmButtonColor: '#166534',
        padding: '2.5rem',
        showCloseButton: true,
        customClass: { container: 'font-sans' }
    });
}

function toggleLang() {
    let lang = localStorage.getItem("lang") || "id";
    lang = lang === "id" ? "en" : "id";
    localStorage.setItem("lang", lang);
    location.reload();
}

async function downloadEStoreCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a5' });
    const user = getCurrentUser();
    if (!user || !user.donations || user.donations.length === 0) {
        Swal.fire('Gagal', 'Kamu belum memiliki riwayat adopsi untuk dibuatkan sertifikat.', 'error');
        return;
    }
    const latestDonation = user.donations[0];
    const userName = user.name || "Pejuang Lingkungan";
    const treeCount = latestDonation.trees || 1;
    const dateStr = new Date(latestDonation.date).toLocaleDateString('id-ID', { dateStyle: 'long' });

    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 138.5);
    doc.setLineWidth(0.5);
    doc.rect(7, 7, 196, 134.5);

    doc.setTextColor(22, 101, 52);
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.text("SERTIFIKAT ADOPSI", 105, 35, { align: "center" });
    doc.setDrawColor(234, 179, 8);
    doc.line(70, 40, 140, 40);

    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Diberikan dengan bangga kepada:", 105, 55, { align: "center" });

    doc.setTextColor(21, 128, 61);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(24);
    doc.text(userName.toUpperCase(), 105, 70, { align: "center" });

    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Atas kontribusi nyatanya dalam mengadopsi ${treeCount} pohon`, 105, 85, { align: "center" });
    doc.text(`di area restorasi ${latestDonation.location || 'Eco Nusantara'}.`, 105, 92, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Diterbitkan pada: ${dateStr}`, 105, 110, { align: "center" });

    doc.setDrawColor(22, 101, 52);
    doc.circle(170, 115, 12, 'D');
    doc.setFontSize(8);
    doc.text("VERIFIED", 170, 114, { align: "center" });
    doc.text("ECO-N", 170, 118, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Eco Nusantara", 25, 125);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Tanam Pohon, Selamatkan Masa Depan", 25, 130);

    Swal.fire({ title: 'Menghasilkan Sertifikat...', timer: 1500, didOpen: () => { Swal.showLoading(); } }).then(() => {
        doc.save(`Sertifikat_Adopsi_${userName.replace(/\s+/g, '_')}.pdf`);
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'E-Sertifikat telah diunduh. Terima kasih atas kontribusimu!', confirmButtonColor: '#166534' });
    });
}

// Leaderboard & Community
const leaderboardData = [
    { rank: 1, name: "Budi Santoso", loc: "Surabaya, Jawa Timur", pts: 152500 },
    { rank: 2, name: "PT Bumi Hijau Mandiri", loc: "Corporate Partner", pts: 98000 },
    { rank: 3, name: "Sarah Lestari", loc: "Jakarta Selatan", pts: 45200 },
    { rank: 4, name: "Komunitas Mangrove Bali", loc: "Denpasar, Bali", pts: 32100 }
];

function initLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;
    list.innerHTML = leaderboardData.map(item => `
        <div class="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl transition">
            <div class="flex items-center gap-4">
                <span class="w-6 font-bold text-lg ${item.rank <= 3 ? 'text-green-600' : 'text-gray-300'}">${item.rank}</span>
                <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <i data-lucide="user" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold text-gray-800 leading-none">${item.name}</p>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">${item.loc}</p>
                </div>
            </div>
            <p class="font-black text-green-700">${item.pts.toLocaleString('id-ID')} <span class="text-[10px] text-gray-400 font-normal">pts</span></p>
        </div>
    `).join('');

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('my-rank-name').textContent = user.name || "Eco Warrior";
        document.getElementById('my-rank-points').textContent = (user.points || 0).toLocaleString('id-ID') + " pts";
        let rnk = "99+";
        if(user.points > 100000) rnk = "2";
        else if(user.points > 40000) rnk = "4";
        document.getElementById('my-rank-num').textContent = rnk;
    }
    if (window.lucide) lucide.createIcons();
}

function joinGroupAlert(groupName) {
    const groupLinks = {
        "Sobat Mangrove Jakarta": "https://chat.whatsapp.com/CixQ4wn4ZXqEJWVlz70mZD?mode=gi_t",
        "Relawan IKN Hijau": "https://chat.whatsapp.com/K9VuUvtSIiVFQk1GYitY04?mode=gi_t"
    };
    const targetLink = groupLinks[groupName] || "https://chat.whatsapp.com/LINK_DEFAULT";
    Swal.fire({
        title: 'Buka WhatsApp?',
        text: `Anda akan diarahkan ke grup WhatsApp untuk komunitas ${groupName}. Pastikan untuk mengikuti peraturan komunitas ya!`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Lanjutkan',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) window.open(targetLink, '_blank');
    });
}

function joinEvent(eventName, eventDate, eventLoc) {
    if(!isLoggedIn()) {
        Swal.fire({
            icon: 'warning', title: 'Login Diperlukan',
            text: 'Silahkan login terlebih dahulu untuk mendaftar event.',
            confirmButtonText: 'Login Sekarang', confirmButtonColor: '#166534', showCancelButton: true
        }).then((res) => { if(res.isConfirmed) window.location.href = 'login.html'; });
        return;
    }
    const user = getCurrentUser();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex].joinedEvents = users[userIndex].joinedEvents || [];
        const isAlreadyJoined = users[userIndex].joinedEvents.some(ev => ev.name === eventName);
        if(isAlreadyJoined) {
            Swal.fire({ icon: 'info', title: 'Sudah Terdaftar', text: 'Anda sudah mendaftar untuk event ini.', confirmButtonColor: '#166534' });
            return;
        }
        users[userIndex].joinedEvents.push({
            name: eventName,
            date: eventDate || "Tanggal belum ditentukan",
            location: eventLoc || "Lokasi belum ditentukan"
        });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        Swal.fire({
            icon: 'success', title: 'Berhasil Mendaftar!',
            text: `Agenda "${eventName}" telah ditambahkan ke Dashboard Anda.`,
            confirmButtonColor: '#166534'
        }).then(() => { window.location.href = 'dashboard.html'; });
    }
}

function filterEventsByDate(date) {
    const eventCards = document.querySelectorAll('.space-y-6 > div.flex-col');
    let found = false;

    eventCards.forEach(card => {
        const title = card.querySelector('h3').innerText;
        
        // Menambahkan logika pengecekan untuk Event ke-3 (Edukasi Tani)
        const matchesMangrove = (date === "2026-03-25" && title.includes("Mangrove"));
        const matchesOrangutan = (date === "2026-04-02" && title.includes("Orangutan"));
        const matchesEdukasi = (date === "2026-04-14" && title.includes("Edukasi"));

        if (matchesMangrove || matchesOrangutan || matchesEdukasi) {
            card.style.display = "flex";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!found) {
        Swal.fire({
            icon: 'info',
            title: 'Agenda Kosong',
            text: 'Tidak ada kegiatan volunteer pada tanggal yang dipilih.',
            confirmButtonColor: '#166534'
        });
    }
}

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroTag = document.getElementById('hero-tag');
    
    // Jika elemen slider tidak ada (misal di halaman Donasi), hentikan fungsi agar tidak error
    if (slides.length === 0) return;

    // Data Teks Slider (Michael Julio)
    const slideData = [
        { tag: "#WarisanHijau", title: 'Warisi Hutan,<br /><span class="text-green-300">Bukan Kerusakan.</span>', desc: "Setiap benih pohon yang ditanam hari ini adalah nafas kehidupan untuk generasi masa depan Indonesia." },
        { tag: "#TransparansiNyata", title: 'Pantau Tumbuhnya,<br /><span class="text-blue-300">Lihat Dampaknya.</span>', desc: "Gunakan fitur peta interaktif untuk memantau koordinat GPS dan survival rate pohon secara real-time." },
        { tag: "#EkonomiHijau", title: 'Hijaukan Alam,<br /><span class="text-yellow-300">Sejahterakan Warga.</span>', desc: "Donasi memberdayakan kedaulatan ekonomi masyarakat desa melalui program pemeliharaan bibit berkelanjutan." },
        { tag: "#SatuAksiJutaManfaat", title: 'Satu Klik,<br /><span class="text-teal-300">Pulihkan Jantung Dunia.</span>', desc: "Ubah kepedulian jadi aksi nyata. Satu pohon yang Anda tanam adalah warisan oksigen bagi masa depan." }
    ];

    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.classList.toggle('opacity-100', i === index);
            slide.classList.toggle('opacity-0', i !== index);
        });

        if(heroTitle && heroDesc && heroTag) {
            heroTitle.style.opacity = 0;
            heroDesc.style.opacity = 0;
            
            setTimeout(() => {
                heroTag.innerHTML = slideData[index].tag;
                heroTitle.innerHTML = slideData[index].title;
                heroDesc.innerHTML = slideData[index].desc;
                heroTitle.style.opacity = 1;
                heroDesc.style.opacity = 1;
            }, 300);
        }
        currentIndex = index;
    }

    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');

    if (nextBtn) nextBtn.onclick = () => showSlide(currentIndex + 1);
    if (prevBtn) prevBtn.onclick = () => showSlide(currentIndex - 1);

    showSlide(0);
    setInterval(() => showSlide(currentIndex + 1), 6000);
}


document.addEventListener("DOMContentLoaded", () => {
    try {
        initStorage();    // Load data lokal
        renderNavbar();   // Render Header Michael
        renderFooter();   // Render Footer Michael
        renderChatbot();  // Load Chatbot
        initHeroSlider(); // Jalankan Slider jika ada

        // Inisialisasi khusus halaman komunitas
        if (document.getElementById('leaderboard-list')) {
            initLeaderboard();
        }
    } catch (error) {
        console.error("terjadi error sistem:", error);
    }
});

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    initStorage();
    renderNavbar();
    renderFooter();
    renderChatbot();
    if (document.getElementById('leaderboard-list')) {
        initLeaderboard();
    }
});
