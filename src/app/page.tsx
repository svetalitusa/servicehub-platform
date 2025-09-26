"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "Легкий поиск",
      description: "Найдите подходящего исполнителя за несколько кликов",
    },
    {
      icon: Shield,
      title: "Проверенные исполнители",
      description: "Все специалисты проходят верификацию и проверку документов",
    },
    {
      icon: Star,
      title: "Система рейтингов",
      description: "Реальные отзывы клиентов помогут сделать правильный выбор",
    },
    {
      icon: Users,
      title: "Большое сообщество",
      description: "Более 10,000 исполнителей в различных категориях услуг",
    },
  ];

  const categories = [
    {
      name: "Ремонт и строительство",
      count: "2,534",
      image: "/categories/repair.jpg",
    },
    {
      name: "Уборка и клининг",
      count: "1,892",
      image: "/categories/cleaning.jpg",
    },
    {
      name: "Доставка и курьеры",
      count: "1,456",
      image: "/categories/delivery.jpg",
    },
    {
      name: "Репетиторы и обучение",
      count: "987",
      image: "/categories/tutoring.jpg",
    },
    { name: "IT и технологии", count: "756", image: "/categories/tech.jpg" },
    {
      name: "Красота и здоровье",
      count: "634",
      image: "/categories/beauty.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Анна Петрова",
      role: "Заказчик",
      text: "Нашла отличного мастера для ремонта ванной. Работа выполнена качественно и в срок!",
      rating: 5,
      avatar: "/avatars/anna.jpg",
    },
    {
      name: "Михаил Сидоров",
      role: "Исполнитель",
      text: "Платформа помогла мне найти много постоянных клиентов. Отличный сервис!",
      rating: 5,
      avatar: "/avatars/mikhail.jpg",
    },
    {
      name: "Елена Козлова",
      role: "Заказчик",
      text: "Быстро нашла репетитора для дочки. Удобная система поиска и связи.",
      rating: 5,
      avatar: "/avatars/elena.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Найдите идеального исполнителя для любой задачи
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-primary-100"
            >
              Тысячи проверенных специалистов готовы помочь вам. От мелкого
              ремонта до крупных проектов.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/auth/register"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-200 flex items-center group"
              >
                Найти исполнителя
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/register?type=provider"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-200"
              >
                Стать исполнителем
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают ServiceHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создали платформу, которая делает поиск и предложение услуг
              простым и безопасным
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярные категории услуг
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Найдите специалиста в любой области
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card card-hover cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500">
                      {category.count} исполнителей
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Как это работает?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Опишите задачу
              </h3>
              <p className="text-gray-600">
                Расскажите, что нужно сделать, укажите бюджет и сроки выполнения
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Получите отклики
              </h3>
              <p className="text-gray-600">
                Исполнители откликнутся на вашу заявку с предложениями и ценами
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Выберите лучшего
              </h3>
              <p className="text-gray-600">
                Изучите профили, рейтинги и отзывы, чтобы выбрать идеального
                исполнителя
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы наших пользователей
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Узнайте, что говорят о нас заказчики и исполнители
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам пользователей, которые уже нашли свое
              решение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/register"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-200 flex items-center group"
              >
                Создать заявку
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/register?type=provider"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-200"
              >
                Предложить услуги
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ServiceHub</h3>
              <p className="text-gray-400 mb-4">
                Платформа для поиска качественных услуг и надежных исполнителей
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Для заказчиков</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Создать заявку
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Найти исполнителя
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Гарантии
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Для исполнителей</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Регистрация
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Найти заказы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Повысить рейтинг
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@servicehub.ru</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServiceHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
