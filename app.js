(() => {
  'use strict';

  const STORAGE_KEY = 'route-map-builder-v6';
  const LEGACY_KEYS = ['route-map-builder-v5', 'route-map-builder-v4', 'route-map-builder-v3'];
  const DEFAULT_CENTER = [48.9226, 24.7111];
  const DEFAULT_ELEMENT_PX = { sign: 58, zebra: 86, bump: 86, trafficLight: 52, note: 130, callout: 32 };
  const EARTH_CIRCUMFERENCE = 40075016.686;

  const SIGN_GROUPS = [
  {
    "title": "Попереджувальні знаки",
    "signs": [
      {
        "id": "1.1",
        "title": "Небезпечний поворот праворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.1"
      },
      {
        "id": "1.2",
        "title": "Небезпечний поворот ліворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.2"
      },
      {
        "id": "1.3.1",
        "title": "Декілька поворотів: перший праворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_3_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.3.1"
      },
      {
        "id": "1.3.2",
        "title": "Декілька поворотів: перший ліворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_3_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.3.2"
      },
      {
        "id": "1.4.1",
        "title": "Знак 1.4.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.1"
      },
      {
        "id": "1.4.2",
        "title": "Знак 1.4.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.2"
      },
      {
        "id": "1.4.3",
        "title": "Знак 1.4.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.3"
      },
      {
        "id": "1.4.4",
        "title": "Знак 1.4.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.4"
      },
      {
        "id": "1.4.5",
        "title": "Знак 1.4.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.5"
      },
      {
        "id": "1.4.6",
        "title": "Знак 1.4.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.6"
      },
      {
        "id": "1.4.7",
        "title": "Знак 1.4.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_4_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.4.7"
      },
      {
        "id": "1.5.1",
        "title": "Знак 1.5.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_5_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.5.1"
      },
      {
        "id": "1.5.2",
        "title": "Знак 1.5.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_5_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.5.2"
      },
      {
        "id": "1.5.3",
        "title": "Знак 1.5.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_5_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.5.3"
      },
      {
        "id": "1.6",
        "title": "Крутий підйом",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.6"
      },
      {
        "id": "1.7",
        "title": "Крутий спуск",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.7"
      },
      {
        "id": "1.8",
        "title": "Знак 1.8",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.8"
      },
      {
        "id": "1.9",
        "title": "Знак 1.9",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.9"
      },
      {
        "id": "1.10",
        "title": "Знак 1.10",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_10.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.10"
      },
      {
        "id": "1.11",
        "title": "Знак 1.11",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.11"
      },
      {
        "id": "1.12",
        "title": "Знак 1.12",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.12"
      },
      {
        "id": "1.13",
        "title": "Знак 1.13",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.13"
      },
      {
        "id": "1.14",
        "title": "Викидання кам’яних матеріалів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.14"
      },
      {
        "id": "1.15",
        "title": "Знак 1.15",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.15"
      },
      {
        "id": "1.16",
        "title": "Падіння каміння",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.16"
      },
      {
        "id": "1.17",
        "title": "Знак 1.17",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_17.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.17"
      },
      {
        "id": "1.18",
        "title": "Знак 1.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.18"
      },
      {
        "id": "1.19",
        "title": "Знак 1.19",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_19.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.19"
      },
      {
        "id": "1.20",
        "title": "Знак 1.20",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_20.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.20"
      },
      {
        "id": "1.21",
        "title": "Знак 1.21",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_21.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.21"
      },
      {
        "id": "1.22",
        "title": "Перехрещення з велосипедною доріжкою",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_22.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.22"
      },
      {
        "id": "1.23.1",
        "title": "Знак 1.23.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_23_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.23.1"
      },
      {
        "id": "1.23.2",
        "title": "Знак 1.23.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_23_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.23.2"
      },
      {
        "id": "1.23.3",
        "title": "Знак 1.23.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_23_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.23.3"
      },
      {
        "id": "1.23.4",
        "title": "Знак 1.23.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_23_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.23.4"
      },
      {
        "id": "1.24",
        "title": "Знак 1.24",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_24.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.24"
      },
      {
        "id": "1.25",
        "title": "Знак 1.25",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_25.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.25"
      },
      {
        "id": "1.26",
        "title": "Знак 1.26",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_26.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.26"
      },
      {
        "id": "1.27",
        "title": "Знак 1.27",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_27.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.27"
      },
      {
        "id": "1.28",
        "title": "Знак 1.28",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_28.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.28"
      },
      {
        "id": "1.29",
        "title": "Знак 1.29",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_29.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.29"
      },
      {
        "id": "1.30",
        "title": "Знак 1.30",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_30.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.30"
      },
      {
        "id": "1.31.1",
        "title": "Знак 1.31.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.1"
      },
      {
        "id": "1.31.2",
        "title": "Знак 1.31.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.2"
      },
      {
        "id": "1.31.3",
        "title": "Знак 1.31.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.3"
      },
      {
        "id": "1.31.4",
        "title": "Знак 1.31.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.4"
      },
      {
        "id": "1.31.5",
        "title": "Знак 1.31.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.5"
      },
      {
        "id": "1.31.6",
        "title": "Знак 1.31.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_31_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.31.6"
      },
      {
        "id": "1.32",
        "title": "Знак 1.32",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_32.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.32"
      },
      {
        "id": "1.33",
        "title": "Діти",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_33.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.33"
      },
      {
        "id": "1.34",
        "title": "Виїзд велосипедистів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_34.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.34"
      },
      {
        "id": "1.35",
        "title": "Знак 1.35",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_35.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.35"
      },
      {
        "id": "1.36",
        "title": "Дикі тварини",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_36.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.36"
      },
      {
        "id": "1.37",
        "title": "Дорожні роботи",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_37.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.37"
      },
      {
        "id": "1.38",
        "title": "Знак 1.38",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_38.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.38"
      },
      {
        "id": "1.39",
        "title": "Аварійно-небезпечна ділянка",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_39.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.39"
      },
      {
        "id": "1.40",
        "title": "Знак 1.40",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_40.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.40"
      },
      {
        "id": "1.41",
        "title": "Місце концентрації ДТП",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_1_41.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/1.41"
      }
    ]
  },
  {
    "title": "Знаки пріоритету",
    "signs": [
      {
        "id": "2.1",
        "title": "Дати дорогу",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.1"
      },
      {
        "id": "2.2",
        "title": "Проїзд без зупинки заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.2"
      },
      {
        "id": "2.3",
        "title": "Головна дорога",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.3"
      },
      {
        "id": "2.4",
        "title": "Кінець головної дороги",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.4"
      },
      {
        "id": "2.5",
        "title": "Перевага зустрічного руху",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.5"
      },
      {
        "id": "2.6",
        "title": "Перевага перед зустрічним рухом",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_2_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/2.6"
      }
    ]
  },
  {
    "title": "Заборонні знаки",
    "signs": [
      {
        "id": "3.1",
        "title": "Рух заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.1"
      },
      {
        "id": "3.2",
        "title": "Рух механічних транспортних засобів заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.2"
      },
      {
        "id": "3.3",
        "title": "Рух вантажних автомобілів заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.3"
      },
      {
        "id": "3.4",
        "title": "Знак 3.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.4"
      },
      {
        "id": "3.5",
        "title": "Знак 3.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.5"
      },
      {
        "id": "3.6",
        "title": "Знак 3.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.6"
      },
      {
        "id": "3.7",
        "title": "Знак 3.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.7"
      },
      {
        "id": "3.8",
        "title": "Знак 3.8",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.8"
      },
      {
        "id": "3.9",
        "title": "Знак 3.9",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.9"
      },
      {
        "id": "3.10",
        "title": "Знак 3.10",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_10.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.10"
      },
      {
        "id": "3.11",
        "title": "Знак 3.11",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.11"
      },
      {
        "id": "3.12",
        "title": "Знак 3.12",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.12"
      },
      {
        "id": "3.13",
        "title": "Знак 3.13",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.13"
      },
      {
        "id": "3.14",
        "title": "Знак 3.14",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.14"
      },
      {
        "id": "3.15",
        "title": "Знак 3.15",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.15"
      },
      {
        "id": "3.16",
        "title": "Знак 3.16",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.16"
      },
      {
        "id": "3.17",
        "title": "Знак 3.17",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_17.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.17"
      },
      {
        "id": "3.18",
        "title": "Знак 3.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.18"
      },
      {
        "id": "3.19",
        "title": "Знак 3.19",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_19.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.19"
      },
      {
        "id": "3.20",
        "title": "Знак 3.20",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_20.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.20"
      },
      {
        "id": "3.21",
        "title": "В’їзд заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_21.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.21"
      },
      {
        "id": "3.22",
        "title": "Знак 3.22",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_22.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.22"
      },
      {
        "id": "3.23",
        "title": "Знак 3.23",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_23.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.23"
      },
      {
        "id": "3.24",
        "title": "Знак 3.24",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_24.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.24"
      },
      {
        "id": "3.25",
        "title": "Знак 3.25",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_25.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.25"
      },
      {
        "id": "3.26",
        "title": "Знак 3.26",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_26.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.26"
      },
      {
        "id": "3.27",
        "title": "Знак 3.27",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_27.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.27"
      },
      {
        "id": "3.28",
        "title": "Знак 3.28",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_28.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.28"
      },
      {
        "id": "3.29",
        "title": "Обмеження максимальної швидкості",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_29.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.29"
      },
      {
        "id": "3.30",
        "title": "Знак 3.30",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_30.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.30"
      },
      {
        "id": "3.31",
        "title": "Знак 3.31",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_31.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.31"
      },
      {
        "id": "3.32",
        "title": "Знак 3.32",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_32.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.32"
      },
      {
        "id": "3.33",
        "title": "Знак 3.33",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_33.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.33"
      },
      {
        "id": "3.34",
        "title": "Зупинку заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_34.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.34"
      },
      {
        "id": "3.35",
        "title": "Стоянку заборонено",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_35.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.35"
      },
      {
        "id": "3.36",
        "title": "Знак 3.36",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_36.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.36"
      },
      {
        "id": "3.37",
        "title": "Знак 3.37",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_37.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.37"
      },
      {
        "id": "3.38",
        "title": "Знак 3.38",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_38.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.38"
      },
      {
        "id": "3.39",
        "title": "Знак 3.39",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_39.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.39"
      },
      {
        "id": "3.40",
        "title": "Знак 3.40",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_40.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.40"
      },
      {
        "id": "3.41",
        "title": "Контроль",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_41.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.41"
      },
      {
        "id": "3.42",
        "title": "Кінець усіх заборон і обмежень",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_42.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.42"
      },
      {
        "id": "3.43",
        "title": "Знак 3.43",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_43.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.43"
      },
      {
        "id": "3.44",
        "title": "Знак 3.44",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_44.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.44"
      },
      {
        "id": "3.45",
        "title": "Знак 3.45",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_3_45.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/3.45"
      }
    ]
  },
  {
    "title": "Наказові знаки",
    "signs": [
      {
        "id": "4.1",
        "title": "Рух прямо",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.1"
      },
      {
        "id": "4.2",
        "title": "Рух праворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.2"
      },
      {
        "id": "4.3",
        "title": "Рух ліворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.3"
      },
      {
        "id": "4.4",
        "title": "Рух прямо або праворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.4"
      },
      {
        "id": "4.5",
        "title": "Рух прямо або ліворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.5"
      },
      {
        "id": "4.6",
        "title": "Рух праворуч або ліворуч",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.6"
      },
      {
        "id": "4.7",
        "title": "Об’їзд перешкоди з правого боку",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.7"
      },
      {
        "id": "4.8",
        "title": "Об’їзд перешкоди з лівого боку",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.8"
      },
      {
        "id": "4.9",
        "title": "Об’їзд перешкоди з правого або лівого боку",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.9"
      },
      {
        "id": "4.10",
        "title": "Круговий рух",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_10.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.10"
      },
      {
        "id": "4.11",
        "title": "Знак 4.11",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.11"
      },
      {
        "id": "4.12",
        "title": "Знак 4.12",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.12"
      },
      {
        "id": "4.13",
        "title": "Знак 4.13",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.13"
      },
      {
        "id": "4.14",
        "title": "Доріжка для пішоходів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.14"
      },
      {
        "id": "4.15",
        "title": "Доріжка для велосипедистів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.15"
      },
      {
        "id": "4.16",
        "title": "Доріжка для пішоходів і велосипедистів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.16"
      },
      {
        "id": "4.17",
        "title": "Знак 4.17",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_17.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.17"
      },
      {
        "id": "4.18",
        "title": "Знак 4.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.18"
      },
      {
        "id": "4.19",
        "title": "Знак 4.19",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_19.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.19"
      },
      {
        "id": "4.20.1",
        "title": "Знак 4.20.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_20_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.20.1"
      },
      {
        "id": "4.20.2",
        "title": "Знак 4.20.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_20_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.20.2"
      },
      {
        "id": "4.20.3",
        "title": "Знак 4.20.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_20_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.20.3"
      },
      {
        "id": "4.21",
        "title": "Знак 4.21",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_21.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.21"
      },
      {
        "id": "4.22",
        "title": "Знак 4.22",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_22.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.22"
      },
      {
        "id": "4.23",
        "title": "Знак 4.23",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_23.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.23"
      },
      {
        "id": "4.24",
        "title": "Знак 4.24",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_4_24.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/4.24"
      }
    ]
  },
  {
    "title": "Інформаційно-вказівні знаки",
    "signs": [
      {
        "id": "5.1",
        "title": "Автомагістраль",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.1"
      },
      {
        "id": "5.2",
        "title": "Кінець автомагістралі",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.2"
      },
      {
        "id": "5.3",
        "title": "Дорога для автомобілів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.3"
      },
      {
        "id": "5.4",
        "title": "Знак 5.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.4"
      },
      {
        "id": "5.5",
        "title": "Знак 5.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.5"
      },
      {
        "id": "5.6",
        "title": "Знак 5.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.6"
      },
      {
        "id": "5.7.1",
        "title": "Знак 5.7.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_7_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.7.1"
      },
      {
        "id": "5.7.2",
        "title": "Знак 5.7.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_7_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.7.2"
      },
      {
        "id": "5.8",
        "title": "Знак 5.8",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.8"
      },
      {
        "id": "5.9",
        "title": "Знак 5.9",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.9"
      },
      {
        "id": "5.10.1",
        "title": "Знак 5.10.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_10_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.10.1"
      },
      {
        "id": "5.10.2",
        "title": "Знак 5.10.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_10_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.10.2"
      },
      {
        "id": "5.10.3",
        "title": "Знак 5.10.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_10_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.10.3"
      },
      {
        "id": "5.10.4",
        "title": "Знак 5.10.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_10_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.10.4"
      },
      {
        "id": "5.11",
        "title": "Знак 5.11",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.11"
      },
      {
        "id": "5.12",
        "title": "Знак 5.12",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.12"
      },
      {
        "id": "5.13",
        "title": "Знак 5.13",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.13"
      },
      {
        "id": "5.14",
        "title": "Знак 5.14",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.14"
      },
      {
        "id": "5.15",
        "title": "Знак 5.15",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.15"
      },
      {
        "id": "5.16",
        "title": "Знак 5.16",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.16"
      },
      {
        "id": "5.17.1",
        "title": "Знак 5.17.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_17_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.17.1"
      },
      {
        "id": "5.17.2",
        "title": "Знак 5.17.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_17_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.17.2"
      },
      {
        "id": "5.18",
        "title": "Знак 5.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.18"
      },
      {
        "id": "5.19.1",
        "title": "Знак 5.19.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_19_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.19.1"
      },
      {
        "id": "5.19.2",
        "title": "Знак 5.19.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_19_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.19.2"
      },
      {
        "id": "5.19.3",
        "title": "Знак 5.19.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_19_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.19.3"
      },
      {
        "id": "5.20.1",
        "title": "Знак 5.20.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_20_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.20.1"
      },
      {
        "id": "5.20.2",
        "title": "Знак 5.20.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_20_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.20.2"
      },
      {
        "id": "5.21.1",
        "title": "Знак 5.21.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_21_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.21.1"
      },
      {
        "id": "5.21.2",
        "title": "Знак 5.21.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_21_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.21.2"
      },
      {
        "id": "5.22",
        "title": "Знак 5.22",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_22.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.22"
      },
      {
        "id": "5.23",
        "title": "Знак 5.23",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_23.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.23"
      },
      {
        "id": "5.24",
        "title": "Знак 5.24",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_24.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.24"
      },
      {
        "id": "5.25",
        "title": "Знак 5.25",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_25.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.25"
      },
      {
        "id": "5.26",
        "title": "Знак 5.26",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_26.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.26"
      },
      {
        "id": "5.27.1",
        "title": "Знак 5.27.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_27_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.27.1"
      },
      {
        "id": "5.27.2",
        "title": "Знак 5.27.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_27_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.27.2"
      },
      {
        "id": "5.28",
        "title": "Знак 5.28",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_28.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.28"
      },
      {
        "id": "5.29",
        "title": "Знак 5.29",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_29.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.29"
      },
      {
        "id": "5.30",
        "title": "Знак 5.30",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_30.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.30"
      },
      {
        "id": "5.31.1",
        "title": "Знак 5.31.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_31_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.31.1"
      },
      {
        "id": "5.31.2",
        "title": "Знак 5.31.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_31_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.31.2"
      },
      {
        "id": "5.31.3",
        "title": "Знак 5.31.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_31_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.31.3"
      },
      {
        "id": "5.32.1",
        "title": "Знак 5.32.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_32_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.32.1"
      },
      {
        "id": "5.32.2",
        "title": "Знак 5.32.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_32_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.32.2"
      },
      {
        "id": "5.32.3",
        "title": "Знак 5.32.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_32_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.32.3"
      },
      {
        "id": "5.33",
        "title": "Знак 5.33",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_33.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.33"
      },
      {
        "id": "5.34",
        "title": "Знак 5.34",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_34.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.34"
      },
      {
        "id": "5.35",
        "title": "Пішохідний перехід",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_35.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.35"
      },
      {
        "id": "5.36",
        "title": "Знак 5.36",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_36.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.36"
      },
      {
        "id": "5.37",
        "title": "Знак 5.37",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_37.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.37"
      },
      {
        "id": "5.38.1",
        "title": "Місце для стоянки",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_38_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.38.1"
      },
      {
        "id": "5.38.2",
        "title": "Знак 5.38.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_38_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.38.2"
      },
      {
        "id": "5.39",
        "title": "Знак 5.39",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_39.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.39"
      },
      {
        "id": "5.40.1",
        "title": "Знак 5.40.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_40_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.40.1"
      },
      {
        "id": "5.40.2",
        "title": "Знак 5.40.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_40_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.40.2"
      },
      {
        "id": "5.41.1",
        "title": "Пункт зупинки автобуса",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_41_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.41.1"
      },
      {
        "id": "5.41.2",
        "title": "Знак 5.41.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_41_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.41.2"
      },
      {
        "id": "5.42.1",
        "title": "Пункт зупинки трамвая",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_42_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.42.1"
      },
      {
        "id": "5.42.2",
        "title": "Знак 5.42.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_42_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.42.2"
      },
      {
        "id": "5.42.3",
        "title": "Знак 5.42.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_42_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.42.3"
      },
      {
        "id": "5.43",
        "title": "Пункт зупинки тролейбуса",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_43.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.43"
      },
      {
        "id": "5.44",
        "title": "Знак 5.44",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_44.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.44"
      },
      {
        "id": "5.45.1",
        "title": "Знак 5.45.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_45_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.45.1"
      },
      {
        "id": "5.45.2",
        "title": "Знак 5.45.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_45_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.45.2"
      },
      {
        "id": "5.46.1",
        "title": "Знак 5.46.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_46_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.46.1"
      },
      {
        "id": "5.46.2",
        "title": "Знак 5.46.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_46_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.46.2"
      },
      {
        "id": "5.47.1",
        "title": "Початок населеного пункту",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_47_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.47.1"
      },
      {
        "id": "5.47.2",
        "title": "Знак 5.47.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_47_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.47.2"
      },
      {
        "id": "5.48",
        "title": "Кінець населеного пункту",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_48.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.48"
      },
      {
        "id": "5.49",
        "title": "Покажчик загальних обмежень швидкості",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_49.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.49"
      },
      {
        "id": "5.50",
        "title": "Знак 5.50",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_50.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.50"
      },
      {
        "id": "5.51",
        "title": "Знак 5.51",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_51.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.51"
      },
      {
        "id": "5.52",
        "title": "Знак 5.52",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_52.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.52"
      },
      {
        "id": "5.53",
        "title": "Знак 5.53",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_53.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.53"
      },
      {
        "id": "5.54",
        "title": "Знак 5.54",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_54.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.54"
      },
      {
        "id": "5.55",
        "title": "Схема руху",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_55.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.55"
      },
      {
        "id": "5.56",
        "title": "Знак 5.56",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_56.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.56"
      },
      {
        "id": "5.57",
        "title": "Знак 5.57",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_57.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.57"
      },
      {
        "id": "5.58",
        "title": "Знак 5.58",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_58.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.58"
      },
      {
        "id": "5.59",
        "title": "Знак 5.59",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_59.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.59"
      },
      {
        "id": "5.60",
        "title": "Знак 5.60",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_60.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.60"
      },
      {
        "id": "5.61",
        "title": "Знак 5.61",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_61.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.61"
      },
      {
        "id": "5.62",
        "title": "Місце зупинки",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_62.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.62"
      },
      {
        "id": "5.63",
        "title": "Місце для розвороту",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_63.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.63"
      },
      {
        "id": "5.64.1",
        "title": "Знак 5.64.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_64_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.64.1"
      },
      {
        "id": "5.64.2",
        "title": "Знак 5.64.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_64_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.64.2"
      },
      {
        "id": "5.64.3",
        "title": "Знак 5.64.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_64_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.64.3"
      },
      {
        "id": "5.65.1",
        "title": "Знак 5.65.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_65_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.65.1"
      },
      {
        "id": "5.65.2",
        "title": "Знак 5.65.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_65_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.65.2"
      },
      {
        "id": "5.66",
        "title": "Знак 5.66",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_66.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.66"
      },
      {
        "id": "5.67.1",
        "title": "Знак 5.67.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_67_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.67.1"
      },
      {
        "id": "5.67.2",
        "title": "Знак 5.67.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_67_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.67.2"
      },
      {
        "id": "5.67.3",
        "title": "Знак 5.67.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_67_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.67.3"
      },
      {
        "id": "5.68",
        "title": "Знак 5.68",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_68.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.68"
      },
      {
        "id": "5.69",
        "title": "Знак 5.69",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_69.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.69"
      },
      {
        "id": "5.70",
        "title": "Знак 5.70",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_70.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.70"
      },
      {
        "id": "5.71",
        "title": "Знак 5.71",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_71.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.71"
      },
      {
        "id": "5.72",
        "title": "Знак 5.72",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_72.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.72"
      },
      {
        "id": "5.73",
        "title": "Знак 5.73",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_73.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.73"
      },
      {
        "id": "5.74",
        "title": "Знак 5.74",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_74.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.74"
      },
      {
        "id": "5.75",
        "title": "Знак 5.75",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_75.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.75"
      },
      {
        "id": "5.76",
        "title": "Знак 5.76",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_76.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.76"
      },
      {
        "id": "5.77",
        "title": "Знак 5.77",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_77.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.77"
      },
      {
        "id": "5.78",
        "title": "Знак 5.78",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_78.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.78"
      },
      {
        "id": "5.79.1",
        "title": "Знак 5.79.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_79_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.79.1"
      },
      {
        "id": "5.79.2",
        "title": "Знак 5.79.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_79_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.79.2"
      },
      {
        "id": "5.80.1",
        "title": "Знак 5.80.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_80_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.80.1"
      },
      {
        "id": "5.80.2",
        "title": "Знак 5.80.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_80_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.80.2"
      },
      {
        "id": "5.81",
        "title": "Знак 5.81",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_81.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.81"
      },
      {
        "id": "5.82.1",
        "title": "Знак 5.82.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_82_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.82.1"
      },
      {
        "id": "5.82.2",
        "title": "Знак 5.82.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_82_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.82.2"
      },
      {
        "id": "5.83.1",
        "title": "Знак 5.83.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_83_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.83.1"
      },
      {
        "id": "5.83.2",
        "title": "Знак 5.83.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_83_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.83.2"
      },
      {
        "id": "5.84",
        "title": "Знак 5.84",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_84.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.84"
      },
      {
        "id": "5.85",
        "title": "Знак 5.85",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_85.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.85"
      },
      {
        "id": "5.86",
        "title": "Знак 5.86",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_86.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.86"
      },
      {
        "id": "5.87",
        "title": "Знак 5.87",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_87.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.87"
      },
      {
        "id": "5.88",
        "title": "Знак 5.88",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_88.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.88"
      },
      {
        "id": "5.89",
        "title": "Знак 5.89",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_89.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.89"
      },
      {
        "id": "5.90",
        "title": "Знак 5.90",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_90.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.90"
      },
      {
        "id": "5.91",
        "title": "Знак 5.91",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_91.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.91"
      },
      {
        "id": "5.92.1",
        "title": "Знак 5.92.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_92_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.92.1"
      },
      {
        "id": "5.92.2",
        "title": "Знак 5.92.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_92_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.92.2"
      },
      {
        "id": "5.93.1",
        "title": "Знак 5.93.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_93_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.93.1"
      },
      {
        "id": "5.93.2",
        "title": "Знак 5.93.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_93_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.93.2"
      },
      {
        "id": "5.94.1",
        "title": "Знак 5.94.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_94_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.94.1"
      },
      {
        "id": "5.94.2",
        "title": "Знак 5.94.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_94_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.94.2"
      },
      {
        "id": "5.95.1",
        "title": "Знак 5.95.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_95_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.95.1"
      },
      {
        "id": "5.95.2",
        "title": "Знак 5.95.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_95_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.95.2"
      },
      {
        "id": "5.96.1",
        "title": "Знак 5.96.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_96_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.96.1"
      },
      {
        "id": "5.96.2",
        "title": "Знак 5.96.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_5_96_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/5.96.2"
      }
    ]
  },
  {
    "title": "Знаки сервісу",
    "signs": [
      {
        "id": "6.1",
        "title": "Пункт першої медичної допомоги",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.1"
      },
      {
        "id": "6.2",
        "title": "Лікарня",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.2"
      },
      {
        "id": "6.3",
        "title": "Телефон для виклику аварійної служби",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.3"
      },
      {
        "id": "6.4",
        "title": "Вогнегасник",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.4"
      },
      {
        "id": "6.5",
        "title": "Пункт технічного обслуговування",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.5"
      },
      {
        "id": "6.6",
        "title": "Пункт миття автомобілів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.6"
      },
      {
        "id": "6.7.1",
        "title": "Знак 6.7.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.1"
      },
      {
        "id": "6.7.2",
        "title": "Знак 6.7.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.2"
      },
      {
        "id": "6.7.3",
        "title": "Знак 6.7.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.3"
      },
      {
        "id": "6.7.4",
        "title": "Знак 6.7.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.4"
      },
      {
        "id": "6.7.5",
        "title": "Знак 6.7.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.5"
      },
      {
        "id": "6.7.6",
        "title": "Знак 6.7.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.6"
      },
      {
        "id": "6.7.7",
        "title": "Знак 6.7.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_7_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.7.7"
      },
      {
        "id": "6.8",
        "title": "Автозаправна станція",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.8"
      },
      {
        "id": "6.9",
        "title": "Готель або мотель",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.9"
      },
      {
        "id": "6.10",
        "title": "Кемпінг",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_10.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.10"
      },
      {
        "id": "6.11",
        "title": "Місце відпочинку",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.11"
      },
      {
        "id": "6.12",
        "title": "Пункт харчування",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.12"
      },
      {
        "id": "6.13",
        "title": "Питна вода",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.13"
      },
      {
        "id": "6.14",
        "title": "Туалет",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.14"
      },
      {
        "id": "6.15",
        "title": "Пляж або басейн",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.15"
      },
      {
        "id": "6.16",
        "title": "Визначні місця",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.16"
      },
      {
        "id": "6.17",
        "title": "Туристична інформація",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_17.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.17"
      },
      {
        "id": "6.18",
        "title": "Знак 6.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.18"
      },
      {
        "id": "6.19",
        "title": "Знак 6.19",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_19.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.19"
      },
      {
        "id": "6.20",
        "title": "Знак 6.20",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_20.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.20"
      },
      {
        "id": "6.21",
        "title": "Знак 6.21",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_21.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.21"
      },
      {
        "id": "6.22",
        "title": "Знак 6.22",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_22.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.22"
      },
      {
        "id": "6.23",
        "title": "Зарядна станція електромобілів",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_6_23.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/6.23"
      }
    ]
  },
  {
    "title": "Таблички до дорожніх знаків",
    "signs": [
      {
        "id": "7.1.1",
        "title": "Відстань до об’єкта",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_1_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.1.1"
      },
      {
        "id": "7.1.2",
        "title": "Знак 7.1.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_1_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.1.2"
      },
      {
        "id": "7.1.3",
        "title": "Знак 7.1.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_1_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.1.3"
      },
      {
        "id": "7.1.4",
        "title": "Знак 7.1.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_1_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.1.4"
      },
      {
        "id": "7.2.1",
        "title": "Знак 7.2.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.1"
      },
      {
        "id": "7.2.2",
        "title": "Знак 7.2.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.2"
      },
      {
        "id": "7.2.3",
        "title": "Знак 7.2.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.3"
      },
      {
        "id": "7.2.4",
        "title": "Знак 7.2.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.4"
      },
      {
        "id": "7.2.5",
        "title": "Знак 7.2.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.5"
      },
      {
        "id": "7.2.6",
        "title": "Знак 7.2.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.6"
      },
      {
        "id": "7.2.7",
        "title": "Знак 7.2.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_2_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.2.7"
      },
      {
        "id": "7.3.1",
        "title": "Знак 7.3.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_3_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.3.1"
      },
      {
        "id": "7.3.2",
        "title": "Знак 7.3.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_3_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.3.2"
      },
      {
        "id": "7.3.3",
        "title": "Знак 7.3.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_3_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.3.3"
      },
      {
        "id": "7.4.1",
        "title": "Знак 7.4.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.1"
      },
      {
        "id": "7.4.2",
        "title": "Знак 7.4.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.2"
      },
      {
        "id": "7.4.3",
        "title": "Знак 7.4.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.3"
      },
      {
        "id": "7.4.4",
        "title": "Знак 7.4.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.4"
      },
      {
        "id": "7.4.5",
        "title": "Знак 7.4.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.5"
      },
      {
        "id": "7.4.6",
        "title": "Знак 7.4.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.6"
      },
      {
        "id": "7.4.7",
        "title": "Знак 7.4.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_4_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.4.7"
      },
      {
        "id": "7.5.1",
        "title": "Знак 7.5.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.1"
      },
      {
        "id": "7.5.2",
        "title": "Знак 7.5.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.2"
      },
      {
        "id": "7.5.3",
        "title": "Знак 7.5.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.3"
      },
      {
        "id": "7.5.4",
        "title": "Знак 7.5.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.4"
      },
      {
        "id": "7.5.5",
        "title": "Знак 7.5.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.5"
      },
      {
        "id": "7.5.6",
        "title": "Знак 7.5.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.6"
      },
      {
        "id": "7.5.7",
        "title": "Знак 7.5.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.7"
      },
      {
        "id": "7.5.8",
        "title": "Знак 7.5.8",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.8"
      },
      {
        "id": "7.5.9",
        "title": "Знак 7.5.9",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_5_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.5.9"
      },
      {
        "id": "7.6.1",
        "title": "Знак 7.6.1",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_1.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.1"
      },
      {
        "id": "7.6.2",
        "title": "Знак 7.6.2",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_2.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.2"
      },
      {
        "id": "7.6.3",
        "title": "Знак 7.6.3",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_3.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.3"
      },
      {
        "id": "7.6.4",
        "title": "Знак 7.6.4",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_4.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.4"
      },
      {
        "id": "7.6.5",
        "title": "Знак 7.6.5",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_5.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.5"
      },
      {
        "id": "7.6.6",
        "title": "Знак 7.6.6",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_6.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.6"
      },
      {
        "id": "7.6.7",
        "title": "Знак 7.6.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_6_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.6.7"
      },
      {
        "id": "7.7",
        "title": "Знак 7.7",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_7.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.7"
      },
      {
        "id": "7.8",
        "title": "Напрямок головної дороги",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_8.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.8"
      },
      {
        "id": "7.9",
        "title": "Знак 7.9",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_9.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.9"
      },
      {
        "id": "7.10",
        "title": "Знак 7.10",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_10.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.10"
      },
      {
        "id": "7.11",
        "title": "Знак 7.11",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_11.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.11"
      },
      {
        "id": "7.12",
        "title": "Знак 7.12",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_12.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.12"
      },
      {
        "id": "7.13",
        "title": "Знак 7.13",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_13.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.13"
      },
      {
        "id": "7.14",
        "title": "Знак 7.14",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_14.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.14"
      },
      {
        "id": "7.15",
        "title": "Знак 7.15",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_15.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.15"
      },
      {
        "id": "7.16",
        "title": "Знак 7.16",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_16.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.16"
      },
      {
        "id": "7.17",
        "title": "Особи з інвалідністю",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_17.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.17"
      },
      {
        "id": "7.18",
        "title": "Знак 7.18",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_18.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.18"
      },
      {
        "id": "7.19",
        "title": "Знак 7.19",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_19.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.19"
      },
      {
        "id": "7.20",
        "title": "Діє від дати",
        "image": "https://web.testpdr.com/storage/road-signs/original/RSS_7_20.png",
        "source": "https://pdr.infotech.gov.ua/theory/road-signs/7.20"
      }
    ]
  }
];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const state = loadState();
  const layers = new Map();
  let activeTool = 'select';
  let selected = null;
  let lastRoadNodeId = null;
  let calloutDraft = null;
  let selectedSignId = null;
  let manualDrag = null;
  let suppressMapClickUntil = 0;
  let tileErrorCount = 0;
  let tileLayer = null;
  let tileIndex = 0;

  const els = {
    map: $('#map'),
    sidebar: $('#sidebar'),
    openPanelBtn: $('#openPanelBtn'),
    closePanelBtn: $('#closePanelBtn'),
    statusText: $('#statusText'),
    toolGrid: $('#toolGrid'),
    selectionText: $('#selectionText'),
    elementControls: $('#elementControls'),
    scaleInput: $('#scaleInput'),
    rotationInput: $('#rotationInput'),
    deleteSelectedBtn: $('#deleteSelectedBtn'),
    clearSelectionBtn: $('#clearSelectionBtn'),
    signCatalog: $('#signCatalog'),
    signSearch: $('#signSearch'),
    createRouteBtn: $('#createRouteBtn'),
    routeList: $('#routeList'),
    activeRouteName: $('#activeRouteName'),
    exportBtn: $('#exportBtn'),
    importInput: $('#importInput'),
    clearAllBtn: $('#clearAllBtn'),
    statsBox: $('#statsBox'),
    fitBtn: $('#fitBtn'),
    toast: $('#toast')
  };

  const map = L.map('map', {
    zoomControl: false,
    preferCanvas: false,
    closePopupOnClick: false
  }).setView(state.mapView?.center || DEFAULT_CENTER, state.mapView?.zoom || 14);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  map.createPane('roadsPane');
  map.getPane('roadsPane').style.zIndex = 450;
  map.getPane('roadsPane').style.pointerEvents = 'auto';

  map.createPane('calloutsPane');
  map.getPane('calloutsPane').style.zIndex = 470;
  map.getPane('calloutsPane').style.pointerEvents = 'auto';

  const tileProviders = [
    {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20
    },
    {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20
    },
    {
      url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }
  ];

  function addTileLayer(index = 0) {
    if (tileLayer) map.removeLayer(tileLayer);
    tileErrorCount = 0;
    tileIndex = index % tileProviders.length;
    const provider = tileProviders[tileIndex];
    tileLayer = L.tileLayer(provider.url, {
      maxZoom: provider.maxZoom,
      attribution: provider.attribution,
      crossOrigin: true,
      referrerPolicy: 'origin-when-cross-origin'
    });
    tileLayer.on('tileerror', () => {
      tileErrorCount += 1;
      if (tileErrorCount >= 12 && tileProviders.length > 1) {
        toast('Провайдер карти не віддав тайли. Перемикаю шар карти...');
        addTileLayer(tileIndex + 1);
      }
    });
    tileLayer.addTo(map);
  }
  addTileLayer(0);

  map.on('moveend', () => {
    state.mapView = { center: [map.getCenter().lat, map.getCenter().lng], zoom: map.getZoom() };
    saveState();
  });

  map.on('zoomend', () => {
    state.mapView = { center: [map.getCenter().lat, map.getCenter().lng], zoom: map.getZoom() };
    saveState();
    renderAll();
  });

  map.on('click', (event) => handleMapClick(event));

  window.addEventListener('resize', () => setTimeout(() => map.invalidateSize(true), 80));
  setTimeout(() => map.invalidateSize(true), 250);
  setTimeout(() => map.invalidateSize(true), 900);

  function defaultRoute(name = 'Маршрут 1') {
    return {
      id: uid('route'),
      name,
      createdAt: Date.now(),
      nodes: [],
      roadSegments: [],
      callouts: [],
      notes: [],
      elements: []
    };
  }

  function loadState() {
    const empty = {
      version: 8,
      activeRouteId: null,
      routes: [],
      mapView: { center: DEFAULT_CENTER, zoom: 14 }
    };

    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      for (const key of LEGACY_KEYS) {
        raw = localStorage.getItem(key);
        if (raw) break;
      }
    }

    if (!raw) {
      const route = defaultRoute();
      empty.routes = [route];
      empty.activeRouteId = route.id;
      return empty;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.routes)) {
        const routes = parsed.routes.map((route, index) => normalizeRoute(route, index));
        if (!routes.length) routes.push(defaultRoute());
        return {
          ...empty,
          ...parsed,
          version: 8,
          routes,
          activeRouteId: routes.some((r) => r.id === parsed.activeRouteId) ? parsed.activeRouteId : routes[0].id,
          mapView: parsed.mapView || empty.mapView
        };
      }

      const migrated = defaultRoute('Маршрут 1');
      migrated.nodes = Array.isArray(parsed.nodes) ? parsed.nodes : [];
      migrated.roadSegments = Array.isArray(parsed.roadSegments) ? parsed.roadSegments : [];
      migrated.callouts = Array.isArray(parsed.callouts) ? parsed.callouts : [];
      migrated.notes = Array.isArray(parsed.notes) ? parsed.notes : [];
      migrated.elements = Array.isArray(parsed.elements) ? parsed.elements.map(normalizeElement) : [];
      return {
        ...empty,
        activeRouteId: migrated.id,
        routes: [migrated],
        mapView: parsed.mapView || empty.mapView
      };
    } catch (error) {
      console.warn('Не вдалося прочитати localStorage', error);
      const route = defaultRoute();
      empty.routes = [route];
      empty.activeRouteId = route.id;
      return empty;
    }
  }

  function normalizeRoute(route, index = 0) {
    const normalized = {
      id: route.id || uid('route'),
      name: route.name || `Маршрут ${index + 1}`,
      createdAt: route.createdAt || Date.now() + index,
      nodes: Array.isArray(route.nodes) ? route.nodes : [],
      roadSegments: Array.isArray(route.roadSegments) ? route.roadSegments : [],
      callouts: Array.isArray(route.callouts) ? route.callouts : [],
      notes: Array.isArray(route.notes) ? route.notes : [],
      elements: Array.isArray(route.elements) ? route.elements.map(normalizeElement) : []
    };
    return normalized;
  }

  function normalizeElement(element) {
    return {
      ...element,
      scale: Number(element.scale || 1),
      rotation: Number(element.rotation || 0),
      sizeMeters: Number(element.sizeMeters || 0) || null
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateStats();
    updateActiveRouteLabel();
  }

  function currentRoute() {
    let route = state.routes.find((item) => item.id === state.activeRouteId);
    if (!route) {
      if (!state.routes.length) state.routes.push(defaultRoute());
      route = state.routes[0];
      state.activeRouteId = route.id;
    }
    return route;
  }

  function initUI() {
    $$('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        $$('.tab-panel').forEach((panel) => panel.classList.remove('active'));
        $(`#${tab}Panel`).classList.add('active');
        setTimeout(() => map.invalidateSize(true), 80);
      });
    });

    els.toolGrid.addEventListener('click', (event) => {
      const btn = event.target.closest('.tool-btn');
      if (!btn) return;
      const tool = btn.dataset.tool;
      if (tool === 'drawRoad' && activeTool === 'drawRoad') {
        setTool('select');
        toast('Малювання дороги вимкнено');
        return;
      }
      setTool(tool);
    });

    els.openPanelBtn.addEventListener('click', () => {
      els.sidebar.classList.add('open');
      setTimeout(() => map.invalidateSize(true), 150);
    });
    els.closePanelBtn.addEventListener('click', () => {
      els.sidebar.classList.remove('open');
      setTimeout(() => map.invalidateSize(true), 150);
    });

    els.deleteSelectedBtn.addEventListener('click', deleteSelected);
    els.clearSelectionBtn.addEventListener('click', () => selectNone());

    els.scaleInput.addEventListener('input', () => updateSelectedElementControls());
    els.rotationInput.addEventListener('input', () => updateSelectedElementControls());

    els.signSearch.addEventListener('input', renderSignCatalog);
    els.createRouteBtn.addEventListener('click', createRoute);

    els.exportBtn.addEventListener('click', exportJson);
    els.importInput.addEventListener('change', importJson);
    els.clearAllBtn.addEventListener('click', clearActiveRoute);
    els.fitBtn.addEventListener('click', fitAll);

    document.addEventListener('keydown', (event) => {
      if (event.target.matches('input, textarea')) return;
      if (event.key === 'Delete' || event.key === 'Backspace') deleteSelected();
      if (event.key === 'Escape') {
        if (activeTool === 'drawRoad') setTool('select');
        calloutDraft = null;
        selectedSignId = null;
        selectNone();
      }
    });

    renderSignCatalog();
    renderRoutesPanel();
    updateActiveRouteLabel();
  }

  function setTool(tool) {
    activeTool = tool;
    lastRoadNodeId = null;
    calloutDraft = null;
    if (tool !== 'placeSign') selectedSignId = null;

    $$('.tool-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.tool === tool));
    if (tool !== 'select') selectNone(false);
    renderAll();
    updateStatus();
  }

  function updateStatus(extra = '') {
    const names = {
      select: 'Обрати / перемістити',
      drawRoad: 'Малювання доріг',
      delete: 'Видалення елементів',
      callout: 'Стрілка-виноска',
      note: 'Примітка',
      zebra: 'Пішохід / зебра',
      bump: 'Лежачий поліцейський',
      trafficLight: 'Світлофор',
      placeSign: 'Встановлення знака ПДР'
    };

    let text = `Маршрут: ${currentRoute().name}. Інструмент: ${names[activeTool] || activeTool}`;
    if (activeTool === 'drawRoad') text += '. Клікай точки маршруту. Повторний клік по інструменту завершує введення.';
    if (activeTool === 'delete') text += '. Клікни будь-який вузлик, лінію, знак, зебру, світлофор або примітку, щоб видалити.';
    if (activeTool === 'callout') text += '. Перший клік — початок, другий — кінець стрілки.';
    if (activeTool === 'note') text += '. Клікни місце примітки.';
    if (['zebra', 'bump', 'trafficLight'].includes(activeTool)) text += '. Клікни місце вставки.';
    if (activeTool === 'placeSign') text += '. Клікни місце на карті для вибраного знака.';
    if (extra) text += ` ${extra}`;
    els.statusText.textContent = text;
  }

  function handleMapClick(event) {
    if (Date.now() < suppressMapClickUntil) return;
    if (manualDrag) return;
    if (event.originalEvent?.target?.closest('.leaflet-marker-icon')) return;

    if (activeTool === 'drawRoad') {
      addRoadNode(event.latlng);
      return;
    }

    if (activeTool === 'callout') {
      handleCalloutClick(event.latlng);
      return;
    }

    if (activeTool === 'note') {
      const text = prompt('Текст примітки:');
      if (text && text.trim()) {
        const route = currentRoute();
        route.notes.push({
          id: uid('note'),
          lat: event.latlng.lat,
          lng: event.latlng.lng,
          text: text.trim(),
          scale: 1,
          rotation: 0,
          sizeMeters: DEFAULT_ELEMENT_PX.note * metersPerPixel(event.latlng.lat, map.getZoom())
        });
        saveState();
        renderAll();
        toast('Примітку додано');
      }
      return;
    }

    if (activeTool === 'zebra' || activeTool === 'bump' || activeTool === 'trafficLight') {
      addElement(activeTool, event.latlng);
      return;
    }

    if (activeTool === 'placeSign' && selectedSignId) {
      addElement('sign', event.latlng, { signId: selectedSignId });
      return;
    }

    if (activeTool === 'delete') {
      toast('Клікни саме по елементу, який потрібно видалити');
      return;
    }

    selectNone();
  }

  function addRoadNode(latlng, existingId = null) {
    const route = currentRoute();
    let nodeId = existingId;
    if (!nodeId) {
      const node = { id: uid('node'), lat: latlng.lat, lng: latlng.lng };
      route.nodes.push(node);
      nodeId = node.id;
    }

    if (lastRoadNodeId && lastRoadNodeId !== nodeId) {
      const exists = route.roadSegments.some((seg) =>
        (seg.from === lastRoadNodeId && seg.to === nodeId) || (seg.from === nodeId && seg.to === lastRoadNodeId)
      );
      if (!exists) route.roadSegments.push({ id: uid('road'), from: lastRoadNodeId, to: nodeId, createdAt: Date.now() });
    }
    lastRoadNodeId = nodeId;
    saveState();
    renderAll();
    highlightNode(nodeId);
  }

  function handleRoadNodeClick(nodeId, event) {
    L.DomEvent.stop(event);
    const node = getNode(nodeId);
    if (!node) return;
    if (activeTool === 'drawRoad') {
      addRoadNode(L.latLng(node.lat, node.lng), nodeId);
      return;
    }
    if (activeTool === 'delete') {
      deleteItem('node', nodeId);
      return;
    }
    selectItem('node', nodeId);
  }

  function handleCalloutClick(latlng) {
    if (!calloutDraft) {
      calloutDraft = [latlng.lat, latlng.lng];
      updateStatus('Початок стрілки задано. Клікни кінець стрілки.');
      toast('Початок стрілки задано');
      return;
    }
    currentRoute().callouts.push({
      id: uid('callout'),
      latlngs: [calloutDraft, [latlng.lat, latlng.lng]],
      scale: 1,
      sizeMeters: DEFAULT_ELEMENT_PX.callout * metersPerPixel(latlng.lat, map.getZoom())
    });
    calloutDraft = null;
    saveState();
    renderAll();
    toast('Стрілку-виноску додано');
  }

  function addElement(type, latlng, extra = {}) {
    const scale = type === 'sign' ? 0.95 : 1;
    const wantedPx = DEFAULT_ELEMENT_PX[type] || 58;
    const sizeMeters = wantedPx * metersPerPixel(latlng.lat, map.getZoom()) / scale;
    const element = {
      id: uid('el'),
      type,
      lat: latlng.lat,
      lng: latlng.lng,
      scale,
      rotation: 0,
      sizeMeters,
      ...extra
    };
    currentRoute().elements.push(element);
    saveState();
    renderAll();
    selectItem('element', element.id);
    if (activeTool === 'placeSign') toast('Знак встановлено. Його можна переміщувати, масштабувати та крутити.');
    else toast('Елемент додано');
  }

  function renderAll() {
    clearLayers();
    renderRoadSegments();
    renderNodes();
    renderCallouts();
    renderNotes();
    renderElements();
    applySelectedStyles();
    updateSelectionPanel();
    updateStats();
    updateDragModes();
    updateActiveRouteLabel();
  }

  function clearLayers() {
    for (const layer of layers.values()) {
      if (Array.isArray(layer)) layer.forEach((l) => map.removeLayer(l));
      else map.removeLayer(layer);
    }
    layers.clear();
  }

  function renderRoadSegments() {
    const route = currentRoute();
    const sorted = [...route.roadSegments].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    const prepared = [];
    let totalLength = 0;

    sorted.forEach((seg) => {
      const from = getNode(seg.from);
      const to = getNode(seg.to);
      if (!from || !to) return;
      const a = L.latLng(from.lat, from.lng);
      const b = L.latLng(to.lat, to.lng);
      const length = Math.max(0.01, map.distance(a, b));
      prepared.push({ seg, from, to, length });
      totalLength += length;
    });

    totalLength = Math.max(totalLength, 0.01);
    let cumulative = 0;

    prepared.forEach((item) => {
      const { seg, from, to, length } = item;
      const baseLatLngs = [[from.lat, from.lng], [to.lat, to.lng]];
      const roadLayers = [];

      const shadow = L.polyline(baseLatLngs, {
        pane: 'roadsPane', color: '#252933', weight: 12, opacity: 0.18, lineCap: 'round', lineJoin: 'round'
      }).addTo(map);
      roadLayers.push(shadow);

      const pixelDistance = map.latLngToLayerPoint([from.lat, from.lng]).distanceTo(map.latLngToLayerPoint([to.lat, to.lng]));
      const chunkCount = Math.max(1, Math.min(80, Math.ceil(pixelDistance / 28), Math.ceil((length / totalLength) * 120)));

      for (let i = 0; i < chunkCount; i += 1) {
        const t1 = i / chunkCount;
        const t2 = (i + 1) / chunkCount;
        const midDistance = cumulative + length * ((t1 + t2) / 2);
        const color = gradientColor(midDistance / totalLength);
        const chunkLatLngs = [
          interpolateLatLng(from, to, t1),
          interpolateLatLng(from, to, t2)
        ];
        const main = L.polyline(chunkLatLngs, {
          pane: 'roadsPane', color, weight: 7, opacity: 0.95, lineCap: 'round', lineJoin: 'round'
        }).addTo(map);
        main._roadMain = true;
        roadLayers.push(main);
      }

      roadLayers.forEach((layer) => {
        layer.bringToFront();
        layer.on('click', (event) => {
          L.DomEvent.stop(event);
          if (activeTool === 'delete') {
            deleteItem('road', seg.id);
            return;
          }
          selectItem('road', seg.id);
        });
        layer.on('contextmenu', (event) => {
          L.DomEvent.stop(event);
          selectItem('road', seg.id);
          deleteSelected();
        });
      });

      layers.set(layerKey('road', seg.id), roadLayers);
      cumulative += length;
    });
  }

  function renderNodes() {
    if (activeTool !== 'select' && activeTool !== 'drawRoad') return;
    currentRoute().nodes.forEach((node) => {
      const marker = L.marker([node.lat, node.lng], {
        icon: L.divIcon({ className: '', html: `<div class="node-icon" data-id="${node.id}"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] }),
        draggable: false, autoPan: true, zIndexOffset: 800
      }).addTo(map);

      marker.on('click', (event) => handleRoadNodeClick(node.id, event));
      marker.on('contextmenu', (event) => { L.DomEvent.stop(event); selectItem('node', node.id); deleteSelected(); });
      marker.on('dragstart', () => selectItem('node', node.id));
      marker.on('drag', (event) => {
        const p = event.target.getLatLng();
        node.lat = p.lat;
        node.lng = p.lng;
        refreshConnectedRoads(node.id);
      });
      marker.on('dragend', () => { saveState(); renderAll(); });
      attachManualDrag(marker, 'node', node);
      layers.set(layerKey('node', node.id), marker);
    });
  }

  function renderCallouts() {
    currentRoute().callouts.forEach((callout) => {
      const latlngs = callout.latlngs;
      if (!Array.isArray(latlngs) || latlngs.length !== 2) return;
      const visualSize = mapScaledPixelSize(callout, 'callout', latlngs[1][0]);
      const weight = Math.max(1, Math.min(16, visualSize * 0.14));
      const line = L.polyline(latlngs, { pane: 'calloutsPane', color: '#252933', weight, opacity: 0.95, lineCap: 'round' }).addTo(map);
      const angle = angleBetween(latlngs[0], latlngs[1]);
      const arrow = L.marker(latlngs[1], {
        icon: L.divIcon({
          className: '',
          html: arrowHeadHtml(visualSize, angle),
          iconSize: [visualSize, visualSize],
          iconAnchor: [visualSize / 2, visualSize / 2]
        }),
        draggable: false, zIndexOffset: 700
      }).addTo(map);

      [line, arrow].forEach((layer) => {
        layer.on('click', (event) => {
          L.DomEvent.stop(event);
          if (activeTool === 'delete') { deleteItem('callout', callout.id); return; }
          selectItem('callout', callout.id);
        });
        layer.on('contextmenu', (event) => { L.DomEvent.stop(event); selectItem('callout', callout.id); deleteSelected(); });
        attachManualCalloutDrag(layer, callout, line, arrow);
      });
      layers.set(layerKey('callout', callout.id), [line, arrow]);
    });
  }

  function renderNotes() {
    currentRoute().notes.forEach((note) => {
      const rawSize = mapScaledPixelSize(note, 'note', note.lat);
      const view = noteViewModel(note.text, rawSize);
      const rotation = Number(note.rotation || 0);
      const html = `<div class="note-icon ${view.className}" title="${escapeHtml(note.text)}" style="width:${view.width}px;height:${view.height}px;min-width:${view.width}px;max-width:${view.width}px;font-size:${view.fontSize}px;padding:${view.padY}px ${view.padX}px;border-radius:${view.radius}px;transform:rotate(${rotation}deg);">${escapeHtml(view.text)}</div>`;
      const marker = L.marker([note.lat, note.lng], {
        icon: L.divIcon({ className: '', html, iconSize: [view.width, view.height], iconAnchor: [view.width / 2, view.height / 2] }),
        draggable: false, autoPan: true, zIndexOffset: 850
      }).addTo(map);

      marker.on('click', (event) => {
        L.DomEvent.stop(event);
        if (activeTool === 'delete') { deleteItem('note', note.id); return; }
        selectItem('note', note.id);
      });
      marker.on('contextmenu', (event) => { L.DomEvent.stop(event); selectItem('note', note.id); deleteSelected(); });
      marker.on('dragstart', () => selectItem('note', note.id));
      marker.on('dragend', (event) => { const p = event.target.getLatLng(); note.lat = p.lat; note.lng = p.lng; saveState(); renderAll(); });
      attachManualDrag(marker, 'note', note);
      layers.set(layerKey('note', note.id), marker);
    });
  }

  function renderElements() {
    currentRoute().elements.forEach((element) => {
      const html = elementHtml(element);
      const size = elementPixelSize(element);
      const marker = L.marker([element.lat, element.lng], {
        icon: L.divIcon({ className: 'element-marker', html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] }),
        draggable: false, autoPan: true, zIndexOffset: 900
      }).addTo(map);

      marker.on('click', (event) => {
        L.DomEvent.stop(event);
        if (activeTool === 'delete') { deleteItem('element', element.id); return; }
        selectItem('element', element.id);
      });
      marker.on('contextmenu', (event) => { L.DomEvent.stop(event); selectItem('element', element.id); deleteSelected(); });
      marker.on('dragstart', () => selectItem('element', element.id));
      marker.on('dragend', (event) => { const p = event.target.getLatLng(); element.lat = p.lat; element.lng = p.lng; saveState(); renderAll(); });
      attachManualDrag(marker, 'element', element);
      layers.set(layerKey('element', element.id), marker);
    });
  }

  function elementHtml(element) {
    let body = '';
    if (element.type === 'zebra') body = svgZebra();
    if (element.type === 'bump') body = svgBump();
    if (element.type === 'trafficLight') body = svgTrafficLight();
    if (element.type === 'sign') {
      const sign = findSign(element.signId);
      body = sign ? `<img class="sign-img" src="${escapeAttr(sign.image)}" alt="${escapeAttr(sign.title)}" draggable="false" />` : svgGenericSign();
    }
    const selectedClass = selected?.type === 'element' && selected.id === element.id ? 'selected' : '';
    return `<div class="element-inner ${selectedClass}" style="transform: rotate(${Number(element.rotation || 0)}deg);">${body}</div>`;
  }

  function refreshConnectedRoads(nodeId) {
    currentRoute().roadSegments.forEach((seg) => {
      if (seg.from !== nodeId && seg.to !== nodeId) return;
      const from = getNode(seg.from);
      const to = getNode(seg.to);
      const layerSet = layers.get(layerKey('road', seg.id));
      if (!from || !to || !layerSet) return;
      // Під час перетягування рухаємо лише тінь сегмента. Кольоровий
      // градієнт перераховується повністю після завершення перетягування,
      // бо він залежить від сумарної довжини всього маршруту.
      layerSet[0]?.setLatLngs([[from.lat, from.lng], [to.lat, to.lng]]);
    });
  }

  function attachManualDrag(layer, type, item) {
    if (!layer || !item) return;
    const start = (event) => {
      if (activeTool !== 'select') return;
      const original = event.originalEvent;
      if (original?.button !== undefined && original.button !== 0) return;
      L.DomEvent.stop(event);
      beginManualDrag(type, item, layer, event);
    };
    layer.on('mousedown', start);
    layer.on('touchstart', start);
  }

  function attachManualCalloutDrag(layer, callout, line, arrow) {
    if (!layer || !callout) return;
    const start = (event) => {
      if (activeTool !== 'select') return;
      const original = event.originalEvent;
      if (original?.button !== undefined && original.button !== 0) return;
      L.DomEvent.stop(event);
      beginManualDrag('callout', callout, { line, arrow }, event);
    };
    layer.on('mousedown', start);
    layer.on('touchstart', start);
  }

  function beginManualDrag(type, item, layer, event) {
    const startLatLng = eventToLatLng(event);
    if (!startLatLng) return;

    selected = { routeId: state.activeRouteId, type, id: item.id };
    applySelectedStyles();
    updateSelectionPanel();

    manualDrag = {
      type,
      id: item.id,
      item,
      layer,
      moved: false,
      startLatLng,
      startPoint: map.latLngToLayerPoint(startLatLng),
      originalLat: item.lat,
      originalLng: item.lng,
      originalLatLngs: type === 'callout' ? JSON.parse(JSON.stringify(item.latlngs || [])) : null
    };

    if (map.dragging?.enabled()) map.dragging.disable();
    document.body.classList.add('manual-dragging');

    map.on('mousemove', handleManualDragMove);
    map.on('touchmove', handleManualDragMove);
    document.addEventListener('mousemove', handleManualDocumentMove, { passive: false });
    document.addEventListener('touchmove', handleManualDocumentMove, { passive: false });
    document.addEventListener('mouseup', endManualDrag, { once: true });
    document.addEventListener('touchend', endManualDrag, { once: true });
    document.addEventListener('touchcancel', endManualDrag, { once: true });
  }

  function handleManualDragMove(event) {
    if (!manualDrag) return;
    const latlng = eventToLatLng(event);
    if (!latlng) return;
    moveManualDragTo(latlng);
  }

  function handleManualDocumentMove(event) {
    if (!manualDrag) return;
    event.preventDefault?.();
    const latlng = eventToLatLng(event);
    if (!latlng) return;
    moveManualDragTo(latlng);
  }

  function moveManualDragTo(latlng) {
    if (!manualDrag) return;
    manualDrag.moved = true;

    if (manualDrag.type === 'node') {
      manualDrag.item.lat = latlng.lat;
      manualDrag.item.lng = latlng.lng;
      manualDrag.layer.setLatLng(latlng);
      refreshConnectedRoads(manualDrag.id);
      return;
    }

    if (manualDrag.type === 'note' || manualDrag.type === 'element') {
      manualDrag.item.lat = latlng.lat;
      manualDrag.item.lng = latlng.lng;
      manualDrag.layer.setLatLng(latlng);
      return;
    }

    if (manualDrag.type === 'callout') {
      const currentPoint = map.latLngToLayerPoint(latlng);
      const dx = currentPoint.x - manualDrag.startPoint.x;
      const dy = currentPoint.y - manualDrag.startPoint.y;
      const movedLatLngs = (manualDrag.originalLatLngs || []).map((pair) => {
        const point = map.latLngToLayerPoint(L.latLng(pair[0], pair[1]));
        const moved = map.layerPointToLatLng(L.point(point.x + dx, point.y + dy));
        return [moved.lat, moved.lng];
      });
      if (movedLatLngs.length === 2) {
        manualDrag.item.latlngs = movedLatLngs;
        manualDrag.layer.line?.setLatLngs(movedLatLngs);
        manualDrag.layer.arrow?.setLatLng(movedLatLngs[1]);
      }
    }
  }

  function endManualDrag() {
    if (!manualDrag) return;
    const finished = manualDrag;
    manualDrag = null;
    suppressMapClickUntil = Date.now() + 250;

    map.off('mousemove', handleManualDragMove);
    map.off('touchmove', handleManualDragMove);
    document.removeEventListener('mousemove', handleManualDocumentMove);
    document.removeEventListener('touchmove', handleManualDocumentMove);
    document.body.classList.remove('manual-dragging');
    if (map.dragging && !map.dragging.enabled()) map.dragging.enable();

    if (finished.moved) {
      saveState();
      renderAll();
    }
  }

  function eventToLatLng(event) {
    if (!event) return null;
    if (event.latlng) return event.latlng;
    const original = event.originalEvent || event;
    const touch = original.touches?.[0] || original.changedTouches?.[0];
    const src = touch || original;
    if (typeof src.clientX !== 'number' || typeof src.clientY !== 'number') return null;
    const rect = map.getContainer().getBoundingClientRect();
    const point = L.point(src.clientX - rect.left, src.clientY - rect.top);
    return map.containerPointToLatLng(point);
  }

  function updateDragModes() {
    for (const [key, layer] of layers.entries()) {
      if (!key.startsWith('node:') && !key.startsWith('element:') && !key.startsWith('note:')) continue;
      if (Array.isArray(layer)) continue;
      if (!layer.dragging) continue;
      if (activeTool === 'select') layer.dragging.enable();
      else layer.dragging.disable();
    }
  }

  function selectItem(type, id) {
    selected = { routeId: state.activeRouteId, type, id };
    if (activeTool !== 'select') {
      setTool('select');
      selected = { routeId: state.activeRouteId, type, id };
    }
    applySelectedStyles();
    updateSelectionPanel();
  }

  function selectNone(update = true) {
    selected = null;
    if (update) {
      applySelectedStyles();
      updateSelectionPanel();
    }
  }

  function applySelectedStyles() {
    document.querySelectorAll('.node-icon, .note-icon, .element-inner').forEach((el) => el.classList.remove('selected'));
    if (!selected || selected.routeId !== state.activeRouteId) return;
    const layer = layers.get(layerKey(selected.type, selected.id));

    if (selected.type === 'node' && layer?._icon) layer._icon.querySelector('.node-icon')?.classList.add('selected');
    if (selected.type === 'note' && layer?._icon) layer._icon.querySelector('.note-icon')?.classList.add('selected');
    if (selected.type === 'element' && layer?._icon) layer._icon.querySelector('.element-inner')?.classList.add('selected');

    if (selected.type === 'road') {
      const lineSet = layers.get(layerKey('road', selected.id));
      lineSet?.forEach((line) => {
        if (line._roadMain) line.setStyle({ weight: 10, color: '#E74011' });
      });
    }
    if (selected.type === 'callout') {
      const set = layers.get(layerKey('callout', selected.id));
      if (set?.[0]) set[0].setStyle({ weight: 7, color: '#E74011' });
    }
  }

  function updateSelectionPanel() {
    els.elementControls.classList.add('hidden');
    els.rotationInput.disabled = false;
    if (!selected || selected.routeId !== state.activeRouteId) {
      els.selectionText.textContent = 'Нічого не вибрано';
      return;
    }

    if (selected.type === 'node') {
      const connected = currentRoute().roadSegments.filter((seg) => seg.from === selected.id || seg.to === selected.id).length;
      els.selectionText.textContent = `Вузлик дороги. Приєднаних ліній: ${connected}. Його можна перетягнути або видалити.`;
      return;
    }
    if (selected.type === 'road') {
      els.selectionText.textContent = 'Окрема лінія дороги. Можна видалити саме цей сегмент, не чіпаючи інші.';
      return;
    }
    if (selected.type === 'callout') {
      const callout = currentRoute().callouts.find((item) => item.id === selected.id);
      els.selectionText.textContent = 'Стрілка-виноска без тексту. Товщина і наконечник масштабуються разом із картою.';
      els.elementControls.classList.remove('hidden');
      els.scaleInput.value = callout?.scale ?? 1;
      els.rotationInput.value = 0;
      els.rotationInput.disabled = true;
      return;
    }
    if (selected.type === 'note') {
      const note = currentRoute().notes.find((item) => item.id === selected.id);
      els.selectionText.textContent = `Примітка: ${note?.text || ''}`;
      els.elementControls.classList.remove('hidden');
      els.scaleInput.value = note?.scale ?? 1;
      els.rotationInput.value = note?.rotation ?? 0;
      els.rotationInput.disabled = false;
      return;
    }
    if (selected.type === 'element') {
      const element = currentRoute().elements.find((item) => item.id === selected.id);
      const sign = element?.type === 'sign' ? findSign(element.signId) : null;
      els.selectionText.textContent = sign ? `Знак ПДР: ${sign.title} (${sign.id})` : elementTitle(element?.type);
      els.elementControls.classList.remove('hidden');
      els.scaleInput.value = element?.scale ?? 1;
      els.rotationInput.value = element?.rotation ?? 0;
      els.rotationInput.disabled = false;
    }
  }

  function updateSelectedElementControls() {
    if (!selected || selected.routeId !== state.activeRouteId) return;
    const route = currentRoute();
    let item = null;
    if (selected.type === 'element') item = route.elements.find((el) => el.id === selected.id);
    if (selected.type === 'note') item = route.notes.find((note) => note.id === selected.id);
    if (selected.type === 'callout') item = route.callouts.find((callout) => callout.id === selected.id);
    if (!item) return;
    item.scale = Number(els.scaleInput.value);
    if (selected.type !== 'callout') item.rotation = Number(els.rotationInput.value);
    saveState();
    renderAll();
  }

  function deleteItem(type, id) {
    selected = { routeId: state.activeRouteId, type, id };
    deleteSelected();
  }

  function deleteSelected() {
    if (!selected || selected.routeId !== state.activeRouteId) {
      toast('Спочатку вибери елемент на карті');
      return;
    }
    const route = currentRoute();
    const { type, id } = selected;

    if (type === 'node') {
      route.nodes = route.nodes.filter((node) => node.id !== id);
      route.roadSegments = route.roadSegments.filter((seg) => seg.from !== id && seg.to !== id);
    }
    if (type === 'road') route.roadSegments = route.roadSegments.filter((seg) => seg.id !== id);
    if (type === 'callout') route.callouts = route.callouts.filter((item) => item.id !== id);
    if (type === 'note') route.notes = route.notes.filter((item) => item.id !== id);
    if (type === 'element') route.elements = route.elements.filter((item) => item.id !== id);

    selected = null;
    saveState();
    renderAll();
    toast('Видалено');
  }

  function clearActiveRoute() {
    const route = currentRoute();
    if (!confirm(`Очистити всі елементи активного маршруту «${route.name}»?`)) return;
    route.nodes = [];
    route.roadSegments = [];
    route.callouts = [];
    route.notes = [];
    route.elements = [];
    selected = null;
    lastRoadNodeId = null;
    calloutDraft = null;
    saveState();
    renderAll();
    renderRoutesPanel();
    toast('Активний маршрут очищено');
  }

  function createRoute() {
    const name = prompt('Назва маршруту:', `Маршрут ${state.routes.length + 1}`);
    if (!name || !name.trim()) return;
    const route = defaultRoute(name.trim());
    state.routes.push(route);
    state.activeRouteId = route.id;
    selected = null;
    lastRoadNodeId = null;
    calloutDraft = null;
    saveState();
    renderAll();
    renderRoutesPanel();
    updateStatus();
    toast('Новий маршрут створено');
  }

  function activateRoute(id) {
    if (!state.routes.some((route) => route.id === id)) return;
    state.activeRouteId = id;
    selected = null;
    lastRoadNodeId = null;
    calloutDraft = null;
    saveState();
    renderAll();
    renderRoutesPanel();
    updateStatus();
  }

  function deleteRoute(id) {
    const route = state.routes.find((item) => item.id === id);
    if (!route) return;
    if (state.routes.length <= 1) {
      toast('Має залишитись хоча б один маршрут');
      return;
    }
    if (!confirm(`Видалити маршрут «${route.name}» разом з усіма його елементами?`)) return;
    state.routes = state.routes.filter((item) => item.id !== id);
    if (state.activeRouteId === id) state.activeRouteId = state.routes[0].id;
    selected = null;
    lastRoadNodeId = null;
    saveState();
    renderAll();
    renderRoutesPanel();
    updateStatus();
    toast('Маршрут видалено');
  }

  function moveRoute(id, dir) {
    const index = state.routes.findIndex((route) => route.id === id);
    const next = index + dir;
    if (index < 0 || next < 0 || next >= state.routes.length) return;
    const temp = state.routes[index];
    state.routes[index] = state.routes[next];
    state.routes[next] = temp;
    saveState();
    renderRoutesPanel();
  }

  function renameRoute(id, name) {
    const route = state.routes.find((item) => item.id === id);
    if (!route) return;
    route.name = name.trim() || 'Без назви';
    saveState();
    updateStatus();
    updateActiveRouteLabel();
  }

  function renderRoutesPanel() {
    els.routeList.innerHTML = '';
    state.routes.forEach((route) => {
      const stats = routeStats(route);
      const row = document.createElement('div');
      row.className = `route-row ${route.id === state.activeRouteId ? 'active' : ''}`;
      row.innerHTML = `
        <input class="route-name-input" value="${escapeAttr(route.name)}" title="Перейменувати маршрут" />
        <div class="route-controls">
          <button class="ghost" data-action="up" title="Перемістити вище">↑</button>
          <button class="ghost" data-action="down" title="Перемістити нижче">↓</button>
          <button class="danger" data-action="delete" title="Видалити маршрут">×</button>
        </div>
        <div class="route-meta">${stats.nodes} вузл., ${stats.roadSegments} ліній, ${stats.elements} знаків/елементів, ${stats.notes} приміток</div>
      `;
      row.addEventListener('click', (event) => {
        if (event.target.closest('button') || event.target.closest('input')) return;
        activateRoute(route.id);
      });
      const input = row.querySelector('input');
      input.addEventListener('focus', () => activateRoute(route.id));
      input.addEventListener('input', () => renameRoute(route.id, input.value));
      row.querySelector('[data-action="up"]').addEventListener('click', () => moveRoute(route.id, -1));
      row.querySelector('[data-action="down"]').addEventListener('click', () => moveRoute(route.id, 1));
      row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteRoute(route.id));
      els.routeList.appendChild(row);
    });
    updateActiveRouteLabel();
  }

  function routeStats(route) {
    return {
      nodes: route.nodes.length,
      roadSegments: route.roadSegments.length,
      elements: route.elements.length,
      notes: route.notes.length
    };
  }

  function updateActiveRouteLabel() {
    if (els.activeRouteName) els.activeRouteName.textContent = currentRoute().name;
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-map-builder-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        let imported;
        if (Array.isArray(data.routes)) {
          imported = {
            ...state,
            ...data,
            version: 6,
            routes: data.routes.map(normalizeRoute)
          };
          imported.activeRouteId = imported.routes.some((r) => r.id === data.activeRouteId) ? data.activeRouteId : imported.routes[0]?.id;
        } else if (Array.isArray(data.nodes) || Array.isArray(data.roadSegments)) {
          const route = defaultRoute('Імпортований маршрут');
          route.nodes = data.nodes || [];
          route.roadSegments = data.roadSegments || [];
          route.callouts = data.callouts || [];
          route.notes = data.notes || [];
          route.elements = (data.elements || []).map(normalizeElement);
          imported = { ...state, routes: [route], activeRouteId: route.id, mapView: data.mapView || state.mapView };
        } else {
          throw new Error('Некоректний файл');
        }
        state.version = 6;
        state.routes = imported.routes.length ? imported.routes : [defaultRoute()];
        state.activeRouteId = imported.activeRouteId || state.routes[0].id;
        state.mapView = imported.mapView || state.mapView;
        saveState();
        renderAll();
        renderRoutesPanel();
        fitAll();
        toast('JSON імпортовано');
      } catch (error) {
        alert('Не вдалося імпортувати JSON: ' + error.message);
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  function fitAll() {
    const route = currentRoute();
    const coords = [];
    route.nodes.forEach((n) => coords.push([n.lat, n.lng]));
    route.callouts.forEach((c) => c.latlngs?.forEach((p) => coords.push(p)));
    route.notes.forEach((n) => coords.push([n.lat, n.lng]));
    route.elements.forEach((e) => coords.push([e.lat, e.lng]));
    if (!coords.length) {
      map.setView(DEFAULT_CENTER, 14);
      return;
    }
    map.fitBounds(coords, { padding: [70, 70], maxZoom: 18 });
  }

  function updateStats() {
    if (!els.statsBox) return;
    const route = currentRoute();
    els.statsBox.innerHTML = `
      <strong>Активний маршрут:</strong> ${escapeHtml(route.name)}<br>
      Усього маршрутів: ${state.routes.length}<br>
      Вузлики дороги: ${route.nodes.length}<br>
      Окремі лінії дороги: ${route.roadSegments.length}<br>
      Стрілки-виноски: ${route.callouts.length}<br>
      Примітки: ${route.notes.length}<br>
      Знаки / елементи: ${route.elements.length}
    `;
  }

  function getNode(id) {
    return currentRoute().nodes.find((node) => node.id === id);
  }

  function layerKey(type, id) { return `${type}:${id}`; }

  function interpolateLatLng(from, to, t) {
    return [
      from.lat + (to.lat - from.lat) * t,
      from.lng + (to.lng - from.lng) * t
    ];
  }

  function mapScaledPixelSize(item, type, lat) {
    if (!item.sizeMeters) {
      const fallbackPx = DEFAULT_ELEMENT_PX[type] || 58;
      item.sizeMeters = fallbackPx * metersPerPixel(lat, map.getZoom()) / Number(item.scale || 1);
    }
    const px = item.sizeMeters / metersPerPixel(lat, map.getZoom()) * Number(item.scale || 1);
    return Math.max(4, Math.min(620, Math.round(px)));
  }

  function noteViewModel(text, rawSize) {
    const clean = String(text || '').trim().replace(/\s+/g, ' ');
    const short = compactText(clean, rawSize);

    if (rawSize < 22) {
      const box = Math.max(14, Math.round(rawSize));
      return {
        text: short || '•',
        width: box,
        height: box,
        fontSize: Math.max(8, Math.round(box * 0.52)),
        padY: 0,
        padX: 0,
        radius: Math.max(4, Math.round(box * 0.32)),
        className: 'note-compact note-tiny'
      };
    }

    if (rawSize < 42) {
      const width = Math.max(22, Math.round(rawSize));
      const height = Math.max(18, Math.round(width * 0.72));
      return {
        text: short || '•',
        width,
        height,
        fontSize: Math.max(8, Math.round(width * 0.38)),
        padY: 1,
        padX: 2,
        radius: Math.max(5, Math.round(width * 0.22)),
        className: 'note-compact note-small'
      };
    }

    if (rawSize < 86) {
      const width = Math.max(42, Math.round(rawSize));
      const height = Math.max(22, Math.round(width * 0.44));
      return {
        text: short,
        width,
        height,
        fontSize: Math.max(8, Math.round(width * 0.16)),
        padY: Math.max(2, Math.round(width * 0.035)),
        padX: Math.max(4, Math.round(width * 0.05)),
        radius: Math.max(6, Math.round(width * 0.16)),
        className: 'note-compact note-medium'
      };
    }

    const width = Math.max(92, Math.round(rawSize));
    const fontSize = Math.max(10, Math.round(width * 0.095));
    const padY = Math.max(5, Math.round(width * 0.055));
    const padX = Math.max(7, Math.round(width * 0.075));
    const lineHeight = Math.round(fontSize * 1.23);
    const charsPerLine = Math.max(8, Math.floor((width - padX * 2) / (fontSize * 0.56)));
    const lines = estimateWrappedLines(clean, charsPerLine);
    const height = Math.max(34, Math.round(lines * lineHeight + padY * 2));

    return {
      text: clean,
      width,
      height,
      fontSize,
      padY,
      padX,
      radius: Math.max(8, Math.round(width * 0.11)),
      className: 'note-full'
    };
  }

  function compactText(text, rawSize) {
    const clean = String(text || '').trim().replace(/\s+/g, ' ');
    if (!clean) return '';
    if (rawSize < 22) return clean.slice(0, 1).toUpperCase();
    if (rawSize < 42) return clean.slice(0, 2).toUpperCase();
    if (rawSize < 62) return clean.length > 4 ? `${clean.slice(0, 4)}…` : clean;
    if (rawSize < 86) return clean.length > 10 ? `${clean.slice(0, 10)}…` : clean;
    return clean;
  }

  function estimateWrappedLines(text, charsPerLine) {
    const clean = String(text || '').trim();
    if (!clean) return 1;
    let lines = 1;
    let lineLen = 0;
    clean.split(' ').forEach((word) => {
      const len = word.length;
      if (!len) return;
      if (len > charsPerLine) {
        if (lineLen > 0) { lines += 1; lineLen = 0; }
        lines += Math.max(0, Math.ceil(len / charsPerLine) - 1);
        lineLen = len % charsPerLine;
        if (lineLen === 0) lineLen = charsPerLine;
        return;
      }
      const nextLen = lineLen ? lineLen + 1 + len : len;
      if (nextLen > charsPerLine) {
        lines += 1;
        lineLen = len;
      } else {
        lineLen = nextLen;
      }
    });
    return Math.max(1, lines);
  }

  function arrowHeadHtml(size, angle) {
    const box = Math.max(4, size);
    const half = Math.max(2, box * 0.28);
    const len = Math.max(3, box * 0.64);
    return `<div class="arrow-head" style="width:${box}px;height:${box}px;transform:rotate(${angle}deg)"><span style="border-top:${half}px solid transparent;border-bottom:${half}px solid transparent;border-left:${len}px solid #252933;"></span></div>`;
  }

  function gradientColor(t) {
    const hue = Math.round(120 - 120 * Math.max(0, Math.min(1, t)));
    return `hsl(${hue}, 85%, 46%)`;
  }

  function metersPerPixel(lat, zoom) {
    return (EARTH_CIRCUMFERENCE * Math.cos(lat * Math.PI / 180)) / (256 * Math.pow(2, zoom));
  }

  function elementPixelSize(element) {
    return mapScaledPixelSize(element, element.type, element.lat);
  }

  function angleBetween(a, b) {
    const pa = map.latLngToContainerPoint(L.latLng(a[0], a[1]));
    const pb = map.latLngToContainerPoint(L.latLng(b[0], b[1]));
    return Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180 / Math.PI;
  }

  function highlightNode(nodeId) {
    const layer = layers.get(layerKey('node', nodeId));
    if (!layer?._icon) return;
    const icon = layer._icon.querySelector('.node-icon');
    icon?.classList.add('selected');
    setTimeout(() => icon?.classList.remove('selected'), 500);
  }

  function renderSignCatalog() {
    const query = (els.signSearch.value || '').trim().toLowerCase();
    els.signCatalog.innerHTML = '';

    SIGN_GROUPS.forEach((group, groupIndex) => {
      const filtered = group.signs.filter((sign) => {
        const haystack = `${group.title} ${sign.id} ${sign.title}`.toLowerCase();
        return !query || haystack.includes(query);
      });
      if (!filtered.length) return;

      const details = document.createElement('details');
      details.className = 'sign-group';
      details.open = groupIndex < 2 || Boolean(query);
      details.innerHTML = `<summary>${escapeHtml(group.title)} <span class="muted">${filtered.length}</span></summary><div class="sign-grid"></div>`;
      const grid = details.querySelector('.sign-grid');

      filtered.forEach((sign) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `sign-card ${selectedSignId === sign.id ? 'active' : ''}`;
        btn.title = `${sign.id} — ${sign.title}`;
        btn.innerHTML = `<img src="${escapeAttr(sign.image)}" alt="${escapeAttr(sign.title)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'sign-fallback',textContent:'${escapeAttr(sign.id)}'}))" />`;
        btn.addEventListener('click', () => {
          selectedSignId = sign.id;
          setTool('placeSign');
          renderSignCatalog();
          toast(`Обрано знак ${sign.id}. Тепер клікни місце на карті.`);
        });
        grid.appendChild(btn);
      });
      els.signCatalog.appendChild(details);
    });
  }

  function findSign(id) {
    for (const group of SIGN_GROUPS) {
      const found = group.signs.find((sign) => sign.id === id);
      if (found) return found;
    }
    return null;
  }

  function elementTitle(type) {
    const names = { zebra: 'Пішохід / зебра', bump: 'Лежачий поліцейський', trafficLight: 'Світлофор', sign: 'Знак ПДР' };
    return names[type] || 'Елемент';
  }

  function svgZebra() {
    return `<svg class="zebra-svg" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="56" rx="8" fill="#fff" stroke="#252933" stroke-width="4"/>
      <rect x="12" y="6" width="12" height="48" fill="#111"/><rect x="36" y="6" width="12" height="48" fill="#111"/>
      <rect x="60" y="6" width="12" height="48" fill="#111"/><rect x="84" y="6" width="12" height="48" fill="#111"/>
    </svg>`;
  }

  function svgBump() {
    return `<svg class="bump-svg" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="56" rx="8" fill="#f3c300" stroke="#252933" stroke-width="4"/>
      <rect x="12" y="6" width="14" height="48" fill="#111"/><rect x="42" y="6" width="14" height="48" fill="#111"/>
      <rect x="72" y="6" width="14" height="48" fill="#111"/><rect x="102" y="6" width="10" height="48" fill="#111"/>
    </svg>`;
  }

  function svgTrafficLight() {
    return `<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="44" height="88" rx="14" fill="#252933"/>
      <circle cx="40" cy="28" r="9" fill="#e74011"/><circle cx="40" cy="52" r="9" fill="#eed420"/><circle cx="40" cy="76" r="9" fill="#22c55e"/>
      <rect x="36" y="96" width="8" height="20" rx="4" fill="#252933"/>
    </svg>`;
  }

  function svgGenericSign() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="#fff" stroke="#e11d48" stroke-width="10"/></svg>`;
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }

  function escapeAttr(text) { return escapeHtml(text); }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
  }

  initUI();
  saveState();
  renderAll();
  updateStatus();
  updateStats();
})();
