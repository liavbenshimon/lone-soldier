export function PostCard() {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-12 max-w-4xl mx-auto">
        {/* Flex Container */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Imagem ocupa 2/3 da largura em telas maiores */}
          <div className="w-full md:w-2/3 flex justify-center items-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Post"
              className="w-full md:w-full h-auto object-contain rounded-md"
            />
          </div>
  
          {/* Conteúdo ocupa o espaço restante */}
          <div className="w-full md:w-1/3 flex flex-col justify-between text-base md:text-lg">
            <div>
              {/* Header do Post */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl">John Doe</h3>
                  <p className="text-gray-500 text-sm md:text-base">2 hours ago</p>
                </div>
              </div>
  
              {/* Conteúdo do Post */}
              <p className="mb-4 text-gray-700 leading-relaxed">
                This is an example post with some content. It explains something
                interesting or relevant to the user.
              </p>
            </div>
  
            {/* Botões de interação */}
            <div className="flex gap-4">
              <button className="text-blue-600 font-bold">Like</button>
              <button className="text-blue-600 font-bold">Comment</button>
              <button className="text-blue-600 font-bold">Share</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  