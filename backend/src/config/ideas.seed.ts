import { query } from "./postgres.config";

interface SeedDataInterface {
    title: string,
    description: string
}

const sampleIdeas: SeedDataInterface[] = [
    {
        title: 'Темная тема для приложения',
        description: 'Добавить возможность переключения между светлой и темной темой'
    },
    {
        title: 'Мобильное приложение',
        description: 'Разработать нативное мобильное приложение для iOS и Android'
    },
    {
        title: 'Интеграция с календарем',
        description: 'Добавить синхронизацию с Google Calendar и Apple Calendar'
    },
    {
        title: 'Экспорт данных',
        description: 'Возможность экспорта данных в CSV и Excel форматах'
    },
    {
        title: 'Уведомления в реальном времени',
        description: 'Добавить push-уведомления для важных событий'
    },
    {
        title: 'Расширенная аналитика',
        description: 'Встроенные инструменты для анализа данных и отчетности'
    },
    {
        title: 'API для разработчиков',
        description: 'Открытое API для интеграции с другими сервисами'
    },
    {
        title: 'Геймификация',
        description: 'Добавить систему достижений и рейтингов для пользователей'
    },
    {
        title: 'Автоматическое резервное копирование',
        description: 'Регулярное автоматическое сохранение данных в облаке'
    },
    {
        title: 'Многоязычная поддержка',
        description: 'Добавить поддержку английского, испанского и немецкого языков'
    },
    {
        title: 'Оффлайн-режим',
        description: 'Возможность работы без интернет-соединения'
    },
    {
        title: 'Расширенные настройки приватности',
        description: 'Гибкие настройки конфиденциальности для разных типов данных'
    }
];

const seedData = async (ideas: SeedDataInterface[]) => {
    try {
        for (const idea of sampleIdeas) {
            await query(
                'INSERT INTO ideas (title, description) VALUES ($1, $2)',
                [idea.title, idea.description]
            );
        }

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedData(sampleIdeas);