export function Footer() {
    return (
      <footer
        id="contact-us"
        className="bg-blue-600 text-white py-6 px-4 mt-12 shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
  
        <div className="space-y-2">
          {/* Telefone */}
          <p className="text-lg">
            📞 Phone:{" "}
            <a href="tel:+972529335126" className="underline hover:text-blue-200">
              +972 52-933-5126
            </a>
          </p>
  
          {/* Instagram */}
          <p className="text-lg">
            📸 Instagram:{" "}
            <a
              href="https://www.instagram.com/nathankilin/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-200"
            >
              @nathankilin
            </a>
          </p>
  
          {/* Website */}
          <p className="text-lg">
            🌐 Website:{" "}
            <a
              href="https://techidf.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-200"
            >
              techidf.co.il
            </a>
          </p>
        </div>
      </footer>
    );
  }
  