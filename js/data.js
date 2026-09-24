/* ==========================================================================
   PORTFOLIO DATA STRUCTURE (CENTRAL DATA STORE)
   ==========================================================================
   Populated with actual personal information for:
   AFRA FADHMA DINATA (NRP: 2058261004)
   Institut Teknologi Sepuluh Nopember (ITS)
   ========================================================================== */

const portfolioData = {

  // --------------------------------------------------------------------------
  // PROFILE & HERO INFORMATION
  // --------------------------------------------------------------------------
  profile: {
    name: "Afra Fadhma Dinata",
    title: "D4 Applied Logistics Analytics Student",
    field: "D4 APPLIED LOGISTICS ANALYTICS — ITS",
    role: "HARDWARE, FIRMWARE & DATA ENGINEERING",
    institution: "Institut Teknologi Sepuluh Nopember (ITS)",
    department: "Departemen Statistika Bisnis",
    location: "Surabaya, Indonesia",
    nrp: "2058261004",
    fieldShort: "ANALYTICS / EMBEDDED / IOT",
    status: "MAHASISWA AKTIF",
    year: "2026",

    // Main Bio / Profile - divided into readable paragraphs for editorial layout
    paragraphs: [
      "Saya mahasiswa D4 Analitika Logistik Terapan di Departemen Statistika Bisnis, Institut Teknologi Sepuluh Nopember (ITS), dengan ketertarikan besar pada pemrograman, IoT, embedded system, data engineering, dan machine learning.",
      "Di luar perkuliahan, saya senang mengerjakan proyek pribadi lintas bidang, mulai dari firmware ESP32 dan desain PCB custom, sistem pemantauan berbasis AI, hingga eksplorasi keamanan jaringan nirkabel untuk tujuan edukasi.",
      "Saya menggunakan Python, C++, JavaScript, MATLAB, dan KiCad serta terbiasa mengutak-atik sistem, termasuk modifikasi OS. Saya juga aktif dalam berbagai kegiatan organisasi dan komunitas."
    ],

    intro: "Mahasiswa D4 Analitika Logistik Terapan di Departemen Statistika Bisnis, Institut Teknologi Sepuluh Nopember (ITS), dengan fokus pada IoT, embedded firmware, data engineering, dan machine learning.",
    description: "Mengerjakan proyek pribadi lintas bidang: dari firmware ESP32 dan desain PCB custom, sistem pemantauan berbasis AI, hingga eksplorasi keamanan jaringan nirkabel dalam ranah riset edukasi.",

    interests: [
      "Photography",
      "Programming",
      "IoT",
      "Electronics",
      "Technology Development",
      "Application Development",
      "Hardware Experimentation"
    ],

    education: "Institut Teknologi Sepuluh Nopember (ITS)",
    focus: "IoT, Embedded Firmware & Data Engineering",

    // Flagship real hardware asset showcased in the Hero section
    heroImage: "projek pcb/esp32 frieren version.png",
    heroTag: "CORE HARDWARE // ESP32 — FRIEREN EDITION",
    heroHud: "CAD // 4-LAYER HIGH DENSITY"
  },

  // --------------------------------------------------------------------------
  // SECTION INTRO SENTENCES
  // --------------------------------------------------------------------------
  sectionIntros: {
    education: "Formal academic foundations at Institut Teknologi Sepuluh Nopember (ITS) and secondary science education.",
    organizations: "Rekam jejak kepemimpinan organisasi, inisiatif kerelawanan sosial kemasyarakatan, advokasi pemuda, dan bimbingan akademik intensif.",
    projects: "High-performance engineering developments across custom PCB hardware, low-level firmware, wireless security labs, and telemetry systems.",
    iot: "Connected microcontroller telemetry nodes, wireless repeaters, custom OS kernels, RF spectrum experiments, and sensor instrumentation.",
    pcb: "Multi-layer schematic engineering, high-frequency routing, power electronics, step-down converters, and CAN bus transceivers.",
    portal: "Navigasi menuju website utama (aefera.me) untuk mengeksplorasi portofolio rekayasa perangkat lunak (software engineering), full-stack web development, dan repositori open-source.",
    achievements: "Engineering milestones, organizational track record, and technical field development logs."
  },

  // --------------------------------------------------------------------------
  // EDUCATION (/logo pendidikan/)
  // --------------------------------------------------------------------------
  education: [
    {
      institution: "Institut Teknologi Sepuluh Nopember (ITS)",
      degree: "D4 Analitika Logistik Terapan",
      department: "Departemen Statistika Bisnis",
      status: "Mahasiswa Aktif",
      nrp: "2058261004",
      year: "2024 — Sekarang",
      location: "Surabaya, Indonesia",
      focus: "Applied Logistics Analytics, Data Engineering, IoT & Embedded Systems",
      description: "Menempuh pendidikan vokasi sarjana terapan di Departemen Statistika Bisnis dengan fokus kurikulum pada analitika logistik, pemodelan data statistik, integrasi sistem informasi rantai pasok, dan komputasi cerdas.",
      image: "logo pendidikan/its.png",
      tag: "TERTIARY // UNDERGRADUATE",
      hud: "NRP: 2058261004 // ITS SURABAYA"
    },
    {
      institution: "SMAN 2 Pasuruan",
      degree: "Secondary Education",
      department: "Science / Mathematics Track",
      status: "Alumni",
      nrp: "-",
      year: "2021 — 2024",
      location: "Pasuruan, Indonesia",
      focus: "Science, Mathematics & Computational Foundations",
      description: "Pendidikan menengah atas dengan fokus pada sains, matematika, serta keaktifan dalam organisasi kesiswaan seni, budaya, dan teater.",
      image: "logo pendidikan/smada pasuruan.jpg",
      tag: "SECONDARY // HIGH SCHOOL",
      hud: "FOUNDATION // SMADA PASURUAN"
    }
  ],

  // --------------------------------------------------------------------------
  // ORGANIZATIONS & ACTIVITIES
  // Editorial timeline of organizational and community leadership
  // --------------------------------------------------------------------------
  organizations: [
    {
      number: "01",
      name: "Karang Taruna Purworejo, Pasuruan",
      position: "Anggota // Relawan Fotografi & Dokumenter",
      year: "2025–2026",
      tag: "COMMUNITY & SOCIAL VOLUNTEER",
      description: "Aktif berkontribusi sebagai relawan dokumentasi visual pada berbagai agenda sosial kemasyarakatan dan program pengembangan ekonomi warga.",
      bullets: [
        "Bertindak sebagai fotografer utama dan tim dokumenter dalam program sertifikasi dan pendampingan Label Halal Gratis bagi pelaku UMKM lokal.",
        "Memproduksi materi visual, arsip kegiatan, dan konten dokumentasi untuk mendukung publikasi kegiatan organisasi kemasyarakatan.",
        "Mendukung kelancaran operasional dan koordinasi dokumentasi pada berbagai kegiatan pemuda di tingkat kelurahan."
      ],
      image: "logo organisasi/karang taruna.jpg",
      hud: "STATUS: ACTIVE // 2025–2026"
    },
    {
      number: "02",
      name: "Forum Anak Purworejo, Pasuruan",
      position: "Anggota // Relawan Fotografi & Operasional Event",
      year: "2025–2026",
      tag: "YOUTH ADVOCACY & SOCIAL",
      description: "Berperan aktif sebagai relawan operasional dan dokumentator visual dalam berbagai agenda kegiatan anak, kepemudaan, dan perayaan hari besar keagamaan/nasional.",
      bullets: [
        "Memegang tanggung jawab sebagai fotografer utama pada perayaan Hari Kemerdekaan (Agustusan) dan Festival Al-Banjari.",
        "Mengelola kesiapan teknis, logistik, dan perlengkapan panggung (divisi perkap) untuk memastikan kelancaran alur pelaksanaan acara.",
        "Mengabadikan momen penting dan menyusun dokumentasi arsip kegiatan pelaporan forum anak daerah."
      ],
      image: "logo organisasi/forum anak kecamatan purworejo.jpg",
      hud: "STATUS: ACTIVE // 2025–2026"
    },
    {
      number: "03",
      name: "GO — Study Buddy",
      position: "Pendamping Belajar // Peer Tutor UTBK-SNBT",
      year: "2025–2026",
      tag: "ACADEMIC MENTORSHIP & EDUTECH",
      description: "Menjadi fasilitator dan pendamping belajar sebaya dalam program intensif Time Tutorial Service (TST) untuk persiapan seleksi masuk perguruan tinggi negeri.",
      bullets: [
        "Membimbing siswa dalam pemecahan dan penalaran soal-soal UTBK-SNBT, khususnya pada subtes Penalaran Umum (PU), Pengetahuan Kuantitatif (PK), dan Penalaran Matematika (PM).",
        "Menyusun pendekatan belajar terstruktur dengan membedah pola logika kuantitatif, rumus praktis, dan strategi manajemen waktu pengerjaan soal.",
        "Membangun suasana belajar yang interaktif dan suportif guna meningkatkan pemahaman konseptual serta daya analitis siswa."
      ],
      image: null, // Monogram badge rendered in main.js
      hud: "STATUS: ACTIVE // 2025–2026"
    },
    {
      number: "04",
      name: "OSIS SMAN 2 Kota Pasuruan",
      position: "Seksi Pembinaan Seni, Sastra, dan Budaya",
      year: "2024–2025",
      tag: "STUDENT GOVERNANCE",
      description: "Pengurus aktif dalam merencanakan, mendanai, dan mengeksekusi berbagai event besar sekolah berskala ratusan hingga ribuan peserta.",
      bullets: [
        "Bagian dari tim Sponsorship pada event festival dan pentas seni 'SEIRAMA', sukses menjalin kemitraan dan negosiasi pendanaan dengan pihak eksternal.",
        "Dipercaya sebagai Co-Perlengkapan pada peringatan Maulid Nabi 2024, mengoordinasikan instalasi teknis panggung, tata letak, dan peralatan acara.",
        "Bertindak sebagai fotografer resmi dalam gelaran event bergengsi sekolah seperti 'IBS' dan 'Abirama'.",
        "Mewakili sekolah dalam mengikuti rangkaian seminar edukasi nasional kepemudaan, termasuk sosialisasi pencegahan bahaya narkoba dan penguatan integritas anti-korupsi."
      ],
      image: "logo organisasi/osis sman 2 kota pasuruan.jpg",
      hud: "DIVISION: ARTS & CULTURE"
    },
    {
      number: "05",
      name: "Teater Catur",
      position: "Ketua Divisi PDD (Publikasi, Dekorasi, Dokumentasi)",
      year: "2023–2024",
      tag: "CREATIVE PRODUCTION & MEDIA",
      description: "Memimpin divisi kreatif dan dokumentasi dalam mengelola identitas visual, promosi publikasi, serta rekaman arsip seni pementasan teater.",
      bullets: [
        "Menjabat sebagai Ketua Divisi PDD, memimpin tim dalam merancang konsep dekorasi panggung, materi publikasi digital, dan dokumentasi visual pada event akbar 'Pentas Aplikasi'.",
        "Bertindak sebagai fotografer dan videografer dokumenter utama, menangkap estetika panggung, pencahayaan teatrikal, dan ekspresi lakon pertunjukan.",
        "Mengorganisasi tata kelola arsip media dan memastikan seluruh aset visual produksi tersimpan rapi untuk kebutuhan publikasi lanjutan."
      ],
      image: "logo organisasi/teater catur.jpg",
      hud: "LEADERSHIP: KETUA DIVISI PDD"
    }
  ],

  // --------------------------------------------------------------------------
  // PROJECTS (ALL 12 REAL ASSETS: 5 PCB + 7 IOT)
  // Preserving filenames and matching user's requested clean titles
  // --------------------------------------------------------------------------
  projects: [
    // --- PCB PROJECTS (5) ---
    {
      id: "pcb-01",
      number: "01",
      code: "PCB // 01",
      name: "ESP32 DevKit — Frieren Edition",
      category: "PCB / HARDWARE / EMBEDDED",
      type: "pcb",
      selected: true,
      image: "projek pcb/esp32 frieren version.png",
      artDirection: "HIGH-PERFORMANCE TELEMETRY & CONTROL UNIT",
      hudTag: "PCB // 4-LAYER CUSTOM",
      description: "Rancang bangun modul mikro-kontroler ESP32 custom secara mandiri dari awal. Mengintegrasikan proteksi daya USB Type-C, konverter serial CP2102N, regulator LDO 3.3V ber-noise rendah, dan routing frekuensi tinggi yang presisi dengan silkscreen artwork Frieren beresolusi tinggi pada lapisan atas tanpa mengorbankan integritas sinyal antena RF.",
      tech: "KiCad 8, ESP32-WROOM-32E, USB Type-C, CP2102N, LDO 3.3V, 4-Layer PCB",
      role: "Solo Hardware & Firmware Engineer (Full-Cycle Rancang Bangun Mandiri)",
      year: "2025 – 2026",
      status: "Production Prototype // Operational"
    },
    {
      id: "pcb-02",
      number: "02",
      code: "PCB // 02",
      name: "Industrial Ethernet CAN Gateway",
      category: "PCB / INDUSTRIAL NETWORKING",
      type: "pcb",
      selected: true,
      image: "projek pcb/ethernet can gateway.png",
      artDirection: "ROBOTICS & INDUSTRIAL BUS INTERFACE",
      hudTag: "BUS // CAN 2.0B + ETHERNET",
      description: "Gateway komunikasi industri yang dirancang mandiri untuk menjembatani bus kontrol industri CAN 2.0B dengan jaringan kabel Ethernet 10/100 Mbps. Dilengkapi supresi lonjakan tegangan transien (TVS diode protection), isolasi sinyal, dan jalur diferensial 120-ohm matched impedance untuk transmisi data telemetri yang tahan derau elektromagnetik.",
      tech: "KiCad, CAN 2.0B Controller, TJA1050 Transceiver, W5500 SPI Ethernet, TVS Diodes, C++",
      role: "Solo Systems & Hardware Engineer (Desain Skematik, Routing & Protokol Mandiri)",
      year: "2025",
      status: "Lab Tested // Telemetry Validated"
    },
    {
      id: "pcb-03",
      number: "03",
      code: "PCB // 03",
      name: "STM32 Custom Control Board",
      category: "PCB / HARDWARE / EMBEDDED",
      type: "pcb",
      selected: true,
      image: "projek pcb/stm32 custom board.png",
      artDirection: "HIGH-SPEED EMBEDDED CONTROL ARCHITECTURE",
      hudTag: "MCU // STM32 ARM CORTEX",
      description: "Papan kontroler komputasi tersemat mandiri bertenaga ARM Cortex-M 32-bit untuk pemrosesan aktuator dan sensor real-time. Menampilkan regulator daya ganda 5V/3.3V berstabilitas tinggi, crystal oscillator presisi, antarmuka debugging SWD, serta ekspansi I/O berdensitas tinggi untuk pengendalian motorik dan telemetri serial.",
      tech: "KiCad, STM32 Microcontroller, STM32CubeIDE, SWD Debugger, Multi-Rail Power, C/C++",
      role: "Solo Embedded Hardware Engineer (Rancang Bangun STM32, Layout & Driver Mandiri)",
      year: "2025",
      status: "Fabricated // Core Validated"
    },
    {
      id: "pcb-04",
      number: "04",
      code: "PCB // 04",
      name: "Synchronous DC-DC Buck Converter",
      category: "PCB / POWER ELECTRONICS",
      type: "pcb",
      selected: false,
      image: "projek pcb/buck converter.png",
      artDirection: "POWER REGULATION & CONVERSION MODULE",
      hudTag: "PWR // DC-DC STEP-DOWN",
      description: "Modul catu daya DC-DC step-down teregulasi dengan efisiensi konversi tinggi untuk menyuplai beban mikroprosesor dan modul telemetri RF. Dirancang dengan perhitungan induktansi presisi, loop switching minimal untuk meredam EMI, serta bidang tembaga pembuang panas (thermal relief) yang menjaga stabilitas output tegangan di bawah beban arus kontinu.",
      tech: "KiCad, DC-DC Switching Regulator, Power Inductor, Low-ESR Capacitors, Thermal Relief",
      role: "Solo Power Electronics Designer (Perhitungan Matematis, Layout Termal & Uji Beban)",
      year: "2024 – 2025",
      status: "Verified (<45mV Voltage Ripple)"
    },
    {
      id: "pcb-05",
      number: "05",
      code: "PCB // 05",
      name: "2.4GHz RF Carrier & Harness Board",
      category: "PCB / RF HARDWARE",
      type: "pcb",
      selected: false,
      image: "projek pcb/nrf jammer pcb.png",
      artDirection: "RF TRANSMISSION & HARNESS MODULE",
      hudTag: "RF // 2.4GHz HARNESS",
      description: "Papan antarmuka transmisi frekuensi radio 2.4 GHz khusus berbasis NRF24L01+. Didesain mandiri dengan konektor antena SMA eksternal, jaringan decoupling ber-ESR rendah untuk meredam noise switching, dan jalur sinyal RF berimpedansi terkontrol 50-ohm untuk riset analisis interferensi spektrum radio di lingkungan laboratorium tertutup.",
      tech: "KiCad, NRF24L01+ Transceiver, 50-Ohm Trace Routing, SMA Connector, Decoupling Network",
      role: "Solo RF Hardware Designer (Impedance Layout, Decoupling & Controlled Lab Testing)",
      year: "2024 – 2025",
      status: "Controlled Lab Prototype"
    },

    // --- IOT & EMBEDDED PROJECTS (7) ---
    {
      id: "iot-01",
      number: "06",
      code: "IOT // 01",
      name: "Custom OS & CLI Telemetry Kernel",
      category: "EMBEDDED / PROGRAMMING",
      type: "iot",
      selected: true,
      image: "projek iot/custom os custom cli esp32.jpeg",
      artDirection: "LOW-LEVEL FIRMWARE & COMMAND INTERFACE",
      hudTag: "OS // CLI TELEMETRY KERNEL",
      description: "Sistem operasi mini dan antarmuka shell CLI mandiri yang berjalan di atas dual-core ESP32 dengan task scheduler FreeRTOS. Mendukung command parsing non-blocking, inspeksi telemetri memori real-time (heap/stack allocation), eksekusi modul diagnosa jaringan nirkabel, serta logging performa perangkat keras langsung melalui komunikasi serial berkecepatan tinggi.",
      tech: "ESP-IDF, FreeRTOS, C/C++, Non-Blocking UART, Dynamic Command Registry, Ring Buffers",
      role: "Solo Systems & Firmware Architect (Arsitektur Shell, Command Parser & Multitasking Mandiri)",
      year: "2025 – 2026",
      status: "Operational // Active Core Kernel"
    },
    {
      id: "iot-02",
      number: "07",
      code: "IOT // 02",
      name: "Cloud Telemetry Server & Sensor Broker",
      category: "IOT / INFRASTRUCTURE",
      type: "iot",
      selected: false,
      image: "projek iot/cloud server.jpeg",
      artDirection: "CENTRAL TELEMETRY & NETWORK SERVER",
      hudTag: "NET // CLOUD TELEMETRY HOST",
      description: "Infrastruktur telemetri awan mandiri yang bertindak sebagai broker sentral bagi kluster node sensor mikrokontroler lapangan. Mengimplementasikan protokol MQTT ber-overhead rendah dan endpoint REST/WebSocket untuk melakukan ingest data, validasi struktur payload JSON, serta streaming metriks telemetri secara real-time dengan latensi rendah.",
      tech: "Python, MQTT Broker, WebSocket, REST APIs, JSON Telemetry Pipelines, Time-Series Logging",
      role: "Solo Full-Stack IoT Engineer (Protokol Firmware, Cloud Broker & Pipeline Mandiri)",
      year: "2025",
      status: "Online // Production Connected"
    },
    {
      id: "iot-03",
      number: "08",
      code: "IOT // 03",
      name: "ESP32 Wireless Security & Protocol Lab",
      category: "IOT / WIRELESS LAB",
      type: "iot",
      selected: false,
      image: "projek iot/esp32 wifi deuth evil twin.jpeg",
      artDirection: "WIRELESS DIAGNOSTICS & TELEMETRY LAB",
      hudTag: "WIFI // 802.11 B/G/N LAB",
      description: "Platform riset keamanan nirkabel edukatif mandiri untuk menganalisis kelemahan protokol WiFi 802.11 b/g/n. Menggunakan mode promiscuous ESP32 untuk mendeteksi paket deotentikasi, memetakan kepadatan AP di sekitar, dan mendemonstrasikan skenario captive portal (evil twin) dalam lingkungan terisolasi untuk tujuan edukasi pertahanan siber dan mitigasi ancaman jaringan.",
      tech: "ESP32 Promiscuous Mode, 802.11 Frame Parsing, DNS Spoofing, Embedded Web Server, C++",
      role: "Solo Security Researcher & Developer (Packet Inspection, Captive Portal & Defense Lab Mandiri)",
      year: "2024 – 2025",
      status: "Research Experiment Completed"
    },
    {
      id: "iot-04",
      number: "09",
      code: "IOT // 04",
      name: "NRF24L01 2.4GHz RF Spectrum Lab",
      category: "ELECTRONICS / RF",
      type: "iot",
      selected: false,
      image: "projek iot/jammer nrf .jpeg",
      artDirection: "RF FREQUENCY EXPERIMENTATION & TESTING",
      hudTag: "RF // SPECTRUM LAB",
      description: "Pengembangan firmware dan eksperimen modulasi pembawa frekuensi radio 2.4 GHz ISM secara mandiri. Memanfaatkan modul NRF24L01+ bertenaga tinggi untuk menyapu saluran (channel hopping 0-125) dengan transmisi paket kontinu, bertujuan untuk menguji ketahanan protokol komunikasi nirkabel terhadap interferensi sinyal di ruang laboratorium terlindung.",
      tech: "NRF24L01+ PA/LNA, C++, High-Speed SPI Driver, ISM Band Analysis, Frequency Sweeping",
      role: "Solo RF Systems Developer (Algoritma Frequency Sweep & Optimasi SPI Mandiri)",
      year: "2024",
      status: "Lab Experiment Verified"
    },
    {
      id: "iot-05",
      number: "10",
      code: "IOT // 05",
      name: "Precision Analog Capacitance Meter",
      category: "ELECTRONICS / INSTRUMENTATION",
      type: "iot",
      selected: false,
      image: "projek iot/kapasitas kapasitor.jpeg",
      artDirection: "ANALOG INSTRUMENTATION & SENSING",
      hudTag: "SENSE // CAPACITANCE METER",
      description: "Alat ukur kapasitas kapasitor digital presisi tinggi yang dibangun mandiri dari nol dengan menerapkan prinsip waktu pengisian transient sirkuit RC (tau = R x C). Memanfaatkan komparator analog internal dan interupsi timer presisi mikrodetik untuk menghitung nilai kapasitansi dari skala pikofarad hingga milifarad dengan pembacaan langsung di layar OLED.",
      tech: "Microcontroller ADC, Analog Comparator, RC Timing Circuit, Embedded C++, OLED I2C",
      role: "Solo Instrumentation Engineer (Pemodelan Matematis RC, Firmware & Kalibrasi Mandiri)",
      year: "2024",
      status: "Calibrated (<3% Deviation Tolerance)"
    },
    {
      id: "iot-06",
      number: "11",
      code: "IOT // 06",
      name: "MPU6050 6-Axis IMU Kinematics Engine",
      category: "EMBEDDED / ROBOTICS",
      type: "iot",
      selected: false,
      image: "projek iot/rotasi mpu.jpeg",
      artDirection: "IMU INERTIAL MEASUREMENT & KINEMATICS",
      hudTag: "IMU // 6-AXIS TELEMETRY",
      description: "Implementasi sistem estimasi orientasi dan kinematika gerak 6 derajat kebebasan (6-DOF) mandiri berbasis sensor MPU6050. Mengombinasikan data akselerometer dan giroskop melalui algoritma complementary filter untuk mereduksi gyro drift dan derau mekanik, menghasilkan kalkulasi sudut pitch, roll, dan yaw yang stabil dan responsif untuk navigasi robotika.",
      tech: "MPU6050 6-DOF IMU, I2C Fast-Mode, Complementary Filter, C++, Quaternion Math, Telemetry Stream",
      role: "Solo Robotics & Sensor Engineer (Driver I2C, Sensor Fusion Math & Orientasi Mandiri)",
      year: "2024 – 2025",
      status: "Operational in Robotics Setup"
    },
    {
      id: "iot-07",
      number: "12",
      code: "IOT // 07",
      name: "ESP32 Transparent WiFi Range Repeater",
      category: "IOT / NETWORKING",
      type: "iot",
      selected: false,
      image: "projek iot/wifi repeater.jpeg",
      artDirection: "EXTENDED RANGE SIGNAL RELAY",
      hudTag: "NET // PACKET REPEATER",
      description: "Solusi repeater nirkabel mandiri yang memanfaatkan kapabilitas dual-interface (Station + SoftAP) pada ESP32 untuk memperluas jangkauan sinyal WiFi tanpa kehilangan throughput signifikan. Mengonfigurasi layer LwIP untuk NAT routing dan packet forwarding transparan, memungkinkan banyak klien terhubung secara simultan dengan stabilitas transmisi tinggi.",
      tech: "ESP32 STA+AP Mode, LwIP TCP/IP Stack, IP Forwarding, C++, Web Management Console",
      role: "Solo Network & Firmware Developer (Arsitektur LwIP, NAT Routing & Relaying Mandiri)",
      year: "2024 – 2025",
      status: "Deployed // Active Daily Relay"
    }
  ],

  // --------------------------------------------------------------------------
  // ACHIEVEMENTS & KEY MILESTONES
  // --------------------------------------------------------------------------
  achievements: [
    { title: "Custom PCB R&D & Embedded Systems", year: "2024–2025", event: "Independent Hardware Laboratory", result: "Solo Circuit Designer & Firmware Engineer" },
    { title: "Pentas Aplikasi Teater Catur", year: "2024", event: "Pentas Akbar Teater SMAN 2 Pasuruan", result: "Ketua Divisi PDD & Dokumentasi Utama" },
    { title: "Event Akbar Seirama & Abirama", year: "2024", event: "OSIS SMAN 2 Kota Pasuruan", result: "Sponsorship & Lead Dokumentasi Visual" },
    { title: "Pendamping Belajar UTBK-SNBT", year: "2025–2026", event: "Time Tutorial Service (TST) — Study Buddy", result: "Peer Tutor Penalaran Umum & Kuantitatif" },
    { title: "Program Sertifikasi Halal Gratis UMKM", year: "2025", event: "Pemberdayaan Warga — Karang Taruna", result: "Relawan Fotografer & Tim Dokumenter" },
    { title: "Festival Al-Banjari & Hari Kemerdekaan", year: "2025", event: "Forum Anak Kecamatan Purworejo", result: "Lead Dokumentasi & Tim Operasional Lapangan" }
  ],

  // --------------------------------------------------------------------------
  // TECHNICAL SPECIFICATION SHEET (ACTUAL SKILLS AS PROVIDED)
  // --------------------------------------------------------------------------
  skills: {
    "PROGRAMMING LANGUAGES": [
      "Python",
      "C++ (Arduino)",
      "JavaScript",
      "HTML",
      "CSS",
      "MATLAB"
    ],
    "IoT & EMBEDDED HARDWARE": [
      "ESP32 & STM32 Microcontrollers",
      "Arduino Prototyping",
      "KiCad (Schematic & PCB Design)",
      "NRF24L01 RF Transceiver",
      "MPU6050 6-Axis IMU Sensor",
      "PIR & Ultrasonic Sensors",
      "pH, TDS & Turbidity Sensors",
      "OLED Display & Serial Communication"
    ],
    "DATA, AI & VISUALIZATION": [
      "NumPy",
      "Matplotlib",
      "pyqtgraph",
      "Basic Machine Learning",
      "JSON Data Pipelines"
    ],
    "NETWORKING & WIRELESS LAB": [
      "WiFi 802.11 Protocols",
      "Basic RF Principles",
      "Wireless Interference Analysis",
      "Deauthentication (Research Context)",
      "Evil Twin Testing (Educational Lab)"
    ],
    "DESKTOP & WEB APPS": [
      "Tkinter GUI Development",
      "PyQt5 Desktop Applications",
      "jsQR Barcode Integration",
      "QRCode.js Library"
    ],
    "SYSTEMS, OS & DEV TOOLS": [
      "OS Modification & Customization",
      "System Installation",
      "System Configuration & Shell CLI",
      "Git Version Control",
      "GitHub Repository Management"
    ]
  },

  // --------------------------------------------------------------------------
  // CURRENT BUILD / DEV LOG
  // --------------------------------------------------------------------------
  currentBuild: {
    learning: "Data engineering pipelines, FreeRTOS multi-core task scheduling, and advanced machine learning for logistics analytics.",
    project: "Custom ESP32 telemetry platform with custom CLI and wireless telemetry monitoring.",
    interest: "Robotics kinematics, wireless RF security research, and high-performance embedded PCB design.",
    next: "Deploying integrated AI-assisted sensor monitoring with real-time analytics."
  },

  // --------------------------------------------------------------------------
  // ACTUAL CONTACT DETAILS
  // --------------------------------------------------------------------------
  contact: {
    whatsapp: "085739114227",
    whatsappUrl: "https://wa.me/6285739114227",
    github: "https://github.com/Afra4509",
    linkedin: "https://linkedin.com/in/afra-fadhma-dinata-58a371314",
    portfolio: "https://aefera.me",
    instagram: "https://instagram.com/afrafdhma"
  },

  // --------------------------------------------------------------------------
  // MAIN WEBSITE & OTHER WORKS PORTAL (aefera.me)
  // Explains this site is for hardware/embedded while aefera.me is the main hub
  // --------------------------------------------------------------------------
  mainPortal: {
    tag: "07 — EXTERNAL PORTAL // AEFERA.ME",
    badge: "PRIMARY DIGITAL HUB",
    title: "Mencari Portofolio Software & Proyek Lainnya?",
    lead: "Website ini berbeda dengan website utama saya — di sini difokuskan secara khusus sebagai arsip teknis Hardware Engineering, Custom PCB Design, Embedded Firmware ESP32, dan Eksplorasi Robotika.",
    description: "Jika Anda ingin melihat proyek-proyek Software Engineering, Full-Stack Web Development, Data Analytics, Repository Open Source di GitHub, serta karya digital utama saya lainnya, silakan kunjungi website utama saya di aefera.me.",
    url: "https://aefera.me",
    domain: "aefera.me",
    buttonText: "Kunjungi aefera.me (Website Utama)",
    hud: "SYS.ROUTE // TARGET: PRIMARY_DOMAIN",
    thisSite: {
      badge: "WEBSITE INI (CURRENT REPO)",
      title: "Hardware, PCB & Embedded Systems",
      desc: "Portofolio spesialisasi teknis untuk dokumentasi laboratorium elektronika dan perangkat keras:",
      points: [
        "Desain Custom PCB (KiCad, 4-Layer High Density)",
        "Pemrograman Firmware Low-Level C/C++ (ESP32 / STM32)",
        "Telemetri Sensor IoT, Jaringan Nirkabel & WiFi Lab",
        "Eksplorasi Robotika & Modifikasi Sistem Operasi"
      ]
    },
    mainSite: {
      badge: "WEBSITE UTAMA // PRIMARY HUB ↗",
      title: "aefera.me",
      desc: "Pusat seluruh portofolio utama, rekayasa perangkat lunak, dan karya digital publik:",
      points: [
        "Software Engineering & Full-Stack Web Development",
        "Data Analytics, Business Statistics & Machine Learning",
        "Repositori Publik GitHub (@Afra4509) & Open Source",
        "Interactive UI/UX Design & Portofolio Personal Lengkap"
      ]
    }
  }
};
