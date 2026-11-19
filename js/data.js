const portfolioData = {

  profile: {
    name: "Afra Fadhma Dinata",
    role: "Hardware, firmware, dan data engineering",
    tagline: "Mahasiswa D4 Analitika Logistik Terapan di ITS. Saya mendesain PCB, menulis firmware, dan membangun sistem IoT.",
    institution: "Institut Teknologi Sepuluh Nopember (ITS)",
    department: "Departemen Statistika Bisnis",
    program: "D4 Analitika Logistik Terapan",
    nrp: "2058261004",
    status: "Mahasiswa aktif",
    location: "Surabaya, Indonesia",
    focus: "Embedded, PCB, IoT",
    year: "2026",

    statement: "Saya mahasiswa D4 Analitika Logistik Terapan di ITS. Di luar kuliah, saya mendesain PCB sendiri, menulis firmware untuk ESP32 dan STM32, dan membangun sistem IoT dari sensor sampai server.",
    paragraphs: [
      "Proyek saya mencakup desain PCB di KiCad, sistem pemantauan berbasis AI, dan riset keamanan WiFi untuk tujuan edukasi. Bahasa yang saya pakai sehari-hari adalah Python, C++, JavaScript, dan MATLAB.",
      "Saya juga memodifikasi sistem operasi untuk belajar, dan aktif di organisasi serta komunitas, terutama sebagai fotografer dan panitia acara."
    ],
    interests: [
      "Fotografi", "Pemrograman", "IoT", "Elektronika",
      "Pengembangan teknologi", "Pengembangan aplikasi", "Eksperimen hardware"
    ],

    photo: "foto profile/1776187037004.jpg",
    heroImage: "projek pcb/esp32 frieren version.png",
    heroProject: "pcb-01"
  },

  education: [
    {
      institution: "Institut Teknologi Sepuluh Nopember (ITS)",
      degree: "D4 Analitika Logistik Terapan",
      detail: "Departemen Statistika Bisnis. Kurikulum mencakup analitika logistik, pemodelan statistik, dan sistem informasi rantai pasok.",
      period: "2026 sampai sekarang",
      image: "logo pendidikan/its.png"
    },
    {
      institution: "SMAN 2 Pasuruan",
      degree: "Peminatan sains dan matematika",
      detail: "Aktif di organisasi seni, budaya, dan teater.",
      period: "2023 sampai 2026",
      image: "logo pendidikan/smada pasuruan.jpg"
    }
  ],

  organizations: [
    {
      name: "Karang Taruna Purworejo, Pasuruan",
      position: "Anggota, relawan fotografi dan dokumentasi",
      year: "2025–2026",
      description: "Dokumentasi visual untuk kegiatan sosial dan program ekonomi warga.",
      bullets: [
        "Fotografer utama untuk program pendampingan sertifikasi Label Halal gratis bagi pelaku UMKM lokal.",
        "Menyusun arsip foto dan konten publikasi kegiatan organisasi.",
        "Membantu koordinasi dokumentasi di acara pemuda tingkat kelurahan."
      ],
      image: "logo organisasi/karang taruna.jpg"
    },
    {
      name: "Forum Anak Purworejo, Pasuruan",
      position: "Anggota, fotografer dan perlengkapan acara",
      year: "2025–2026",
      description: "Dokumentasi dan operasional acara anak, kepemudaan, dan hari besar.",
      bullets: [
        "Fotografer utama untuk perayaan Agustusan dan Festival Al-Banjari.",
        "Mengurus perlengkapan panggung dan logistik di divisi perkap.",
        "Menyusun arsip dokumentasi untuk pelaporan forum anak daerah."
      ],
      image: "logo organisasi/forum anak kecamatan purworejo.jpg"
    },
    {
      name: "GO Study Buddy",
      position: "Pendamping belajar, peer tutor UTBK-SNBT",
      year: "2025–2026",
      description: "Pendamping belajar sebaya di program Time Tutorial Service (TST) untuk persiapan masuk PTN.",
      bullets: [
        "Membimbing siswa mengerjakan soal Penalaran Umum, Pengetahuan Kuantitatif, dan Penalaran Matematika.",
        "Menyusun cara belajar dari pola soal, rumus praktis, dan pengaturan waktu."
      ],
      image: "logo organisasi/ganesha operation.png"
    },
    {
      name: "OSIS SMAN 2 Kota Pasuruan",
      position: "Seksi Pembinaan Seni, Sastra, dan Budaya",
      year: "2024–2025",
      description: "Panitia acara sekolah dengan ratusan sampai ribuan peserta.",
      bullets: [
        "Tim sponsorship untuk festival dan pentas seni SEIRAMA, termasuk negosiasi pendanaan dengan pihak luar.",
        "Co-perlengkapan Maulid Nabi 2024: panggung, tata letak, dan peralatan acara.",
        "Fotografer resmi untuk acara IBS dan Abirama.",
        "Mewakili sekolah di seminar nasional kepemudaan tentang pencegahan narkoba dan antikorupsi."
      ],
      image: "logo organisasi/osis sman 2 kota pasuruan.jpg"
    },
    {
      name: "Teater Catur",
      position: "Ketua Divisi PDD (Publikasi, Dekorasi, Dokumentasi)",
      year: "2023–2024",
      description: "Memimpin divisi yang mengurus identitas visual, publikasi, dan arsip pementasan.",
      bullets: [
        "Merancang dekorasi panggung, materi publikasi, dan dokumentasi untuk acara Pentas Aplikasi.",
        "Fotografer dan videografer utama pementasan.",
        "Mengatur arsip media produksi untuk keperluan publikasi berikutnya."
      ],
      image: "logo organisasi/teater catur.jpg"
    }
  ],

  projects: [
    {
      id: "pcb-01", kind: "pcb", featured: true, area: "PCB",
      name: "ESP32 DevKit Frieren Edition",
      summary: "Board ESP32 rancangan sendiri dengan USB-C, CP2102N, dan artwork Frieren di silkscreen.",
      description: "Board pengembangan ESP32 yang saya rancang dari nol. Board ini punya proteksi daya USB Type-C, konverter serial CP2102N, dan regulator LDO 3.3 V. Artwork Frieren ada di lapisan atas, dengan routing yang dijaga supaya tidak mengganggu sinyal antena.",
      tech: "KiCad 8, ESP32-WROOM-32E, USB Type-C, CP2102N, LDO 3.3 V, PCB 4 layer",
      role: "Desain skematik, layout PCB, firmware",
      image: "projek pcb/esp32 frieren version.png",
      year: "2026", status: "Prototipe"
    },
    {
      id: "pcb-02", kind: "pcb", featured: true, area: "PCB",
      name: "Ethernet–CAN Gateway",
      summary: "Gateway yang menghubungkan bus CAN 2.0B ke Ethernet 10/100 Mbps.",
      description: "Gateway industri yang menjembatani bus CAN 2.0B dengan jaringan Ethernet 10/100 Mbps. Memakai transceiver TJA1050, W5500 untuk Ethernet lewat SPI, dioda TVS untuk proteksi lonjakan tegangan, dan jalur diferensial 120 ohm.",
      tech: "KiCad, CAN 2.0B, TJA1050, W5500 SPI Ethernet, dioda TVS, C++",
      role: "Desain skematik, layout, protokol",
      image: "projek pcb/ethernet can gateway.png",
      year: "2026", status: "Prototipe"
    },
    {
      id: "pcb-03", kind: "pcb", featured: true, area: "PCB",
      name: "STM32 Control Board",
      summary: "Board kontrol STM32 untuk sensor, motor, dan komunikasi serial.",
      description: "Board kontrol berbasis STM32 (ARM Cortex-M 32-bit) untuk membaca sensor dan menggerakkan aktuator secara real-time. Punya regulator 5 V dan 3.3 V, crystal oscillator, port debug SWD, dan header I/O untuk motor dan komunikasi serial.",
      tech: "KiCad, STM32, STM32CubeIDE, SWD, regulator multi-rail, C/C++",
      role: "Desain hardware, layout, driver",
      image: "projek pcb/stm32 custom board.png",
      year: "2026", status: "Prototipe"
    },
    {
      id: "pcb-04", kind: "pcb", featured: false, area: "Daya",
      name: "Buck Converter Sinkron",
      summary: "Modul DC-DC step-down untuk beban mikroprosesor dan RF.",
      description: "Modul DC-DC step-down untuk menyuplai mikroprosesor dan modul RF. Nilai induktor saya hitung manual, loop switching dibuat pendek untuk menekan EMI, dan bidang tembaga dipakai untuk membuang panas.",
      tech: "KiCad, regulator switching DC-DC, induktor daya, kapasitor ESR rendah, thermal relief",
      role: "Perhitungan, layout termal, uji beban",
      image: "projek pcb/buck converter.png",
      year: "2026", status: "Prototipe"
    },
    {
      id: "pcb-05", kind: "pcb", featured: false, area: "RF",
      name: "RF Carrier Board 2.4 GHz",
      summary: "Board pembawa NRF24L01+ untuk riset interferensi 2.4 GHz.",
      description: "Board pembawa modul NRF24L01+ untuk riset interferensi 2.4 GHz di lab tertutup. Ada konektor antena SMA, kapasitor decoupling ESR rendah, dan jalur RF 50 ohm.",
      tech: "KiCad, NRF24L01+, routing 50 ohm, konektor SMA, jaringan decoupling",
      role: "Layout impedansi, decoupling, pengujian di lab",
      image: "projek pcb/nrf jammer pcb.png",
      year: "2026", status: "Prototipe"
    },

    {
      id: "iot-01", kind: "iot", featured: true, area: "Firmware",
      name: "Custom OS dan CLI untuk ESP32",
      summary: "Shell CLI dengan scheduler FreeRTOS di dua core ESP32.",
      description: "Sistem mini dengan antarmuka shell CLI yang berjalan di dua core ESP32 memakai FreeRTOS. Mendukung parsing perintah non-blocking, pemantauan heap dan stack, modul diagnosa jaringan, dan logging lewat serial berkecepatan tinggi.",
      tech: "ESP-IDF, FreeRTOS, C/C++, UART non-blocking, command registry dinamis, ring buffer",
      role: "Arsitektur shell, command parser, multitasking",
      image: "projek iot/custom os custom cli esp32.jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-02", kind: "iot", featured: false, area: "Cloud",
      name: "Server Telemetri Cloud",
      summary: "Server MQTT, REST, dan WebSocket untuk node sensor.",
      description: "Server telemetri yang menerima data dari node sensor lewat MQTT, REST, dan WebSocket. Server memvalidasi payload JSON, mencatat data time-series, dan meneruskan metrik secara real-time.",
      tech: "Python, MQTT, WebSocket, REST API, pipeline JSON, logging time-series",
      role: "Firmware, broker cloud, pipeline data",
      image: "projek iot/cloud server.jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-03", kind: "iot", featured: false, area: "Jaringan",
      name: "Lab Keamanan WiFi ESP32",
      summary: "Lab edukasi untuk mempelajari kelemahan protokol WiFi 802.11.",
      description: "Lab riset keamanan WiFi 802.11 b/g/n untuk tujuan edukasi. ESP32 dalam mode promiscuous mendeteksi paket deautentikasi dan memetakan access point di sekitar. Demo captive portal (evil twin) hanya dijalankan di lingkungan terisolasi, untuk mempelajari pertahanan jaringan.",
      tech: "ESP32 mode promiscuous, parsing frame 802.11, DNS spoofing, web server embedded, C++",
      role: "Inspeksi paket, captive portal, lab pertahanan",
      image: "projek iot/esp32 wifi deuth evil twin.jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-04", kind: "iot", featured: false, area: "RF",
      name: "Lab Spektrum RF NRF24L01",
      summary: "Eksperimen frequency sweep 2.4 GHz di ruang lab terlindung.",
      description: "Firmware dan eksperimen frequency sweep pada pita ISM 2.4 GHz dengan NRF24L01+ (channel 0 sampai 125). Tujuannya menguji ketahanan protokol nirkabel terhadap interferensi, di ruang lab terlindung.",
      tech: "NRF24L01+ PA/LNA, C++, driver SPI, analisis pita ISM, frequency sweep",
      role: "Algoritma sweep, optimasi driver SPI",
      image: "projek iot/jammer nrf .jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-05", kind: "iot", featured: false, area: "Instrumentasi",
      name: "Pengukur Kapasitansi",
      summary: "Mengukur pF sampai mF dari waktu pengisian rangkaian RC.",
      description: "Alat ukur kapasitansi yang saya bangun dari nol. Nilainya dihitung dari waktu pengisian rangkaian RC (τ = R × C) memakai komparator analog dan timer mikrodetik, dari skala pikofarad sampai milifarad, lalu ditampilkan di layar OLED.",
      tech: "ADC mikrokontroler, komparator analog, rangkaian RC, C++ embedded, OLED I2C",
      role: "Model matematis RC, firmware, kalibrasi",
      image: "projek iot/kapasitas kapasitor.jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-06", kind: "iot", featured: false, area: "Robotika",
      name: "Sensor Orientasi MPU6050",
      summary: "Estimasi orientasi 6-DOF dengan complementary filter.",
      description: "Estimasi orientasi dan gerak 6-DOF dari sensor MPU6050. Complementary filter menggabungkan data akselerometer dan giroskop untuk mengurangi gyro drift dan derau mekanik, menghasilkan sudut pitch, roll, dan yaw untuk navigasi robot.",
      tech: "MPU6050, I2C fast mode, complementary filter, C++, matematika quaternion, stream telemetri",
      role: "Driver I2C, sensor fusion, orientasi",
      image: "projek iot/rotasi mpu.jpeg",
      year: "2025–2026", status: "Prototipe"
    },
    {
      id: "iot-07", kind: "iot", featured: false, area: "Jaringan",
      name: "Repeater WiFi ESP32",
      summary: "Repeater transparan dengan mode Station dan SoftAP.",
      description: "Repeater WiFi yang memakai mode Station dan SoftAP ESP32 sekaligus untuk memperluas jangkauan sinyal. Layer LwIP mengatur NAT dan packet forwarding, sehingga beberapa klien bisa terhubung bersamaan.",
      tech: "ESP32 STA+AP, LwIP, IP forwarding, C++, konsol web",
      role: "Arsitektur LwIP, NAT routing, relay",
      image: "projek iot/wifi repeater.jpeg",
      year: "2025–2026", status: "Prototipe"
    }
  ],

  certificates: [
    {
      title: "Medali Emas Matematika",
      org: "Kejuaraan Sains Nasional Akhir Tahun (KSN-AT) 2025",
      badge: "Medali emas", year: "2025",
      image: "certifikat/preview/Piagam_KSN-AT_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODo0OQ==.jpg",
      pdf: "certifikat/Piagam_KSN-AT_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODo0OQ==.pdf"
    },
    {
      title: "Medali Emas Matematika",
      org: "Kejuaraan Sains Siswa Nasional (KESAN) 2025",
      badge: "Medali emas", year: "2025",
      image: "certifikat/preview/Piagam_KESAN_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoxNQ==.jpg",
      pdf: "certifikat/Piagam_KESAN_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoxNQ==.pdf"
    },
    {
      title: "Olimpiade IT ARA 6.0",
      org: "Departemen Teknologi Informasi dan HMIT ITS",
      year: "2025",
      image: "certifikat/preview/WhatsApp Image 2026-09-25 at 02.33.49.jpg"
    },
    {
      title: "Medali Emas Matematika",
      org: "Kejuaraan Sains Nasional Puskanas (KSNP) 2025",
      badge: "Medali emas", year: "2025",
      image: "certifikat/preview/Piagam_KSNP_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoyNw==.jpg",
      pdf: "certifikat/Piagam_KSNP_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoyNw==.pdf"
    },
    {
      title: "Google Cloud Roadshow x Build with AI",
      org: "Surabaya 2025",
      year: "2025",
      image: "certifikat/preview/E-certificate Google Cloud Roadshow Surabaya 2025 - __NAME__.jpg",
      pdf: "certifikat/E-certificate Google Cloud Roadshow Surabaya 2025 - __NAME__.pdf"
    },
    {
      title: "Bitsmikro Innovative Vibecode 2025",
      org: "Universitas Mikroskil",
      year: "2025",
      image: "certifikat/preview/BITSMIKRO INNOVATIVE VIBECODE.jpg",
      pdf: "certifikat/BITSMIKRO INNOVATIVE VIBECODE.pdf"
    },
    {
      title: "Schematics 2024 National Logic Competition",
      org: "Teknik Informatika dan HMTC ITS",
      year: "2024",
      image: "certifikat/preview/Salinan Hello syntax - Afra fadhma dinata.jpg",
      pdf: "certifikat/Salinan Hello syntax - Afra fadhma dinata.pdf"
    }
  ],

  skills: [
    { group: "Bahasa pemrograman", items: ["Python", "C++ (Arduino)", "JavaScript", "HTML", "CSS", "MATLAB"] },
    { group: "IoT dan hardware", items: ["ESP32 dan STM32", "Arduino", "KiCad (skematik dan PCB)", "NRF24L01", "IMU MPU6050", "Sensor PIR dan ultrasonik", "Sensor pH, TDS, dan turbidity", "Layar OLED dan komunikasi serial"] },
    { group: "Data dan visualisasi", items: ["NumPy", "Matplotlib", "pyqtgraph", "Machine learning dasar", "Pipeline data JSON"] },
    { group: "Jaringan dan nirkabel", items: ["Protokol WiFi 802.11", "Dasar-dasar RF", "Analisis interferensi nirkabel", "Deautentikasi (konteks riset)", "Pengujian evil twin (lab edukasi)"] },
    { group: "Aplikasi desktop dan web", items: ["Tkinter", "PyQt5", "jsQR", "QRCode.js"] },
    { group: "Sistem dan tools", items: ["Modifikasi OS", "Instalasi sistem", "Konfigurasi sistem dan shell CLI", "Git", "GitHub"] }
  ],

  contact: {
    whatsapp: "085739114227",
    whatsappUrl: "https://wa.me/6285739114227",
    links: [
      { label: "GitHub", value: "github.com/Afra4509", url: "https://github.com/Afra4509" },
      { label: "LinkedIn", value: "Afra Fadhma Dinata", url: "https://linkedin.com/in/afra-fadhma-dinata-58a371314" },
      { label: "Instagram", value: "@afrafdhma", url: "https://instagram.com/afrafdhma" },
      { label: "Situs utama", value: "aefera.me", url: "https://aefera.me" }
    ]
  },

  portal: {
    title: "Proyek software dan karya lain ada di aefera.me",
    lead: "Situs ini khusus untuk hardware, firmware, dan PCB. Proyek software, web, analitika data, dan repositori GitHub ada di situs utama saya.",
    url: "https://aefera.me",
    button: "Buka aefera.me",
    here: {
      title: "Situs ini",
      points: [
        "Desain PCB dengan KiCad",
        "Firmware C/C++ untuk ESP32 dan STM32",
        "IoT, sensor, dan lab jaringan nirkabel",
        "Robotika dan modifikasi sistem operasi"
      ]
    },
    main: {
      title: "aefera.me",
      points: [
        "Software engineering dan web full-stack",
        "Data analytics, statistika bisnis, dan machine learning",
        "Repositori GitHub (@Afra4509)",
        "Desain UI/UX dan portofolio lengkap"
      ]
    }
  }
};

