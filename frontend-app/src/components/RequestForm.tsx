function RequestForm() {
  return (
    <div className="max-w-lg mx-auto bg-[hsl(var(--background))] p-6 rounded-lg shadow-md">
      <style>
        {`
          input::placeholder,
          textarea::placeholder {
            color: #A9A9A9; /* Light gray color for placeholders */
          }
        `}
      </style>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[hsl(var(--primary-foreground))] shadow-lg text-[hsl(var(--primary))]">
        Donation Request
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Age
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter your age"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Phone
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Service
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="Regular"
                className="mr-2"
              />
              Regular
            </label>
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="Reserves"
                className="mr-2"
              />
              Reserves
            </label>
          </div>
        </div>

        {/* Request Details */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Item Type
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter item type"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Item Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Details like size, color, desired condition"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Required Quantity
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter quantity"
          />
        </div>

        {/* Additional Details */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Urgency
          </label>
          <select className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50">
            <option value="Immediate">Immediate</option>
            <option value="Specific Date">Specific Date</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Preferred Geographic Area
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter geographic area"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Notes or Special Requests
          </label>
          <textarea
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Additional details for the donor"
          ></textarea>
        </div>

        {/* Agreement */}
        <div className="mb-6">
          <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
            <input type="checkbox" className="mr-2" />I agree to share my
            details with the donor
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-lg hover:bg-[hsl(var(--primary))] hover:opacity-80"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestForm;
