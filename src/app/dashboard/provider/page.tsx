"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  User,
  LogOut,
  Bell,
  Settings,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Calendar,
  CheckCircle,
  Eye,
  Heart,
  DollarSign,
} from "lucide-react";
import { clientAuth } from "@/lib/auth";

interface User {
  name: string;
  email: string;
  userType: string;
  rating: number;
  completedJobs: number;
  responseRate: number;
  avatar: string | null;
}

export default function ProviderDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Checking authentication...");
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        if (data.success && data.user) {
          console.log("✅ User authenticated:", data.user);
          setUser(data.user);
        } else {
          console.log("❌ User not authenticated, redirecting...");
          router.push("/auth/login");
          return;
        }
      } catch (error) {
        console.error("🚨 Auth check failed:", error);
        router.push("/auth/login");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    clientAuth.logout();
  };

  // Mock data for available requests
  const availableRequests = [
    {
      id: 1,
      title: "Установка кондиционера",
      category: "Климатическое оборудование",
      budget: "8000-12000 ₽",
      location: "Москва, Центр",
      postedAt: "2 часа назад",
      description:
        "Необходимо установить сплит-систему в спальне. Все материалы есть.",
      urgent: false,
      responses: 3,
    },
    {
      id: 2,
      title: "Срочный ремонт крана",
      category: "Сантехника",
      budget: "2000-3000 ₽",
      location: "Москва, СВАО",
      postedAt: "30 минут назад",
      description: "Протекает кран на кухне, нужен срочный ремонт.",
      urgent: true,
      responses: 1,
    },
    {
      id: 3,
      title: "Покраска стен в квартире",
      category: "Отделочные работы",
      budget: "15000-20000 ₽",
      location: "Москва, ЗАО",
      postedAt: "1 день назад",
      description:
        "Покраска стен в 3-комнатной квартире, площадь около 80 кв.м.",
      urgent: false,
      responses: 8,
    },
  ];

  // Mock data for my responses
  const myResponses = [
    {
      id: 1,
      title: "Ремонт электропроводки",
      status: "pending",
      myPrice: "6000 ₽",
      customerName: "Анна П.",
      respondedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Установка полок",
      status: "accepted",
      myPrice: "3500 ₽",
      customerName: "Дмитрий К.",
      respondedAt: "2024-01-12",
    },
    {
      id: 3,
      title: "Сборка мебели",
      status: "rejected",
      myPrice: "4000 ₽",
      customerName: "Елена М.",
      respondedAt: "2024-01-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "accepted":
        return "Принят";
      case "rejected":
        return "Отклонен";
      default:
        return "Неизвестно";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                ServiceHub
              </h1>
              <span className="ml-3 px-2 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full">
                Исполнитель
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-secondary-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs text-gray-500">
                      {user?.rating}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Выйти"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Добро пожаловать, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Найдите новые заказы и управляйте своими проектами
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Завершено работ</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user?.completedJobs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Рейтинг</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user?.rating}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Отклик</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user?.responseRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Заработано</p>
                <p className="text-2xl font-semibold text-gray-900">245К ₽</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Requests */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Доступные заявки
                  </h3>
                  <span className="text-sm text-gray-500">
                    {availableRequests.length} заявок
                  </span>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск заявок..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {availableRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <h4 className="text-lg font-semibold text-gray-900 mr-2">
                              {request.title}
                            </h4>
                            {request.urgent && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                Срочно
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {request.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-primary-600">
                            {request.budget}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.responses} откликов
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 text-sm">
                        {request.description}
                      </p>

                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {request.postedAt}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                          Откликнуться
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Подробнее
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Responses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Мои отклики
              </h3>
              <div className="space-y-3">
                {myResponses.map((response) => (
                  <div
                    key={response.id}
                    className="p-3 border border-gray-100 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {response.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.status)}`}
                      >
                        {getStatusText(response.status)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {response.customerName}
                    </p>
                    <p className="text-sm font-semibold text-primary-600">
                      {response.myPrice}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Быстрые действия
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <Search className="w-5 h-5 text-secondary-600 mr-3" />
                  <span>Найти заказы</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <Briefcase className="w-5 h-5 text-secondary-600 mr-3" />
                  <span>Мои проекты</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <MessageSquare className="w-5 h-5 text-secondary-600 mr-3" />
                  <span>Сообщения</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <Settings className="w-5 h-5 text-secondary-600 mr-3" />
                  <span>Настройки</span>
                </button>
              </div>
            </motion.div>

            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-secondary-50 rounded-lg border border-secondary-200 p-6"
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Улучшите профиль
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-secondary-700 mb-1">
                  <span>Заполнено</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-secondary-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-secondary-700 mb-4">
                Добавьте портфолио и получайте больше заказов
              </p>
              <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-700 transition-colors">
                Дополнить
              </button>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Совет дня
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Отвечайте на заявки в течение первых 2 часов - это увеличивает
                шансы быть выбранным на 40%
              </p>
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
                Узнать больше →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
