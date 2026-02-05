import React from "react";
import { useTranslation } from "react-i18next";
import { Country } from "../../types/trademark";

interface HeaderProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "ko", label: t("lang.ko") },
    { code: "en", label: t("lang.en") },
    { code: "zh", label: t("lang.zh") },
  ];

  const countries: { code: Country; label: string }[] = [
    { code: "korea", label: t("country.korea") },
    { code: "us", label: t("country.us") },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-trademark-line text-2xl text-slate-900"></i>
            </div>
            <h1 className="font-bold text-slate-900 whitespace-nowrap">
              {/* Desktop */}
              <span className="hidden md:inline text-xl">
                {t("header.title")}
              </span>

              {/* Mobile */}
              <span className="inline md:hidden text-lg tracking-wide">
                {t("header.titleShort")}
              </span>
            </h1>
            {/* <h1 className="text-xl font-bold text-slate-900">{t('header.title')}</h1> */}
          </div>

          <div className="flex items-center space-x-6">
            {/* Country Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 hidden sm:inline">
                {t("header.country")}
              </span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => onCountryChange(country.code)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      selectedCountry === country.code
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 hidden sm:inline">
                {t("header.language")}
              </span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      i18n.language === lang.code
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites Link */}
            <a
              href="/favorites"
              className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-heart-line text-lg"></i>
              </div>
              <span className="text-sm font-medium hidden md:inline">
                {t("favorites.title")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
