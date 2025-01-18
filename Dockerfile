# Используем подходящий образ для сборки
FROM node:18 AS build

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Второй этап — минимальный образ для хранения собранной статики
FROM alpine:3.18 AS static
WORKDIR /static

# Копируем статику из этапа сборки
COPY --from=build /app/dist /static

# Задаем директорию как рабочую
VOLUME /static

CMD ["sh"]
