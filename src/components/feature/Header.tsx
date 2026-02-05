import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <i className="ri-trademark-line text-2xl text-slate-900" />
            <span className="font-bold text-lg tracking-wide">GTS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Country */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => onCountryChange(country.code)}
                  className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                    selectedCountry === country.code
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-600"
                  }`}
                >
                  {country.label}
                </button>
              ))}
            </div>

            {/* Language */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                    i18n.language === lang.code
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-600"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Favorites */}
            <a
              href="/favorites"
              className="flex items-center space-x-1 text-slate-700"
            >
              <i className="ri-heart-line text-lg" />
              <span className="text-sm">{t("favorites.title")}</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <i className="ri-menu-line text-2xl text-slate-900" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-50">
          <div className="absolute right-0 top-0 w-64 h-full bg-white p-4 space-y-6">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <div>
              <p className="text-xs text-slate-500 mb-2">Country</p>
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    onCountryChange(c.code);
                    setOpen(false);
                  }}
                  className="block w-full text-left py-2"
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-2">Language</p>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    i18n.changeLanguage(l.code);
                    setOpen(false);
                  }}
                  className="block w-full text-left py-2"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <a href="/favorites" className="block py-2">
              ❤️ {t("favorites.title")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
