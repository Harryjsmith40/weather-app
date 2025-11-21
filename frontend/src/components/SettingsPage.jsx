// src/components/SettingsPage.jsx
export default function SettingsPage({
  settings,
  updateSetting,
  resetSettings,
  clearWeatherCache,
}) {
  const s = settings;

  return (
    <div className="w-full bg-white/70 backdrop-blur-xl shadow-lg rounded-3xl p-5 sm:p-6 mt-4 space-y-6">
      {/* --- GENERAL --- */}
      <Section title="General">
        <Row label="Temperature units">
          <SegmentedControl
            value={s.units}
            onChange={(v) => updateSetting("units", v)}
            options={[
              { value: "metric", label: "°C" },
              { value: "imperial", label: "°F" },
            ]}
          />
        </Row>

        <Row label="Theme">
          <Select
            value={s.theme}
            onChange={(v) => updateSetting("theme", v)}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </Row>

        <Row label="Animations">
          <Toggle
            checked={s.animations}
            onChange={(v) => updateSetting("animations", v)}
          />
        </Row>
      </Section>

      {/* --- LOCATION --- */}
      <Section title="Location">
        <Row label="Use device GPS">
          <Toggle
            checked={s.useGps}
            onChange={(v) => updateSetting("useGps", v)}
          />
        </Row>

        <Row label="Manual location (city name)">
          <input
            type="text"
            value={s.manualLocation}
            onChange={(e) => updateSetting("manualLocation", e.target.value)}
            placeholder="e.g., Sydney, Melbourne"
            className="w-full rounded-xl border border-sky-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <p className="mt-1 text-xs text-gray-500">
            (Planned) When set, Nim will use this instead of GPS once wired in.
          </p>
        </Row>
      </Section>

      {/* --- NIM THE PENGUIN --- */}
      <Section title="Nim the Penguin">
        <Row label="Energy level">
          <SegmentedControl
            value={s.penguinEnergy}
            onChange={(v) => updateSetting("penguinEnergy", v)}
            options={[
              { value: "calm", label: "Calm" },
              { value: "normal", label: "Normal" },
              { value: "hyper", label: "Hyper" },
            ]}
          />
        </Row>

        <Row label="Weather sensitivity">
          <SegmentedControl
            value={s.penguinSensitivity}
            onChange={(v) => updateSetting("penguinSensitivity", v)}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
        </Row>
      </Section>

      {/* --- REFRESH --- */}
      <Section title="Refresh">
        <Row label="Auto-refresh interval">
          <Select
            value={String(s.refreshIntervalMinutes)}
            onChange={(v) =>
              updateSetting("refreshIntervalMinutes", Number(v))
            }
            options={[
              { value: "15", label: "Every 15 min" },
              { value: "30", label: "Every 30 min" },
              { value: "60", label: "Every hour" },
            ]}
          />
        </Row>

        <button
          type="button"
          onClick={clearWeatherCache}
          className="mt-2 text-xs sm:text-sm px-3 py-2 rounded-full border border-sky-300 bg-white/80 hover:bg-sky-50 transition"
        >
          Clear cached weather
        </button>
      </Section>

      {/* --- DATA --- */}
      <Section title="Data & Reset">
        <p className="text-xs text-gray-600 mb-2">
          Reset all settings back to their original defaults.
        </p>
        <button
          type="button"
          onClick={resetSettings}
          className="text-xs sm:text-sm px-3 py-2 rounded-full border border-red-300 text-red-700 bg-white/80 hover:bg-red-50 transition"
        >
          Reset all settings
        </button>
      </Section>
    </div>
  );
}

/* --------- Small UI helpers (same aesthetic as rest of app) --------- */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-800 mb-2">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs font-medium text-slate-700">{label}</div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center rounded-full px-1 py-0.5 border transition ${
        checked
          ? "bg-sky-500 border-sky-500 justify-end"
          : "bg-gray-200 border-gray-300 justify-start"
      } w-11`}
    >
      <span className="block w-5 h-5 bg-white rounded-full shadow" />
    </button>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      className="w-full rounded-xl border border-sky-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function SegmentedControl({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-full bg-sky-50 border border-sky-200 p-0.5 text-xs">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-2.5 py-1 rounded-full transition ${
              active ? "bg-white shadow text-sky-700" : "text-gray-600"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
