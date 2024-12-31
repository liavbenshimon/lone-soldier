function RequestForm() {
  return (
    <div
      className="max-w-lg mx-auto bg-[hsl(var(--background))] p-6 rounded-lg shadow-md rtl"
      dir="rtl"
    >
      <style>
        {`
              input::placeholder,
              textarea::placeholder {
                color: #A9A9A9; /* צבע אפור בהיר עבור ה-placeholder */
              }
            `}
      </style>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[hsl(var(--primary-foreground))] shadow-lg text-[hsl(var(--primary))] rtl">
        בקשה לתרומה
      </h2>

      <form className="rtl">
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            שם
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס שם"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            גיל
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס גיל"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            פלאפון
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס פלאפון"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            דוא"ל
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס דואל"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            שירות
          </label>
          <div className="flex gap-4 rtl">
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="סדיר"
                className="mr-2"
              />
              סדיר
            </label>
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="מילואים"
                className="mr-2"
              />
              מילואים
            </label>
          </div>
        </div>

        {/* פרטי הבקשה */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            סוג הפריט
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס סוג פריט"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            תיאור הפריט הנדרש
          </label>
          <textarea
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="פרטים כמו מידה, צבע, מצב רצוי"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            כמות נדרשת
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס כמות"
          />
        </div>

        {/* פרטים נוספים */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            דחיפות התרומה
          </label>
          <select className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50">
            <option value="מידי">מידי</option>
            <option value="תאריך ספציפי">עד תאריך</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            אזור גיאוגרפי להעדפה למשלוח/איסוף
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="הכנס אזור גיאוגרפי"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            הערות או בקשות מיוחדות
          </label>
          <textarea
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="פרטים נוספים לתורם"
          ></textarea>
        </div>

        {/* הסכמה */}
        <div className="mb-6">
          <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
            <input type="checkbox" className="mr-2" />
            אני מסכים לשתף את הפרטים שלי עם התורם
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-lg hover:bg-[hsl(var(--primary))] hover:opacity-80"
        >
          שלח בקשה
        </button>
      </form>
    </div>
  );
}

export default RequestForm;