const portfolioImages = {
  "certifikat/preview/BITSMIKRO INNOVATIVE VIBECODE.jpg": [
    2200,
    1555,
    [
      [
        480,
        "img/certifikat-preview-bitsmikro-innovative-vibe-872a73-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-bitsmikro-innovative-vibe-872a73-960.webp"
      ],
      [
        1600,
        "img/certifikat-preview-bitsmikro-innovative-vibe-872a73-1600.webp"
      ],
      [
        2200,
        "img/certifikat-preview-bitsmikro-innovative-vibe-872a73-2200.webp"
      ]
    ]
  ],
  "certifikat/preview/E-certificate Google Cloud Roadshow Surabaya 2025 - __NAME__.jpg": [
    2200,
    1579,
    [
      [
        480,
        "img/certifikat-preview-e-certificate-google-clou-d3dfa4-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-e-certificate-google-clou-d3dfa4-960.webp"
      ],
      [
        1600,
        "img/certifikat-preview-e-certificate-google-clou-d3dfa4-1600.webp"
      ],
      [
        2200,
        "img/certifikat-preview-e-certificate-google-clou-d3dfa4-2200.webp"
      ]
    ]
  ],
  "certifikat/preview/Piagam_KESAN_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoxNQ==.jpg": [
    1072,
    1516,
    [
      [
        480,
        "img/certifikat-preview-piagam-kesan-2025-matemat-e15ab3-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-piagam-kesan-2025-matemat-e15ab3-960.webp"
      ],
      [
        1072,
        "img/certifikat-preview-piagam-kesan-2025-matemat-e15ab3-1072.webp"
      ]
    ]
  ],
  "certifikat/preview/Piagam_KSN-AT_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODo0OQ==.jpg": [
    1516,
    1072,
    [
      [
        480,
        "img/certifikat-preview-piagam-ksn-at-2025-matema-c05c9b-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-piagam-ksn-at-2025-matema-c05c9b-960.webp"
      ],
      [
        1516,
        "img/certifikat-preview-piagam-ksn-at-2025-matema-c05c9b-1516.webp"
      ]
    ]
  ],
  "certifikat/preview/Piagam_KSNP_2025_Matematika_MjAyNi0wMS0wNyAyMDo1ODoyNw==.jpg": [
    1072,
    1516,
    [
      [
        480,
        "img/certifikat-preview-piagam-ksnp-2025-matemati-85464d-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-piagam-ksnp-2025-matemati-85464d-960.webp"
      ],
      [
        1072,
        "img/certifikat-preview-piagam-ksnp-2025-matemati-85464d-1072.webp"
      ]
    ]
  ],
  "certifikat/preview/Salinan Hello syntax - Afra fadhma dinata.jpg": [
    2200,
    1554,
    [
      [
        480,
        "img/certifikat-preview-salinan-hello-syntax-afra-9b4520-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-salinan-hello-syntax-afra-9b4520-960.webp"
      ],
      [
        1600,
        "img/certifikat-preview-salinan-hello-syntax-afra-9b4520-1600.webp"
      ],
      [
        2200,
        "img/certifikat-preview-salinan-hello-syntax-afra-9b4520-2200.webp"
      ]
    ]
  ],
  "certifikat/preview/WhatsApp Image 2026-09-25 at 02.33.49.jpg": [
    1058,
    792,
    [
      [
        480,
        "img/certifikat-preview-whatsapp-image-2026-09-25-d9fb2e-480.webp"
      ],
      [
        960,
        "img/certifikat-preview-whatsapp-image-2026-09-25-d9fb2e-960.webp"
      ],
      [
        1058,
        "img/certifikat-preview-whatsapp-image-2026-09-25-d9fb2e-1058.webp"
      ]
    ]
  ],
  "foto profile/1776187037004.jpg": [
    400,
    400,
    []
  ],
  "logo organisasi/forum anak kecamatan purworejo.jpg": [
    150,
    150,
    []
  ],
  "logo organisasi/ganesha operation.png": [
    600,
    300,
    []
  ],
  "logo organisasi/karang taruna.jpg": [
    92,
    92,
    []
  ],
  "logo organisasi/osis sman 2 kota pasuruan.jpg": [
    447,
    447,
    []
  ],
  "logo organisasi/teater catur.jpg": [
    225,
    225,
    []
  ],
  "logo pendidikan/its.png": [
    148,
    148,
    []
  ],
  "logo pendidikan/smada pasuruan.jpg": [
    189,
    177,
    []
  ],
  "projek iot/cloud server.jpeg": [
    1080,
    1347,
    [
      [
        480,
        "img/projek-iot-cloud-server-29ce6e-480.webp"
      ],
      [
        960,
        "img/projek-iot-cloud-server-29ce6e-960.webp"
      ],
      [
        1080,
        "img/projek-iot-cloud-server-29ce6e-1080.webp"
      ]
    ]
  ],
  "projek iot/custom os custom cli esp32.jpeg": [
    1080,
    1546,
    [
      [
        480,
        "img/projek-iot-custom-os-custom-cli-esp32-d120de-480.webp"
      ],
      [
        960,
        "img/projek-iot-custom-os-custom-cli-esp32-d120de-960.webp"
      ],
      [
        1080,
        "img/projek-iot-custom-os-custom-cli-esp32-d120de-1080.webp"
      ]
    ]
  ],
  "projek iot/esp32 wifi deuth evil twin.jpeg": [
    1080,
    1267,
    [
      [
        480,
        "img/projek-iot-esp32-wifi-deuth-evil-twin-296820-480.webp"
      ],
      [
        960,
        "img/projek-iot-esp32-wifi-deuth-evil-twin-296820-960.webp"
      ],
      [
        1080,
        "img/projek-iot-esp32-wifi-deuth-evil-twin-296820-1080.webp"
      ]
    ]
  ],
  "projek iot/jammer nrf .jpeg": [
    1080,
    1190,
    [
      [
        480,
        "img/projek-iot-jammer-nrf-a632be-480.webp"
      ],
      [
        960,
        "img/projek-iot-jammer-nrf-a632be-960.webp"
      ],
      [
        1080,
        "img/projek-iot-jammer-nrf-a632be-1080.webp"
      ]
    ]
  ],
  "projek iot/kapasitas kapasitor.jpeg": [
    1080,
    1480,
    [
      [
        480,
        "img/projek-iot-kapasitas-kapasitor-43c248-480.webp"
      ],
      [
        960,
        "img/projek-iot-kapasitas-kapasitor-43c248-960.webp"
      ],
      [
        1080,
        "img/projek-iot-kapasitas-kapasitor-43c248-1080.webp"
      ]
    ]
  ],
  "projek iot/rotasi mpu.jpeg": [
    1080,
    1267,
    [
      [
        480,
        "img/projek-iot-rotasi-mpu-9bacdf-480.webp"
      ],
      [
        960,
        "img/projek-iot-rotasi-mpu-9bacdf-960.webp"
      ],
      [
        1080,
        "img/projek-iot-rotasi-mpu-9bacdf-1080.webp"
      ]
    ]
  ],
  "projek iot/wifi repeater.jpeg": [
    1080,
    1275,
    [
      [
        480,
        "img/projek-iot-wifi-repeater-cfe22f-480.webp"
      ],
      [
        960,
        "img/projek-iot-wifi-repeater-cfe22f-960.webp"
      ],
      [
        1080,
        "img/projek-iot-wifi-repeater-cfe22f-1080.webp"
      ]
    ]
  ],
  "projek pcb/buck converter.png": [
    1920,
    1031,
    [
      [
        480,
        "img/projek-pcb-buck-converter-827683-480.webp"
      ],
      [
        960,
        "img/projek-pcb-buck-converter-827683-960.webp"
      ],
      [
        1600,
        "img/projek-pcb-buck-converter-827683-1600.webp"
      ],
      [
        1920,
        "img/projek-pcb-buck-converter-827683-1920.webp"
      ]
    ]
  ],
  "projek pcb/esp32 frieren version.png": [
    5524,
    3028,
    [
      [
        480,
        "img/projek-pcb-esp32-frieren-version-1de39a-480.webp"
      ],
      [
        960,
        "img/projek-pcb-esp32-frieren-version-1de39a-960.webp"
      ],
      [
        1600,
        "img/projek-pcb-esp32-frieren-version-1de39a-1600.webp"
      ],
      [
        2400,
        "img/projek-pcb-esp32-frieren-version-1de39a-2400.webp"
      ]
    ]
  ],
  "projek pcb/ethernet can gateway.png": [
    1904,
    1064,
    [
      [
        480,
        "img/projek-pcb-ethernet-can-gateway-bfbd06-480.webp"
      ],
      [
        960,
        "img/projek-pcb-ethernet-can-gateway-bfbd06-960.webp"
      ],
      [
        1600,
        "img/projek-pcb-ethernet-can-gateway-bfbd06-1600.webp"
      ],
      [
        1904,
        "img/projek-pcb-ethernet-can-gateway-bfbd06-1904.webp"
      ]
    ]
  ],
  "projek pcb/nrf jammer pcb.png": [
    1920,
    1032,
    [
      [
        480,
        "img/projek-pcb-nrf-jammer-pcb-582d50-480.webp"
      ],
      [
        960,
        "img/projek-pcb-nrf-jammer-pcb-582d50-960.webp"
      ],
      [
        1600,
        "img/projek-pcb-nrf-jammer-pcb-582d50-1600.webp"
      ],
      [
        1920,
        "img/projek-pcb-nrf-jammer-pcb-582d50-1920.webp"
      ]
    ]
  ],
  "projek pcb/stm32 custom board.png": [
    1918,
    1034,
    [
      [
        480,
        "img/projek-pcb-stm32-custom-board-74f5de-480.webp"
      ],
      [
        960,
        "img/projek-pcb-stm32-custom-board-74f5de-960.webp"
      ],
      [
        1600,
        "img/projek-pcb-stm32-custom-board-74f5de-1600.webp"
      ],
      [
        1918,
        "img/projek-pcb-stm32-custom-board-74f5de-1918.webp"
      ]
    ]
  ]
};