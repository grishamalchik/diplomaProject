<h1 align="center">Дипломный проект по автоматизации тестирования UI и API с Playwright</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" alt="Playwright"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Allure-FF6B00?style=for-the-badge&logo=allure&logoColor=white" alt="Allure"/>
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
</p>

## 📋 Содержание

- [Описание](#описание)
- [Технологии и инструменты](#технологии-и-инструменты)
- [Архитектура проекта](#архитектура-проекта)
- [Настройка окружения](#настройка-окружения)
- [Запуск тестов](#запуск-тестов)
- [Сборка в Jenkins](#сборка-в-jenkins)
- [GitHub Actions](#github-actions)
- [Интеграция с Allure Report](#интеграция-с-allure-report)
- [Интеграция с Allure TestOps](#интеграция-с-allure-testops)
- [Уведомления в Telegram](#уведомления-в-telegram)

---

## Описание

Дипломный проект по автоматизации тестирования, включающий **UI** и **API** тесты.

**UI тесты** — 5 функциональных автотестов для приложения [Conduit](https://realworld.qa.guru/) (платформа для публикации статей).

**API тесты** — 5 функциональных автотестов для сервиса [API Challenges](https://apichallenges.eviltester.com/).

**Ручные тест-кейсы** — 5 тест-кейсов для Conduit, оформленных в Allure TestOps.

---

## Технологии и инструменты

<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/playwright/playwright-original.svg" title="Playwright" alt="Playwright" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/allure-framework/allure2/main/.idea/icon.png" title="Allure Report" alt="Allure Report" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg" title="Jenkins" alt="Jenkins" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/githubactions/githubactions-original.svg" title="GitHub Actions" alt="GitHub Actions" width="50" height="50"/>
</div>

<br/>

| Инструмент | Назначение |
|------------|------------|
| **Playwright** | Фреймворк для автоматизации UI и API тестов |
| **JavaScript** | Язык программирования |
| **Faker.js** | Генерация тестовых данных |
| **Allure Report** | Визуализация результатов тестирования |
| **Allure TestOps** | Система управления тестированием |
| **Jenkins** | CI/CD сервер |
| **GitHub Actions** | CI/CD платформа |

---

## Архитектура проекта

```
diplomaProject/
├── src/
│   ├── pages/              # Page Object классы (UI)
│   ├── services/           # Service Object классы (API)
│   └── helpers/
│       ├── builders/       # Builder паттерн для тестовых данных
│       └── fixtures/       # Playwright фикстуры
├── tests/
│   ├── uiFunctionalTests.spec.js
│   └── apiFunctionalTests.spec.js
├── notifications/          # Конфигурация Telegram уведомлений
└── playwright.config.js
```

**Применённые паттерны:**
- **Page Object Model** — для UI тестов
- **Service Object Model** — для API тестов
- **Builder Pattern** — для генерации тестовых данных
- **Fixtures** — для переиспользования настроек

---

## Настройка окружения

### Установка зависимостей

```bash
npm install
npx playwright install --with-deps
```

### Переменные окружения

Проект использует переменные окружения для настройки URL тестов. По умолчанию используются:
- **BASE_URL**: `https://realworld.qa.guru/` (для UI тестов)
- **API_URL**: `https://apichallenges.eviltester.com/` (для API тестов)

Чтобы переопределить эти значения, создайте файл `.env` в корне проекта:

```bash
cp .env.example .env
```

Затем отредактируйте `.env` и укажите свои URL:

```
BASE_URL=https://your-custom-ui-url.com/
API_URL=https://your-custom-api-url.com/
```

> **Примечание**: Файл `.env` игнорируется Git. Используйте `.env.example` как шаблон.

---

## Запуск тестов

### Запуск всех тестов

```bash
npm test
```

### Запуск в UI режиме

```bash
npm run ui
```

### Генерация Allure отчёта

```bash
npx allure generate --clean
npx allure open
```

---

## Сборка в Jenkins

Проект настроен для запуска в Jenkins CI/CD.

🔗 **[Открыть Jenkins Job](https://jenkins.autotests.cloud/job/005-hipstaboy-diplomajs/)**

Для доступа в Jenkins необходимо пройти регистрацию на платформе [Jenkins](https://jenkins.autotests.cloud/).

Для запуска сборки нажмите кнопку **Build now**.

<p align="center">
  <img src="media/jenkins_screenshot.png" alt="Jenkins Build" width="800"/>
</p>

После завершения сборки в разделе **Build History** появится значок **Allure Report** для просмотра детализированного отчёта.

---

## GitHub Actions

Тесты автоматически запускаются при:
- Push в ветку `main`
- Ручном запуске (workflow_dispatch)

### Шаги workflow:

1. **Checkout** — клонирование репозитория
2. **Setup Node.js** — установка Node.js
3. **Install packages** — установка зависимостей (`npm ci`)
4. **Install browsers** — установка браузеров Playwright
5. **Run tests** — запуск тестов (`npm t`)
6. **Generate Allure report** — генерация single-file отчёта
7. **Upload artifacts** — сохранение отчётов как артефактов

<p align="center">
  <img src="media/githubactions_screenshot.png" alt="GitHub Actions" width="800"/>
</p>

---

## Интеграция с Allure Report

В проекте используются две версии Allure:
- **Allure 2** — в Jenkins (классический отчёт)
- **Allure 3** — в GitHub Actions и локально (новый интерфейс)

### Allure 2 (Jenkins)

<p align="center">
  <img src="media/allurereport-2.png" alt="Allure 2 Report (Jenkins)" width="800"/>
</p>

### Allure 3 (GitHub Actions / локально)

<p align="center">
  <img src="media/allurereport3.png" alt="Allure 3 Report (GitHub)" width="800"/>
</p>

---

## Интеграция с Allure TestOps

Результаты тестов автоматически передаются в [Allure TestOps](https://allure.autotests.cloud/).

<p align="center">
  <img src="media/alluretestops_screenshot.png" alt="Allure TestOps" width="800"/>
</p>

### Ручные тест-кейсы

<p align="center">
  <img src="media/manualtests.png" alt="Allure TestOps Manual Tests" width="800"/>
</p>

---

## Уведомления в Telegram

После завершения сборки бот в Telegram автоматически отправляет сообщение с результатами тестирования.

<p align="center">
  <img src="media/telegram_screen.png.jpg" alt="Telegram Notification" width="400"/>
</p>

---

