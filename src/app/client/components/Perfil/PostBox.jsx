export default function PostBox() {
    return (
      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4">
          <img
            alt="User profile picture"
            className="h-10 w-10 rounded-full object-cover"
            src="https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all"
          />
          <input
            className="w-full p-2 bg-gray-200 rounded-full"
            placeholder="¿Qué estás pensando?"
            type="text"
          />
        </div>
      </div>
    );
  }
  