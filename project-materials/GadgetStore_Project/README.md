# GadgetStore — проектирование рекомендательной системы

Учебный проект по заданию «Проектирование архитектуры крупного интернет-магазина с рекомендательной системой».

## Состав
- `data/GadgetStore_Модель_данных.xlsx` — каталог, покупатели, события, пять матриц, связи товаров и примеры ранжирования.
- `data/*.csv` — отдельные выгрузки ключевых наборов.
- `docs/Отчёт_GadgetStore.docx` — пояснительная записка.
- `diagrams/Схемы_архитектуры.md` — Mermaid-диаграммы.
- `prototype/index.html` — интерактивный учебный прототип экранов.

## Важно
Все покупатели и события вымышлены. Числа и коэффициенты являются воспроизводимой учебной моделью, а не результатами реальной аналитики магазина. Текущая версия репозитория GadgetStore-Web публична: https://github.com/Erroorrrr40004/GadgetStore-Web. Исходный код репозитория не включён в этот пакет; интеграция серверных модулей требует отдельного доступа к локальной копии проекта.

## Как открыть
1. Откройте Excel-файл и листы с матрицами.
2. Откройте Word-отчёт.
3. Откройте `prototype/index.html` в браузере.
4. Диаграммы Mermaid можно просмотреть в GitHub или Mermaid Live Editor.

## План содержательных коммитов
1. `docs: add project requirements and architecture`
2. `data: add 200-product catalog and customer profiles`
3. `analytics: add preference and category matrices`
4. `recommendations: add item relations and ranking examples`
5. `ui: add interactive prototype and responsive screens`
6. `tests: add scenario and validation documentation`

## Стек проектирования
Клиент: существующий клиент GadgetStore-Web (уточнить по локальному проекту).
Сервер: существующий сервер GadgetStore-Web (уточнить по локальному проекту).
Проектируемые логические сервисы: события, предпочтения, сегментация, рекомендации.
